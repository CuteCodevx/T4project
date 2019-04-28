var express = require('express');
var router = express.Router();
var handledata = require('../service/HandleData');
/* GET users listing. */
router.get('/', function (req, res){
    if(!req.session.judge)
        res.redirect('/login');
    handledata.search('teams',{},function(err,rr){
        handledata.search('challengesPi',{'index':4},function(err,r) {
            res.render('C4', {"jresult": req.session.judge[0], "tresult": rr, "status": r[0].status});
        })
    })
})
router.post('/',function (req,res) {
    handledata.search('teams',{},function(err,r){
        handledata.search('challengesPi', {'index': 1}, function (err, result) {
            res.render('C4', {"jresult": req.session.judge[0], "tresult": r, "status":result[0].status});
        })
    })
    var name=(req.body.additional=='red')?req.body.teamRed:req.body.teamBlue;
    var reward=Number(req.body.points);
    if(req.body.teamRed!=req.body.teamBlue){
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