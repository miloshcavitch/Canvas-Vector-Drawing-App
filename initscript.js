var mouse
, mouseY, pointerX, pointerY, lastPointerX, lastPointerY;
var pointsBeingAdded = false;
var ctx;
var currentShape;//be careful with the way this is going to be used
var canvasHasLoaded = function(){
  canvas = document.getElementById("myCanvas");
  referencePoint = {x: canvas.width/2, y: canvas.height/2, left: false, right: false, up: false, down: false};

  symmetryPos = canvas.width/2;
  ctx = canvas.getContext('2d');
  $('#myCanvas').on( "mousemove", function(event) {
    mouseX = event.pageX - canvas.offsetLeft;
    mouseY = event.pageY - canvas.offsetTop;
    oSnap();
  });
  $('#myCanvas').on('click', function(){
    activeMode(pointerX, pointerY)//run the function for the active mode you are in
  });

  //code that turns the setInterval engine on
}
var initColorLayers = function(){
    //<input type="color" id="colPick" name="color">
  $(function() {
      $("#colorsCollection").sortable();
    });
}

var initSortableLayers = function(){
  $(function() {
      $("#shapesCollection").sortable();
    });

  $('#shapesCollection ul li').click(function(){
    $(this).toggleClass('.shapeSelected');
    console.log('success');
  });
  setInterval(update, 30);
}

var hideBTN = function(){
  $('#newColorVar').hide(500);
  $('#newPoly').hide(500);
  $('#new-circle').hide(500);
  $('#new-polyline').hide(500);
}

