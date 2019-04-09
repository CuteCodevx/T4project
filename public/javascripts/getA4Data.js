$(document).ready(function() {



    $('#stopChallengeForm').on('submit', function(event) {

        event.preventDefault();

        var d={};
        //button is 1 in stopChallengeForm
        d['button']='1';

        // [{name: "a1", value: "xx"},{name: "a2", value: "xx"}],
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


    $('#challengeTimetableForm').on('submit', function(event) {
        event.preventDefault();
        var d=$(this).serialize();
        $.ajax({
            url:'/a4',
            type:'post',
            data:d+'&'+'button=2',
            dataType:'json',
            success:function () {
                window.alert("Successfully updated!");
            }
        })

    });


});