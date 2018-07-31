window.onload = function() {
    canvas = document.getElementById("snake");
    context = canvas.getContext("2d");
    document.addEventListener("keydown", keyPress)
    setInterval(game, 1000/15);
}

playerX = playerY = 10;
gridSize = 15
tileCount = 28;
foodX = foodY = 15;
xVelocity = yVelocity = 0;
trail = [];
tail = 5;
scoreTitle = document.getElementById("score")
score = 0;
highScoreTitle = document.getElementById("highscore")
highScore = 0;

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
		if(trail[i].x == playerX && trail[i].y == playerY) {
            tail = 5;
            scoreTitle.innerHTML = "Score: " + score;
            if (score > highScore) {
                highScore = score;
                highScoreTitle.innerHTML = "Highscore: " + highScore;
            }
            score = 0;
		}
	}

    trail.push({ x:playerX, y:playerY });
	while(trail.length > tail) {
	    trail.shift();
	}

    if (foodX == playerX && foodY == playerY) {
        tail++;
        score++;
        scoreTitle.innerHTML = "Score: " + score;
        foodX = Math.floor(Math.random() * tileCount);
        foodY = Math.floor(Math.random() * tileCount);
    }

    context.fillStyle = "#ffa20a";
    context.fillRect(foodX * gridSize, foodY * gridSize, gridSize - 2, gridSize - 2);
}

function keyPress(e) {
    switch(e.keyCode) {
        case 37:
            changeDirection("left");
            e.preventDefault();
            break;
        case 38:
            changeDirection("up");
            e.preventDefault();
            break;
        case 39:
            changeDirection("right");
            e.preventDefault();
            break;
        case 40:
            changeDirection("down");
            e.preventDefault();
            break;
    }
}

function changeDirection(direction) {
    switch(direction) {
        case "left":
            if (xVelocity != 1) {
                xVelocity = -1; yVelocity = 0;
            }
            e.preventDefault();
            break;
        case "up":
            if (yVelocity != 1) {
                xVelocity = 0; yVelocity = -1;
            }
            e.preventDefault();
            break;
        case "right":
            if (xVelocity != -1) {
                xVelocity = 1; yVelocity = 0;
            }
            e.preventDefault();
            break;
        case "down":
            if (yVelocity != -1) {
                xVelocity = 0; yVelocity = 1;
            }
            e.preventDefault();
            break;
    }
}