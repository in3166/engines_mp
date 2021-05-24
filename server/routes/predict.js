const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/auth");
const async = require("async");
const axios = require('axios');

router.get("/engine1", auth, (req, res) => {
    axios.get("http://localhost:7000/api/predict")
    .then(resf=>{
        res.status(200).json({
            data: resf.data
        });
    })
});

module.exports = router;
