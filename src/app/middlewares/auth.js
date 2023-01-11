const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader){
        return res.status(400).json({error: "Token não informado"})
    }

    const parts = authHeader.split(' ')

    if(!parts.length === 2){
        return res.status(400).json({error: "Token inválido"})
    }

    const [scheme, token] = parts

    if(!/^Bearer$/i.test(scheme)){
        return res.status(400).json({error: "Token mau formado"})
    }

    jwt.verify(token, process.env.HASH_PASSWORD, (err, decoded) => {
        
        if(err){
            return res.status(401).json({error: "token inválido"})
        }

        req.userId = decoded.id
        
        return next()
    })

}

