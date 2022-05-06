// array of questions
var questions = [
    {
        title: "quesiton 1",
        choices: ["q1c1", "g1c2", "q1c3", "q1c4"],
        answer: "q1c1"
    },
    {
        title: "question 2",
        choices: ["q2c1", "q2c2", "q2c3", "q2c4"],
        answer: "q2c2"
    },
    {
        title: "question 3",
        choices: ["q3c1", "q3c2", "q3c3", "q3c4"],
        answer: "q3c3"
    },
    {
        title: "question 4",
        choices: ["q4c1", "q2c4", "q4c3", "q4c4"],
        answer: "q4c4"
    }
]

var questionIndex = 0;

// DOM variables
var time = document.querySelector("#time");
var timer = document.querySelector("#startButton");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper"); 

var timeRemaining = 80
var penalized = 0;
var penalty = 10;
var score = 0;

var ulCreate = document.createElement("ul");

// start time on button click
timer.addEventListener("click", function () {
    if (penalized === 0) {
        penalized = setInterval(function () {
            timeRemaining--;
            time.textContent = "Time " + timeRemaining;
            if (timeRemaining <= 0) {
                clearInterval(penalized);
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
    }
    // display choices
    currentChoices.forEach(function (choice) {
        var listItem = document.createElement('li');
        listItem.textContent = choice;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", compare());
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
        done();
        createDiv.textContent = "Quiz complete!" + "You got " + score + "/" + questions.length + " correct!";
    } else {
        render(questionIndex);
    }

    questionsDiv.appendChild(createDiv);
}

// function to handle finished quiz
function done() {
    questionsDiv.innerHTML = "";
    timeRemaining.innerHTML = "";

    // create header
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "Congrats! You have finished the quiz.";
    questionsDiv.appendChild(createH1);

    // creaet paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");
    questionsDiv.appendChild(createP);

    // calculate remaining time and assign it to score
    if (timeRemaining >= 0) {
        var createP2 = document.createElement("p");
        clearInterval(penalized);
        createP2.textContent = "Your final score is: " + timeRemaining;
        questionsDiv.appendChild(createP2);
    }

    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Please enter your initials: ";
    questionsDiv.appendChild(createLabel);

    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
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
            var allScores = localStorage.getItem("allScores");
            if (!allScores) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);

            // redirect to high scores page
            window.location.replace("./highscores.html");
        }
    });
}