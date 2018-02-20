/* Playfield section */

class Playfield {
    constructor (parent) {
        this.table = document.createElement("table");
        let tbody = document.createElement("tbody");
        this.tiles = [ [], [], [], [] ]; // saving tiles on the field
        this.cells = [ [], [], [], [] ]; // link to table cells

        for (let i = 0; i < 4; i++) {
            let tr = document.createElement('tr');

            for (let j = 0; j < 4; j++) {
                let td = document.createElement('td');
                this.cells[i][j] = td;
                tr.appendChild(td)
            }

            tbody.appendChild(tr);
        }

        this.table.appendChild(tbody);
        parent.appendChild(this.table);
    }

    addTile(y, x, n) {
        if (this.tiles[y][x]){
            console.log(`Error creating tile at ${y},${x}. Cell already taken.`)
        }

        this.tiles[y][x] = new Tile(y, x, n);
        this.cells[y][x].appendChild(this.tiles[y][x].element);
    }

    removeTile(y, x) {
        this.cells[y][x].removeChild(this.cells[y][x].firstElementChild);
        delete this.tiles[y][x];
    }

    moveTile(y, x, ny, nx) {
        // Check is input is correct
        if (!this.tiles[y][x]) {
            console.log(`Error while moving ${y},${x} to ${ny},${nx}: incorrect cords ${y},${x}`);
            return;
        } else if (this.tiles[ny][nx]) {
            console.log(`Error while moving ${y},${x} to ${ny},${nx}: ${ny},${nx} not empty`);
            return;
        }

        // Add tile
        this.addTile(ny, nx, this.tiles[y][x].value);
        this.removeTile(y, x);
    }

    sumTiles(y, x, ny, nx){
        if (this.tiles[y][x].value === 2048) return;
        this.removeTile(ny, nx);
        this.addTile(ny, nx, this.tiles[y][x].value * 2);
        this.removeTile(y, x);
    }

    addRandomTile() {
        // Add new "2" tile to empty cell
        function randomInteger(min, max) {
            let rand = min - 0.5 + Math.random() * (max - min + 1);
            rand = Math.round(rand);
            return rand;
        }

        let y = randomInteger(0, 3);
        let x = randomInteger(0, 3);

        while(this.tiles[y][x]){
            console.log(`Random tile to cell ${y},${x}`);
            y = randomInteger(0, 3);
            x = randomInteger(0, 3);
        }

        this.addTile(y, x, 2);
    }

    moveAllTiles(keyCode) {
        this.addRandomTile();

        switch (keyCode) {
            case 37:
                console.log("LEFT arrow pressed");
                for (let y = 0; y < 4; y++) {
                    for (let x = 1; x < 4; x++) {
                        if (this.tiles[y][x]) {
                            let nextCell = null;

                            for (let i = x - 1; i >= 0; i--) {
                                if (this.tiles[y][i]) {
                                    if (this.tiles[y][i].value === this.tiles[y][x].value) this.sumTiles(y, x, y, i);
                                    break;
                                } else nextCell = i;
                            }

                            if (nextCell !== null) this.moveTile(y, x, y, nextCell);
                        }
                    }
                }
                break;

            case 38:
                console.log("UP arrow pressed");
                for (let x = 0; x < 4; x++) {
                    for (let y = 1; y < 4; y++) {
                        if (this.tiles[y][x]) {
                            let nextCell = null;

                            for (let i = y - 1; i >= 0; i--) {
                                if (this.tiles[i][x]) {
                                    if (this.tiles[i][x].value === this.tiles[y][x].value) this.sumTiles(y, x, y, i);
                                    break;
                                } else nextCell = i;
                            }

                            if (nextCell !== null) this.moveTile(y, x, nextCell, x);
                        }
                    }
                }
                break;

            case 39:
                console.log("RIGHT arrow pressed");
                for (let y = 0; y < 4; y++) {
                    for (let x = 2; x >= 0; x--) {
                        if (this.tiles[y][x]) {
                            let nextCell = null;

                            for (let i = x + 1; i < 4; i++) {
                                if (this.tiles[y][i]) {
                                    if (this.tiles[y][i].value === this.tiles[y][x].value) this.sumTiles(y, x, y, i);
                                    break;
                                } else nextCell = i;
                            }

                            if (nextCell !== null) this.moveTile(y, x, y, nextCell);
                        }
                    }
                }
                break;

            case 40:
                console.log("DOWN arrow pressed");
                for (let x = 0; x < 4; x++) {
                    for (let y = 2; y >= 0; y--) {
                        if (this.tiles[y][x]) {
                            let nextCell = null;

                            for (let i = y + 1; i < 4; i++) {
                                if (this.tiles[i][x]) {
                                    if (this.tiles[i][x].value === this.tiles[y][x].value) this.sumTiles(y, x, i, x);
                                    break;
                                } else nextCell = i;
                            }

                            if (nextCell !== null) this.moveTile(y, x, nextCell, x);
                        }
                    }
                }
                break;

            default:
                return;
        }
    };
}

class Tile {
    constructor (y, x, n) {
        this.value = n;
        this.element = document.createElement("div");
        this.element.className = `n${this.value}`;
    }
}

document.addEventListener("keydown", handleKeypress);

function handleKeypress(event) {
    if (event.keyCode === 37 || event.keyCode === 38 ||
        event.keyCode === 39 || event.keyCode === 40){
        event.preventDefault();
        field.moveAllTiles(event.keyCode);
    }
}

let field = new Playfield(document.querySelector(".playField"));

field.addTile(0, 1, 4);
field.addTile(1, 0, 32);
field.addTile(1, 1, 32);
field.addTile(1, 3, 2);
field.addTile(2, 0, 16);
field.addTile(2, 1, 8);
// field.addTile(3, 2, 8);
// field.moveTile(1, 3, 0, 1);