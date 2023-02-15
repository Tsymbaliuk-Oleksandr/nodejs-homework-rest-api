const express = require('express')

<<<<<<< Updated upstream
=======
const ctrl = require('../../controllers/contacts')

const { ctrlWrapper } = require('../../helpers')

const { validationBody } = require('../../middlewares')

const { schemas } = require('../../models/contact')

>>>>>>> Stashed changes
const router = express.Router()

router.get('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

<<<<<<< Updated upstream
router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})
=======
router.patch(
  '/:id/favorite',
  validationBody(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavotite),
)

router.delete('/:id', ctrlWrapper(ctrl.removeContact))
>>>>>>> Stashed changes

module.exports = router
