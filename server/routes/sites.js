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

// 사이트 부품 추가
router.post("/addSitePart", (req, res) => {
  Site.findOne(
    { id: req.body.site },
    { partStock: { $elemMatch: { part: req.body.id } } },
    (err, part) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }
      if (part.partStock.length) {
        return res.json({
          success: false,
          message: "부품이 이미 존재합니다.",
        });
      } else {
        Site.findOneAndUpdate(
          { id: req.body.site },
          {
            $push: { partStock: { part: req.body.id, stock: req.body.stock } },
          },
          (err, site) => {
            if (err) {
              return res.status(400).json({ success: false, err });
            }
            return res.status(200).json({
              success: true,
              message: "부품을 재고에 추가했습니다.",
            });
          }
        );
      }
    }
  );
});

// 사이트 재고 수정
router.post("/updateSitePart", (req, res) => {
  console.log(req.body.site);
  console.log(req.body.stock);
  console.log(req.body.id);

  Site.findOneAndUpdate(
    {
      id: req.body.site,
      partStock: { $elemMatch: { part: req.body.id } },
    },
    { $set: { "partStock.$.stock": req.body.stock } }
  ) // $ 찾은 자리?
    .exec()
    .then(() => {
      return res.status(200).json({ success: true });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, err });
    });
});

// 사이트 재고 삭제
router.post("/deleteSitePart", async (req, res) => {
  const parts = req.body.parts;

  const promises = parts.map(async (part) => {
    await Site.findOneAndUpdate(
      {
        id: req.body.id
      },
      { $pull: {partStock: { part : part }} }
    );
  });

  await Promise.all(promises)
    .then((re) => { 
      return res.status(200).json({ success: true })
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
});

module.exports = router;
