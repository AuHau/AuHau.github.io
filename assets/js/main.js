var responsiveWidth = 1024;
var classes = ['orange', 'white'];

/**
 * Menu color changer for Fullpage.js
 * @param index
 * @param nextIndex
 * @param direction
 */
var menuHandler = function (index, nextIndex, direction) {
    if($(window).width() < responsiveWidth){
        return;
    }

    var nav = $('nav');
    nextIndex--;

    var duration;
    if(direction == 'up'){
        duration = 180;
    }else{
        duration = 540;
    }

    if(!framesMenuClasses[nextIndex]){
        setTimeout(function () {
            nav.removeClass('orange').removeClass('white');
        }, duration);
    }else if(!nav.hasClass(framesMenuClasses[nextIndex])){
        setTimeout(function () {
            nav.removeClass('orange').removeClass('white').addClass(framesMenuClasses[nextIndex]);
        }, duration);
    }
};

var getClassFromFrame = function ($frame) {
    var frameClasses = $frame.attr('class').split(/\s+/);

    for (var i = 0; i < frameClasses.length; i++) {
        if ($.inArray(frameClasses[i], classes) > -1) {
            return frameClasses[i];
        }
    }

    if($frame.data('menuclass')){
        return $frame.data('menuclass');
    }
};

/**
 * Remove all classes from $elem defined in array "classes"
 * @param $elem
 */
var removeClasses = function ($elem) {
    for (var i = 0; i < classes.length; i++) {
        $elem.removeClass(classes[i]);
    }
};

/**
 * Menu color changer for normal scrolling
 */
var menuColorSwitcher = function () {
    if($(window).width() >= responsiveWidth){
        return;
    }

    var frames = $(".frame");
    var $nav = $('nav');
    var navHeight = $nav.height();
    var i, rect, frameClass;

    for (i = 0; i < frames.length; i++) {
        rect = frames[i].getBoundingClientRect();

        if (rect.top < navHeight &&
            rect.bottom > navHeight) {

            frameClass = getClassFromFrame($(frames[i]));
            if(frameClass && !$nav.hasClass(frameClass)){
                removeClasses($nav);
                $nav.addClass(frameClass);
            }else if(!frameClass){
                removeClasses($nav);
            }
            break;
        }

    }
};

/**
 * Click handler which will move to next frame
 * @param e
 */
var nextHandler = function (e) {
    $.fn.fullpage.moveSectionDown();
    e.preventDefault();
};

$(document).ready(function(){
    $('.page').fullpage({
        sectionSelector: '.frame',
        menu: '#menu',
        recordHistory: false,
        scrollBar: true,
        onLeave: menuHandler,
        responsiveWidth: responsiveWidth
    });

    $(window).on('resize scroll', menuColorSwitcher);

    $('a.next').click(nextHandler);

    responsiveNav(".nav-collapse", {
        label: "<i class='fa fa-bars'></i>",
        closeOnNavClick: true
    });
});
