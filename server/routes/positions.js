const express = require("express");
const router = express.Router();
const { Position } = require("../models/Position");


// 전문가 권한 유저 목록 가져오기
router.post("/getAllPositions", (req, res) => {
  Position.find()
    .exec((err, positions) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }
      return res.status(200).send({
        success: true,
        positions: positions,
      });
    });
});

module.exports = router;
