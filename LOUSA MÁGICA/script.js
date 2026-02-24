const canvas = document.getElementById('drawingBoard');
const ctx = canvas.getContext('2d', { willReadFrequently: true });
const modal = document.getElementById('confirmModal');

// Estados do Jogo
let painting = false;
let color = '#000000'; 
let lineWidth = 5;
let currentTool = 'brush'; 

// Variáveis para formas e desfazer
let startX, startY;
let snapshot; 
let undoStack = []; 

function resizeCanvas() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight - document.querySelector('.toolbar').offsetHeight;
    
    // Fundo inicial branco
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveState(); 
}

window.addEventListener('resize', resizeCanvas);
window.onload = resizeCanvas;

// --- SISTEMA DE UNDO (DESFAZER) ---
function saveState() {
    if (undoStack.length > 20) undoStack.shift(); 
    undoStack.push(canvas.toDataURL());
}

function undoDrawing() {
    if (undoStack.length > 1) {
        undoStack.pop(); 
        let lastState = undoStack[undoStack.length - 1]; 
        let img = new Image();
        img.src = lastState;
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        }
    } else if (undoStack.length === 1) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

// --- COORDENADAS ---
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

// --- DESENHO PRINCIPAL ---
function startPosition(e) {
    painting = true;
    const coords = getCoordinates(e);
    startX = coords.x;
    startY = coords.y;

    saveState(); 

    if (currentTool === 'bucket') {
        floodFill(coords.x, coords.y, hexToRgb(color));
        painting = false;
        return;
    }

    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);

    if (currentTool === 'brush' || currentTool === 'eraser') {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        draw(e); 
    }
}

function endPosition() {
    painting = false;
    ctx.beginPath();
}

function draw(e) {
    if (!painting || currentTool === 'bucket') return;

    const coords = getCoordinates(e);

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = (currentTool === 'eraser') ? 'white' : color;

    if (currentTool === 'brush' || currentTool === 'eraser') {
        ctx.lineTo(coords.x, coords.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(coords.x, coords.y);
    } else {
        ctx.putImageData(snapshot, 0, 0);
        ctx.beginPath();

        if (currentTool === 'line') {
            ctx.moveTo(startX, startY);
            ctx.lineTo(coords.x, coords.y);
        } else if (currentTool === 'rect') {
            ctx.rect(startX, startY, coords.x - startX, coords.y - startY);
        } else if (currentTool === 'circle') {
            // Círculo com dinâmica perfeita (clique e arraste pelas pontas)
            let centroX = (startX + coords.x) / 2;
            let centroY = (startY + coords.y) / 2;
            let raioX = Math.abs(coords.x - startX) / 2;
            let raioY = Math.abs(coords.y - startY) / 2;
            ctx.ellipse(centroX, centroY, raioX, raioY, 0, 0, 2 * Math.PI);
        }
        ctx.stroke();
    }
}

// --- BALDINHO DE TINTA (Flood Fill Melhorado) ---
function floodFill(startX, startY, fillColor) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixelData = imageData.data;
    const startPos = (startY * canvas.width + startX) * 4;
    
    const startR = pixelData[startPos];
    const startG = pixelData[startPos + 1];
    const startB = pixelData[startPos + 2];
    
    const tolerance = 50; 

    if (Math.abs(startR - fillColor[0]) <= tolerance &&
        Math.abs(startG - fillColor[1]) <= tolerance &&
        Math.abs(startB - fillColor[2]) <= tolerance) {
        return;
    }

    const pixelStack = [[startX, startY]];

    while (pixelStack.length > 0) {
        const newPos = pixelStack.pop();
        const x = newPos[0];
        let y = newPos[1];

        let pixelPos = (y * canvas.width + x) * 4;
        
        while (y-- >= 0 && matchColor(pixelPos, startR, startG, startB, tolerance, pixelData)) {
            pixelPos -= canvas.width * 4;
        }
        
        pixelPos += canvas.width * 4;
        y++;
        let reachLeft = false;
        let reachRight = false;

        while (y++ < canvas.height - 1 && matchColor(pixelPos, startR, startG, startB, tolerance, pixelData)) {
            colorPixel(pixelPos, fillColor, pixelData);

            if (x > 0) {
                if (matchColor(pixelPos - 4, startR, startG, startB, tolerance, pixelData)) {
                    if (!reachLeft) {
                        pixelStack.push([x - 1, y]);
                        reachLeft = true;
                    }
                } else if (reachLeft) { reachLeft = false; }
            }

            if (x < canvas.width - 1) {
                if (matchColor(pixelPos + 4, startR, startG, startB, tolerance, pixelData)) {
                    if (!reachRight) {
                        pixelStack.push([x + 1, y]);
                        reachRight = true;
                    }
                } else if (reachRight) { reachRight = false; }
            }
            pixelPos += canvas.width * 4;
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

function matchColor(pixelPos, r, g, b, tolerance, pixelData) {
    const pr = pixelData[pixelPos];
    const pg = pixelData[pixelPos + 1];
    const pb = pixelData[pixelPos + 2];
    return (
        Math.abs(pr - r) <= tolerance &&
        Math.abs(pg - g) <= tolerance &&
        Math.abs(pb - b) <= tolerance
    );
}

function colorPixel(pixelPos, fillColor, pixelData) {
    pixelData[pixelPos] = fillColor[0];
    pixelData[pixelPos + 1] = fillColor[1];
    pixelData[pixelPos + 2] = fillColor[2];
    pixelData[pixelPos + 3] = 255; 
}

function hexToRgb(hex) {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return [r, g, b];
}

// --- CONTROLES DA INTERFACE ---
function setTool(toolName) {
    currentTool = toolName;
    document.querySelectorAll('.tool-btn, .eraser').forEach(btn => btn.classList.remove('active'));
    document.getElementById('btn-' + toolName).classList.add('active');
}

function setColor(newColor, element) {
    color = newColor;
    document.getElementById('colorPicker').value = newColor; 
    updateColorUI(element);
}

function setCustomColor(newColor) {
    color = newColor;
    updateColorUI(null);
}

function updateColorUI(activeElement) {
    document.querySelectorAll('.color').forEach(el => el.classList.remove('active'));
    if (activeElement) {
        activeElement.classList.add('active');
    }
}

function setSize(newSize) {
    lineWidth = newSize;
}

// --- MODAL LIMPAR ---
function openModal() { modal.classList.remove('hidden'); }
function closeModal() { modal.classList.add('hidden'); }
function confirmClear() {
    saveState(); 
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    closeModal();
}

// --- EVENTOS DO MOUSE/TOUCH ---
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseout', endPosition); 

canvas.addEventListener('touchstart', (e) => { e.preventDefault(); startPosition(e); }, {passive: false});
canvas.addEventListener('touchend', (e) => { e.preventDefault(); endPosition(); }, {passive: false});
canvas.addEventListener('touchmove', (e) => { e.preventDefault(); draw(e); }, {passive: false});