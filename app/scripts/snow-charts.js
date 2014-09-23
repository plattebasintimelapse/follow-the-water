// POPULATION CHART
function makeSnotelChart() {
    console.log("making snotel_site chart");
    
    var margin = {top: 20, right: 80, bottom: 40, left: 50};
        width = 800 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    var parseDate = d3.time.format("%b-%y").parse;

    var x = d3.time.scale()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var color = d3.scale.category10();

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var line = d3.svg.line()
        .interpolate("basis")
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.swe); });

    var svg = d3.select("#snotel-chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.tsv("../data/snotel.tsv", function(error, data) {
        color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

        data.forEach(function(d) {
            d.date = parseDate(d.date);
        });

        var snotel_sites = color.domain().map(function(name) {
            return {
                name: name,
                values: data.map(function(d) {
                    return {date: d.date, swe: +d[name]};
                })
            };
        });

        x.domain(d3.extent(data, function(d) { return d.date; }));

        y.domain([
            d3.min(snotel_sites, function(c) { return d3.min(c.values, function(v) { return v.swe; }); }),
            d3.max(snotel_sites, function(c) { return d3.max(c.values, function(v) { return v.swe; }); })
        ]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        var snotel_site = svg.selectAll(".county")
            .data(snotel_sites)
          .enter().append("g")
            .attr("class", "snotel_site");

        snotel_site.append("path")
            .attr("class", "line")
            .attr("id", function(d) { return d.name.replace(/\s+/g, '-').toLowerCase(); })
            .attr("d", function(d) { return line(d.values); })
            .style("stroke", function(d) { return color(d.name); })
            .on("mouseover", function(d) {
                d3.select(this).style("stroke-width", "3px");
            })
            .on("mouseout", function(d) {
                d3.select(this).style("stroke-width", "1px");
            });

        function resize() {
            var width = parseInt(d3.select("#pop-chart").style("width")) - margin.left,
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
              .attr("d", function(d) { return line(d.values); }) 
        }

        d3.select(window).on('resize', resize);

    });
};