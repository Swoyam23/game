const snitch = document.getElementById('snitch');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');
const startBtn = document.getElementById('start-btn');
const gameArea = document.getElementById('gameArea');

let score = 0;
let timeLeft = 30;
let gameInterval;
let timerInterval;
let isGameActive = false;

function moveSnitch() {
  if (!isGameActive) return;
  
  const gameRect = gameArea.getBoundingClientRect();
  const maxX = gameRect.width - 50;
  const maxY = gameRect.height - 50;
  
  const x = Math.random() * maxX;
  const y = Math.random() * maxY;
  
  snitch.style.left = `${x}px`;
  snitch.style.top = `${y}px`;
}

function startGame() {
  if (isGameActive) return;
  
  // Reset game state
  isGameActive = true;
  score = 0;
  timeLeft = 30;
  snitch.style.display = 'block';
  startBtn.disabled = true;
  
  // Initial position
  moveSnitch();

  // Update displays
  scoreDisplay.textContent = `Snitches Caught: ${score}`;
  timerDisplay.textContent = `Time Left: ${timeLeft}s`;

  // Clear previous intervals
  clearInterval(gameInterval);
  clearInterval(timerInterval);

  // Game loop
  gameInterval = setInterval(moveSnitch, 800);
  
  // Timer
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      isGameActive = false;
      clearInterval(gameInterval);
      clearInterval(timerInterval);
      snitch.style.display = 'none';
      startBtn.disabled = false;
      alert(`Game Over! You caught ${score} Golden Snitches!`);
    }
  }, 1000);
}

snitch.addEventListener('click', () => {
  if (isGameActive) {
    score++;
    scoreDisplay.textContent = `Snitches Caught: ${score}`;
    moveSnitch();
  }
});

startBtn.addEventListener('click', startGame);
