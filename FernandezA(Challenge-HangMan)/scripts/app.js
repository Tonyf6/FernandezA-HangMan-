
//List of words being used for the user to guess
const words = ["hangman", "javascript", "apple", "iphone", "visionpro", "codestack"];
let selectedWord;
let guessedLetters = [];
let attemptsLeft = 6;
//Sequence of which the hangman parts are displayed during the game
const hangmanParts = [
    "start",
    "head",
    "body",
    "left-arm",
    "right-arm",
    "left-leg",
    "right-leg"
];

let currentHangmanPart = 0;
//This is what is actioned when the user starts the game
function startGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    attemptsLeft = 6;
    currentHangmanPart = 0;
    createKeypad();
    updateDisplay();
    updateHangmanDisplay();
}
//My favorite part! :D, the keypad and how it is generating a button for each letter
function createKeypad() {
    const keypadContainer = document.getElementById("keypad");
    keypadContainer.innerHTML = "";

    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i).toLowerCase();
        const button = document.createElement("button");
        button.textContent = letter;
        button.addEventListener("click", function () {
            handleKeyPress(letter, button);
        });
        keypadContainer.appendChild(button);
    }
}
//this function is checking for attempts remaining and counting down. while also adding the next hangman figure part
function handleKeyPress(pressedKey, button) {
    if (attemptsLeft > 0 && !guessedLetters.includes(pressedKey)) {
        guessedLetters.push(pressedKey);

        if (!selectedWord.includes(pressedKey)) {
            attemptsLeft--;
            currentHangmanPart++;
        }
        // Disables the button and grays out button
        button.disabled = true; 
        button.style.backgroundColor = "#ddd";

        //Delays updating the display and hangman figure for its attempts/letters to display properly
        setTimeout(() => {
            updateDisplay();
            updateHangmanDisplay();
        }, 0);
    }
}
//This updates the display entirely, making sure the guesses, letters, and some coloring are correct while playing
function updateDisplay() {
    const wordContainer = document.getElementById("word-container");
    const guessesContainer = document.getElementById("guesses-container");
    //this splits up the word into an array, checks whether the user has guessed the letters, and finally brings back the word into a string. User will be able to see how the word updates, if letters are guessed correctly.
    wordContainer.innerHTML = selectedWord
        .split("")
        .map(letter => (guessedLetters.includes(letter) ? letter : "_"))
        .join(" ");

        guessesContainer.innerHTML = `Incorrect Guesses: <span style="color: red;">${currentHangmanPart}/6</span>`;

    //Checks if the game is over
    if (currentHangmanPart === 6) {
        wordContainer.innerHTML = `Game Over. The word was: ${selectedWord}`;
    } else if (!wordContainer.innerHTML.includes("_")) {
        wordContainer.innerHTML = `Congratulations! You guessed the word: ${selectedWord}`;
    }
}
//This updates the Hangman figure which looks into my media folder and displays the correct figure
function updateHangmanDisplay() {
    const hangmanDisplay = document.getElementById("hangman-display");
    hangmanDisplay.innerHTML = `<img src="media/hangman-parts/${hangmanParts[currentHangmanPart]}.svg" alt="Hangman">`;
}
//This is looking out for any attemps that are remaining, as well as keys/letters being pressed down and that have not been guessed yet
document.addEventListener("keydown", function (event) {
    if (attemptsLeft > 0) {
        const pressedKey = event.key.toLowerCase();
        const button = document.querySelector(`button:contains('${pressedKey}')`);

        if (/^[a-z]$/.test(pressedKey) && !guessedLetters.includes(pressedKey) && button) {
            handleKeyPress(pressedKey, button);
        }
    }
});