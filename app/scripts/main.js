function makeDamMap() {
    console.log('making map');
    var dams = [{
            "type": "Feature",
            "properties": {
                "name": "Pathfinder Dam",
                "year": "1909",
                "capacity": "1,200,000",
                "project": "North Platte Project",
                "image": "www.usbr.gov/projects/ImageServer?imgName=Photo_1342825977603",
                "marker-color": "red"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [-106.8131, 42.43746]
            }
        },{
            "type": "Feature",
            "properties": {
                "name": "Seminoe Dam",
                "year": "1909",
                "marker-color": "red"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [-106.91393, 42.15662]
            }
        },{
            "type": "Feature",
            "properties": {
                "name": "Whalen Diversion Dam",
                "year": "1909",
                "marker-color": "red"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [-104.62913, 42.24802]
            }
        },{
            "type": "Feature",
            "properties": {
                "name": "Kortes Dam",
                "year": "1909",
                "marker-color": "red"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [-106.88088, 42.17413]
            }
        },{
            "type": "Feature",
            "properties": {
                "name": "Guernsey Dam",
                "year": "1909",
                "marker-color": "red"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [-104.763737,42.290167]
            }
        },{
            "type": "Feature",
            "properties": {
                "name": "Glendo Dam",
                "year": "1909",
                "marker-color": "red"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [-104.9483031, 42.4796911]
            }
        },{
            "type": "Feature",
            "properties": {
                "name": "Alcova Dam",
                "year": "1909",
                "marker-color": "red"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [-106.719444,42.548056]
            }
        },{
            "type": "Feature",
            "properties": {
                "name": "Grayrocks Dam",
                "year": "1909",
                "capacity": "1,200,000",
                "project": "Kendrick",
                "marker-color": "red"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [-104.69052,42.1683]
            }
        }]

    // L.mapbox.access_token = 'pk.eyJ1Ijoic3R2bnNwY2hyIiwiYSI6InhEclV5MTgifQ.Ly3cNBJjEqglMpeOmzeFiA#9';
    // var myURL = "https://a.tiles.mapbox.com/v4/stvnspchr.jgpagedp/page.html?access_token=pk.eyJ1Ijoic3R2bnNwY2hyIiwiYSI6InhEclV5MTgifQ.Ly3cNBJjEqglMpeOmzeFiA#9/41.9421/-105.6747";

    var southWest = L.latLng(39.3853, -99.624),
        northEast = L.latLng(43.7552, -109.9951),
        bounds = L.latLngBounds(southWest, northEast);

    var map = L.map('dam-map', {
        center: [42.105, -105.99],
        zoom: 7,
        scrollWheelZoom: 'false',
        zoomControl: 'false',
        maxBounds: bounds
    });

    var geojsonLayer = new L.GeoJSON.AJAX("/data/dams.json");

    var damInfoPanel = document.getElementById('dam-info-panel');

    var geoDams = L.geoJson(dams, {
        onEachFeature: function (feature, layer) {
            var popup_content = '<h5>' + feature.properties.name + '</h5>'

            var panel_content = '<h3>' + feature.properties.name + '</h3>' +
                '<p> Year completed: ' + feature.properties.year + '</p>' +
                '<p> Capacity: ' + feature.properties.capacity + '</p>' +
                '<p> Project: ' + feature.properties.project + '</p>' + 
                '<img src="http://' + feature.properties.image + '"/>'
            layer.bindPopup(popup_content);

            layer.on('click', function(e) {
                damInfoPanel.innerHTML = panel_content;
            })
        }
    }).addTo(map);

    var basemap = L.tileLayer('http://{s}.tiles.mapbox.com/v3/stvnspchr.jh6fm2pa/{z}/{x}/{y}.png', {
        minZoom: 7,
        maxZoom: 10
    }).addTo(map);
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
            window.location.href = "/snow";

        }
    }
});

var w = true;
$('#toggle-canals').click(function(){
    if (w) {
        $('#np-map').attr('src', '/media/north-platte-canals.png');
        w = false;
    } else {
        $('#np-map').attr('src', '/media/north-platte-river.png');
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