const mongoose = require('mongoose');


const manualSchema = mongoose.Schema({
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
    engine:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Engine'
    },
}, { timestamps: true })

const Manual = mongoose.model('Manual', manualSchema);

module.exports = {Manual}