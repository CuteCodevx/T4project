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
                  window.alert('Password or username is invalid.');
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

    
});