var express = require('express');
var router = express.Router();
var handledata = require('../service/HandleData');
var challengemodel=require('./challengemodel');
/* GET users listing. */
router.get('/', function (req, res){
    if(!req.session.admin)
        res.render('index');
    handledata.search('challenges',{},function(err,r){
        console.log(r);
        res.render('A2',{"aresult":req.session.admin[0],"cresult":r});
    })
})
module.exports=router;