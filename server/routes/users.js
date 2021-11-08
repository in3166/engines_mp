const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const { auth } = require("../middleware/auth");
const async = require("async");

//=================================
//             User
//=================================
// 페이지 이동 시 마다 인증된 사람인지 토큰 인증된 사람이면 사용자 정보를 다시 넣어줌
router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id, // middleware에서 들어감 req.user
    id: req.user.id,
    //isAdmin: req.user.role === 0 ? false : true,
    isAdmin: true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    department: req.user.department,
    position: req.user.position,
  });
});

router.post("/register", (req, res) => {
  User.findOne({ id: req.body.id }, (err, user) => {
    if (err) {
      console.log("err1: ", err);
      return res.json({ success: false, message: err });
    }
    if (user) {
      return res.json({
        success: false,
        message: "아이디가 이미 존재합니다.",
      });
    } else {
      User.findOne({ email: req.body.email }, (err, user) => {
        if (user) {
          return res.json({
            success: false,
            message: "Email이 이미 존재합니다.",
          });
        } else {
          const user = new User(req.body);
          user.save((err, userInfo) => {
            if (err) {
              console.log("err2: ", err);
              return res.json({ success: false, message: err });
            }
            return res.status(200).json({
              success: true,
              message: "회원 가입을 성공했습니다.",
            });
          });
        }
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
        message: "아이디가 존재하지 않습니다.",
      });
    //있다면 비밀번호가 맞는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      // user의 메서드 생성(in User.js)
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "잘못된 비밀번호입니다.",
        });
      // 비밀번호가 맞으면 토큰 생성 (jsonwebtoken)
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("w_authExp", user.tokenExp); // 토큰을 쿠키에 저장
        res.cookie("w_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
          id: user.id,
        });
      });
    });
  });
});

// 토큰 지워줌
router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "", tokenExp: "" },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});

// 전문가 권한 유저 목록 가져오기
router.get("/getAllUsers", (req, res) => {
  User.find({ id: { $ne: "admin" } })
    .populate({ path: "department", model: "Department" })
    .populate({ path: "position", model: "Position" })
    .populate({ path: "site", model: "Site" })
    .exec((err, users) => {
      if (err) {
        console.log("err: ", err);
        return res.json({ success: false, err });
      }
      return res.status(200).send({
        success: true,
        users: users,
      });
    });
});

// 전문가 권한 수정
router.post("/changeExpertRole", (req, res) => {
  let direction = req.body.direction;
  let users = req.body.users;
  // console.log(direction)
  // console.log(users)
  // 전문가에서 제거
  //if(direction === 'left'){

  // async.map 은 each와 유사하나, coll의 결과를 마지막 callback에 resutls로 관리
  // async.each(coll, iteratee, [callback])
  //   async.each는 coll에 있는 데이터를 순서에 상관없이 병렬적으로 모두 iteratee로 호출하고, 모두 종료되면 callback 날리는 형태
  //   async.eachSeries는 coll에 등록된 item을 순서대로 하나씩 iteratee호출하고, 종료되면 다음 item으로 iteratee를 호출하는 형태, 모두 종료시 최종 callback 호출은 동일
  async.eachSeries(
    users,
    (user, cb) => {
      //console.log(user)
      User.updateMany(
        { id: user.id },
        { role: user.chosen === 0 ? 2 : 0 },
        { new: false },
        cb
      );
    },
    (err) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({
        success: true,
      });
    }
  );
});

// 상단바 개인정보 수정
router.post("/changeUser", (req, res) => {
  User.findOneAndUpdate(
    { id: req.body.id },
    {
      email: req.body.email,
      name: req.body.name,
      department: req.body.department,
      position: req.body.position,
    },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});

// 사용자 페이지 대시보드 유저정보 변경
router.post("/updateUser", (req, res) => {
  User.findOne(
    { id: req.body.newid, _id: { $ne: req.body._id } },
    (err, user) => {
      if (err) {
        console.log("err1: ", err);
        return res.json({ success: false, message: err });
      }
      if (user) {
        return res.json({
          success: false,
          message: "아이디가 이미 존재합니다.",
        });
      } else {
        User.findOneAndUpdate(
          { id: req.body.id },
          {
            id: req.body.newid,
            email: req.body.email,
            name: req.body.name,
            site: req.body.site,
            department: req.body.department,
            position: req.body.position,
            role: req.body.role,
          },
          (err, doc) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({
              success: true,
            });
          }
        );
      }
    }
  );
});

router.post("/changePassword", (req, res) => {
  let newPassowrd = req.body.password;

  User.findOneAndUpdate(
    { id: req.body.id },
    { password: newPassowrd },
    (err, doc) => {
      if (err) {
        console.log(err);
        return res.json({ success: false, err });
      }
      return res.status(200).send({
        success: true,
      });
    }
  );
});

router.post("/passwordCheck", (req, res) => {
  User.findOne({ id: req.body.id }, (err, user) => {
    if (err) return res.json({ success: false, err });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (err) return res.json({ success: false, err });
      if (isMatch) {
        return res.status(200).send({
          success: true,
        });
      } else {
        return res.json({ success: false, err: "비밀번호를 확인하세요." });
      }
    });
  });
});

router.post("/deleteUser", (req, res) => {
  User.deleteOne({ id: req.body.id }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.json({ success: true });
  });
});

router.post("/deleteUsers", (req, res) => {
  User.deleteMany({ id: { $in: req.body.id } }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.json({ success: true });
  });
});

router.post("/changeRole", (req, res) => {
  console.log(req.body.id, req.body.role);
  User.findOneAndUpdate(
    { id: req.body.id },
    { role: req.body.role },
    (err, user) => {
      if (err) return res.json({ success: false, err });
      return res.json({ success: true });
    }
  );
});

module.exports = router;
