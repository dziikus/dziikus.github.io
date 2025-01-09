const historicalEvents = [
    { event: "Columbus discovered Americas", date: "1492" },
    { event: "Declaration of Independence", date: "1776" },
    { event: "First man on the Moon", date: "1969" },
];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}



let currentWordIndex = 0;
let correctCount = 0;
let attemptCount = 0;
let lastIncorrectWord = null;

const progressBar = document.getElementById('progress-bar');
const progressLabel = document.getElementById('progress-label');
const wordInput = document.getElementById('word-input');
const feedbackDiv = document.getElementById('feedback');
const summaryDiv = document.createElement('div');
const okButton = document.getElementById('ok-button');

function updateProgressBar() {
  const progress = (currentWordIndex / historicalEvents.length) * 100;
  progressBar.value = progress;
  progressLabel.textContent = `To translate: ${historicalEvents.length - currentWordIndex}`;
}

function displayNextWord() {
  if (currentWordIndex < historicalEvents.length) {
    wordInput.value = '';
    const nextWord = historicalEvents[currentWordIndex].event;
    wordInput.placeholder = `${nextWord}`;
  } else {
    displaySummary();
  }
}

function displaySummary() {
  feedbackDiv.innerHTML = '<h2>Quiz Complete!</h2>';
}

function handleOkButtonClick() {
  checkTranslationLogic()
}

function checkTranslationLogic(){
  const userTranslation = wordInput.value.trim();
  const currentWord = historicalEvents[currentWordIndex];

if (userTranslation === currentWord.date) {
    feedbackDiv.textContent = `Correct!`;
    correctCount++;
    currentWordIndex++;
  } else {
    feedbackDiv.textContent = `Incorrect. The correct date for "${currentWord.event}" is "${currentWord.date}". You entered "${userTranslation}".`;
  }
  updateProgressBar();
  displayNextWord();

}

function checkTranslation(event) {
  event.preventDefault();
  checkTranslationLogic()
}

okButton.addEventListener('click', handleOkButtonClick);
document.getElementById('translation-form').addEventListener('submit', checkTranslation);

updateProgressBar();
displayNextWord();
