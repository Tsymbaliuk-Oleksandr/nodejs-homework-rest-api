// Імпортуємо "bcryptjs"
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const { nanoid } = require('nanoid')
const { RequestError, sendEmail } = require('../../helpers')
const { User } = require('../../models/user')

const { BASE_URL } = process.env

const register = async (req, res) => {
  const { email, password, subscription } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw RequestError(409, 'Email in use')
  }

  // Хешуємо пароль "hashPassword"
  const hashPassword = await bcrypt.hash(password, 10)
  const avatarURL = gravatar.url(email)
  const verificationToken = nanoid()

  const result = await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
    verificationToken,
  })

  const mail = {
    to: email,
    subject: 'Verify email',
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click to verify your email</a>`,
  }

  await sendEmail(mail)

  res.status(201).json({
    name: result.name,
    email: result.email,
    subscription: result.subscription,
  })
}

module.exports = register
