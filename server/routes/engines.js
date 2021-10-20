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
router.post("/addEnginRequiredPart", (req, res) => {
  let parts = [];
  let partID = req.body.partId;
  let engine = req.body.engine;
  let number = req.body.number;
  partID.forEach((element) => {
    parts.push({ part: element, requiredNumber: number });
  });
  console.log(parts);

  
  Engine.findOneAndUpdate(
    { _id: engine },
    { $addToSet: { requiredParts: { $each: parts } } }
  ).exec((err, engines) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.status(200).send({
      success: true,
    });
  });
});

module.exports = router;
