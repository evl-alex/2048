
function getUserName() {
    return "Alex";
}

/* Welcome section */

let welcomeHeader = document.getElementById("userName");
welcomeHeader.innerHTML = getUserName();

/* Save game section */

let buttonNewGame = document.querySelector("button[name = newGame]");
let buttonSaveGame = document.querySelector("button[name = saveGame]");
let buttonLoadGame = document.querySelector("button[name = loadGame]");

function saveGame() {
    alert("Development in progress");
}

function loadGame() {
    alert("Development in progress");
}

buttonNewGame.addEventListener("click", newGame);
buttonSaveGame.addEventListener("click", saveGame);
buttonLoadGame.addEventListener("click", loadGame);