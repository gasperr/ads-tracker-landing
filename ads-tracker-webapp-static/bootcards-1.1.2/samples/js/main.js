/**
 * Created by gandrejc on 9.03..
 */

ADSTRACKER = {
    init: function () {
        ADSTRACKER.listeners();
    },

    modeChanger: function () {
        $('#list').toggleClass("single-mode dual-mode");
    },

    listeners: function () {
        $('body').on('click', '#slideMode-on', function (event) {
            event.preventDefault();
            ADSTRACKER.modeChanger();
            $(".list-group-item.advert").removeClass("selected");
        });

        $('body').on('click', '.list-group-item.advert', function (event) {
            event.preventDefault();
            if($('#list').hasClass("single-mode")){
                ADSTRACKER.modeChanger();
            }
            $(".list-group-item.advert").removeClass("selected");
            $(this).addClass("selected");
        });
    }
};

// run on ready
$(document).ready(function () {
    ADSTRACKER.init();
});






