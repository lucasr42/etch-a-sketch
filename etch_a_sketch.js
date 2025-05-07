// Get the container div from the html
// Create a 16 x 16 grid of divs
// Style the container and grid divs with flex

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


// Grab the main container from HTML
const mainContainer = document.querySelector("#mainContainer");

let gridSize = DEFAULT_GRID_SIZE;

const gridChoice = document.querySelector("#gridSize");
gridChoice.addEventListener("click", () => {
    const userInput = prompt("Choose a number between 1 - 100:");
    while (userInput <= 0 || userInput > 100) {
        userInput = prompt(`${userInput} is outside of the acceptable range. Please enter a number between 1 - 100.`);
    }
    console.log("userInput", userInput);
    gridSize = userInput;
    console.log("gridSize in event listener: ", gridSize);
})
console.log("gridSize after event listener. Did it change? ", gridSize);

// Create all the grid pieces and attach them to the Main Container
for (let i = 0; i < gridSize * gridSize; i++) {
    const gridPiece = document.createElement("div");
    gridPiece.id = "gridPiece";
    gridPiece.textContent = i+1;
    mainContainer.appendChild(gridPiece);
    gridPiece.classList.toggle("gridPiece");

    // Set the flex basis as a percentage for each cell
    // To get the cells to fit the container at the correct width
    const percBasis = 100 / gridSize;
    gridPiece.style.flexBasis = `${percBasis}%`;

}

mainContainer.classList.toggle("#mainContainer");

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
    // Start the grid
    const gridCells = document.querySelectorAll("#gridPiece");
    gridCells.forEach((cell) => {
        cell.style.cursor = "pointer";
        cell.addEventListener("mouseover", addColor);
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
 * Calls the helpers that allow the game to be played
 */
function playGame() {
        setButtonEnablement();

        enableGrid();
}

/**
 * Resets the game board so the user can start fresh
 */
function resetGame() {
    setButtonEnablement();
    clearCells();
}