const historyQuestions = [
    {
        "question": "Opisz, jak hetman Jan Zamoyski wpłynął na politykę zagraniczną Rzeczpospolitej pod rządami Stefana Batorego.",
        "modelAnswer": "Hetman **Jan Zamoyski** był bliskim współpracownikiem króla **Stefana Batorego** i dowódcą wojskowym [1]. Jego strategiczne umiejętności i determinacja w działaniach wojennych miały kluczowe znaczenie dla sukcesów Rzeczpospolitej. Dzięki jego zaangażowaniu i dowództwu, Rzeczpospolita odzyskała Inflanty, co umocniło jej pozycję w regionie Bałtyku i zapewniło kontrolę nad ważnymi szlakami handlowymi [1, 2]."
    },
    {
        "question": "Wyjaśnij, dlaczego Zygmunt III Waza został królem Polski po śmierci Stefana Batorego i jakie były jego główne cele polityczne.",
        "modelAnswer": "Po śmierci **Stefana Batorego**, **Zygmunt III Waza** objął tron Polski [1]. Jego wybór był wynikiem skomplikowanej sytuacji politycznej w Rzeczpospolitej, gdzie różne frakcje szlacheckie miały swoje preferencje. **Zygmunt III Waza** dążył do wzmocnienia władzy królewskiej i centralizacji państwa, co często prowadziło do konfliktów z szlachtą [3]."
    },
    {
        "question": "Co to była dymitriada i jakie były jej przyczyny, przebieg oraz skutki dla Rzeczpospolitej i Rosji?",
        "modelAnswer": "**Dymitriada** to zbrojna interwencja części polskiej szlachty w Rosji na początku XVII wieku [2]. Przyczyną były wewnętrzne problemy Rosji, osłabienie władzy carskiej i pretensje różnych pretendentów do tronu. Polska szlachta, widząc okazję do wzmocnienia swoich wpływów, angażowała się w popieranie różnych kandydatów do carskiego tronu, co doprowadziło do interwencji zbrojnych i zamieszek. Skutkiem dymitriady było zamieszanie na tronie rosyjskim i krótkotrwałe zajęcie Moskwy przez Polaków [4]."
    },
    {
        "question": "Opisz szczegółowo okoliczności hołdu Wasyla Szujskiego Zygmuntowi III Wazie w 1611 roku, wyjaśniając jego symboliczne i polityczne znaczenie.",
        "modelAnswer": "W 1611 roku w Warszawie, **Wasyl Szujski**, car Rosji, wraz z braćmi złożył hołd królowi **Zygmuntowi III** [4]. Było to związane z polską interwencją w Rosji i osadzeniem **Władysława Wazy** na tronie carskim. **Hołd Szujskiego** był symbolicznym upokorzeniem Rosji i признанием polskiej przewagi w regionie."
    },
    {
        "question": "Jakie konkretnie ziemie odzyskała Rzeczpospolita na mocy pokoju w Polanowie w 1634 roku i jakie korzyści przyniosło to państwu?",
        "modelAnswer": "Na mocy **pokoju w Polanowie** w 1634 roku, **Rzeczpospolita odzyskała ziemię smoleńską, czernihowską i siewierską** [2, 5]. Te ziemie miały strategiczne znaczenie dla bezpieczeństwa wschodnich rubieży państwa. Ich odzyskanie umocniło pozycję Rzeczpospolitej i poprawiło jej sytuację militarną w regionie."
    },
    {
        "question": "Opisz przebieg bitwy pod Kircholmem w 1605 roku, uwzględniając taktykę wojsk polskich i szwedzkich oraz jej wpływ na dalsze losy wojny polsko-szwedzkiej.",
        "modelAnswer": "W 1605 roku wojska polsko-litewskie pod dowództwem **hetmana Jana Karola Chodkiewicza** pokonały Szwedów pod **Kircholmem** [6, 7]. Zwycięstwo to było rezultatem zastosowania doskonałej taktyki husarskiej, która przełamała szyki szwedzkiej piechoty [7]. Mimo sukcesu, bitwa nie przyniosła trwałego osłabienia Szwecji i wojna toczyła się dalej."
    },
    {
        "question": "Wyjaśnij, czym było \"cło\" w Rzeczpospolitej i jakie rodzaje ceł funkcjonowały w państwie oraz jakie miały znaczenie dla jego finansów.",
        "modelAnswer": "\"**Cło**\" to opłata nakładana na towary w związku z ich przewozem przez granicę [8]. W Rzeczpospolitej funkcjonowały różne rodzaje ceł, takie jak cła importowe, eksportowe i tranzytowe. Cła stanowiły ważne źródło dochodów dla państwa, ale ich pobór często był utrudniony ze względu na słabość administracji i korupcję."
    },
    {
        "question": "Czym wsławiła się husaria w historii Rzeczpospolitej, jakie było jej uzbrojenie i taktyka walki oraz dlaczego była tak skuteczna na polach bitew?",
        "modelAnswer": "**Husaria** wsławiła się jako symbol wspaniałych zwycięstw Rzeczpospolitej w XVII wieku [7]. Charakteryzowała się ciężkim uzbrojeniem, skrzydłami i umiejętnością szarżowania [7, 9]. Husaria była skuteczna dzięki swojej sile uderzeniowej, wysokiemu morale i doskonałemu wyszkoleniu [7]."
    },
    {
        "question": "Jakie ważne zmiany wprowadził król Zygmunt III Waza w funkcjonowaniu państwa i jakie były długoterminowe konsekwencje tych decyzji?",
        "modelAnswer": "**Zygmunt III Waza** w 1596 roku przeniósł stolicę z Krakowa do Warszawy [3]. Ta decyzja miała długoterminowe konsekwencje dla rozwoju Warszawy i jej roli jako centrum politycznego i kulturalnego państwa. Ponadto, **Zygmunt III Waza** dążył do wzmocnienia władzy królewskiej, co prowadziło do konfliktów ze szlachtą i osłabienia państwa."
    },
    {
        "question": "Opisz historię i symbolikę Kolumny Zygmunta w Warszawie, wyjaśniając, dlaczego została wzniesiona i jakie przesłanie niesie dla potomnych.",
        "modelAnswer": "**Kolumna Zygmunta** w Warszawie została wzniesiona na cześć króla **Władysława IV** [3]. Jest to jeden z najważniejszych symboli miasta, upamiętniający zasługi króla dla państwa i jego wkład w rozwój Warszawy. Kolumna jest wyrazem wdzięczności i pamięci o władcy, który dbał o rozwój kultury i sztuki."
    },
    {
        "question": "Jakie były główne przyczyny wybuchu powstania Chmielnickiego na Ukrainie w 1648 roku, uwzględniając aspekty społeczne, religijne i polityczne?",
        "modelAnswer": "Przyczyny **powstania Chmielnickiego** to: zmniejszenie rejestru Kozaków, ograniczenie przywilejów Kozaków zaporoskich, konflikty na tle religijnym [10, 11]. Kozacy dążyli do zwiększenia swoich praw i swobód, a także do ochrony swojej religii prawosławnej. Szlachta polska natomiast dążyła do ograniczenia wpływów kozackich i utrzymania swojej dominacji na Ukrainie."
    },
    {
        "question": "Jakie były najważniejsze etapy i skutki powstania Chmielnickiego dla Rzeczpospolitej, uwzględniając jego wpływ na relacje polsko-kozackie i polsko-rosyjskie?",
        "modelAnswer": "**Powstanie Chmielnickiego** doprowadziło do wielu bitew i konfliktów z Kozakami [10, 11]. W jego wyniku Ukraina została włączona do Rosji. Powstanie osłabiło Rzeczpospolitą i doprowadziło do utraty kontroli nad znaczną częścią Ukrainy [10]."
    },
    {
        "question": "Wyjaśnij, czym był \"potop szwedzki\" i jakie były jego główne przyczyny, przebieg oraz długoterminowe skutki dla Rzeczpospolitej?",
        "modelAnswer": "\"**Potop szwedzki**\" to najazd szwedzki na Rzeczpospolitą w latach 1655-1660 [12, 13]. Przyczyną była chęć opanowania Bałtyku przez Szwecję i osłabienie Rzeczpospolitej [13]. Skutki to zniszczenia, spadek liczby ludności, utrata Inflant [13]. Ważnym momentem była obrona klasztoru na **Jasnej Górze** w Częstochowie [12]."
    },
    {
        "question": "Opisz rolę obrony Jasnej Góry w czasie \"potopu szwedzkiego\", wyjaśniając, dlaczego to wydarzenie miało przełomowe znaczenie dla dalszych losów wojny.",
        "modelAnswer": "**Obrona Jasnej Góry** w 1655 roku miała przełomowe znaczenie dla przebiegu potopu szwedzkiego [12]. Klasztor, broniony przez niewielki oddział, skutecznie oparł się szwedzkiej przewadze, co podniosło morale Polaków i zachęciło ich do dalszej walki [12]. Obrona Jasnej Góry stała się symbolem oporu przeciwko szwedzkiej agresji [12]."
    },
    {
        "question": "Jakie były główne postanowienia pokoju w Oliwie w 1660 roku i jakie miały one konsekwencje dla Rzeczpospolitej w kontekście jej relacji ze Szwecją i innymi sąsiadami?",
        "modelAnswer": "**Pokój w Oliwie** w 1660 roku zakończył potop szwedzki [14]. Na jego mocy Szwecja zatrzymała większą część Inflant [6, 14]. Pokój ustabilizował sytuację w regionie Bałtyku, ale Rzeczpospolita utraciła część swoich terytoriów i wpływów [14]."
    },
    {
        "question": "Jakie były główne skutki wojen prowadzonych przez Rzeczpospolitą w XVII wieku dla jej sytuacji wewnętrznej i zewnętrznej, uwzględniając aspekty demograficzne, gospodarcze i polityczne?",
        "modelAnswer": "Wojny w XVII wieku doprowadziły do spadku liczby ludności, zubożenia państwa i osłabienia jego pozycji międzynarodowej [15]. **Rzeczpospolita** straciła wiele terytoriów i wpływów na rzecz swoich sąsiadów, co osłabiło jej pozycję w regionie. Kryzys gospodarczy i polityczny osłabił państwo i utrudnił jego funkcjonowanie [15]."
    },
    {
        "question": "Z kim i dlaczego Rzeczpospolita prowadziła liczne wojny w XVII wieku, analizując przyczyny konfliktów z Rosją, Szwecją i Turcją?",
        "modelAnswer": "**Rzeczpospolita** prowadziła liczne wojny z **Rosją, Szwecją, Turcją** [5, 6, 16]. Przyczyną były konflikty o terytoria, wpływy polityczne i handel [5, 6, 16]. **Rosja** dążyła do odzyskania ziem utraconych na rzecz Rzeczpospolitej, **Szwecja** do opanowania Bałtyku, a **Turcja** do ekspansji w Europie Środkowej."
    },
    {
        "question": "Opisz przebieg bitwy pod Wiedniem w 1683 roku, uwzględniając rolę Jana III Sobieskiego i wojsk polskich w pokonaniu Turków oraz jej znaczenie dla historii Europy.",
        "modelAnswer": "W 1683 roku wojska polskie pod dowództwem **Jana III Sobieskiego** pokonały **Turków pod Wiedniem** [17, 18]. Zwycięstwo to uratowało Europę przed ekspansją turecką [17, 18]. **Jan III Sobieski** został uznany za bohatera chrześcijaństwa, a bitwa pod Wiedniem za jedno z najważniejszych wydarzeń w historii Europy [18]."
    },
    {
        "question": "Wymień główne przyczyny kryzysu Rzeczpospolitej w XVII wieku, analizując wpływ \"liberum veto\", konfliktów wewnętrznych i zewnętrznych na osłabienie państwa.",
        "modelAnswer": "Przyczyny kryzysu Rzeczpospolitej w XVII wieku to: wojny, **liberum veto**, problemy wewnętrzne państwa [15]. **Liberum veto** paraliżowało prace sejmu i uniemożliwiało podejmowanie ważnych decyzji [15]. Konflikty wewnętrzne i zewnętrzne osłabiały państwo i utrudniały jego funkcjonowanie [15]."
    },
    {
        "question": "Opisz styl barokowy w architekturze, podając przykłady budowli w Polsce i wyjaśniając, jakie cechy charakterystyczne wyróżniają ten styl od innych epok architektonicznych.",
        "modelAnswer": "Styl barokowy charakteryzuje się bogactwem dekoracji, przepychem i monumentalnością [19-21]. Przykładem architektury barokowej w Polsce jest **kościół Sióstr Wizytek w Warszawie** [21]. Barokowe budowle charakteryzują się bogatą ornamentyką, dynamiką form i wykorzystaniem światła do tworzenia efektów iluzjonistycznych [19-21]."
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
