const express = require("express");
const router = express.Router();
const { Part } = require("../models/Part");
const { Site } = require("../models/Site");
const { Engine } = require("../models/Engine");

const async = require("async");
const e = require("express");

// 본사 부품 추가
router.post("/addPart", (req, res) => {
  console.log(req.body);
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

router.post("/deletePart", (req, res) => {
  // Object ID로 Site, Engine에서 쓰였는지 찾기
  console.log("id: ", req.body.id);
  Site.find({ partStock: { $elemMatch: { part: req.body.id } } }).exec(
    (err, parts) => {
      if (err) {
        return res.json({ success: false, err });
      }
      console.log(parts);
      console.log(parts.length);
      if (Number(parts.length)) {
        return res.json({
          success: false,
          message: "사이트의 재고 필드에 해당 부품이 존재합니다.",
        });
      } else {
        Engine.find({
          partStock: { $elemMatch: { part: req.body.id } },
        }).exec((err, parts) => {
          if (err) {
            return res.json({ success: false, err });
          }
          console.log(parts);
          console.log(parts.length);
          if (Number(parts.length)) {
            return res.json({
              success: false,
              message: "엔진의 필요 부품 필드에 해당 부품이 존재합니다.",
            });
          } else {
            Part.deleteOne({ id: req.body.id }, (err, part) => {
              if (err) return res.json({ success: false, err });
              return res.json({ success: true });
            });
          }
        });
      }
    }
  );
});

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

module.exports = router;
