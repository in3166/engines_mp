const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    id: {
        type: String,
        unique: 1
    },
    name: {
        type: String,
        maxlength: 50
    },
    country: {
        type: String,
        maxlength: 50
    },
    location: {
        type: String,
        maxlength: 50
    },
    phone:{
        type: String
    }
}, { timestamps: true })

const Company = mongoose.model('Company', companySchema);

module.exports = {Company}