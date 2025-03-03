const cards = ['$', '%', '#', '§', '£', '?','¢','!'];
let gameCards = [];
let firstCard, secondCard;
let score = 0;
let timer;
let timeLeft = 60;

const board = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start-button');

startButton.addEventListener('click', startGame);

function startGame() {
    score = 0;
    timeLeft = 60;
    scoreDisplay.textContent = `Pontos: ${score}`;
    timerDisplay.textContent = `Tempo: ${timeLeft}`;
    board.innerHTML = '';
    gameCards = [...cards, ...cards]; // Duplicar cartas
    shuffle(gameCards);
    gameCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.value = card;
        cardElement.addEventListener('click', flipCard);
        board.appendChild(cardElement);
    });
    startTimer();
}

function flipCard() {
    if (firstCard && secondCard) return; // Não permite mais de duas cartas viradas
    if (this === firstCard) return; // Impede clicar na mesma carta duas vezes

    this.classList.add('flipped');
    this.textContent = this.dataset.value;

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        checkMatch();
    }
}

function checkMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        score++;
        scoreDisplay.textContent = `Pontos: ${score}`;
        resetCards();
    } else {
        firstCard.classList.add('error');
        secondCard.classList.add('error');
        setTimeout(() => {
            firstCard.classList.remove('flipped', 'error');
            secondCard.classList.remove('flipped', 'error');
            firstCard.textContent = '';
            secondCard.textContent = '';
            resetCards();
        }, 1000);
    }
}

function resetCards() {
    firstCard = null;
    secondCard = null;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Tempo: ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert('Tempo esgotado!');
        }
    }, 1000);
}
