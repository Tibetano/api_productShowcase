const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

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
        required: true,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

UserSchema.pre('save', async function(next) {// .pre indica que alguma coisa vai acontecer antes da função especificada 'save' acontecer
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(this.password, salt)//this se refere ao usuario em questão, neste caso o usuario que está sendo salvo
    this.password = hash
    next()
})

User = mongoose.model('User', UserSchema)

module.exports = User
