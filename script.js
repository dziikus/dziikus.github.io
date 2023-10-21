const wordsToTranslate = [
{ german: 'die Hausaufgaben machen', english: 'faire les devoirs' },
{ german: 'zu Hause', english: 'a la maison' },
{ german: 'in der Schule', english: 'a l\'ecole' },
{ german: 'auf einer Insel', english: 'sur une ile' },
{ german: 'in der Metro, in der U-Bahn', english: 'dans le metro' },
{ german: 'draussen', english: 'dehors' },
{ german: 'im Wasser', english: 'dans l\'eau' },
{ german: 'auf dem Tabletcomputer', english: 'sur la tablette' },
{ german: 'Wie\?', english: 'Comment\?' },
{ german: 'Wo\?', english: 'Ou\?' },
{ german: 'Wann\?', english: 'Quand\?' },
{ german: 'Was\?', english: 'Quoi\?' },
{ german: 'Was machst du\?', english: 'Qu\'est-ce que tu fais\?' },
{ german: 'Wer\?', english: 'Qui\?' },
{ german: 'auf', english: 'sur' },
{ german: 'unter', english: 'sous' },
{ german: 'in', english: 'dans' },
{ german: 'in der Mitte von', english: 'au milieu de' },
{ german: 'in, an, zu, bei', english: 'a' },
{ german: 'vor', english: 'devant' },
{ german: 'hinter', english: 'derriere' },
{ german: 'zwischen...und', english: 'entre...et' },

  // Add more words here
];

// Shuffle words array to randomize the order
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffleArray(wordsToTranslate);

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
  const progress = (currentWordIndex / wordsToTranslate.length) * 100;
  progressBar.value = progress;
  progressLabel.textContent = `To translate: ${wordsToTranslate.length - currentWordIndex}`;
}

function displayNextWord() {
  if (currentWordIndex < wordsToTranslate.length) {
    wordInput.value = '';
    const nextWord = wordsToTranslate[currentWordIndex].german;
    wordInput.placeholder = `${nextWord}`;
  } else {
    displaySummary();
  }
}

function displaySummary() {
  summaryDiv.innerHTML = '<h2>Words to learn:</h2>';
  const wordCounts = {};

  wordsToTranslate.forEach(word => {
    if (wordCounts[word.german]) {
      wordCounts[word.german]++;
    } else {
      wordCounts[word.german] = 1;
    }
  });

  const sortedWords = Object.keys(wordCounts).sort((a, b) => wordCounts[b] - wordCounts[a]);

  sortedWords.forEach(word => {
    if (wordCounts[word] > 1) {
      const attempts = wordCounts[word];
      summaryDiv.innerHTML += `<p>${word}: ${attempts} attempts</p>`;
    }
  });

  feedbackDiv.innerHTML = '';
  feedbackDiv.appendChild(summaryDiv);
}

function handleOkButtonClick() {
  checkTranslationLogic()
}

function checkTranslationLogic(){
  const userTranslation = wordInput.value.trim().toLowerCase();
  const currentWord = wordsToTranslate[currentWordIndex];

  if (userTranslation === currentWord.english) {
    feedbackDiv.textContent = `Very good! `;
    correctCount++;
    currentWordIndex++;
  } else {
    feedbackDiv.textContent = `Incorrect. The correct translation of "${wordsToTranslate[currentWordIndex].german}" is "${wordsToTranslate[currentWordIndex].english}".`;  
    wordsToTranslate.push(wordsToTranslate[currentWordIndex]);
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
