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
    .populate({
      path: "maintenanceHistory.site",
      populate: { path: "engines" },
    })
    .exec((err, engines) => {
        if (err){
            return res.json({ success: false, err });
        } 
      return res.status(200).send({
        success: true,
        engines: engines,
      });
    });
});

module.exports = router;
