const board = document.querySelector(".board");
const squares = document.querySelectorAll(".square");
const message = document.querySelector(".message");
const restartBtn = document.querySelector(".restart-button");
const players = ["X", "O"];

let currentPlayer = players[0];

message.textContent = `X's turn`;

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

for (let i = 0; i < squares.length; i++) {
  squares[i].addEventListener("click", () => {
    if (squares[i].textContent !== "" || checkWinner(currentPlayer)) {
      return;
    }

    squares[i].textContent = currentPlayer;

    if (checkWinner(currentPlayer)) {
      message.textContent = `Game Over. ${currentPlayer} wins the game ! Please restart`;
      return;
    }

    if (checkTieResult()) {
      message.textContent = `Game tied ! Please restart`;
      return;
    }

    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];

    if (currentPlayer === players[0]) {
      message.textContent = `X's Turn`;
    } else {
      message.textContent = `O's Turn`;
    }
  });
}

function checkWinner(currentPlayer) {
  for (let i = 0; i < winningPatterns.length; i++) {
    const [a, b, c] = winningPatterns[i];

    if (
      squares[a].textContent === currentPlayer &&
      squares[b].textContent === currentPlayer &&
      squares[c].textContent === currentPlayer
    ) {
      return true;
    }
  }

  return false;
}

function checkTieResult() {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].textContent === "") {
      return false;
    }
  }

  return true;
}

function restartGame() {
  for (let i = 0; i < squares.length; i++) {
    squares[i].textContent = "";
  }

  message.textContent = `X's turn`;
  currentPlayer = players[0];
}

restartBtn.addEventListener("click", () => {
  restartGame();
});
