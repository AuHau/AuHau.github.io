var menuHandler = function (index, nextIndex, direction) {
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
        responsiveWidth: 1024
    });

    $('a.next').click(nextHandler);

    responsiveNav(".nav-collapse", {
        label: "<i class='fa fa-bars'></i>",
        closeOnNavClick: true
    });
});
