function makeDamMap() {
    console.log('making map');

    var southWest = L.latLng(39.3853, -99.624),
        northEast = L.latLng(43.7552, -109.9951),
        bounds = L.latLngBounds(southWest, northEast),
        damInfoPanel = document.getElementById('dam-info-panel');

    var map = L.map('dam-map', {
        center: [42.105, -105.99],
        zoom: 7,
        scrollWheelZoom: 'false',
        zoomControl: 'false',
        maxBounds: bounds
    });

    var basemap = L.tileLayer('http://{s}.tiles.mapbox.com/v3/plattebasintl.jhkb20af/{z}/{x}/{y}.png', {
        minZoom: 7,
        maxZoom: 10
    }).addTo(map);

    $.ajax({
        dataType: "json",
        url: '../data/dams.json',
        success: function (data) {
            var geojson = L.geoJson(data, {
                onEachFeature: function (feature, layer) {
                    var popup_content = '<h5>' + feature.properties.name + '</h5>'

                    var panel_content = '<h3>' + feature.properties.name + '</h3>' +
                        feature.properties.info +
                        '<img class="dam-image" src="http://' + feature.properties.image + '"/>' +
                        '<p><a class="dam-link" src= "http://' + feature.properties.link + '">Read More</a></p>'
                    layer.bindPopup(popup_content);

                    layer.on('click', function(e) {s
                        damInfoPanel.innerHTML = panel_content;
                    })
                },
                pointToLayer: function (feature, latlng) {
                    return new L.CircleMarker(latlng, {
                        radius: feature.properties.marker_radius,
                        fillColor: '#b42f1d',
                        color: '#b42f1d',
                        opacity: 0,
                        fillOpacity: .6
                    });
                }
            });

            map.addLayer(geojson);
        },
        error: function (errorThrown) {
            console.log(errorThrown);
        }

    });
}

$(function() {
    if ( $('body').is('#intro')  ) {
        console.log("Has Video");
        var iframe = $('#video-title')[0];
        var player = $f(iframe);
        var status = $('.status');

        player.addEvent('ready', ready);

        function ready(player_id) {
            player.addEvent('finish', finish);

             //Play when iframe is in viewport
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
    }
});

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

function setOpeningStyles() {
    console.log("Setting Opening Styles")
    var wHeight = $(window).height();
    var wWidth = $(window).width();

    $('.image-featured-behind-full').height(wHeight);
    $('.video-wrapper').height(wHeight);
    $('.video-wrapper').width(wWidth);
    // $('.intro-btn-group').css('left', (wWidth / 2) - ( 100 ) );
    var title_top = ( wHeight - $('#video-title').height() ) / 2;
    // $('.fluid-video-wrapper').css('margin-top', '100px');

    $('img.zoom')
        .wrap('<span style="display:inline-block"></span>')
        .css('display', 'block')
        .parent()
        .zoom({
            on: 'grab',
            magnify: '2'
        });

    $('body').animate({
        opacity: 1}
    );

}

function listenForAudioCntl( sound ) {
    // sound is a jQuery object, convert to javascript element to play() or pause()
    // sound[0].volume=0;
    // sound.animate({volume: 1}, 3000);

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
$('.intro-nav-button').click(function() {
    $('.intro-nav-container').toggleClass('hidden');
    $('#intro-nav').toggleClass('down');
});

$('#intro-menu img').hover(function() {
    $('#intro-nav-title').toggleClass('hidden');
    $('#intro-nav-title').text( $(this).attr('data-title') );
})

$(document).ready(function() {
    // makeDamMap();
    setOpeningStyles();
});

$(window).load(function() {
    // setOpeningStyles();
    if ( $('body').is('#intro')  ) {
        console.log("INTRO");
    } else if ( $('body').is('#part-one')  ) {
        console.log("PART ONE");
        listenForAudioCntl( $("#snow-sounds") );
        makeSnowChart();
        
    } else if ( $('body').is('#part-two')  ) {
        console.log("PART TWO");
        makeDamMap();
    } else if ( $('body').is('#part-three')  ) {
        console.log("PART THREE");
        makePopChart();
    }
});

$(window).resize(function() {
    setOpeningStyles();
});