var express = require('express');
var router = express.Router();
var handledata = require('../service/HandleData');
/* GET users listing. */
router.get('/', function (req, res){
    var data = req.query;
    console.log(data);
    if(data.judge){
        handledata.search('judges',{'name':data.judge},function(err,r){
            res.render('A2_1',{"aresult":req.session.admin[0],"result":r});
        })
    }else{
        handledata.fsort('judges',{'id':1},function(r){

            res.render('A2',{"aresult":req.session.admin[0],"result":r});
        })
    }
})
router.post('/',function (req,res) {
    //console.log(req);
    var name =req.body.name;
    var psw = req.body.password;
    var permission = req.body.permission;
    var oldname = req.body.oldname;
    handledata.search('judges',{'name':oldname},function (err,r) {
        var oldname = r[0].name;
        var oldpsw = r[0].password;
        var oldPermission = r[0].permission;
        handledata.update('judges',{'name':oldname,'password':oldpsw,'permission':oldPermission},{'name':name,'password':psw,'permission':permission})
    })
    handledata.fsort('teams',{'id':1},function(r){
        res.render('A1',{"aresult":req.session.admin[0],"result":r});
    })
})
module.exports=router;