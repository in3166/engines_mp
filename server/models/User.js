const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRound = 10;

const userSchema = mongoose.Schema({
    id: {
        type: String,
        unique: 1
    },
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password:{
        type: String,
        minlength: 7
    },
    role:{
        type: Number,
        default: 0
    },
    token:{
        type: String
    },
    tokenExp: {
        type: Number
    }
})

// 저장하기 전에 수행
userSchema.pre('save', function(next){
    var user = this; // 위의 모델을 가리킴
    // 비밀번호 암호화
    // Salt를 이용해 암호화 saltround-몇글자
    // password가 변경될때만
    if(user.isModified('password')){
        bcrypt.genSalt(saltRound, function(err, salt){
            if(err) return next(err);
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash; // 암호화 성공
                next();
            })
        })
    } else{
        next();
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb){
    // 사용자 입력과 암호화된 비밀번호 확인
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb){
    var user = this;
    // jwt로 token 생성
    // _id는 모델의 object id, user._id + secretToken = token / secretToken => user._id 알아낼 수 있음 나중에
    var token = jwt.sign(user._id.toHexString(),'secretToken');
    user.token = token;
    user.save(function(err, user){
        if(err) return cb(err);
        cb(null, user);
    })
}

const User = mongoose.model('User', userSchema);

module.exports = {User}