var handledata=require('../service/HandleData');

var dynamic={
    rank:function(){
        handledata.search("teams",{},function (err,result) {
            // top 3 for Challenge 1
            result.sort("C1min");
            var list1=[];
            for(var i=0;i<3;i++){
                if(result[i].C1min!=""&&result[i].C1min!=450)
                    list1.push(result[i].name);
            }
            list1.push("");list1.push("");list1.push("");  // in case less than 3 teams have the valid time
            handledata.update('dynamic',{"name":"C1"},{"a":list1[0],"b":list1[1],"c":list1[2]});
            // top 3 for Challenge 2
            result.sort("C2min");
            var list2=[];
            for(var i=0;i<3;i++){
                if(result[i].C2min!=""&&result[i].C2min!=450)
                    list2.push(result[i].name);
            }
            list2.push("");list2.push("");list2.push("");
            handledata.update('dynamic',{"name":"C2"},{"a":list2[0],"b":list2[1],"c":list2[2]});
            // top 3 for Challenge 3
            result.sort("C3min");
            var list3=["","",""];
            for(var i=0;i<3;i++){
                if(result[i].C3min!=""&&result[i].C3min!=940)
                    list3.push(result[i].name);
            }
            list3.push("");list3.push("");list3.push("");
            handledata.update('dynamic',{"name":"C3"},{"a":list3[0],"b":list3[1],"c":list3[2]});
            // top 3 for challenge 5
            result.sort("C5min");
            var list5=[];
            for(var i=0;i<3;i++){
                if(result[i].C5min!=""&&result[i].C5min!=600)
                    list5.push(result[i].name);
            }
            list5.push("");list5.push("");list5.push("");
            handledata.update('dynamic',{"name":"C5"},{"a":list5[0],"b":list5[1],"c":list5[2]});
            // top 3 for Challenge 7
            result.sort("C7min");
            var list7=[];
            for(var i=0;i<3;i++){
                if(result[i].C7min!=""&&result[i].C7min!=600)
                    list7.push(result[i].name);
            }
            list7.push("");list7.push("");list7.push("");
            handledata.update('dynamic',{"name":"C7"},{"a":list7[0],"b":list7[1],"c":list7[2]});
        })
    }
}
module.exports=dynamic;