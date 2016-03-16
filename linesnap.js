var polyLineSnap = function(){
  var candidate = {worldX: undefined, worldY: undefined, type: 'line'};
  pseudoSprite.shapes.forEach(function(s){
    for (var i = 0; i < s.positions.length; i++){
      var rise, run, slope, inverse, special;


      if (s.positions.length <= (i + 1)){
        rise = Math.abs(s.positions[i].worldY - s.positions[0].worldY);
        run = Math.abs(s.positions[i].worldX - s.positions[0].worldX);
        slope = rise/run;
        if ((s.positions[i].worldX > s.positions[0].worldX && s.positions[i].worldY < s.positions[0].worldY) || (s.positions[i].worldX < s.positions[0].worldX && s.positions[i].worldY > s.positions[0].worldY)){
          slope = slope * -1;
        }
      } else {
        rise = Math.abs(s.positions[i].worldY - s.positions[i+1].worldY);
        run = Math.abs(s.positions[i].worldX - s.positions[i+1].worldX);
        slope = rise/run;
        if ((s.positions[i].worldX > s.positions[i+1].worldX && s.positions[i].worldY < s.positions[i+1].worldY) || (s.positions[i].worldX < s.positions[i+1].worldX && s.positions[i].worldY > s.positions[i+1].worldY)){
          slope = slope * -1;
        }
      }


      console.log(rise + "over " + run +  "signed slope equals " + slope);
    }
  });
}
