let mongoose = require('mongoose')

let userSchema = new mongoose.Schema({

    email: {
        type: String,
    },

    password:{
        type: String,
    },

})

module.exports = mongoose.model('user', userSchema)