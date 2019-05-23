/**
 * This file is used for administrator management.
 */
$(document).ready(function() {


    /**
     * This function is used to add judge account.
     */
    $('#A3Form1').on('submit',function () {
        event.preventDefault();
        //username, password, permission
        var d=$(this).serialize();
        $.ajax({
            url:'/a3',
            type:'post',
            data:d,
            dataType:'json',
            success:function (result) {
                console.log(result);
                if(result.status == 200){
                    alert("Successfully Added!");
                    location.href='A3';
                }

            },
            error:function (err) {
                if(err.status ==200){
                    alert("Successfully Added!");
                    location.href='A3';
                }

            }
        })
    })


    /**
     * This function is used to add a new team information.
     */
    $('#A3Form2').on('submit',function () {
        event.preventDefault();
        //team name, manager, email, phone number
        var d=$(this).serialize();
        $.ajax({
            url:'/a3',
            type:'post',
            data:d,
            dataType:'json',
            success:function (result) {
                if(result.status == 200){
                    alert("Successfully Added!");
                    location.href='A3';
                }
            },
            error:function (err) {
                if(err.status == 200){
                    alert("Successfully Added!");
                    location.href='A3';
                }
            }
        })
    })
});