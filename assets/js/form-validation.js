
$(function () {
  'use strict';

  $.validator.setDefaults({
    submitHandler: function () {
      alert("ارسال شد!");
    }
  });

  $(function () {
    debugger;
    // validate signup form on keyup and submit
    $("#add-apple-id-form").validate({
      rules: {
        // appleIdTypeId: {
        //   required: true
        // },
        // phone: {
        //   required: true,
        //   phone: true
        // },
        // birthdate_content: {
        //   required: true
        // },
        email: {
          required: true,
          email: true
        },
        // password: {
        //   required: true,
        //   minlength: 5
        // },
        // comparePassword: {
        //   required: true,
        //   minlength: 5,
        //   equalTo: "#password"
        // },


        messages: {
          // appleIdTypeId: {
          //   required: "لطفا نام خود را وارد کنید",
          // },
          // phone: {
          //   required: "لطفا شماره مبایل خود را وارد کنید"
          // },
          // birthdate_content: "لطفا سن خود را انتخاب کنید"
          // ,
          email: "لطفا یک آدرس ایمیل معتبر وارد کنید",

          // password: {
          //   required: "لطفا رمز عبور خود را وارد کنید",
          //   minlength: "طول رمز عبور نباید کمتر از 5 کاراکتر باشد"
          // },
          // confirm_password: {
          //   required: "لطفا رمز عبور خود را وارد کنید",
          //   minlength: "طول رمز عبور نباید کمتر از 5 کاراکتر باشد",
          //   equalTo: "لطفا تکرار رمز عبور را صحیح وارد کنید"
          // },
          errorPlacement: function (error, element) {
            debugger;
            error.addClass("invalid-feedback");

            if (element.parent('.input-group').length) {
              error.insertAfter(element.parent());
            }
            else if (element.prop('type') === 'radio' && element.parent('.radio-inline').length) {
              error.insertAfter(element.parent().parent());
            }
            else if (element.prop('type') === 'checkbox' || element.prop('type') === 'radio') {
              error.appendTo(element.parent().parent());
            }
            else {
              error.insertAfter(element);
            }
          },
          highlight: function (element, errorClass) {
            if ($(element).prop('type') != 'checkbox' && $(element).prop('type') != 'radio') {
              $(element).addClass("is-invalid").removeClass("is-valid");
            }
          },
          unhighlight: function (element, errorClass) {
            if ($(element).prop('type') != 'checkbox' && $(element).prop('type') != 'radio') {
              $(element).addClass("is-valid").removeClass("is-invalid");
            }
          }
        }
      }
    });
  });
});
