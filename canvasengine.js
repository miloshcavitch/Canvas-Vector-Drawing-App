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
//////////////////////////////////////
/////////////////////////////////////
var pythagLength = function(pointerX, pointerY, point){
  var a = Math.abs(pointerX - point.worldX);
  var b = Math.abs(pointerY - point.worldY);
  var c = Math.hypot(a, b);
  return c;
}
var renderPointer = function(){
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.arc(pointerX, pointerY, 10, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();
}
var pointSnap = function(){
  var shortestDistance = 10;
  var candidate = {worldX: undefined, worldY: undefined};
  pseudoSprite.shapes.forEach(function(el){
    if (el.editPoints != true){
      el.positions.forEach(function(p){
        var tempLength = pythagLength(mouseX, mouseY, p);
        if (tempLength < shortestDistance){
          shortestDistance = tempLength;
          candidate.worldX = p.worldX;
          candidate.worldY = p.worldY;
        }
      });
    } else {
      for (var i = 0; i < el.positions.length; i++){
        if (i != pointMoveToggles.posIndex){
          var tempLength = pythagLength(mouseX, mouseY, el.positions[i]);
          if (tempLength < shortestDistance){
            shortestDistance = tempLength;
            candidate.worldX = el.positions[i].worldX;
            candidate.worldY = el.positions[i].worldY;
          }
        }
      }
    }
  });
  if (candidate.worldX != undefined){
    return candidate;
  }
}

var gridCount = 16;
var frontGridRender = function(){
  var increment = canvas.width/gridCount;
  var gridPos = increment;
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 0.25;
  for (var i = 0; i < gridCount; i++){
    ctx.beginPath();
    ctx.moveTo(gridPos, 0);
    ctx.lineTo(gridPos, canvas.height);
    ctx.stroke();
    gridPos += increment;
    ctx.closePath();
  }
  gridPos = increment;
  for (var i = 0; i < gridCount; i++){
    ctx.beginPath();
    ctx.moveTo(0, gridPos);
    ctx.lineTo(canvas.width, gridPos);
    ctx.stroke();
    gridPos += increment;
    ctx.closePath();
  }
}

var gridSnap = function(){
  var candidate = {worldX: mouseX, worldY: mouseY};
  var xGridDist = mouseX % (canvas.width/gridCount);
  var yGridDist = mouseY % (canvas.width/gridCount);
  if ((xGridDist <= 10 || xGridDist >= 40) && (yGridDist <=10 || yGridDist >= 40)){
    if (xGridDist <= 10){
      candidate.worldX = Math.floor(mouseX/ (canvas.width/gridCount)) * (canvas.width/gridCount);
    } else {
      candidate.worldX = Math.ceil(mouseX/ (canvas.width/gridCount)) * (canvas.width/gridCount);
    }

    if (yGridDist <= 10){
      candidate.worldY = Math.floor(mouseY/ (canvas.width/gridCount)) * (canvas.width/gridCount);
    } else {
      candidate.worldY = Math.ceil(mouseY/ (canvas.width/gridCount)) * (canvas.width/gridCount);
    }
    console.log(candidate.worldX + ", " + candidate.worldY);
    return candidate;
  }
}
var oSnap = function(){//to be added
  pointerX = mouseX;
  pointerY = mouseY;
  var pCandidates = [];
  var smallest = 10;
  var goodOption = {worldX: mouseX, worldY: mouseY};
  if (objectSnaps.toggle){
    if (objectSnaps.point){
      if (pointSnap() != undefined){
        pCandidates.push(pointSnap());
        console.log('gucci');
      }
    }
    if (objectSnaps.line){

    }
    if (objectSnaps.grid){
      if (gridSnap() != undefined){
        pCandidates.push(gridSnap());
      }
    }
    console.log(pCandidates);
    pCandidates.forEach(function(c){
      if (pythagLength(mouseX, mouseY, c) < smallest){
        smallest = pythagLength(mouseX, mouseY, c);
        goodOption.worldX = c.worldX;
        goodOption.worldY = c.worldY;
      }
    });
  }
  pointerX = goodOption.worldX;
  pointerY = goodOption.worldY;
}


var activeMode = function(x, y, shape){
  console.log(x + ", " + y);
}

var renderPoly = function(shape){
  ctx.beginPath();
  ctx.globalAlpha = shape.alphaLevel;
  ctx.moveTo(shape.positions[0].worldX, shape.positions[0].worldY);
  shape.positions.forEach(function(el){
    ctx.lineTo(el.worldX, el.worldY);
  });
  ctx.lineTo(shape.positions[0].worldX, shape.positions[0].worldY);
  ctx.closePath();
  ctx.fillStyle = colorVariables[shape.colorIndex].color;
  ctx.strokeStyle = colorVariables[shape.colorIndex].color;
  ctx.fill();
  ctx.globalAlpha = 1;
}
var polyEditPoint = function(shape){
  ctx.globalAlpha = 0.6;
  shape.positions.forEach(function(p){
    ctx.beginPath();
    ctx.arc(p.worldX, p.worldY, 10, 0, 2 * Math.PI);
    ctx.fillStyle = 'gray';
    ctx.fill();
  });
  ctx.beginPath();
  ctx.globalAlpha = 0.4;
  ctx.moveTo(shape.positions[0].worldX, shape.positions[0].worldY);
  shape.positions.forEach(function(p){
    ctx.lineTo(p.worldX, p.worldY);
  });
  ctx.lineTo(shape.positions[0].worldX, shape.positions[0].worldY);
  ctx.strokeStyle = 'gray';
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.globalAlpha = 1;
}

var renderOrder = [];
var setRenderOrder = function(){
  renderOrder = [];
  $('li').each(function(){
    for (var i = 0; i < pseudoSprite.shapes.length; i++){
      if ($(this).context.id === pseudoSprite.shapes[i].name){
        renderOrder.push(i);
      }
    }
  });
}
var renderUI = function(){
  pseudoSprite.shapes.forEach(function(el){
    if (el.editPoints === true){
      switch(el.type){
        case 'polygon':
          polyEditPoint(el);
      }
    }

  });
  if (objectSnaps.grid && objectSnaps.toggle){
    frontGridRender();
  }
  renderPointer();
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
  pointMoveToggles.posIndex = undefined;
  activeUpdate = function(){

  }
  activeMode = function(){
    pickupPoint();
  }
}



///////////////////////////////////////////
//////////////////////////////////////////


var backGrid = function(){
  ctx.beginPath();
  ctx.fillStyle = '#555555';
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fill();
  ctx.closePath();
  var increment = canvas.width/64;
  var pos = increment;
  ctx.strokeStyle = '#999999';
  ctx.lineWidth = 0.125;
  for (var i = 0; i < 63; i++){
    ctx.beginPath();
    ctx.moveTo(pos, 0);
    ctx.lineTo(pos, canvas.height);
    ctx.stroke();
    ctx.closePath();
    pos += increment;
  }
  pos = increment;
  for (var i = 0; i < 63; i++){
    ctx.beginPath();
    ctx.moveTo(0, pos);
    ctx.lineTo(canvas.width, pos);
    ctx.stroke();
    ctx.closePath();
    pos += increment;
  }
}
var render = function(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  backGrid();
  renderOrder.forEach(function(o){
    switch(pseudoSprite.shapes[o].type){
      case 'polygon':
        renderPoly(pseudoSprite.shapes[o]);
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
  renderUI();
}
