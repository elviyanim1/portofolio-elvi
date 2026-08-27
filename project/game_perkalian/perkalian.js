
// VARIABEL GAME
let currentLevel = "";
let currentType = "";

let currentQuestion = 0;
let totalQuestions = 10;

let score = 0;
let correct = 0;
let wrong = 0;

let currentAnswer = 0;

let timerInterval = null;
let timeLeft = 5;
let gameTime = 0;


// ELEMEN HTML
const homePage = document.getElementById("homePage");
const settingPage = document.getElementById("settingPage");
const gamePage = document.getElementById("gamePage");
const resultPage = document.getElementById("resultPage");

const settingTitle = document.getElementById("settingTitle");

const easySetting = document.getElementById("easySetting");
const mediumSetting = document.getElementById("mediumSetting");
const customSetting = document.getElementById("customSetting");

const easyType = document.getElementById("easyType");
const mediumType = document.getElementById("mediumType");
const customType = document.getElementById("customType");

const questionCount = document.getElementById("questionCount");
const customTime = document.getElementById("customTime");

const questionNumber = document.getElementById("questionNumber");
const scoreDisplay = document.getElementById("score");

const timerContainer = document.getElementById("timerContainer");
const timerDisplay = document.getElementById("timer");

const questionText = document.getElementById("questionText");
const answerSection = document.getElementById("answerSection");
const answerInput = document.getElementById("answerInput");

const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("nextButton");
const finishButton = document.getElementById("finishButton");

const finalScore = document.getElementById("finalScore");
const correctCount = document.getElementById("correctCount");
const wrongCount = document.getElementById("wrongCount");
const accuracy = document.getElementById("accuracy");


// PILIH LEVEL
function selectLevel(level) {
    currentLevel = level;

    homePage.classList.add("hidden");
    settingPage.classList.remove("hidden");

    // Sembunyikan semua setting
    easySetting.classList.add("hidden");
    mediumSetting.classList.add("hidden");
    customSetting.classList.add("hidden");

    // Tampilkan setting sesuai level
    if (level === "easy") {
        settingTitle.textContent = "Easy";
        easySetting.classList.remove("hidden");
    }

    else if (level === "medium") {
        settingTitle.textContent = "Medium";
        mediumSetting.classList.remove("hidden");
    }

    else if (level === "custom") {
        settingTitle.textContent = "Custom";
        customSetting.classList.remove("hidden");
    }
}


// MULAI GAME
function startGame() {

    // Reset game
    currentQuestion = 0;
    score = 0;
    correct = 0;
    wrong = 0;

    clearInterval(timerInterval);

    // EASY
    if (currentLevel === "easy") {
        currentType = easyType.value;
        totalQuestions = 10;
        gameTime = 0;
    }

    // MEDIUM
    else if (currentLevel === "medium") {
        currentType = mediumType.value;
        totalQuestions = 10;
        gameTime = 5;
    }

    // CUSTOM
    else if (currentLevel === "custom") {
        currentType = customType.value;
        totalQuestions = Number(questionCount.value);
        gameTime = Number(customTime.value);
    }

    // PINDAH KE GAME
    settingPage.classList.add("hidden");
    gamePage.classList.remove("hidden");
    resultPage.classList.add("hidden");

    scoreDisplay.textContent = "⭐ 0";

    // Timer
    if (currentLevel === "easy") {
        timerContainer.classList.add("hidden");
    } else {
        timerContainer.classList.remove("hidden");
    }

    // Mulai soal pertama
    nextQuestion();
}

// RANDOM NUMBER
function randomNumber(min, max) {

    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;

}

// GENERATE SOAL

function generateQuestion(type) {
    let a;
    let b;

    // PERKALIAN 2
    if (type === "x2") {
        a = 2;
        b = randomNumber(1, 9);
    }

    // PERKALIAN 3
    else if (type === "x3") {
        a = 3;
        b = randomNumber(1, 9);
    }

    // PERKALIAN 4
    else if (type === "x4") {
        a = 4;
        b = randomNumber(1, 9);
    }

    // PERKALIAN 5
    else if (type === "x5") {
        a = 5;
        b = randomNumber(1, 9);
    }

    // PERKALIAN 6
    else if (type === "x6") {
        a = 6;
        b = randomNumber(1, 9);
    }

    // PERKALIAN 7
    else if (type === "x7") {
        a = 7;
        b = randomNumber(1, 9);
    }

    // PERKALIAN 8
    else if (type === "x8") {
        a = 8;
        b = randomNumber(1, 9);
    }

    // PERKALIAN 9
    else if (type === "x9") {
        a = 9;
        b = randomNumber(1, 9);
    }

    // MIX PERKALIAN DASAR
    else if (
        type === "mix" ||
        type === "satuan" ||
        type === "Satuan"
    ) {

        a = randomNumber(1, 9);
        b = randomNumber(1, 9);

    }

    // 2 DIGIT × 1 DIGIT
    else if (type === "2dx1d") {

        a = randomNumber(10, 99);
        b = randomNumber(1, 9);

    }

    // 3 DIGIT × 1 DIGIT
    else if (type === "3dx1d") {

        a = randomNumber(100, 999);
        b = randomNumber(1, 9);

    }

    // ==========================
    // 2 DIGIT × 2 DIGIT

    else if (type === "2dx2d") {
        a = randomNumber(10, 99);
        b = randomNumber(10, 99);
    }

    else {

        // Default
        a = randomNumber(1, 9);
        b = randomNumber(1, 9);

    }


    return {
        a: a,
        b: b,
        answer: a * b
    };

}

