const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "High Text Markup Language", correct: false },
            { text: "Hyper Tabular Markup Language", correct: false }
        ]
    },
    {
        question: "Which language is used for styling web pages?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: true },
            { text: "JavaScript", correct: false }
        ]
    },
    {
        question: "What handles the dynamic logic of the quiz app?",
        answers: [
            { text: "CSS Transitions", correct: false },
            { text: "HTML Elements", correct: false },
            { text: "JavaScript", correct: true }
        ]
    }
];

const quizContainer = document.getElementById('quiz');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const resultContainer = document.getElementById('result');
const scoreText = document.getElementById('score-text');
const restartButton = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add('hide');
    quizContainer.classList.remove('hide');
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        if (answer.correct) button.dataset.correct = answer.correct;
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("wrong");
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === "true") button.classList.add("correct");
        button.disabled = true;
    });
    nextButton.classList.remove('hide');
}

function showScore() {
    resetState();
    quizContainer.classList.add('hide');
    resultContainer.classList.remove('hide');
    scoreText.innerHTML = `You scored ${score} out of ${questions.length}!`;
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

restartButton.addEventListener('click', startQuiz);
startQuiz();

