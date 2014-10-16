function makeDamMap() {
    // console.log("Making dam map");
    var southWest = L.latLng(39.3853, -99.624),
        northEast = L.latLng(43.7552, -109.9951),
        bounds = L.latLngBounds(southWest, northEast),
        damInfoPanel = document.getElementById('dam-info-panel');

    var map = L.map('dam-map', {
        center: [42.105, -105.99],
        zoom: 7,
        zoomControl: 'false',
        maxBounds: bounds,
        tap: false
    });

    map.scrollWheelZoom.disable();

    var basemap = L.tileLayer('http://{s}.tiles.mapbox.com/v3/plattebasintl.jkn0h0cn/{z}/{x}/{y}.png', {
        minZoom: 7,
        maxZoom: 10
    }).addTo(map);

    function getData() {
        $.ajax({
            dataType: "json",
            url: '../data/dams.json',
            success: function (data) {
                var geojson = L.geoJson(data, {
                    onEachFeature: function (feature, layer) {
                        var popup_content = '<h5>' + feature.properties.name + '</h5>'

                        layer.bindPopup(popup_content);

                        var panel_content = '<p class="dam-title">' + feature.properties.name + '</p>' +
                            feature.properties.info +
                            '<img class="dam-image" src="http://' + feature.properties.image + '"/>';
                            // '<p><a class="dam-link" target="_blank" src="http://' + feature.properties.link + '">Read More</a></p>';

                        layer.on('click', function(e) {
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
    getData();
}