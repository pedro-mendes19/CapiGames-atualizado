const gridElement = document.getElementById('grid');
const wordsListElement = document.getElementById('words-to-find');
const restartBtn = document.getElementById('restartBtn');
const messageDiv = document.getElementById('message');

const gridSize = 10;
const allWords = [
    'GATO', 'CACHORRO', 'PEIXE', 'URSO', 'LEAO', 'PATO', 'SAPO', 'TIGRE', 'RATO', 'VACA', 
    'LOBO', 'ZEBRA', 'MACACO', 'COELHO', 'GIRAFA', 'CORUJA', 'RAPOSA', 'TUCANO', 'FOCA',
    'BANANA', 'UVA', 'MAÇA', 'PERA', 'LIMAO', 'MANGA', 'CAJU', 'COCO', 'MEL', 'BOLO',
    'AZUL', 'VERDE', 'ROSA', 'ROXO', 'SOL', 'LUA', 'MAR', 'FLOR', 'CEU',
    'BOLA', 'PIPA', 'DADO', 'CASA', 'MESA', 'LIVRO', 'LAPIS', 'MOLA', 'ANEL'
];

// Paleta de cores pastéis para facilitar a leitura da criança
const colors = ['#FFADAD', '#FFD6A5', '#FDFFB6', '#CAFFBF', '#9BFBC0', '#A0C4FF', '#BDB2FF', '#FFC6FF'];

let activeWords = []; 
let grid = []; 
let firstSelection = null;
let wordColorMap = {}; // Guarda a cor de cada palavra

function initGame() {
    gridElement.innerHTML = '';
    wordsListElement.innerHTML = '';
    messageDiv.classList.add('hidden');
    grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
    activeWords = [];
    wordColorMap = {};
    firstSelection = null;

    // Seleciona 5 palavras aleatórias
    const shuffled = [...allWords].sort(() => 0.5 - Math.random());
    const selectedWords = shuffled.slice(0, 5);

    selectedWords.forEach(word => placeWord(word));
    fillEmptySpaces();
    renderGrid();
    renderWordList();
}

function canPlace(word, row, col, direction) {
    if (direction === 'H' && col + word.length > gridSize) return false;
    if (direction === 'V' && row + word.length > gridSize) return false;

    for (let i = 0; i < word.length; i++) {
        let r = row + (direction === 'V' ? i : 0);
        let c = col + (direction === 'H' ? i : 0);

        // VERIFICAÇÃO PEDAGÓGICA: Zona de segurança 3x3 ao redor de cada letra
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                let checkR = r + dr;
                let checkC = c + dc;
                if (checkR >= 0 && checkR < gridSize && checkC >= 0 && checkC < gridSize) {
                    if (grid[checkR][checkC] !== '') return false;
                }
            }
        }
    }
    return true;
}

function placeWord(word) {
    let placed = false;
    let attempts = 0;
    while (!placed && attempts < 200) {
        const direction = Math.random() > 0.5 ? 'H' : 'V';
        const row = Math.floor(Math.random() * gridSize);
        const col = Math.floor(Math.random() * gridSize);

        if (canPlace(word, row, col, direction)) {
            for (let i = 0; i < word.length; i++) {
                let r = row + (direction === 'V' ? i : 0);
                let c = col + (direction === 'H' ? i : 0);
                grid[r][c] = word[i];
            }
            wordColorMap[word] = colors[activeWords.length % colors.length];
            activeWords.push(word);
            placed = true;
        }
        attempts++;
    }
}

function fillEmptySpaces() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
            if (grid[r][c] === '') {
                grid[r][c] = letters.charAt(Math.floor(Math.random() * letters.length));
            }
        }
    }
}

function renderGrid() {
    for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
            const cell = document.createElement('div');
            cell.classList.add('letter-box');
            cell.innerText = grid[r][c];
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.addEventListener('click', handleCellClick);
            gridElement.appendChild(cell);
        }
    }
}

function renderWordList() {
    activeWords.forEach(word => {
        const li = document.createElement('li');
        li.innerText = word;
        li.id = `word-${word}`; // ID para facilitar encontrar depois
        wordsListElement.appendChild(li);
    });
}

function handleCellClick(e) {
    const cell = e.target;
    if (cell.classList.contains('found')) return;

    if (!firstSelection) {
        firstSelection = cell;
        cell.classList.add('selected');
    } else {
        const r1 = parseInt(firstSelection.dataset.row);
        const c1 = parseInt(firstSelection.dataset.col);
        const r2 = parseInt(cell.dataset.row);
        const c2 = parseInt(cell.dataset.col);

        const found = checkSelection(r1, c1, r2, c2);
        
        if (!found) {
            // Se errou, remove o destaque visual
            firstSelection.classList.remove('selected');
        }
        firstSelection = null;
    }
}

function checkSelection(r1, c1, r2, c2) {
    let selectedWord = "";
    let cellsToCheck = [];

    if (r1 === r2) { // Horizontal
        const start = Math.min(c1, c2);
        const end = Math.max(c1, c2);
        for (let i = start; i <= end; i++) {
            selectedWord += grid[r1][i];
            cellsToCheck.push(document.querySelector(`.letter-box[data-row="${r1}"][data-col="${i}"]`));
        }
    } else if (c1 === c2) { // Vertical
        const start = Math.min(r1, r2);
        const end = Math.max(r1, r2);
        for (let i = start; i <= end; i++) {
            selectedWord += grid[i][c1];
            cellsToCheck.push(document.querySelector(`.letter-box[data-row="${i}"][data-col="${c1}"]`));
        }
    }

    const reversed = selectedWord.split('').reverse().join('');
    let finalWord = null;

    if (activeWords.includes(selectedWord)) finalWord = selectedWord;
    else if (activeWords.includes(reversed)) finalWord = reversed;

    if (finalWord) {
        const color = wordColorMap[finalWord];
        
        // Pinta as células no tabuleiro
        cellsToCheck.forEach(cell => {
            cell.classList.add('found');
            cell.style.backgroundColor = color;
        });

        // Pinta e risca na lista
        const listItem = document.getElementById(`word-${finalWord}`);
        if (listItem) {
            listItem.classList.add('found-word');
            listItem.style.backgroundColor = color;
            listItem.style.borderRadius = "8px";
        }

        checkVictory();
        return true;
    }
    return false;
}

function checkVictory() {
    const foundCount = document.querySelectorAll('.found-word').length;
    if (foundCount === activeWords.length) {
        messageDiv.classList.remove('hidden');
    }
}

restartBtn.addEventListener('click', initGame);
initGame();