var polyLineSnap = function(){
  var candidate = {worldX: undefined, worldY: undefined, type: 'line'};
  var tempLength = 10;
  pseudoSprite.shapes.forEach(function(s){
    if (s.type === 'polygon' || s.type === 'polyline'){
      for (var i = 0; i < s.positions.length; i++){
        var rise, run, slope, inverse, special, leftY, rightY, possibleIntersections;


        if (s.positions.length <= (i + 1)){
          possibleIntersections = calculationOfLine(s.positions[i].worldX, s.positions[i].worldY, s.positions[0].worldX, s.positions[0].worldY);
        } else {
          possibleIntersections = calculationOfLine(s.positions[i].worldX, s.positions[i].worldY, s.positions[i+1].worldX, s.positions[i+1].worldY);
        }
        console.log(possibleIntersections);
        if (possibleIntersections.onLine1 === true && possibleIntersections.onLine2 === true){
          var tempPoint = {worldX: possibleIntersections.x, worldY: possibleIntersections.y,};
          if (pythagLength(mouseX, mouseY, tempPoint) <= tempLength){
            tempLength = pythagLength(mouseX, mouseY, tempPoint);
            candidate.worldX = possibleIntersections.x;
            candidate.worldY = possibleIntersections.y;
          }
        }
      }
      
    }
  });
  if (candidate.worldX != undefined){
    return candidate;
  }
}
var linePolyTest = function(s){
  for (var i = 0; i < s.positions.length; i++){
    var rise, run, slope, inverse, special, leftY, rightY, possibleIntersections;


    if (s.positions.length <= (i + 1)){
      possibleIntersections = calculationOfLine(s.positions[i].worldX, s.positions[i].worldY, s.positions[0].worldX, s.positions[0].worldY);
    } else {
      possibleIntersections = calculationOfLine(s.positions[i].worldX, s.positions[i].worldY, s.positions[i+1].worldX, s.positions[i+1].worldY);
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
}

var calculationOfLine = function(x1, y1, x2, y2){
  rise = Math.abs(y1 - y2);
  run = Math.abs(x1 - x2);
  slope = rise/run;
  if (slope === 0){//some bullshit hack code right hurr to fix a bullshit problem(temp)
    slope = 0.00000000000001;
  }
  if ((x1 > x2 && y1 < y2) || (x1 < x2 && y1 > y2)){
    slope = slope * -1;
  }
  inverse = -1/slope;
  leftY = inverse * (0 - mouseX) + mouseY;
  rightY = inverse * (canvas.width - mouseX) + mouseY;
  var intersections = checkLineIntersection(x1, y1, x2, y2, 0, leftY, canvas.width, rightY);
  return intersections;
}

var mirrorLineSnap = function(){

}
