// Імпортуємо "bcryptjs"
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const requestError = require('../../helpers/requestError')
const { User } = require('../../models/user')

const register = async (req, res) => {
  const { email, password, subscription } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw requestError(409, 'Email in use')
  }

  // Хешуємо пароль "hashPassword"
  const hashPassword = await bcrypt.hash(password, 10)
  const avatarURL = gravatar.url(email)

  const result = await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
  })

  res.status(201).json({
    name: result.name,
    email: result.email,
    subscription: result.subscription,
  })
}

module.exports = register

// 1:09:55
// https://www.youtube.com/watch?v=sI9GhIC1Nq4
