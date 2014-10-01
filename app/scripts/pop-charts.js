// POPULATION CHART
function makePopChart() {
    console.log("making population chart");

    d3.select(window).on('load', resize); 
    d3.select(window).on('resize', resize);
    
    var margin = {top: 20, right: 80, bottom: 40, left: 50};
        width = 900 - margin.left - margin.right,
        height = 800 - margin.top - margin.bottom;

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

    var line = d3.svg.line()
        .interpolate("basis")
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.population); });

    var svg = d3.select("#pop-chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.tsv("../data/pop-selected-counties.tsv", function(error, data) {
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
            .style("stroke", "lightgray")
            .on("mouseover", function(d) {
                d3.select(this).style("stroke", "steelblue").style("stroke-width", "4px").moveToFront();
                var c = d3.select(this).attr("id");
                d3.select(".county-list-entry" + " #" + c).style("background-color", "steelblue").style("color", "white");
            })
            .on("mouseout", function(d) {
                d3.select(this).style("stroke", "lightgray").style("stroke-width", "1px");
                var c = d3.select(this).attr("id");
                d3.select(".county-list-entry" + " #" + c).style("background-color", "white").style("color", "black");
            });

        function mMove(){
            console.log("hovering");
             var m = d3.mouse(this);
             d3.select("title").text(m[1]);
        }

        d3.selection.prototype.moveToFront = function() {
            return this.each(function(){
                this.parentNode.parentNode.appendChild(this.parentNode);
            });
        };

        var county_list = d3.select(".population-list").append("ul").selectAll(".county-table")
            .data(counties)
          .enter().append("li")
            .attr("class", "county-list-entry");

        county_list.append("p")
            .attr("id", function(d) { return d.name.replace(/\s+/g, '-').toLowerCase(); })
            .text(function(d) { return d.name })
            .on("mouseover", function(d) {
                var c = d3.select(this).attr("id");
                d3.select("#" + c).style("stroke", "steelblue").style("stroke-width", "4px").moveToFront();
            })
            .on("mouseout", function(d) {
                var c = d3.select(this).attr("id");
                d3.select("#" + c).style("stroke", "lightgray").style("stroke-width", "1px");
            });

        d3.select('.county #scotts-bluff-county-ne').style("stroke", "#b42f1d", "important").style("stroke-width", "2px", "important").moveToFront();

    });
};