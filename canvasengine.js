var oSnap = function(){
  pointerX = mouseX;
  pointerY = mouseY;
}
var activeMode = function(x, y, shape){
  console.log(x + ", " + y);
}

var initPointAdd = function(initPointBool){
  if (initPointBool === true){
    pseudoSprite.shapes[pseudoSprite.shapes.length - 1].positions.push(new point(pointerX, pointerY));
  }
}

var render = function(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pseudoSprite.shapes.forEach(function(el){
    ctx.beginPath();
    ctx.moveTo(el.positions[0].worldX, el.positions[0].worldY);
    el.positions.forEach(function(ele){
      ctx.lineTo(ele.worldX, ele.worldY);
    });
    ctx.lineTo(el.positions[0].worldX, el.positions[0].worldY);
    ctx.closePath();
    ctx.fillColor = 'red';
    ctx.fill();
  });
}

var update = function(){
  render();
}

setInterval(update, 30);
