const question = document.getElementById("question");
const answers = Array.from(document.getElementsByClassName("answer-text"));
const startButton = document.getElementById("start-btn");
const timer = document.getElementById("timer");
const startingTime = 60;

let currentQuestion = {};
let score = 0;
console.log(score)
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


		// setInterval( countdown(),{
		// 	startingTime--,

		// 	if(startingTime >= 0 ){
		// 		timer.innerHTML = "<p>startingTime</p>";
		// 	}

		// 	if( startingTime === 0 ){
		// 		timer.innerHTML = "COMPLETE";
		// 	}
		// }, 1000);
	

    getNextQuestion();
};


getNextQuestion = () => {
    if(usableQuestions.length === 0 || questionCounter > TOTAL_QUESTIONS) {
        // Show Highscore section
        getHighscore();

    };
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
        console.log(chosenCorrect == currentQuestion.correct);

        if (chosenCorrect == currentQuestion.correct || usableQuestions > 0) {
            score = QUESTION_POINTS + score;
            console.log(score)
            document.getElementById("feedback").innerHTML = "<p class='correct-answer'>PREVIOUS ANSWER WAS CORRECT!</p>";
        }
        else {
            document.getElementById("feedback").innerHTML = "<p class='incorrect-answer'>PREVIOUS ANSWER WAS INCORRECT!</p>";
        };

        getNextQuestion();

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

saveScore = e => {
    e.preventDefault();

   const scoreSubmission = {
       score: score,
       name: initials.value,

   } ;
   JSON.stringify(scoreSubmission);

   const scoreLog = JSON.stringify(scoreSubmission);

   console.log(scoreSubmission);
   localStorage.setItem(scoreSubmission);
   scoreLog.push(scoreSubmission)
};