var express = require('express');
var router = express.Router();
var handledata = require('../service/HandleData');
/* GET challenge 8 listing. */
router.get('/', function (req, res){
    // session check (expert judge)
    if(req.session.judge[0].permission!=2)
        res.redirect('/login');
    // show challenge 8 info
    handledata.search('teams',{},function(err,r){
        res.render('C8',{"jresult":req.session.judge[0],"tresult":r});
    })
})
router.post('/',function (req,res) {
    // find the competing team, update its result & refresh the page for next team
    // search the team first
    handledata.search('teams',{},function(err,r){
        res.render('C8',{"jresult":req.session.judge[0],"tresult":r});
    })
    if(req.body.team!=''){
        // if this team have valid result
        var score=Number(req.body.bloggingPoints)+Number(req.body.technicalMerit)+Number(req.body.artisticMerit);
        // update result for certain team
        handledata.search('teams',{"name":req.body.team},function (err,result) {
            if(result[0].C8score==''){
                handledata.update('teams',{"name":req.body.team},{
                    "C8score":score
                })
            }
        })

    }
})
module.exports = router;