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
    },
    actualLifespan: {
        type: Number,
    },
    expectLifespan:{
        type: Number,
    },
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

partSchema.pre('deleteOne', function(next){
    var part = this;
    part.model('Site').find()
})

module.exports = {Part}