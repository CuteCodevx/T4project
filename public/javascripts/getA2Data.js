/**
 * This file is used for administrator management.
 */
$(document).ready(function() {


    /**
     * This function is used to change judge account.
     */
    $('#A2Form2').on('submit',function () {
        event.preventDefault();
        //judge info
        var d=$(this).serialize();
        $.ajax({
            url:'/a2',
            type:'post',
            data:d,
            dataType:'json',
            error:function (result) {
                if(result.status == 200){
                    alert("Successfully changed!");
                    location.href='A2';
                }
            }
        });
    });


    /**
     * the password input area will be shown when user check the reset tag.
     */
    $('#resetPwd').click(function(){
        $('#hiddenResetPwd').show();
    });

});