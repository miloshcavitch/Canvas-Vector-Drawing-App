///////////////////////////////////////
///////////////////////////////////////
//JQuery functions
var enterEdit = function(){
  hideBTN();
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
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.font = "20px Arial";
  ctx.fillText(snapString, pointerX, pointerY);
  ctx.closePath();
}
var symmetryPos; // gets value when canvas is made

var symmetryCircleRender = function(shape, radius){
  ctx.beginPath();
  ctx.globalAlpha = shape.alphaLevel;
  ctx.fillStyle = colorVariables[shape.colorIndex].color;
  var flippedX = Math.abs(shape.positions[0].worldX - symmetryPos);
  if (shape.positions[0].worldX > symmetryPos){
    flippedX = flippedX * -1;
  }
  ctx.arc(flippedX + symmetryPos, shape.positions[0].worldY, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();

}
var symmetryPLRender = function(shape){
  ctx.beginPath();
  ctx.globalAlpha = shape.alphaLevel;
  var flippedXStart = Math.abs(shape.positions[0].worldX - symmetryPos);
  if (shape.positions[0].worldX > symmetryPos){
    flippedXStart = flippedXStart * -1;
  }
  ctx.moveTo((flippedXStart + symmetryPos), shape.positions[0].worldY);
  shape.positions.forEach(function(el){
    var flippedX = Math.abs(el.worldX - symmetryPos);
    if (el.worldX > symmetryPos){
      flippedX = flippedX * -1;
    }
    ctx.lineTo((flippedX + symmetryPos), el.worldY);
  });
  ctx.strokeStyle = colorVariables[shape.colorIndex].color;
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.globalAlpha = 1;
  ctx.closePath();
}
var symmetryPolyRender = function(shape){
  ctx.beginPath();
  ctx.globalAlpha = shape.alphaLevel;
  var flippedXStart = Math.abs(shape.positions[0].worldX - symmetryPos);
  if (shape.positions[0].worldX > symmetryPos){
    flippedXStart = flippedXStart * -1;
  }
  ctx.moveTo((flippedXStart + symmetryPos), shape.positions[0].worldY);
  shape.positions.forEach(function(el){
    var flippedX = Math.abs(el.worldX - symmetryPos);
    if (el.worldX > symmetryPos){
      flippedX = flippedX * -1;
    }
    ctx.lineTo((flippedX + symmetryPos), el.worldY);
  });
  ctx.lineTo((flippedXStart + symmetryPos), shape.positions[0].worldY);
  ctx.closePath();
  ctx.strokeStyle = colorVariables[shape.colorIndex].color;
  ctx.lineWidth = 1;
  ctx.fillStyle = colorVariables[shape.colorIndex].color;
  if (shape.alphaLevel >= 0.9){
    ctx.lineWidth = 1;
    ctx.strokeStyle = colorVariables[shape.colorIndex].color;
    ctx.stroke();
  }
  ctx.fill();
  ctx.globalAlpha = 1;
}

var mirrorShapeLocations = function(s){
  var mS = [];
  s.positions.forEach(function(p){

  })
}

var mirrorPythagLength = function(mouseX, mouseY, point){
  var mirrorX = Math.abs(point.worldX - symmetryPos);
  if (point.worldX > symmetryPos){
    mirrorX = mirrorX * -1;
  }
  var a = Math.abs(pointerX - (mirrorX + symmetryPos));
  var b = Math.abs(pointerY - point.worldY);
  var c = Math.hypot(a, b);
  return c;
}

var pointSnap = function(){
  var shortestDistance = 10;
  var candidate = {worldX: undefined, worldY: undefined, type: 'point'};
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
    if (el.symmetry === true){
      el.positions.forEach(function(p){
        var tempLength = mirrorPythagLength(mouseX, mouseY, p);
        if (tempLength < shortestDistance){
          shortestDistance = tempLength;
          candidate.worldY = p.worldY;
          var mirrorX = Math.abs(p.worldX - symmetryPos);
          if (p.worldX > symmetryPos){
            mirrorX = mirrorX * -1;
          }
          candidate.worldX = mirrorX + symmetryPos;
        }
      });
    }
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
var lastGridExponent = 0;
var gridSliderCalc = function(){
  gridCount = 1;
  for (var i = 0; i < $('#grid-size').val(); i++){
    gridCount = gridCount * 2;
  }
}
var frontGridRender = function(){
  if (lastGridExponent != $('#grid-size').val()){
    lastGridExponent = $('#grid-size').val();
    gridSliderCalc();
  }
  var increment = canvas.height/gridCount;
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 0.25;
  var gridPos = canvas.width/2;
  while(gridPos > 0){//verticals
    ctx.beginPath();
    ctx.moveTo(gridPos, 0);
    ctx.lineTo(gridPos, canvas.height);
    ctx.stroke();
    gridPos -= increment;
    ctx.closePath();
    gLO = gridPos;
  }
  gridPos = canvas.width/2 + increment;
  while (gridPos < canvas.width){
    ctx.beginPath();
    ctx.moveTo(gridPos, 0);
    ctx.lineTo(gridPos, canvas.height);
    ctx.stroke();
    gridPos += increment;
    ctx.closePath();
  }
  gridPos = increment;
  for (var i = 0; i < gridCount; i++){//horizontals
    ctx.beginPath();
    ctx.moveTo(0, gridPos);
    ctx.lineTo(canvas.width, gridPos);
    ctx.stroke();
    gridPos += increment;
    ctx.closePath();
  }
}
var symSnap = function(){
  if (Math.abs(mouseX - symmetryPos) <= 10){
    return {worldX: symmetryPos, worldY: mouseY, type: 'line of symmetry'};
  }
}
var gLO; //grid left offset
var gridSnap = function(){
  var candidate = {worldX: mouseX, worldY: mouseY, type: 'grid'};
  var yGridDist, xGridDist;
  if (mouseY % canvas.height/gridCount <= 10 || mouseY % canvas.height/gridCount <= (gridSize - 10)){
    yGridDist = mouseY % canvas.height/gridCount;
    if (mouseX > canvas.width/2){//right of center
      if ((mouseX - canvas.width/2) % canvas.height/gridCount < 10){
        candidate.worldX = Math.floor((mouseX - canvas.width/2)/(canvas.height/gridCount) * (canvas.height/gridCount) );
        if (yGridDist <= 10){
          candidate.worldY = Math.floor((mouseY/(canvas.height/gridCount)) * (canvas.height/gridCount));
        } else {
          candidate.worldY = Math.ceil((mouseY/(canvas.height/gridCount)) * (canvas.height/gridCount));
        }
      }
    } else {//left of center

    }
  }
}
var snapString = '';
var oSnap = function(){//to be added
  snapString = '';
  lastPointerX = pointerX;
  lastPointerY = pointerY;
  pointerX = mouseX;
  pointerY = mouseY;
  var pCandidates = [];
  var smallest = 10;
  var goodOption = {worldX: mouseX, worldY: mouseY};
  if (objectSnaps.toggle){
    if (objectSnaps.point){
      console.log('point');
      if (pointSnap() != undefined){
        pCandidates.push(pointSnap());
        console.log('gucci');
      }
    }
    if (objectSnaps.line){
      console.log('line');
      var lineSnaps = polyLineSnap();
      if (lineSnaps != undefined){
        pCandidates.push(lineSnaps);
        console.log('lines');
      }
    }
    if (objectSnaps.grid){
      console.log('grid');
      if (gridSnap() != undefined){
        pCandidates.push(gridSnap());
      }
    }
    if (objectSnaps.sym){
      if (symSnap() != undefined){
        pCandidates.push(symSnap());
      }
    }
    console.log(pCandidates);
    var lineSnapBypass;
    pCandidates.forEach(function(c){
      if (c.type === 'point'){
        lineSnapBypass = c;
        console.log(lineSnapBypass);
      }
      if (pythagLength(mouseX, mouseY, c) < smallest){
        smallest = pythagLength(mouseX, mouseY, c);
        goodOption.worldX = c.worldX;
        goodOption.worldY = c.worldY;
        snapString = c.type;
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
  if (shape.alphaLevel >= 0.9){
    ctx.lineWidth = 1;
    ctx.strokeStyle = colorVariables[shape.colorIndex].color;
    ctx.stroke();
  }
  ctx.fill();
  if (shape.symmetry === true){
    symmetryPolyRender(shape);
  }
  ctx.globalAlpha = 1;
}

var polyEditPointRender = function(shape, color){
  ctx.globalAlpha = 0.6;
  shape.positions.forEach(function(p){
    ctx.beginPath();
    ctx.arc(p.worldX, p.worldY, 10, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
  });
  ctx.beginPath();
  ctx.globalAlpha = 0.4;
  ctx.moveTo(shape.positions[0].worldX, shape.positions[0].worldY);
  shape.positions.forEach(function(p){
    ctx.lineTo(p.worldX, p.worldY);
  });
  ctx.lineTo(shape.positions[0].worldX, shape.positions[0].worldY);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.globalAlpha = 1;
}

var symmetryLineRender = function(){
  ctx.beginPath();
  ctx.lineWidth = 0.6;
  ctx.globalAlpha = 0.9;
  ctx.strokeStyle = 'white';
  ctx.moveTo(symmetryPos, 0);
  ctx.lineTo(symmetryPos, canvas.height);
  ctx.closePath();
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
        case 'polyline':
        case 'circle':
        case 'curvedshape':
          polyEditPointRender(el, 'gray');
          break;
      }
    }
    if (el.movingPoly === true){
      switch(el.type){
        case 'polygon':
        case 'polyline':
        case 'circle':
          polyEditPointRender(el, '#40ff00');
          break;
      }
    }

  });
  if (objectSnaps.grid && objectSnaps.toggle){
    frontGridRender();
  }
  if (objectSnaps.sym && objectSnaps.toggle){
    symmetryLineRender();
  }
  renderPointer();
}
////////////////////////////////////////////
///////////////////////////////////////////
//Init Point Add
var initCircleAdd = function(initPointBool){
  if (initPointBool === true){
    pseudoSprite.shapes[pseudoSprite.shapes.length - 1].positions.push(new point(pointerX, pointerY));
    console.log(pseudoSprite.shapes[pseudoSprite.shapes.length-1].positions.length)
  }
  if (pseudoSprite.shapes[pseudoSprite.shapes.length-1].positions.length >= 2){
    console.log('bruh');
    showBTN();
    initPointBool = false;
    activeMode = function(){

    }

  }
}

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
///////////////////////////////////
///////////////////////////////////
var shapeMoveToggles = {shapeIndex: undefined, pickedUp: false, posIndex: undefined};
var pickupShape = function(){
  for (var i = 0; i < pseudoSprite.shapes[shapeMoveToggles.shapeIndex].positions.length; i++){
    if (pythagLength(pointerX, pointerY, pseudoSprite.shapes[shapeMoveToggles.shapeIndex].positions[i]) <= 10){
      shapeMoveToggles.pickedUp = true;
      shapeMoveToggles.posIndex = i;
      activeUpdate = function(){
        moveShape();
      }
      activeMode = function(){
        dropShape();
      }
    }
  }
}
var moveShape = function(){
  var rise = 0;
  var run = 0;
  rise = Math.abs(pseudoSprite.shapes[shapeMoveToggles.shapeIndex].positions[shapeMoveToggles.posIndex].worldY - pointerY);
  run = Math.abs(pseudoSprite.shapes[shapeMoveToggles.shapeIndex].positions[shapeMoveToggles.posIndex].worldX - pointerX);
  if (pseudoSprite.shapes[shapeMoveToggles.shapeIndex].positions[shapeMoveToggles.posIndex].worldY > pointerY){
    rise = rise * -1;
  }
  if (pseudoSprite.shapes[shapeMoveToggles.shapeIndex].positions[shapeMoveToggles.posIndex].worldX > pointerX){
    run = run * -1;
  }

  pseudoSprite.shapes[shapeMoveToggles.shapeIndex].positions.forEach(function(p){
    p.worldX += run;
    p.worldY += rise;
  });
}

var dropShape = function(){
  shapeMoveToggles.pickedUp = false;
  shapeMoveToggles.posIndex = undefined;
  activeUpdate = function(){

  }
  activeMode = function(){
    pickupShape();
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
  var increment = canvas.height/64;
  var pos = canvas.width/2;
  ctx.strokeStyle = '#999999';
  ctx.lineWidth = 0.125;
  while (pos > 0){
    ctx.beginPath();
    ctx.moveTo(pos, 0);
    ctx.lineTo(pos, canvas.height);
    ctx.stroke();
    ctx.closePath();
    pos -= increment;
  }
  pos = canvas.width/2 + increment;
  while (pos < canvas.width){
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
var convertToCurvedShape = function(i){
  for (var j = 0; j < pseudoSprite.shapes[i].positions.length; j+=3){
    //calculate point at 1/3rd
      pseudoSprite.shapes[i].splice(j+1, 0, new point(firstX, firstY));
      //calculate point at 2/3rds
      pseudoSprite.shapes[i].splice(j+2, 0, new point(secondX, secondY));
  }
  pseudoSprite.shapes[i].type = 'curvedshape';
}
var renderCurveShape = function(shape){
  ctx.beginPath();
  ctx.moveTo(shape.positions[0].worldX, shape.positions[0].worldY);
  for (var i = 0; i < shape.positions.length; i+=3){
    var lastpoint = {x: undefined, y: undefined};
    if (i+3 > shape.positions.length){
      lastpoint.x = shape.positions[0].worldX;
      lastpoint.y = shape.positions[0].worldY;
    } else{
      lastpoint.x = shape.positions[i+2].worldX;
      lastpoint.y = shape.positions[i+2].worldY;
    }
    ctx.bezierCurveTo(shape.positions[i].worldX, shape.positions[i].worldY, shape.positions[i+1].worldX, shape.positions[i+1].worldY, lastpoint.x, lastpoint.y);
  }
  ctx.fillStyle = colorVariables[shape.colorIndex].color;
  ctx.globalAlpha = shape.alphaLevel;
  ctx.fill();
  ctx.closePath();
  ctx.globalAlpha = 1;
}
var renderLine = function(pL){
  ctx.beginPath();
  ctx.moveTo(pL.positions[0].worldX, pL.positions[0].worldY);
  pL.positions.forEach(function(p){
    ctx.lineTo(p.worldX, p.worldY);
  });
  ctx.strokeStyle = 'black';
  ctx.strokeStyle = colorVariables[pL.colorIndex].color;
  ctx.globalAlpha = pL.alphaLevel;
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.closePath();
  ctx.globalAlpha = 1;
  if (pL.symmetry === true){
    symmetryPLRender(pL);
  }
}
var renderCircle = function(c){
  ctx.globalAlpha = c.alphaLevel;
  ctx.fillStyle = colorVariables[c.colorIndex].color;
  ctx.beginPath();
  var radius = pythagLength(c.positions[0].worldX, c.positions[0].worldY, c.positions[1]);
  ctx.arc(c.positions[0].worldX, c.positions[0].worldY, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
  if (c.symmetry === true){
    symmetryCircleRender(c, radius);
  }
  ctx.globalAlpha = 1;
}
var render = function(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  backGrid();
  renderOrder.forEach(function(o){
    switch(pseudoSprite.shapes[o].type){
      case 'polygon':
        renderPoly(pseudoSprite.shapes[o]);
        break;
      case 'polyline':
        renderLine(pseudoSprite.shapes[o]);
        break;
      case 'circle':
        renderCircle(pseudoSprite.shapes[o]);
        break;
      case 'curvedshape':
      case 'curvedline':
        renderCurveShape(pseudoSprite.shapes[o]);
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
