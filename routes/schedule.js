var express = require('express');
var router = express.Router();
var handledata=require('../service/HandleData');
var challengemodel=require('./challengemodel');
router.get('/',function (req,res) {
    challengemodel.findOne({'index':[1,2,3,4,5,6,7]},function(err,r){
        res.render('Schedule',{"cresult":r});
    })
})
module.exports = router;