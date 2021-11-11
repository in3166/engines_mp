const mongoose = require('mongoose');


const expertSchema = mongoose.Schema({
    id: {
        type: String,
        unique: 1
    },
    name: {
        type: String,
        maxlength: 20,
        unique: 1
    },
    desc:{
        type: String
    },
    role:{
        type: Number,
        default: 2
    },
}, { timestamps: true })

const Expert = mongoose.model('Expert', expertSchema);

module.exports = {Expert}