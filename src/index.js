const express = require('express')
const DB = require('./database')

const app = express()

const port = 3000


app.use(express.json())

DB()
require('./app/controllers/authController')(app)



app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}!`)
})


