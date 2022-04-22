const question = document.getElementById("question");
const answers = Array.from(document.getElementsByClassName("answer-text"));
const startButton = document.getElementById("start-btn");
const timer = document.getElementById("timer");
const startingTime = 75;

let currentQuestion = {};
let score = 0;
let questionCounter = 0;
let usableQuestions = [];
let acceptAnswers = false;

let questions = [
    {
        question: "Commonly used data types do not include:",
        answer1: "booleans",
        answer2: "alerts",
        answer3: "strings",
        answer4: "intergers",
        correct: 2
    },
    {
        question: "The condition in an if/else statement is enclosed with ____.",
        answer1: "quotes",
        answer2: "curly brackets",
        answer3: "parenthesis",
        answer4: "square brackets",
        correct: 3
    },
    {
        question: "Arrays in JavaScript can be used to store ____.",
        answer1: "numbers and strings",
        answer2: "other arrays",
        answer3: "booleans",
        answer4: "all of the above",
        correct: 4
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        answer1: "commas",
        answer2: "curly brackets",
        answer3: "quotes",
        answer4: "parenthesis",
        correct: 3
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answer1: "JavaScript",
        answer2: "terminal/bash",
        answer3: "for loops",
        answer4: "console.log",
        correct: 4
    },
    
]


const QUESTION_POINTS = 20;
const TOTAL_QUESTIONS = 5;

quizStart = () => {
    var homePage = document.getElementById("home");
    var quizContainer = document.getElementById("quiz-container");
    homePage.classList.toggle("hide");
    quizContainer.classList.toggle("hide");

    questionCounter = 0;
    score = 0;
    usableQuestions = [...questions];

    getNextQuestion();
};

// updateTimer = () => {
//     const remainingTime = Math.floor(startingTime - 1);
//     let seconds = startingTime % 60;
    
//     timer.innerHTML = remainingTime;
//     remainingTime--
// };
// setInterval(updateTimer, 1000);

getNextQuestion = () => {
    
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * usableQuestions.length);
    currentQuestion = usableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    answers.forEach( answer => {
        const number = answer.dataset["number"];
        answer.innerText = currentQuestion["answer" + number];

    });

    usableQuestions.splice(questionIndex, 1);
    acceptAnswers = true;
};

answers.forEach( answer => {
    answer.addEventListener('click', e => {
        if (!acceptAnswers) return;

        acceptAnswers = false;
        const chosenAnswer = e.target;
        const chosenCorrect = chosenAnswer.dataset["number"];

        if (chosenCorrect == currentQuestion.correct || usableQuestions > 0) {
            score = QUESTION_POINTS + score;
            document.getElementById("feedback").innerHTML = "<p class='correct-answer'>PREVIOUS ANSWER WAS CORRECT!</p>";
        }
        else {
            document.getElementById("feedback").innerHTML = "<p class='incorrect-answer'>PREVIOUS ANSWER WAS INCORRECT!</p>";
        };

        if (usableQuestions.length > 0 || questionCounter > TOTAL_QUESTIONS) {
        getNextQuestion();
        }
        else {
            getHighscore();
        };
    });
});

getHighscore = () => {

    var quizContainer = document.getElementById("quiz-container");
    quizContainer.classList.toggle("hide");

    var highscorePage = document.getElementById("highscore-logger")
    highscorePage.classList.toggle("hide")

    document.getElementById("final-score").innerText = score;

};

const initials = document.getElementById("initials");
const logScore = document.getElementById("logScore");
const scoreSubmission = JSON.parse(localStorage.getItem("scoreSubmission")) || [];

saveScore = e => {
    e.preventDefault();

   const scoreInitials = 
   {
       score: score,
       name: initials.value,

   } ;
   scoreSubmission.push(scoreInitials)

   scoreSubmission.sort( (a,b) => b.score - a.score);

   localStorage.setItem("scoreSubmission", JSON.stringify(scoreSubmission))
};

const leaderboard = document.getElementById("leaderboard");

leaderboard.innerHTML = scoreSubmission
.map(scoreInitials => {
    return "${scoreInitials.name} - ${scoreInitials.score};"
})
.join;