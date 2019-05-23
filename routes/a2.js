var express = require('express');
var router = express.Router();
var handledata = require('../service/HandleData');
/* GET judges' data. */
router.get('/', function (req, res){
    // check session
    if(!req.session.admin)
        res.redirect('/');
    else {
        // get values from the query
        var data = req.query;
        if (data.judge) {
            // if searching the judge, show this judge's info
            handledata.search('judges', {'name': data.judge}, function (err, r) {
                res.render('A2_1', {"aresult": req.session.admin[0], "result": r});
            })
        } else {
            // otherwise, show all judges' info
            handledata.fsort('judges', {'id': 1}, function (r) {
                res.render('A2', {"aresult": req.session.admin[0], "result": r});
            })
        }
    }
})
router.post('/',function (req,res) {
    // get values from pages
    var name =req.body.name;
    var psw = req.body.password;
    var permission = req.body.permission;
    var oldname = req.body.oldname;
    // update values
    handledata.search('judges',{'name':oldname},function (err,r) {
        var oldname = r[0].name;
        var oldpsw = r[0].password;
        var oldPermission = r[0].permission;
        handledata.update('judges',{'name':oldname,'password':oldpsw,'permission':oldPermission},{'name':name,'password':psw,'permission':permission})
    })
    // back to A2 page
    handledata.fsort('teams',{'id':1},function(r){
        res.render('A2',{"aresult":req.session.admin[0],"result":r});
    })
})
module.exports=router;