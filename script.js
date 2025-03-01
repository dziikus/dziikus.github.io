const historyQuestions = [
    { 
        question: "Jakie wielkie osiągnięcie edukacyjne jest związane z Kazimierzem Wielkim?",
        modelAnswer: "Kazimierz Wielki założył Akademię Krakowską (obecnie Uniwersytet Jagielloński) w 1364 roku, która była pierwszym uniwersytetem w Polsce i jednym z najstarszych w Europie Środkowej."
    },
    {
        question: "W jaki sposób Kazimierz zasłużył na przydomek 'Wielki'?",
        modelAnswer: "Kazimierz zasłużył na przydomek 'Wielki' przekształcając Polskę z królestwa drewnianego w murowane, modernizując infrastrukturę kraju, wzmacniając gospodarkę oraz wprowadzając znaczące reformy prawne i administracyjne."
    },
    {
        question: "Jaki był najważniejszy wkład Kazimierza Wielkiego w polski system prawny?",
        modelAnswer: "Wprowadził Statut Wiślicki, który ujednolicił i skodyfikował prawo polskie, ustanawiając bardziej zorganizowany system prawny i usprawniając wymiar sprawiedliwości w całym królestwie."
    },
    {
        question: "Jak Kazimierz Wielki usprawnił system obronny Polski?",
        modelAnswer: "Wybudował liczne zamki i fortyfikacje w całej Polsce, tworząc łańcuch konstrukcji obronnych znanych jako Orle Gniazda, oraz wzmocnił mury miejskie dla ochrony przed najazdami."
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
            correctPoints: "Błąd: Wymagany jest klucz API do oceny.",
            improvementPoints: "Proszę podać prawidłowy klucz API Gemini",
            suggestion: "Odśwież stronę i wprowadź swój klucz API"
        };
    }

    const prompt = `Jesteś nauczycielem historii oceniającym odpowiedź ucznia na temat Kazimierza Wielkiego, króla Polski.

Pytanie: ${question}
Wzorcowa odpowiedź: ${modelAnswer}
Odpowiedź ucznia: ${userAnswer}

Proszę ocenić odpowiedź i podać:
1. Ocenę od 0 do 5 (gdzie 5 to ocena doskonała)
2. Szczegółową informację o tym, co było poprawne
3. Konkretne punkty, których brakowało lub które można poprawić
4. Krótką sugestię, jak lepiej odpowiedzieć

Odpowiedź ma być dokładnie w formacie JSON:
{
    "score": liczba,
    "correctPoints": "co uczeń zrobił dobrze",
    "improvementPoints": "co można poprawić",
    "suggestion": "krótka sugestia"
}

WAŻNE: Odpowiedz TYLKO obiektem JSON, bez żadnego dodatkowego tekstu.`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
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

        const responseText = data.candidates[0].content.parts[0].text;
        const cleanJson = responseText.replace(/```json\n?|\n?```/g, '').trim();
        const result = JSON.parse(cleanJson);
        return result;

    } catch (error) {
        console.error('Error:', error);
        return {
            score: 0,
            correctPoints: "Błąd w ocenie odpowiedzi",
            improvementPoints: "Wystąpił problem podczas przetwarzania odpowiedzi",
            suggestion: "Proszę spróbować ponownie lub sprawdzić klucz API"
        };
    }
}

async function checkAnswerLogic() {
    const userAnswer = wordInput.value.trim();
    const currentQuestion = historyQuestions[currentQuestionIndex];
    
    const submitButton = document.getElementById('ok-button');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Ocenianie...';

    try {
        const evaluation = await evaluateAnswer(
            userAnswer,
            currentQuestion.modelAnswer,
            currentQuestion.question
        );

        feedbackDiv.innerHTML = `
            <div class="evaluation-result">
                <h3>Ocena: ${evaluation.score}/5</h3>
                <div class="feedback-section correct">
                    <h4>Co było dobrze:</h4>
                    <p>${evaluation.correctPoints}</p>
                </div>
                <div class="feedback-section improvements">
                    <h4>Co można poprawić:</h4>
                    <p>${evaluation.improvementPoints}</p>
                </div>
                <div class="feedback-section suggestion">
                    <h4>Sugestia:</h4>
                    <p>${evaluation.suggestion}</p>
                </div>
                <div class="model-answer">
                    <h4>Wzorcowa odpowiedź:</h4>
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
                <p>Błąd w ocenie odpowiedzi. Sprawdź swój klucz API i spróbuj ponownie.</p>
            </div>
        `;
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    }
}

function updateProgressBar() {
    const progress = (currentQuestionIndex / historyQuestions.length) * 100;
    progressBar.value = progress;
    progressLabel.textContent = `Pozostałe pytania: ${historyQuestions.length - currentQuestionIndex}`;
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
    summaryDiv.innerHTML = '<h2>Podsumowanie odpowiedzi:</h2>';
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
            summaryDiv.innerHTML += `<p>${word}: ${attempts} prób</p>`;
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
