var express = require('express');
var router = express.Router();
var handledata = require('../service/HandleData');
/* GET users listing. */
router.get('/', function (req, res){
    var data = req.query;
    if(data.team){
       // res.render('A1',{"aresult":req.session.admin[0],"result":data});
        handledata.search('teams',{'name':data.team},function(err,r){
            res.render('A1',{"aresult":req.session.admin[0],"result":r});
        })
    }else{
        handledata.search('teams',{},function(err,r){
            res.render('A1',{"aresult":req.session.admin[0],"result":r});
        })

    }


})

router.post('/',function (req,res) {
    var teamName = req.body.name;
    handledata.search('teams',{'name':teamName},function (err,result) {
        if(err){
            console.log(err);
        }else{
            res.send(result[0]);
        }
    })
})

module.exports=router;