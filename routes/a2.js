var express = require('express');
var router = express.Router();
var handledata = require('../service/HandleData');
/* GET users listing. */
router.get('/', function (req, res){
    handledata.search('challenges',{},function(err,r){
        res.render('A2',{"aresult":req.session.admin[0],"cresult":r});
    })
})
module.exports=router;