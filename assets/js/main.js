var menuHandler = function (index, nextIndex, direction) {
    var nav = $('nav');
    nextIndex--;

    if(!framesMenuClasses[nextIndex]){
        setTimeout(function () {
            nav.removeClass();
        }, 300);
    }else if(!nav.hasClass(framesMenuClasses[nextIndex])){
        setTimeout(function () {
            nav.removeClass().addClass(framesMenuClasses[nextIndex]);
        }, 300);
    }
};

$(document).ready(function(){
    $('.main').fullpage({
        sectionSelector: '.frame',
        menu: '#menu',
        recordHistory: false,
        scrollBar: true,
        onLeave: menuHandler
    });
});
