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

async function validateApiKey(apiKey) {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: "Test message to validate API key."
                    }]
                }]
            })
        });

        const data = await response.json();
        return !data.error;
    } catch (error) {
        return false;
    }
}

async function handleApiKeySubmit() {
    const apiKeyInput = document.getElementById('api-key-input');
    const apiKeyError = document.getElementById('api-key-error');
    const saveButton = document.getElementById('save-api-key');
    const modal = document.getElementById('api-key-modal');
    
    const apiKey = apiKeyInput.value.trim();
    
    if (!apiKey) {
        apiKeyError.textContent = 'Please enter an API key';
        return;
    }

    saveButton.disabled = true;
    saveButton.textContent = 'Validating...';
    apiKeyError.textContent = '';

    const isValid = await validateApiKey(apiKey);

    if (isValid) {
        localStorage.setItem('gemini_api_key', apiKey);
        modal.classList.add('hidden');
        initializeQuiz();
    } else {
        apiKeyError.textContent = 'Invalid API key. Please check and try again.';
        saveButton.disabled = false;
        saveButton.textContent = 'Start Quiz';
    }
}

function checkApiKeyAndInitialize() {
    const apiKey = localStorage.getItem('gemini_api_key');
    const modal = document.getElementById('api-key-modal');

    if (apiKey) {
        modal.classList.add('hidden');
        initializeQuiz();
    } else {
        modal.classList.remove('hidden');
        document.getElementById('save-api-key').addEventListener('click', handleApiKeySubmit);
    }
}

function initializeQuiz() {
    updateProgressBar();
    displayNextQuestion();
}

async function evaluateAnswer(userAnswer, modelAnswer, question) {
    const apiKey = localStorage.getItem('gemini_api_key');
    if (!apiKey) {
        return {
            score: 0,
            correctPoints: "Error: API key is required for evaluation.",
            improvementPoints: "Please provide a valid Gemini API key",
            suggestion: "Refresh the page and enter your API key"
        };
    }

    const prompt = `You are a history teacher evaluating a student's answer about Kazimierz Wielki (Casimir the Great), a Polish king.

Question: ${question}
Model Answer: ${modelAnswer}
Student's Answer: ${userAnswer}

Please evaluate the answer and provide:
1. A score from 0-5 (where 5 is perfect)
2. Detailed feedback about what was correct
3. Specific points that were missing or could be improved
4. A brief suggestion for better answering

Format your response EXACTLY as a JSON object with these fields:
{
    "score": number,
    "correctPoints": "what the student got right",
    "improvementPoints": "what could be improved",
    "suggestion": "brief suggestion for improvement"
}

IMPORTANT: Respond ONLY with the JSON object, no other text.`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                }
            })
        });

        const data = await response.json();
        if (data.error) {
            throw new Error(data.error.message);
        }

        // Extract the response text from Gemini's response structure
        const responseText = data.candidates[0].content.parts[0].text;
        // Parse the JSON response, removing any potential markdown formatting
        const cleanJson = responseText.replace(/```json\n?|\n?```/g, '').trim();
        const result = JSON.parse(cleanJson);
        return result;

    } catch (error) {
        console.error('Error:', error);
        return {
            score: 0,
            correctPoints: "Error evaluating answer",
            improvementPoints: "There was an error processing your answer with Gemini API",
            suggestion: "Please try again or check your API key"
        };
    }
}

async function checkAnswerLogic() {
    const userAnswer = wordInput.value.trim();
    const currentQuestion = historyQuestions[currentQuestionIndex];
    
    // Disable the submit button and show loading state
    const submitButton = document.getElementById('ok-button');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Evaluating...';

    try {
        const evaluation = await evaluateAnswer(
            userAnswer,
            currentQuestion.modelAnswer,
            currentQuestion.question
        );

        feedbackDiv.innerHTML = `
            <div class="evaluation-result">
                <h3>Score: ${evaluation.score}/5</h3>
                <div class="feedback-section correct">
                    <h4>What You Got Right:</h4>
                    <p>${evaluation.correctPoints}</p>
                </div>
                <div class="feedback-section improvements">
                    <h4>Areas for Improvement:</h4>
                    <p>${evaluation.improvementPoints}</p>
                </div>
                <div class="feedback-section suggestion">
                    <h4>Suggestion:</h4>
                    <p>${evaluation.suggestion}</p>
                </div>
                <div class="model-answer">
                    <h4>Model Answer:</h4>
                    <p>${currentQuestion.modelAnswer}</p>
                </div>
            </div>
        `;

        if (evaluation.score >= 3) {
            correctCount++;
            currentQuestionIndex++;
        } else {
            historyQuestions.push(historyQuestions[currentQuestionIndex]);
        }

        updateProgressBar();
        displayNextQuestion();

    } catch (error) {
        console.error('Error:', error);
        feedbackDiv.innerHTML = `
            <div class="error">
                <p>Error evaluating answer. Please check your API key and try again.</p>
            </div>
        `;
    } finally {
        // Re-enable the submit button and restore original text
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    }
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

document.addEventListener('DOMContentLoaded', () => {
    // Update modal text for Gemini
    const modalText = document.querySelector('.modal-content p');
    modalText.textContent = 'To use this application, you need a Google Gemini API key. Your key will be stored locally and used only for answer evaluation.';

    // Update API key input placeholder
    const apiKeyInput = document.getElementById('api-key-input');
    apiKeyInput.placeholder = 'Enter your Gemini API key';

    // Update help link
    const helpLink = document.querySelector('.api-key-help a');
    helpLink.href = 'https://makersuite.google.com/app/apikey';
    helpLink.textContent = 'Get one here';

    // Initialize the quiz
    checkApiKeyAndInitialize();
});
