var express = require('express');
var router = express.Router();
var handledata=require('../service/HandleData');
var dynamic=require('../service/dynamic');
/* GET home page. */
router.get('/', function(req, res, next) {
    // check challenges status, if all are finished, set end false
    handledata.search('challenges',{},function (err,rr) {
        var end=true;
        for(var i=0;i<rr.length;i++){
            if(rr[i].status===1){
                end=false;
                break;
            }
        }
        // show dynamic fastest teams list
        handledata.search('dynamic',{},function (err,r) {
            res.render('index',{"err":1,"rank":r,"end":end});
        });
    });
});
router.post('/',function (req,res) {
    // sort teams' time for each attempt
    dynamic.rank();
    // show result again
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