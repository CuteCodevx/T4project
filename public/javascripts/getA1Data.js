/**
 * This file is used for administrator management.
 */
$(document).ready(function() {


    /**
     * This function is used to change judge account.
     */
    $('#A1Form2').on('submit',function () {
        event.preventDefault();
        //judge info
        var d=$(this).serialize();
        $.ajax({
            url:'/a1',
            type:'post',
            data:d,
            dataType:'json',
            error:function (result) {
                if(result.status == 200){
                    alert("Successfully changed!");
                    location.href='A1';
                }
            }
        });
    });
});