const express = require("express");
const router = express.Router();
const { Department } = require("../models/Department");
const { Part } = require("../models/Part");
const { Site } = require("../models/Site");

const async = require("async");

// 전문가 권한 유저 목록 가져오기
router.post("/getAllDepartments", (req, res) => {
  Department.find()
    .exec((err, departments) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }
      return res.status(200).send({
        success: true,
        departments: departments,
      });
    });
});

module.exports = router;
