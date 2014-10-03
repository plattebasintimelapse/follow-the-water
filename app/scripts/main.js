

function listenForIntro() {
    console.log("Listening to Video...");
    var $iframe = $('#video-title')[0];
    var player = $f($iframe);
    var status = $('.status');

    player.addEvent('ready', ready);

    function ready(player_id) {
        player.addEvent('finish', finish);

        $('#btn-intro').click(function() {
            $('.video-wrapper').fadeIn();
            player.api("play");
            $('.video-wrapper iframe').addClass('playing');
        });
        $('.btn-skip').click(function() {
            $('.video-wrapper iframe').removeClass('playing');
            player.api("stop");
            finish();
        });
        var vol_on = true;
        $('#btn-audio').click(function() {
            if (vol_on) {
                player.api('setVolume',0);
                $(this).find('i').addClass('fa-volume-up').removeClass('fa-volume-off');
                vol_on = false;
            } else {
                $(this).find('i').addClass('fa-volume-off').removeClass('fa-volume-up');
                player.api('setVolume',1);
                vol_on = true;
            }
        });
    }
    
    function finish(player_id) {
        player.api("unload");
        $('.video-wrapper').remove();
        $('#intro header').remove();
        window.location.href = "snow";
    }
};

function snotelVideo(){
    var $iframe = $('#snotel')[0];
    var player = $f($iframe);

    var $inline_btn = $('.inline-video-btn i');
    var $vid_containder = $('#snotel-video');

    player.addEvent('ready', function() {
        player.addEvent('play', play);
        player.addEvent('finish', onFinish);
        player.addEvent('pause', pause);

        var playing = false;
        $('#play-snotel').click(function() {
            if (playing) {
                player.api('pause');
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

function snowpackVideo(){
    var $iframe = $('#snowpack')[0];
    var player = $f($iframe);

    var $inline_btn = $('.inline-video-btn i');
    var $vid_containder = $('#snowpack-video');

    player.addEvent('ready', function() {
        player.addEvent('play', play);
        player.addEvent('finish', onFinish);
        player.addEvent('pause', pause);

        var playing = false;
        $('#play-snowpack').click(function() {
            if (playing) {
                player.api('pause');
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

function lyleVideo(){
    var $iframe = $('#lyle')[0];
    var player = $f($iframe);

    var $inline_btn = $('.inline-video-btn i');
    var $vid_containder = $('#lyle-video');

    player.addEvent('ready', function() {
        player.addEvent('play', play);
        player.addEvent('finish', onFinish);
        player.addEvent('pause', pause);

        var playing = false;
        $('#play-lyle').click(function() {
            if (playing) {
                player.api('pause');
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

var w = true;
$('#toggle-canals').click(function(){
    if (w) {
        $('#np-map').attr('src', '../media/north-platte-canals.png');
        w = false;
    } else {
        $('#np-map').attr('src', '../media/north-platte-river.png');
        w = true;
    }
});

setTimeout(function() {
    $('.opening-pull-quote').fadeOut('slow')
}, 4000)

setTimeout(function() {
    $('.opening-title-right').fadeIn('slow')
}, 5000)

function setMasterStyles() {
    console.log("Setting Master Styles")
    var $wHeight = $(window).height();
    var $wWidth = $(window).width();

    $('.gap-full').height($wHeight);
    $('.gap-full').width($wWidth);

    $('.image-featured-behind-full').height($wHeight);
    $('.video-wrapper').height($wHeight);
    $('.video-wrapper').width($wWidth);
    // $('.intro-btn-group').css('left', (wWidth / 2) - ( 100 ) );
    var title_top = ( $wHeight - $('#video-title').height() ) / 2;
    // $('.fluid-video-wrapper').css('margin-top', '100px');

    $('body').animate({
        opacity: 1}
    );

    setTimeout(function() {
        $('.opening-scroll').fadeIn('slow')
    }, 2000)

        skrollr.init();
    
}



function listenForAudioCntl( sound ) {

    var playing = true;

    $('.sound-container').click(function() {
        if (playing) {
            sound[0].pause();
            playing = false;
            $('.sound-container i').removeClass('fa-volume-off').addClass('fa-volume-up');
        } else {
            sound[0].play();
            playing = true;
            $('.sound-container i').addClass('fa-volume-off').removeClass('fa-volume-up');
        }
    });

    $(".sound-container").waypoint(function(direction) {
        sound[0].play();
        if (direction=="down") {
            sound.animate({volume: 0}, 1000);
        } else if (direction=="up") {
            sound.animate({volume: 1}, 1000);
        }
    }, { offset: 300 });
}

// INTRO NAV TOGGLES
$('#nav-open').click(function() {
    $('.nav-container').toggleClass('hidden');
    $('#nav').toggleClass('down');
});

$('#menu a').hover(function() {
    $('#nav-title').toggleClass('hidden');
    $('#nav-title').text( $(this).attr('data-title') );
})

$(document).ready(function() {
    setMasterStyles();

});

$(window).resize(function() {
    setMasterStyles();
});

$(window).load(function() {
        $('img.zoom')
        .wrap('<span style="display:inline-block"></span>')
        .css('display', 'block')
        .parent()
        .zoom({
            on: 'grab',
            magnify: '2'
        });

    if ( $('body').is('#intro')  ) {

        // INTRO
        console.log("INTRO");
        listenForIntro();

    } else if ( $('body').is('#part-one')  ) {

        // PART ONE: SNOW
        console.log("PART ONE");
        // listenForAudioCntl( $("#snow-sounds") );
        snotelVideo();
        snowpackVideo();
        makeSWE();
        makeSnotelChart();
        
    } else if ( $('body').is('#part-two')  ) {

        // PART TWO: STORAGE
        console.log("PART TWO");
        lyleVideo();
        makeDamMap();

    } else if ( $('body').is('#part-three')  ) {

        // PART THREE: FIELD
        console.log("PART THREE");
        makePopChart();
    }
});