var showBTN = function(){
  $('#newColorVar').show(500);
  $('#newPoly').show(500);
  $('#new-circle').show(500);
  $('#new-polyline').show(500);
}
var initDrawingApp = function(){
  $('#below-menu').append("<br><button type='button' id='newPoly'>New Polygon</button><button type='button' id ='new-circle'>New Circle</button><button type='button' id ='new-polyline'>New (Poly)line</button><button type='button' id='newColorVar'>New Color Variable</button><br>");
  $('#below-menu').append('<ul id="shapesCollection"></ul><ul id="colorsCollection"></ul>');
  initColorLayers();
  initSortableLayers();
  $('#currentForm').append("<form id='newPolyForm'>Polygon Name:<br><input type='text'name='polygonName'></form><button type='button' id='submitPolyName'>Enter Poly Name</button>");
  $('#currentForm').append("<form id='newHexColor'>Variable Name:<br><input type='text' name='colorVarName'></form><button type='button' id='submitColorVar'>Enter Hex Color</button>");
  $('#currentForm').append("<button type='button' id='finishAddingPoints'>Finish Adding Points</button>");
  $('#currentForm').append("<button type='button' id='finishMovingPoints'>Finish Moving Points</button>");
  $('#currentForm').append("<form id='newLineForm'>Line Name:<br><input type='text' name='polylineName'></form><button type='button' id='submitLineName'>Submit (Poly)line Name</button>");
  $('#currentForm').append("<form id='newCircleForm'>Circle Name:<br><input type='text' name='circleName'></form><button type='button' id='submitCircleName'>Submit Circle Name</button>");
  $('#currentInstructions').hide();
  $('#newPolyForm').hide();
  $('#submitPolyName').hide();
  $('#newHexColor').hide();
  $('#submitColorVar').hide();
  $('#finishAddingPoints').hide();
  $('#finishMovingPoints').hide();
  $('#submitLineName').hide();
  $('#newLineForm').hide();
  $('#newCircleForm').hide();
  $('#submitCircleName').hide();
  $('#new-circle').click(function(){
    $('#currentInstructions').text("Enter the name of your new Circle");
    $('#currentInstructions').show(500);
    hideBTN();
    $('#newCircleForm').show(500);
    $('#submitCircleName').show(500);
  });
  $('#new-polyline').click(function(){
    $('#currentInstructions').text("Enter the name of your new (Poly)line");
    $('#currentInstructions').show(500);
    hideBTN();
    $('#newLineForm').show(500);
    $('#submitLineName').show(500);
  })
  $('#newPoly').click(function(){
    $('#currentInstructions').text("Enter the name of your new Polygon");
    $('#currentInstructions').show(500);
    $('#newPolyForm').show(500);
    $('#submitPolyName').show(500);
    hideBTN();
  });
  $('#submitCircleName').click(function(){
    var $circleName = $('input[name="circleName"]').val();
    $('#newCircleForm').hide(500);
    $('#submitCircleName').hide(500);
    $('#currentInstructions').hide(500);
    $('#currentInstructions').text('');
    console.log($circleName);
    pseudoSprite.shapes.push(new shape('circle', $circleName, 'blank'));
    pointsBeingAdded = true;
    activeMode = function(pointerX, pointerY){
      initCircleAdd(pointsBeingAdded);
    }

    $('input[name="circleName"]').val('');
  });
  $('#submitLineName').click(function(){
    var $lineName = $('input[name="polylineName"]').val();
    $('#newLineForm').hide(500);
    $('#submitLineName').hide(500);
    $('#currentInstructions').hide(500);
    $('#currentInstructions').text('');
    console.log($lineName);
    pseudoSprite.shapes.push(new shape('polyline', $lineName, 'blank'));
    pointsBeingAdded = true;
    activeMode = function(pointerX, pointerY){
      initPointAdd(pointsBeingAdded);
    };
    $('input[name="polylineName"]').val('');
    $('#finishAddingPoints').show(500);
  });
  $('#newColorVar').click(function(){
    $('#currentInstructions').text("Enter the name of your color variable and it's hex value");
    $('#currentInstructions').show(500);
    $('#newHexColor').show(500);
    $('#submitColorVar').show(500);
    hideBTN();
  });
  $('#submitPolyName').click(function(){
    var $polyName = $('input[name="polygonName"]').val();
    $('#newPolyForm').hide(500);
    $('#submitPolyName').hide(500);
    $('#currentInstructions').hide(500);
    $('#currentInstructions').text('');
    console.log($polyName);
    pseudoSprite.shapes.push(new shape('polygon', $polyName, 'blank'));
    pointsBeingAdded = true;
    activeMode = function(pointerX, pointerY){
      initPointAdd(pointsBeingAdded);
    };
    $('input[name="polygonName"]').val('');
    $('#finishAddingPoints').show(500);
  });

  $('#finishAddingPoints').click(function(){
    $('#finishAddingPoints').hide(500);
    showBTN();
    pointsBeingAdded = false;
  });
  $('#xp-js-obj').click(function(){
    writeJS();
    $('#exit-source').click(function(){
      $('#obj-source').css('display', 'none');
    });
  });

  $(document).on('keyup', function(event){
    if (event.which === 39){
      referencePoint.right = false;
    }
    if (event.which === 40){
      referencePoint.down = false;
    }
    if (event.which === 37){
      referencePoint.left = false;
    }
    if (event.which === 38){
      referencePoint.up = false;
    }
  });
  $(document).on('keydown', function(event){
    if (event.which === 39){
      referencePoint.right = true;
    }
    if (event.which === 40){
      referencePoint.down = true;
    }
    if (event.which === 37){
      referencePoint.left = true;
    }
    if (event.which === 38){
      referencePoint.up = true;
    }
    if (event.which === 27){//escape key
      pseudoSprite.shapes.forEach(function(el){
        el.editPoints = false;
        el.movingPoly = false;
      });
      showBTN();
      activeUpdate = function(){

      }
      activeMode = function(){

      }
    }
  });

  $('#finishMovingPoints').click(function(){
    $('#finishMovingPoints').hide(500);
    $('#currentInstructions').hide(500);
    showBTN();
    pseudoSprite.shapes.forEach(function(el){
      el.editPoints = false;
    });
    activeUpdate = function(){

    }
    activeMode = function(){

    }
  });


  $('#submitColorVar').click(function(){
    var $colorName = $('input[name="colorVarName"]').val();
    $('#currentInstructions').hide(500);
    $('#currentInstructions').text('');
    $('#newHexColor').hide(500);
    $('#submitColorVar').hide(500);
    console.log($colorName);
    colorVariables.push(new colorVar($colorName));
    $('input[name="colorVarName"]').val('');
    showBTN();
  });
}
var objectSnaps = {toggle: false, line: false, grid: false, point: false, sym: false};
var animSwitch = false;
objectSnapSetup = function(){
      jQuery(function($){
        $( '.menu-btn' ).click(function(){
          animSwitch = !animSwitch;
          if (animSwitch){
            $('#side-menu').animate({"right": '+=280'})
            $('.menu-btn').animate({"right": '+=240'})
         } else {
            $('#side-menu').animate({"right": '-=280'})
            $('.menu-btn').animate({"right": '-=240'})
          }
        });
      });
  $('#object-snap-toggle').click(function(){
    objectSnaps.toggle = !objectSnaps.toggle;
    console.log('toggle');
  })
  $('#point-snap').click(function(){
    objectSnaps.point = !objectSnaps.point;
    console.log('point: ' + objectSnaps.point);
  });

  $('#line-snap').click(function(){
    objectSnaps.line = !objectSnaps.line;
    console.log('line: ' + objectSnaps.line);
  });

  $('#grid-snap').click(function(){
    objectSnaps.grid = !objectSnaps.grid;
    console.log('grid: ' + objectSnaps.grid);
  });

  $('#symmetry-snap').click(function(){
    objectSnaps.sym = !objectSnaps.sym;
    console.log('symmetry: ' + objectSnaps.sym);
  });

  $('#grid-size').click(function(){
    console.log($('#grid-size').val());
  });
  $('#handle-tolerance').change(function(){
    handleSizeCalc();
  });
  $('#show-centerpoint').click(function(event){
    toggleReferencePoint(event);
  });
}

