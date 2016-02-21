var visualObject = {xCenter: 0, yCenter: 0, unit: 4, shapes: []};
var shape = function(type, name, fillColor){
  this.fillColor = fillColor;
  this.type = type;
  this.name = name;
  this.positions = [];
  var htmlLiString = "<li class='ui-state-default'><span class='ui-icon ui-icon-arrowthick-2-n-s'></span>" + this.name +"<button type='button' class='objButton' id='" + this.name + "'>Edit Poly</button></li>";
  $('#shapesCollection').append(htmlLiString);
  console.log(htmlLiString);
  var tempJQString = "#" + this.name;
  $(tempJQString).click(function(event){
    visualObject.shapes.filter(function(el){
      if (el.name === event.target.id){
        console.log(el);
      }
    })
  });
}
