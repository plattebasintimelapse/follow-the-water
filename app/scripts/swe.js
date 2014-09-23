// SNOW CHARTS
function makeSWE() {
    console.log("making SWE graph");
    var snowDepthOptionBox  = $( '#snow-depth'),
        snowTypeOptionBox   = $( '#snow-type'),
        snowFlakesCanvas    = $( '#snowflakes' ),
        waterDropsCanvas    = $( '#waterdrops'),
        snowTypeSelection   = 'wind-packed-snow',
        snowDepthSelection  = '50';

    drawCanvas();

    snowTypeOptionBox.change(function() {
        snowTypeSelection = $(this).val();
        drawCanvas();
    });

        $( "#slider" ).slider({
            orientation: 'vertical',
            value:50,
            min: 0,
            max: 100,
            step: 5,
            create: function( event, ui) {
                $( "#depth-text" ).text( snowDepthSelection + " inches");
            },
            slide: function( event, ui ) {
                snowDepthSelection = ui.value;
                drawCanvas();
                $( "#depth-text" ).text( snowDepthSelection + " inches");
            }
        });


    // snowDepthOptionBox.change(function() {
    //     snowDepthSelection = $(this).val();
    //     drawCanvas();
    // });

    function drawCanvas() {
        var snowDensity;
        var SWE;
        var snowFlakePadding = '6px';

        waterDropsCanvas.empty();
        snowFlakesCanvas.empty();

        switch (snowTypeSelection) {
            case 'new-snow':
                snowDensity = 50;
                snowFlakePadding = '6px';
                break;
            case 'settled-snow':
                snowDensity = 200;
                snowFlakePadding = '5px';
                break;
            case 'depth-hoar':
                snowDensity = 300;
                snowFlakePadding = '4px';
                break;
            case 'wind-packed-snow':
                snowDensity = 400;
                snowFlakePadding = '3px';
                break;
            case 'firn':
                snowDensity = 600;
                snowFlakePadding = '2px';
                break;
            case 'very-wet-snow':
                snowDensity = 800;
                snowFlakePadding = '0px';
                break;
        }

        swe = snowDepthSelection * snowDensity / 1000;
        console.log("Depth: " + snowDepthSelection);
        console.log("Density: " + snowDensity);
        console.log("SWE: " + swe);
        console.log("----------------------------");


        console.log(snowFlakePadding);
        $('#interactive-swe span.snowflake').css('padding', snowFlakePadding);

        var j = parseInt( snowDepthSelection );
        for ( var i = 0; i < j; i++ ) {
            snowFlakesCanvas.append( '<span class="snowflake"><img src="../media/snow.png"></span>' );
        }

        for ( var i = 0; i < swe; i++ ) {
            waterDropsCanvas.append( '<span class="water-drop"><img src="../media/waterdrop.png"></span>' );
        }
    }

};
