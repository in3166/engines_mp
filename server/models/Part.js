const mongoose = require('mongoose');

const partSchema = mongoose.Schema({
    section1: {
        type: String,
    },
    section2: {
        type: String,
    },
    name: {
        type: String,
        maxlength: 50,
        unique: 1
    },
    defaultLifespan: {
        type: Number,
        default:0,
    },
    actualLifespan: {
        type: Number,
        default:0,
    },
    expectLifespan:{
        type: Number,
        default:0,
    },
    maintenancePeriod:{
        type: Number,
        default:0,
    },
    price:{
        type: Number
    },
    desc:{
        type: String
    }
}, { timestamps: true })

const Part = mongoose.model('Part', partSchema);

partSchema.pre('deleteOne', function(next){
    var part = this;
    part.model('Site').find()
})

module.exports = {Part}