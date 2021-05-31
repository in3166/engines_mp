const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const siteSchema = mongoose.Schema({
    name: {
        type: String,
    },
    country: {
        type: String,
    },
    product: {
        type: Array,
        default: []
    },
}, { timestamps: true })


const Site = mongoose.model('Payment', siteSchema);

module.exports = { Site }