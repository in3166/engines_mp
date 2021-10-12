const express = require("express");
const router = express.Router();
const { Part } = require("../models/Part");

const async = require("async");

// 본사 부품 추가
router.post("/addPart", (req, res) => {
  console.log(req.body)
  Part.findOne({ id: req.body.id }, (err, part) => {
    if (err) {
      console.log("err1: ", err);
      return res.json({ success: false, message: err });
    }
    if (part) {
      return res.json({
        success: false,
        message: "아이디가 이미 존재합니다.",
      });
    } else {
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
              return res.json({ success: false, message: err });
            }
            return res.status(200).json({
              success: true,
              message: "부품을 추가했습니다.",
            });
          });
        }
      });
    }
  });
});

module.exports = router;
