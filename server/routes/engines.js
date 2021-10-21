const express = require("express");
const router = express.Router();
const { Engine } = require("../models/Engine");
const { Part } = require("../models/Part");
const { Site } = require("../models/Site");
const async = require("async");

// 전문가 권한 유저 목록 가져오기
router.post("/getAllEngines", (req, res) => {
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
      console.log("Res: ", re);
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

  console.log(partID);
  console.log(engine);

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

module.exports = router;
