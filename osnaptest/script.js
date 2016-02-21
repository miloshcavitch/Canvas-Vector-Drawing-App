var canvas = document.getElementById('testCanvas');
var ctx = canvas.getContext('2d');


var lineObj = {p1x: 40, p1y: 40, p2x: 300, p2y: 200, slope: (40-200)/(300 - 40)};
var mouseX, mouseY;
var update = function(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var canPos = testCanvas.getBoundingClientRect();
  ctx.beginPath();
  ctx.moveTo(lineObj.p1x, lineObj.p1y);
  ctx.lineTo(lineObj.p2x, lineObj.p2y);
  ctx.strokeStyle = 'red';
  ctx.stroke();
  ctx.closePath();
  $(document).on( "mousemove", function(event) {
    mouseX = event.pageX;
    mouseY = event.pageY;
});
  var triangleObj = {p1x: lineObj.p1x, p1y: lineObj.p1y,
    p2x: mouseX - canPos.left,
    p2y: mouseY - canPos.top
  };
  var oSnapPos = {x: Math.abs(lineObj.slope * triangleObj.p2x), y: triangleObj.p2y};
  console.log(oSnapPos.x)
  ctx.beginPath();
  ctx.arc(oSnapPos.x, oSnapPos.y, 3, 0, Math.PI * 2);
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.closePath();

}

setInterval(update, 10);
