/**
 * This file is used for competition management.
 */
$(document).ready(function() {

    /**
     * when the admin click to stop one specific challenge, the name of the challenge will be transfered to route,
     * and then this challenge will be stopped accrodingly.
     */
    $('#stopChallengeForm').on('submit', function(event) {

        event.preventDefault();

        var d={};

        //button equals one means one specific challenge will be stopped.
        d['button']='1';

        var wholeForm = $('#stopChallengeForm').serializeArray();

        $.each(wholeForm, function() {
            d[this.name] = this.value;
        });

        $.ajax({
            type: 'post',
            url: '/a4',
            data: d,
            success: function(data) {
                alert('Succesfully stopped!');
            }
        });
        return false;
    });


    /**
     * This function is used to change the challenge timetable.
     */
    $('#challengeTimetableForm').on('submit', function(event) {
        event.preventDefault();
        var d=$(this).serialize();
        $.ajax({
            url:'/a4',
            type:'post',
            data:d+'&'+'button=2',//button equals two means the timetable of the challenge will be changed.
            dataType:'json',
            success:function () {
                window.alert("Successfully updated!");
            }
        })

    });


});