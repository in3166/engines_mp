const mongoose = require('mongoose');

const engineSchema = mongoose.Schema({
    id: {
        type: String,
        unique: 1
    },
    name: {
        type: String,
        maxlength: 50
    },
    parts:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Part'}],
    defaultLifespan: {
        type: Number,
    },
    recentRepair:{
        type: Date
    },
    futureCheck:{
        type: Date
    }
}, { timestamps: true })

const Engine = mongoose.model('Engine', engineSchema);

module.exports = {Engine}