$(document).ready(function(){
  $('#textInfo').append("<p>Enter the width and height of the desired canvas size<br>(size of your object can be changed later by changing 'pseudoSprite.unit' but the center of your canvas will be the referenced center position of your pseudoSprite.)</p>");
  $('#textInfo').append("<form>Width:<br><input type='text' name='canWidth'><br> Height:<br><input type='text' name='canHeight'></form>");//init canvas
  $('#textInfo').append("<br><button type='button' id='setCanvas'>Create Canvas</button>");

  $('#setCanvas').click(function(){
    var cW = $("input[name='canWidth']").val();
    var cH = $("input[name='canHeight']").val();
    console.log(cW);
    if (isNaN(cW) == false && isNaN(cH) == false && cW != false && cH != false){
      $('#textInfo').empty();
      var canString = "<canvas id='myCanvas' width='" + cW + "' height='" + cH + "' style='border:1px solid #555555;'></canvas>";
      $('#appBox').append(canString);
      $('#appBox').append("<div class='menu-btn' id='menu-btn'><div></div><span></span><span></span><span></span></div><div class='responsive-menu'></div><div id='side-menu'></div>");
      $('#side-menu').append("<form action='' id='o-tog'><br><input type='checkbox' id='object-snap-toggle' value='oSnapToggle'>Toggle Object Snap</input></form><br><form action='' id='object-snap-options'><br><br><input type='checkbox' id='point-snap' value='pointSnap'>Point Snap</input><input type='checkbox' id='line-snap' value='lineSnap'>Line Snap</input><br><input type='checkbox' id='grid-snap' value='gridSnap'>Grid Snap</input><br><br><input type='checkbox' id='symmetry-snap' value='symSnap'>Line of Symmetry Snap</input><br><p>OSnap Tolerance:</p><input type='range' name='gridSize' min='5' max='100' id ='handle-tolerance'></input><p>Grid Size:</p><input type='range' name='gridSize' id='grid-size' min='1' max='8' id='grid-size'></input><br><br><button type='button' id='xp-js-obj'>Export JS Object</button>")
      $('#side-menu').append("<button type='button' id='show-centerpoint'>Show Center/Reference Point</button>")
      $('#side-menu').append("<div id='move-centerpoint-info'><p>You can move the reference point <br> with the arrow keys</p></div>")
      canvasHasLoaded();
      objectSnapSetup();
      $('#appBox').append("<div id='below-menu'></div>");
      $('#below-menu').append("<div id='currentOptions'></div>");
      $('#currentOptions').append('<p id="currentInstructions"></p>');
      $('#currentOptions').append('<div id="currentForm"></div>');
      $(document.body).append("<div id='obj-source'><div id='exit-source'>w</div><div><p>bruhuigrh</p></div>");
      $('#currentInstructions').text('');
      initDrawingApp();
    } else{
      $('#textInfo').append("<p id='error'>One or more of the inputs weren't numbers. Try again</p>");
    }
  });
})
