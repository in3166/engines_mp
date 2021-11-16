const express = require("express");
const router = express.Router();
const { Manual } = require("../models/Manual");
const { User } = require("../models/User");

// 전문가 권한 유저 목록 가져오기
router.get("/getAllManuals", (req, res) => {
  Manual.find()
  .populate("part")
    .populate("engine")
    .exec((err, manuals) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }
      return res.status(200).send({
        success: true,
        manuals: manuals,
      });
    });
});

// 직급 추가
router.post("/addManual", (req, res) => {
  Manual.findOne({ id: req.body.id }, (err, part) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    if (part) {
      return res.json({
        success: false,
        message: "아이디가 이미 존재합니다.",
      });
    } else {
      Manual.findOne({ name: req.body.name }, (err, part) => {
        if (part) {
          return res.json({
            success: false,
            message: "매뉴얼이 이미 존재합니다.",
          });
        } else {
          const manual = new Manual(req.body);
          manual.save((err, manualInfo) => {
            if (err) {
              console.log("err2: ", err);
              return res.status(400).json({ success: false, err });
            }
            return res.status(200).json({
              success: true,
              message: "매뉴얼을 추가했습니다.",
            });
          });
        }
      });
    }
  });
});

// 직급 변경
router.post("/updateManual", (req, res) => {
  Manual.findOne(
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
        Manual.findOneAndUpdate(
          { _id: req.body._id },
          {
            id: req.body.id,
            name: req.body.name,
            desc: req.body.desc,
            engine: req.body.engine,
            part: req.body.part,
          },
          { new: true, omitUndefined: true },
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
router.post("/deleteManual", async (req, res) => {
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
      manual: id,
    });

    if (existUser.length === 0) {
      ok.push(id);
      await Manual.deleteOne({ _id: id });
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

router.post("/deleteManuals", (req, res) => {
  Manual.deleteMany({ _id: { $in: req.body.manual } }, (err, manual) => {
    console.log(manual)
    if (err) return res.status(400).json({ success: false, err });
    return res.json({ success: true });
  });
});

module.exports = router;
