function makeDamMap() {
    console.log('making map');
    var dams = [{
            "type": "Feature",
            "properties": {
                "name": "Pathfinder Dam",
                "year": "1909",
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

    var damInfoBox = document.getElementById('dam-info');

    var geoDams = L.geoJson(dams, {
        onEachFeature: function (feature, layer) {
            var content = '<h3>' + feature.properties.name + '</h3>' +
                '<p> Year completed: ' + feature.properties.year + '</p>' +
                '<p> Layer ' + layer + '</p>'
            layer.bindPopup(content);
            damInfoBox.innerHTML = content;
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
        $('#np-map').attr('src', '/media/north-platte-canal-system.png');
        w = false;
    } else {
        $('#np-map').attr('src', '/media/north-platte-river.png');
        w = true;
    }
});

$(function() {
    $('#new-wells-chart').highcharts({
        chart: {
            plotBackgroundColor: 'white', //not needed
            type: 'line',
            showAxes: false
        },
        title: {
            text: null
        },
        exporting: false,
        credits: {
            enabled: false
        },
        xAxis: {
            lineColor: 'transparent',
            labels: {
                enabled: false
            },
            tickColor: '#fff'
        },
        yAxis: {
            plotLines: [{
                value: 0,
                width: 1,
                color: '#fff'
            }],
            title: {
                enabled: false
            },
            labels: {
                enabled: false
            },
            min: 0,
            tickInterval: 2500,
            gridLineWidth: 0,
            minorGridLineWidth: 0
        },
        plotOptions: {
            line: {
                color: 'gray',
                marker: {
                    symbol: 'circle',
                    enabled: false
                }
            },
            series: {
                animation: {
                    duration: 2500
                }
            }
        },
        tooltip: {
            enabled: true,
            formatter: function() {
                return '<b>' + this.y + '</b> new irrigation wells in <b>' + this.x + '</b>';
            }
        },
        legend: {
            enabled: false
        }
    });
});

$('#new-wells-chart').waypoint(function() {
    var chart = $('#new-wells-chart').highcharts();
    chart.addSeries({
        data: [23, 6, 5, 9, 6, 30, 20, 37, 47, 51, 70, 23, 58, 45, 112, 158, 174, 257, 288, 263, 581, 470, 380, 322, 437, 370, 573, 654, 781, 397, 560, 300, 448, 1095, 2218, 3133, 5017, 3557, 555, 635, 658, 696, 440, 780, 1347, 1615, 1899, 2427, 2151, 1643, 2110, 2455, 2347, 2446, 3650, 4742, 6463, 4518, 1823, 2380, 2312, 2703, 940, 664, 744, 437, 306, 307, 787, 1347, 1240, 1017, 1066, 535, 667, 894, 1325, 1315, 1137, 703, 983, 1162, 1662, 2249, 2363, 1976, 1171, 1083, 1007, 729, 815, 1188, 1733, 2052]
    });
    chart.xAxis[0].setCategories([1920, 1921, 1922, 1923, 1924, 1925, 1926, 1927, 1928, 1929, 1930, 1931, 1932, 1933, 1934, 1935, 1936, 1937, 1938, 1939, 1940, 1941, 1942, 1943, 1944, 1945, 1946, 1947, 1948, 1949, 1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013]);
    $('#pop-up-1956').delay(1000).fadeIn('slow');
    $('#pop-up-1976').delay(1400).fadeIn('slow');
}, {
    offset: '50%'
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
    // makeSnowChart();
    // 
    // setOpeningStyles();
    if ( $('body').is('#intro')  ) {
        console.log("INTRO");
    } else if ( $('body').is('#part-one')  ) {
        console.log("PART ONE");
        makePopChart();
        listenForAudioCntl( $("#snow-sounds") );
        
    } else if ( $('body').is('#part-two')  ) {
        console.log("PART TWO");
        makeDamMap();
    } else if ( $('body').is('#part-three')  ) {
        console.log("PART THREE");
    }
});

$(window).resize(function() {
    setOpeningStyles();
});