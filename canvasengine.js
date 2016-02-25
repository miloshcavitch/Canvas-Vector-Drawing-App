var pythagLength = function(pointerX, pointerY, point){//takes 2 point objects
  var a = Math.abs(pointerX - point.worldX);
  var b = Math.abs(pointerX - point.worldY);
  var c = Math.sqrt((a * a) + (b * b));
  return c;
}

var oSnap = function(){
  pointerX = mouseX;
  pointerY = mouseY;
}


var activeMode = function(x, y, shape){
  console.log(x + ", " + y);
}

var renderPoly = function(shape){
  ctx.beginPath();
  ctx.moveTo(shape.positions[0].worldX, shape.positions[0].worldY);
  shape.positions.forEach(function(el){
    ctx.lineTo(el.worldX, el.worldY);
  });
  ctx.lineTo(shape.positions[0].worldX, shape.positions[0].worldY);
  ctx.closePath();
  ctx.fillColor = 'red';
  ctx.fill();
}
////////////////////////////////////////////
///////////////////////////////////////////
//Init Point Add
var initPointAdd = function(initPointBool){
  if (initPointBool === true){
    pseudoSprite.shapes[pseudoSprite.shapes.length - 1].positions.push(new point(pointerX, pointerY));
  }
}
////////////////////////////////////////////
///////////////////////////////////////////
//Move Points
var pointMoveToggles = {pickedUp: false, pickedIndex: undefined}
var movePoint = function(){
  pseudoSprite.shapes[shapeIndex].positions[pointMoveToggles.pickedIndex].worldX = pointerX;
  pseudoSprite.shapes[shapeIndex].positions[pointMoveToggles.pickedIndex].worldY = pointerY;
}
var test = function(shape){
  console.log('blah');
}

var pickupDropPoint = function(shapeIndex){
  for (var i = 0; i < pseudoSprite.shapes[shapeIndex].positions.length; i++){
    if (pythagLength(pointerX, pointerY, pseudoSprite.shapes[shapeIndex].positions[i]) <= 15){
      console.log('pickedUp');
      pointMoveToggles.pickedUp = !pointMoveToggles.pickedUp;
      pointMoveToggles.pickedIndex = i;
    }
  }

  if (pointMoveToggles.pickedUp === true){
    activeUpdate = function(){
      movePoint();
    }
  } else {
    activeUpdate = function(){
    }
  }
}


///////////////////////////////////////////
//////////////////////////////////////////
var render = function(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pseudoSprite.shapes.forEach(function(el){
    switch(el.type){
      case 'polygon':
        renderPoly(el);
        break;
    }
  });
}
var activeUpdate = function(){
}
var activeRenderLayer = function(){
}
var update = function(){
  activeUpdate();
  render();
}
