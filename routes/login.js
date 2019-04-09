var express = require('express');
var router = express.Router();
var handledata=require('../service/HandleData');
/* GET home page. */
router.get('/', function(req, res, next) {
    req.session.judge=null;
    req.session.admin=null;
    res.render('index',{"err":1});
});
router.post('/', function(req, res, next) {
    var condition={"name":req.body.username,"password":req.body.password};
    handledata.search('admins',condition,function(err,result){
        if(result.length>0){
            console.log('admin account');
            req.session.admin=result;
            res.send(result[0]);
            // res.redirect("/admin");
        }else{
            handledata.search('judges',condition,function(error,r){
                if(r.length>0){
                    req.session.judge=r;
                    res.send(r[0]);
                }else{
                    res.status(200).json({"err":0});
                }
            })
        }
    });
});
module.exports = router;
