var express = require('express');
var router = express.Router();
var handledata = require('../service/HandleData');
/* GET challenge 2 listing. */
router.get('/', function (req, res){
    // session check
    if(!req.session.judge)
        res.redirect('/login');
    // show challenge 2 info
    handledata.search('teams',{},function(err,rr){
        handledata.search('challenges',{'index':2},function(err,r) {
            res.render('C2', {"jresult": req.session.judge[0], "tresult": rr, "attempt": 1,"status":r[0].status});
        })
    })
})
router.post('/',function (req,res) {
    // find the competing team, update its result & refresh the page for next attempt
    // search the team first
    handledata.search('teams',{},function (err,r) {
        // then search the challenge 2
        handledata.search('challenges', {'index': 2}, function (err, result) {
            // add the attempt each time submitting the form
            var attempt = Number(req.body.attempt) + 1;
            // >3, means 3 attempts of this team is finished, thus -3 for next team
            if (attempt > 3)
                attempt -= 3;
            // when 1, allow to choose method, otherwise locking this choice
            if (attempt != 1)
                res.render('C2', {
                    "jresult": req.session.judge[0],
                    "tresult": [{"name": req.body.team}],
                    "attempt": attempt,
                    "status": result[0].status
                });
            else
                res.render('C2', {
                    "jresult": req.session.judge[0],
                    "tresult": r,
                    "attempt": attempt,
                    "status": result[0].status
                });
        })
    })
    if(req.body.min!=''&&req.body.sec!=''){
        // if this team have valid result for this attempt
        var time=Number(req.body.min)*60+Number(req.body.sec);
        var attemptt=Number(req.body.attempt);
        var name=req.body.team;
        var reward=(Number(req.body.additional)===7)?Number(req.body.additional)*15+50:Number(req.body.additional)*15;
        // calculate reward
        reward=(req.body.additonal2Option=='true')?reward+20:reward;
        var penalty=Number(req.body.penalties1Option);
        // check penalty
        if(penalty<3)
            time+=15*penalty;
        else
            time=0;
        // update result for certain attempt
        handledata.search('teams',{"name":req.body.team},function (err,result) {
            // attempt 1
            if(attemptt===1&&result[0].C2_1_reward==''){
                handledata.update('teams',{"name":name},{
                    "C2_1_reward":reward,
                    "C2_1_time":time
                })
            }
            // attempt 2
            if(attemptt===2&&result[0].C2_2_reward==''){
                handledata.update('teams',{"name":name},{
                    "C2_2_reward":reward,
                    "C2_2_time":time
                })
            }
            // attempt 3
            if(attemptt===3&&result[0].C2_3_reward==''){
                handledata.update('teams',{"name":name},{
                    "C2_3_reward":reward,
                    "C2_3_time":time
                })
            }
        })
    }
})
module.exports = router;