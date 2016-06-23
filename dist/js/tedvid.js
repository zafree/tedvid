/**
 * TEDvid v1.0.0 - TED style hero-video that goes sticky when you scroll your shit/bar. Applicable only for Youtube and Vimeo.
 * @link https://zafree.github.io/tedvid
 * @copyright 2015-2016 Zafree
 * @license MIT
 */
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

$(function(){

    var videoPlayer = document.querySelector('#Video__banner iframe'),
    videoProvider = videoPlayer.dataset.provider;

    // set iframe ID
    videoPlayer.id = videoProvider;

    // add js class for once
    // understand DOM well
    var js = true;

    // getIDs
    var $playButton = $("#Video__control"),
    $videoPoster = $("#Video__poster"),
    $videoDetails = $("#Video__details"),
    $videoPoster = $("#Video__poster"),
    $nextVideo = $("#Video__watch-next");

    function setupPlayer() {
        if(js) {
            $playButton.addClass('js-Video__control');
            $videoDetails.addClass('js-Video__details');
            // hide video poster for once
            $videoPoster.addClass('js-Video__poster Video__poster--hidden');
            js = false;
        }
        $playButton.addClass('Video__control--hidden');
        $videoDetails.addClass('Video__details--hidden');
    }

    function vidPlay() {
        $playButton.removeClass('Video__control--show').addClass('Video__control--hidden');
        $videoDetails.removeClass('Video__details--show').addClass('Video__details--hidden');
        $nextVideo.hide();
    }

    function vidPause() {
        $playButton.removeClass('Video__control--hidden').addClass('Video__control--show');
        $videoDetails.removeClass('Video__details--hidden').addClass('Video__details--show');
        $playButton.addClass('Video__control-gradient--show');
        $nextVideo.show();
        // console.log('pause event');

        // video__control on hover state
        $playButton.hover(
               function(){
                   $videoDetails.addClass('Video__details--visible');
                   $(this).addClass('Video__control-gradient--visible');
               },
               function(){
                   $videoDetails.removeClass('Video__details--visible');
                   $(this).removeClass('Video__control-gradient--visible');
               }
        );
        $videoDetails.hover(
               function(){
                   $(this).addClass('Video__details--visible');
                   $playButton.addClass('Video__control-gradient--visible');
               },
               function(){
                   $(this).removeClass('Video__details--visible');
                   $playButton.removeClass('Video__control-gradient--visible');
               }
        );
    }



    // Vemoi API
    // and some awesome events
    // don't change anything
    // real paniczone
    if(videoProvider === 'vimeo') {

        // vemio API ready
        $f(videoPlayer).addEvent('ready', ready);

        // finally the vemio function
        // trigger - play or pause
        function ready(player_id) {

            froogaloop = $f(player_id);

            $videoPoster.on("click", function() {
                froogaloop.api('play');
                setupPlayer();
            });

            // Custom Button Play Listner
            $playButton.on("click",function() {
                froogaloop.api('play');
                setupPlayer();
            });

            // video details magic part
            // when click the non-text area...
            // video will play
            $videoDetails.on("click", function(e) {
                if (e.target.nodeName == 'SPAN')
                    return false;

                // console.log('working');
                froogaloop.api('play');
                setupPlayer();
            });

            $videoDetails.mouseover(function(e) {
                if (e.target.nodeName == 'SPAN') {
                    $('#Video__control-play').removeClass('Video__control-play--scale');
                } else {
                    $('#Video__control-play').addClass('Video__control-play--scale');
                }
            });
            $videoDetails.mouseleave(function() {
                $('#Video__control-play').removeClass('Video__control-play--scale');
            });

            function setupEventListeners() {

                function onPlay() {
                    froogaloop.addEvent('play',
                    function(data) {
                        vidPlay();
                        // console.log('play event');
                    });
                }

                function onPause() {

                    froogaloop.addEvent('pause',
                    function(data) {
                        vidPause();
                    });
                }

                function onFinish() {
                    froogaloop.addEvent('finish',
                    function(data) {
                        console.log('finish');
                    });
                }
                onPlay();
                onPause();
                onFinish();
            }
            setupEventListeners();
        }


    }



    // Youtube API
    // supper cool stuff
    // don't change anything
    // real paniczone

    if(videoProvider === 'youtube') {

        // 3. This function creates an <iframe> (and YouTube player)
        //    after the API code downloads.
        var player;
        window.onYouTubeIframeAPIReady = function () {
            player = new YT.Player('youtube', {
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        }

        // 4. The API will call this function when the video player is ready.
        function onPlayerReady(event) {

            $videoPoster.on("click", function() {
                player.playVideo();
                setupPlayer();
            });

            // Custom Button Play Listner
            $playButton.on("click",function() {
                player.playVideo();
                setupPlayer();
            });

            // video details magic part
            // when click the non-text area...
            // video will play
            $videoDetails.on("click", function(e) {
                if (e.target.nodeName == 'SPAN')
                    return false;

                // console.log('working');
                player.playVideo();
                setupPlayer();
            });

            $videoDetails.mouseover(function(e) {
                if (e.target.nodeName == 'SPAN') {
                    $('#Video__control-play').removeClass('Video__control-play--scale');
                } else {
                    console.log("HOve");
                    $('#Video__control-play').addClass('Video__control-play--scale');
                }
            });
            $videoDetails.mouseleave(function() {
                $('#Video__control-play').removeClass('Video__control-play--scale');
            });

        }


        // 5. The API calls this function when the player's state changes.
        //    The function indicates that when playing a video (state=1),
        //    the player should play for six seconds and then stop.

        function onPlayerStateChange(event) {

            if (event.data == YT.PlayerState.PLAYING) {
                vidPlay();
                // console.log('Playing');
            }

            if(event.data == YT.PlayerState.PAUSED) {
                vidPause();
            }

            if(event.data == YT.PlayerState.BUFFERING) {
                // console.log('Buffering');
            }

        }

        function stopVideo() {
            player.stopVideo();
        }

    }

})
