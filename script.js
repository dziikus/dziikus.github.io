const wordsToTranslate = [
{ english: "schody", german: "stairs" },
{ english: "wazon", german: "vase" },
{ english: "ściana", german: "wall" },
{ english: "szafa", german: "wardrobe" },
{ english: "pralka", german: "washing machine" },
{ english: "okno", german: "window" },
{ english: "balkon", german: "balcony" },
{ english: "łazienka", german: "bathroom" },
{ english: "sypialnia", german: "bedroom" },
{ english: "przedpokój, korytarz", german: "hall" },
{ english: "kuchnia", german: "kitchen" },
{ english: "pokój dzienny", german: "living room" },
{ english: "fotel", german: "armchair" },
{ english: "wanna", german: "bath" },
{ english: "kosz na śmieci", german: "bin" },
{ english: "biblioteczka", german: "bookcase" },
{ english: "dywan", german: "carpet" },
{ english: "sufit", german: "ceiling" },
{ english: "komin", german: "chimney" },
{ english: "kuchenka", german: "cooker" },
{ english: "szafka", german: "cupboard" },
{ english: "poduszka dekoracyjna", german: "cushion" },
{ english: "drzwi", german: "door" },
{ english: "podłoga, piętro", german: "floor" },
{ english: "lodówka", german: "fridge" },
{ english: "lampa", german: "lamp" },
{ english: "lustro", german: "mirror" },
{ english: "dach", german: "roof" },
{ english: "prysznic", german: "shower" },
{ english: "zlew kuchenny", german: "sink" },
{ english: "kawiarnia", german: "café" },
{ english: "wygodny", german: "comfortable" },
{ english: "latawiec", german: "kite" },
{ english: "latarnia morska", german: "lighthouse" },
{ english: "pałac", german: "palace" },
{ english: "śmieci", german: "rubbish" },
{ english: "dom na drzewie", german: "tree house" },
{ english: "parasol", german: "umbrella" },
{ english: "zabalaganiony", german: "untidy" }
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
    const nextWord = wordsToTranslate[currentWordIndex].english;
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
    feedbackDiv.textContent = `Incorrect. The correct translation of "${currentWord.english}" is "${currentWord.german}", you provided "${userTranslation}".`;
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
