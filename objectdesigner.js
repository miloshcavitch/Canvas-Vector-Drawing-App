var visualObject = {xCenter: 0, yCenter: 0, unit: 4, shapes: []};
var shape = function(type, name, fillColor){
  this.fillColor = fillColor;
  this.type = type;
  this.name = name;
  this.editBool = false;
  this.positions = [];
  var htmlLiString = "<li class='clearFix' class='ui-state-default'><span class='ui-icon ui-icon-arrowthick-2-n-s'></span>" + this.name +"<button type='button' class='objButton' id='" + this.name + "'>Edit Poly</button></li>";
  $('#shapesCollection').append(htmlLiString);
  console.log(htmlLiString);
  var tempJQString = "#" + this.name;
  $(tempJQString).click(function(event){
    visualObject.shapes.filter(function(el){
      if (el.name === event.target.id){
        console.log(el);//this is where some cool code will eventually be
        el.editBool = !el.editBool;
        $(tempJQString).parent().toggleClass('.selected');//this is working but the css is not
        //set active function as edit/move points for the object you just selected;
      } else{
        el.editBool = false;
        $(tempJQString).parent().removeClass('.selected');
      }
    })
  });

}
