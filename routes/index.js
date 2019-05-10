var express = require('express');
var router = express.Router();
var handledata=require('../service/HandleData');
var dynamic=require('../service/dynamic');
/* GET home page. */
router.get('/', function(req, res, next) {
    req.session.judge=null;
    req.session.admin=null;
    handledata.search('challenges',{},function (err,rr) {
        var end=true;
        for(var i=0;i<rr.length;i++){
            if(rr[i].status===1){
                end=false;
                break;
            }
        }
        handledata.search('dynamic',{},function (err,r) {
            res.render('index',{"err":1,"rank":r,"end":end});
        });
    });
});
router.post('/',function (req,res) {
    dynamic.rank();
    handledata.search('challenges',{},function (err,rr) {
        var end=true;
        for(var i=0;i<rr.length;i++){
            if(rr[i].status===1){
                end=false;
                break;
            }
        }
        handledata.search('dynamic',{},function (err,r) {
            res.render('index',{"err":1,"rank":r,"end":end});
        });
    });
});
module.exports = router;