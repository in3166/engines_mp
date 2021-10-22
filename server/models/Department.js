const mongoose = require('mongoose');


const departmentSchema = mongoose.Schema({
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

const Department = mongoose.model('Department', departmentSchema);

module.exports = {Department}