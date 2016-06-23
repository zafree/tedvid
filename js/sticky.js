$(document).ready(function() {

    var videoContainer = document.getElementById('Video'),
        videoBanner = document.getElementById('Video__banner'),
        videoSticky = document.getElementById('Video__sticky'),
        videoHeight = $(videoBanner).height();

    $(videoContainer).css('height', videoHeight+'px');

    $(window).resize(function() {
        videoHeight = $(videoBanner).height();
        // console.log(videoHeight);
        $(videoContainer).css('height', videoHeight+'px');
    });

    var waypoint = new Waypoint({
        element: videoContainer,
        handler: function(direction) {
            $(videoSticky).addClass('js-Video__sticky').toggleClass('Video__sticky--show');
            $(videoBanner).addClass('js-Video__banner').toggleClass('Video__banner--sticky');
        },
        offset: function() {
            return -this.element.clientHeight
        }
    });
    
});
