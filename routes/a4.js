var express = require('express');
var router = express.Router();
var handledata = require('../service/HandleData');
var challengemodel=require('./challengemodel');
var scoring=require('./scoring');
/* GET challenges listing. */
router.get('/', function (req, res){
    // check session
    if(!req.session.admin)
        res.redirect('/');
    else{
    // show challenges' info
    challengemodel.findOne({'index':[1,2,3,4,5,6,7]},function(err,r){
        res.render('A4',{"aresult":req.session.admin[0],"cresult":r});
    })
    }
})
router.post('/',function (req,res) {
    // use min function to calculate & update minimum time
    scoring.min();
    // "confirm" button
    if(req.body.button=='2'){
        // change sart & end time for all 7 challenges
        challengemodel.updateOne({'index':[1,2,3,4,5,6,7]},{
            'start': req.body.start,
            'end': req.body.end
        }, function (err) {
            // dealing the error
            if (err) throw err;
            // display results again
            challengemodel.findOne({'index':[1,2,3,4,5,6,7]},function (err,result) {
                if(result)
                    res.render("A4",{"aresult":req.session.admin[0],"cresult":result});
            })
        })
    }
    // "stop" button
    if(req.body.button=='1'){
        handledata.search('challenges',{"name":req.body.name},function (err,result) {
            // if this team exists, change its status to 0
            if(result.length>0){
                handledata.update('challenges',{"name":req.body.name},{"status":0});
                // find its id
                var cNum=result[0].index;
                // calculate 7 teams' scores of this challenge
                scoring.calculate(cNum);
            }
        })
    }
    // trigger ajax
    res.send("");
})
module.exports=router;
