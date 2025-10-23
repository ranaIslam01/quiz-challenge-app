// DOM এলিমেন্টগুলো সিলেক্ট করা
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

// ✨ নতুন: সাউন্ড ইফেক্ট
const correctSound = new Audio('correct.mp3');
const wrongSound = new Audio('wrong.mp3');

// ✨ নতুন: আরও প্রশ্ন যোগ করা
const questions = [
  { q: "HTML এর পূর্ণরূপ কী?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyperlink and Text Language"], answer: "Hyper Text Markup Language" },
  { q: "কোন CSS ফ্রেমওয়ার্কটি 'Utility-First' নীতির উপর ভিত্তি করে তৈরি?", options: ["Bootstrap", "Tailwind CSS", "Foundation"], answer: "Tailwind CSS" },
  { q: "JavaScript এ একটি ভ্যারিয়েবল ডিক্লেয়ার করার জন্য কোন কীওয়ার্ডটি এখন আর ব্যবহার করা উচিত নয়?", options: ["let", "const", "var"], answer: "var" },
  { q: "কোন ট্যাগটি ব্যবহার করে একটি এক্সটার্নাল JavaScript ফাইল যুক্ত করা হয়?", options: ["<script>", "<js>", "<link>"], answer: "<script>" },
  { q: "CSS এর 'Cascading' বলতে কী বোঝায়?", options: ["স্টাইল ওপর থেকে নিচে প্রবাহিত হয়", "এটি একটি অ্যানিমেশন", "এটি একটি ফ্রেমওয়ার্ক"], answer: "স্টাইল ওপর থেকে নিচে প্রবাহিত হয়" },
  { q: "JavaScript এর `===` অপারেটর কী চেক করে?", options: ["শুধুমাত্র মান", "মান এবং টাইপ উভয়ই", "শুধুমাত্র টাইপ"], answer: "মান এবং টাইপ উভয়ই" },
  { q: "একটি ওয়েবসাইটে Favicon কী?", options: ["একটি বিশেষ ফন্ট", "ব্রাউজার ট্যাবের ছোট আইকন", "একটি জাভাস্ক্রিপ্ট লাইব্রেরি"], answer: "ব্রাউজার ট্যাবের ছোট আইকন" },
  { q: "API এর পূর্ণরূপ কী?", options: ["Application Programming Interface", "Advanced Programming Input", "Application Process Integration"], answer: "Application Programming Interface" }
];

let currentQuestionIndex = 0;
let score = 0;
let timer; // ✨ নতুন: টাইমার ভ্যারিয়েবল
let timeLeft = 10; // প্রতিটি প্রশ্নের জন্য ১০ সেকেন্ড সময়

// ইভেন্ট লিসেনার
startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', restartQuiz);

function startQuiz() {
    startScreen.classList.add('hidden');
    resultScreen.classList.add('hidden');
    questionScreen.classList.remove('hidden');
    
    currentQuestionIndex = 0;
    score = 0;
    
    showQuestion();
}

function showQuestion() {
    resetState();
    
    // ✨ নতুন: প্রোগ্রেস বার আপডেট করা
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

    // ✨ নতুন: টাইমার শুরু করা
    timeLeft = 10;
    timerDisplay.innerText = timeLeft;
    timerDisplay.classList.remove('border-red-500'); // টাইমারের বর্ডার স্বাভাবিক করা
    timerDisplay.classList.add('border-yellow-400');
    startTimer();
}

// ✨ নতুন: টাইমার ফাংশন
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = timeLeft;
        if (timeLeft <= 3) {
            timerDisplay.classList.remove('border-yellow-400');
            timerDisplay.classList.add('border-red-500'); // সময় শেষ হওয়ার কাছাকাছি এলে বর্ডার লাল হবে
        }
        if (timeLeft === 0) {
            clearInterval(timer);
            feedback.innerText = "⏰ সময় শেষ!";
            feedback.classList.add('text-yellow-400');
            disableOptionsAndShowCorrectAnswer(); // সময় শেষ হলে সঠিক উত্তর দেখিয়ে দেবে
            setTimeout(goToNextQuestion, 2000); // ২ সেকেন্ড পর পরের প্রশ্নে যাবে
        }
    }, 1000);
}

function resetState() {
    clearInterval(timer); // নতুন প্রশ্ন আসার আগে পুরোনো টাইমার বন্ধ করা
    feedback.innerText = '';
    feedback.classList.remove('text-green-400', 'text-red-400', 'text-yellow-400');
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
}

function selectAnswer(selectedOption, button) {
    clearInterval(timer); // উত্তর দেওয়ার সাথে সাথে টাইমার বন্ধ
    const correct = questions[currentQuestionIndex].answer;

    disableOptionsAndShowCorrectAnswer();

    if (selectedOption === correct) {
        score++;
        feedback.innerText = "✅ সঠিক উত্তর!";
        feedback.classList.add('text-green-400');
        button.classList.remove('bg-slate-700');
        button.classList.add('bg-green-500');
        correctSound.play(); // ✨ নতুন: সঠিক উত্তরের সাউন্ড
    } else {
        feedback.innerText = "❌ ভুল উত্তর!";
        feedback.classList.add('text-red-400');
        button.classList.remove('bg-slate-700');
        button.classList.add('bg-red-500');
        wrongSound.play(); // ✨ নতুন: ভুল উত্তরের সাউন্ড
    }
    
    scoreDisplay.innerText = `স্কোর: ${score}`;
    setTimeout(goToNextQuestion, 2000); // ২ সেকেন্ড পর পরের প্রশ্নে যাবে
}

// ✨ নতুন: অপশন ডিজেবল এবং সঠিক উত্তর দেখানোর জন্য একটি আলাদা ফাংশন
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

// ✨ নতুন: পরের প্রশ্নে যাওয়ার জন্য একটি ফাংশন
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
    
    // ফাইনাল প্রোগ্রেস বার ১০০% করা
    progressBar.style.width = '100%';
    
    finalScore.innerText = `আপনার চূড়ান্ত স্কোর: ${score} / ${questions.length}`;
}

function restartQuiz() {
    startScreen.classList.remove('hidden');
    resultScreen.classList.add('hidden');
}
