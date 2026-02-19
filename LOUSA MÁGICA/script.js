const canvas = document.getElementById('drawingBoard');
// willReadFrequently ajuda na performance do baldinho
const ctx = canvas.getContext('2d', { willReadFrequently: true });
const modal = document.getElementById('confirmModal');

// Estados do Jogo
let painting = false;
let color = '#000000'; // Começa preto
let lineWidth = 10;
let currentTool = 'brush'; // Opções: 'brush', 'bucket', 'eraser'

// --- CONFIGURAÇÃO INICIAL ---

function resizeCanvas() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight - document.querySelector('.toolbar').offsetHeight;
    
    // CORREÇÃO VITAL: Preenche o fundo de branco.
    // Sem isso, o fundo é transparente e o baldinho "fura" as linhas pretas.
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

window.addEventListener('resize', resizeCanvas);
// Inicia o canvas
window.onload = resizeCanvas;


// --- SISTEMA DE COORDENADAS ---
// Calcula onde está o mouse/dedo relativo ao canvas
function getCoordinates(e) {
    let clientX, clientY;
    if(e.type.includes('touch')) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    } else {
        clientX = e.clientX;
        clientY = e.clientY;
    }
    const rect = canvas.getBoundingClientRect();
    return {
        x: Math.floor(clientX - rect.left),
        y: Math.floor(clientY - rect.top)
    };
}

// --- DESENHO (Pincel e Borracha) ---

function startPosition(e) {
    // Se for baldinho, executa preenchimento e para.
    if (currentTool === 'bucket') {
        const coords = getCoordinates(e);
        const rgbColor = hexToRgb(color);
        floodFill(coords.x, coords.y, rgbColor);
        return;
    }
    painting = true;
    draw(e);
}

function endPosition() {
    painting = false;
    ctx.beginPath();
}

function draw(e) {
    if (!painting || currentTool === 'bucket') return;

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round'; // Deixa as curvas mais suaves
    
    // Se for borracha, pinta de branco. Se não, usa a cor selecionada.
    ctx.strokeStyle = (currentTool === 'eraser') ? 'white' : color;

    const coords = getCoordinates(e);

    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
    
    // Começa novo path para suavizar serrilhado
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
}


// --- BALDINHO (Flood Fill) ---

function floodFill(startX, startY, fillColor) {
    // Pega os dados dos pixels
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixelData = imageData.data;
    
    // Índice do pixel inicial
    const startPos = (startY * canvas.width + startX) * 4;
    
    const startR = pixelData[startPos];
    const startG = pixelData[startPos + 1];
    const startB = pixelData[startPos + 2];
    
    // Se a cor do clique for igual à cor que queremos pintar, sai.
    if (startR === fillColor[0] && startG === fillColor[1] && startB === fillColor[2]) return;

    const pixelStack = [[startX, startY]];

    while (pixelStack.length > 0) {
        const newPos = pixelStack.pop();
        const x = newPos[0];
        let y = newPos[1];

        let pixelPos = (y * canvas.width + x) * 4;
        
        // Sobe até encontrar uma cor diferente
        while (y-- >= 0 && matchColor(pixelPos, startR, startG, startB, pixelData)) {
            pixelPos -= canvas.width * 4;
        }
        
        pixelPos += canvas.width * 4;
        y++;
        let reachLeft = false;
        let reachRight = false;

        // Desce pintando
        while (y++ < canvas.height - 1 && matchColor(pixelPos, startR, startG, startB, pixelData)) {
            colorPixel(pixelPos, fillColor, pixelData);

            // Verifica esquerda
            if (x > 0) {
                if (matchColor(pixelPos - 4, startR, startG, startB, pixelData)) {
                    if (!reachLeft) {
                        pixelStack.push([x - 1, y]);
                        reachLeft = true;
                    }
                } else if (reachLeft) {
                    reachLeft = false;
                }
            }

            // Verifica direita
            if (x < canvas.width - 1) {
                if (matchColor(pixelPos + 4, startR, startG, startB, pixelData)) {
                    if (!reachRight) {
                        pixelStack.push([x + 1, y]);
                        reachRight = true;
                    }
                } else if (reachRight) {
                    reachRight = false;
                }
            }

            pixelPos += canvas.width * 4;
        }
    }

    // Atualiza o canvas
    ctx.putImageData(imageData, 0, 0);
}

function matchColor(pixelPos, r, g, b, pixelData) {
    return (pixelData[pixelPos] === r && pixelData[pixelPos + 1] === g && pixelData[pixelPos + 2] === b);
}

function colorPixel(pixelPos, fillColor, pixelData) {
    pixelData[pixelPos] = fillColor[0];
    pixelData[pixelPos + 1] = fillColor[1];
    pixelData[pixelPos + 2] = fillColor[2];
    pixelData[pixelPos + 3] = 255; // Alpha total
}

// Converte HEX (#FF0000) para array RGB ([255, 0, 0])
function hexToRgb(hex) {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return [r, g, b];
}


// --- CONTROLES DE INTERFACE ---

function setTool(toolName) {
    currentTool = toolName;
    updateActiveButton();
}

function setEraser() {
    currentTool = 'eraser';
    updateActiveButton();
}

function updateActiveButton() {
    // Remove classe active de todos
    document.getElementById('btnBrush').classList.remove('active');
    document.getElementById('btnBucket').classList.remove('active');
    document.getElementById('btnEraser').classList.remove('active');

    // Adiciona no correto
    if(currentTool === 'brush') document.getElementById('btnBrush').classList.add('active');
    if(currentTool === 'bucket') document.getElementById('btnBucket').classList.add('active');
    if(currentTool === 'eraser') document.getElementById('btnEraser').classList.add('active');
}

function setColor(newColor) {
    color = newColor;
    
    // Atualiza visual das bolinhas
    document.querySelectorAll('.color').forEach(el => el.classList.remove('active'));
    // Acha a bolinha clicada (ou similar)
    const selected = Array.from(document.querySelectorAll('.color')).find(el => {
        // Converte rgb() do estilo para hex para comparar ou compara string direta
        // Simplificação: compara se o estilo contém o hex ou rgb equivalente
        return true; // Simplesmente vamos setar no onclick do HTML o 'active' visualmente se precisasse
    });
    
    // Truque: Como passamos o 'this' ou buscamos pelo HEX, vamos fazer simples:
    // O clique já define a cor. O loop abaixo acha a div certa pra dar destaque.
    const allColors = document.querySelectorAll('.color');
    allColors.forEach(c => {
         // Verifica se o background inline contém a cor selecionada (case insensitive)
         if(c.getAttribute('onclick').toLowerCase().includes(newColor.toLowerCase())) {
             c.classList.add('active');
         }
    });
}

function setSize(newSize) {
    lineWidth = newSize;
}

// --- MODAL ---
function openModal() { modal.classList.remove('hidden'); }
function closeModal() { modal.classList.add('hidden'); }
function confirmClear() {
    // Pinta de branco novamente ao invés de clearRect (para o balde continuar funcionando)
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    closeModal();
}


// --- EVENT LISTENERS GLOBAIS ---

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseout', endPosition); 

canvas.addEventListener('touchstart', (e) => { e.preventDefault(); startPosition(e); });
canvas.addEventListener('touchend', (e) => { e.preventDefault(); endPosition(); });
canvas.addEventListener('touchmove', (e) => { e.preventDefault(); draw(e); });