// Lista de níveis e cores alvo
const levels = [
    { name: "Maçã", rgb: [210, 40, 40], hex: "#d22828" },
    { name: "Laranja", rgb: [255, 140, 0], hex: "#ff8c00" },
    { name: "Uva", rgb: [100, 20, 150], hex: "#641496" },
    { name: "Limão", rgb: [180, 230, 50], hex: "#b4e632" },
    { name: "Berinjela", rgb: [60, 20, 70], hex: "#3c1446" }
];

let currentLevel = 0;
let mixHistory = [];

// Elementos do DOM
const targetNameEl = document.getElementById('target-name');
const targetColorEl = document.getElementById('target-color');
const paperEl = document.getElementById('paper');
const resultArea = document.getElementById('result-area');
const progressBar = document.getElementById('progress-bar');
const accuracyText = document.getElementById('accuracy-text');
const feedbackText = document.getElementById('feedback-text');
const btnReady = document.getElementById('btn-ready');
const btnNext = document.getElementById('btn-next');
const btnReset = document.getElementById('btn-reset');

// Inicializa o nível
function loadLevel() {
    const level = levels[currentLevel];
    targetNameEl.innerText = level.name;
    targetNameEl.style.color = level.hex;
    targetColorEl.style.backgroundColor = `rgb(${level.rgb[0]}, ${level.rgb[1]}, ${level.rgb[2]})`;
    resetPaper();
    
    resultArea.style.display = 'none';
    btnReady.style.display = 'inline-block';
    btnReset.style.display = 'inline-block';
    btnNext.style.display = 'none';
    progressBar.style.width = '0%';
}

// Adiciona cor à mistura
function addPaint(r, g, b) {
    mixHistory.push([r, g, b]);
    updatePaperColor();
}

// Atualiza a cor mostrada no papel
function updatePaperColor() {
    if (mixHistory.length === 0) {
        paperEl.style.backgroundColor = '#ffffff';
        return;
    }

    let sumR = 0, sumG = 0, sumB = 0;
    mixHistory.forEach(color => {
        sumR += color[0];
        sumG += color[1];
        sumB += color[2];
    });

    const avgR = Math.round(sumR / mixHistory.length);
    const avgG = Math.round(sumG / mixHistory.length);
    const avgB = Math.round(sumB / mixHistory.length);

    paperEl.style.backgroundColor = `rgb(${avgR}, ${avgG}, ${avgB})`;
}

// Reseta a mistura atual
function resetPaper() {
    mixHistory = [];
    updatePaperColor();
}

// Calcula a precisão
function evaluateColor() {
    if (mixHistory.length === 0) {
        alert("Você precisa colocar um pouco de tinta no papel primeiro!");
        return;
    }

    let sumR = 0, sumG = 0, sumB = 0;
    mixHistory.forEach(color => {
        sumR += color[0];
        sumG += color[1];
        sumB += color[2];
    });
    const r = sumR / mixHistory.length;
    const g = sumG / mixHistory.length;
    const b = sumB / mixHistory.length;

    const targetRgb = levels[currentLevel].rgb;

    const distance = Math.sqrt(
        Math.pow(r - targetRgb[0], 2) +
        Math.pow(g - targetRgb[1], 2) +
        Math.pow(b - targetRgb[2], 2)
    );

    const maxGameTolerance = 255; 
    
    let accuracy = 100 - ((distance / maxGameTolerance) * 100);
    
    // --- MÁGICA PARA FACILITAR PARA AS CRIANÇAS ---
    // Se a criança chegou a 85% de proximidade ou mais, damos o 100% para ela!
    if (accuracy >= 85) {
        accuracy = 100;
    }
    
    // Trava o valor para não ficar negativo caso as cores sejam opostas
    accuracy = Math.max(0, accuracy); 

    showResults(accuracy.toFixed(1));
}

// Exibe a barra de progresso
function showResults(accuracy) {
    resultArea.style.display = 'block';
    btnReady.style.display = 'none';
    btnReset.style.display = 'none';
    btnNext.style.display = 'inline-block';

    setTimeout(() => {
        progressBar.style.width = `${accuracy}%`;
        
        if(accuracy >= 90) progressBar.style.background = "#4caf50";
        else if(accuracy >= 60) progressBar.style.background = "#ffeb3b";
        else progressBar.style.background = "#f44336";

        accuracyText.innerText = `${accuracy}% de Precisão`;

        if (accuracy >= 90) {
            feedbackText.innerText = "Incrível! Você é um verdadeiro artista!";
        } else if (accuracy >= 70) {
            feedbackText.innerText = "Muito bom! Chegou bem perto.";
        } else {
            feedbackText.innerText = "Interessante, mas tente usar proporções diferentes na próxima vez!";
        }
    }, 50);
}

// Passa para o próximo nível
function nextLevel() {
    currentLevel++;
    if (currentLevel >= levels.length) {
        alert("Parabéns! Você completou todas as misturas. O jogo vai recomeçar.");
        currentLevel = 0;
    }
    loadLevel();
}

window.onload = loadLevel;