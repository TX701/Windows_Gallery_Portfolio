let windowNum = null; // number of minesweeper windows

let timers = []; // array of minesweeper timers running

const setUpArray = (colAmt, rowAmt, n) => {
    document.querySelector(`#minesweeper${windowNum} .grid`).innerHTML = ""; //reset grid
    document.querySelector(`#minesweeper${windowNum} .status`).src = "./assets/ms/standard.png"; //reset status
    document.querySelector(`#minesweeper${windowNum} .grid`).style.setProperty("grid-template-columns", `repeat(${colAmt}, 2rem)`);
    document.querySelector(`#minesweeper${windowNum} .bomb-count`).innerHTML = `0${n}`;

    document.querySelector(`#minesweeper${windowNum} .time`).innerHTML = "000";
    startTime(document.querySelector(`#minesweeper${windowNum} .time`));

    // startTime();

    let field = [];
    let bombs = [];

    // puts the game into a lose state
    const handleBombs = (tile) => {
        tile.style.background = "#ff0000"; // change background to red

        document.querySelectorAll(`#minesweeper${windowNum} .bombs`).forEach(element => {
            element.style.display = "block"; // make the bombs visible
            
            if (element.parentNode.querySelector(`#minesweeper${windowNum} .tile-img`) != null) {
                element.parentNode.querySelector(`#minesweeper${windowNum} .tile-img`).style.display = "none"; // if the user has a note over a bomb, make the note not visible
            }
        });

        document.querySelector(`#minesweeper${windowNum} .status`).src = "./assets/ms/lose.png"; // change status
        removeListeners(); // remove eventlisteners from all tiles
        stopTime(windowNum);
    }

    // show the value under a tile and enter lose state if the value is -1
    const revealTile = (tile) => {
        if (tile.value != 0 && tile.value != -1) {
            tile.innerHTML = `<span>${tile.value}</span>`;
        }
        
        tile.setAttribute("revealed", true);
        tile.removeEventListener("click", setLeftClick);
        tile.removeEventListener("contextmenu", setRightClick);
        tile.style.border = "1px #8a8b92 solid";

        switch (Number(tile.value)) { // sets tile color depending on how many bombs it is touching
            case -1:
                handleBombs(tile);
                break;
            case 1:
                tile.style.color = "#0000ff";
                break;
            case 2:
                tile.style.color = "#00a857";
                break;
            case 3:
                tile.style.color = "#fb0b0b";
                break;
            case 4: 
                tile.style.color = "#070781";
                break;
            case 5: 
                tile.style.color = "#881818";
                break;
            case 6: 
                tile.style.color = "#007676";
                break;
            case 7: 
                tile.style.color = "#7b057b";
                break;
            case 8: 
                tile.style.color = "#000";
                break;
            default:
                break;
        }
    }

    // reveals all values within a 1 tile radius of a tile
    const revealValuesAround = (tile) => {
        let tileRow = Number(tile.getAttribute("row"));
        let tileCol = Number(tile.getAttribute("col"));
        
        let rowStart = (tileRow - 1 >= 0) ? tileRow - 1 : tileRow;
        let rowEnd = (tileRow + 1 < rowAmt) ? tileRow + 1 : tileRow;
        let colStart = (tileCol - 1 >= 0) ? tileCol - 1 : tileCol;
        let colEnd = (tileCol + 1 < colAmt) ? tileCol + 1 : tileCol;

        for (let row = rowStart; row <= rowEnd; row++) {
            for (let col = colStart; col <= colEnd; col++) {
                if (field[row][col].getAttribute("revealed") == "false" && Number(field[row][col].value) == 0) {
                    revealTile(field[row][col]);
                    revealValuesAround(field[row][col]); // if a tile revealed also has a value of 0, reveal all tiles surrounding that tilea as well
                } else {
                    revealTile(field[row][col]);
                }
            }
        }
    }

    // allows user to select a tile
    const setLeftClick = (e) => { 
        let element = e.target;

        if (element.nodeName != "BUTTON") {
            element = element.parentNode; // if there is an image (a user note) over the tile then element will be that image, its parent will be the button
        }

        if (element.value == 0) {
            revealValuesAround(element); // if the tile value is 0 reveal all other tiles in a 1 tile radius
        } else {
            revealTile(element); // if the value is not 0 reveal the singular tile
        }

        // checking for win state
        let allFound = true;
        field.forEach(row => {
            row.forEach(element => {
                if (element.getAttribute("revealed") == "false" && element.value != -1) {
                    allFound = false; // if one tile (that does not have a value of -1) has not been clicked on, then all bombs have not been discovered
                } 
            });
        });

        if (allFound) {
            document.querySelector(`#minesweeper${windowNum} .status`).src = "./assets/ms/win.png"; // user has won
            removeListeners(); // tiles can no longer be selected
            stopTime(windowNum);
        }
    }

    // allows user to make a note
    const setRightClick = (e) => {
        let element = e.target;

        if (element.nodeName != "BUTTON") {
            element = element.parentNode; // if there is an image (a user note) over the tile then element will be that image, its parent will be the button
        }

        let current = element.getAttribute("userInfo"); // gets what the current note is

        if (element.querySelector(`#minesweeper${windowNum} .tile-img`) != null) {
            element.removeChild(element.querySelector(`#minesweeper${windowNum} .tile-img`)); // if an note has already been made, remove that note
        }

        switch (current) {
            case "":
                element.innerHTML += `<img src="./assets/ms/flag.png" class="tile-img" alt="flag"></img>`
                element.setAttribute("userInfo", "flag"); // the element now has a flag
                break;
            case "flag":
                element.innerHTML += `<p class="tile-img">?</p>`
                element.setAttribute("userInfo", "question"); // the element now has a ?
                break;
            case "question":
                element.innerHTML += `<p class="tile-img"></p>`
                element.setAttribute("userInfo", ""); // the element now has nothing
                break;
            default:
                break;
        }
        e.preventDefault();
    }

    // removes button functionality for the tiles
    const removeListeners = () => {
        field.forEach(row => {
            row.forEach(element => {
                element.removeEventListener("click", setLeftClick);  // removes left click operations
                element.removeEventListener("contextmenu", setRightClick); // removes right click operations
            });
        });
    }

    // create a "2D" array depending on the desired row and column amount
    const createTiles = () => {
        for (let row = 0; row < rowAmt; row++) {
            field[row] = [];
            for (let col = 0; col < colAmt; col++) {
                let button = `<button id="R${row}-C${col}" row=${row} col=${col} userInfo="" revealed=false value=0></button>`;
                document.querySelector(`#minesweeper${windowNum} .grid`).insertAdjacentHTML("beforeend", button);
                field[row][col] = document.querySelector(`#minesweeper${windowNum} #R${row}-C${col}`); // each array element corresponds to one button on the grid
                field[row][col].addEventListener("click", setLeftClick);
                field[row][col].addEventListener("contextmenu", setRightClick);
            }
        }
    }

    // places bombs randomly on the grid
    const setBombs = () => {
        let amount = n;
        while (amount > 0) {
            let row = Math.floor(Math.random() * rowAmt);
            let col = Math.floor(Math.random() * colAmt);

            if (field[row][col].value == 0) {
                field[row][col].value = -1;
                field[row][col].innerHTML = `<img src="./assets/ms/bomb.png" class="bombs" alt="bombs">`;
                bombs.push(field[row][col]);
                amount--;
            }
        }
    }

    // for each tile touching a bomb tile, change its value to its current value + 1 
    const setValues = (tile) => {
        let row = Number(tile.getAttribute("row"));
        let col = Number(tile.getAttribute("col"));

        let rowStart = (row - 1 >= 0) ? row - 1 : row;
        let rowEnd = (row + 1 < rowAmt) ? row + 1 : row;

        let colStart = (col - 1 >= 0) ? col - 1 : col;
        let colEnd = (col + 1 < colAmt) ? col + 1 : col;

        for (let smallRow = rowStart; smallRow <= rowEnd; smallRow++) {
            for (let smallGrid = colStart; smallGrid <= colEnd; smallGrid++) {
                if (Number(field[smallRow][smallGrid].value) != -1) {
                    field[smallRow][smallGrid].value = Number(field[smallRow][smallGrid].value) + 1; // + 1 to reflect if multiple bombs are touching a tile
                }
            }
        }
    }

    createTiles();
    setBombs();

    bombs.forEach(element => {
        setValues(element);
    });

    document.querySelector(`#minesweeper${windowNum} .reset-button`).addEventListener("click", () => {
        stopTime(windowNum);
        setUpArray(colAmt, rowAmt, n); 
    });

    document.querySelector(`#minesweeper${windowNum} .game-options-B`).addEventListener("click", () => {
        stopTime(windowNum);
        setUpArray(8, 8, 10); 
    });
    
    document.querySelector(`#minesweeper${windowNum} .game-options-I`).addEventListener("click", () => {
        stopTime(windowNum);
        setUpArray(16, 16, 40); 
    });
    
    document.querySelector(`#minesweeper${windowNum} .game-options-E`).addEventListener("click", () => {
        stopTime(windowNum);
        setUpArray(30, 16, 99); 
    });
}

// starts timer
const startTime = (element) => {
    let start = Date.now();

    let timer = "";

    timer = setInterval(() => {
        let delta = Math.floor(( Date.now() - start ) / 1000);

        switch (delta.toString().length) {
            case 1:
                element.innerHTML = `00${delta}`; // if the time is 0-9
                break;
            case 2:
                element.innerHTML = `0${delta}`; // if the time is 10-99
                break;
            default:
                element.innerHTML = `${delta}`; // if the time is over 99
                break;
        }

        if (998 < delta) { // if the time is over 999 stop the timer
            stopTime(windowNum);
        }

    }, 1000);

    timers.push({number: windowNum, timer: timer}); // add to timer array
}

export const stopTime = (stop) => {
    timers.forEach(element => {
        if (element.number == stop) { // get the corresponding timer from the array
            clearInterval(element.timer); // stop it
        }
    });
}

export const startMs = (num) => {
    windowNum = num;
    setUpArray(8, 8, 10); // beginner game open
}
