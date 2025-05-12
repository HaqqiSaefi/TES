const canvas = document.getElementById("loveCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];

function randomColor() {
  return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
}

function createHeart() {
  return {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: Math.random() * 5 + 2,
    speedX: (Math.random() - 0.5) * 5,
    speedY: (Math.random() - 0.5) * 5,
    color: randomColor(),
  };
}

function drawHeart(x, y, size, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size / 10, size / 10);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(0, -3, -5, -3, -5, 0);
  ctx.bezierCurveTo(-5, 3, 0, 5, 0, 8);
  ctx.bezierCurveTo(0, 5, 5, 3, 5, 0);
  ctx.bezierCurveTo(5, -3, 0, -3, 0, 0);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < hearts.length; i++) {
    let h = hearts[i];
    drawHeart(h.x, h.y, h.size, h.color);
    h.x += h.speedX;
    h.y += h.speedY;
    h.size *= 0.98;

    if (h.size < 0.5) {
      hearts.splice(i, 1);
      i--;
    }
  }

  requestAnimationFrame(animate);
}

setInterval(() => {
  for (let i = 0; i < 5; i++) {
    hearts.push(createHeart());
  }
}, 100);

animate();
