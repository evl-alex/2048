/* Welcome section */

let welcomeHeader = document.getElementById("userName");
welcomeHeader.innerHTML = getUserName();

function getUserName() {
    return "Alex";
}

/* Highscore section*/

let currentScore = document.getElementById("currentScore");
let personalBestScore = document.getElementById("personalBestScore");
let bestScore = document.getElementById("bestScore");

currentScore.innerHTML = getScore("current");
personalBestScore.innerHTML = getScore("personal");
bestScore.innerHTML = getScore("best");

function getScore(scoreType) {
    switch (scoreType) {
        case "current":
            return 1024;
        case "personal":
            return 2048;
        case "best":
            return 1488;
        default:
            return 0;
    }
}

/* Save game section */

let buttonNewGame = document.querySelector("button[name = newGame]");
let buttonSaveGame = document.querySelector("button[name = saveGame]");
let buttonLoadGame = document.querySelector("button[name = loadGame]");

buttonNewGame.addEventListener("click", clearField);
buttonSaveGame.addEventListener("click", saveGame);
buttonLoadGame.addEventListener("click", loadGame);

function clearField() {
    alert("Хуй!");
}

function saveGame() {
    alert("Development in progress");
}

function loadGame() {
    alert("Development in progress");
}

