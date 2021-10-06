const mongoose = require('mongoose');

const partSchema = mongoose.Schema({
    id: {
        type: String,
        unique: 1
    },
    name: {
        type: String,
        maxlength: 50
    },
    defaultLifespan: {
        type: Number,
    },
    // recentReplace:{
    //     type: Date
    // },
    // futureReplace:{
    //     type: Date
    // },
    price:{
        type: Number
    },
    desc:{
        type: String
    }
}, { timestamps: true })

const Part = mongoose.model('Part', partSchema);

module.exports = {Part}