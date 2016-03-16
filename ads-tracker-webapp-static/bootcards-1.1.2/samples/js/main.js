/**
 * Created by gandrejc on 9.03..
 */

ADSTRACKER = {
    init: function () {
        ADSTRACKER.listeners();
        ADSTRACKER.sortable();
        ADSTRACKER.slider();

    },

    modeChanger: function (button) {

        $withIdList = button;
        console.log(button);
        $withIdList.toggleClass("single-mode dual-mode");
        $withIdList.find(".actions .when-dual").toggleClass("hidden");
        $withIdList.find(".actions .when-single").toggleClass("hidden");
        $(".carousel-control").toggleClass("hidden");
        $withIdList.find(".slideMode-on").toggleClass("hidden");
        $withIdList.parents(".slide").find(".col-sm-7.bootcards-cards").toggleClass("hidden");
    },

    listeners: function () {
        $('body').on('click', '.slideMode-on', function (event) {
            event.preventDefault();
            $withIdList = $(event.target).parents(".left-main-list");
            ADSTRACKER.modeChanger($withIdList);
            $(".list-group-item.advert").removeClass("selected");
        });

        $('body').on('click', '.list-group-item.advert', function (event) {
            event.preventDefault();
            //console.log(event);
            $withIdList = $(event.target).parents(".left-main-list");
            if($withIdList.hasClass("single-mode")){
                ADSTRACKER.modeChanger($withIdList);
            }
            $(".list-group-item.advert").removeClass("selected");
            $(this).addClass("selected");
        });

        $("[data-toggle='tab']").click(function(){
            var $wrapper = $(this).parents(".common-wrapper");
            var $target = $(this).parents(".slide").find($(this).attr("href"));
            $wrapper.find(".tab-pane").removeClass("active");
            if(!$target.hasClass("active")){
                $target.addClass("active");
            }
        })
    },

    slider: function() {
        $('.main-slider').bxSlider({
            minSlides: 2,
            maxSlides: 3
        });
        $(".slide").css("heigth", $(".inherit-height").height());
        $(".main-slide").css("heigth", $(".inherit-height").height());

    },

    sortable: function(){
        $("#sortable1").sortable({
            start: function(event, ui){
                $(ui.item).addClass("opacity-half");
            },
            stop: function(event, ui){
                $(ui.item).removeClass("opacity-half");
            }
        });
        $("#sortable2").sortable({
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






