var xPos;//10
var yPos;//10
var foodX;//15
var foodY;//15
var gridSize;//20 
var tileCount;//20
var xSpeed;//0 
var ySpeed;//0
var trail;//[]
var tail;//5


window.onload = function(){
  canvas = document.getElementById("gc");
  ctx = canvas.getContext("2d");
  document.addEventListener("keydown", keyPush);
  initialize();
  setInterval(game,1000/15);
}

function initialize(){
	xPos = yPos = 10;
	foodX = foodY = 15;
	gridSize = tileCount = 20;
	xSpeed = ySpeed = 0;
	trail = [];
	tail = 5;
}

function game(){
  xPos += xSpeed;
  yPos += ySpeed;
  if(xPos < 0){
    initialize();
  }
  if(xPos > tileCount - 1){
    initialize();
  }
  if(yPos < 0){
    initialize();
  }
  if(yPos > tileCount - 1){
    initialize();
  }
  ctx.fillStyle = "black";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  
  ctx.fillStyle = "lime";
  for (var i = 0; i < trail.length; i++){
    ctx.fillRect (trail[i].x*gridSize, trail[i].y*gridSize,gridSize -2, gridSize -2);
    if (trail[i].x == xPos && trail[i].y == yPos){
      tail = 5;
    }
  }
  
  trail.push({x:xPos, y:yPos});
  while(trail.length>tail){
    trail.shift();
  }
  
  if (foodX == xPos && foodY == yPos){
      tail++;
      foodX = Math.floor(Math.random()*tileCount);
      foodY = Math.floor(Math.random()*tileCount);
  }
  
  ctx.fillStyle = "red";
  ctx.fillRect (foodX*gridSize, foodY*gridSize,gridSize -2, gridSize -2);
  
}
function keyPush(event){
  switch(event.keyCode){
    case 37://left
      xSpeed = -1;ySpeed = 0;
      break;
     case 38://up
      xSpeed = 0;ySpeed = -1;
      break;
      case 39://right
      xSpeed = 1;ySpeed = 0;
      break;
      case 40://down
      xSpeed = 0;ySpeed = 1;
      break;
  }
}