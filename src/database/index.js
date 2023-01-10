const mongoose = require('mongoose')

require('dotenv').config()

const dbPass = process.env.DB_PASSWORD

const DBConnection = async function () {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(`mongodb+srv://lucas:${dbPass}@apicluster.uhmiya0.mongodb.net/?retryWrites=true&w=majority`);
        console.log('Banco de dados conectado com sucesso!')
    } catch (error) {
        console.log(`Erro na conexão com o banco de dados. Erro: ${error}`)
    }
}

module.exports = DBConnection
