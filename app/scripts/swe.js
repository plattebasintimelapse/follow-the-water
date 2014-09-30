// SNOW CHARTS
function makeSWE() {
    console.log("making SWE graph");
    var snowDepthOptionBox  = $( '#snow-depth'),
        snowTypeOptionBox   = $( '#snow-type'),
        snowFlakesCanvas    = $( '#snowflakes' ),
        waterDropsCanvas    = $( '#waterdrops'),
        snowTypeSelection   = 'wind-packed-snow',
        snowDepthSelection  = '50',
        snowTypeLabels      = [ $('#new-snow'), $('#settled-snow'), $('#depth-hoar'), $('#wind-packed-snow'), $('#firn'), $('#very-wet-snow') ]

    drawCanvas();

    $('#new-snow').on('click', function() {
        snowTypeSelection = 'new-snow';
        toggleLabel($(this));
        drawCanvas();
    });

    $('#settled-snow').on('click', function() {
        snowTypeSelection = 'settled-snow';
        toggleLabel($(this));
        drawCanvas();
    });

    $('#depth-hoar').on('click', function() {
        snowTypeSelection = 'depth-hoar';
        toggleLabel($(this));
        drawCanvas();
    });

    $('#wind-packed-snow').on('click', function() {
        snowTypeSelection = 'wind-packed-snow';
        toggleLabel($(this));
        drawCanvas();
    });

    $('#firn').on('click', function() {
        snowTypeSelection = 'firn';
        toggleLabel($(this));
        drawCanvas();
    });

    $('#very-wet-snow').on('click', function() {
        snowTypeSelection = 'very-wet-snow';
        toggleLabel($(this));
        drawCanvas();
    });

    $( "#slider" ).slider({
        orientation: 'vertical',
        value: 50,
        min: 0,
        max: 100,
        step: 5,
        slide: function( event, ui ) {
            snowDepthSelection = ui.value;
            drawCanvas();
        }
    });

    function toggleLabel(select){
        $(snowTypeLabels).each(function() {
            this.removeClass('selected');
        });
        select.addClass('selected');
    }

    function drawCanvas() {
        var snowDensity;
        var SWE;

        waterDropsCanvas.empty();
        snowFlakesCanvas.empty();

        switch (snowTypeSelection) {
            case 'new-snow':
                snowDensity = 50;
                break;
            case 'settled-snow':
                snowDensity = 200;
                break;
            case 'depth-hoar':
                snowDensity = 300;
                break;
            case 'wind-packed-snow':
                snowDensity = 400;
                break;
            case 'firn':
                snowDensity = 600;
                break;
            case 'very-wet-snow':
                snowDensity = 800;
                break;
        }

        swe = snowDepthSelection * snowDensity / 1000;
        // console.log("Depth: " + snowDepthSelection);
        // console.log("Density: " + snowDensity);
        // console.log("SWE: " + swe);
        // console.log("----------------------------");

        $( "#snow-depth-text" ).text( snowDepthSelection + " inches");
        $( "#water-depth-text" ).text( swe + " inches");

        var j = parseInt( snowDepthSelection );
        for ( var i = 0; i < j; i++ ) {
            snowFlakesCanvas.append( '<span class="snowflake"><img src="../media/swe/' + snowTypeSelection + '.png"></span>' );
        }

        for ( var i = 0; i < swe; i++ ) {
            waterDropsCanvas.append( '<span class="water-drop"><img src="../media/swe/waterdrop.png"></span>' );
        }
    }

};
