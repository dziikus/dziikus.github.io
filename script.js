const wordsToTranslate = [
{ toTranslate: "schody", translation: "stairs" },
{ toTranslate: "wazon", translation: "vase" },
{ toTranslate: "ściana", translation: "wall" },
{ toTranslate: "szafa", translation: "wardrobe" },
{ toTranslate: "pralka", translation: "washing machine" },
{ toTranslate: "okno", translation: "window" },
{ toTranslate: "balkon", translation: "balcony" },
{ toTranslate: "łazienka", translation: "bathroom" },
{ toTranslate: "sypialnia", translation: "bedroom" },
{ toTranslate: "przedpokój, korytarz", translation: "hall" },
{ toTranslate: "kuchnia", translation: "kitchen" },
{ toTranslate: "pokój dzienny", translation: "living room" },
{ toTranslate: "fotel", translation: "armchair" },
{ toTranslate: "wanna", translation: "bath" },
{ toTranslate: "kosz na śmieci", translation: "bin" },
{ toTranslate: "biblioteczka", translation: "bookcase" },
{ toTranslate: "dywan", translation: "carpet" },
{ toTranslate: "sufit", translation: "ceiling" },
{ toTranslate: "komin", translation: "chimney" },
{ toTranslate: "kuchenka", translation: "cooker" },
{ toTranslate: "szafka", translation: "cupboard" },
{ toTranslate: "poduszka dekoracyjna", translation: "cushion" },
{ toTranslate: "drzwi", translation: "door" },
{ toTranslate: "podłoga, piętro", translation: "floor" },
{ toTranslate: "lodówka", translation: "fridge" },
{ toTranslate: "lampa", translation: "lamp" },
{ toTranslate: "lustro", translation: "mirror" },
{ toTranslate: "dach", translation: "roof" },
{ toTranslate: "prysznic", translation: "shower" },
{ toTranslate: "zlew kuchenny", translation: "sink" },
{ toTranslate: "kawiarnia", translation: "café" },
{ toTranslate: "wygodny", translation: "comfortable" },
{ toTranslate: "latawiec", translation: "kite" },
{ toTranslate: "latarnia morska", translation: "lighthouse" },
{ toTranslate: "pałac", translation: "palace" },
{ toTranslate: "śmieci", translation: "rubbish" },
{ toTranslate: "dom na drzewie", translation: "tree house" },
{ toTranslate: "parasol", translation: "umbrella" },
{ toTranslate: "zabalaganiony", translation: "untidy" }
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
    const nextWord = wordsToTranslate[currentWordIndex].toTranslate;
    wordInput.placeholder = `${nextWord}`;
  } else {
    displaySummary();
  }
}

function displaySummary() {
  summaryDiv.innerHTML = '<h2>Words to learn:</h2>';
  const wordCounts = {};

  wordsToTranslate.forEach(word => {
    if (wordCounts[word.translation]) {
      wordCounts[word.translation]++;
    } else {
      wordCounts[word.translation] = 1;
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

  if (userTranslation === currentWord.translation) {
    feedbackDiv.textContent = `Very good! `;
    correctCount++;
    currentWordIndex++;
  } else {
    feedbackDiv.textContent = `Incorrect. The correct translation of "${currentWord.toTranslate}" is "${currentWord.translation}", you provided "${userTranslation}".`;
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
