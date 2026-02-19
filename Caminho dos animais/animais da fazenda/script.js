// --- DADOS ---
const animalsData = [
    { id: 'pig', name: 'Porco', animalImg: '🐷', objectImg: '🍎', successImg: '✅', bg: '#ffa7f8ff' },
    { id: 'cow', name: 'Vaca', animalImg: '🐮', objectImg: '🌿', successImg: '✅', bg: '#fab1a0' },
    { id: 'horse', name: 'Cavalo', animalImg: '🐴', objectImg: '🌾', successImg: '✅', bg: '#ff7675' },
    { id: 'duck', name: 'Pato', animalImg: '🦆', objectImg: '🐛', successImg: '✅', bg: '#84eba3ff' },
    { id: 'chicken', name: 'Galinha', animalImg: '🐔', objectImg: '🌽', successImg: '✅', bg: '#beadadff' },
];

// --- ELEMENTOS DOM ---
const menuScreen = document.getElementById('menu-screen');
const gameScreen = document.getElementById('game-screen');
const buttonsContainer = document.getElementById('animal-buttons');
const gameTitle = document.getElementById('game-title');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const itemsLayer = document.getElementById('items-layer');

const sensorCanvas = document.createElement('canvas');
const sensorCtx = sensorCanvas.getContext('2d');

let currentAnimal = null;
let maze = null;
let isDragging = false;
let draggedItem = null;
let canvasRect;

const cols = 6;
const rows = 5;
let cellWidth, cellHeight;

// --- INICIALIZAÇÃO ---
function init() {
    createMenuButtons();
    document.getElementById('btn-back').addEventListener('click', showMenu);
    document.getElementById('btn-new-maze').addEventListener('click', () => {
        if(currentAnimal) startGame(currentAnimal);
    });
    window.addEventListener('mousemove', moveDrag);
    window.addEventListener('mouseup', endDrag);
    window.addEventListener('touchmove', moveDrag, {passive: false});
    window.addEventListener('touchend', endDrag);
}

function createMenuButtons() {
    buttonsContainer.innerHTML = '';
    animalsData.forEach(animal => {
        const btn = document.createElement('div');
        btn.className = 'animal-card-btn';
        btn.innerHTML = `
            <div class="bg-circle" style="background-color: ${animal.bg}40;"></div>
            <span class="animal-emoji">${animal.animalImg}</span>
            <span class="animal-name" style="color: ${animal.bg}; filter: brightness(0.6);">${animal.name}</span>
        `;
        btn.onclick = () => startGame(animal);
        buttonsContainer.appendChild(btn);
    });
}

function showMenu() {
    gameScreen.classList.add('d-none');
    menuScreen.classList.remove('d-none');
}

function startGame(animal) {
    currentAnimal = animal;
    gameTitle.innerText = animal.name;
    menuScreen.classList.add('d-none');
    gameScreen.classList.remove('d-none');
    setTimeout(() => {
        setupCanvas();
        generateLevel();
    }, 100);
}

// --- LÓGICA DO JOGO ---
function setupCanvas() {
    canvas.width = sensorCanvas.width = canvas.offsetWidth;
    canvas.height = sensorCanvas.height = canvas.offsetHeight;
    canvasRect = canvas.getBoundingClientRect();
    cellWidth = canvas.width / cols;
    cellHeight = canvas.height / rows;
}

function generateLevel() {
    maze = new Maze(cols, rows);
    maze.generate();
    drawVisualMaze();
    drawSensorMaze();
    placeItems();
}

function drawVisualMaze() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const wallThickness = Math.min(cellWidth, cellHeight) * 0.95;
    const pathThickness = Math.min(cellWidth, cellHeight) * 0.90;

    ctx.beginPath();
    ctx.strokeStyle = '#000000'; ctx.fillStyle = '#000000';
    ctx.lineWidth = wallThickness; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    drawMazePath(ctx); ctx.stroke(); drawJunctions(ctx, wallThickness / 2);

    ctx.beginPath();
    ctx.strokeStyle = '#ffffff'; ctx.fillStyle = '#ffffff';
    ctx.lineWidth = pathThickness; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    drawMazePath(ctx); ctx.stroke(); drawJunctions(ctx, pathThickness / 2);
}

