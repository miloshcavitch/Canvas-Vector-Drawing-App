///////////////////////////////////////
///////////////////////////////////////
//JQuery functions
var enterEditPoints = function(){
  $('#currentInstructions').hide(500);
  $('#currentInstructions').text('Click a point and move mouse. Click again to put it down. Click the finish button when done.');
  $('#currentInstructions').show(500);
  $('#newPoly').hide(500);
  $('#newColorVar').hide(500);
  $('#finishMovingPoints').show(500);
}

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
  ctx.fillStyle = 'red';
  ctx.fill();
  if (shape.editPoints === true){
    shape.positions.forEach(function(el){
      ctx.beginPath();
      ctx.globalAlpha = 0.6
      ctx.arc(el.worldX, el.worldY, 10, 0, 2 * Math.PI);
      ctx.fillStyle = 'gray';
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }
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
var pointMoveToggles = {pickedUp: false, shapeIndex: undefined, posIndex: undefined}

var test = function(shape){
  console.log(shape);
}

var pickupPoint = function(shape){
  console.log('bomba');
  for (var i = 0; i < pseudoSprite.shapes[pointMoveToggles.shapeIndex].positions.length; i++){
    console.log(pythagLength(pointerX, pointerY, pseudoSprite.shapes[pointMoveToggles.shapeIndex].positions[i]))
    if (pythagLength(pointerX, pointerY, pseudoSprite.shapes[pointMoveToggles.shapeIndex].positions[i]) <= 10){
      pointMoveToggles.pickedUp = true;
      pointMoveToggles.posIndex = i;
      activeUpdate = function(){
        movePoint();
      }
      activeMode = function(){
        dropPoint();
      }
    }
  }
}

var movePoint = function(){
  pseudoSprite.shapes[pointMoveToggles.shapeIndex].positions[pointMoveToggles.posIndex].worldX = pointerX;
  pseudoSprite.shapes[pointMoveToggles.shapeIndex].positions[pointMoveToggles.posIndex].worldY = pointerY;
}

var dropPoint = function(){
  pointMoveToggles.pickedUp = false;
  activeUpdate = function(){

  }
  activeMode = function(){
    pickupPoint();
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
