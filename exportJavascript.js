var writeJS = function(){
  var jSString ='';
  colorVariables.forEach(function(color){
    jSString += ("var " + color.name + " = " + color.color + ";\n");
  });
  jSString += ('var pseudoSprite = {xCenter: undefined, yCenter: undefined, unit: 4, shapes: [');
  pseudoSprite.shapes.forEach(function(shape){
    jSString += ('' + )
  });
}
