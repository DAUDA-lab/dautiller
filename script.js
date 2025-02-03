let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(index) {
    if (board[index] === "" && gameActive) {
        board[index] = currentPlayer;
        updateBoard();
        checkWinner();
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        document.getElementById("status").textContent = `Player ${currentPlayer}'s turn`;
    }
}

function updateBoard() {
    document.querySelectorAll(".cell").forEach((cell, index) => {
        cell.textContent = board[index];
    });
}

function checkWinner() {
    for (let combination of winningCombinations) {
        let [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            document.getElementById("status").textContent = `Player ${board[a]} Wins!`;
            highlightWinningCells(combination);
            showWinner(board[a]);
            return;
        }
    }

    if (!board.includes("")) {
        gameActive = false;
        document.getElementById("status").textContent = "It's a Draw!";
        showWinner("Draw");
    }
}

function highlightWinningCells(cells) {
    cells.forEach(index => {
        document.querySelectorAll(".cell")[index].classList.add("winning-cell");
    });
}

function showWinner(winner) {
    document.getElementById("overlay").classList.add("show");
    let message = winner === "Draw" ? "It's a Draw!" : `🎉 Player ${winner} Wins!`;
    document.getElementById("winner-message").textContent = message;
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    document.getElementById("status").textContent = "Player X's turn";
    document.querySelectorAll(".cell").forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("winning-cell");
    });
    document.getElementById("overlay").classList.remove("show");
}

function newGame() {
    resetGame();
}