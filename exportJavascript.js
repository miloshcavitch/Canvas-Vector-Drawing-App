var writeJS = function(){
  var jSString ='';
  colorVariables.forEach(function(color){
    jSString += ("var " + color.name + " = " + color.color + ";\n");
  });
  var maxX = 0;
  var maxY = 0;
  var minX = pseudoSprite.shapes[0].positions[0].worldX;
  var minY = pseudoSprite.shapes[0].positions[0].worldY;
  var unitX, unitY;
  pseudoSprite.shapes.forEach(function(shape){
    shape.positions.forEach(function(p){
      if (p.worldX > maxX){
        maxX = p.worldX;
      }
      if (p.worldY > maxY){
        maxY = p.worldY;
      }
      if (p.worldX < minX){
        minX = p.worldX;
      }
      if (p.worldY < minY){
        minY = p.worldY;
      }
    });
  });
  unitX = maxX - minX;
  unitY = maxY - minY;
  jSString += ('var pseudoSprite = {xCenter: undefined, yCenter: undefined, width: " + unitX + ", height: " + unitY + ", shapes: [');
  pseudoSprite.shapes.forEach(function(shape){
    jSString += ('{fillColor: ' + colorVariables[shape.colorIndex].name + ", type: " + shape.type + ", positions: [";
    shape.positions.forEach(function(p){
      var localX = (p.worldX - shape.xCenter) / ;
      var localY = (p.worldY - shape.yCenter) / ;
      jSString += "{x: " +  localX + ", y: " + localY + "}";
    });
    " },\n");
  });
  console.log(jSString);
}
