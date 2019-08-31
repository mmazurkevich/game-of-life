const cellsCountInRow = 100;
const fieldSize = 800;

window.onload = function () {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext('2d');
    context.strokeStyle = '#ebaabe';
    context.fillStyle = '#131435';
    let grid = generateInitialState();
    generation(context, grid)
};

const generation = (context, grid) => {
    context.clearRect(0, 0, fieldSize, fieldSize);
    renderGrid(context, grid);
    const newGrid = calculateNextGeneration(grid);
    setTimeout(() => {
        requestAnimationFrame(() => generation(context, newGrid))
    }, 1000 / 8)

};

const renderGrid = (context, grid) => {
    let cellSize = fieldSize / cellsCountInRow;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length; j++) {
            if (grid[i][j] === 1) {
                context.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
            } else {
                context.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize);
            }
        }
    }
};

function generateInitialState() {
    let grid = Array(cellsCountInRow);
    for (let i = 0; i < grid.length; i++) {
        grid[i] = Array(cellsCountInRow);
        for (let j = 0; j < grid.length; j++) {
            grid[i][j] = Math.round(Math.random());
        }
    }
    return grid;
}

const calculateNextGeneration = (grid) => {
    let newGrid = Array(cellsCountInRow);
    for (let i = 0; i < newGrid.length; i++) {
        newGrid[i] = Array(cellsCountInRow);
        for (let j = 0; j < newGrid.length; j++) {
            let neighborsCount = getNeighborsCount(grid, i, j);
            if (grid[i][j] === 0) {
                newGrid[i][j] = 0;
                if (neighborsCount === 3) {
                    newGrid[i][j] = 1;
                }
            } else {
                newGrid[i][j] = 1;
                if (neighborsCount < 2 || neighborsCount > 3) {
                    newGrid[i][j] = 0;
                }
            }
        }
    }
    return newGrid;
};

const getNeighborsCount = (grid, x, y) => {
    let sum = 0;
    let size = grid.length;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            const row = (x + i + size) % size;
            const col = (y + j + size) % size;
            sum += grid[row][col];
        }
    }
    sum -= grid[x][y];
    return sum;
};