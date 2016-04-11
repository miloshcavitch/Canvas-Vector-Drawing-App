var pseudoSprite = {xCenter: 0, yCenter: 0, unit: 4, shapes: []};
var addingShape = [];
var shape = function(type, name){
  this.fillColor = '#000000';
  this.colorIndex = 0;
  this.alphaLevel = 1;
  this.type = type;
  this.name = name;
  this.symmetry = false;
  this.positions = [];
  this.editPoints = false;
  this.movingPoly = false;
  var selectString = "<select class='colorList'>";
    for (var i = 0; i < colorVariables.length; i++){
      selectString +="<option value='" + i + "'>" + colorVariables[i].name + "</option>";
  }
    selectString += "</select>";
  console.log(selectString);
  var htmlLiString;
  var extra = '';
  if (this.type === 'polygon' || this.type === 'polyline'){
    extra = "<button type='button' class='curve-convert' class='objButton'>Bezier Convert</button>"
  }
  htmlLiString = "<li class='clearFix' class='ui-state-default' id='" + this.name + "'><span class='ui-icon ui-icon-arrowthick-2-n-s'></span>" + this.name +"<button type='button' class='objButton' class='move-shape'>Move Shape</button><button type='button' class='objButton' class='movePoints'>Move Points</button>" + selectString + "<input type='range' class='alphaSlide'></select><input type='checkbox' class='symmetry-toggle' name='symmetry' value='1'>" + extra + "</li>";
  $('#shapesCollection').append(htmlLiString);
  console.log(this);
  console.log(htmlLiString);
  renderOrder.push(pseudoSprite.shapes.length);
  var tempJQString = "#" + this.name;


  $(tempJQString).mouseup(function(){
    setTimeout(function(){
      setRenderOrder();
    }, 10);
  });


  $(tempJQString).click(function(event){
    for (var j = 0; j < pseudoSprite.shapes.length; j++){
      if (pseudoSprite.shapes[j].name === event.target.parentNode.id){
        $(tempJQString).parent().toggleClass('.selected');

        switch(event.target.className){
          case 'curve-convert':
            if (event.target.outerText === 'Bezier Convert'){
              console.log('success, great');
              if (pseudoSprite.shapes[j].type === 'polygon'){
                convertToCurvedShape(j);
              }
              if (pseudoSprite.shapes[j].type === 'polyline'){
                convertToCurvedLine(j);
              }
              pointMoveToggles.shapeIndex = j;
              activeMode = function(){
                pickupPoint();
              }
              pseudoSprite.shapes.forEach(function(el){
                el.editPoints = false;
                el.movingPoly = false;
              });
              pseudoSprite.shapes[j].editPoints = true;
              enterEdit();
              event.target.outerText = '';
            }
            break;
          case 'symmetry-toggle':
            pseudoSprite.shapes[j].symmetry = !pseudoSprite.shapes[j].symmetry;
          case 'objButton':
            console.log(event);
            if (event.target.outerText === 'Move Points'){
              console.log('move points');
              pointMoveToggles.shapeIndex = j;
              activeMode = function(){
                pickupPoint();
              }
              pseudoSprite.shapes.forEach(function(el){
                el.editPoints = false;
                el.movingPoly = false;
              });
              pseudoSprite.shapes[j].editPoints = true;
              enterEdit();
            }
            if (event.target.outerText === 'Move Shape'){
              shapeMoveToggles.shapeIndex = j;
              activeMode = function(){
                pickupShape();
              }
              pseudoSprite.shapes.forEach(function(el){
                el.movingPoly = false;
                el.editPoints = false;
              });
              pseudoSprite.shapes[j].movingPoly = true;
              enterEdit();
            }
            break;
          case 'alphaSlide':
            var val = event.offsetX * 0.01;
            if (val >= 0.98){
              val = 1;
            }
            pseudoSprite.shapes[j].alphaLevel = val;
            break;
          case 'colorList':
            console.log('color list');
            console.log(event.target.value);
            pseudoSprite.shapes[j].colorIndex = parseInt(event.target.value);
            break;
          }

      } else{
        pseudoSprite.shapes[j].editBool = false;
        $(tempJQString).parent().removeClass('.selected');
      }
    }
  });

}

var point = function(x, y){
  this.worldX = x;
  this.worldY = y;
  this.localX;
  this.localY;
}

var colorVariables = [];

var colorVar = function(name, hexstring){
  this.name = name;
  this.color = hexstring;
  //append colors to drop down
  $( "#shapesCollection li" ).each(function() {
    $(this).context.childNodes[4].insertAdjacentHTML( 'beforeend', "<option value='" + colorVariables.length + "'>" + name + "</option>" );
  });
  var htmlLiString = "<li class='clearFix' class='ui-state-default' id='" + this.name + "'>" + this.name + "<input type='text' class='basic' id='" + this.name + "Picker' value='red'/></li>";
  $('#colorsCollection').append(htmlLiString);
  var jqColString = '#' + this.name + 'Picker';
  $(jqColString).spectrum({
    preferredFormat: "hex",
    showInput: true,
    showPalette: true,
    palette: [["red", "rgba(0, 255, 0, .5)", "rgb(0, 0, 255)"]]
  });

  var colIndex = colorVariables.length;
  $(jqColString).on('move.spectrum', function(e, tinycolor) {
    colorVariables[colIndex].color = tinycolor.toHexString();
    console.log(tinycolor.toHexString());
  });


  $(jqColString).click(function(event){
    console.log(event);
  })
  var tempJQString = '#' + this.name;
  $(tempJQString).click(function(event){
    console.log(event);
  });
}

colorVariables.push(new colorVar('black', '#000000'));
var colorSearch = function(string){
  var color;
  colorVariables.forEach(function(el){
    if (string === el.name){
      color = el.color;
    }
  });
  return color;
}
