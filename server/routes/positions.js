const express = require("express");
const router = express.Router();
const { Position } = require("../models/Position");
const { User } = require("../models/User");

// 전문가 권한 유저 목록 가져오기
router.get("/getAllPositions", (req, res) => {
  Position.find().exec((err, positions) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).send({
      success: true,
      positions: positions,
    });
  });
});

// 직급 추가
router.post("/addPosition", (req, res) => {
  Position.findOne({ id: req.body.id }, (err, part) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    if (part) {
      return res.json({
        success: false,
        message: "아이디가 이미 존재합니다.",
      });
    } else {
      Position.findOne({ name: req.body.name }, (err, part) => {
        if (part) {
          return res.json({
            success: false,
            message: "부서가 이미 존재합니다.",
          });
        } else {
          const position = new Position(req.body);
          position.save((err, positionInfo) => {
            if (err) {
              console.log("err2: ", err);
              return res.status(400).json({ success: false, err });
            }
            return res.status(200).json({
              success: true,
              message: "부서를 추가했습니다.",
            });
          });
        }
      });
    }
  });
});

// 직급 변경
router.post("/updatePosition", (req, res) => {
  Position.findOne(
    { id: req.body.id, _id: { $ne: req.body._id } },
    (err, part) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }
      if (part) {
        return res.json({
          success: false,
          message: "아이디가 이미 존재합니다.",
        });
      } else {
        Position.findOneAndUpdate(
          { _id: req.body._id },
          {
            id: req.body.id,
            name: req.body.name,
            desc: req.body.desc,
          },
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

// 직급 삭제
router.post("/deletePosition", async (req, res) => {
  // Object ID로 Site, Engine에서 쓰였는지 찾기
  console.log("id: ", req.body._id);

  let reqid = req.body._id;

  let { ok, fail, err } = await findQ(reqid);

  if (err) return res.status(400).json(err);
  else if (fail.length == reqid.length)
    return res.status(200).json({ success: false, fail });
  return res.status(200).json({ success: true, ok, fail });
});

async function findQ(reqid) {
  let fail = [];
  let ok = [];

  const findPromise = reqid.map(async (id) => {
    const existUser = await User.find({
      position:  id ,
    });

    if (existUser.length === 0 ) {
      ok.push(id);
      await Position.deleteOne({ _id: id });
    } else {
      fail.push(id);
    }
  });

  //console.log("findPromise: ", findPromise);
  // findPromise:  [ Promise { <pending> }, Promise { <pending> } ]

  // 여기서 await 하지 않으면 바로 넘어감.
  await Promise.all(findPromise)
    .then()
    .catch((err) => {
      console.log(err);
      return { undefined, undefined, err };
    });

  return { ok, fail, undefined };
}

module.exports = router;
