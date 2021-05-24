const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/auth");
const async = require("async");
const axios = require('axios');

router.get("/engine1", auth, (req, res) => {
    try {
        axios.get("http://localhost:7000/api/test")
        .then(resf=>{
            //console.log(resf)
            res.status(200).json({
                success: true,
                data: resf.data
            });
        })
        .catch(error => {
            if(error){
                res.status(500).json({
                    success: false,
                    message: 'api request error1'
                });
            }
            
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'api request error2'
        });
    }
});

module.exports = router;
