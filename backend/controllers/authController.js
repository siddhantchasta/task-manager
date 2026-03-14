const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// REGISTER
exports.register = async (req, res) => {

 console.log("REGISTER ROUTE HIT")
 console.log(req.body)

 try {

  const { email, password } = req.body

  const hashed = await bcrypt.hash(password, 10)

  const user = await User.create({
   email,
   password: hashed
  })

  res.status(201).json({ message: "User created" })

 } catch (err) {
  console.log(err)
  res.status(500).json({ message: "Server Error" })
 }

}


// LOGIN
exports.login = async (req, res) => {

  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" })
  }

  const match = await bcrypt.compare(password, user.password)

  if (!match) {
    return res.status(400).json({ message: "Invalid credentials" })
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  )

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none"
  })

  res.json({ message: "Logged in" })
}