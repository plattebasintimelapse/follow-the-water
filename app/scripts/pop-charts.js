// POPULATION CHART
function makePopChart() {
    console.log("Making population chart");
    function makeChart() {
        var margin = {top: 20, right: 20, bottom: 40, left: 50},
            width = parseInt(d3.select("#pop-chart").style("width")) - margin.left - margin.right,
            height = parseInt(d3.select("#pop-chart").style("height")) - margin.top - margin.bottom;

        var mobileThreshold = 800;

        var parseDate = d3.time.format("%Y").parse;

        var x = d3.time.scale()
            .range([0, width]);

        var y = d3.scale.linear()
            .range([height, 0]);

        var color = d3.scale.category20c();

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

        if ( parseInt( $(window).width() ) < mobileThreshold) {
            console.log("mobile");
            xAxis.ticks(5);
        }

        var line = d3.svg.line()
            .interpolate("basis")
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.population); });

        var svg = d3.select("#pop-chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


            d3.tsv("../data/pop-selected-counties-2.tsv", function(error, data) {
            color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

            data.forEach(function(d) {
                d.date = parseDate(d.date);
            });

            var counties = color.domain().map(function(name) {
                return {
                    name: name,
                    values: data.map(function(d) {
                        return {date: d.date, population: +d[name]};
                    })
                };
            });

            x.domain(d3.extent(data, function(d) { return d.date; }));

            y.domain([
                d3.min(counties, function(c) { return d3.min(c.values, function(v) { return v.population; }); }),
                d3.max(counties, function(c) { return d3.max(c.values, function(v) { return v.population; }); })
            ]);

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis);

            var county = svg.selectAll(".county")
                .data(counties)
              .enter().append("g")
                .attr("class", "county");

            county.append("path")
                .attr("class", "line")
                .attr("id", function(d) { return d.name.replace(/\s+/g, '-').toLowerCase(); })
                .attr("d", function(d) { return line(d.values); })
                .on("mouseover", function(d) {
                    d3.select(this).classed({"hover": true}).moveToFront();
                    d3.select('.county #scotts-bluff-county-ne').moveToFront();

                    var c = d3.select(this).attr("id");
                    d3.select(".county-list-entry" + " #" + c).classed({"hover": true});
                    d3.select(".county-shape" + "#" + c).classed({"hover": true});

                })
                .on("mouseout", function(d) {
                    d3.select(this).classed({"hover": false});

                    var c = d3.select(this).attr("id");
                    d3.select(".county-list-entry" + " #" + c).classed({"hover": false});
                    d3.select(".county-shape" + "#" + c).classed({"hover": false});

                });

            var county_list = d3.select(".population-list").append("ul").selectAll(".county-table")
                .data(counties)
              .enter().append("li")
                .attr("class", "county-list-entry");

            county_list.append("p")
                .attr("id", function(d) { return d.name.replace(/\s+/g, '-').toLowerCase(); })
                .text(function(d) { return d.name })
                .on("mouseover", function(d) {
                    d3.select(this).classed({"hover": true});

                    var c = d3.select(this).attr("id");
                    d3.select(".line#" + c).classed({"hover": true}).moveToFront();
                    d3.select('.county #scotts-bluff-county-ne').moveToFront();

                    d3.select(".county-shape" + "#" + c).classed({"hover": true});

                })
                .on("mouseout", function(d) {
                    d3.select(this).classed({"hover": false});

                    var c = d3.select(this).attr("id");
                    
                    d3.select(".line#" + c).classed({"hover": false});

                    d3.select(".county-shape" + "#" + c).classed({"hover": false});
                });

            d3.selection.prototype.moveToFront = function() {
                return this.each(function(){
                    this.parentNode.parentNode.appendChild(this.parentNode);
                });
            };

            d3.select('.county #scotts-bluff-county-ne').style("stroke", "#b42f1d", "important").style("stroke-width", "4px", "important").moveToFront();
            d3.select('.county-list-entry #scotts-bluff-county-ne').style("background-color", "#b42f1d", "important").style("color", "white", "important");

            d3.select(window).on('resize', resize);

            function resize() {
                var width = parseInt(d3.select("#pop-chart").style("width")) - margin.left - margin.right,
                height = parseInt(d3.select("#pop-chart").style("height")) - margin.top - margin.bottom;

                /* Update the range of the scale with new width/height */
                x.range([0, width]).nice(d3.time.year);
                y.range([height, 0]).nice();

                /* Update the axis with the new scale */
                svg.select('.x.axis')
                  .attr("transform", "translate(0," + height + ")")
                  .call(xAxis);

                svg.select('.y.axis')
                  .call(yAxis);

                /* Force D3 to recalculate and update the line */
                svg.selectAll('.line')
                  .attr("d", function(d) { return line(d.values); });
            }

        });

    }

    function makeMap() {
        var width = parseInt(d3.select("#pop-map").style("width"));
        var height = parseInt(d3.select("#pop-map").style("height"));

        var svg = d3.select("#pop-map").append("svg")
            .attr("width", width)
            .attr("height", height);

        d3.json("../data/three_states.json", function(json) {
            var center = d3.geo.centroid(json)
            var scale  = 1200;
            var offset = [150, 100];
            var xy = d3.geo.mercator().scale(scale).center(center).translate(offset);
            var path = d3.geo.path().projection(xy);

            svg.selectAll("path")
               .data(json.features)
            .enter().append("path")
               .attr("id", function(json) {
                    if (json.properties.STATEFP10 == 31) {
                        return json.properties.NAME10.replace(/\s+/g, '-').toLowerCase() + '-county-ne';
                    } else if  (json.properties.STATEFP10 == 56){
                        return json.properties.NAME10.replace(/\s+/g, '-').toLowerCase() + '-county-wy';
                    } else if  (json.properties.STATEFP10 == 8){
                        return json.properties.NAME10.replace(/\s+/g, '-').toLowerCase() + '-county-co';
                    }
                })
               .attr("class", function(d) {
                    // Tag counties with no-data class if not used in pop.json file above
                    var c = d3.select(this).attr("id");
                    if ( d3.select(".line#" + c).empty() ) {
                        return "county-shape no-data";
                    } else {
                        this.parentNode.appendChild(this);
                        return "county-shape";
                    }
                    
               })
               .attr("d", path)
               .attr("data-toggle", "tooltip")
               .attr("title", function(d) {
                    return d.properties.NAME10 + " County";
               })
               .on("mouseover", function(d) {
                    d3.select(this).classed({"hover": true});


                    var c = d3.select(this).attr("id");
                    d3.select(".line#" + c).classed({"hover": true}).moveToFront();
                    d3.select('.county #scotts-bluff-county-ne').moveToFront();

                    d3.select(".county-list-entry" + " #" + c).classed({"hover": true});
                })
                .on("mouseout", function(d) {
                    d3.select(this).classed({"hover": false});

                    var c = d3.select(this).attr("id");
                    d3.select(".county-list-entry" + " #" + c).classed({"hover": false});

                    d3.select(".line#" + c).classed({"hover": false});
                });

            d3.select('.county-shape#scotts-bluff-county-ne').style("fill", "#b42f1d", "important").style("stroke", "#b42f1d", "important");
        });
    }

    makeChart();
    makeMap();

};