var menuHandler = function (index, nextIndex, direction) {
    var nav = $('nav');
    nextIndex--;

    var duration;
    if(direction == 'up'){
        duration = 180;
    }else{
        duration = 480;
    }

    if(!framesMenuClasses[nextIndex]){
        setTimeout(function () {
            nav.removeAttr('class');
        }, duration);
    }else if(!nav.hasClass(framesMenuClasses[nextIndex])){
        setTimeout(function () {
            nav.removeAttr('class').addClass(framesMenuClasses[nextIndex]);
        }, duration);
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