// SOAL BERIKUTNYA
function nextQuestion() {

    clearInterval(timerInterval);

    // Jika semua soal sudah selesai
    if (currentQuestion >= totalQuestions) {

        finishGame();
        return;

    }

    currentQuestion++;

    // Update nomor soal
    questionNumber.textContent =
        `Soal ${currentQuestion} / ${totalQuestions}`;

    // Generate soal
    const question = generateQuestion(currentType);

    currentAnswer = question.answer;

    // TAMPILKAN SOAL DI DALAM KOTAK
    questionText.textContent =
        `${question.a} × ${question.b} = ?`;

    // RESET INPUT
    answerInput.value = "";
    answerInput.disabled = false;
    feedback.classList.add("hidden");
    nextButton.classList.add("hidden");
    answerSection.style.display = "block";
    answerInput.focus();

    // TIMER
    if (currentLevel === "medium" ||
        currentLevel === "custom") {
        startTimer();
    }

}


// TIMER
function startTimer() {
    clearInterval(timerInterval);
    timeLeft = gameTime;
    timerDisplay.textContent = timeLeft;
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timeUp();
        }
    }, 1000);
}


// WAKTU HABIS
function timeUp() {

    answerInput.disabled = true;

    wrong++;

    feedback.textContent =
        `⏰ Waktu habis! Jawaban: ${currentAnswer}`;

    feedback.classList.remove("hidden");

    nextButton.classList.remove("hidden");

}


// CEK JAWABAN
function checkAnswer() {

    clearInterval(timerInterval);

    const userAnswer =
        Number(answerInput.value);


    // Jangan proses kalau kosong
    if (answerInput.value.trim() === "") {

        feedback.textContent =
            "⚠️ Masukkan jawaban terlebih dahulu!";

        feedback.classList.remove("hidden");

        return;

    }


    answerInput.disabled = true;

    // BENAR
    if (userAnswer === currentAnswer) {

        correct++;

        score += 10;

        feedback.textContent =
            "✅ Benar!";

    }

    // SALAH
    else {

        wrong++;

        feedback.textContent =
            `❌ Salah! Jawaban yang benar: ${currentAnswer}`;

    }


    feedback.classList.remove("hidden");

    scoreDisplay.textContent =
        `⭐ ${score}`;

    nextButton.classList.remove("hidden");

}

// SELESAI GAME
function finishGame() {

    clearInterval(timerInterval);

    gamePage.classList.add("hidden");

    resultPage.classList.remove("hidden");


    // Score
    finalScore.textContent = score;

    // Benar
    correctCount.textContent = correct;

    // Salah
    wrongCount.textContent = wrong;


    // Akurasi
    const accuracyValue =
        totalQuestions > 0
            ? Math.round(
                (correct / totalQuestions) * 100
            )
            : 0;

    accuracy.textContent =
        `${accuracyValue}%`;

}


// MAIN LAGI
function restartGame() {

    resultPage.classList.add("hidden");

    settingPage.classList.remove("hidden");

    // Tampilkan setting sesuai level sebelumnya
    easySetting.classList.add("hidden");
    mediumSetting.classList.add("hidden");
    customSetting.classList.add("hidden");


    if (currentLevel === "easy") {

        settingTitle.textContent = "Easy";
        easySetting.classList.remove("hidden");

    }

    else if (currentLevel === "medium") {

        settingTitle.textContent = "Medium";
        mediumSetting.classList.remove("hidden");

    }

    else {

        settingTitle.textContent = "Custom";
        customSetting.classList.remove("hidden");

    }

}

// KEMBALI KE HOME
function goHome() {

    clearInterval(timerInterval);

    resultPage.classList.add("hidden");
    settingPage.classList.add("hidden");
    gamePage.classList.add("hidden");

    homePage.classList.remove("hidden");

}


// ENTER = JAWAB
answerInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        if (!answerInput.disabled) {
            checkAnswer();
        }
    }
});