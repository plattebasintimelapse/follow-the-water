function listenVideo(id){
    // console.log(id + ' video ready');
    var $iframe = $('#' + id)[0];
    var player = $f($iframe);

    var $inline_btn = $('.inline-video-btn i');
    var $vid_containder = $('#' + id + '-video');

    player.addEvent('ready', function() {
        player.addEvent('play', play);
        player.addEvent('finish', onFinish);
        player.addEvent('pause', pause);

        var playing = false;
        $('#play-' + id).click(function() {
            if (playing) {
                player.api('unload');
                playing = false;
            } else {
                player.api('play');
                playing = true;
            }
        });
    });

    function play(id) {
        $vid_containder.toggleClass('playing-inline-video');
        $inline_btn.addClass('fa-pause').removeClass('fa-play');
    }

    function pause(id) {
        $vid_containder.toggleClass('playing-inline-video');
        $inline_btn.addClass('fa-play').removeClass('fa-pause');
    }

    function onFinish(id) {
        $vid_containder.removeClass('playing-inline-video');
        $inline_btn.addClass('fa-play').removeClass('fa-pause');
    }
}

function setMasterStyles() {
    // console.log("Setting Master Styles")
    var $wHeight = $(window).height();
    var $wWidth = $(window).width();

    $('.gap-full').height($wHeight);
    $('.gap-full').width($wWidth);

    $('.image-featured-behind-full').height($wHeight);
    $('.video-wrapper').height($wHeight);
    $('.video-wrapper').width($wWidth);

    $('body').animate({
        opacity: 1
    }, 1000);

    setTimeout(function() {
        $('.opening-scroll').fadeIn('slow')
    }, 1000)

    if(!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)){
        skrollr.init({
            forceHeight: false
        });
    }
    if($wWidth < 1200) {
        $('img.zoom').trigger('zoom.destroy');
    }
}

function listenForAudioCntl( sound ) {

    if ($(window).scrollTop() == 0) {
        var playing = true;
        sound[0].play();
    }

    $('.sound-container').click(function() {
        if (playing) {
            sound[0].pause();
            playing = false;
            $('.sound-container i').removeClass('fa-volume-up').addClass('fa-volume-off');
        } else {
            sound[0].play();
            playing = true;
            $('.sound-container i').addClass('fa-volume-up').removeClass('fa-volume-off');
        }
    });

    $(".sound-container").waypoint(function(direction) {
        sound[0].play();
        if (direction=="down") {
            sound.animate({volume: 0}, 1000);
        } else if (direction=="up") {
            sound.animate({volume: 1}, 1000);
        }
    }, { offset: 500 });
}

// INTRO NAV TOGGLES
$('#nav-open').click(function() {
    $nav_container = $('.nav-container');
    if ($nav_container.hasClass('hidden') ) {
        $(this).find('i').removeClass('fa-navicon').addClass('fa-chevron-down');
    } else {
        $(this).find('i').removeClass('fa-chevron-down').addClass('fa-navicon');
    }

    $nav_container.toggleClass('hidden');
});

$('#menu a').hover(function() {
    $('#nav-title').toggleClass('hidden');
    $('#nav-title').text( $(this).attr('data-title') );
})

$(document).ready(function() {
    setMasterStyles();

    if ( $('body').is('#intro')  ) {

        // INTRO
        // console.log("INTRO");
        // listenForIntro();

    } else if ( $('body').is('.part-one')  ) {

        // PART ONE: SNOW
        // console.log("PART ONE");
        listenForAudioCntl( $("#snow-sounds") );
        listenVideo('snotel');
        listenVideo('snowpack');
        makeSWE();
        makeSnotelChart();

    } else if ( $('body').is('.part-two')  ) {

        // PART TWO: STORAGE
        // console.log("PART TWO");
        listenVideo('lyle');
        makeDamMap();

    } else if ( $('body').is('.part-three')  ) {

        // PART THREE: FIELD
        // console.log("PART THREE");
        listenVideo('tubes');
        listenVideo('preston');
        makePopChart();
    }

});

$(window).resize(function() {
    setMasterStyles();
});

$(window).load(function() {


});