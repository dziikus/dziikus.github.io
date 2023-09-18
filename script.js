const wordsToTranslate = [
{ german: 'Molkereiprodukte', english: 'dairy products' },
{ german: 'Fleisch',  english : 'meat' },
{ german: 'verarbeitetes Nahrungsmittel',  english : 'processed food' },
{ german: 'wie viel',  english : 'how much' },
{ german: 'wie viele',  english : 'how many' },
{ german: 'Lebensmittelverschwendung',  english : 'food waste' },
{ german: 'Kompost',  english : 'compost' },  
{ german: 'Mülleimer / Abfalleimer',  english : 'rubbish bin / dustbin' },
{ german: 'aus der Region',  english : 'regional' },
{ german: 'saisonal, der Jahreszeit entsprechend',  english : 'seasonal' },
{ german: 'in der Nähe',  english : 'nearby' },
{ german: 'weit weg',  english : 'far away' },
{ german: 'wächst',  english : 'grows' }, 
{ german: ' wächst nicht in/im',  english : 'doesn't grow in' },
{ german: 'weniger heizen',  english : 'reduce heating' },
{ german: 'wiederverwenden',  english : 're-use' }, 
{ german: 'recyceln, wiederverwerten',  english : 'recycle' },
{ german: 'wegwerfen',  english : 'throw away' }, 
{ german: 'wegwerfen (past)',  english : 'threw away' }, 
{ german: 'verschenken',  english : 'give away' }, 
{ german: 'verschenken (past)',  english : 'gave away' }, 
{ german: 'abgepackte Portionen',  english : 'prepackaged portions' }, 

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
