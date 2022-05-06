var highScore = document.querySelector("#highScore");
var clearScores = document.querySelector("#clear");
var goBack = document.querySelector("#goBack");

// get all scores from localStorage
var scores = localStorage.getItem("scores");
scores = JSON.parse(scores);

if (scores) {
    for (var i = 0; i < scores.length; i++) {
        var createLi = document.createElement("li");
        createLi.textContent = scores[i].initials + " " + scores[i].score;
        createLi.setAttribute("class", "noSelect")
        highScore.appendChild(createLi);
    }
}

// clear stored scores from localStorage
clearScores.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

goBack.addEventListener("click", function () {
    window.location.replace("./index.html");
});