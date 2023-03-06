const express = require('express')

const ctrl = require('../../controllers/users')

const { ctrlWrapper } = require('../../helpers')

const { validationBody, authenticate, upload } = require('../../middlewares')

const { schemas } = require('../../models/user')

const router = express.Router()

router.post(
  '/register',
  validationBody(schemas.registerSchema),
  ctrlWrapper(ctrl.register),
)

router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verify))

router.post(
  '/verify',
  validationBody(schemas.verifyEmailSchema),
  ctrlWrapper(ctrl.resendEmail),
)

router.post(
  '/login',
  validationBody(schemas.loginSchema),
  ctrlWrapper(ctrl.login),
)

router.get('/current', authenticate, ctrlWrapper(ctrl.getCurrent))

router.get('/logout', authenticate, ctrlWrapper(ctrl.logout))

router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  ctrlWrapper(ctrl.updateAvatar),
)

module.exports = router
