DEFAULT_GRID_SIZE = 16;

/**
 * Produces 3 numbers within 0-255 for an RGB color schema
 * @returns An array with 3 numbers
 */
function getRandomNumberForColor() {
    const min = 0;
    const max = 255;
    const nums = [];
    for (let i = 0; i < 3; i++) {
        nums.push(Math.floor(Math.random() * (max - min + 1))) + min;
    }
    return nums;
}

/**
 * Flips the disabled status of the Play Game and Reset Game buttons
 */
function setButtonEnablement() {
    const playBtn = document.querySelector("#playGame");
    const resetBtn = document.querySelector("#resetGame");

    playBtn.disabled = !playBtn.disabled;
    resetBtn.disabled = !resetBtn.disabled;
}

/**
 * mouseover Event handler that adds color to a cell
 * - This is needed so I can remove it later when I reset the cell
 * @param {object} cell The event object for a mouseover event
 */
function addColor(cell) {
    const randColor = getRandomNumberForColor();
    cell.target.style.backgroundColor = `rgb(${randColor.toString()})`;
}

/**
 * Enables the cells to be colored in when hovered over and
 * set the cursor to the pointer finger
 */
function enableGrid() {
    console.log("enabling grid");
    // Start the grid
    const gridCells = document.querySelectorAll("#gridPiece");
    console.log("all the cells: ", gridCells);
    gridCells.forEach((cell) => {
        console.log("adding styles");
        cell.style.cursor = "pointer";
        cell.addEventListener("mouseover", addColor);
    })
}

/**
 * Used to remove the grid from the screen when reseting with a new board size
 */
function removeGrid() {
    const gridPieces = document.querySelectorAll("#gridPiece");
    const pieces = [...gridPieces];
    pieces.forEach((piece) => {
        piece.parentElement.removeChild(piece);
    })
}

/**
 * Helper to set the color of the cells to white and clears the mouseover event handler
 */
function clearCells() {
    const gridCells = document.querySelectorAll("#gridPiece");
    gridCells.forEach((cell) => {
        cell.style.cursor = "auto";
        cell.style.backgroundColor = "white";
        cell.removeEventListener("mouseover", addColor);
    })
}

/**
 * Used to build a grid from the DEFAULT size or the user chosen size
 * @param {int} size Number of cells for one row
 */
function buildGrid(size, reset = false) {
    if (reset && size !== DEFAULT_GRID_SIZE) {
        console.log("reseting container size");
        removeGrid();
        enableGrid();
    }
    // Grab the main container from HTML
    const mainContainer = document.querySelector("#mainContainer");
    
    // Create the grid
    for (let i = 0; i < size * size; i++) {
        const gridPiece = document.createElement("div");
        gridPiece.id = "gridPiece";
        gridPiece.textContent = i+1;
        mainContainer.appendChild(gridPiece);
        gridPiece.classList.toggle("gridPiece");
    
        // Set the flex basis as a percentage for each cell
        // To get the cells to fit the container at the correct width
        const percBasis = 100 / size;
        gridPiece.style.flexBasis = `${percBasis}%`;
    }
    mainContainer.classList.toggle("#mainContainer");
}

/**
 * Calls the helpers that allow the game to be played
 */
function playGame() {
    // Flips the Play and Reset buttons
    setButtonEnablement();
    // Turns on the etch a sketch
    enableGrid();
}

/**
 * Resets the game board so the user can start fresh
 */
function resetGame() {
    setButtonEnablement();
    clearCells();
}

/**
 * Lets a user choose how many grid cells they want in a row
 */
function getGridSize() {
    const userInput = prompt("Choose a number between 1 - 100:");
    while (userInput <= 0 || userInput > 100) {
        userInput = prompt(`${userInput} is outside of the acceptable range. Please enter a number between 1 - 100.`);
    }
    buildGrid(userInput, reset=true);
}

// Builds the original grid because I want it on the screen all the time
buildGrid(DEFAULT_GRID_SIZE);
