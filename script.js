const doraemon = document.getElementById("doraemon");
const game = document.getElementById("game");
const scoreDisplay = document.getElementById("score");

let doraemonTop = 250;
let gravity = 1.2;
let velocity = 0;
let isGameOver = false;
let score = 0;
let gameStarted = false;



document.addEventListener("keydown", () => {
  if (!isGameOver) {
    if (!gameStarted) {
      gameStarted = true;
      gameLoop();
      startPipes();
    }
    velocity = -10

  }
});

const selectedChar = localStorage.getItem("doraemon");

const characterImages = {
  "doraemon-c": "img/dor2.png",
  "poodup": "img/pooh.png",
  "pookie":"img/kitty2.png",
  "gogo":"img/nemu.png"
};

if (selectedChar && characterImages[selectedChar]) {
  doraemon.style.backgroundImage = `url(${characterImages[selectedChar]})`;
  doraemon.style.width = "120px";
  doraemon.style.height = "120px";

} else {
  doraemon.style.backgroundImage = `url(img/dor2.png)`;
}



function createPipe() {
  const pipeTop = document.createElement("div");
  const pipeBottom = document.createElement("div");
  const gap = 340;
  const topHeight = Math.floor(Math.random() * 200) + 50;
  const bottomHeight = 600 - topHeight - gap;

  pipeTop.classList.add("pipe");
  pipeBottom.classList.add("pipe");

  pipeTop.style.height = `${topHeight}px`;
  pipeTop.style.top = "0px";
  pipeTop.style.left = "400px";

  pipeBottom.style.height = `${bottomHeight}px`;
  pipeBottom.style.bottom = "0px";
  pipeBottom.style.left = "400px";

  game.appendChild(pipeTop);
  game.appendChild(pipeBottom);

  let pipeLeft = 400;

  const movePipe = setInterval(() => {
    if (isGameOver) {
      clearInterval(movePipe);
      return;
    }

    pipeLeft -= 2;
    pipeTop.style.left = `${pipeLeft}px`;
    pipeBottom.style.left = `${pipeLeft}px`;

  
    const doraemonRect = doraemon.getBoundingClientRect();
    const topRect = pipeTop.getBoundingClientRect();
    const bottomRect = pipeBottom.getBoundingClientRect();

    if (
      pipeLeft < 80 && pipeLeft > 20 &&
      (doraemonRect.top < topRect.bottom || doraemonRect.bottom > bottomRect.top)
    ) {
      gameOver();
    }

    if (pipeLeft + 60 < 50 && !pipeTop.passed) {
      score++;
      scoreDisplay.innerText = score;
      pipeTop.passed = true;
    }

    if (pipeLeft < -60) {
      pipeTop.remove();
      pipeBottom.remove();
      clearInterval(movePipe);
    }
  }, 20);
}

function gameLoop() {
  if (isGameOver) return;

  velocity += gravity;
  doraemonTop += velocity;
  doraemon.style.top = `${doraemonTop}px`;

  if (doraemonTop > 570 || doraemonTop < 0) {
    gameOver();
    return;
  }

  requestAnimationFrame(gameLoop);
}

function startPipes() {
  if (isGameOver) return;
  createPipe();
  setTimeout(startPipes, 2000);
}

function gameOver() {
  if (isGameOver) return;
  isGameOver = true;
  alert("Game Over! Your score: " + score);
  location.reload();
}
