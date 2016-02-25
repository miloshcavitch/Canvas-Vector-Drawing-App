var pseudoSprite = {xCenter: 0, yCenter: 0, unit: 4, shapes: []};
var shape = function(type, name, fillColor){
  this.fillColor = fillColor;
  this.type = type;
  this.name = name;
  this.editBool = false;
  this.positions = [];
  var htmlLiString = "<li class='clearFix' class='ui-state-default' id='" + this.name + "'><span class='ui-icon ui-icon-arrowthick-2-n-s'></span>" + this.name +"<button type='button' class='objButton' class='movePoly'>Move Poly</button><button type='button' class='objButton' class='movePoints'>Move Points</button><select class='colorList'><option value='blue'>primary color</option></select><input type='range' class='alphaSlide'/></li>";
  $('#shapesCollection').append(htmlLiString);



  console.log(htmlLiString);
  var tempJQString = "#" + this.name;

  $(tempJQString).click(function(event){
    console.log(event);
    pseudoSprite.shapes.filter(function(el){
      if (el.name === event.target.parentNode.id){
        //this is where some cool code will eventually be
        el.editBool = !el.editBool;
        $(tempJQString).parent().toggleClass('.selected');//this is working but the css is not
        //set active function as edit/move points for the object you just selected;
        console.log(el);

        switch(event.target.outerText){
          case 'Move Points':
            console.log('being called');
            activeMode = function(){
              test(el);
            }
            break;
          }

      } else{
        el.editBool = false;
        $(tempJQString).parent().removeClass('.selected');
      }
    })
  });


}

var point = function(x, y){
  this.worldX = x;
  this.worldY = y;
  this.localX;
  this.localY;
}
