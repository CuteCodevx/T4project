$(document).ready(function() {


    $('#methodOption1').on('click',function(event){
        // alert('jQuery-----disable');
        // $('#additional2Option0').attr('disabled','true');
        // $('#additional2Option1').attr('disabled','true');
        // $('#additional2Option2').attr('disabled','disabled');
        // $('#additional2Option3').attr('disabled','disabled');
        // $('#additional2Option4').attr('checked','checked');
        $('#method1Div').show();
        $('#method2Div').hide();


        // alert('disable finished');
    });

    $('#methodOption2').on('click',function(event){
        // alert('jQuery-----disable');
        // $('#additional2Option0').attr('disabled','true');
        // $('#additional2Option1').attr('disabled','true');
        // $('#additional2Option2').attr('disabled','disabled');
        // $('#additional2Option3').attr('disabled','disabled');
        // $('#additional2Option4').attr('checked','checked');
        $('#method2Div').show();
        $('#method1Div').hide();
        // $('#method1Table').hide();

        // alert('disable finished');
    });

    
    $('#login').on('submit',function(e){
        e.preventDefault();

        var loginInfo={};
        loginInfo['username'] = $('#username').val();
        loginInfo['password'] = $('#password').val();

        $.ajax({
            url: '/login',
            type: 'post',
            data: loginInfo,
            dataType: 'json',
            success: function (data) {
              var err = data.err
              if (err === 0) {
                  $("#invalidAlert").show();
              }else{
                  console.log(data.level);
                  if(data.level==3)
                      window.location.href='/a1';
                  else
                      window.location.href='/c1';
              }
            }
        })
    });

//
//
// //    For A2.ejs
//     $('#A2Form1').on('submit',function(e){
//         e.preventDefault();
//
//         // var searchInfo={};
//         // searchInfo['judge'] = $('#judge').val();
//         // searchInfo['button'] = 'search';
//         //
//         // $.ajax({
//         //     url: '/a2',
//         //     type: 'post',
//         //     data: searchInfo,
//         //     dataType: 'json',
//         //     success: function (data) {
//         //         window.location.href='/a2';
//         //     }
//         // })
//         var judgeName = $('#judge option:selected').val();
//         console.log("A2 form1 search");
//         $.ajax({
//             url:'A2',
//             type:'post',
//             data:{'name':judgeName},
//             success:function (result) {
//                 console.log("success 111");
//                 //window.location.href='/A2?result='+result;
//             },
//             error:function (err,result) {
//                 console.log("wrong");
//             }
//         })
//     });
//
//
//
//     $('#A2Form2').on('submit',function(e){
//         e.preventDefault();
//         console.log("A2 form2 confirm");
//         var formData=$('#A2Form2').serializeArray();
//         formData['button']='confirm';
//
//         $.each(formData, function() {
//             formData[this.name] = this.value;
//         });
//
//         $.ajax({
//             url:'A2',
//             type:'post',
//             data:formData,
//             dataType:'json',
//             success:function () {
//                 console.log("success222222");
//                // window.location.href='/a2';
//             }
//         })
//     });

//    For A3.ejs
//     $('#A3Form1').on('submit',function(e){
//         e.preventDefault();
//
//         var addInfo=$('#A3Form1').serializeArray();
//         addInfo['button']='addJudge';
//
//         $.each(addInfo, function() {
//             addInfo[this.name] = this.value;
//         });
//
//         $.ajax({
//             url: '/a3',
//             type: 'post',
//             data: addInfo,
//             dataType: 'json',
//             success: function (data) {
//                 window.location.href='/a3';
//             }
//         })
//     });
//
//
//     $('#A3Form2').on('submit',function(e){
//
//         e.preventDefault();
//
//         var formData=$('#A3Form2').serializeArray();
//         formData['button']='addTeam';
//
//         $.each(formData, function() {
//             formData[this.name] = this.value;
//         });
//
//         $.ajax({
//             url:'/a3',
//             type:'post',
//             data:formData,
//             dataType:'json',
//             success:function () {
//                 window.location.href='/a3';
//             }
//         })
//     });

});