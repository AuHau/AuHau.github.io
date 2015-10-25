var site = {
    page: 'main',
    lastPositionX: 0,
    lastPositionY: 0
};

var toIt = function (e) {
    site.page = 'it';
    $(window).scrollTo($('.it'), 100);

    e.preventDefault();
};

var toPhoto = function (e) {
    site.page = 'photo';
    var windowSize = $(window).width() * -1;
    $(window).scrollTo($('.photo'), 100, {'offset' : {left: windowSize}});

    e.preventDefault();
};

var back = function (e) {
    site.page = 'main';
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

var resizeHandler = function () {
    $(window).scrollTo($('.' + site.page), 0);
};

$(document).ready(function(){
    $('.toIt').click(toIt);
    $('.toPhoto').click(toPhoto);
    $('.back').click(back);
    $(window).resize(resizeHandler);
});

//finnishLoading();
$(window).scrollTo($('.main'), 0);