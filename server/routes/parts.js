const express = require("express");
const router = express.Router();
const { Part } = require("../models/Part");
const { Site } = require("../models/Site");
const { Engine } = require("../models/Engine");

router.post("/deletePart", (req, res) => {
  // Object ID로 Site, Engine에서 쓰였는지 찾기
  console.log("id: ", req.body.id);

  Site.find({ partStock: { $elemMatch: { part: req.body.id } } }).exec(
    (err, parts) => {
      if (err) {
        return res.json({ success: false, err });
      }
      console.log(parts);
      if (Number(parts.length)) {
        return res.json({
          success: false,
          message: "사이트의 재고 필드에 해당 부품이 존재합니다.",
        });
      } else {
        Engine.find({
          requiredParts: { $elemMatch: { part: req.body.id } },
        }).exec((err, parts) => {
          if (err) {
            return res.json({ success: false, err });
          }
          console.log(parts);
          if (Number(parts.length)) {
            return res.json({
              success: false,
              message: "엔진의 필요 부품 필드에 해당 부품이 존재합니다.",
            });
          } else {
            Part.deleteOne({ _id: req.body.id }, (err, part) => {
              if (err) return res.json({ success: false, err });
              return res.json({ success: true });
            });
          }
        });
      }
    }
  );
});

// 부품 목록 - 부품 삭제
router.post("/deleteParts", async (req, res) => {
  // Object ID로 Site, Engine에서 쓰였는지 찾기
  console.log("id: ", req.body.id);

  let reqid = req.body.id;

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
    const cSite = await Site.find({
      partStock: { $elemMatch: { part: id } },
    });
    const cEngine = await Engine.find({
      requiredParts: { $elemMatch: { part: id } },
    });

    // console.log("cSite: ", cSite);
    // console.log("cEngine: ", cEngine);
    if (cSite.length === 0 && cEngine.length === 0) {
      ok.push(id);
      await Part.deleteOne({ _id: id });
    } else {
      fail.push(id);
    }
  });

  //console.log("findPromise: ", findPromise);
  // findPromise:  [ Promise { <pending> }, Promise { <pending> } ]

  // 여기서 await 하지 않으면 바로 넘어감.
  await Promise.all(findPromise)
    .then((res) => {})
    .catch((err) => {
      console.log(err);
      return { undefined, undefined, err };
    });

  return { ok, fail, undefined };
}

router.post("/getAllParts", (req, res) => {
  Part.find().exec((err, parts) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.status(200).send({
      success: true,
      parts: parts,
    });
  });
});

// 부품 정보 변경
router.post("/updatePart", (req, res) => {
  Part.findOne({ id: req.body.id, _id: { $ne: req.body._id } }, (err, part) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    if (part) {
      return res.json({
        success: false,
        message: "아이디가 이미 존재합니다.",
      });
    } else {
      Part.findOneAndUpdate(
        { _id: req.body._id },
        {
          section1: req.body.section1,
          section2: req.body.section2,
          name: req.body.name,
          defaultLifespan: req.body.defaultLifespan,
          expectLifespan: req.body.expectLifespan,
          actualLifespan: req.body.actualLifespan,
          price: req.body.price,
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
  });
});

// 부품 목록 부품 추가
router.post("/addPart", (req, res) => {
  // Part.findOne({ id: req.body.id }, (err, part) => {
  //   if (err) {
  //     return res.status(400).json({ success: false, err });
  //   }
  //   if (part) {
  //     return res.json({
  //       success: false,
  //       message: "아이디가 이미 존재합니다.",
  //     });
  //   } else {
      Part.findOne({ name: req.body.name }, (err, part) => {
        if (part) {
          return res.json({
            success: false,
            message: "부품이 이미 존재합니다.",
          });
        } else {
          const part = new Part(req.body);
          part.save((err, partInfo) => {
            if (err) {
              console.log("err2: ", err);
              return res.status(400).json({ success: false, err });
            }
            return res.status(200).json({
              success: true,
              message: "부품을 추가했습니다.",
            });
          });
        }
      });
  //  }
 // });
});

module.exports = router;
