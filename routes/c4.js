var express = require('express');
var router = express.Router();
var handledata = require('../service/HandleData');
/* GET challenge 4 listing. */
router.get('/', function (req, res){
    // session check
    if(!req.session.judge)
        res.redirect('/');
    else{
    // show challenge 4 info
    handledata.search('teams',{},function(err,rr){
        handledata.search('challenges',{'index':4},function(err,r) {
            res.render('C4', {"jresult": req.session.judge[0], "tresult": rr, "status": r[0].status});
        })
    })
    }
})
router.post('/',function (req,res) {
    // find the competing team, update its result & refresh the page for next team
    // search the team first
    handledata.search('teams',{},function(err,r){
        handledata.search('challenges', {'index': 1}, function (err, result) {
            res.render('C4', {"jresult": req.session.judge[0], "tresult": r, "status":result[0].status});
        })
    })
    // store the winning team name
    var name=(req.body.additional=='red')?req.body.teamRed:req.body.teamBlue;
    // check reward
    var reward=Number(req.body.points);
    // if two side are not same, the result is valid
    if(req.body.teamRed!=req.body.teamBlue){
        // update winning team info, if this team have valid result for this attempt
        handledata.search('teams',{"name":name},function (err,r) {
            var win=r[0].C4_win+1;
            handledata.update('teams',{"name":name},{
                "C4_win":win,
                "C4_reward":reward
            })
        })
    }

})
module.exports = router;