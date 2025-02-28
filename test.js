function testTranslation() {
    const wordsToTranslate = [
        { english: "schody", german: "stairs" },
        { english: "wazon", german: "vase" },
        { english: "wrong", german: "wrong" }
    ];

    const wordInput = document.createElement('input');
    const feedbackDiv = document.createElement('div');

    // Test with correct translation
    wordInput.value = "schody";
    let currentWord = wordsToTranslate[0];
    checkTranslationLogic(wordsToTranslate, wordInput, feedbackDiv,currentWord);
    if (feedbackDiv.textContent !== `Very good! `) {
        return false;
    }
    
    //Test with incorrect translation
    wordInput.value = "wrong";
    currentWord = wordsToTranslate[2];
    checkTranslationLogic(wordsToTranslate, wordInput, feedbackDiv, currentWord);
    if (feedbackDiv.textContent !== `Incorrect. The correct translation of "wrong" is "wrong", you provided "wrong".`) {
        return false;
    }

    // Test with correct translation
    wordInput.value = "wazon";
    currentWord = wordsToTranslate[1];
    checkTranslationLogic(wordsToTranslate, wordInput, feedbackDiv, currentWord);
    if (feedbackDiv.textContent !== `Very good! `) {
        return false;
    }
    
    //Test with incorrect translation
    wordInput.value = "wrong";
    currentWord = wordsToTranslate[2];
    checkTranslationLogic(wordsToTranslate, wordInput, feedbackDiv, currentWord);
    if (feedbackDiv.textContent !== `Incorrect. The correct translation of "wrong" is "wrong", you provided "wrong".`) {
        return false;
    }
    return true;
}

function checkTranslationLogic(wordsToTranslate, wordInput, feedbackDiv, currentWord){
    const userTranslation = wordInput.value.trim();
  
    if (userTranslation === currentWord.english) {
      feedbackDiv.textContent = `Very good! `;
    } else {
      feedbackDiv.textContent = `Incorrect. The correct translation of "${currentWord.english}" is "${currentWord.german}", you provided "${userTranslation}".`;
    }
}

testTranslation()
