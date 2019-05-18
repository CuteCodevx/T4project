var express = require('express');
var router = express.Router();
var handledata = require('../service/HandleData');
/* GET challenge 5 listing. */
router.get('/', function (req, res){
    // session check
    if(!req.session.judge)
        res.redirect('/login');
    // show challenge 5 info
    handledata.search('teams',{},function(err,rr){
        handledata.search('challenges',{'index':5},function(err,r) {
            res.render('C5', {
                "jresult": req.session.judge[0],
                "tresult": rr,
                "attempt": 1,
                "methodOption": 0,
                "status": r[0].status
            });
        })
    })
})
router.post('/',function (req,res) {
    // find the competing team, update its result & refresh the page for next attempt
    // search the team first
    handledata.search('teams',{},function(err,r){
        // then search the challenge 5
        handledata.search('challenges', {'index': 5}, function (err, result) {
            // add the attempt each time submitting the form
            var attempt = Number(req.body.attempt) + 1;
            // >3, means 3 attempts of this team is finished, thus -3 for next team
            if (attempt > 3)
                attempt -= 3;
            // when 1, allow to choose method, otherwise locking this choice
            if (attempt != 1)
                res.render('C5', {
                    "jresult": req.session.judge[0],
                    "tresult": [{"name": req.body.team}],
                    "attempt": attempt,
                    "methodd": req.body.methodd,
                    "status":result[0].status
                });
            else
                res.render('C5', {
                    "jresult": req.session.judge[0],
                    "tresult": r,
                    "attempt": attempt,
                    "methodd": req.body.methodd,
                    "status":result[0].status
                });
        })
    })
    if(req.body.min!=''&&req.body.sec!=''){
        // if this team have valid result for this attempt
        var attemptt=Number(req.body.attempt);
        var name=req.body.team;
        var time=Number(req.body.min)*60+Number(req.body.sec);
        // check reward
        var reward=0;
        reward+=(req.body.methodd='1')?75:0
        reward+=(req.body.point1Option=='true')?20:0;
        reward+=(req.body.point2Option=='true')?20:0;
        reward+=(req.body.point3Option=='true')?20:0;
        reward+=(req.body.point4Option=='true')?20:0;
        reward+=(req.body.point5Option=='true')?20:0;
        reward+=(reward==175)?30:0;
        // update result for certain attempt
        handledata.search('teams',{"name":req.body.team},function (err,result) {
            // attempt 1
            if(attemptt===1&&result[0].C5_1_reward==''){
                handledata.update('teams',{"name":name},{
                    "C5_1_reward":reward,
                    "C5_1_time":time
                })
            }
            // attempt 2
            if(attemptt===2&&result[0].C5_2_reward==''){
                handledata.update('teams',{"name":name},{
                    "C5_2_reward":reward,
                    "C5_2_time":time
                })
            }
            // attempt 3
            if(attemptt===3&&result[0].C5_3_reward==''){
                handledata.update('teams',{"name":name},{
                    "C5_3_reward":reward,
                    "C5_3_time":time
                })
            }
        })
    }
})
module.exports = router;