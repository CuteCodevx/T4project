var express = require('express');
var router = express.Router();
var handledata = require('../service/HandleData');
/* GET challenge 1 listing. */
router.get('/', function (req, res){
    // session check
    if(!req.session.judge)
        res.redirect('/');
    else{
    // show challenge 1 info
    handledata.search('teams',{},function(err,rr){
        handledata.search('challenges',{'index': 1},function(err,result){
            res.render('C1',{"jresult":req.session.judge[0],"tresult":rr,"attempt":1,"methodOption":0,"status":result[0].status});
        })
    })
}
})
router.post('/',function (req,res) {
    // find the competing team, update its result & refresh the page for next attempt
    // search the team first
    handledata.search('teams',{},function (err,r) {
        // then search the challenge 1
        handledata.search('challenges', {'index': 1}, function (err, result) {
            // add the attempt each time submitting the form
            var attempt = Number(req.body.attempt) + 1;
            // >3, means 3 attempts of this team is finished, thus -3 for next team
            if (attempt > 3)
                attempt -= 3;
            // when 1, allow to choose method, otherwise locking this choice
            if (attempt != 1)
                res.render('C1', {
                    "jresult": req.session.judge[0],
                    "tresult": [{"name": req.body.team}],
                    "attempt": attempt,
                    "methodOption": req.body.methodOption,
                    "status":result[0].status
                });
            else
                res.render('C1', {
                    "jresult": req.session.judge[0],
                    "tresult": r,
                    "attempt": attempt,
                    "methodOption": req.body.methodOption,
                    "status":result[0].status
                });
        })
    })
    if(req.body.min!=''&&req.body.sec!=''){
        // if this team have valid result for this attempt
        var name=req.body.team;
        var method=req.body.methodOption;
        var time=Number(req.body.min)*60+Number(req.body.sec);
        var reward=Number(req.body.additional);
        var penalty=Number(req.body.penalty);
        var attemptt=Number(req.body.attempt);
        // check method option
        if(method==='Method1')
            reward=(reward===4)?reward*35+30:reward*35;
        else
            reward=(reward===4)?reward*30+25:reward*30;
        // check penalty
        if(penalty>1)
            time=(penalty===2||penalty===3)?(time+(penalty-1)*15):0;
        // update result for certain attempt
        handledata.search('teams',{"name":req.body.team},function (err,result) {
            // attempt 1
            if(attemptt===1&&result[0].C1_1_reward==''){
                handledata.update('teams',{"name":name},{
                    "C1_1_reward":reward,
                    "C1_1_time":time
                })
            }
            // attempt 2
            if(attemptt===2&&result[0].C1_2_reward==''){
                handledata.update('teams',{"name":name},{
                    "C1_2_reward":reward,
                    "C1_2_time":time
                })
            }
            // attempt 3
            if(attemptt===3&&result[0].C1_3_reward==''){
                handledata.update('teams',{"name":name},{
                    "C1_3_reward":reward,
                    "C1_3_time":time
                })
            }
        })
    }
})
module.exports = router;