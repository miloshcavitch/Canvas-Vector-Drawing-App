var polyLineSnap = function(){
  var candidate = {worldX: undefined, worldY: undefined, type: 'line'};
  pseudoSprite.shapes.forEach(function(s){
    if (s.type === 'polygon'){
      for (var i = 0; i < s.positions.length; i++){
        var rise, run, slope;
        if (s.positions.length >= (i + 1)){
          rise = Math.abs(s.positions[i].worldY - s.positions[i+1].worldY);
          run = Math.abs(s.positions[i].worldX - s.positions[i+1].worldX);
          if (s.positions[i].worldX < s.positions[i+1].worldX){
            if (s.positions[i].worldY > s.positions[i+1].worldY){// upwards, according to standard coordinate system
              rise = rise;
            } else {
              rise = rise * -1;
            }
          }
        } else {
          rise = Math.abs(s.positions[i].worldY - s.positions[0].worldY);
          run = Math.abs(s.positions[i].worldX - s.positions[0].worldX);
          if (s.positions[i].worldX < s.positions[0].worldX){
            if (s.positions[i].worldY > s.positions[0].worldY){// upwards, according to standard coordinate system
              rise = rise;
            } else {
              rise = rise * -1;
            }
          }
        }
        slope = rise/run;
      }
    }
  });
}
