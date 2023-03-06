const fs = require('fs/promises')
const path = require('path')
const Jimp = require('jimp')

const { User } = require('../../models/user')

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars')

const updateAvatar = async (req, res) => {
  const { _id } = req.user
  const { path: tempUpload, originalname } = req.file
  const extention = originalname.split('.').pop()
  const filename = `${_id}.${extention}`
  const resultUpload = path.join(avatarsDir, filename)
  await fs.rename(tempUpload, resultUpload)

  await Jimp.read(resultUpload)
    .then((image) =>
      image.resize(250, 250).quality(60).greyscale().write(resultUpload),
    )
    .catch((err) => {
      console.error(err)
    })

  const avatarURL = path.join('avatars', filename)
  await User.findByIdAndUpdate(_id, { avatarURL })

  res.json({
    avatarURL,
  })
}

module.exports = updateAvatar