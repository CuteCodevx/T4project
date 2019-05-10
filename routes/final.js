var express = require('express');
var router = express.Router();
var handledata=require('../service/HandleData');
var scoring=require('./scoring');
router.get('/',function (req,res) {
    scoring.final();
    handledata.fsort('teams',{"Cscore":1},function (r) {
        console.log(r);
        res.render('Final_score',{"result":r});
    });
});
module.exports = router;