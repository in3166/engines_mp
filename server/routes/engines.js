const express = require("express");
const router = express.Router();
const { Engine } = require("../models/Engine");
const { Part } = require("../models/Part");
const { Site } = require("../models/Site");
const async = require("async");

// 전문가 권한 유저 목록 가져오기
router.get("/getAllEngines", (req, res) => {
  Engine.find()
    .populate("requiredParts.part")
    .populate("maintenanceHistory.parts.part")
    .populate({ path: "maintenanceHistory.site", model: "Site" })
    .exec((err, engines) => {
      if (err) {
        return res.json({ success: false, err });
      }
      return res.status(200).send({
        success: true,
        engines: engines,
      });
    });
});

// 엔진 목록에서 필요 부품 추가
// partId: checkedList,
// number: part?.number,
// engine: PartsInfo._id,
router.post("/addEnginRequiredPart", async (req, res) => {
  let partID = req.body.partId;
  let engine = req.body.engine;
  let number = req.body.number;

  const findPromise = await findArrayAndUpdate(partID, engine, number);

  await Promise.all(findPromise)
    .then((re) => {
      return res.status(200).json({ success: true });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ success: false, err });
    });
});

async function findArrayAndUpdate(reqid, engine, num) {
  const findPromise = reqid.map(async (partID) => {
    await Engine.findOneAndUpdate(
      { _id: engine, "requiredParts.part": { $ne: partID } },
      { $addToSet: { requiredParts: { part: partID, requiredNumber: num } } }
    ); // addToSet: 없으면 넣고 있으면 통과
  });

  return findPromise;
}

// partID: selectedRowKeys[0]._id,
// number: num,
// engine: EngineInfo._id,
// 엔진 필요 부품 수량 수정
router.post("/updateEnginRequiredPart", async (req, res) => {
  let partID = req.body.partID;
  let engine = req.body.engine;
  let number = req.body.number;

  console.log(partID);
  console.log(engine);
  console.log(number);

  Engine.findOneAndUpdate(
    { _id: engine, "requiredParts.part": partID },
    { $set: { "requiredParts.$.requiredNumber": number } }
  )
    .exec()
    .then(() => {
      return res.status(200).json({ success: true });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ success: false, err });
    });
});

// 엔진 필요 부품 삭제
router.post("/deleteEnginRequiredPart", async (req, res) => {
  let partID = req.body.partID;
  let engine = req.body.engine;

  const pullArrayPromises = partID.map(async (part) => {
    await Engine.findOneAndUpdate(
      { _id: engine, "requiredParts.part": part },
      { $pull: { requiredParts: { part: part } } }
    );
  });

  await Promise.all(pullArrayPromises)
    .then(() => {
      return res.status(200).json({ success: true });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, err });
    });
});

// 엔진 추가
router.post("/addEngine", (req, res) => {
  Engine.findOne({ id: req.body.id }, (err, engine) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    if (engine) {
      return res.json({
        success: false,
        message: "아이디가 이미 존재합니다.",
      });
    } else {
      Engine.findOne({ name: req.body.name }, (err, engine) => {
        if (engine) {
          return res.json({
            success: false,
            message: "이름이 이미 존재합니다.",
          });
        } else {
          const engine = new Engine(req.body);
          engine.save((err, engineInfo) => {
            if (err) {
              console.log("err2: ", err);
              return res.status(400).json({ success: false, err });
            }
            return res.status(200).json({
              success: true,
              message: "엔진을 추가했습니다.",
            });
          });
        }
      });
    }
  });
});

// 엔진 정보 변경
router.post("/updateEngine", (req, res) => {
  Engine.findOne(
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
        Engine.findOneAndUpdate(
          { _id: req.body._id },
          {
            id: req.body.id,
            name: req.body.name,
            defaultLifespan: req.body.defaultLifespan,
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

// 엔진 삭제
router.post("/deleteEngines", async (req, res) => {
  let engines = req.body.engines;

  Engine.deleteMany({ _id: engines }).exec((err, engine) => {
    if (err) {
      return res.stauts(400).json({ success: false, err });
    }
    return res.status(200).send({
      success: true,
    });
  });
});

module.exports = router;
