// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // Default enemy instance location
    this.x = x;
    this.y = y;

    // Default enemy instance moving speed
    this.speed = Math.floor((Math.random() + 2) * 100);

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // Create continuous enemy traffic
    // by setting enemy boundaries
    if (this.x > 500) {
        this.x -= 500;
    }

    // Call the detection collision function
    this.checkCollision(player);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Assign a detection collision function to Enemy,
// passing player as the parameter. 
Enemy.prototype.checkCollision = function(player) {
    
    // Considering player and enemies as rectangles with a min(x,y) 
    // and a max(x,y) each, the following checks are made for collision:
    if (player.x < this.x + 75 &&
        player.x + 65 > this.x &&
        player.y < this.y + 50 &&
        player.y + 70 > this.y) {
            // Player's position is reset
            player.x = 200;
            player.y = 400;
            // Decrease player's score by 1
            score--;
            // Update score
            document.getElementById('score').innerHTML = "Score: " + score;
            // Check if player won or lost
            setTimeout(playerScore, 100);
    }
};

// Create enemy instances from the Enemy class
var enemy1 = new Enemy(20, 60);
var enemy2 = new Enemy(0, 143);
var enemy3 = new Enemy(0, 228);
var enemy4 = new Enemy(0, 60);
var enemy5 = new Enemy(0, 228);
var enemy6 = new Enemy(-20, 60);

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
    // Fill in default player instance location info
    this.x = x;
    this.y = y;
    // The image for our player
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
    // Smooth animation across different computers
    this.x * (dt);
    this.y * (dt);

    // Player boundaries on x axis
    if (this.x < 100) {
        this.x = 0;
    } else if (this.x > 400) {
        this.x = 400;
    }

    // Player boundaries on y axis
    if (this.y < 40) {
        // Freeze the game when player reaches the sea
        this.x = 200;
        this.y = 400;
        // Increase player's score by 1
        score++;
        // Update score
        document.getElementById('score').innerHTML = "Score: " + score;
        // Check if player won or lost
        setTimeout(playerScore, 100);
    } else if (this.y > 400) {
        this.y = 400;
    }
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// A function to handle user's input
Player.prototype.handleInput = function(key) {
    if (key === 'left') {
        this.x -= 100;
    } else if (key === 'right') {
        this.x += 100;
    } else if (key === 'up') {
        this.y -= 85;
    } else {
        this.y += 85;
    }
};

// Create a Player instance
var player1 = new Player(200, 400);

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];

// Place the player object in a variable called player
var player = player1;

// PLayer has zero score at the beginning of the game
var score = 0;

// Create a function that checks player's lscore and decides
// whether they are winner or not
function playerScore() {
    if (score === 3) {
        // Display winning message
        alert("YOU WON, CONGRATULATIONS!");
        // Reload game
        document.location.reload(true);
    } else if (score === -3) {
        // Display losing message
        alert("YOU LOST. TRY AGAIN!");
        // Reload game
        document.location.reload(true);
    }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});