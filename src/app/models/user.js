const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true
    },
    cpf: {
        type: String,
        unique: true,
        required: true,
        select: false
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


User = mongoose.model('User', UserSchema)





module.exports = User
