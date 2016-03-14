var pseudoSprite = {xCenter: 0, yCenter: 0, unit: 4, shapes: []};
var addingShape = [];
var shape = function(type, name){
  this.fillColor = '#000000';
  this.colorIndex = 0;
  this.alphaLevel = 1;
  this.type = type;
  this.name = name;
  this.positions = [];
  this.editPoints = false;
  this.movingPoly = false;
  var selectString = "<select class='colorList'>";
    for (var i = 0; i < colorVariables.length; i++){
      selectString +="<option value='" + i + "'>" + colorVariables[i].name + "</option>";
  }
    selectString += "</select>";
  console.log(selectString);
  var htmlLiString = "<li class='clearFix' class='ui-state-default' id='" + this.name + "'><span class='ui-icon ui-icon-arrowthick-2-n-s'></span>" + this.name +"<button type='button' class='objButton' class='movePoly'>Move Poly</button><button type='button' class='objButton' class='movePoints'>Move Points</button>" + selectString + "<input type='range' class='alphaSlide'></select></li>";
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
    console.log(event);
    for (var j = 0; j < pseudoSprite.shapes.length; j++){
      if (pseudoSprite.shapes[j].name === event.target.parentNode.id){
        //this is where some cool code will eventually be
        $(tempJQString).parent().toggleClass('.selected');//this is working but the css is not
        //set active function as edit/move points for the object you just selected;
        console.log(pseudoSprite.shapes[j]);

        switch(event.target.className){
          case 'objButton':
            if (event.target.outerText === 'Move Points'){
              console.log('move points');
              pointMoveToggles.shapeIndex = j;
              activeMode = function(){
                pickupPoint();
              }
              pseudoSprite.shapes.forEach(function(el){
                el.editPoints = false;
              });
              pseudoSprite.shapes[j].editPoints = true;
              enterEditPoints();
            }
            if (event.target.outerText === 'Move Poly'){
              console.log('move poly');
              shapeMoveToggles.shapeIndex = j;
              activeMode = function(){
                pickupShape();
              }
              pseudoSprite.shapes.forEach(function(el){
                el.movingPoly = false;
              });
              pseudoSprite.shapes[j].movingPoly = true;
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

colorVariables.push(new colorVar('black', '#000000'))
var colorSearch = function(string){
  var color;
  colorVariables.forEach(function(el){
    if (string === el.name){
      color = el.color;
    }
  });
  return color;
}
