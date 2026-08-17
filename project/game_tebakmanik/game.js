// DATA SOAL
// Membuat data gambar 1.png sampai 99.png otomatis

const questions = [];

for (let number = 1; number <= 99; number++) {

    questions.push({
        image: `img_kartumanik/${number}.png`,
        answer: number
    });

}


// VARIABEL GAME
let selectedLevel = "";

let selectedType = "";

let selectedTime = 0;

let totalQuestions = 10;

let gameQuestions = [];

let currentQuestion = 0;

let score = 0;

let correct = 0;

let wrong = 0;

let timerInterval = null;

// PILIH LEVEL
function selectLevel(level) {

    selectedLevel = level;


    // Sembunyikan home

    document
        .getElementById("homePage")
        .classList.add("hidden");


    // Tampilkan setting

    document
        .getElementById("settingPage")
        .classList.remove("hidden");


    // Sembunyikan semua setting

    document
        .getElementById("easySetting")
        .classList.add("hidden");

    document
        .getElementById("mediumSetting")
        .classList.add("hidden");

    document
        .getElementById("customSetting")
        .classList.add("hidden");


    const title =
        document.getElementById("settingTitle");



    // EASY

    if (level === "easy") {

        title.textContent = "Easy";

        document
            .getElementById("easySetting")
            .classList.remove("hidden");

    }



    // MEDIUM

    else if (level === "medium") {

        title.textContent = "Medium";

        document
            .getElementById("mediumSetting")
            .classList.remove("hidden");

    }



    // CUSTOM

    else if (level === "custom") {

        title.textContent = "Custom";

        document
            .getElementById("customSetting")
            .classList.remove("hidden");

    }

}

// MULAI GAME
function startGame() {

    clearInterval(timerInterval);

    // EASY
    if (selectedLevel === "easy") {

        selectedType =
            document.getElementById("easyType").value;

        totalQuestions = 10;

        selectedTime = 0;

    }

    // MEDIUM
    else if (selectedLevel === "medium") {

        selectedType =
            document.getElementById("mediumType").value;

        totalQuestions = 20;

        selectedTime = 5;

    }

    // CUSTOM
    else if (selectedLevel === "custom") {

        selectedType =
            document.getElementById("customType").value;


        totalQuestions =
            Number(
                document.getElementById("questionCount").value
            );


        selectedTime =
            Number(
                document.getElementById("customTime").value
            );

    }


    // FILTER SOAL
    let availableQuestions;

    // SATUAN
    if (selectedType === "satuan") {

        availableQuestions =
            questions.filter(
                question =>
                    question.answer >= 1 &&
                    question.answer <= 9
            );

    }

    // PULUHAN
    else if (selectedType === "puluhan") {

        availableQuestions =
            questions.filter(
                question =>
                    question.answer >= 10 &&
                    question.answer <= 99
            );

    }

   // MIX
    else if (selectedType === "mix") {

        availableQuestions =
            questions;

    }

    // BUAT SOAL RANDOM
    gameQuestions = [];


    for (
        let i = 0;
        i < totalQuestions;
        i++
    ) {

        const randomIndex =
            Math.floor(
                Math.random() *
                availableQuestions.length
            );


        gameQuestions.push(
            availableQuestions[randomIndex]
        );

    }

    // RESET GAME
    currentQuestion = 0;

    score = 0;

    correct = 0;

    wrong = 0;

    // PINDAH KE GAME
    document
        .getElementById("settingPage")
        .classList.add("hidden");


    document
        .getElementById("gamePage")
        .classList.remove("hidden");


    updateScore();

    showQuestion();

}

// TAMPILKAN SOAL
function showQuestion() {

    clearInterval(timerInterval);


    const question =
        gameQuestions[currentQuestion];



    // Nomor soal

    document
        .getElementById("questionNumber")
        .textContent =
        `Soal ${currentQuestion + 1} / ${totalQuestions}`;



    // Gambar

    document
        .getElementById("questionImage")
        .src = question.image;



    // Input

    const input =
        document.getElementById("answerInput");


    input.value = "";

    input.disabled = false;



    // Tombol jawab

    document
        .querySelector(".answer-button")
        .disabled = false;



    // Feedback

    document
        .getElementById("feedback")
        .classList.add("hidden");



    // Tombol next

    document
        .getElementById("nextButton")
        .classList.add("hidden");



    // Gambar terlihat

    document
        .getElementById("questionImage")
        .style.visibility = "visible";

    // EASY
    if (selectedLevel === "easy") {

        document
            .getElementById("timerContainer")
            .classList.add("hidden");

        return;

    }

    // MEDIUM / CUSTOM
    document
        .getElementById("timerContainer")
        .classList.remove("hidden");


    startImageTimer();

}

