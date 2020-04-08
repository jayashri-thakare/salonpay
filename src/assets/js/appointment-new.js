$(document).on('ready', function () {
    $(document).on('change', '.apn-service input', function () {
        // console.log('changed service');
        $('.apn-technician-selection').show();
        if ($('#apn-r1').prop("checked") == true) {
            console.log(1);
            if ($(this).prop("checked") == true) {
                $('.apn-right').show();
                $(".apn-service input").prop("checked", false);
                $(this).prop("checked", true);
            } else {
                $('.apn-right').hide();
            }
        }
    });
    $(document).on('change', '.apn-technician-box input', function () {
        // console.log('changed technician');
        if ($('#apn-r1').prop("checked") == true) {
            console.log(1);
            $(".apn-technician-box input").prop("checked", false);
            $(this).prop("checked", true);
        }
    });
    $(document).on('change', '.apn-right-radio input', function () {
        $(".apn-service input").prop("checked", false);
        $(".apn-technician-box input").prop("checked", false);
        $('.apn-technician-selection').hide();
    });
});