function drawSensorMaze() {
    sensorCtx.clearRect(0, 0, sensorCanvas.width, sensorCanvas.height);
    sensorCtx.fillStyle = '#000000';
    sensorCtx.fillRect(0, 0, sensorCanvas.width, sensorCanvas.height);

    const pathThickness = Math.min(cellWidth, cellHeight) * 0.90;

    sensorCtx.beginPath();
    sensorCtx.strokeStyle = '#ffffff'; sensorCtx.fillStyle = '#ffffff';
    sensorCtx.lineWidth = pathThickness; sensorCtx.lineCap = 'round'; sensorCtx.lineJoin = 'round';
    drawMazePath(sensorCtx); sensorCtx.stroke(); drawJunctions(sensorCtx, pathThickness / 2);
}

function drawMazePath(context) {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            let cell = maze.grid[r][c];
            let x = c * cellWidth + cellWidth / 2;
            let y = r * cellHeight + cellHeight / 2;
            if (!cell.walls.right) {
                let midX = x + cellWidth / 2; let cpY = y + cell.curves.right;
                context.moveTo(x, y); context.quadraticCurveTo(midX, cpY, x + cellWidth, y);
            }
            if (!cell.walls.bottom) {
                let midY = y + cellHeight / 2; let cpX = x + cell.curves.bottom;
                context.moveTo(x, y); context.quadraticCurveTo(cpX, midY, x, y + cellHeight);
            }
        }
    }
}

function drawJunctions(context, radius) {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            let cell = maze.grid[r][c];
            if (cell.visited) {
                let x = c * cellWidth + cellWidth / 2;
                let y = r * cellHeight + cellHeight / 2;
                context.beginPath(); context.arc(x, y, radius, 0, Math.PI * 2); context.fill();
            }
        }
    }
}

class Maze {
    constructor(cols, rows) {
        this.cols = cols; this.rows = rows; this.grid = []; this.stack = [];
        for (let r = 0; r < rows; r++) {
            let row = [];
            for (let c = 0; c < cols; c++) {
                row.push({ c, r, walls: { top: true, right: true, bottom: true, left: true }, visited: false, curves: { right: (Math.random() * 20) - 10, bottom: (Math.random() * 20) - 10 } });
            }
            this.grid.push(row);
        }
    }
    generate() {
        let current = this.grid[0][0]; current.visited = true; this.stack.push(current);
        while (this.stack.length > 0) {
            current = this.stack[this.stack.length - 1];
            let neighbors = this.getUnvisitedNeighbors(current);
            if (neighbors.length > 0) {
                let next = neighbors[Math.floor(Math.random() * neighbors.length)];
                this.removeWalls(current, next); next.visited = true; this.stack.push(next);
            } else { this.stack.pop(); }
        }
    }
    getUnvisitedNeighbors(cell) {
        let neighbors = []; let { c, r } = cell;
        if (r > 0 && !this.grid[r - 1][c].visited) neighbors.push(this.grid[r - 1][c]);
        if (c < this.cols - 1 && !this.grid[r][c + 1].visited) neighbors.push(this.grid[r][c + 1]);
        if (r < this.rows - 1 && !this.grid[r + 1][c].visited) neighbors.push(this.grid[r + 1][c]);
        if (c > 0 && !this.grid[r][c - 1].visited) neighbors.push(this.grid[r][c - 1]);
        return neighbors;
    }
    removeWalls(a, b) {
        let x = a.c - b.c; let y = a.r - b.r;
        if (x === -1) { a.walls.right = false; b.walls.left = false; } else if (x === 1) { a.walls.left = false; b.walls.right = false; }
        if (y === -1) { a.walls.bottom = false; b.walls.top = false; } else if (y === 1) { a.walls.top = false; b.walls.bottom = false; }
    }
}

