const wordsToTranslate = [
{ german: 'Jahrhundert', english: 'century pl.centuries' },
{ german: 'hier:Ereignis', english: 'event' },
{ german: 'ausbrechen', english: 'break past:broke' },
{ german: 'bekommen,erhalten', english: 'get past:got' },
{ german: 'beginnen,anfangen', english: 'begin past:began' },
{ german: 'hören', english: 'hear past:heard' },
{ german: 'schreiben', english: 'write past:wrote' },
{ german: 'lernen', english: 'learn past:learnt' },
{ german: 'senden', english: 'send past:sent' },
{ german: 'sinken,untergehen', english: 'sink past:sank' },
{ german: 'reisen', english: 'travel' },
{ german: 'erforschen', english: 'explore' },
{ german: 'suchen nach', english: 'search for' },
{ german: 'ertrinken', english: 'drown' },
{ german: 'herunterklettern,heruntersteigen', english: 'climb down' },
{ german: 'entdecken', english: 'discover' },
{ german: 'entwickeln', english: 'develop' },
{ german: 'kommunizieren,sich verständigen', english: 'communicate' },
{ german: 'wurde geboren', english: 'was born' },
{ german: 'im Alter von', english: 'at the age of' },

  
  
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
  const userTranslation = wordInput.value.trim();
  const currentWord = wordsToTranslate[currentWordIndex];

  if (userTranslation === currentWord.english) {
    feedbackDiv.textContent = `Very good! `;
    correctCount++;
    currentWordIndex++;
  } else {
    feedbackDiv.textContent = `Incorrect. The correct translation of "${currentWord.german}" is "${currentWord.english}", you provided "${userTranslation}".`;  
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
