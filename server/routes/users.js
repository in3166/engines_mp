const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");
//const async = require("async");

//=================================
//             User
//=================================
// 페이지 이동 시 마다 인증된 사람인지 토큰 인증된 사람이면 사용자 정보를 다시 넣어줌
router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id, // middleware에서 들어감 req.user
        id: req.user.id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
    });
});

router.post("/register", (req, res) => {

    
    User.findOne({ id: req.body.id }, (err, user) => {
        if (user){
            return res.json({
                lsuccess: false,
                message: "아이디가 이미 존재합니다."
            })
        }else{
            const user = new User(req.body);
            user.save((err, userInfo) => {
                if (err) {
                    return res.json({ success: false, message:err.code });
                    console.log(err)
                }
                    return res.status(200).json({
                    success: true
                });
            });
        }
    });
});

router.post("/login", (req, res) => {
    // User모델에서 로그인 요청된 id가 db에 있는지 확인
    User.findOne({ id: req.body.id }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "아이디가 존재하지 않습니다."
            });
        //있다면 비밀번호가 맞는지 확인
        user.comparePassword(req.body.password, (err, isMatch) => { // user의 메서드 생성(in User.js) 
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "잘못된 비밀번호입니다." });
            // 비밀번호가 맞으면 토큰 생성 (jsonwebtoken)
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp); // 토큰을 쿠키에 저장
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id, id: user.id
                    });
            });
        });
    });
});

// 토큰 지워줌
router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});

module.exports = router;
