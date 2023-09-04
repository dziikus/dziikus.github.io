const wordsToTranslate = [
  { german: 'die Uhr', french: 'la montre' },
  { german: 'gross', french: 'grand/grande' },
  { german: 'klein', french: 'petit/petite' },
  { german: 'rund', french: 'rond/ronde' },
  { german: 'kurz', french: 'court/courte' },
  { german: 'long', french: 'long/longue' },
  { german: 'warm/heiss', french: 'chaud/chaude' },
  { german: 'kalt', french: 'froid/froide' },
  { german: 'der Montel', french: 'le manteau' }, 
  { german: 'der Hut', french: 'le chapeau' },
  { german: 'die Jacke', french: 'la veste' },
  { german: 'die Socke', french: 'la chaussette' },
  { german: 'die Shorts', french: 'le short' },
  { german: 'die Hose', french: 'le pantalon' },
  { german: 'das Hemd', french: 'la chemise' },
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
  progressLabel.textContent = `${progress.toFixed(1)}%`;
}

function displayNextWord() {
  if (currentWordIndex < wordsToTranslate.length) {
    wordInput.value = '';
    const nextWord = wordsToTranslate[currentWordIndex].german;
    wordInput.placeholder = `Translate "${nextWord}"`;
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

  if (userTranslation === currentWord.french) {
    correctCount++;
    currentWordIndex++;
    feedbackDiv.textContent = '';
  } else {
    feedbackDiv.textContent = `Incorrect. The correct translation of "${wordsToTranslate[currentWordIndex].german}" is "${wordsToTranslate[currentWordIndex].french}".`;  
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
