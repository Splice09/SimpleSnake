window.onload = function(){
  canvas = document.getElementById("gc");
  ctx = canvas.getContext("2d");
  document.addEventListener("keydown", keyPush);
  setInterval(game,1000/15);
}

xPos = yPos = 10;
foodX = foodY = 15;
gridSize = tileCount = 20;
xSpeed = ySpeed = 0;
trail = [];
tail = 5;

function game(){

  xPos += xSpeed;
  yPos += ySpeed;
  if(xPos < 0){
    xPos = tileCount - 1;
  }
  if(xPos > tileCount - 1){
    xPos = 0;
  }
  if(yPos < 0){
    yPos = tileCount - 1;
  }
  if(yPos > tileCount - 1){
    yPos = 0;
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
    case 37:
      xSpeed = -1;ySpeed = 0;
      break;
     case 38:
      xSpeed = 0;ySpeed = -1;
      break;
      case 39:
      xSpeed = 1;ySpeed = 0;
      break;
      case 40:
      xSpeed = 0;ySpeed = 1;
      break;
                      }
}