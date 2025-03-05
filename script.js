const historyQuestions = [
    {
        "question": "Jakie główne konflikty zbrojne toczyła Rzeczpospolita Obojga Narodów w XVI i XVII wieku i z kim?",
        "modelAnswer": "Rzeczpospolita w omawianym okresie była uwikłana w liczne konflikty z Rosją (m.in. wojny o Inflanty, dymitriady), ze Szwecją (wojny o Inflanty, \"Potop Szwedzki\"), z Turcją (bitwy pod Cecorą, Chocimiem, odsiecz wiedeńska) oraz z Tatarami i Kozakami (powstanie Chmielnickiego, liczne najazdy)."
      },
        {
        "question": "Czym charakteryzował się \"Potop Szwedzki\" i jakie były jego skutki dla Rzeczypospolitej?",
        "modelAnswer": "\"Potop Szwedzki\" (1655-1660) to najazd szwedzki na Rzeczpospolitą, który doprowadził do ogromnych zniszczeń, strat ludności i osłabienia państwa. Szwedzi zajęli znaczną część kraju, łupiąc i niszcząc. Przełomowym momentem była obrona Jasnej Góry. Skutkiem \"Potopu\" był kryzys demograficzny i gospodarczy, utrata terytoriów (Inflanty) oraz osłabienie pozycji międzynarodowej Rzeczypospolitej."
      },
        {
        "question": "Co spowodowało wybuch powstania Chmielnickiego i jakie były jego konsekwencje dla Rzeczypospolitej?",
        "modelAnswer": "Przyczyną powstania Chmielnickiego (1648) było niezadowolenie Kozaków z ograniczenia rejestru kozackiego, a także kwestie religijne i konflikty społeczne. Powstanie doprowadziło do oderwania od Rzeczypospolitej znacznej części Ukrainy i przyłączenia jej do Rosji (traktat w Andruszowie), co osłabiło państwo i zapoczątkowało długotrwałe konflikty z Rosją."
      },
        {
        "question": "Kim byli Husarzy i jaką rolę odgrywali w wojsku Rzeczypospolitej?",
        "modelAnswer": "Husaria była elitarną formacją ciężkiej jazdy polskiej, słynącą ze skutecznych szarż i efektownego wyglądu (skrzydła). Odgrywała kluczową rolę w wielu bitwach, przyczyniając się do zwycięstw Rzeczypospolitej w XVI i XVII wieku. Ich siła wynikała z taktyki jazdy i umiejętności dowódców."
      },
        {
        "question": "Jakie zmiany terytorialne zaszły w Rzeczypospolitej w wyniku wojen z Rosją w XVI i XVII wieku?",
        "modelAnswer": "W wyniku wojen z Rosją Rzeczpospolita zdobyła Inflanty, ale później straciła Smoleńsk, Czernihów i Siewiersk. Po powstaniu Chmielnickiego duża część Ukrainy została przyłączona do Rosji, co ostatecznie potwierdził traktat andruszowski."
      },
        {
        "question": "Jakie cechy charakteryzowały sztukę barokową w Polsce i jaki był jej związek z Kościołem katolickim?",
        "modelAnswer": "Sztuka barokowa w Polsce charakteryzowała się bogactwem dekoracji, monumentalnością, przepychem i silnym wpływem religijnym. W architekturze dominowały okazałe kościoły i pałace. Kościół katolicki był ważnym mecenasem sztuki barokowej, wykorzystując ją do wzmocnienia wiary i podkreślenia swojej potęgi."
      },
        {
        "question": "Jakie były przyczyny i skutki wojen z Turcją w XVI i XVII wieku?",
        "modelAnswer": "Przyczyny wojen z Turcją to ekspansja Imperium Osmańskiego, spory o wpływy w Mołdawii i na Podolu, a także najazdy tatarskie na ziemie Rzeczypospolitej. Skutki to zniszczenia, straty ludności i finansowe, ale także obrona przed ekspansją turecką i ochrona chrześcijańskiej Europy (odsiecz wiedeńska)."
      },
        {
        "question": "Jakie czynniki przyczyniły się do kryzysu Rzeczypospolitej w XVII wieku?",
        "modelAnswer": "Kryzys Rzeczypospolitej w XVII wieku był spowodowany licznymi wojnami (ze Szwecją, Rosją, Turcją), osłabieniem władzy królewskiej (liberum veto), kryzysem gospodarczym, problemami społecznymi (powstania kozackie) oraz wpływami obcych mocarstw. Te czynniki doprowadziły do osłabienia państwa i utraty jego pozycji na arenie międzynarodowej."
      }
];

let currentQuestionIndex = 0;
let correctCount = 0;
let attemptCount = 0;

function speakText(text) {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Create new utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set Polish language
    utterance.lang = 'pl-PL';
    
    // Set speech rate and pitch
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    // Speak the text
    window.speechSynthesis.speak(utterance);
}

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
                    ${evaluation.score < 5 ? `
                        <button onclick="speakText('${currentQuestion.modelAnswer.replace(/'/g, "\\'")}')" class="speak-button">
                            <span class="speak-icon">🔊</span> Powtórz odpowiedź
                        </button>
                    ` : ''}
                </div>
            </div>
        `;

        // Automatically speak the correct answer if score is not perfect
        if (evaluation.score < 5) {
            // Small delay to let the user see the feedback first
            setTimeout(() => {
                speakText(currentQuestion.modelAnswer);
            }, 1000);
        }

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
