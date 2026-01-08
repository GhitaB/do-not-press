const countdownEl = document.getElementById("countdown");
const tauntEl = document.getElementById("taunt");
const noiseEl = document.getElementById("noise");
const dangerButton = document.getElementById("dangerButton");
const finalMessage = document.getElementById("finalMessage");
const finalTitle = document.getElementById("finalTitle");
const finalBody = document.getElementById("finalBody");

const taunts = [
  "Do not press that button. Seriously.",
  "Hands off. The button bites.",
  "If you press it, a tiny trumpet will boo you.",
  "Stop hovering. It's not a marshmallow.",
  "Your finger is too dramatic for that button.",
  "Are you really going to ruin everything?",
  "This button is a trap. A shiny, shiny trap.",
  "Do not press. This is your final warning. Maybe.",
  "I hid the winning screen. It doesn't exist.",
  "Your future self will be disappointed.",
  "Pretend it's lava. Keep away.",
  "If you press it, a clown gets promoted.",
];

const noiseBursts = [
  "BEEP!", "HONK!", "WHOOOOP!", "ALARM!"];

let timeLeft = 60;
let timerId = null;
let tauntId = null;
let noiseId = null;
let gameOver = false;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function updateCountdown() {
  countdownEl.textContent = String(timeLeft);
}

function showNoise(text) {
  noiseEl.textContent = text;
  noiseEl.style.transform = "scale(1.08)";
  setTimeout(() => {
    noiseEl.style.transform = "scale(1)";
  }, 180);
}

function endGame(title, body) {
  gameOver = true;
  clearInterval(timerId);
  clearInterval(tauntId);
  clearInterval(noiseId);
  dangerButton.disabled = true;

  finalTitle.textContent = title;
  finalBody.textContent = body;
  finalMessage.hidden = false;
}

function startGame() {
  gameOver = false;
  timeLeft = 60;
  updateCountdown();
  finalMessage.hidden = true;
  dangerButton.disabled = false;

  tauntEl.textContent = pickRandom(taunts);
  noiseEl.textContent = "";

  timerId = setInterval(() => {
    if (gameOver) return;
    timeLeft -= 1;
    updateCountdown();

    if (timeLeft <= 0) {
      endGame(
        "Time is up. You lose.",
        "Surprise! The button won either way. Thanks for playing."
      );
    }
  }, 1000);

  tauntId = setInterval(() => {
    if (!gameOver) {
      tauntEl.textContent = pickRandom(taunts);
    }
  }, 2300);

  noiseId = setInterval(() => {
    if (!gameOver) {
      showNoise(pickRandom(noiseBursts));
    }
  }, 1400);
}

dangerButton.addEventListener("click", () => {
  if (gameOver) return;
  endGame(
    "You pressed it. You lose.",
    "The button smirks. Confetti for your defeat."
  );
});

startGame();
