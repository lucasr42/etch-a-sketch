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

const gridSize = DEFAULT_GRID_SIZE;


// Will later add a piece to get user input on grid size
// And set gridSize here with their input if they give it

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

    // Click handler for selecting a cell
    gridPiece.addEventListener("click", () => {
        gridPiece.classList.toggle("chosenCell");
    })

    // Hover effect for changing color gives a real drawing effect
    gridPiece.addEventListener("mouseover", () => {
        const randColor = getRandomNumberForColor();
        gridPiece.style.backgroundColor = `rgb(${randColor.toString()})`;
    })
}

mainContainer.classList.toggle("#mainContainer");
