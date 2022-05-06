// array of questions
var questions = [
    {
        title: "JavaScript is know as the programming language of the ________.",
        choices: ["Server", "Desktop", "Mobile", "Web"],
        answer: "Web"
    },
    {
        title: "In which HTML element do we put JavaScript code?",
        choices: ["<javascript>...</javascript>", "<script>...</script>", "<css>...</css>", "<js>...</js>"],
        answer: "<script>...</script>"
    },
    {
        title: "With which keyword can a datatype be declared to be a constant type?",
        choices: ["const", "let", "var", "constant"],
        answer: "const"
    },
    {
        title: "What keyword is used to check whether a given property is valid or not?",
        choices: ["is in", "exists", "in", "lies"],
        answer: "in"
    },
    {
        title: "Which function is used to serialize an object into a JSON string?",
        choices: ["parse()", "stringify()", "convert()", "None of the above"],
        answer: "stringify()"
    },
    {
        title: "Which of the following is not a JavaScript framework?",
        choices: ["Node", "Vue", "Cass", "React"],
        answer: "Cass"
    }, 
    {
        title: "Which keyword is used to declare an asynchronous function?",
        choices: ["await", "async", "wait", "setTimeout"],
        answer: "async"
    }, 
    {
        title: "How do you write a comment in JavaScript?",
        choices: ["#", "/* */", "$ $", "//"],
        answer: "//"
    }
];

// DOM variables
var time = document.querySelector("#time");
var timer = document.querySelector("#startButton");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper"); 

var timeRemaining = 80
var hold = 0;
var penalty = 10;
var score = 0;
var questionIndex = 0;

var ulCreate = document.createElement("ul");

// start time on button click
timer.addEventListener("click", function () {
    if (hold === 0) {
        hold = setInterval(function () {
            timeRemaining--;
            time.textContent = "Time " + timeRemaining;
            if (timeRemaining <= 0) {
                clearInterval(hold);
                done();
                timeRemaining.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

// render questions and choices to page
function render(questionIndex) {
    // clear existing data
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    // loop through array info 
    for (var i = 0; i < questions.length; i++) {
        var currentQuestion = questions[questionIndex].title;
        var currentChoices = questions[questionIndex].choices;
        // display question
        questionsDiv.textContent = currentQuestion;
        questionsDiv.appendChild(ulCreate);
    }

    // display choices
    currentChoices.forEach(function (choice) {
        var listItem = document.createElement("li");
        listItem.textContent = choice;
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

// compare user choice with answer
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // correct answer
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is: " + questions[questionIndex].answer;
        } else {
            // deduct penalty from remainingTime for wrong answer
            timeRemaining = timeRemaining - penalty;
            createDiv.textContent = "Incorrect! The correct answer is: " + questions[questionIndex].answer;
        }
    }

    // move to next question
    questionIndex++;

    if (questionIndex >= questions.length) {
        createDiv.textContent = "";
        done();
    } else {
        render(questionIndex);
    }

    questionsDiv.appendChild(createDiv);
}

// function to handle finished quiz
function done() {
    questionsDiv.innerHTML = "";
    timeRemaining.innerHTML = "";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "Congrats! You have finished the quiz.";
    questionsDiv.appendChild(createH1);

    var createDiv = document.createElement("div");
    createDiv.textContent = "Quiz complete!" + " You got " + score + "/" + questions.length + " correct!";
    questionsDiv.appendChild(createDiv);

    var createP = document.createElement("p");
    createP.setAttribute("class", "center")
    questionsDiv.appendChild(createP);

    // calculate remaining time and assign it to score
    if (timeRemaining >= 0) {
        var scoreP = document.createElement("p");
        scoreP.setAttribute("id", "scoreP")
        clearInterval(hold);
        scoreP.textContent = "Your final score is: " + timeRemaining + " points";
        questionsDiv.appendChild(scoreP);
    }


    var createLabel = document.createElement("label");
    createLabel.setAttribute("class", "center")
    createLabel.textContent = "Please enter your initials: ";
    questionsDiv.appendChild(createLabel);

    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.setAttribute("class", "center")
    createInput.textContent = "";
    questionsDiv.appendChild(createInput);

    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "submit");
    createSubmit.textContent = "Submit";
    questionsDiv.appendChild(createSubmit);

    // capture initials
    // save intials and score to localStorage
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;
        if (!initials) {
            console.log("No initials were entered")
        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var scores = localStorage.getItem("scores");
            if (!scores) {
                scores = [];
            } else {
                scores = JSON.parse(scores);
            }
            scores.push(finalScore);
            var newScore = JSON.stringify(scores);
            localStorage.setItem("scores", newScore);

            // redirect to high scores page
            window.location.replace("./highscores.html");
        }
    });
}