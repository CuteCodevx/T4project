var express = require('express');
var router = express.Router();
var handledata=require('../service/HandleData');
var md5Ecryption = require('../service/md5Ecryption');


/* GET home page. */
router.get('/', function(req, res, next) {
    // clear the session
    req.session.judge=null;
    req.session.admin=null;
    // show index page (login is part of index)
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


router.post('/', function(req, res, next) {
    // record login condition
    var inputName = req.body.username;
    var inputPassword = req.body.password;
    var saltedPassword = md5Ecryption.encryptPwd(inputName,inputPassword);
    var condition={"name":inputName,"password":saltedPassword};

    // check the condition
    handledata.search('admins',condition,function(err,result){
        if(result.length>0){
            // login as an admin
            req.session.admin=result;
            res.send(result[0]);
        }else{
            handledata.search('judges',condition,function(error,r){
                if(r.length>0){
                    // login as a judge
                    req.session.judge=r;
                    res.send(r[0]);
                }else{
                    // not found, send back the error code
                    res.status(200).json({"err":0});
                }
            })
        }
    });
});
module.exports = router;
