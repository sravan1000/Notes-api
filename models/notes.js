let mongoose = require('mongoose')

let notesSchema = new mongoose.Schema({

    title: {
        type: String,
    },

    content: {
        type: String,
    },

    email: {
        type: String,
    }
})

module.exports = mongoose.model('item', notesSchema)