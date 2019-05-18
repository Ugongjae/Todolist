window.onload = function () {
    $(function () {
        if (!$.cookie('order')) {
            $.cookie('order', 'recent');
        }
        $('.actions').children().eq(0).children('a').text($.cookie('order'));
        $("#end-date").datepicker({
            showOn: "both",
            buttonImage: "images/calendar.png",
            buttonImageOnly: true,
            buttonText: "Select date",
            dateFormat: 'yy-mm-dd'
        });
        $("#modify-end-date").datepicker({
            showOn: "both",
            buttonImage: "images/calendar.png",
            buttonImageOnly: true,
            buttonText: "Select date",
            dateFormat: 'yy-mm-dd'
        });
    })



    $('#insert-submit').click(function () {
        if ($('#end-date').val() == '') {
            $('#end-date').val('9999-12-31')
        }
    });

    $('.ok').click(function () {
        if ($('#modify-end-date').val() == '') {
            $('#modify-end-date').val('9999-12-31')
        }
    });

    $('.delete').click(function () {
        var st = $(this).prevAll('.hidden-id').attr('value');
        $.post('/delete-post',
            { data: st },
            function (d, r) {
                window.location = "./index";
            }
        )
    })

    $('i').click(function (e) {
        var st = $(this).attr('class').split("_")[1];
        if (st == '0') {
            $(this).attr('class', $(this).attr('class').split("_")[0] + "_1");
            $(this).css('background-color', '#6e6e6e');
            $.post('/blank-post',
                {
                    data: 1,
                    id: $(this).nextAll([".div-buttons"]).children(".hidden-id").attr("value")
                },
                function (d, r) {

                }
            )
        } else {
            $(this).attr('class', $(this).attr('class').split("_")[0] + "_0");
            if ($(this).attr('class').split("priority")[1][0] == "1")
                $(this).css('background-color', '#f3360d');
            else if ($(this).attr('class').split("priority")[1][0] == "2")
                $(this).css('background-color', '#f37c0d');
            else if ($(this).attr('class').split("priority")[1][0] == "3")
                $(this).css('background-color', '#f3f30d');
            else
                $(this).css('background-color', '#67fd0d');
            $.post('/blank-post',
                {
                    data: 0,
                    id: $(this).nextAll([".div-buttons"]).children(".hidden-id").attr("value")
                },
                function (d, r) {

                }
            )
        }
    })
    $('.modify').click(function () {
        $('.modify-id').attr('value', $(this).prevAll('.hidden-id').attr('value'));
        $('.modify-title').attr('value', $(this).parent().prevAll('h3').text());
        $('.modify-content').text($(this).parent().prevAll('.p-content').text());
        if ($(this).parent().prevAll('.p-date').text() == '마감기한없음') {
            $('#modify-end-date').attr('value', '');
        }
        else {
            $('#modify-end-date').attr('value', $(this).parent().prevAll('.p-date').text());
        }

        var num = 4 + Number($(this).prevAll('.hidden-priority').attr('value'));
        var radio = '#radio' + num;
        $(radio).prop('checked', true);

        $('.modal').css('display', 'block');
    })
    $('.cancel').click(function () {
        $('.modal').css('display', 'none');
        $('.modify-form')[0].reset();
    })
    $('.actions').children().eq(1).click(function () {
        if ($('#toogle').is(":visible")) {
            $('#toogle').slideUp();
        } else {
            $('#toogle').slideDown();
        }
        $('#toogle').toggleClass("hide");
    })

    $('.actions').children().eq(0).click(function () {
        if($.cookie('order')=='priority'){
            $.cookie('order','recent');
        }else{
            $.cookie('order','priority');
        }
        window.location='./index';
    })
}