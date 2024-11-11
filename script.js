const wordsToTranslate = [
    { german: "być", english: "be was/were been" },
    { german: "stawać się", english: "become became become" },
    { german: "łamać, psuć (się), potłuc", english: "break broke broken" },
    { german: "przynosić", english: "bring brought brought" },
    { german: "budować", english: "build built built" },
    { german: "kupować", english: "buy bought bought" },
    { german: "łapać", english: "catch caught caught" },
    { german: "wybierać", english: "choose chose chosen" },
    { german: "przychodzić", english: "come came come" },
    { german: "kosztować", english: "cost cost cost" },
    { german: "ciąć", english: "cut cut cut" },
    { german: "robić", english: "do did done" },
    { german: "rysować", english: "draw drew drawn" },
    { german: "śnić, marzyć", english: "dream dreamt/dreamed dreamt/dreamed" },
    { german: "pić", english: "drink drank drunk" },
    { german: "prowadzić samochód", english: "drive drove driven" },
    { german: "jeść", english: "eat ate eaten" },
    { german: "upadać", english: "fall fell fallen" },
    { german: "karmić", english: "feed fed fed" },
    { german: "czuć (się)", english: "feel felt felt" },
    { german: "znajdować", english: "find found found" },
    { german: "latać", english: "fly flew flown" },
    { german: "zapominać", english: "forget forgot forgotten" },
    { german: "dostawać", english: "get got got" },
    { german: "dawać", english: "give gave given" },
    { german: "iść, jechać", english: "go went gone" },
    { german: "rosnąć, sadzić", english: "grow grew grown" },
    { german: "wisieć", english: "hang hung hung" },
    { german: "mieć", english: "have had had" },
    { german: "słyszeć", english: "hear heard heard" },
    { german: "(za)trzymać", english: "keep kept kept" },
    { german: "wiedzieć, znać", english: "know knew known" },
    { german: "uczyć się", english: "learn learnt/learned learnt/learned" },
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
