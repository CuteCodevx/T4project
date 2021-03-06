var handledata = require('../service/HandleData');

// package functions inside for convenience
var scoring={
    // find minmum time (if measured by time)
    min:function () {
    handledata.search("teams",{},function (err,result) {
        // go through all teams, find min time for each challenge measured by time
        for(var i=0;i<result.length;i++){
            // if this team's time for this attempt is empty, means invalid attempt. Thus, make it the maximum time
            var C1min=Math.min((result[i].C1_1_time!='')?result[i].C1_1_time:450,(result[i].C1_2_time!='')?result[i].C1_2_time:450,(result[i].C1_3_time!='')?result[i].C1_3_time:450);
            var C2min=Math.min((result[i].C2_1_time!='')?result[i].C2_1_time:450,(result[i].C2_2_time!='')?result[i].C2_2_time:450,(result[i].C2_3_time!='')?result[i].C2_3_time:450);
            if(result[i].C3_1_time!=''&& result[i].C3_2_time!=''&& result[i].C3_3_time!='')
                var C3min=Number(result[i].C3_1_time)+Number(result[i].C3_2_time)+Number(result[i].C3_3_time);
            else
                var C3min=940;

            var C5min=Math.min((result[i].C5_1_time!='')?result[i].C5_1_time:600,(result[i].C5_2_time!='')?result[i].C5_2_time:600,(result[i].C5_3_time!='')?result[i].C5_3_time:600);
            var C7min=Math.min((result[i].C7_1_time!='')?result[i].C7_1_time:660,(result[i].C7_2_time!='')?result[i].C7_2_time:660,(result[i].C7_3_time!='')?result[i].C7_3_time:660);
            // update minimum time
            handledata.update("teams",{"id":result[i].id},{
                "C1min":C1min,
                "C2min":C2min,
                "C3min":C3min,
                "C5min":C5min,
                "C7min":C7min
            })
        }
    })
},
    // for each challenge,use a formula to calculate scores
    calculate:function (cNum) {
        // each challenge has a different calculating method
        switch (cNum){
            case 1:
                handledata.fsort("teams",{'C1min':1},function (result) {
                    for(var i=0;i<result.length;i++){
                        var score=Number(result[i].C1_1_reward)+Number(result[i].C1_2_reward)+Number(result[i].C1_3_reward)+Math.ceil(i*i/2+2);
                        handledata.update("teams",{"name":result[i].name},{"C1score":score});
                    }
                });
                break;
            case 2:
                handledata.fsort("teams",{'C2min':1},function (result) {
                    for(var i=0;i<result.length;i++){
                        var score=Number(result[i].C2_1_reward)+Number(result[i].C2_2_reward)+Number(result[i].C2_3_reward)+Math.ceil(i*i/2+2);
                        handledata.update("teams",{"name":result[i].name},{"C2score":score});
                    }
                });
                break;
            case 3:
                handledata.fsort("teams",{'C3min':1},function (result) {
                    for(var i=0;i<result.length;i++){
                        var score=Number(result[i].C3_1_reward)+Number(result[i].C3_2_reward)+Number(result[i].C3_3_reward)+Math.ceil(i*i/2+2);
                        handledata.update("teams",{"name":result[i].name},{"C3score":score});
                    }
                });
                break;
            case 4:
                handledata.fsort("teams",{'C4win':1},function (result) {
                    for(var i=0;i<result.length;i++){
                        if(i<4)
                            var score=Number(result[i].C4_reward)+125-25*i;
                        else
                            var score=Number(result[i].C4_reward);
                        handledata.update("teams",{"name":result[i].name},{"C4score":score});
                    }
                });
                break;
            case 5:
                handledata.fsort("teams",{'C5min':1},function (result) {
                    for(var i=0;i<result.length;i++){
                        var score=Number(result[i].C5_1_reward)+Number(result[i].C5_2_reward)+Number(result[i].C5_3_reward);
                        handledata.update("teams",{"name":result[i].name},{"C5score":score});
                    }
                });
                break;
            case 6:
                break;
            case 7:
                handledata.fsort("teams",{'C7min':1},function (result) {
                    for(var i=0;i<result.length;i++){
                        var score=Number(result[i].C7_1_reward)+Number(result[i].C7_2_reward)+Number(result[i].C7_3_reward)+Math.ceil(i*i/2+2);
                        handledata.update("teams",{"name":result[i].name},{"C7score":score});
                    }
                });
                break;
        }
    },
    // adding scores to get final score for each team
    final: function () {
        handledata.search('teams',{},function (err,r) {
            var score;
            for(var i=0;i<r.length;i++){
                score=Number(r[i].C1score)+Number(r[i].C2score)+Number(r[i].C3score)+Number(r[i].C4score)+Number(r[i].C5score)+Number(r[i].C6score)+Number(r[i].C7score);
                handledata.update('teams',{"name":r[i].name},{"Cscore":score});
            }
        })
    }
}
module.exports=scoring;