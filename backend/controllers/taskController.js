const Task = require("../models/Task")
const { encrypt, decrypt } = require("../utils/encryption")


// CREATE TASK
exports.createTask = async (req, res) => {

 try {
  const data = decrypt(req.body.payload)
  const { title, description, status } = data

  const task = await Task.create({
   title,
   description,
   status,
   userId: req.user.id
  })

  res.status(201).json({
   payload: encrypt(task)
  })

 } catch (err) {
    console.error(err)

    res.status(500).json({
    payload: encrypt({ message: "Server Error" })
    })
 }
}

// GET TASKS (pagination + search + filter)
exports.getTasks = async (req, res) => {
 try {
  const page = parseInt(req.query.page) || 1
  const limit = 5
  const skip = (page - 1) * limit

  const { status, search } = req.query

  let query = { userId: req.user.id }

  if (status) {
   query.status = status
  }

  if (search) {
   query.title = { $regex: search, $options: "i" }
  }

  const tasks = await Task.find(query)
   .skip(skip)
   .limit(limit)
   .sort({ createdAt: -1 })

  const total = await Task.countDocuments(query)
  const response = {
   tasks,
   currentPage: page,
   totalPages: Math.ceil(total / limit)
  }

  res.json({
   payload: encrypt(response)
  })

 } catch (err) {

  console.error(err)

  res.status(500).json({
   payload: encrypt({ message: "Server Error" })
  })
 }
}

// UPDATE TASK
exports.updateTask = async (req, res) => {
 try {
  const data = decrypt(req.body.payload)

  const task = await Task.findOneAndUpdate(
   { _id: req.params.id, userId: req.user.id },
   data,
   { new: true }
  )

  if (!task) {
   return res.status(404).json({
    payload: encrypt({ message: "Task not found" })
   })

  }

  res.json({
   payload: encrypt(task)
  })

 } catch (err) {
    console.error(err)

    res.status(500).json({
    payload: encrypt({ message: "Server Error" })
    })
 }
}

// DELETE TASK
exports.deleteTask = async (req, res) => {
 try {
  const task = await Task.findOneAndDelete({
   _id: req.params.id,
   userId: req.user.id
  })

  if (!task) {
   return res.status(404).json({
    payload: encrypt({ message: "Task not found" })
   })

  }

  res.json({
   payload: encrypt({ message: "Task deleted" })
  })
 } catch (err) {
    console.error(err)

    res.status(500).json({
    payload: encrypt({ message: "Server Error" })
    })
 }
}