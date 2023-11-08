function solveSudoku(board) {
	const rows = Array(9)
		.fill(0)
		.map(() => Array(9).fill(false));
	const cols = Array(9)
		.fill(0)
		.map(() => Array(0).fill(false));
	const boxes = Array(9)
		.fill(0)
		.map(() => Array(9).fill(false));

	// Helper function to check if the current value can be placed in the cell
	function isValid(row, col, num) {
		const box = Math.floor(row / 3) * 3 + Math.floor(col / 3);
		return !rows[row][num] && !cols[col][num] && !boxes[box][num];
	}

	// Helper function to mark the current value as used in the row, column, and box
	function setUsed(row, col, num, isUsed) {
		const box = Math.floor(row / 3) * 3 + Math.floor(col / 3);
		rows[row][num] = isUsed;
		cols[col][num] = isUsed;
		boxes[box][num] = isUsed;
	}

	// Initialize the board and mark the initial values as used
	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			if (board[row][col] !== ".") {
				const num = parseInt(board[row][col]);
				setUsed(row, col, num, true);
			}
		}
	}

	// Helper function to perform backtracking
	function backtrack(row, col) {
		if (row === 9) {
			// Reached the end of the board, sudoku is solved
			return true;
		}

		if (col === 9) {
			// Move to the next row
			return backtrack(row + 1, 0);
		}

		if (board[row][col] !== ".") {
			// Cell is already filled, move to the next column
			return backtrack(row, col + 1);
		}

		for (let num = 1; num <= 9; num++) {
			if (isValid(row, col, num)) {
				// Try placing the number in the cell
				board[row][col] = String(num);
				setUsed(row, col, num, true);

				// Continue with the next cell
				if (backtrack(row, col + 1)) {
					return true;
				}

				// Backtrack: undo the current placement and try the next number
				board[row][col] = ".";
				setUsed(row, col, num, false);
			}
		}

		// No valid number can be placed in the cell, backtrack to the previous cell
		return false;
	}

	// Start the backtracking process from the top-left cell
	backtrack(0, 0);
}

function extractBoxValues(boxElements) {
	const matrix = [];
	for (let i = 0; i < 9; i++) {
		const row = [];
		for (let j = 0; j < 9; j++) {
			const input = boxElements[i * 9 + j];
			if (input.value !== "") {
				row.push(String(input.value));
			} else {
				row.push(".");
			}
		}
		matrix.push(row);
	}
	return matrix;
}

function createMatrix() {
	const boxElements = document.querySelectorAll(".boxes input");
	const matrix = extractBoxValues(boxElements);
	return matrix;
}
function solveAndDisplaySudoku() {
	let matrix = createMatrix();
	const mtrx = matrix.map((row) => [...row]);
	const boxes = document.querySelectorAll("#dt");

	// Solve the Sudoku
	solveSudoku(matrix);

	// Display the solved Sudoku
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			boxes[i * 9 + j].value = matrix[i][j]; // Update input values
			if (mtrx[i][j] !== ".") {
				boxes[i * 9 + j].style.color = "#DE3700"; // Change the text color for original values
			} else {
				boxes[i * 9 + j].style.color = "#2AA10F"; // Change the text color for solved values
			}
		}
	}
}

document.querySelector("form").addEventListener("submit", function (event) {
	event.preventDefault(); // Prevent the form from submitting
	// Call the function to solve Sudoku when the form is submitted
	solveAndDisplaySudoku();
});
