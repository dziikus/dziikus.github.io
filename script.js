const wordsToTranslate = [
{ german: "dom towarowy", english: "department store" },
{ german: "zakupy", english: "shopping" },
{ german: "kasjer", english: "cashier" },
{ german: "torba na zakupy", english: "shopping bag" },
{ german: "koszyk zakupowy", english: "shopping basket" },
{ german: "lista zakupów", english: "shopping list" },
{ german: "wózek na zakupy", english: "shopping trolley" },
{ german: "oferta specjalna", english: "special offer" },
{ german: "nieść zakupy", english: "carry the shopping" },
{ german: "sprawdzać cenę", english: "check the price" },
{ german: "otrzymać paragon", english: "get a receipt" },
{ german: "otrzymać resztę", english: "get your change" },
{ german: "płacić kartą", english: "pay by card" },
{ german: "płacić gotówką", english: "pay in cash" },
{ german: "stać w kolejce", english: "stand in a queue" },
{ german: "Baw się dobrze!", english: "Have fun!" },
{ german: "Proszę bardzo!", english: "Here we are!" },
{ german: "Nie wierzę!", english: "I don't believe it!" },
{ german: "wybierać", english: "choose" },
{ german: "dziura", english: "hole" },
{ german: "strona internetowa", english: "site" },
{ german: "modny, stylowy", english: "stylish" },
{ german: "piekarnia", english: "baker's" },
{ german: "księgarnia", english: "bookshop" },
{ german: "apteka", english: "chemist's" },
{ german: "sklep odzieżowy", english: "clothes shop" },
{ german: "warzywniak", english: "greengrocer's" },
{ german: "kiosk", english: "newsagent's" },
{ german: "sklep obuwniczy", english: "shoe shop" },
{ german: "sklep sportowy", english: "sports shop" },
{ german: "Kupowanie ubrań", english: "Shopping for clothes" },
{ german: "Sprzedawca", english: "Shop assistant" },
{ german: "W czym mogę pomóc?", english: "Can I help you?" },
{ german: "Niestety, nie mamy (tego).", english: "Sorry, we don't." },
{ german: "Przymierzalnie są tam.", english: "The changing rooms are over there." },
{ german: "Jaki nosi pan/pani/nosisz rozmiar?", english: "What size are you?" },
{ german: "Tak, mamy (to). Proszę bardzo.", english: "Yes, we do. Here you are." },
{ german: "Czy mogę to/je przymierzyć?", english: "Can I try it/them on?" },
{ german: "Czy macie to/je w kolorze szarym?", english: "Do you have this/these in grey?" },
{ german: "Czy macie to/je w rozmiarze 10/w rozmiarze S?", english: "Do you have this/these in a size 10/in a small?" },
{ german: "Noszę rozmiar 10/S/M/L.", english: "I'm a size 10/a small/a medium/a large." },
{ german: "Szukam nowych dżinsów.", english: "I'm looking for new jeans." },
{ german: "Nie, dziękuję, tylko się rozglądam.", english: "No thanks, I'm just looking." },
{ german: "zarezerwować", english: "book" },
{ german: "wspaniały", english: "brilliant" },
{ german: "kosztować", english: "cost" },
{ german: "za darmo", english: "free" },
{ german: "upewnić się", english: "make sure" },
{ german: "godziny otwarcia", english: "opening hours" },
{ german: "od osoby", english: "per person" },
{ german: "podawać", english: "serve" },
{ german: "przekąska", english: "snack" },
{ german: "personel", english: "staff" },
{ german: "dotykać", english: "touch" },
{ german: "podczas gdy", english: "while" },
{ german: "Kolejność argumentów", english: "Ordering arguments" },
{ german: "w końcu", english: "finally" },
{ german: "przede wszystkim", english: "first of all" },
{ german: "co więcej", english: "what's more" },
{ german: "wybór", english: "choice" },
{ german: "wzór", english: "design" },
{ german: "przenośna ładowarka", english: "portable charger" },
{ german: "przenośne głośniki", english: "portable speakers" },
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
