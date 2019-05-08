var express = require('express');
var router = express.Router();
var handledata=require('../service/HandleData');
var dynamic=require('../service/dynamic');
/* GET home page. */
router.get('/', function(req, res, next) {
    req.session.judge=null;
    req.session.admin=null;
    handledata.search('dynamic',{},function (err,r) {
        res.render('index',{"err":1,"rank":r});
    });
});
router.post('/',function (req,res) {
    dynamic.rank();
    handledata.search('dynamic',{},function (err,r) {
        res.render('index',{"err":1,"rank":r});
    });
});
module.exports = router;