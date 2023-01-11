const express = require('express')
const DB = require('./database')

const app = express()

app.use(express.json())

DB()
require('./app/controllers/authController')(app)
require('./app/controllers/productController')(app)
require('dotenv').config()

app.listen(process.env.HOST_PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.HOST_PORT}!`)
})
