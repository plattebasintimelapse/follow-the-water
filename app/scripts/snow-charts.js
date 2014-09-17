// SNOW CHARTS
function makeSnowChart() {
    console.log("making snow chart");
    var margin = {top: 0, right: 0, bottom: 0, left: 0},
        width = 300,
        height = 200;

    var parseDate = d3.time.format("%b-%y").parse
        bisectDate = d3.bisector(function(d) { return d.date; }).left;

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
        .y(function(d) { return y(d.swe); });

    var svg = d3.select("#snow-chart1").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.tsv("/data/roach-monthly-data.tsv", function(error, data) {
        color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

        data.forEach(function(d) {
            d.date = parseDate(d.date);
        });

        var measurements = color.domain().map(function(name) {
            return {
                name: name,
                values: data.map(function(d) {
                    return {date: d.date, swe: +d[name]};
                })
            };
        });

        x.domain(d3.extent(data, function(d) { return d.date; }));

        y.domain([
            d3.min(measurements, function(c) { return d3.min(c.values, function(v) { return v.swe; }); }),
            d3.max(measurements, function(c) { return d3.max(c.values, function(v) { return v.swe; }); })
        ]);

        // svg.append("g")
        //     .attr("class", "x axis")
        //     .attr("transform", "translate(0," + height + ")")
        //     .call(xAxis);

        // svg.append("g")
        //     .attr("class", "y axis")
        //     .call(yAxis);

        var vertical = d3.select("#snow-chart1")
            .append("div")
            .attr("class", "remove")
            .style("position", "absolute")
            .style("display", "none")
            .style("z-index", "19")
            .style("width", "2px")
            .style("height", height)
            .style("top", "15px")
            .style("bottom", "15px")
            .style("left", "0px")
            .style("background", "gray");

      d3.select("#snow-chart1")
          .on("mousemove", function(){
             mousex = d3.mouse(this);
             mousex = mousex[0]+15;
             vertical.style("display", "block").style("left", mousex + "px" )})
          .on("mouseover", function(){
             mousex = d3.mouse(this);
             mousex = mousex[0]+15;
             vertical.style("display", "block").style("left", mousex + "px")})
          .on("mouseout", function(){
             vertical.style("display", "none")})
          .on("mousemove", mousemove);

          var focus = d3.select("#snow-text1");

        function mousemove() {
            var x0 = x.invert(d3.mouse(this)[0]),
                i = bisectDate(data, x0, 1),
                d0 = data[i - 1],
                d1 = data[i],
                d = x0 - d0.date > d1.date - x0 ? d1 : d0;
            focus.attr("transform", "translate(" + x(d.date) + "," + y(d.swe) + ")");
            console.log( d.swe );
            focus.text( d.swe );
          }

        var measurement = svg.selectAll(".measurement")
            .data(measurements)
          .enter().append("g")
            .attr("class", "measurement");

        measurement.append("path")
            .attr("class", "line")
            .attr("id", function(d) { return d.name.replace(/\s+/g, '-').toLowerCase(); })
            .attr("d", function(d) { return line(d.values); });
            // .on("mouseover", function(d) {
            //     d3.select(this).style("stroke", "steelblue").style("stroke-width", "4px").moveToFront();
            //     var c = d3.select(this).attr("id");
            //     // d3.select(".measurement-list-entry" + " #" + c).style("background-color", "steelblue").style("color", "white");
            // })
            // .on("mouseout", function(d) {
            //     d3.select(this).style("stroke", "lightgray").style("stroke-width", "1px");
            //     var c = d3.select(this).attr("id");
            //     // d3.select(".measurement-list-entry" + " #" + c).style("background-color", "white").style("color", "black");
            // })

        d3.selection.prototype.moveToFront = function() {
            return this.each(function(){
                this.parentNode.parentNode.appendChild(this.parentNode);
            });
        };

    });
};