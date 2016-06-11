///////////////////////////////////////
///////////////////////////////////////
//JQuery functions
var referenceBool = false;
var referencePoint;
var toggleReferencePoint = function(event){
  referenceBool = !referenceBool;
  switch(referenceBool){
    case true:
      event.target.innerHTML = 'Hide Center/Reference Point';
      $('#move-centerpoint-info').css('display', 'block');
      break;
    case false:
      event.target.innerHTML = 'Show Center/Reference Point';
      $('#move-centerpoint-info').css('display', 'none');
      break;
  }
  console.log(referenceBool);
}
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
  if (shape.positions.length === 0){
    return;
  }
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
  ctx.lineWidth = shape.lineWidth;
  ctx.stroke();
  ctx.globalAlpha = 1;
  ctx.closePath();
}
var symmetryPolyRender = function(shape){
  if (shape.positions.length === 0){
    return;
  }
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
var xFlip = function(x){
  var flippedX = Math.abs(x - canvas.width/2);
  if (x > canvas.width/2){
    flippedX = flippedX * -1;
  }
  flippedX += canvas.width/2
  return flippedX;
}
var symmetryCurvedLineRender = function(shape){
  if (shape.positions.length === 0){
    return;
  }
  ctx.beginPath();
  var flippedXStart = xFlip(shape.positions[0].worldX);
  ctx.moveTo(flippedXStart, shape.positions[0].worldY);
  for (var i = 1; i < shape.positions.length -1; i+=3){
    ctx.bezierCurveTo(xFlip(shape.positions[i].worldX), shape.positions[i].worldY, xFlip(shape.positions[i+1].worldX), shape.positions[i+1].worldY, xFlip(shape.positions[i+2].worldX), shape.positions[i+2].worldY);
  }
  ctx.lineWidth = shape.lineWidth;
  ctx.strokeStyle = colorVariables[shape.colorIndex].color;
  ctx.globalAlpha = shape.alphaLevel;
  ctx.stroke();
  ctx.closePath();
  ctx.globalAlpha = 1;
}
var symmetryCurvedShapeRender = function(shape){
  if (shape.positions.length === 0){
    return;
  }
  ctx.beginPath();
  var flippedXStart = xFlip(shape.positions[0].worldX);
  ctx.moveTo(flippedXStart, shape.positions[0].worldY);
  for (var i = 1; i < shape.positions.length; i+=3){
    var lastpoint = {x: undefined, y: undefined};
    if (i+3 > shape.positions.length){
      lastpoint.x = xFlip(shape.positions[0].worldX);
      lastpoint.y = shape.positions[0].worldY;
    } else{
      lastpoint.x = xFlip(shape.positions[i+2].worldX);
      lastpoint.y = shape.positions[i+2].worldY;
    }
    ctx.bezierCurveTo(xFlip(shape.positions[i].worldX), shape.positions[i].worldY, xFlip(shape.positions[i+1].worldX), shape.positions[i+1].worldY, lastpoint.x, lastpoint.y);
  }
  ctx.fillStyle = colorVariables[shape.colorIndex].color;
  ctx.globalAlpha = shape.alphaLevel;
  ctx.fill();
  if (shape.alphaLevel >= 0.9){
    ctx.lineWidth = 1;
    ctx.strokeStyle = colorVariables[shape.colorIndex].color;
    ctx.stroke();
  }
  ctx.closePath();
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
  var shortestDistance = handleSize;
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
var handleSize = 5;
var handleSizeCalc = function(){
  handleSize = $('#handle-tolerance').val() * 0.10;
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
  if (Math.abs(mouseX - symmetryPos) <= handleSize){
    return {worldX: symmetryPos, worldY: mouseY, type: 'line of symmetry'};
  }
}
var gLO; //grid left offset
var gridSnap = function(){
  var candidate = {worldX: undefined, worldY: undefined, type: 'grid'};
  var pointX, pointY;
  var pointSwitch = true;
  var xCount = 0;
  var yCount = 0;
  while(pointSwitch === true){
    if (Math.abs(mouseY - yCount * canvas.height/gridCount) <= handleSize){
      pointSwitch = false;
      pointY = yCount * canvas.height/gridCount;
    }
    if (yCount * canvas.height/gridCount >= canvas.width){
      pointSwitch = false;
    }
    yCount++;
  }
  pointSwitch = true;
  if (pointY != undefined){
    while(pointSwitch === true){
      if (mouseX >= canvas.width/2){
        if (Math.abs(mouseX-canvas.width/2 - xCount * canvas.height/gridCount) <= handleSize){
          pointSwitch = false;
          pointX = (xCount * canvas.height/gridCount) + canvas.width/2;
        }
        if (xCount * canvas.height/gridCount >= canvas.width){
          pointSwitch = false;
        }
        xCount++;
      } else {
        if (Math.abs((canvas.width/2 - xCount * canvas.height/gridCount) - mouseX) <= handleSize){
          pointSwitch = false;
          pointX = canvas.width/2 - (xCount * canvas.height/gridCount);
        }
        if ((canvas.width/2 - xCount * canvas.height/gridCount) < 0){
          pointSwitch = false;
        }
        xCount++;
      }
    }
    if (pointX != undefined && pointY != undefined){
      candidate.worldX = pointX;
      candidate.worldY = pointY;
    }
  }
  return candidate;
}
var snapString = '';
var oSnap = function(){//to be added
  snapString = '';
  lastPointerX = pointerX;
  lastPointerY = pointerY;
  pointerX = mouseX;
  pointerY = mouseY;
  var pCandidates = [];
  var smallest = handleSize;
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
  if (shape.positions.length === 0){
    return;
  }
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
    ctx.arc(p.worldX, p.worldY, handleSize, 0, 2 * Math.PI);
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

var twoPointLine = function(ax, ay, bx, by, color){
  ctx.beginPath();
  ctx.moveTo(ax, ay);
  ctx.lineTo(bx, by);
  ctx.strokeStyle = color;
  ctx.globalAlpha = 1;
  ctx.lineWidth = 0.5;
  ctx.stroke();
  ctx.closePath();
}
var symmetryShowPointsRender = function(shape){
  if (shape.positions.length === 0){
    return;
  }
  shape.positions.forEach(function(p){
    twoPointLine(xFlip(p.worldX), p.worldY + 2, xFlip(p.worldX), p.worldY + 6, 'white');
    twoPointLine(xFlip(p.worldX), p.worldY - 2, xFlip(p.worldX), p.worldY - 6, 'white');
    twoPointLine(xFlip(p.worldX) + 2, p.worldY, xFlip(p.worldX) + 6, p.worldY, 'white');
    twoPointLine(xFlip(p.worldX) - 2, p.worldY, xFlip(p.worldX) - 6, p.worldY, 'white');
  });
  ctx.beginPath();
  ctx.moveTo(xFlip(shape.positions[0].worldX), shape.positions[0].worldY);
  shape.positions.forEach(function(p){
    ctx.lineTo(xFlip(p.worldX), p.worldY);
  });
  if (shape.type != 'curvedline' || shape.type != 'polyline'){
    ctx.lineTo(xFlip(shape.positions[0].worldX), shape.positions[0].worldY);
  }
  ctx.lineWidth = 0.25;
  ctx.strokeStyle = 'white';
  ctx.globalAlpha = 0.5;
  ctx.stroke();
  ctx.closePath();
  ctx.globalAlpha = 1;
}
var showPointsRender = function(shape){
  if (shape.positions.length === 0){
    return;
  }
  shape.positions.forEach(function(p){
    twoPointLine(p.worldX, p.worldY + 2, p.worldX, p.worldY + 6, 'white');
    twoPointLine(p.worldX, p.worldY - 2, p.worldX, p.worldY - 6, 'white');
    twoPointLine(p.worldX + 2, p.worldY, p.worldX + 6, p.worldY, 'white');
    twoPointLine(p.worldX - 2, p.worldY, p.worldX - 6, p.worldY, 'white');
  });
  ctx.beginPath();
  ctx.moveTo(shape.positions[0].worldX, shape.positions[0].worldY);
  shape.positions.forEach(function(p){
    ctx.lineTo(p.worldX, p.worldY);
  });
  if (shape.type != 'curvedline' || shape.type != 'polyline'){
    ctx.lineTo(shape.positions[0].worldX, shape.positions[0].worldY);
  }
  ctx.lineWidth = 0.25;
  ctx.strokeStyle = 'white';
  ctx.globalAlpha = 0.5;
  ctx.stroke();
  ctx.closePath();
  ctx.globalAlpha = 1;
  if (shape.symmetry === true){
    symmetryShowPointsRender(shape);
  }
}
var renderUI = function(){
  pseudoSprite.shapes.forEach(function(el){
    if (el.showPoints === true){
      showPointsRender(el);
    }
    if (el.editPoints === true){
      switch(el.type){
        case 'polygon':
        case 'polyline':
        case 'circle':
        case 'curvedshape':
        case 'curvedline':
          polyEditPointRender(el, 'gray');
          break;
      }
    }
    if (el.movingPoly === true){
      switch(el.type){
        case 'polygon':
        case 'polyline':
        case 'circle':
        case 'curvedshape':
        case 'curvedline':
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
  if (referenceBool){
    ctx.globalAlpha = 1;
    for (var i = 0; i < 10; i++){
      ctx.beginPath();
      if (i % 2 === 0){
        ctx.strokeStyle = 'white';
      } else {
        ctx.strokeStyle = 'black';
      }
      ctx.arc(referencePoint.x, referencePoint.y, i * 1.5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.closePath();
    }
    ctx.globalAlpha = 1;
  }
}
///////////////////////////////////////////
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
    if (pythagLength(pointerX, pointerY, pseudoSprite.shapes[pointMoveToggles.shapeIndex].positions[i]) <= handleSize){
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
    if (pythagLength(pointerX, pointerY, pseudoSprite.shapes[shapeMoveToggles.shapeIndex].positions[i]) <= handleSize){
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
var convertToCurvedLine = function(i){
  for (var j = 0; j < pseudoSprite.shapes[i].positions.length -1; j+=3){
      console.log(j);
      var firstX, firstY, secondX, secondY;
      var lastPoint = pseudoSprite.shapes[i].positions[j+1];
      var hypot = pythagLength(pseudoSprite.shapes[i].positions[j].worldX, pseudoSprite.shapes[i].positions[j].worldY, lastPoint);
      var rise = Math.abs(pseudoSprite.shapes[i].positions[j].worldY - lastPoint.worldY);
      console.log(lastPoint);
      var run = Math.abs(pseudoSprite.shapes[i].positions[j].worldX - lastPoint.worldX);
      var theta = Math.asin(rise/hypot);
      firstY = ( ((1/3) * hypot ) * Math.sin(theta));
      firstX = ( ((1/3) * hypot ) * Math.cos(theta));
      secondY = ( ((2/3) * hypot ) * Math.sin(theta));
      secondX = ( ((2/3) * hypot ) * Math.cos(theta));
      if (pseudoSprite.shapes[i].positions[j].worldY > lastPoint.worldY){
        firstY = firstY * -1;
        secondY = secondY * -1;
      }
      if (pseudoSprite.shapes[i].positions[j].worldX > lastPoint.worldX){
        firstX = firstX * -1;
        secondX = secondX * -1;
      }
      firstY += pseudoSprite.shapes[i].positions[j].worldY;
      firstX += pseudoSprite.shapes[i].positions[j].worldX;
      secondY += pseudoSprite.shapes[i].positions[j].worldY;
      secondX += pseudoSprite.shapes[i].positions[j].worldX;

      pseudoSprite.shapes[i].positions.splice(j+1, 0, new point(firstX, firstY));
      pseudoSprite.shapes[i].positions.splice(j+2, 0, new point(secondX, secondY));
  }
  pseudoSprite.shapes[i].type = 'curvedline';
}
var convertToCurvedShape = function(i){
  for (var j = 0; j < pseudoSprite.shapes[i].positions.length; j+=3){
      console.log(j);
      var firstX, firstY, secondX, secondY;
      var lastPoint;
      if (j+2 > pseudoSprite.shapes[i].positions.length){
        lastPoint = pseudoSprite.shapes[i].positions[0];
      } else {
        lastPoint = pseudoSprite.shapes[i].positions[j+1];
      }
      var hypot = pythagLength(pseudoSprite.shapes[i].positions[j].worldX, pseudoSprite.shapes[i].positions[j].worldY, lastPoint);
      var rise = Math.abs(pseudoSprite.shapes[i].positions[j].worldY - lastPoint.worldY);
      console.log(lastPoint);
      var run = Math.abs(pseudoSprite.shapes[i].positions[j].worldX - lastPoint.worldX);
      var theta = Math.asin(rise/hypot);
      firstY = ( ((1/3) * hypot ) * Math.sin(theta));
      firstX = ( ((1/3) * hypot ) * Math.cos(theta));
      secondY = ( ((2/3) * hypot ) * Math.sin(theta));
      secondX = ( ((2/3) * hypot ) * Math.cos(theta));
      if (pseudoSprite.shapes[i].positions[j].worldY > lastPoint.worldY){
        firstY = firstY * -1;
        secondY = secondY * -1;
      }
      if (pseudoSprite.shapes[i].positions[j].worldX > lastPoint.worldX){
        firstX = firstX * -1;
        secondX = secondX * -1;
      }
      firstY += pseudoSprite.shapes[i].positions[j].worldY;
      firstX += pseudoSprite.shapes[i].positions[j].worldX;
      secondY += pseudoSprite.shapes[i].positions[j].worldY;
      secondX += pseudoSprite.shapes[i].positions[j].worldX;

      pseudoSprite.shapes[i].positions.splice(j+1, 0, new point(firstX, firstY));
      pseudoSprite.shapes[i].positions.splice(j+2, 0, new point(secondX, secondY));
  }
  if (pseudoSprite.shapes[i].type === 'polygon'){
    pseudoSprite.shapes[i].type = 'curvedshape';
  }
  if (pseudoSprite.shapes[i].type === 'polyline'){
    pseudoSprite.shapes[i].type = 'curvedline';
  }
}
var renderCurveLine = function(shape){
  if (shape.positions.length === 0){
    return;
  }
  ctx.beginPath();
  ctx.moveTo(shape.positions[0].worldX, shape.positions[0].worldY);
  for (var i = 1; i < shape.positions.length; i+=3){
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
  ctx.strokeStyle = colorVariables[shape.colorIndex].color;
  ctx.lineWidth = shape.lineWidth;
  ctx.globalAlpha = shape.alphaLevel;
  ctx.stroke();
  ctx.closePath();
  if (shape.symmetry === true){
    symmetryCurvedLineRender(shape);
  }
  ctx.globalAlpha = 1;
}
var renderCurveShape = function(shape){
  if (shape.positions.length === 0){
    return;
  }
  ctx.beginPath();
  ctx.moveTo(shape.positions[0].worldX, shape.positions[0].worldY);
  for (var i = 1; i < shape.positions.length; i+=3){
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
  if (shape.symmetry === true){
    symmetryCurvedShapeRender(shape);
  }
  ctx.globalAlpha = 1;
}
var renderLine = function(pL){
  if (pL.positions.length === 0){
    return;
  }
  ctx.beginPath();
  ctx.moveTo(pL.positions[0].worldX, pL.positions[0].worldY);
  pL.positions.forEach(function(p){
    ctx.lineTo(p.worldX, p.worldY);
  });
  ctx.strokeStyle = 'black';
  ctx.strokeStyle = colorVariables[pL.colorIndex].color;
  ctx.globalAlpha = pL.alphaLevel;
  ctx.lineWidth = pL.lineWidth;
  ctx.stroke();
  ctx.closePath();
  ctx.globalAlpha = 1;
  if (pL.symmetry === true){
    symmetryPLRender(pL);
  }
}
var renderCircle = function(c){
  if (c.positions[1] === undefined){
    return;
  }
  ctx.globalAlpha = c.alphaLevel;
  ctx.beginPath();
  var radius = pythagLength(c.positions[0].worldX, c.positions[0].worldY, c.positions[1]);
  ctx.arc(c.positions[0].worldX, c.positions[0].worldY, radius, 0, Math.PI * 2);
  if (c.circleFill === false){
    ctx.fillStyle = colorVariables[c.colorIndex].color;
    ctx.fill();
  } else {
    ctx.strokeStyle = colorVariables[c.colorIndex].color;
    ctx.lineWidth = c.lineWidth;
    ctx.stroke();
  }
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
        renderCurveShape(pseudoSprite.shapes[o]);
        break;
      case 'curvedline':
        renderCurveLine(pseudoSprite.shapes[o]);
        break;
    }
  });
}
var activeUpdate = function(){

}
var activeRenderLayer = function(){

}
var updateReferencePoint = function(){
  if (referenceBool){
    if (referencePoint.left){
      referencePoint.x -= 1;
    }
    if (referencePoint.up){
      referencePoint.y -= 1;
    }
    if (referencePoint.right){
      referencePoint.x += 1;
    }
    if (referencePoint.down){
      referencePoint.y += 1;
    }
  }
}
var update = function(){
  activeUpdate();
  updateReferencePoint();
  render();
  renderUI();
}
