const wordsToTranslate = [
{ german: 'das Haus', english: 'la maison' },
{ german: 'eine Wohnung', english: 'un appartament' },
{ german: 'die Küche', english: 'la cuisine' },
{ german: 'das Wohnzimmer', english: 'le salon' },
{ german: 'das Zimmer', english: 'la chambre' },
{ german: 'die Toilette,das WC', english: 'les toilettes/le WC' },
{ german: 'das Badezimmer', english: 'la salle de bains' },
{ german: 'ein Stockwerk', english: 'un etage' },
{ german: 'das Erdgeschoss', english: 'le rez-de-chaussee' },
{ german: 'das Untergescoss', english: 'le sous-sol' },
{ german: 'arbeiten, english: 'travailler' },
{ german: 'Ich wohne im ersten Stock', english: 'J'habite au premier etage' },
{ german: 'Du wohnst im zweiten stock', english: 'Tu habites au deuxieme etage' },
{ german: 'Er wohnt im dritten Stock', english: 'Il habite au troisieme etage' },
{ german: 'Ich arbeite in der Aphoteke', english: 'Je travaille a la pharmacie' },
{ german: 'auf', english: 'sur' },
{ german: 'unter', english: 'sous' },
{ german: 'in', english: 'dans' },
{ german: 'in,an,zu,bei', english: 'a' },
{ german: 'vor', english: 'devant' },
{ german: 'hinter', english: 'derriere' },
{ german: 'zwischen...und', english: 'entre...et' },
{ german: 'oben', english: 'en haut' },
{ german: 'unten', english: 'en bas' },



  
  
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
