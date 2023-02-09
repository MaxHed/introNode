require('dotenv').config()

const app = require('./app')
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Serveur en écoute sur le port : ${port}`)
  })