const express = require("express");
const router = express.Router();
const { Site } = require("../models/Site");

const async = require("async");

// 전문가 권한 유저 목록 가져오기
router.post("/getAllSites", (req, res) => {
  Site.find()
    .populate({
      path: "engines",
      populate: {
        path: "requiredParts.part",
        model: "Part",
      },
    })
    .populate("partStock.part")
    .exec((err, sites) => {
      if (err) {
        return res.json({ success: false, err });
      }
      return res.status(200).send({
        success: true,
        sites: sites,
      });
    });
});

// 본사 정보 가져오기
router.post("/headParts", (req, res) => {
  Site.find()
    .where("name")
    .equals("본사")
    .populate({
      path: "engines",
      populate: {
        path: "requiredParts.part",
        model: "Part",
      },
    })
    .populate("partStock.part")
    .exec((err, sites) => {
      if (err) {
        return res.json({ success: false, err });
      }
      return res.status(200).send({
        success: true,
        sites: sites,
      });
    });
});

module.exports = router;
