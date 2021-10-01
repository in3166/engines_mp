const mongoose = require('mongoose');

const siteSchema = mongoose.Schema({
    id: {
        type: String,
        unique: 1
    },
    name: {
        type: String,
    },
    country: {
        type: String,
    },
    location: {
        type: String,
    },
    engine: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Part'}
    ]
}, { timestamps: true })


const Site = mongoose.model('Site', siteSchema);

module.exports = { Site }