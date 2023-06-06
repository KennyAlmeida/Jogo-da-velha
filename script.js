// Variáveis de controle do jogo
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let currentPlayer2 = 'O';
let gameOver = false;
var player2;

// Mapeamento dos índices para as células
const cells = Array.from(document.getElementsByClassName('cell'));

// Adiciona o evento de clique a cada célula
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => makeMove(index));
});

// Função para realizar a jogada
function makeMove(index) {
  if (!gameOver && board[index] === '') {
    board[index] = currentPlayer;
    cells[index].innerText = currentPlayer;
    cells[index].style.color = (currentPlayer === 'X') ? '#2196f3' : '#f44336';
    checkResult();
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';

    //segundo jogador
    if (player2 == true) {
        currentPlayer2 = 'O';
    } else {

        if (!gameOver && currentPlayer === 'O') {
            setTimeout(() => {
                makeComputerMove();
            }, 300);
        }
    }
  }
}

// Função para realizar a jogada do computador
function makeComputerMove() {
  const emptyCells = cells.filter(cell => cell.innerText === '');
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const cell = emptyCells[randomIndex];
  const index = cells.indexOf(cell);
  makeMove(index);
}


// Função para verificar o resultado do jogo
function checkResult() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
    [0, 4, 8], [2, 4, 6] // Diagonais
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
      gameOver = true;
      highlightCells([a, b, c]);
      setMessage(`Jogador ${board[a]} venceu!`);
      return;
    }
  }

  if (!board.includes('')) {
    gameOver = true;
    setMessage('Empate!');
  }
}

// Função para destacar as células vencedoras
function highlightCells(cellsToHighlight) {
  for (let cellIndex of cellsToHighlight) {
    cells[cellIndex].style.backgroundColor = '#4caf50';
  }
}

// Função para exibir uma mensagem
function setMessage(message) {
  document.getElementById('message').innerText = message;
}

// Função para reiniciar o jogo
function resetBoard() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameOver = false;
  cells.forEach(cell => {
    cell.innerText = '';
    cell.style.backgroundColor = '#f5f5f5';
    cell.style.color = '#000';
  });
  setMessage('');
  escolha();
}

var btnPlayer2= document.getElementById("ativar-player2");
var btnCPU = document.getElementById("ativar-cpu");

//pop para escolher se é contra o computador ou Player 2
function ativarPlayer2() {
    btnPlayer2.style.display = "none";
    btnCPU.style.display = "inline-block";
     player2 = true;
     resetBoard();
}

function jogarContraCPU() {
    btnCPU.style.display = "none";
    btnPlayer2.style.display = "inline-block";
    player2 = false;
    resetBoard();
}