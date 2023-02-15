const mongoose = require('mongoose')
const app = require('./app')
mongoose.set('strictQuery', true)

<<<<<<< Updated upstream
app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})
=======
const { DB_HOST, PORT = 3000 } = process.env

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT)
    console.log('Database connection successful')
  })

  .catch((error) => {
    console.log(error.message)
    process.exit(1)
  })
>>>>>>> Stashed changes
