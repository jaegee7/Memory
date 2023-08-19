const gameContainer = document.getElementById("game");
let flippedCards = [];
let matchedCards = 0;
let canClick = false;
let gameStarted = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;

    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

function handleCardClick(event) {
  if (!gameStarted) return;

  if (!canClick) return;

  let currentCard = event.target;

  if (currentCard.classList.contains("flipped") || currentCard.classList.contains("matched")) {
    return;
  }

  flipCard(currentCard);

  flippedCards.push(currentCard);

  if (flippedCards.length === 2) {
    canClick = false;
    setTimeout(checkForMatch, 1000);
  }
}

function flipCard(card) {
  card.style.backgroundColor = card.classList[0];
  card.classList.add("flipped");
}

function unflipCards() {
  flippedCards[0].style.backgroundColor = "";
  flippedCards[1].style.backgroundColor = "";
  flippedCards[0].classList.remove("flipped");
  flippedCards[1].classList.remove("flipped");
  flippedCards = [];
}

function markAsMatched() {
  flippedCards[0].classList.add("matched");
  flippedCards[1].classList.add("matched");
  flippedCards[0].remove();
  flippedCards[1].remove();
  flippedCards = [];
  matchedCards += 2;

  if (matchedCards === COLORS.length) {
    setTimeout(() => {
      alert("Congratulations! You won the game!");
    }, 500);
  }
}

function checkForMatch() {
  let card1 = flippedCards[0];
  let card2 = flippedCards[1];

  if (card1.classList[0] === card2.classList[0]) {
    markAsMatched();
  } else {
    unflipCards();
  }

  canClick = true;
}

function startGame() {
  gameStarted = true;
  canClick = true;
}

function restartGame() {
  gameContainer.innerHTML = "";
  flippedCards = [];
  matchedCards = 0;
  canClick = false;
  gameStarted = false;
  shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
}

document.getElementById("startButton").addEventListener("click", startGame);
document.getElementById("restartButton").addEventListener("click", restartGame);

createDivsForColors(shuffledColors);