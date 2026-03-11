const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");

let score = 0;
let gameSpeed = 3;
let isGameOver = false;

// Character Object
const jaggu = {
    x: 50,
    y: 170,
    width: 40,
    height: 40,
    color: "#ff85a2",
    dy: 0,
    jumpForce: 12,
    gravity: 0.6,
    grounded: false
};

// Obstacle Object
const obstacle = {
    x: 550,
    y: 180,
    width: 30,
    height: 30,
    color: "#ffdae0"
};

function drawJaggu() {
    // Draw a cute rounded square for Jaggu
    ctx.fillStyle = jaggu.color;
    ctx.beginPath();
    ctx.roundRect(jaggu.x, jaggu.y, jaggu.width, jaggu.height, 10);
    ctx.fill();
    // Eyes
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(jaggu.x + 30, jaggu.y + 15, 4, 0, Math.PI * 2);
    ctx.fill();
}

function drawObstacle() {
    ctx.fillStyle = "#ffb6c1";
    ctx.beginPath();
    // Draw a little "cake" or triangle
    ctx.moveTo(obstacle.x, obstacle.y + obstacle.height);
    ctx.lineTo(obstacle.x + obstacle.width / 2, obstacle.y);
    ctx.lineTo(obstacle.x + obstacle.width, obstacle.y + obstacle.height);
    ctx.fill();
}

function update() {
    if (isGameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Gravity and Physics
    jaggu.dy += jaggu.gravity;
    jaggu.y += jaggu.dy;

    if (jaggu.y + jaggu.height > 210) {
        jaggu.y = 210 - jaggu.height;
        jaggu.dy = 0;
        jaggu.grounded = true;
    }

    // Move Obstacle
    obstacle.x -= gameSpeed;
    if (obstacle.x < -obstacle.width) {
        obstacle.x = 550;
        score++;
        scoreElement.innerHTML = score;
        
        // Win Condition
        if (score === 10) {
            victory();
        }
    }

    // Collision Detection
    if (
        jaggu.x < obstacle.x + obstacle.width &&
        jaggu.x + jaggu.width > obstacle.x &&
        jaggu.y < obstacle.y + obstacle.height &&
        jaggu.y + jaggu.height > obstacle.y
    ) {
        gameOver();
    }

    drawJaggu();
    drawObstacle();
    requestAnimationFrame(update);
}

function jump() {
    if (jaggu.grounded && !isGameOver) {
        jaggu.dy = -jaggu.jumpForce;
        jaggu.grounded = false;
    }
    if (isGameOver) {
        location.reload(); // Restart on tap if dead
    }
}

function gameOver() {
    isGameOver = true;
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ff4e8a";
    ctx.font = "30px Pangolin";
    ctx.fillText("Oops! Try Again? 🎀", 130, 110);
}

function victory() {
    isGameOver = true;
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ff4e8a";
    ctx.font = "30px Pangolin";
    ctx.fillText("Yay! 10 Points! 🎉", 140, 110);
    ctx.font = "20px Pangolin";
    ctx.fillText("Happy Birthday Jaggu! 🎂", 145, 140);
}

// Controls
window.addEventListener("keydown", (e) => { if (e.code === "Space") jump(); });
canvas.addEventListener("touchstart", (e) => { e.preventDefault(); jump(); });
canvas.addEventListener("mousedown", jump);

update();
