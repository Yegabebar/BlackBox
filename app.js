const express = require("express")
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const router = express.Router()

const tokenMgmtRoutes = require("./routes/security/tokenRoutes.js")
const articleRoutes = require("./routes/articleRoutes.js")
const voteRoutes = require("./routes/voteRoutes.js")

router.get('/', (req, res) => {
  res.write('ROOT')
  res.write(`
    Pour tester l'API, utiliser Postman, Insomnia ou autre moyen
    permettant d'inclure un body avec les requetes HTTP.
    https://updates.insomnia.rest/downloads/windows/latest?app=com.insomnia.app&source=website
    https://dl.pstmn.io/download/latest/win64
  `)
  res.send()
})

app.use(express.json()) // Permet de prendre en charge le body de requêtes HTTP au format JSON.
app.use(cookieParser()) // Permet de prendre en charge les cookies, en entrée et sortie (ex: pour le stockage du token)
app.use(cors())

app.use('/', router)
app.use('/token', tokenMgmtRoutes)
app.use('/article', articleRoutes)
app.use('/vote', voteRoutes)

module.exports = app