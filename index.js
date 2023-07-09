const guessInput = document.getElementById("guess");
const submitButton = document.getElementById("submit");
const resetButton = document.getElementById("reset");
const messages = document.getElementsByClassName("message");
const tooHighMessage = document.getElementById("too-high");
const tooLowMessage = document.getElementById("too-low");
const maxGuessesMessage = document.getElementById("max-guesses");
const numberOfGuessesMessage = document.getElementById("number-of-guesses");
// #6 - I change from num-of-- to number-of-guesses to show the info properly
const correctMessage = document.getElementById("correct");

let targetNumber;
let attempts = 0; // # 5 - It was a const but I changed to let to store the 
                 // value and counts the attemps
let maxNumberOfAttempts = 5; // # 3 - it was a const but I changed to let
                            // to fix the error that used to be on the line 78

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);
  attempts = attempts + 1;

  hideAllMessages();

  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = "";
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;

    correctMessage.style.display = "";

    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  if (guess !== targetNumber) {
    if (guess < targetNumber) {
      tooLowMessage.style.display = "";
    } else {
      tooHighMessage.style.display = ""; 
      // # 7 - I need to show the TOO HIGH message
    }

    const remainingAttempts = maxNumberOfAttempts - attempts;

    numberOfGuessesMessage.style.display = ""; 
    // # 6 - The error was on the line 8, not here.
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;
  }

  if (attempts === maxNumberOfAttempts) {
    // #1 - I HAD on = extra here
    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  guessInput.value = "";

  resetButton.style.display = "";
}

function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    messages[elementIndex].style.display = "none"; 
     // # 4 - show me an error here....
  } // changed the elementIndex <= messa---- to  elementIndex < message....
}  // The problem was the lenght of the array..

function setup() {
  // #2 - it said "funtion" instead of "function"
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  maxNumberOfAttempts = 5; 
  // # 3 it show me the error here, but the problem is that
  // maxNum.... is a const, so I changed it to a let in line 13
  // #7 change the 0 to 5, because the remaining attempts were negative
  // Enable the input and submit button
  submitButton.disabeld = false;
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = "none";

  /*** # 8 - Code that resets the initial values ***/

  attempts = 0;
  guessInput.value = "";
  guessInput.disabled = false;
  submitButton.disabled = false;
}

submitButton.addEventListener("click", checkGuess);
resetButton.addEventListener("click", setup);

setup();