// TIMER
function startImageTimer() {

    let remainingTime = selectedTime;


    const timer =
        document.getElementById("timer");


    timer.textContent =
        remainingTime;



    timerInterval =
        setInterval(() => {

            remainingTime--;

            timer.textContent =
                remainingTime;



            if (remainingTime <= 0) {

                clearInterval(timerInterval);


                document
                    .getElementById("questionImage")
                    .style.visibility = "hidden";

            }

        }, 1000);

}

// CEK JAWABAN
function checkAnswer() {

    const input =
        document.getElementById("answerInput");


    // Tidak boleh kosong

    if (input.value.trim() === "") {

        alert("Silakan masukkan jawaban.");

        return;

    }


    const userAnswer =
        Number(input.value);


    const correctAnswer =
        gameQuestions[currentQuestion].answer;


    // Stop timer

    clearInterval(timerInterval);


    // Disable input

    input.disabled = true;


    document
        .querySelector(".answer-button")
        .disabled = true;

    // BENAR
    if (userAnswer === correctAnswer) {

        correct++;

        // 1 soal = 10 poin

        score += 10;


        showFeedback(
            `✅ BENAR! Jawabannya ${correctAnswer}`,
            true
        );

    }

    // SALAH
    else {

        wrong++;


        showFeedback(
            `❌ SALAH! Jawaban yang benar: ${correctAnswer}`,
            false
        );

    }


    updateScore();

    // EASY
    if (selectedLevel === "easy") {

        document
            .getElementById("nextButton")
            .classList.remove("hidden");

        return;

    }

    // MEDIUM / CUSTOM
    setTimeout(() => {

        nextQuestion();

    }, 1000);

}

// FEEDBACK
function showFeedback(message, isCorrect) {

    const feedback =
        document.getElementById("feedback");


    feedback.textContent =
        message;


    feedback.classList.remove("hidden");

}


// NEXT QUESTION
function nextQuestion() {

    currentQuestion++;


    if (
        currentQuestion >= totalQuestions
    ) {

        showResult();

        return;

    }


    showQuestion();

}

// SELESAI
function finishGame() {

    clearInterval(timerInterval);

    showResult();

}

// UPDATE SCORE
function updateScore() {

    document
        .getElementById("score")
        .textContent =
        `⭐ ${score}`;

}


// HASIL
function showResult() {

    clearInterval(timerInterval);


    document
        .getElementById("gamePage")
        .classList.add("hidden");


    document
        .getElementById("resultPage")
        .classList.remove("hidden");



    // Score

    document
        .getElementById("finalScore")
        .textContent = score;



    // Benar

    document
        .getElementById("correctCount")
        .textContent = correct;



    // Salah

    document
        .getElementById("wrongCount")
        .textContent = wrong;



    // Akurasi

    const accuracy =
        totalQuestions === 0
            ? 0
            : Math.round(
                (correct / totalQuestions) * 100
            );


    document
        .getElementById("accuracy")
        .textContent =
        `${accuracy}%`;

}

// MAIN LAGI
function restartGame() {

    document
        .getElementById("resultPage")
        .classList.add("hidden");


    document
        .getElementById("gamePage")
        .classList.remove("hidden");


    startGame();

}


// KEMBALI KE HOME
function goHome() {

    clearInterval(timerInterval);


    document
        .getElementById("settingPage")
        .classList.add("hidden");


    document
        .getElementById("gamePage")
        .classList.add("hidden");


    document
        .getElementById("resultPage")
        .classList.add("hidden");


    document
        .getElementById("homePage")
        .classList.remove("hidden");

}



// ENTER = JAWAB
document
    .getElementById("answerInput")
    .addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                checkAnswer();

            }

        }
    );