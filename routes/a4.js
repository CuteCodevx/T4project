var express = require('express');
var router = express.Router();
var handledata = require('../service/HandleData');
var challengemodel=require('./challengemodel');
var scoring=require('./scoring');
/* GET users listing. */
router.get('/', function (req, res){
    if(!req.session.admin)
        res.redirect('/login');
    challengemodel.findOne({'index':[1,2,3,4,5,6,7]},function(err,r){
        res.render('A4',{"aresult":req.session.admin[0],"cresult":r});
    })
})
router.post('/',function (req,res) {
    scoring.min();
    if(req.body.button=='2'){
        challengemodel.updateOne({'index':[1,2,3,4,5,6,7]},{
            'start': req.body.start,
            'end': req.body.end
        }, function (err) {
            if (err) throw err;
            challengemodel.findOne({'index':[1,2,3,4,5,6,7]},function (err,result) {
                if(result)
                    res.render("A4",{"aresult":req.session.admin[0],"cresult":result});
            })
        })
    }
    if(req.body.button=='1'){
        handledata.search('challenges',{"name":req.body.name},function (err,result) {
            console.log(req.body.name);
            if(result.length>0){
                handledata.update('challenges',{"name":req.body.name},{"status":0});
                var cNum=result[0].index;
                scoring.calculate(cNum);
            }
        })
    }
    res.send("");
})
module.exports=router;
