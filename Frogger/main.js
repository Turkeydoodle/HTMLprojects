const c = document.getElementById('canvas');
const context = c.getContext('2d');
const counterd = document.getElementById('counterd');
c.width = 500;
c.height = 500;
let health = 3;
let hasbeentouched = [];
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
let canmove = true;
let boxes = [];
let isRunning = true;
function drawbackground() {
    context.fillStyle = 'green'
    context.fillRect(0, 480, 500, 20)
    context.fillRect(0, 0, 500, 20)
}
drawbackground()
function drawbox(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x, y, 10, 10);
}
function move(box) {
    box.x += 3;
}
const blockSize = 20;
let player = {
    x: c.width / 2 - 10,
    y: 480,
    width: 20,
    height: 20,
    color: 'black',
    speed: 5,
    draw: function() {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
};
function createBox(){
    const minInclusive = 1;
    const maxInclusive = 22;
    const randomNumber = Math.floor(Math.random() * (maxInclusive - minInclusive + 1));
    const randomColorIndex = Math.floor(Math.random() * colors.length);
    let newBox = {
        x: -10,
        y: 30+ 20 *randomNumber,
        width: 10,
        height: 10,
        color: colors[randomColorIndex],
        draw: function() {
            drawbox(this.x, this.y, this.color);
        }
    };
    boxes.push(newBox);
}
let keys = {};
document.addEventListener('keydown', function(e) {
    keys[e.key] = true;
});
document.addEventListener('keyup', function(e) {
    keys[e.key] = false;
});
const framerate = 10;
let counter = 0;
function collision(player, box) {
    if (player.x + player.width < box.x) {
        return false;
    }
    if (player.x > box.x + box.width) {
        return false;
    }
    if (player.y + player.height < box.y) {
        return false;
    }
    if (player.y > box.y + box.height) {
        return false;
    }
    return true;
}
function stopGame() {
    if (health <= 0){
        isRunning = false;
        if (counterd) {
            counterd.innerHTML = "Game Over";
        }
    }
}
function update() {
    if (!isRunning) return;
    context.clearRect(0, 0, c.width, c.height);
    drawbackground();
    for (let i = 0; i < boxes.length; i++) {
        move(boxes[i]);
        boxes[i].draw();
        if (collision(player, boxes[i])) {
            if (!hasbeentouched.includes(boxes[i])){
                health -= 1;
                health = Math.max(0, health);
                if (counterd) {
                    counterd.innerHTML = health;
                }
                hasbeentouched.push(boxes[i]);
            }
            stopGame();
            player.color = 'yellow';
        } else {
             if (player.color !== 'red') {
                player.color = 'black';
             }
        }
        if (boxes[i].x > c.width) {
            boxes.splice(i, 1);
            i--;
        }
    }
    let intendedX = player.x;
    let intendedY = player.y;
    if (canmove) {
        if (keys['ArrowLeft'] || keys['a']) {
            intendedX -= blockSize;
            canmove = false;
        } else if (keys['ArrowRight'] || keys['d']) {
            intendedX += blockSize;
            canmove = false;
        } else if (keys['ArrowUp'] || keys['w']) {
            intendedY -= blockSize;
            canmove = false;
        } else if (keys['ArrowDown'] || keys['s']) {
            intendedY += blockSize;
            canmove = false;
        }
    }
    intendedX = Math.max(0, Math.min(intendedX, c.width - player.width));
    intendedY = Math.max(0, Math.min(intendedY, c.height - player.height));
    player.x = intendedX;
    player.y = intendedY;
    player.draw();
    counter++;
    if (counter >= framerate){
        createBox();
        counter = 0;
    }
    if (player.y == 0 && isRunning){
        player.color = 'red'
        isRunning = false;
        if (counterd) {
            counterd.innerHTML = "You Won!";
        }
        return;
    }
    requestAnimationFrame(update);
}
document.addEventListener('keyup', function(e) {
    canmove = true;
});
isRunning = true;
update();