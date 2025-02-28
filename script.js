const wordsToTranslate = [
{ german: "schody", english: "Treppe" },
{ german: "wazon", english: "Vase" },
{ german: "ściana", english: "Wand" },
{ german: "szafa", english: "Kleiderschrank" },
{ german: "pralka", english: "Waschmaschine" },
{ german: "okno", english: "Fenster" },
{ german: "balkon", english: "Balkon" },
{ german: "łazienka", english: "Badezimmer" },
{ german: "sypialnia", english: "Schlafzimmer" },
{ german: "przedpokój, korytarz", english: "Flur" },
{ german: "kuchnia", english: "Küche" },
{ german: "pokój dzienny", english: "Wohnzimmer" },
{ german: "fotel", english: "Sessel" },
{ german: "wanna", english: "Badewanne" },
{ german: "kosz na śmieci", english: "Mülleimer" },
{ german: "biblioteczka", english: "Bücherregal" },
{ german: "dywan", english: "Teppich" },
{ german: "sufit", english: "Decke" },
{ german: "komin", english: "Kamin" },
{ german: "kuchenka", english: "Herd" },
{ german: "szafka", english: "Schrank" },
{ german: "poduszka dekoracyjna", english: "Kissen" },
{ german: "drzwi", english: "Tür" },
{ german: "podłoga, piętro", english: "Boden, Stockwerk" },
{ german: "lodówka", english: "Kühlschrank" },
{ german: "lampa", english: "Lampe" },
{ german: "lustro", english: "Spiegel" },
{ german: "dach", english: "Dach" },
{ german: "prysznic", english: "Dusche" },
{ german: "zlew kuchenny", english: "Spüle" },
{ german: "kawiarnia", english: "Café" },
{ german: "wygodny", english: "bequem" },
{ german: "latawiec", english: "Drachen" },
{ german: "latarnia morska", english: "Leuchtturm" },
{ german: "pałac", english: "Palast" },
{ german: "śmieci", english: "Müll" },
{ german: "dom na drzewie", english: "Baumhaus" },
{ german: "parasol", english: "Regenschirm" },
{ german: "zabalaganiony", english: "unordentlich" }
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
    if (wordCounts[word.english]) {
      wordCounts[word.english]++;
    } else {
      wordCounts[word.english] = 1;
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
    feedbackDiv.textContent = `Incorrect. The correct translation of "${currentWord.english}" is "${currentWord.english}", you provided "${userTranslation}".`;  
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
