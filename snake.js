var xPos;//10
var yPos;//10
var foodX;//15
var foodY;//15
var gridSize;//20 
var tileCount;//20
var xSpeed;//0 
var ySpeed;//0
var trail = [];//[]
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
	tail = 5;
	while(trail.length > tail){
		trail.shift();
	}
	for(var i = 0; i < trail.length; i++){
		trail[i].x = xPos;
		trail[i].y = yPos;
	}
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
  
  spawnFood();
	
}

function spawnFood(){
	if (foodX == xPos && foodY == yPos){
      tail++;
      var foodLocation = findEmptyCell();
	  foodX = foodLocation[0];
	  foodY = foodLocation[1];
	}
  
	ctx.fillStyle = "red";
	ctx.fillRect (foodX*gridSize, foodY*gridSize,gridSize -2, gridSize -2);
}

function findEmptyCell(){
	var isEmpty = false;
	var x;
	var y;
	while(!isEmpty){
		x = Math.floor(Math.random()*tileCount);
		y = Math.floor(Math.random()*tileCount);
		for(var i = 0; i < trail.length; i++){
			if (!(trail[i].x == x && trail[i].y == y)){
				isEmpty = true;
			}
		}
	}
	var coord = [x, y];
	return coord;
}

function keyPush(event){
	switch(event.keyCode){
		case 37://left
			if(!(trail[trail.length - 2].x < trail[trail.length - 1].x)){
				xSpeed = -1;
				ySpeed = 0;
			}		
		break;
		case 38://up
			if(!(trail[trail.length - 2].y < trail[trail.length - 1].y)){
				xSpeed = 0;
				ySpeed = -1;
			}
		break;
		case 39://right
			if(!(trail[trail.length - 2].x > trail[trail.length - 1].x)){
				xSpeed = 1;
				ySpeed = 0;
			}
		break;
		case 40://down
			if(!(trail[trail.length - 2].y > trail[trail.length - 1].y)){
				xSpeed = 0;
				ySpeed = 1;
			}
		break;
  }
}