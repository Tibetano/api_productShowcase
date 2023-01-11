const router = require('express').Router()
const mongoose = require('mongoose')
const Product = require('../models/product')
const User = require('../models/user')
const authMiddleware = require('../middlewares/auth')


router.use(authMiddleware)

router.post('/', async (req, res) => {
    try {
        const product = {...req.body, user: req.userId}
        await Product.create(product)
        return res.status(200).json({product})
    } catch (error) {
        return res.status(400).json({error: "Erro na criação do produto"})
    }
})

router.put('/:productId', async (req, res) => {
    const {productId} = req.params

    if(!await Product.findById(productId)){
        return res.status(400).json({message: "Produto não encontrado"})
    }

    try {
        product = await Product.findByIdAndUpdate(productId, req.body, {new: true})
        return res.status(200).json(product)
    } catch (error) {
        return res.status(400).json({error: "Erro ao excluir produto"})
    }
})

router.delete('/:productId', async (req, res) => {
    const {productId} = req.params

    try {
        await Product.findByIdAndDelete(productId)
        return res.status(200).json({message: "Produto deletado com sucesso"})
    } catch (error) {
        return res.status(400).json({error: "Erro ao excluir produto"})
    }
})

router.get('/:productId', async (req, res) => {
    const {productId} = req.params

    const product = await Product.findById(productId)

    if(!product){
        return res.status(400).json({error: "Produto não encontrado"})
    }
    
    return res.status(200).json(product)
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