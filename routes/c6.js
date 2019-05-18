var express = require('express');
var router = express.Router();
var handledata = require('../service/HandleData');
/* GET challenge 6 listing. */
router.get('/', function (req, res){
    // session check
    if(!req.session.judge)
        res.redirect('/login');
    // show challenge 6 info
    handledata.search('teams',{},function(err,rr){
        handledata.search('challenges',{'index':6},function(err,r) {
            res.render('C6', {"jresult": req.session.judge[0], "tresult": rr, "status": r[0].status});
        })
    })
})
router.post('/',function (req,res) {
    // find the competing team, update its result & refresh the page for next team
    // search the team first
    handledata.search('teams',{},function(err,r){
        // then search the challenge 6
        handledata.search('challenges', {'index': 6}, function (err, result) {
            res.render('C6', {"jresult": req.session.judge[0], "tresult": r, "status":result[0].status});
        })
    })
    if(req.body.team!=''&&req.body.points!=''){
        // if this team have valid result
        var pts=(Number(req.body.points)>5)?45*Number(req.body.points)+40:45*Number(req.body.points);
        // update result for certain team
        handledata.search('teams',{"name":req.body.team},function (err,result) {
            if(result[0].C6score==''){
                handledata.update('teams',{"name":req.body.team},{
                    "C6score":pts
                })
            }
        })
    }

})
module.exports = router;