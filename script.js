const wordsToTranslate = [
{ german: 'gestern und heute', english: 'yesterday and today' },
{ german: 'morgen', english: 'tomorrow' },
{ german: 'Tagenbuch', english: 'diary pl. diaries' },  
{ german: 'Reise/Fahrt', english: 'journey' },
{ german: 'Erfindung', english: 'invention' },
{ german: 'Kaminfeger/-in', english: 'chimney sweep' },
{ german: 'Schauspielerin/Schauspieler', english: 'actress/actor' },  
{ german: 'Dienstmädchen', english: 'maid' },
{ german: 'Ehe-Man und Ehe-Frau', english: 'husband and wife' },
{ german: 'Wissenschafter/-in', english: 'scientist' },
{ german: 'Raumschiff', english: 'spaceschip' },  
{ german: 'Werkzeug', english: 'tool' },
{ german: 'Segelschiff', english: 'sailing schip' },
{ german: 'Taschentuch', english: 'handkerchief' },
{ german: 'Besen', english: 'broom' },  
{ german: 'Eisenbahn', english: 'railway' },
{ german: 'Zeitstrahl', english: 'timeline' },
{ german: 'Datum', english: 'date' },
{ german: 'SMS', english: 'text message' },  
{ german: 'Vergangenheit', english: 'past' },


  
  
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
