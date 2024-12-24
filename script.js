//................................................................................................................
/*
    * Tic Tac Toe game, used as a practice for DOM manipulation and event handling in JavaScript.
    * Made by @FECORO
    * 
    * Features:
    * - Players can play against each other on the same device.
    * - Keeps track of the score.
    * - Players can reset the game or the score.
    * - Highlights the winning combination of cells.
    * - Players can play using the keyboard (1-9).
    * - Hover effects for cells and buttons.
*/

// The game uses a class to encapsulate the game logic and state. 
// Over this, there is the HTML that contains the game board and the buttons to reset the game and the score.
// The CSS is used to style the game board, the buttons, and the hover effects.

//................................................................................................................

//........................Clase
class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.scores = {
            X: 0,
            O: 0
        };
        this.winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], //..filas
            [0, 3, 6], [1, 4, 7], [2, 5, 8], //..columnas
            [0, 4, 8], [2, 4, 6] //..diagonales
        ];

        this.initializeGame();
    }

    initializeGame() {
        this.cells = document.querySelectorAll('.cell');
        this.messageElement = document.getElementById('message');
        this.resetGameButton = document.getElementById('reset-game');
        this.resetScoreButton = document.getElementById('reset-score');
        this.scoreXElement = document.getElementById('score-x');
        this.scoreOElement = document.getElementById('score-o');

        this.cells.forEach(cell => {
            cell.addEventListener('click', () => this.handleCellClick(cell));
        });

        this.resetGameButton.addEventListener('click', () => this.resetGame());
        this.resetScoreButton.addEventListener('click', () => this.resetScore());
    }

    handleCellClick(cell) {
        const index = cell.getAttribute('data-index');

        if (this.board[index] === '' && this.gameActive) {
            this.board[index] = this.currentPlayer;
            cell.textContent = this.currentPlayer;
            cell.classList.add(this.currentPlayer.toLowerCase());

            if (this.checkWin()) {
                this.handleWin();
            } else if (this.checkDraw()) {
                this.handleDraw();
            } else {
                this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
                this.updateMessage(`Player ${this.currentPlayer}'s turn`);
            }
        }
    }

    checkWin() {
        return this.winningCombinations.some(combination => {
            const [a, b, c] = combination;
            if (
                this.board[a] &&
                this.board[a] === this.board[b] &&
                this.board[a] === this.board[c]
            ) {
                this.highlightWinningCells(combination);
                return true;
            }
            return false;
        });
    }

    checkDraw() {
        return this.board.every(cell => cell !== '');
    }

    handleWin() {
        this.gameActive = false;
        this.scores[this.currentPlayer]++;
        this.updateScoreDisplay();
        this.updateMessage(`Player ${this.currentPlayer} wins!`);
    }

    handleDraw() {
        this.gameActive = false;
        this.updateMessage("It's a draw!");
    }

    highlightWinningCells(combination) {
        combination.forEach(index => {
            this.cells[index].classList.add('winning-cell');
        });
    }

    resetGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;

        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'winning-cell');
        });

        this.updateMessage(`Player ${this.currentPlayer}'s turn`);
    }

    resetScore() {
        this.scores.X = 0;
        this.scores.O = 0;
        this.updateScoreDisplay();
        this.resetGame();
    }

    updateScoreDisplay() {
        this.scoreXElement.textContent = this.scores.X;
        this.scoreOElement.textContent = this.scores.O;
    }

    updateMessage(message) {
        this.messageElement.textContent = message;
    }
}

//..inicializa el game cuando el DOM ya está cargado
document.addEventListener('DOMContentLoaded', () => {
    const game = new TicTacToe();
    game.updateMessage("Player X's turn");
});

//..agrega efecto de click a los botones
function addClickEffect(element) {
    element.style.transform = 'scale(0.95)';
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 100);
}

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => addClickEffect(button));
});

//.. aquí para el hover
document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('mouseover', () => {
        if (!cell.textContent) {
            cell.style.backgroundColor = '#e0e0e0';
        }
    });
    
    cell.addEventListener('mouseout', () => {
        if (!cell.textContent) {
            cell.style.backgroundColor = '#f0f0f0';
        }
    });
});

//..soporte para jugar con el teclado
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key >= 1 && key <= 9) {
        const index = key - 1;
        const cell = document.querySelector(`[data-index="${index}"]`);
        if (cell) {
            cell.click();
        }
    }
});


function initializeVisualEffects() {
    //..crea círculitos flotantes
    const backgroundCircles = document.createElement('div');
    backgroundCircles.className = 'background-circles';
    
    for (let i = 0; i < 8; i++) {
        const circle = document.createElement('div');
        circle.className = 'circle';
        circle.style.width = `${Math.random() * 300 + 100}px`;
        circle.style.height = circle.style.width;
        circle.style.left = `${Math.random() * 100}vw`;
        circle.style.top = `${Math.random() * 100}vh`;
        circle.style.animationDelay = `${Math.random() * 5}s`;
        circle.style.animationDuration = `${15 + Math.random() * 15}s`;
        backgroundCircles.appendChild(circle);
    }
    
    document.body.prepend(backgroundCircles);
}

document.addEventListener('DOMContentLoaded', initializeVisualEffects);

//................................................................................................................
//@FECORO, Rengo. 2024