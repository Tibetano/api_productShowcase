const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

require('dotenv').config()

function generateJWT(params = {}){
    return jwt.sign(params, process.env.HASH_PASSWORD, {expiresIn: 60*10})
}

router.post('/register', async (req, res) => {

    const {email, cpf} = req.body

    try {
        if(await User.findOne({email}) ){
            return res.status(400).json({error: "email já cadastrado!"})
        } else if (await User.findOne({cpf})){
            return res.status(400).json({error: "CPF já cadastrado!"})
        }
        user = await User.create(req.body)
    } catch (error) {
        console.log("Erro na criação do usuário")
    }
    
    user.password = undefined
    res.status(200).json({user, token: generateJWT({id: user.id})})
})

router.post('/authenticate', async (req, res) => {

    const {email} = req.body
    const user = await User.findOne({email}).select('+password')

    if(!user){
        return res.status(400).json({error: "Usuario não encontrado"})
    }

    if(await bcrypt.compare(req.body.password, user.password)){
        user.password = undefined
        res.status(200).json({user, token: generateJWT({id: user.id})})
    } else{
        res.status(400).json({ok: false})
    }
})

module.exports = app => app.use('/auth', router)
