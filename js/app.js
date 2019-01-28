const modal = document.getElementById('victoryModal');
const columnWidth = 100;
const rowHeight = 83;
const numberOfEnemies = 6;

let allEnemies = [];
let playable = true;

// Class for the construction of Enemy object
class Enemy {
    constructor() {
        this.sprite = 'images/enemy-bug.png';
        this.resetEnemy();
    }

    update(dt) {
        if (this.x >= 500) {
            this.resetEnemy();
        }
        else {
            this.x += dt * this.speed;
        }
    }
    resetEnemy() {
        this.y = 68 + 83 * (Math.floor(Math.random() * 3));
        this.x = -150 * (1 + Math.random());
        this.speed = 250 + Math.random() * 200;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Class for the construction of Player object
class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.resetPlayer();
    }

    update(dt) {
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
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    }

    resetPlayer() {
        this.x = 200;
        this.y = 400;
    }

    handleInput(keyCode) {
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
    }
}

for (let enemies = 0; enemies < numberOfEnemies; enemies++) {
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
