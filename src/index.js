const express = require('express')



const app = express()


const port = 3000


require('./app/controllers/authController')(app)



app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})


