const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRound = 10;

const userSchema = mongoose.Schema(
  {
    id: {
      type: String,
      unique: 1,
    },
    name: {
      type: String,
      maxlength: 50,
    },
    email: {
      type: String,
      trim: true,
      unique: 1,
    },
    password: {
      type: String,
      minlength: 7,
    },
    role: {
      type: Number,
      default: 0,
      // 0: 일반 사용자, 1: 관리자, 2: 전문가, 3: 엔지니어
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
    },
    position: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Position",
    },
    site: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Site",
    },
    token: {
      type: String,
    },
    tokenExp: {
      type: Number,
    },
  },
  { timestamps: true }
);

// 저장하기 전에 수행
userSchema.pre("save", function (next) {
  var user = this; // 위의 모델을 가리킴
  // 비밀번호 암호화
  // Salt를 이용해 암호화 saltround-몇글자
  // password가 변경될때만
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRound, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash; // 암호화 성공
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  // 사용자 입력과 암호화된 비밀번호 확인
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// refresh token 보류
// function TokenGenerator (secretOrPrivateKey, secretOrPublicKey, options) {
//     this.secretOrPrivateKey = secretOrPrivateKey;
//     this.secretOrPublicKey = secretOrPublicKey;
//     this.options = options; //algorithm + keyid + noTimestamp + expiresIn + notBefore
//   }

//   TokenGenerator.prototype.sign = function(payload, signOptions) {
//     const jwtSignOptions = Object.assign({}, signOptions, this.options);
//     return jwt.sign(payload, this.secretOrPrivateKey, jwtSignOptions);
//   }

//   // refreshOptions.verify = options you would use with verify function
//   // refreshOptions.jwtid = contains the id for the new token
//   TokenGenerator.prototype.refresh = function(token, refreshOptions) {
//     const payload = jwt.verify(token, this.secretOrPublicKey, refreshOptions.verify);
//     delete payload.iat;
//     delete payload.exp;
//     delete payload.nbf;
//     delete payload.jti; //We are generating a new token, if you are using jwtid during signing, pass it in refreshOptions
//     const jwtSignOptions = Object.assign({ }, this.options, { jwtid: refreshOptions.jwtid });
//     // The first signing converted all needed options into claims, they are already in the payload
//     return jwt.sign(payload, this.secretOrPrivateKey, jwtSignOptions);
//   }

//   const tokenGenerator = new TokenGenerator('a', 'a', { algorithm: 'HS256', keyid: '1', noTimestamp: false, expiresIn: '2m', notBefore: '2s' })
// token = tokenGenerator.sign({ myclaim: 'something' }, { audience: 'myaud', issuer: 'myissuer', jwtid: '1', subject: 'user' })
// setTimeout(function () {
//   token2 = tokenGenerator.refresh(token, { verify: { audience: 'myaud', issuer: 'myissuer' }, jwtid: '2' })
//   console.log(jwt.decode(token, { complete: true }))
//   console.log(jwt.decode(token2, { complete: true }))
// }, 3000)

userSchema.methods.generateToken = function (cb) {
  var user = this;
  // jwt로 token 생성
  // _id는 모델의 object id, user._id + secretToken = token / secretToken => user._id 알아낼 수 있음 나중에
  var token = jwt.sign({ id: user._id.toHexString() }, "secretToken", {
    expiresIn: "2h",
  });
  user.token = token;

  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  var user = this;
  // token decode 검증
  jwt.verify(token, "secretToken", function (err, decoded) {
    // 복호화된 토큰 decoded
    if (decoded) {
      user.findOne({ _id: decoded.id, token: token }, function (err, user) {
        if (err) return cb(err);
        cb(null, user);
      });
    } else {
      cb(null);
    }
  });
};

userSchema.pre("findOneAndUpdate", async function (next) {
  var user = this;
  try {
    if (user._update.password) {
      const genSalt = await bcrypt.genSalt(saltRound);
      const hash = await bcrypt.hash(user._update.password, genSalt);
      user._update.password = hash; // 암호화 성공
    }
    next();
  } catch (err) {
    console.log(err);
    return next(err);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
