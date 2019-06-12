/**
 * Created by gandrejc on 14.05..
 */

var KARIDAGOR = {
    url: "http://api.openweathermap.org/data/2.5/forecast/daily?q=Umag&mode=json&units=metric&cnt=15&appid=0df5e16001338d762d1cc4797f94049e",
    icons: "http://openweathermap.org/img/w/",
    getForecast: function () {
        $.get(KARIDAGOR.url, function (data) {
            //console.log(JSON.stringify(data['list']));
            data['list'].forEach(function (val, i) {

                var date = new Date(val['dt'] * 1000);
                if (val['temp']) {
                    var temp = val['temp'];
                    var morning = temp['morn'];
                    var day = temp['day'];
                    var eve = temp['eve'];
                    var night = temp['night'];
                    var min = temp['min'];
                    var max = temp['max'];

                    $(".icon" + i + " .min-temp").html(Math.round(min));
                    $(".icon" + i + " .max-temp").html(Math.round(max) + '<span class="celzius">    &#8451;</span>');

                    $(".temp" + i + " .morn").html(Math.round(morning) + '<span class="celzius">    &#8451;</span>');
                    $(".temp" + i + " .day").html(Math.round(day) + '<span class="celzius">    &#8451;</span>');
                    $(".temp" + i + " .eve").html(Math.round(eve) + '<span class="celzius">    &#8451;</span>');
                    $(".temp" + i + " .night").html(Math.round(night) + '<span class="celzius">    &#8451;</span>');

                }

                if (val['weather'] && val['weather'].length > 0) {
                    var weather = val['weather'][0];
                    var icon = weather['icon'];

                    var code = weather['id'];
                    var main = TRANSLATIONS[weather['main']];
                    var desc = TRANSLATIONS[code];


                    $(".icon" + i + "> img").attr('src', KARIDAGOR.icons + icon + ".png");
                    $(".icon" + i + " .weather-title").html(main + " - " + desc);

                }
                //other data
                var hum = val['humidity'] || 'ni podatka';
                var wind = val['speed'] || 'ni podatka';
                var clouds = val['clouds'] || 'ni podatka';
                var rain = val['rain'] || 'ni podatka';
                var pressure = val['pressure'] || 'ni podatka';

                //console.log(val['rain'])

                $(".other" + i + " .hum").html(hum + (val['humidity'] ? "%" : ''));
                $(".other" + i + " .wind").html(wind + (val['speed'] ? "m/s" : ''));
                $(".other" + i + " .cloud").html(clouds + (val['clouds'] ? "%" : ''));
                $(".other" + i + " .press").html(pressure + (val['pressure'] ? "hPa" : ''));
                $(".other" + i + " .rain").html(rain + (val['rain'] ? "mm" : ''));


                $(".day" + i).html(date.toLocaleString('sl', {weekday: 'long'}) + ", " + (date.getDate()) + "." + (date.getMonth() + 1) + ".");
            })
        })
    },
    initIframes: function () {
        // if no interaction, remove iframe 240000
        var noInteraction = setTimeout(removeIframe, 120000);

        $(window).scroll(function () {
            clearTimeout(noInteraction);
            noInteraction = setTimeout(removeIframe, 120000);
        });
        $(document).click(function () {
            clearTimeout(noInteraction);
            noInteraction = setTimeout(removeIframe, 120000);
        });

        $(".video1").on('load', function () {
            $(".loader1").css("background", "none");
        });
        $(".video2").on('load', function () {
            $(".loader2").css("background", "none");
        });

    },
    initRPISensors: function () {
        $.get({
            url: "http://163.172.134.54:5000/climate",
            success: function (data) {
                var json = JSON.parse(data);
                $(".current-value.temp").html(parseFloat(json['temp']).toFixed(2));
                var date = new Date(json['localtime']);
                $(".current-value.time").html(date.toLocaleTimeString().replace(/\./g, ':'));
                $(".current-value.hum").html((parseFloat(json['hum']).toFixed(2)));
            }
        });
    },
    initMobileData: function () {
        var TWENTY_MINUTES = 20 * 60 * 1000;
        /* ms */
        //var TEN_MINUTES = 10 * 60; /* ms */
        var lastFetched = window.localStorage.getItem("bonbon.last.fetched");
        var doFetch = false;
        if (lastFetched) {
            doFetch = ((new Date()) - new Date(lastFetched)) > TWENTY_MINUTES;
        } else {
            doFetch = true;
        }
        console.log(lastFetched);
        console.log(doFetch);
        if (doFetch) {
            $.get({
                url: "http://163.172.134.54:8080/v1/fetch/bonbon",
                success: function (data) {
                    $(".bonbon.loader").addClass("hidden");
                    $("#kuna").removeClass("hidden");
                    var json = JSON.parse(data);
                    $("#net-poraba").html(json['net']);
                    $(".progress-bar").attr("style", json['width']);
                    $("#kuna").html(json['kuna']);
                    window.localStorage.setItem("bonbon.last.fetched", new Date());
                    window.localStorage.setItem("bonbon.last.net", json['net']);
                    window.localStorage.setItem("bonbon.last.width", json['width']);
                    window.localStorage.setItem("bonbon.last.kuna", json['kuna']);
                }
            });
        } else {
            $(".bonbon.loader").addClass("hidden");
            $("#kuna").removeClass("hidden");
            $("#net-poraba").html(window.localStorage.getItem("bonbon.last.net"));
            $(".progress-bar").attr("style", window.localStorage.getItem("bonbon.last.width"));
            $("#kuna").html(window.localStorage.getItem("bonbon.last.kuna"));
        }

    },

    initSMS: function () {
        $.get({
            url: "http://163.172.134.54:5000/sms",
            success: function (data) {
                $(".sms-icon.hidden").removeClass("hidden");
                $(".sms-icon.sms-loader").addClass("hidden");
                var json = JSON.parse(data);
                var keys = [];
                for (var key12 in json) {
                    if (json.hasOwnProperty(key12)) {
                        keys.push(key12);
                    }
                }
                //console.log(keys);
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    $(".sms-list").append("<p>Datum: " + json[key]['Date'] + ", " + json[key]['Time'] + "(" + json[key]['Num'] + "): " + json[key]['Body'] + "</p><hr>")
                }

                $.get({
                    url: "http://163.172.134.54:8081/smscheck?num=" + keys.length,
                    success: function (data) {
                        if (data) {
                            $(".sms-icon:not(.hidden)").attr("src", "../css/img/sms_icon_new.png");
                        }
                    }
                })
            }
        });
    }
};

