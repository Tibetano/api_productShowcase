const router = require('express').Router()
const mongoose = require('mongoose')
const Product = require('../models/product')
const User = require('../models/user')
const authMiddleware = require('../middlewares/auth')


router.use(authMiddleware)

router.post('/register', async (req, res) => {
    try {
        const product = {...req.body, user: req.userId}
        await Product.create(product)
        return res.status(200).json({product})
    } catch (error) {
        return res.status(400).json({error: "Erro na criação do produto"})
    }
})

router.put('/:productId', async (req, res) => {
    return res.status(200).json({product})
})

router.delete('/:productId', async (req, res) => {
    return res.status(200).json({product})
})

router.get('/:productId', async (req, res) => {
    return res.status(200).json({product})
})

router.get('/', async (req, res) => {
    try {
        const product = await Product.find()
        return res.status(200).json(product)
    } catch (error) {
        return res.status(400).json({error: "Erro ao buscar produtos"})
    }
})

module.exports = app => app.use('/products', router)