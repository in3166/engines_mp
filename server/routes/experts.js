const express = require("express");
const router = express.Router();
const { Expert } = require("../models/Expert");
const { User } = require("../models/User");

// 전문가 권한 유저 목록 가져오기
router.get("/getAllExperts", (req, res) => {
  Expert.find().exec((err, experts) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).send({
      success: true,
      experts,
    });
  });
});

// 전문가 그룹 추가
router.post("/addExpert", (req, res) => {
  Expert.findOne({ id: req.body.id }, (err, expert) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    if (expert) {
      return res.json({
        success: false,
        message: "아이디가 이미 존재합니다.",
      });
    } else {
      Expert.findOne({ name: req.body.name }, (err, expert) => {
        if (expert) {
          return res.json({
            success: false,
            message: "전문가 그룹이 이미 존재합니다.",
          });
        } else {
          const expert = new Expert(req.body);
          expert.save((err, expertInfo) => {
            if (err) {
              console.log("err2: ", err);
              return res.status(400).json({ success: false, err });
            }
            return res.status(200).json({
              success: true,
              message: "전문가 그룹을 추가했습니다.",
            });
          });
        }
      });
    }
  });
});

// 전문가 그룹 변경
router.post("/updateExpert", (req, res) => {
  console.log(req.body)
  Expert.findOne(
    { id: req.body.id, _id: { $ne: req.body._id } },
    (err, engine) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }
      if (engine) {
        return res.json({
          success: false,
          message: "아이디가 이미 존재합니다.",
        });
      } else {
        Expert.findOneAndUpdate(
          { _id: req.body._id },
          {
            id: req.body.id,
            name: req.body.name,
            desc: req.body.desc,
            role: req.body.role
          },
          {new:true,omitUndefined:true},
          (err, doc) => {
            if (err) return res.status(400).json({ success: false, err });
            return res.status(200).send({
              success: true,
            });
          }
        );
      }
    }
  );
});

// 전문가 그룹 삭제
router.post("/deleteExpert", async (req, res) => {
  // Object ID로 Site, Engine에서 쓰였는지 찾기
  console.log("ex name: ", req.body.name);

  let reqid = req.body.name;

  let { ok, fail, err } = await findQ(reqid);

  if (err) return res.status(400).json(err);
  else if (fail.length == reqid.length)
    return res.status(200).json({ success: false, fail });
  return res.status(200).json({ success: true, ok, fail });
});

async function findQ(reqName) {
  let fail = [];
  let ok = [];

  const findPromise = reqName.map(async (names) => {
    const existUser = await User.find({
      role: { name: names },
    });

    if (existUser.length === 0) {
      ok.push(names);
      await Expert.deleteOne({ name: names });
    } else {
      fail.push(names);
    }
  });

  await Promise.all(findPromise)
    .then()
    .catch((err) => {
      console.log(err);
      return { undefined, undefined, err };
    });

  return { ok, fail, undefined };
}

module.exports = router;
