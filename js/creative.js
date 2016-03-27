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
        if (mail) {
            $('#subscriber-form').ajaxForm({
                url: '/subscribe', // or whatever
                success: function(succ){
                    $("#subscribe-click").html("<i class='fa fa-check' style='font-size: 25px; color: chartreuse'></i>");
                    $("#mail-input").removeClass("error");
                },
                error: function(err){
                    console.log(err);
                },
                resetForm:true
            }).submit();
        } else{
            $("#mail-input").removeClass("error").addClass("error");
        }

    });

    // Initialize WOW.js Scrolling Animations
    new WOW().init();

})(jQuery); // End of use strict
