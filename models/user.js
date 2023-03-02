const { Schema, model } = require('mongoose')
const Joi = require('joi')

const { handleSchemaValidationErrors } = require('../helpers')

const subscriptionPlan = ['starter', 'pro', 'business']

const userSchema = Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscriptionPlan,
      default: 'starter',
    },
    token: {
      type: String,
      default: '',
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: '',
    },
  },
  { versionKey: false, timestamps: true },
)

userSchema.post('save', handleSchemaValidationErrors)

const registerSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  subscription: Joi.string().valid(...subscriptionPlan),
})

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
})

const verifyEmailSchema = Joi.object({
  email: Joi.string().required(),
})

const schemas = {
  registerSchema,
  loginSchema,
  verifyEmailSchema,
}

const User = model('user', userSchema)

module.exports = {
  User,
  schemas,
}