var TRANSLATIONS = {
    'Thunderstorm': 'Nevhite',
    'Drizzle': 'Pršenje',
    'Rain': 'Deževje',
    'Snow': 'Sneg',
    'Atmosphere': 'Ozračje',
    'Clear': 'Jasno',
    'Clouds': 'Oblačno',
    'Extreme': 'Ekstremno',
    'Additional': 'Dodatno',

    200: 'Nevihta z dežjem',
    201: 'Nevihta z dežjem',
    202: 'Nevihta z dežjem',
    210: 'Rahla nevihta',
    211: 'Nevihta',
    212: 'Huda nevihta',
    221: 'Huda nevihta',
    230: 'Nevihta z dežjem',
    231: 'Nevihta z dežjem',
    232: 'Nevihta z dežjem',

    300: 'Rahlo pršenje',
    301: 'Rahlo pršenje',
    302: 'Rahlo pršenje',
    310: 'Rahlo pršenje',
    311: 'Rahlo pršenje',
    312: 'Pršenje',
    313: 'Dež',
    314: 'Dež',
    321: 'Dež',

    500: 'Rahlo deževje',
    501: 'Dež',
    502: 'Močno deževje',
    503: 'Močno deževje',
    504: 'Zelo močno deževje',
    511: 'Zmrznjen dež',
    520: 'Rahlo deževje',
    521: 'Deževje',
    522: 'Deževje',
    531: 'Deževje',

    600: 'Rahlo sneženje',
    601: 'Sneženje',
    602: 'Močno sneženje',
    611: 'Močno deževje',
    612: 'Sneženje',
    615: 'Deževje in sneg',
    616: 'Deževje in sneg',
    620: 'Deževje in sneg',
    621: 'Deževje in sneg',
    622: 'Deževje in sneg',

    701: 'Megla',
    711: 'Dim',
    721: 'Megla',
    731: 'Megla',
    741: 'Megla',
    751: 'Megla',
    761: 'Megla',
    762: 'Vulkanski prah :o',
    771: 'Tornado',
    781: 'Tornado',

    800: 'Jasno nebo',
    801: 'Nekaj oblačkov',
    802: 'Nekaj oblačkov',
    803: 'Oblačno',
    804: 'Oblačno',

    900: 'Tornado',
    901: 'Tropska nevihta',
    902: 'Hurikan',
    903: 'Mrzlo',
    904: 'Vroče',
    905: 'Vetrovno',
    906: 'Toža',

    951: 'Mirno',
    952: 'Rahlo piha',
    953: 'Rahlo piha',
    954: 'Rahlo piha',
    955: 'Svež veter',
    956: 'Močan veter',
    957: 'Močan veter',
    958: 'Gale*',
    959: 'Severe gale*',
    960: 'Nevihtno',
    961: 'Nevihtno',
    962: 'Hurikan'


};

/* RUN ON READY */
$(document).ready(function () {

    KARIDAGOR.getForecast();
    KARIDAGOR.initIframes();

    $('.weather-slider').bxSlider({
        slideWidth: 2500,
        minSlides: 1,
        maxSlides: 1,
        slideMargin: 10,
        infiniteLoop: false,
        hideControlOnEnd: true,
        height: 150
    });

    $(".video-gone").click(function () {
        window.location.href = "index.html";
    })

});

/* RUN WINDOW LOAD */
$(document).load(function () {


});

function removeIframe() {
    if (window.location.href.indexOf("index.html") > -1) {
        window.location.href = "inactive.html";
    }
}

function puke(data) {
    return JSON.stringify(data);
}
