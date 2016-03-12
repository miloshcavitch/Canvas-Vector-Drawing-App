var mouseX, mouseY, pointerX, pointerY, lastPointerX, lastPointerY;
var pointsBeingAdded = false;
var ctx;
var currentShape;//be careful with the way this is going to be used
var canvasHasLoaded = function(){
  canvas = document.getElementById("myCanvas");
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


var initDrawingApp = function(){
  $('#appBox').append("<br><button type='button' id='newPoly'>New Polygon</button><button type='button' id='newColorVar'>New Color Variable</button><br>");
  $('#appBox').append('<ul id="shapesCollection"></ul><ul id="colorsCollection"></ul>');
  initColorLayers();
  initSortableLayers();
  $('#currentForm').append("<form id='newPolyForm'>Polygon Name:<br><input type='text'name='polygonName'></form><button type='button' id='submitPolyName'>Enter Poly Name</button>");
  $('#currentForm').append("<form id='newHexColor'>Variable Name:<br><input type='text' name='colorVarName'></form><button type='button' id='submitColorVar'>Enter Hex Color</button>");
  $('#currentForm').append("<button type='button' id='finishAddingPoints'>Finish Adding Points</button>");
  $('#currentForm').append("<button type='button' id='finishMovingPoints'>Finish Moving Points</button>");
  $('#currentInstructions').hide();
  $('#newPolyForm').hide();
  $('#submitPolyName').hide();
  $('#newHexColor').hide();
  $('#submitColorVar').hide();
  $('#finishAddingPoints').hide();
  $('#finishMovingPoints').hide();
  $('#newPoly').click(function(){
    $('#currentInstructions').text("Enter the name of your new Polygon");
    $('#currentInstructions').show(500);
    $('#newPolyForm').show(500);
    $('#submitPolyName').show(500);
    $('#newColorVar').hide(500);
    $('#newPoly').hide(500);
  });

  $('#newColorVar').click(function(){
    $('#currentInstructions').text("Enter the name of your color variable and it's hex value");
    $('#currentInstructions').show(500);
    $('#newHexColor').show(500);
    $('#submitColorVar').show(500);
    $('#newPoly').hide(500);
    $('#newColorVar').hide(500);
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
    $('#newColorVar').show(500);
    $('#newPoly').show(500);
    pointsBeingAdded = false;
  });

  $('#finishMovingPoints').click(function(){
    $('#finishMovingPoints').hide(500);
    $('#currentInstructions').hide(500);
    $('#newColorVar').show(500);
    $('#newPoly').show(500);
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
    $('#newPoly').show(500);
    $('#newColorVar').show(500);
  });
}
var objectSnaps = {toggle: false, line: false, grid: false, point: false};
objectSnapSetup = function(){
  $('#object-snap-options').hide();
  $('#object-snap-toggle').click(function(){
    objectSnaps.toggle = !objectSnaps.toggle;
    console.log('toggle: ' + objectSnaps.toggle);
    if (objectSnaps.toggle){
      $('#object-snap-options').show();
    } else {
      $('#object-snap-options').hide();
    }
  });

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
      $('#appBox').append("<div id='object-snap'></div>");
      $('#object-snap').append("<form action='' id='o-tog'><input type='checkbox' id='object-snap-toggle' value='oSnapToggle'>Toggle Object Snap</input></form>")
      $('#object-snap').append("<form action='' id='object-snap-options'><br><br><input type='checkbox' id='point-snap' value='pointSnap'>Point Snap</input><input type='checkbox' id='line-snap' value='lineSnap'>Line Snap</input><input type='checkbox' id='grid-snap' value='gridSnap'>Grid Snap</input>")
      canvasHasLoaded();
      objectSnapSetup();
      $('#appBox').append("<div id='currentOptions'></div>");
      $('#currentOptions').append('<p id="currentInstructions"></p>');
      $('#currentOptions').append('<div id="currentForm"></div>');
      $('#currentInstructions').text('');
      initDrawingApp();
    } else{
      $('#textInfo').append("<p id='error'>One or more of the inputs weren't numbers. Try again</p>");
    }
  });
})
