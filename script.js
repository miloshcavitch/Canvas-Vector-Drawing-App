var initDrawingApp = function(){
  $('#appBox').append("<br><button type='button' id='newPoly'>New Polygon</button><button type='button' id='newColorVar'>New Color Variable</button>");
  $('#currentForm').append("<form id='newPolyForm'>Polygon Name:<br><input type='text'name='polygonName'></form><button type='button' id='submitPolyName'>Enter Poly Name</button>");
  $('#currentForm').append("<form id='newHexColor'>Hex Color:<br><input type='text' name='hexColor'><br><input type='text' name='colorVarName'></form><button type='button' id='submitColorVar'>Enter Hex Color</button>");
  $('#currentInstructions').hide();
  $('#newPolyForm').hide();
  $('#submitPolyName').hide();
  $('#newHexColor').hide();
  $('#submitColorVar').hide();

  $('#newPoly').click(function(){
    $('#currentInstructions').text("Enter the name of your new Polygon");
    $('#currentInstructions').show(500);
    $('#newPolyForm').show(500);
    $('#submitPolyName').show(500);
  });

  $('#newColorVar').click(function(){
    $('#currentInstructions').text("Enter the name of your color variable and it's hex value");
    $('#currentInstructions').show(500);
    $('#newHexColor').show(500);
    $('#submitColorVar').show(500);
  });
}


$(document).ready(function(){
  $('#textInfo').append("<p>Enter the width and height of the desired canvas size<br>(size of your object can be changed later by changing 'visualObject.unit' but the center of your canvas will be the referenced center position of your visualObject.)</p>");
  $('#textInfo').append("<form>Width:<br><input type='text' name='canWidth'><br> Height:<br><input type='text' name='canHeight'></form>");
  $('#textInfo').append("<br><button type='button' id='setCanvas'>Create Canvas</button>");

  $('#setCanvas').click(function(){
    var cW = $("input[name='canWidth']").val();
    var cH = $("input[name='canHeight']").val();
    console.log(cW);
    if (isNaN(cW) == false && isNaN(cH) == false && cW != false && cH != false){
      $('#textInfo').empty();
      var canString = "<canvas id='myCanvas' width='" + cW + "' height='" + cH + "' style='border:1px solid #000000;'></canvas>";
      $('#appBox').append(canString);
      $('#appBox').append("<div id='currentOptions'></div>");
      $('#appBox').append("<div id='shapesCollection'></div>");
      $('#currentOptions').append('<p id="currentInstructions"></p>');
      $('#currentOptions').append('<div id="currentForm"></div>');
      $('#currentInstructions').text('');
      initDrawingApp();
    } else{
      $('#textInfo').append("<p id='error'>One or more of the inputs weren't numbers. Try again</p>");
    }
  });
})
