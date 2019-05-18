var express = require('express');
var router = express.Router();
var handledata=require('../service/HandleData');
var scoring=require('./scoring');
router.get('/',function (req,res) {
    // calculate final scores
    scoring.final();
    // show all teams' final scores in order
    handledata.fsort('teams',{"Cscore":1},function (r) {
        res.render('Final_score',{"result":r});
    });
});
module.exports = router;