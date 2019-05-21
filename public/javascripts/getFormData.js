/**
 * This file is used for both login function and challenges with two flexible method options.
 */
$(document).ready(function() {

    /**
     * if the first method has been chosen, only the details of the first method would be shown accordingly.
     */
    $('#methodOption1').on('click',function(event){
        $('#method1Div').show();
        $('#method2Div').hide();
    });

    /**
     * if the second method has been chosen, only the details of the second method would be shown accordingly.
     */
    $('#methodOption2').on('click',function(event){
        $('#method2Div').show();
        $('#method1Div').hide();
    });

    
    /**
     * this function with ajax will transfer the username and password to the route.
     * The web page will turn to challenge or admin page according to the role of the user.
     */
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
              var err = data.err;
              if (err === 0) { // invalid username or password.
                  $("#invalidAlert").show();
              }else{
                  if(data.level==3) // the user is the admin.
                      window.location.href='/a1';
                  else // the user is the judge.
                      window.location.href='/c1';
              }
            }
        })
    });
});