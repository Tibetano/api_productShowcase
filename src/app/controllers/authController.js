const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')

router.post('/register', async (req, res) => {

    const {email, cpf} = req.body

    if(await User.findOne({email}) ){
        return res.status(400).json({error: "email já cadastrado!"})
    } else if (await User.findOne({cpf})){
        return res.status(400).json({error: "CPF já cadastrado!"})
    }

    try {
        await User.create(req.body)
        console.log(email)
    } catch (error) {
        console.log(`Erro: ${error}`)
    }
    
    req.body.password = undefined
    res.status(200).json(req.body)
})

router.post('/authenticate', async (req, res) => {

    const {email} = req.body
    const user = await User.findOne({email})

    if(!user){
        return res.status(400).json({error: "Usuario não encontrado"})
    }

    if(req.body.password === user.password){
        res.status(200).json({ok: true})
    } else{
        res.status(200).json({ok: false})
    }

    
})


module.exports = app => app.use('/auth', router)
