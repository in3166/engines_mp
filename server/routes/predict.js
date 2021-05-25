const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/auth");
const async = require("async");
const axios = require('axios');

router.get("/engine1", auth, (req, res) => {
    // res.status(200).json({
    //                 success: true,
    //                 data: {
    //                     data:{
    //                         a: [506.1,506.2,506.3,506.4],
    //                         date: ['2020','2021','2022','2023','2024'],
    //                         x: [506.3,506.5,506.2,506.5,506.8],
    //                     },
    //                 }
    //             })
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
