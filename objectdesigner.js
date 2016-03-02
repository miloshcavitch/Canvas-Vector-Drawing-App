var pseudoSprite = {xCenter: 0, yCenter: 0, unit: 4, shapes: []};
var shape = function(type, name, fillColor){
  this.fillColor = fillColor;
  this.type = type;
  this.name = name;
  this.positions = [];
  this.editPoints = false;
  this.movePoly = false;
  var htmlLiString = "<li class='clearFix' class='ui-state-default' id='" + this.name + "'><span class='ui-icon ui-icon-arrowthick-2-n-s'></span>" + this.name +"<button type='button' class='objButton' class='movePoly'>Move Poly</button><button type='button' class='objButton' class='movePoints'>Move Points</button><select class='colorList'><option value='blue'>primary color</option></select><input type='range' class='alphaSlide'></select></li>";
  $('#shapesCollection').append(htmlLiString);



  console.log(htmlLiString);
  var tempJQString = "#" + this.name;

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
  $( "li" ).each(function( index ) {
    $(this).context.childNodes[4].insertAdjacentHTML( 'beforeend', "<option value='blue'>" + name + "</option>" );
  });
}
