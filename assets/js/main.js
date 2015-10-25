
var toIt = function (e) {
    $(window).scrollTo($('.it'), 100);

    e.preventDefault();
};

var toPhoto = function (e) {
    var windowSize = $(window).width() * -1;
    $(window).scrollTo($('.photo'), 100, {'offset' : {left: windowSize}});

    e.preventDefault();
};

var back = function (e) {
    $(window).scrollTo($('.main'), 100);

    e.preventDefault();
};

var finnishLoading = function () {
    $(window).scrollTo($('.main'), 200, { complete : function () {
        var loadDiv = $('.load').css('opacity', 0);

        setTimeout(function () {
            loadDiv.remove();
        }, 500);
    }});
};

$(document).ready(function(){
    $('.toIt').click(toIt);
    $('.toPhoto').click(toPhoto);
    $('.back').click(back);
});

//finnishLoading();
$(window).scrollTo($('.main'), 0);