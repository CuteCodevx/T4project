var express = require('express');
var router = express.Router();
var handledata = require('../service/HandleData');
/* GET adding page. */
router.get('/', function (req, res){
    // show admin accounts
    res.render('A3',{"aresult":req.session.admin[0]});
})

router.post('/',function (req,res) {
    //compare the input content is adding team or adding judge
    console.log(req.body);
    if(req.body.judgePermission){
        //add judge account
        var name = req.body.judgeUsername;
        var psw = req.body.judgePassword;
        var permission = req.body.judgePermission;
        handledata.insert('judges',{'name':name,'password':psw,'permission':permission});
        res.sendStatus(200);
    }else{
        // add team account
        var name = req.body.teamName;
        var manager = req.body.teamManager;
        var email = req.body.eMail;
        var number = req.body.phoneNumber;
        handledata.insert('teams',{'name':name,'manager':manager,'email':email,'phone_number':number});
        handledata.fsort('teams',{'id':1},function(r){
            res.render('A1',{"aresult":req.session.admin[0],"result":r});
        })
    }

})
module.exports=router;