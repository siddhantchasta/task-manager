const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
require("dotenv").config()

const authRoutes = require("./routes/authRoutes")
const taskRoutes = require("./routes/taskRoutes")

const app = express()

app.use(cors({
 origin: "http://localhost:3000",
 credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res) => {
  res.send("Server working")
})

app.use("/api/auth", authRoutes)
app.use("/api/tasks", taskRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err))

const PORT = 5001
app.listen(PORT, ()=>{
 console.log("Server running on port 5001")
})