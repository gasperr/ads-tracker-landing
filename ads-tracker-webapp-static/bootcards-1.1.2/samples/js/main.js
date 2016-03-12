/**
 * Created by gandrejc on 9.03..
 */

ADSTRACKER = {
    init: function () {
        ADSTRACKER.listeners();
        ADSTRACKER.sortable();

    },

    modeChanger: function () {
        $('#list').toggleClass("single-mode dual-mode");
        $(".actions .when-dual").toggleClass("hidden");
        $(".actions .when-single").toggleClass("hidden");
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
    },

    sortable: function(){
        $("#sortable").sortable({
            start: function(event, ui){
                $(ui.item).addClass("opacity-half");
            },
            stop: function(event, ui){
                $(ui.item).removeClass("opacity-half");
            }
        });


    }
};

// run on ready
$(document).ready(function () {
    ADSTRACKER.init();
});






