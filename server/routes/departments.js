const express = require("express");
const router = express.Router();
const { Department } = require("../models/Department");
const { User } = require("../models/User");

// 전문가 권한 유저 목록 가져오기
router.post("/getAllDepartments", (req, res) => {
  Department.find().exec((err, departments) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).send({
      success: true,
      departments: departments,
    });
  });
});

// 부서 추가
router.post("/addDepartment", (req, res) => {
  Department.findOne({ id: req.body.id }, (err, part) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    if (part) {
      return res.json({
        success: false,
        message: "아이디가 이미 존재합니다.",
      });
    } else {
      Department.findOne({ name: req.body.name }, (err, part) => {
        if (part) {
          return res.json({
            success: false,
            message: "부서가 이미 존재합니다.",
          });
        } else {
          const department = new Department(req.body);
          department.save((err, departmentInfo) => {
            if (err) {
              console.log("err2: ", err);
              return res.status(400).json({ success: false, err });
            }
            return res.status(200).json({
              success: true,
              message: "부서를 추가했습니다.",
            });
          });
        }
      });
    }
  });
});

// 부서 변경
router.post("/updateDepartment", (req, res) => {
  Department.findOne(
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
        Department.findOneAndUpdate(
          { _id: req.body._id },
          {
            id: req.body.id,
            name: req.body.name,
            desc: req.body.desc,
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

// 부서 삭제
router.post("/deleteDepartment", async (req, res) => {
  let reqid = req.body._id;

  let { ok, fail, err } = await findQ(reqid);
  console.log("OK: ", ok);
  if (err) return res.status(400).json(err);
  else if (fail.length == reqid.length)
    return res.status(200).json({ success: false, fail });
  return res.status(200).json({ success: true, ok, fail });
});

async function findQ(reqid) {
  let fail = [];
  let ok = [];

  const findPromise = reqid.map(async (id) => {
    const existUser = await User.find({
      department: id,
    });

    // console.log("cSite: ", cSite);
    // console.log("cEngine: ", cEngine);
    if (existUser.length === 0) {
      ok.push(id);
      await Department.deleteOne({ _id: id });
    } else {
      fail.push(id);
    }
  });

  //console.log("findPromise: ", findPromise);
  // findPromise:  [ Promise { <pending> }, Promise { <pending> } ]

  // 여기서 await 하지 않으면 바로 넘어감.
  await Promise.all(findPromise)
    .then(() => {})
    .catch((err) => {
      console.log(err);
      return { undefined, undefined, err };
    });
  return { ok, fail, undefined };
}

module.exports = router;
