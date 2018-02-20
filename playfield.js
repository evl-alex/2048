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
        if (!this.tiles[y][x]) {
            console.log(`Error while moving ${y},${x} to ${ny},${nx}: incorrect cords ${y},${x}`);
            return;
        } else if (this.tiles[ny][nx]) {
            console.log(`Error while moving ${y},${x} to ${ny},${nx}: ${ny},${nx} not empty`);
            return;
        }

        this.addTile(ny, nx, this.tiles[y][x].value);
        this.removeTile(y, x);
    }

    moveAllTiles(keyCode) {
        switch (keyCode) {
            case 37:
                for (let y = 0; y < 4; y++) {
                    for (let x = 1; x < 4; x++) {
                        if (this.tiles[y][x]) {
                            let i = 0;
                            while (i < 4 && this.tiles[y][i]) {
                                if (i < x && this.tiles[y][i].value) {
                                    alert(`Left to the ${this.tiles[y][x].value} is tile ${this.tiles[y][i].value}`);
                                }
                                i++;
                            }

                            if (i < x) {
                                this.moveTile(y, x, y, i);
                            }
                        }
                    }
                }
                console.log("LEFT arrow pressed");
                break;

            case 38:
                for (let x = 0; x < 4; x++) {
                    for (let y = 1; y < 4; y++) {
                        if (this.tiles[y][x]) {
                            let i = 0;
                            while (i < 4 && this.tiles[i][x]) i++;
                            if (i < y) this.moveTile(y, x, i , x);
                        }
                    }
                }
                console.log("UP arrow pressed");
                break;

            case 39:
                for (let y = 0; y < 4; y++) {
                    for (let x = 2; x >= 0; x--) {
                        if (this.tiles[y][x]) {
                            let i = 3;
                            while (i >= 0 && this.tiles[y][i]) i--;
                            if (i > x) this.moveTile(y, x, y, i);
                        }
                    }
                }
                console.log("RIGHT arrow pressed");
                break;

            case 40:
                for (let x = 0; x < 4; x++) {
                    for (let y = 2; y >= 0; y--) {
                        if (this.tiles[y][x]) {
                            let i = 3;
                            while (i >= 0 && this.tiles[i][x]) i--;
                            if (i > y) this.moveTile(y, x, i , x);
                        }
                    }
                }
                console.log("DOWN arrow pressed");
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
field.addTile(1, 1, 32);
field.addTile(1, 3, 2);
field.addTile(2, 0, 16);
field.addTile(2, 1, 8);
field.addTile(3, 2, 8);
// field.moveTile(1, 3, 0, 1);