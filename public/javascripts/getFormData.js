$(document).ready(function() {


    $('#methodOption1').on('click',function(event){
        $('#method1Div').show();
        $('#method2Div').hide();
    });

    $('#methodOption2').on('click',function(event){
        $('#method2Div').show();
        $('#method1Div').hide();
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
                  if(data.level==3)
                      window.location.href='/a1';
                  else
                      window.location.href='/c1';
              }
            }
        })
    });
});