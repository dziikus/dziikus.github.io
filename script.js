const wordsToTranslate = [
  { german: 'das Leben', english: 'la vie' }, 
  { german: 'eine Hoffnung', english: 'un espoir' },
  { german: 'ein Baum', english: 'un arbre' }, 
  { german: 'das Gras', english: 'lherbe' }, 
  { german: 'das Blatt', english: 'la feuille' }, 
  { german: 'der Himmel', english: 'le ciel' }, 
  { german: 'das Glück', english: 'le bonheur' }, 
  { german: 'die Welt', english: 'le monde' }, 
  { german: 'die Sonne', english: 'le soleil' }, 
  { german: 'der Mond', english: 'la lune' }, 
  { german: 'ein Stern', english: 'une etoile' }, 
  { german: 'die Freude, das Vergnügen', english: 'le plaisir' }, 
  { german: 'die Erde', english: 'la terre' }, 
  { german: 'die Gesundheit', english: 'la santé' }, 
  { german: 'das Blut', english: 'le sang' }, 
  { german: 'die Gefahr', english: 'le danger' }, 
  { german: 'eine Liebe', english: 'un amour' }, 
  { german: 'der Regen', english: 'la pluie' }, 
  { german: 'es regnet', english: 'il pleut' }, 
  { german: 'der Grund', english: 'la raison' }, 
  { german: 'morgen', english: 'demain' }
];

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
