const express = require('express')

const router = express.Router()


router.post('/register', (req, res) => {
    res.status(200).json({ok: true})
})

router.put('/authenticate', (req, res) => {
    res.status(200).json({ok: true})
})


module.exports = app => app.use('/auth', router)
