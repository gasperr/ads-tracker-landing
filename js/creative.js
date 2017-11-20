/*!
 * Start Bootstrap - Creative Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

(function ($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    })

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function () {
        $('.navbar-toggle:visible').click();
    });

    // Fit Text Plugin for Main Header
    $("h1").fitText(
        1.2, {
            minFontSize: '25px',
            maxFontSize: '65px'
        }
    );

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    });

    $("#subscribe-click").click(function (e) {
        e.preventDefault();
        var mail = $("#mail-input").val();
        var body = $("#text-input").val();
        if (mail) {
            $("#mail-input").removeClass("error");
            if (body) {
                $("#text-input").removeClass("error");
                $('#subscriber-form').ajaxForm({
                    url: 'http://163.172.178.251:8080/middleware/inquiry',
                    // url: 'http://localhost:8081/middleware/inquiry',
                    headers: {"Authorization" : "pLsD0ntSp4mM3"},
                    success: function (succ) {
                        $("#subscribe-click").html("<i class='fa fa-check' style='font-size: 25px; color: chartreuse'></i>");
                        $("#mail-input").removeClass("error");
                    },
                    error: function (err) {
                        console.log(err);
                    },
                    resetForm: true
                }).submit();
            } else {
                $("#text-input").removeClass("error").addClass("error");
            }

        } else {
            $("#mail-input").removeClass("error").addClass("error");
        }

    });

    $("#want-business-license").click(function (e) {
        e.preventDefault();
        $("#text-input").val("Želim dostop s poslovno licenco.");
        $("#click-for-contact").trigger("click");
    });

    $("#want-osnovna-license").click(function (e) {
        e.preventDefault();
        $("#text-input").val("Želim dostop z osnovno+ licenco.");
        $("#click-for-contact").trigger("click");
    });

    $("#want-advanced-license").click(function (e) {
        e.preventDefault();
        $("#text-input").val("Želim dostop z napredno licenco.");
        $("#click-for-contact").trigger("click");
    });


    $("#locale-sl").click(function (e) {
        e.preventDefault();
        $(this).removeClass("selected").addClass("selected");
        $("#locale-en").removeClass("selected");
        T.doTranslate("sl");
    });
    $("#locale-en").click(function (e) {
        e.preventDefault();
        $(this).removeClass("selected").addClass("selected");
        $("#locale-sl").removeClass("selected");
        T.doTranslate("en");
    });

    // Initialize WOW.js Scrolling Animations
    new WOW().init();
    // T.init();

})(jQuery); // End of use strict
