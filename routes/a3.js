var express = require('express');
var router = express.Router();
var handledata = require('../service/HandleData');
var md5Ecryption = require('../service/md5Ecryption');


/* GET adding page. */
router.get('/', function (req, res){
    // check session
    if(!req.session.admin)
        res.redirect('/');
    else {
        // show admin accounts
        res.render('A3', {"aresult": req.session.admin[0]});
    }
})

router.post('/',function (req,res) {
    //compare the input content is adding team or adding judge
    if(req.body.judgePermission){
        //add judge account
        var name = req.body.judgeUsername;
        var psw = req.body.judgePassword;
        var permission = req.body.judgePermission;
        handledata.insert('judges',{'name':name,'password':md5Ecryption.encryptPwd(name,psw),'permission':permission});
        res.sendStatus(200);
    }else{
        // add team account
        var name = req.body.teamName;
        var manager = req.body.teamManager;
        var email = req.body.eMail;
        var number = req.body.phoneNumber;
        handledata.insert('teams',{'name':name,'manager':manager,'email':email,'phone_number':number});
        res.sendStatus(200);
    }

})
module.exports=router;