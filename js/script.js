const totalCards = 13;
const cardContainer = document.getElementById('card-container');
const sumSection = document.getElementById('sum-section');
const restartButton = document.getElementById('restart-button');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');
const popupButton = document.getElementById('popup-button');
const rulesModal = document.getElementById('rules-modal');
const startGameButton = document.getElementById('start-game-button');
const usernameModal = document.getElementById('username-modal');
const usernameInput = document.getElementById('username-input');
const submitUsernameButton = document.getElementById('submit-username-button');
const welcomeSection = document.getElementById('welcome-section');

let currentSum = 0;
let gameOver = false;
let userName = '';

function resetGame() {
    currentSum = 0;
    gameOver = false;
    sumSection.textContent = 'Sum: 0';
    restartButton.style.display = 'none';
    cardContainer.innerHTML = ''; // Clear the existing cards
    popup.style.display = 'none'; // Hide popup if visible
    initializeGame(); // Reinitialize the game with a new shuffle
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function initializeGame() {
    const cardNumbers = Array.from({ length: totalCards }, (_, i) => i + 1);
    shuffleArray(cardNumbers); // Shuffle the card numbers

    cardNumbers.forEach(number => {
        const card = document.createElement('div');
        card.className = 'card';

        const cardInner = document.createElement('div');
        cardInner.className = 'card-inner';

        const cardFront = document.createElement('div');
        cardFront.className = 'card-front';

        const cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.style.backgroundImage = `url('cards/${number}.jpg')`;

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        cardContainer.appendChild(card);

        card.addEventListener('click', function() {
            if (!gameOver) {
                card.classList.add('flipped');
                card.style.pointerEvents = 'none'; // Disable clicking on this card again

                currentSum += number;
                sumSection.textContent = `Sum: ${currentSum}`;

                if (currentSum === 21) {
                    showPopup(`Blackjack! You win! ${userName}, 🎉🎉 Congratulations 🎉🎉`);
                    gameOver = true;
                    restartButton.style.display = 'block';
                } else if (currentSum > 21) {
                    showPopup(`Bust! You lost😟 ${userName}. Don’t give up! Try again and improve your strategy.`);
                    gameOver = true;
                    restartButton.style.display = 'block';
                }
            }
        });
    });
}

function showPopup(message) {
    popupMessage.textContent = message;
    popup.style.display = 'block';
}

popupButton.addEventListener('click', () => {
    popup.style.display = 'none';
});

restartButton.addEventListener('click', resetGame);

startGameButton.addEventListener('click', () => {
    rulesModal.style.display = 'none';
    initializeGame();
});

submitUsernameButton.addEventListener('click', () => {
    userName = usernameInput.value.trim();
    if (userName) {
        welcomeSection.textContent = `Welcome, ${userName}`;
        usernameModal.style.display = 'none';
        rulesModal.style.display = 'block'; // Show the rules modal after username input
    } else {
        alert('Please enter a valid name.');
    }
});

// Show the username modal when the page loads
window.onload = function() {
    usernameModal.style.display = 'block';
};