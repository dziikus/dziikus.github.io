const wordsToTranslate = [
{ german: "stairs", english: "schody" },
{ german: "vase", english: "wazon" },
{ german: "wall", english: "ściana" },
{ german: "wardrobe", english: "szafa" },
{ german: "washing machine", english: "pralka" },
{ german: "window", english: "okno" },
{ german: "balcony", english: "balkon" },
{ german: "bathroom", english: "łazienka" },
{ german: "bedroom", english: "sypialnia" },
{ german: "hall", english: "przedpokój, korytarz" },
{ german: "kitchen", english: "kuchnia" },
{ german: "living room", english: "pokój dzienny" },
{ german: "armchair", english: "fotel" },
{ german: "bath", english: "wanna" },
{ german: "bin", english: "kosz na śmieci" },
{ german: "bookcase", english: "biblioteczka" },
{ german: "carpet", english: "dywan" },
{ german: "ceiling", english: "sufit" },
{ german: "chimney", english: "komin" },
{ german: "cooker", english: "kuchenka" },
{ german: "cupboard", english: "szafka" },
{ german: "cushion", english: "poduszka dekoracyjna" },
{ german: "door", english: "drzwi" },
{ german: "floor", english: "podłoga, piętro" },
{ german: "fridge", english: "lodówka" },
{ german: "lamp", english: "lampa" },
{ german: "mirror", english: "lustro" },
{ german: "roof", english: "dach" },
{ german: "shower", english: "prysznic" },
{ german: "sink", english: "zlew kuchenny" },
{ german: "café", english: "kawiarnia" },
{ german: "comfortable", english: "wygodny" },
{ german: "kite", english: "latawiec" },
{ german: "lighthouse", english: "latarnia morska" },
{ german: "palace", english: "pałac" },
{ german: "rubbish", english: "śmieci" },
{ german: "tree house", english: "dom na drzewie" },
{ german: "umbrella", english: "parasol" },
{ german: "untidy", english: "zabalaganiony" }
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

  if (userTranslation === currentWord.german) {
    feedbackDiv.textContent = `Very good! `;
    correctCount++;
    currentWordIndex++;
  } else {
    feedbackDiv.textContent = `Incorrect. The correct translation of "${currentWord.german}" is "${currentWord.german}", you provided "${userTranslation}".`;  
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
