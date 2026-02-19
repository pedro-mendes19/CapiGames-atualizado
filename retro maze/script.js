const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const winModal = document.getElementById('winModal');
const levelIndicator = document.getElementById('levelIndicator');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const btnNext = document.getElementById('btnNext');
const btnRestart = document.getElementById('btnRestart');

// --- CONFIGURAÇÃO DOS NÍVEIS ---
// Resolution: Tamanho do quadrado. Quanto MENOR, MAIS DIFÍCIL.
const levelSettings = [
    50, // Nível 1 (Muito Fácil - Quadrados grandes)
    40, // Nível 2
    25, // Nível 3 (Médio)
    20, // Nível 4
    10  // Nível 5 (Difícil - Quadrados minúsculos)
];

let currentLevelIndex = 0; // Começa no nível 0 (que é o 1 visualmente)
let resolution;
let cols, rows;
let grid = [];
let current; 
let stack = [];
let player;
let goal;

// --- CLASSES ---

class Cell {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.walls = [true, true, true, true]; 
        this.visited = false;
    }

    checkNeighbors() {
        let neighbors = [];
        
        let top    = grid[index(this.i, this.j - 1)];
        let right  = grid[index(this.i + 1, this.j)];
        let bottom = grid[index(this.i, this.j + 1)];
        let left   = grid[index(this.i - 1, this.j)];

        if (top && !top.visited) neighbors.push(top);
        if (right && !right.visited) neighbors.push(right);
        if (bottom && !bottom.visited) neighbors.push(bottom);
        if (left && !left.visited) neighbors.push(left);

        if (neighbors.length > 0) {
            let r = Math.floor(Math.random() * neighbors.length);
            return neighbors[r];
        } else {
            return undefined;
        }
    }

    show() {
        let x = this.i * resolution;
        let y = this.j * resolution;

        ctx.strokeStyle = '#0f380f';
        ctx.lineWidth = (resolution < 15) ? 1 : 2; // Linha mais fina se for muito pequeno
        ctx.lineCap = "square";

        ctx.beginPath();
        if (this.walls[0]) { ctx.moveTo(x, y); ctx.lineTo(x + resolution, y); }
        if (this.walls[1]) { ctx.moveTo(x + resolution, y); ctx.lineTo(x + resolution, y + resolution); }
        if (this.walls[2]) { ctx.moveTo(x + resolution, y + resolution); ctx.lineTo(x, y + resolution); }
        if (this.walls[3]) { ctx.moveTo(x, y + resolution); ctx.lineTo(x, y); }
        ctx.stroke();
    }
}

class Player {
    constructor() {
        this.i = 0;
        this.j = 0;
    }

    draw() {
        let padding = resolution * 0.2;
        let x = this.i * resolution + padding;
        let y = this.j * resolution + padding;
        let size = resolution - (padding * 2);
        
        ctx.fillStyle = '#306230';
        ctx.fillRect(x, y, size, size);
    }

    move(dir) {
        let currentCell = grid[index(this.i, this.j)];
        let nextI = this.i;
        let nextJ = this.j;

        if (dir === 'UP' && !currentCell.walls[0]) nextJ--;
        if (dir === 'RIGHT' && !currentCell.walls[1]) nextI++;
        if (dir === 'DOWN' && !currentCell.walls[2]) nextJ++;
        if (dir === 'LEFT' && !currentCell.walls[3]) nextI--;

        if (nextI !== this.i || nextJ !== this.j) {
            this.i = nextI;
            this.j = nextJ;
            checkWin();
            requestAnimationFrame(drawGame);
        }
    }
}

// --- FUNÇÕES AUXILIARES ---

function index(i, j) {
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) return -1;
    return i + j * cols;
}

function removeWalls(a, b) {
    let x = a.i - b.i;
    if (x === 1) { a.walls[3] = false; b.walls[1] = false; }
    else if (x === -1) { a.walls[1] = false; b.walls[3] = false; }
    
    let y = a.j - b.j;
    if (y === 1) { a.walls[0] = false; b.walls[2] = false; }
    else if (y === -1) { a.walls[2] = false; b.walls[0] = false; }
}

// --- GERENCIAMENTO DO JOGO ---

function setupLevel() {
    // 1. Configura dificuldade
    resolution = levelSettings[currentLevelIndex];
    cols = Math.floor(canvas.width / resolution);
    rows = Math.floor(canvas.height / resolution);
    
    // 2. Atualiza UI
    levelIndicator.innerText = `NÍVEL ${currentLevelIndex + 1} / ${levelSettings.length}`;
    winModal.style.display = 'none';

    // 3. Reseta variáveis
    grid = [];
    stack = [];

    // 4. Cria Grid
    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            let cell = new Cell(i, j);
            grid.push(cell);
        }
    }
    
    // 5. Gera Labirinto (Algoritmo Backtracker)
    current = grid[0];
    while(true) {
        current.visited = true;
        let next = current.checkNeighbors();
        if (next) {
            next.visited = true;
            stack.push(current);
            removeWalls(current, next);
            current = next;
        } else if (stack.length > 0) {
            current = stack.pop();
        } else {
            break;
        }
    }

    player = new Player();
    goal = { i: cols - 1, j: rows - 1 };
    
    drawGame();
}

function drawGame() {
    // Limpa tela
    ctx.fillStyle = '#9bbc0f';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Desenha labirinto
    for (let i = 0; i < grid.length; i++) {
        grid[i].show();
    }

    // Desenha Objetivo
    let padding = resolution * 0.25;
    ctx.fillStyle = '#0f380f';
    ctx.fillRect(
        goal.i * resolution + padding, 
        goal.j * resolution + padding, 
        resolution - (padding*2), 
        resolution - (padding*2)
    );

    // Desenha Jogador
    player.draw();
}

function checkWin() {
    if (player.i === goal.i && player.j === goal.j) {
        showWinScreen();
    }
}

function showWinScreen() {
    winModal.style.display = 'block';
    
    // Verifica se é o último nível
    if (currentLevelIndex + 1 >= levelSettings.length) {
        modalTitle.innerText = "VOCÊ ZEROU O JOGO!";
        modalMessage.innerText = "Parabéns! Você completou todos os níveis.";
        btnNext.style.display = 'none';
        btnRestart.style.display = 'block';
    } else {
        modalTitle.innerText = "NÍVEL COMPLETADO!";
        modalMessage.innerText = "Prepare-se para aumentar a dificuldade.";
        btnNext.style.display = 'block';
        btnRestart.style.display = 'none';
    }
}

// Funções chamadas pelos botões
window.nextLevel = function() {
    currentLevelIndex++;
    setupLevel();
}

window.restartGame = function() {
    currentLevelIndex = 0;
    setupLevel();
}

// Controles
window.addEventListener('keydown', (e) => {
    if (winModal.style.display === 'block') return; // Bloqueia movimento se modal aberto

    // Previne rolagem da tela com as setas
    if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }

    if (e.key === 'ArrowUp' || e.key === 'w') player.move('UP');
    if (e.key === 'ArrowRight' || e.key === 'd') player.move('RIGHT');
    if (e.key === 'ArrowDown' || e.key === 's') player.move('DOWN');
    if (e.key === 'ArrowLeft' || e.key === 'a') player.move('LEFT');
});

// Inicia o primeiro nível
setupLevel();