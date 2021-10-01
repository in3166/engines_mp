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
    engine:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Engine'}],
    defaultLifespan: {
        type: Number,
    },
    recentReplace:{
        type: Date
    },
    futureReplace:{
        type: Date
    }
}, { timestamps: true })

const Part = mongoose.model('Part', partSchema);

module.exports = {Part}