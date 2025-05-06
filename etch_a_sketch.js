// Get the container div from the html
// Create a 16 x 16 grid of divs
// Style the container and grid divs with flex

DEFAULT_GRID_SIZE = 16;

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

    gridPiece.addEventListener("click", () => {
        gridPiece.classList.toggle("chosenCell");
    })
}

mainContainer.classList.toggle("#mainContainer");
