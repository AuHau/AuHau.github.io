var RESPONSIVE_WIDTH = 1024;
var CLASSES = ['orange', 'white'];

var navHandler = function(index){
    index--;
    var anchorName = $('.frame').eq(index).data('anchor');
    var nav = $('#menu');

    nav.find('.active').removeClass('active');

    if (anchorName.lastIndexOf('projects') > -1) {
        $('#projects').addClass('active');
    }else{
        nav.find('[data-menuanchor="' + anchorName + '"]').addClass('active');
    }
};

var getClassFromFrame = function ($frame) {
    var frameClasses = $frame.attr('class').split(/\s+/);

    for (var i = 0; i < frameClasses.length; i++) {
        if ($.inArray(frameClasses[i], CLASSES) > -1) {
            return frameClasses[i];
        }
    }

    if($frame.data('menuclass')){
        return $frame.data('menuclass');
    }
};

/**
 * Remove all CLASSES from $elem defined in array "CLASSES"
 * @param $elem
 */
var removeClasses = function ($elem) {
    for (var i = 0; i < CLASSES.length; i++) {
        $elem.removeClass(CLASSES[i]);
    }
};

/**
 * Menu color changer for normal scrolling
 */
var menuColorSwitcher = function (e) {

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
    
    return false;
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
    $("#year").html(new Date().getFullYear());

    navHandler(1);

    $('.page').fullpage({
        sectionSelector: '.frame',
        recordHistory: false,
        scrollBar: true,
        onLeave: function(i, nextI) {navHandler(nextI)},
        responsiveWidth: RESPONSIVE_WIDTH
    });

    $(window).on('resize scroll', menuColorSwitcher);

    $('a.nextFrame').click(nextHandler);

    responsiveNav(".menu-container", {
        label: "<i class='fas fa-bars'></i>",
        closeOnNavClick: true
    });
});
