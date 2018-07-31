window.onload = function() {
    canvas = document.getElementById("snake");
    context = canvas.getContext("2d");
    document.addEventListener("keydown", keyPress)
    setInterval(game, 1000/15);
}

playerX = playerY = 10;
gridSize = 15
tileCount = 32;
foodX = foodY = 15;
xVelocity = yVelocity = 0;
trail = [];
tail = 5;

function game() {

    playerX += xVelocity;
    playerY += yVelocity;

    if(playerX < 0) {
        playerX = tileCount - 1;
    }

    if(playerX > tileCount - 1) {
        playerX = 0;
    }

    if(playerY < 0) {
        playerY = tileCount - 1;
    }

    if(playerY > tileCount - 1) {
        playerY = 0;
    }

    context.fillStyle = "#0d1433";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "#ffffff";
    for( var i=0; i<trail.length; i++ ) {
		context.fillRect(trail[i].x*gridSize,trail[i].y*gridSize,gridSize-2,gridSize-2);
		if(trail[i].x==playerX && trail[i].y==playerY) {
			tail = 5;
		}
	}

    trail.push({ x:playerX, y:playerY });
	while(trail.length > tail) {
	    trail.shift();
	}

    if (foodX == playerX && foodY == playerY) {
        tail++;
        foodX = Math.floor(Math.random() * tileCount);
        foodY = Math.floor(Math.random() * tileCount);
    }

    context.fillStyle = "#ffa20a";
    context.fillRect(foodX * gridSize, foodY * gridSize, gridSize - 2, gridSize - 2);
}

function keyPress(evt) {
    switch(evt.keyCode) {
        case 37:
            xVelocity = -1; yVelocity = 0;
            break;
        case 38:
            xVelocity = 0; yVelocity = -1;
            break;
        case 39:
            xVelocity = 1; yVelocity = 0;
            break;
        case 40:
            xVelocity = 0; yVelocity = 1;
            break;
    }
}