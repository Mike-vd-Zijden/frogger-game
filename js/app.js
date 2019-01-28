const modal = document.getElementById('victoryModal');
const columnWidth = 100;
const rowHeight = 83;

let playable = true;

// Enemies our player must avoid
var Enemy = function () {
    this.resetEnemy();
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x >= 500) {
        this.resetEnemy();
    }
    else {
        this.x += dt * this.speed;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.resetEnemy = function () {
    this.y = 68 + 83 * (Math.floor(Math.random() * 3));
    this.x = -150 * (1 + Math.random());
    this.speed = 250 + Math.random() * 200;
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.resetPlayer();
};

Player.prototype.update = function (dt) {
    allEnemies.forEach(function (enemy) {
        if (
            enemy.y === player.y &&
            Math.abs(enemy.x - player.x) < 53
        ) {
            player.resetPlayer();
        }
    });

    if (this.y < 0) {
        playable = false;
        modal.style.display = "block";
    }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.resetPlayer = function () {
    this.x = 200;
    this.y = 400;
};


Player.prototype.handleInput = function (keyCode) {
    if (playable) {
        switch (keyCode) {
            case 'left':
                if (this.x - columnWidth >= 0) this.x -= columnWidth;
                break;
            case 'right':
                if (this.x + columnWidth < 500) this.x += columnWidth;
                break;
            case 'up':
                if (this.y - rowHeight >= -20) this.y -= rowHeight;
                break;
            case 'down':
                if (this.y + rowHeight <= 400) this.y += rowHeight;
                break;
        }
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var numberOfEnemies = 5;
for (var enemies = 0; enemies < numberOfEnemies; enemies++) {
    allEnemies.push(new Enemy());
}

const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Closes victory modal and resets game
function victoryReset() {
    modal.style.display = "none";
    playable = true;
    player.resetPlayer();
}
