var polyLineSnap = function(){
  var candidate = {worldX: undefined, worldY: undefined, type: 'line'};
  var tempLength = 10;
  pseudoSprite.shapes.forEach(function(s){
    for (var i = 0; i < s.positions.length; i++){
      var rise, run, slope, inverse, special, leftY, rightY, possibleIntersections;


      if (s.positions.length <= (i + 1)){
        rise = Math.abs(s.positions[i].worldY - s.positions[0].worldY);
        run = Math.abs(s.positions[i].worldX - s.positions[0].worldX);
        slope = rise/run;
        if ((s.positions[i].worldX > s.positions[0].worldX && s.positions[i].worldY < s.positions[0].worldY) || (s.positions[i].worldX < s.positions[0].worldX && s.positions[i].worldY > s.positions[0].worldY)){
          slope = slope * -1;
        }
        inverse = -1/slope;
        leftPoint = inverse * (0 - mouseX) + mouseY;
        rightPoint = inverse * (canvas.width - mouseX) + mouseY;
        possibleIntersections = checkLineIntersection(s.positions[i].worldX, s.positions[i].worldY, s.positions[0].worldX, s.positions[0].worldY, 0, leftY, canvas.width, rightY);
      } else {
        rise = Math.abs(s.positions[i].worldY - s.positions[i+1].worldY);
        run = Math.abs(s.positions[i].worldX - s.positions[i+1].worldX);
        slope = rise/run;
        if ((s.positions[i].worldX > s.positions[i+1].worldX && s.positions[i].worldY < s.positions[i+1].worldY) || (s.positions[i].worldX < s.positions[i+1].worldX && s.positions[i].worldY > s.positions[i+1].worldY)){
          slope = slope * -1;
        }
        inverse = -1/slope;
        leftY = inverse * (0 - mouseX) + mouseY;
        rightY = inverse * (canvas.width - mouseX) + mouseY;
        possibleIntersections = checkLineIntersection(s.positions[i].worldX, s.positions[i].worldY, s.positions[i+1].worldX, s.positions[i+1].worldY, 0, leftY, canvas.width, rightY);
      }
      if (possibleIntersections.onLine1 === true && possibleIntersections.onLine2 === true){
        var tempPoint = {worldX: possibleIntersections.x, worldY: possibleIntersections.y,};
        if (pythagLength(mouseX, mouseY, tempPoint) <= tempLength){
          tempLength = pythagLength(mouseX, mouseY, tempPoint);
          candidate.worldX = possibleIntersections.x;
          candidate.worldY = possibleIntersections.y;
        }
      }
    }
  });
  if (candidate.worldX != undefined){
    return candidate;
  }
}
