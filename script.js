// DOM এলিমেন্টগুলো
const startScreen = document.getElementById('start-screen');
const questionScreen = document.getElementById('question-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const questionCounter = document.getElementById('question-counter');
const scoreDisplay = document.getElementById('score');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedback = document.getElementById('feedback');
const finalScore = document.getElementById('final-score');
const progressBar = document.getElementById('progress-bar');
const timerDisplay = document.getElementById('timer');
const startScreenHighScore = document.getElementById('start-screen-highscore');
const resultScreenHighScore = document.getElementById('result-screen-highscore');
const startButtonContainer = document.getElementById('start-button-container');
const loadingMessage = document.getElementById('loading-message');

// সাউন্ড ইফেক্ট
const correctSound = new Audio('correct.mp3');
const wrongSound = new Audio('wrong.mp3');

// ভ্যারিয়েবল
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;
let highScore = localStorage.getItem('quizHighScore') || 0;

// API থেকে প্রশ্ন আনার ফাংশন
async function fetchQuestions() {
    startButtonContainer.classList.add('hidden');
    loadingMessage.classList.remove('hidden');
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=10&category=18&type=multiple' ); // category=18 মানে কম্পিউটার সায়েন্স
        const data = await response.json();
        questions = data.results.map(apiQuestion => {
            const formattedQuestion = {
                q: he.decode(apiQuestion.question),
                options: [...apiQuestion.incorrect_answers.map(a => he.decode(a)), he.decode(apiQuestion.correct_answer)],
                answer: he.decode(apiQuestion.correct_answer)
            };
            formattedQuestion.options.sort(() => Math.random() - 0.5);
            return formattedQuestion;
        });
        startButtonContainer.classList.remove('hidden');
        loadingMessage.classList.add('hidden');
    } catch (error) {
        loadingMessage.innerText = "প্রশ্ন লোড করা যায়নি। ইন্টারনেট সংযোগ পরীক্ষা করুন।";
        console.error("Failed to fetch questions:", error);
    }
}

// হাই-স্কোর দেখানো
function displayHighScore() {
    startScreenHighScore.innerText = `সর্বোচ্চ স্কোর: ${highScore}`;
    resultScreenHighScore.innerText = `সর্বোচ্চ স্কোর: ${highScore}`;
}

// ইভেন্ট লিসেনার
startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', restartQuiz);

window.onload = () => {
    displayHighScore();
    fetchQuestions();
};

function startQuiz() {
    if (questions.length === 0) {
        alert("প্রশ্ন এখনো লোড হয়নি। অনুগ্রহ করে কিছুক্ষণ অপেক্ষা করুন।");
        return;
    }
    startScreen.classList.add('hidden');
    questionScreen.classList.remove('hidden');
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function restartQuiz() {
    displayHighScore();
    fetchQuestions();
    startScreen.classList.remove('hidden');
    resultScreen.classList.add('hidden');
    questionScreen.classList.add('hidden');
}

function showQuestion() {
    resetState();
    const progressPercentage = (currentQuestionIndex / questions.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    const currentQuestion = questions[currentQuestionIndex];
    questionCounter.innerText = `প্রশ্ন ${currentQuestionIndex + 1} / ${questions.length}`;
    scoreDisplay.innerText = `স্কোর: ${score}`;
    questionText.innerText = currentQuestion.q;
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('bg-slate-700', 'text-left', 'p-4', 'rounded-lg', 'hover:bg-cyan-700', 'transition-all', 'duration-200');
        button.addEventListener('click', () => selectAnswer(option, button));
        optionsContainer.appendChild(button);
    });
    timeLeft = 10;
    timerDisplay.innerText = timeLeft;
    timerDisplay.classList.remove('border-red-500');
    timerDisplay.classList.add('border-yellow-400');
    startTimer();
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = timeLeft;
        if (timeLeft <= 3) {
            timerDisplay.classList.remove('border-yellow-400');
            timerDisplay.classList.add('border-red-500');
        }
        if (timeLeft === 0) {
            clearInterval(timer);
            feedback.innerText = "⏰ সময় শেষ!";
            feedback.classList.add('text-yellow-400');
            disableOptionsAndShowCorrectAnswer();
            setTimeout(goToNextQuestion, 2000);
        }
    }, 1000);
}

function resetState() {
    clearInterval(timer);
    feedback.innerText = '';
    feedback.classList.remove('text-green-400', 'text-red-400', 'text-yellow-400');
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
}

function selectAnswer(selectedOption, button) {
    clearInterval(timer);
    disableOptionsAndShowCorrectAnswer();
    const correct = questions[currentQuestionIndex].answer;
    if (selectedOption === correct) {
        score++;
        feedback.innerText = "✅ সঠিক উত্তর!";
        feedback.classList.add('text-green-400');
        button.classList.remove('bg-slate-700');
        button.classList.add('bg-green-500');
        correctSound.play();
    } else {
        feedback.innerText = "❌ ভুল উত্তর!";
        feedback.classList.add('text-red-400');
        button.classList.remove('bg-slate-700');
        button.classList.add('bg-red-500');
        wrongSound.play();
    }
    scoreDisplay.innerText = `স্কোর: ${score}`;
    setTimeout(goToNextQuestion, 2000);
}

function disableOptionsAndShowCorrectAnswer() {
    const correct = questions[currentQuestionIndex].answer;
    const allButtons = optionsContainer.children;
    Array.from(allButtons).forEach(btn => {
        btn.disabled = true;
        if (btn.innerText === correct) {
            btn.classList.remove('bg-slate-700', 'hover:bg-cyan-700');
            btn.classList.add('bg-green-500');
        }
    });
}

function goToNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    questionScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    progressBar.style.width = '100%';
    finalScore.innerText = `আপনার চূড়ান্ত স্কোর: ${score} / ${questions.length}`;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('quizHighScore', highScore);
        resultScreenHighScore.innerText = `🎉 নতুন সর্বোচ্চ স্কোর: ${highScore}`;
    } else {
        resultScreenHighScore.innerText = `সর্বোচ্চ স্কোর: ${highScore}`;
    }
}
