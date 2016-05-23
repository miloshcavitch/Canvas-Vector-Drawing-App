var writeJS = function(){
  var jSString ='';
  colorVariables.forEach(function(color){
    jSString += ("var " + color.name + " = " + color.color + ";<br>");
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
  var xCenter = 500;
  var yCenter = 500;
  console.log(unitX);
  jSString += ('<p>var pseudoSprite = {xCenter: undefined, yCenter: undefined, width: ' + unitX + ', height: ' + unitY + ', shapes: [<br>&#9;&#9;');
  pseudoSprite.shapes.forEach(function(shape){
    jSString += ('{fillColor: ' + colorVariables[shape.colorIndex].name + ', type: \'' + shape.type + '\', positions: [<br>&#9;&#9;&#9;');
    shape.positions.forEach(function(p){
      var localX = (p.worldX - xCenter) / unitX;
      var localY = (p.worldY - yCenter) / unitY;
      jSString += "<br>&#9;&#9;&#9;&#9;{x: " +  localX + ", y: " + localY + "},";
    });
    jSString += " },<br>";
  });
  jSString.slice(jSString.length, 1);
  jSString += "]}</p>";

  $('#obj-source').empty();
  $('#obj-source').append(jSString);
  $('#obj-source').css('display', 'block');
  console.log(jSString);

}
