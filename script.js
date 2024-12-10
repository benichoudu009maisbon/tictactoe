// script.js

// Variables globales
const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const currentPlayerSpan = document.getElementById("current-player");
const resetButton = document.getElementById("reset");

let currentPlayer = "X"; // Premier joueur
let boardState = Array(9).fill(null); // État initial du plateau
let isGameActive = true; // Indique si la partie est en cours

// Combinaisons gagnantes
const winningCombinations = [
  [0, 1, 2], // Ligne 1
  [3, 4, 5], // Ligne 2
  [6, 7, 8], // Ligne 3
  [0, 3, 6], // Colonne 1
  [1, 4, 7], // Colonne 2
  [2, 5, 8], // Colonne 3
  [0, 4, 8], // Diagonale 1
  [2, 4, 6], // Diagonale 2
];

// Gestion d'un clic sur une cellule
function handleCellClick(e) {
  const cell = e.target;
  const cellIndex = cell.getAttribute("data-index");

  if (!isGameActive || boardState[cellIndex]) {
    return; // Ignore si la partie est terminée ou si la cellule est déjà prise
  }

  // Met à jour l'état
  boardState[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add("taken");

  // Vérifie si quelqu'un a gagné
  if (checkWin()) {
    statusText.textContent = `Le joueur ${currentPlayer} a gagné !`;
    isGameActive = false;
    return;
  }

  // Vérifie si c'est un match nul
  if (boardState.every((cell) => cell !== null)) {
    statusText.textContent = "Match nul !";
    isGameActive = false;
    return;
  }

  // Change de joueur
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  currentPlayerSpan.textContent = currentPlayer;
}

// Vérifie les combinaisons gagnantes
function checkWin() {
  return winningCombinations.some((combination) => {
    return combination.every((index) => boardState[index] === currentPlayer);
  });
}

// Réinitialise le jeu
function resetGame() {
  boardState = Array(9).fill(null);
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("taken");
  });
  currentPlayer = "X";
  currentPlayerSpan.textContent = currentPlayer;
  statusText.textContent = "C'est le tour de X";
  isGameActive = true;
}

// Ajout des écouteurs d'événements
cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);
