/* mail compose start */
var recipients = document.getElementById("recipients");
var to = document.getElementById("to");
var cc = document.getElementById("cc");
var bcc = document.getElementById("bcc");

var toInput = document.getElementById("to-input");
var ccInput = document.getElementById("cc-input");
var bccInput = document.getElementById("bcc-input");

var ccButton = document.getElementById("cc-button");
var bccButton = document.getElementById("bcc-button");

var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var emailArray = [];

var ccCounter = 0;
var bccCounter = 0;

function removeEmail(param) {
    let emailToRemove = param.parentElement;
    let recipientCategory = emailToRemove.parentElement.id;
    let emailText = emailToRemove.textContent;
    if (recipientCategory === "cc") emailText = "Cc: " + emailText;
    if (recipientCategory === "bcc") emailText = "Bcc: " + emailText;
    let emailIndex = emailArray.indexOf(emailText);
    if (emailIndex > -1) {
        emailArray.splice(emailIndex, 1);
    }
    if (recipientCategory === "cc") ccCounter--;
    if (recipientCategory === "bcc") bccCounter--;
    emailToRemove.parentNode.removeChild(emailToRemove);
}

function keyListener(event) {
    let key = event.which;
    let eventTargetId = event.target.id;
    let inputField = document.getElementById(eventTargetId);
    let email = inputField.textContent;
    if (key == 32) { //32 is for space
        event.preventDefault();
    }
    if (key === 13) { // 13 is for enter
        event.preventDefault();
        if (eventTargetId === "cc-input") {
            emailArray.push("Cc: " + email);
            ccCounter++;
        } else if (eventTargetId === "bcc-input") {
            emailArray.push("Bcc: " + email);
            bccCounter++;
        } else {
            emailArray.push(email);
        }
        if (re.test(email)) {
            inputField.insertAdjacentHTML("beforebegin", "<span class='valid-email'>" + email + '<span class="icon-cross mail-cross" onclick="removeEmail(this)"></span></span>');
        } else {
            inputField.insertAdjacentHTML("beforebegin", "<span class='invalid-email'>" + email + '<span class="icon-cross mail-cross" onclick="removeEmail(this)"></span></span>');
        }
        inputField.innerHTML = "";
    }
}



document.body.addEventListener("click", function (event) {
    switch (event.target.id) {
        case "recipients":
            recipients.innerHTML = "Recipients";
            recipients.style.display = "none";
            to.style.display = "inline-flex";
            if (ccCounter) cc.style.display = "inline-flex";
            if (bccCounter) bcc.style.display = "inline-flex";
            ccButton.style.display = "inline";
            bccButton.style.display = "inline";
            break;
        case "cc-button":
            ccButton.style.display = "none";
            cc.style.display = "inline-flex";
            break;
        case "bcc-button":
            bccButton.style.display = "none";
            bcc.style.display = "inline-flex";
            break;
        case "new-message":
        case "new-message-heading":
        case "subject":
        case "subject-input":
        case "body":
        case "body-content":
            recipients.style.display = "block";
            to.style.display = "none";
            cc.style.display = "none";
            bcc.style.display = "none";
            if (emailArray.length !== 0) {
                recipients.innerHTML = emailArray.join(', ');
            }
    }
});
document.querySelector("#to-input").addEventListener('keypress', keyListener);
document.querySelector("#cc-input").addEventListener('keypress', keyListener);
document.querySelector("#bcc-input").addEventListener('keypress', keyListener);
/* mail compose end */


// gmail section start
$(document).on('click', '.mail-reply-lis', function () {

    // $(this).parent().siblings().find(".clit-cmmt-reply").slideUp();
    $(this).next().slideToggle();

    // $(this).parent().siblings().find(".mail-reply-lis").removeClass("clit-mail");
    $(this).toggleClass("clit-mail");

});

$(document).on('click', '.replyto-client', function () {
    $(this).parents('.clit-cmmt-reply').find(".reply-box").slideToggle();
});
// gmail section end


$('#date1').daterangepicker({
    autoUpdateInput: false,
    singleDatePicker: true,
});

$('#date1').on('apply.daterangepicker', function (ev, picker) {
    $(this).val(picker.startDate.format('MM/DD/YYYY'));
    if ($(this).val().length > 0) {
        $(this).addClass('field--not-empty');
    } else {
        $(this).removeClass('field--not-empty');
    }
});

$('#time1').daterangepicker({
    timePicker: true,
    timePicker24Hour: true,
    timePickerIncrement: 1,
    timePickerSeconds: true,
    autoUpdateInput: false,
    singleDatePicker: true,
    locale: {
        format: 'HH:mm:ss'
    }
}).on('show.daterangepicker', function (ev, picker) {
    picker.container.find(".calendar-table").hide();
});
$('#time1').on('apply.daterangepicker', function (ev, picker) {
    $(this).val(picker.startDate.format('HH:mm:ss'));
    if ($(this).val().length > 0) {
        $(this).addClass('field--not-empty');
    } else {
        $(this).removeClass('field--not-empty');
    }
});