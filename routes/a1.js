var express = require('express');
var router = express.Router();
var handledata = require('../service/HandleData');
/* GET teams listing. */
router.get('/', function (req, res){
    // check session
    if(!req.session.admin)
        res.redirect('/');
    else {
        // get the query
        var data = req.query;
        if (data.team) {
            // if searching the team, show info of this team
            handledata.search('teams', {'name': data.team}, function (err, r) {
                res.render('A1_1', {"aresult": req.session.admin[0], "result": r});
            })
        } else {
            // otherwise, show all teams' data
            handledata.fsort('teams', {'id': 1}, function (r) {
                res.render('A1', {"aresult": req.session.admin[0], "result": r});
            })
        }
    }
})

router.post('/',function (req,res) {
    // get values from pages
    var name =req.body.name;
    var manager = req.body.manager;
    var number = req.body.phone_number;
    var email = req.body.email;
    var C1_1_time = req.body.C1_1_time;
    var C2_1_time = req.body.C2_1_time;
    var C3_1_time = req.body.C3_1_time;
    var C5_1_time = req.body.C5_1_time;
    var C7_1_time = req.body.C7_1_time;
    var C1_2_time = req.body.C1_2_time;
    var C2_2_time = req.body.C2_2_time;
    var C3_2_time = req.body.C3_2_time;
    var C5_2_time = req.body.C5_2_time;
    var C7_2_time = req.body.C7_2_time;
    var C1_3_time = req.body.C1_3_time;
    var C2_3_time = req.body.C2_3_time;
    var C3_3_time = req.body.C3_3_time;
    var C5_3_time = req.body.C5_3_time;
    var C7_3_time = req.body.C7_3_time;
    var C1_1_reward = req.body.C1_1_reward;
    var C2_1_reward = req.body.C2_1_reward;
    var C3_1_reward = req.body.C3_1_reward;
    var C5_1_reward = req.body.C5_1_reward;
    var C7_1_reward = req.body.C7_1_reward;
    var C1_2_reward = req.body.C1_2_reward;
    var C2_2_reward = req.body.C2_2_reward;
    var C3_2_reward = req.body.C3_2_reward;
    var C5_2_reward = req.body.C5_2_reward;
    var C7_2_reward = req.body.C7_2_reward;
    var C1_3_reward = req.body.C1_3_reward;
    var C2_3_reward = req.body.C2_3_reward;
    var C3_3_reward = req.body.C3_3_reward;
    var C5_3_reward = req.body.C5_3_reward;
    var C7_3_reward = req.body.C7_3_reward;
    var C4_win = req.body.C4_win;
    var C4_reward = req.body.C4_reward;
    var C4score = req.body.C4score;
    var C1score = req.body.C1score;
    var C2score = req.body.C2score;
    var C3score = req.body.C3score;
    var C5score = req.body.C5score;
    var C6score = req.body.C6score;
    var C7score = req.body.C7score;
    var C8score = req.body.C8score;
    var Cscore = req.body.Cscore;
    var oldname = req.body.oldname;
    // update values
    handledata.search('teams',{'name':oldname},function (err,r) {
        var oldname =r[0].name;
        var oldmanager = r[0].manager;
        var oldnumber = r[0].phone_number;
        var oldemail = r[0].email;
        var oldC1_1_time = r[0].C1_1_time;
        var oldC2_1_time = r[0].C2_1_time;
        var oldC3_1_time = r[0].C3_1_time;
        var oldC5_1_time = r[0].C5_1_time;
        var oldC7_1_time = r[0].C7_1_time;
        var oldC1_2_time = r[0].C1_2_time;
        var oldC2_2_time = r[0].C2_2_time;
        var oldC3_2_time = r[0].C3_2_time;
        var oldC5_2_time = r[0].C5_2_time;
        var oldC7_2_time = r[0].C7_2_time;
        var oldC1_3_time = r[0].C1_3_time;
        var oldC2_3_time = r[0].C2_3_time;
        var oldC3_3_time = r[0].C3_3_time;
        var oldC5_3_time = r[0].C5_3_time;
        var oldC7_3_time = r[0].C7_3_time;
        var oldC1_1_reward = r[0].C1_1_reward;
        var oldC2_1_reward = r[0].C2_1_reward;
        var oldC3_1_reward = r[0].C3_1_reward;
        var oldC5_1_reward = r[0].C5_1_reward;
        var oldC7_1_reward = r[0].C7_1_reward;
        var oldC1_2_reward = r[0].C1_2_reward;
        var oldC2_2_reward = r[0].C2_2_reward;
        var oldC3_2_reward = r[0].C3_2_reward;
        var oldC5_2_reward = r[0].C5_2_reward;
        var oldC7_2_reward = r[0].C7_2_reward;
        var oldC1_3_reward = r[0].C1_3_reward;
        var oldC2_3_reward = r[0].C2_3_reward;
        var oldC3_3_reward = r[0].C3_3_reward;
        var oldC5_3_reward = r[0].C5_3_reward;
        var oldC7_3_reward = r[0].C7_3_reward;
        var oldC4_win = r[0].C4_win;
        var oldC4_reward = r[0].C4_reward;
        var oldC4score = r[0].C4score;
        var oldC1score = r[0].C1score;
        var oldC2score = r[0].C2score;
        var oldC3score = r[0].C3score;
        var oldC5score = r[0].C5score;
        var oldC6score = r[0].C6score;
        var oldC7score = r[0].C7score;
        var oldC8score = r[0].C8score;
        var oldCscore = r[0].Cscore;
        handledata.update('teams',
            {'name':oldname,'manager':oldmanager,'phone_number':oldnumber,'email':oldemail,'C1_1_time':oldC1_1_time,'C2_1_time':oldC2_1_time,'C3_1_time':oldC3_1_time,'C5_1_time':oldC5_1_time,'C7_1_time':oldC7_1_time,'C1_2_time':oldC1_2_time,'C2_2_time':oldC2_2_time,'C3_2_time':oldC3_2_time,'C5_2_time':oldC5_2_time,'C7_2_time':oldC7_2_time,'C1_3_time':oldC1_3_time,'C2_3_time':oldC2_3_time,'C3_3_time':oldC3_3_time,'C5_3_time':oldC5_3_time,'C7_3_time':oldC7_3_time,'C1_1_reward':oldC1_1_reward,'C2_1_reward':oldC2_1_reward,'C3_1_reward':oldC3_1_reward,'C5_1_reward':oldC5_1_reward,'C7_1_reward':oldC7_1_reward,'C1_2_reward':oldC1_2_reward,'C2_2_reward':oldC2_2_reward,'C3_2_reward':oldC3_2_reward,'C5_2_reward':oldC5_2_reward,'C7_2_reward':oldC7_2_reward,'C1_3_reward':oldC1_3_reward,'C2_3_reward':oldC2_3_reward,'C3_3_reward':oldC3_3_reward,'C5_3_reward':oldC5_3_reward,'C7_3_reward':oldC7_3_reward,'C4_win':oldC4_win,'C4_reward':oldC4_reward,'C1score':oldC1score,'C2score':oldC2score,'C3score':oldC3score,'C4score':oldC4score,'C5score':oldC5score,'C6score':oldC6score,'C7score':oldC7score,'C8score':oldC8score,'Cscore':oldCscore
        },
            {'name':name,'manager':manager,'phone_number':number,'email':email,'C1_1_time':C1_1_time,'C2_1_time':C2_1_time,'C3_1_time':C3_1_time,'C5_1_time':C5_1_time,'C7_1_time':C7_1_time,'C1_2_time':C1_2_time,'C2_2_time':C2_2_time,'C3_2_time':C3_2_time,'C5_2_time':C5_2_time,'C7_2_time':C7_2_time,'C1_3_time':C1_3_time,'C2_3_time':C2_3_time,'C3_3_time':C3_3_time,'C5_3_time':C5_3_time,'C7_3_time':C7_3_time,'C1_1_reward':C1_1_reward,'C2_1_reward':C2_1_reward,'C3_1_reward':C3_1_reward,'C5_1_reward':C5_1_reward,'C7_1_reward':C7_1_reward,'C1_2_reward':C1_2_reward,'C2_2_reward':C2_2_reward,'C3_2_reward':C3_2_reward,'C5_2_reward':C5_2_reward,'C7_2_reward':C7_2_reward,'C1_3_reward':C1_3_reward,'C2_3_reward':C2_3_reward,'C3_3_reward':C3_3_reward,'C5_3_reward':C5_3_reward,'C7_3_reward':C7_3_reward,'C4_win':C4_win,'C4_reward':C4_reward,'C1score':C1score,'C2score':C2score,'C3score':C3score,'C4score':C4score,'C5score':C5score,'C6score':C6score,'C7score':C7score,'C8score':C8score,'Cscore':Number(Cscore)
        })
    })
    handledata.fsort('teams',{'id':1},function(r){
        res.render('A1',{"aresult":req.session.admin[0],"result":r});
    })
})

module.exports=router;