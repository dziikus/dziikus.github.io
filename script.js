const historyQuestions = [
    { 
        question: "What major educational achievement is Kazimierz Wielki known for?",
        modelAnswer: "Kazimierz Wielki founded the Kraków Academy (now Jagiellonian University) in 1364, which was the first university in Poland and one of the oldest in Central Europe."
    },
    {
        question: "How did Kazimierz Wielki earn his nickname 'the Great'?",
        modelAnswer: "Kazimierz Wielki earned his nickname 'the Great' by transforming Poland from a wooden kingdom into one of stone, modernizing the country's infrastructure, strengthening its economy, and implementing significant legal and administrative reforms."
    },
    {
        question: "What was Kazimierz Wielki's most significant contribution to Poland's legal system?",
        modelAnswer: "He introduced the Statute of Wiślica, which unified and codified Polish law, establishing a more organized legal system and improving the administration of justice throughout the kingdom."
    },
    {
        question: "How did Kazimierz Wielki improve Poland's defense system?",
        modelAnswer: "He built numerous castles and fortifications across Poland, creating a chain of defensive structures known as Eagles' Nests, and strengthened city walls to protect against invasions."
    }
];

let currentQuestionIndex = 0;
let correctCount = 0;
let attemptCount = 0;

// Function to calculate similarity between two strings
function calculateSimilarity(str1, str2) {
    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();
    
    // Split into words and remove common words
    const words1 = str1.split(/\s+/).filter(word => word.length > 3);
    const words2 = str2.split(/\s+/).filter(word => word.length > 3);
    
    // Count matching words
    const matches = words1.filter(word => words2.includes(word));
    
    // Calculate similarity score
    const similarity = (matches.length * 2) / (words1.length + words2.length);
    return similarity;
}

function updateProgressBar() {
    const progress = (currentQuestionIndex / historyQuestions.length) * 100;
    progressBar.value = progress;
    progressLabel.textContent = `Questions remaining: ${historyQuestions.length - currentQuestionIndex}`;
}

function displayNextQuestion() {
    if (currentQuestionIndex < historyQuestions.length) {
        wordInput.value = '';
        const nextQuestion = historyQuestions[currentQuestionIndex].question;
        wordInput.placeholder = "Type your answer here...";
        document.getElementById('current-question').textContent = nextQuestion;
    } else {
        displaySummary();
    }
}

function checkAnswerLogic() {
    const userAnswer = wordInput.value.trim();
    const currentQuestion = historyQuestions[currentQuestionIndex];
    const similarity = calculateSimilarity(userAnswer, currentQuestion.modelAnswer);
    
    if (similarity >= 0.3) {  // Threshold for acceptable answer
        feedbackDiv.innerHTML = `
            <p class="correct">Good answer! Your response shows understanding of the topic.</p>
            <p class="model-answer">Model answer: ${currentQuestion.modelAnswer}</p>
        `;
        correctCount++;
        currentQuestionIndex++;
    } else {
        feedbackDiv.innerHTML = `
            <p class="incorrect">Your answer could be improved. Here's why:</p>
            <p class="model-answer">Model answer: ${currentQuestion.modelAnswer}</p>
            <p>Try to include more specific details in your answer.</p>
        `;
        historyQuestions.push(historyQuestions[currentQuestionIndex]);
    }
    updateProgressBar();
    displayNextQuestion();
}

function handleOkButtonClick() {
    checkAnswerLogic();
}

function checkAnswer(event) {
    event.preventDefault();
    checkAnswerLogic();
}

const progressBar = document.getElementById('progress-bar');
const progressLabel = document.getElementById('progress-label');
const wordInput = document.getElementById('word-input');
const feedbackDiv = document.getElementById('feedback');
const summaryDiv = document.createElement('div');
const okButton = document.getElementById('ok-button');

function displaySummary() {
  summaryDiv.innerHTML = '<h2>Questions answered:</h2>';
  const wordCounts = {};

  historyQuestions.forEach(question => {
    if (wordCounts[question.modelAnswer]) {
      wordCounts[question.modelAnswer]++;
    } else {
      wordCounts[question.modelAnswer] = 1;
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

okButton.addEventListener('click', handleOkButtonClick);
document.getElementById('translation-form').addEventListener('submit', checkAnswer);

updateProgressBar();
displayNextQuestion();
