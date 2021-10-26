const mongoose = require('mongoose');


const positionSchema = mongoose.Schema({
    id: {
        type: String,
        unique: 1
    },
    name: {
        type: String,
        maxlength: 50
    },
    desc:{
        type: String
    },
}, { timestamps: true })

const Position = mongoose.model('Position', positionSchema);

module.exports = {Position}