// --- ITEMS & DRAG ---
function placeItems() {
    itemsLayer.innerHTML = '';
    const startX = cellWidth / 2; const startY = cellHeight / 2;
    const endX = canvas.width - (cellWidth / 2); const endY = canvas.height - (cellHeight / 2);

    // 1. ANIMAL + PULSO
    const animalDiv = document.createElement('div');
    animalDiv.className = 'game-item';
    // --- AQUI ESTÁ A CORREÇÃO: O pulso voltou! ---
    animalDiv.classList.add('click-hint-pulse');
    // ---------------------------------------------
    animalDiv.innerText = currentAnimal.animalImg;
    animalDiv.style.left = (startX - 50) + 'px'; animalDiv.style.top = (startY - 50) + 'px';
    animalDiv.dataset.startX = startX; animalDiv.dataset.startY = startY;
    animalDiv.dataset.endX = endX; animalDiv.dataset.endY = endY;
    animalDiv.addEventListener('mousedown', startDrag);
    animalDiv.addEventListener('touchstart', startDrag, {passive: false});
    itemsLayer.appendChild(animalDiv);

    // 2. MÃOZINHA (TUTORIAL)
    const handDiv = document.createElement('div');
    handDiv.className = 'tutorial-hand';
    handDiv.id = 'tutorial-cursor';
    // Ajuste fino para a ponta do dedo ficar sobre o emoji
    handDiv.style.left = (startX - 30 + 10) + 'px';
    handDiv.style.top = (startY - 30 + 30) + 'px';
    itemsLayer.appendChild(handDiv);

    // 3. ALVO
    const targetDiv = document.createElement('div');
    targetDiv.id = 'target-item'; targetDiv.className = 'game-item';
    targetDiv.innerText = currentAnimal.objectImg;
    targetDiv.style.left = (endX - 50) + 'px'; targetDiv.style.top = (endY - 50) + 'px';
    itemsLayer.appendChild(targetDiv);
}

function startDrag(e) {
    if(e.target.classList.contains('completed')) return;
    e.preventDefault();
    isDragging = true;
    draggedItem = e.target;
    
    // --- REMOVE AS DICAS ---
    // Remove o pulso do animal
    draggedItem.classList.remove('click-hint-pulse');
    // Remove a mãozinha
    const tutorialHand = document.getElementById('tutorial-cursor');
    if (tutorialHand) tutorialHand.remove();
    // -----------------------

    canvasRect = canvas.getBoundingClientRect();
}

function moveDrag(e) {
    if (!isDragging || !draggedItem) return;
    e.preventDefault();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = clientX - canvasRect.left;
    const y = clientY - canvasRect.top;
    
    const pixel = sensorCtx.getImageData(x, y, 1, 1).data;
    if (pixel[0] < 200) { resetPosition(draggedItem); return; }
    draggedItem.style.left = (x - 50) + 'px'; draggedItem.style.top = (y - 50) + 'px';
}

function endDrag(e) {
    if (!isDragging || !draggedItem) return;
    isDragging = false;
    const curX = parseFloat(draggedItem.style.left) + 50;
    const curY = parseFloat(draggedItem.style.top) + 50;
    const endX = parseFloat(draggedItem.dataset.endX);
    const endY = parseFloat(draggedItem.dataset.endY);
    const dist = Math.hypot(curX - endX, curY - endY);

    if (dist < cellWidth * 0.6) { handleWin(draggedItem); } else { resetPosition(draggedItem); }
    draggedItem = null;
}

function resetPosition(el) {
    isDragging = false;
    el.style.transition = 'all 0.3s ease';
    el.style.left = (parseFloat(el.dataset.startX) - 50) + 'px';
    el.style.top = (parseFloat(el.dataset.startY) - 50) + 'px';
    setTimeout(() => el.style.transition = '', 300);
}

function handleWin(el) {
    el.style.left = (parseFloat(el.dataset.endX) - 50) + 'px';
    el.style.top = (parseFloat(el.dataset.endY) - 50) + 'px';
    el.innerText = currentAnimal.successImg;
    el.classList.add('success-anim', 'completed');
    const target = document.getElementById('target-item');
    if(target) target.style.display = 'none';
}

window.onload = init;
window.onresize = () => { if(currentAnimal) { setupCanvas(); generateLevel(); }};