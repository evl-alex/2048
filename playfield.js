/* Playfield section */
let field;

class Playfield {
    constructor (parent) {
        let table = document.createElement("table");
        table.setAttribute("id", "playTable");
        let tbody = document.createElement("tbody");
        let tiles = [ [], [], [], [] ]; // saving tiles on the field
        let cells = [ [], [], [], [] ]; // link to table cells

        for (let i = 0; i < 4; i++) {
            let tr = document.createElement('tr');

            for (let j = 0; j < 4; j++) {
                let td = document.createElement('td');
                cells[i][j] = td;
                tr.appendChild(td)
            }

            tbody.appendChild(tr);
        }

        table.appendChild(tbody);
        parent.appendChild(table);

        function addTile(y, x, n) {
            if (tiles[y][x]){
                console.log(`Error creating tile at ${y},${x}. Cell already taken.`)
            }

            tiles[y][x] = new Tile(y, x, n);
            cells[y][x].appendChild(tiles[y][x].element);
        }

        function removeTile(y, x) {
            cells[y][x].removeChild(cells[y][x].firstElementChild);
            delete tiles[y][x];
        }

        function moveTile(y, x, ny, nx) {
            /* Check is input is correct */
            if (!tiles[y][x]) {
                console.log(`Error while moving ${y},${x} to ${ny},${nx}: incorrect cords ${y},${x}`);
                return;
            } else if (tiles[ny][nx]) {
                console.log(`Error while moving ${y},${x} to ${ny},${nx}: ${ny},${nx} not empty`);
                return;
            }

            /* Add tile */
            addTile(ny, nx, tiles[y][x].value);
            removeTile(y, x);
        }

        function sumTiles(y, x, ny, nx) {
            if (tiles[y][x].value === 2048) return;
            removeTile(ny, nx);
            addTile(ny, nx, tiles[y][x].value * 2);
            removeTile(y, x);
        }

        function addRandomTile() {
            /* Add new "2" tile to empty cell */
            function randomInteger(min, max) {
                let rand = min - 0.5 + Math.random() * (max - min + 1);
                rand = Math.round(rand);
                return rand;
            }

            let y = randomInteger(0, 3);
            let x = randomInteger(0, 3);

            while(tiles[y][x]){
                y = randomInteger(0, 3);
                x = randomInteger(0, 3);
            }

            addTile(y, x, 2);
        }

        function getBestScore () {
            let maxTile = 2;

            for (let i = 0; i < tiles.length; i++) {
                for (let j = 0; j < tiles[i].length; j++) {
                    if (tiles[i][j]) maxTile = (tiles[i][j].value > maxTile) ? tiles[i][j].value : maxTile;
                }
            }

            let currentScore = document.getElementById("currentScore");
            let personalBestScore = document.getElementById("personalBestScore");
            let bestScore = document.getElementById("bestScore");

            if (maxTile > currentScore.innerHTML) currentScore.innerHTML = maxTile;
            if (maxTile > personalBestScore.innerHTML) personalBestScore.innerHTML = maxTile;
            if (maxTile > bestScore.innerHTML) bestScore.innerHTML = maxTile;
        }

        this.moveAllTiles = function (keyCode) {
            let movedAnyTile = false;

            switch (keyCode) {
                case 37:
                    console.log("LEFT arrow pressed");
                    for (let y = 0; y < 4; y++) {
                        for (let x = 1; x < 4; x++) {
                            if (tiles[y][x]) {
                                let nextCell = null;

                                for (let i = x - 1; i >= 0; i--) {
                                    if (tiles[y][i]) {
                                        if (tiles[y][i].value === tiles[y][x].value) {
                                            sumTiles(y, x, y, i);
                                            nextCell = null;
                                            movedAnyTile = true;
                                            break;
                                        }
                                    } else nextCell = i;
                                }

                                if (nextCell !== null) {
                                    moveTile(y, x, y, nextCell);
                                    movedAnyTile = true;
                                }
                            }
                        }
                    }
                    break;

                case 38:
                    console.log("UP arrow pressed");
                    for (let x = 0; x < 4; x++) {
                        for (let y = 1; y < 4; y++) {
                            if (tiles[y][x]) {
                                let nextCell = null;

                                for (let i = y - 1; i >= 0; i--) {
                                    if (tiles[i][x]) {
                                        if (tiles[i][x].value === tiles[y][x].value) {
                                            sumTiles(y, x, i, x);
                                            nextCell = null;
                                            movedAnyTile = true;
                                            break;
                                        }
                                    } else nextCell = i;
                                }

                                if (nextCell !== null) {
                                    moveTile(y, x, nextCell, x);
                                    movedAnyTile = true;
                                }
                            }
                        }
                    }
                    break;

                case 39:
                    console.log("RIGHT arrow pressed");
                    for (let y = 0; y < 4; y++) {
                        for (let x = 2; x >= 0; x--) {
                            if (tiles[y][x]) {
                                let nextCell = null;

                                for (let i = x + 1; i < 4; i++) {
                                    if (tiles[y][i]) {
                                        if (tiles[y][i].value === tiles[y][x].value) {
                                            sumTiles(y, x, y, i);
                                            nextCell = null;
                                            movedAnyTile = true;
                                            break;
                                        }
                                    } else nextCell = i;
                                }

                                if (nextCell !== null) {
                                    moveTile(y, x, y, nextCell);
                                    movedAnyTile = true;
                                }
                            }
                        }
                    }
                    break;

                case 40:
                    console.log("DOWN arrow pressed");
                    for (let x = 0; x < 4; x++) {
                        for (let y = 2; y >= 0; y--) {
                            if (tiles[y][x]) {
                                let nextCell = null;

                                for (let i = y + 1; i < 4; i++) {
                                    if (tiles[i][x]) {
                                        if (tiles[i][x].value === tiles[y][x].value) {
                                            sumTiles(y, x, i, x);
                                            nextCell = null;
                                            movedAnyTile = true;
                                            break;
                                        }
                                    } else nextCell = i;
                                }

                                if (nextCell !== null) {
                                    moveTile(y, x, nextCell, x);
                                    movedAnyTile = true;
                                }
                            }
                        }
                    }
                    break;

                default:
                    return;
            }

            if (movedAnyTile) {
                addRandomTile();
                getBestScore();
            }
        };

        addRandomTile();
        addRandomTile();
    }



}

class Tile {
    constructor (y, x, n) {
        this.value = n;
        this.element = document.createElement("div");
        this.element.className = `n${this.value}`;
    }
}

function newGame() {
    let playtable = document.getElementById("playTable");
    let currentScore = document.getElementById("currentScore");

    if (playtable) playtable.parentElement.removeChild(playtable);

    field = new Playfield(document.querySelector(".playField"));
    currentScore.innerHTML = 2;
}

function handleKeypress(event) {
    if (event.keyCode === 37 || event.keyCode === 38 ||
        event.keyCode === 39 || event.keyCode === 40){
        event.preventDefault();
        field.moveAllTiles(event.keyCode);
    }
}

newGame();
document.addEventListener("keydown", handleKeypress);