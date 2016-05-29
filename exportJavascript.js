var writeJS = function(){
  var jSString ='';
  colorVariables.forEach(function(color){
    jSString += ("var " + color.name + " = '" + color.color + "';<br>");
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
      if (shape.symmetry === true){
        var symPoint = Math.abs(p.worldX - symmetryPos);
        if (p.worldX > symmetryPos){
          symPoint = symmetryPos + symPoint;
        } else {
          symPoint = symmetryPos - symPoint;
          console.log('happening');
        }
        if (p.worldX > maxX){
          maxX = symPoint;
        }
        if (p.worldX < minX){
          minX = symPoint;
        }
      }
    });
  });
  unitX = maxX - minX;
  unitY = maxY - minY;
  console.log(unitX);
  jSString += ('<p>var pseudoSprite = {symmetryLine: ' +  ( (symmetryPos - referencePoint.x) / unitX ) + ', xCenter: ' + referencePoint.x + ', yCenter: '+ referencePoint.y + ', width: ' + unitX + ', height: ' + unitY + ', shapes: [<br>&#9;&#9;');
    renderOrder.forEach(function(i){
      var shape = pseudoSprite.shapes[i];
      jSString += ('{symmetryBool: ' + shape.symmetry + ', color: ' + colorVariables[shape.colorIndex].name + ', globalAlpha: ' + shape.alphaLevel + ', type: \'' + shape.type + '\',');
      if (shape.type === 'circle'){
        jSString += 'radius : ' + pythagLength(shape.positions[0].worldX, shape.positions[0].worldY, shape.positions[1])/unitX + ",  positions: [<br>&#9;&#9;&#9;";
        var localX = (shape.positions[0].worldX - referencePoint.x) / unitX;
        var localY = (shape.positions[0].worldY - referencePoint.y) / unitY;
        jSString += "<br>&#9;&#9;&#9;&#9;{x: " +  localX + ", y: " + localY + "}]},<br>";
      } else {
        if (shape.type === 'polyline' || shape.type === 'curvedline'){
          jSString += 'lineWidth: ' + shape.lineWidth + ", " ;
        }
        jSString +=  'positions: [<br>&#9;&#9;&#9;';
        shape.positions.forEach(function(p){
          var localX = (p.worldX - referencePoint.x) / unitX;
          var localY = (p.worldY - referencePoint.y) / unitY;
          jSString += "<br>&#9;&#9;&#9;&#9;{x: " +  localX + ", y: " + localY + "},";
        });
        jSString += " <br>]},<br>";
      }
    });

  jSString.slice(jSString.length, 1);
  jSString += "]}</p><div id='exit-source'><p>X</p></div>";

  $('#obj-source').empty();
  $('#obj-source').append(jSString);
  $('#obj-source').css({display: 'block', opacity: 1})
  console.log(jSString);

}
