// --- LÓGICA DO JOGO ---

const levels = [
    { target: 'laranja', name: 'LARANJA', colorCode: '#FF9800', resultImg: 'pote-laranja.png', req: ['vermelho', 'amarelo'] },
    { target: 'verde', name: 'VERDE', colorCode: '#4CAF50', resultImg: 'pote-verde.png', req: ['azul', 'amarelo'] },
    { target: 'roxo', name: 'ROXO', colorCode: '#9C27B0', resultImg: 'pote-roxo.png', req: ['vermelho', 'azul'] }
];

let currentLevelIndex = 0;
let selectedColors = [];
let levelComplete = false;
// Variável para controlar o tempo da pose "falando"
let timerFala = null;

// Mapa das imagens das poses para facilitar a troca
const poses = {
    normal: 'capivara.png',
    falando: 'capivara-falando.png',
    erro: 'capivara-erro.png',
    acerto: 'capivara-acerto.png'
};

window.onload = function() {
    loadLevel(currentLevelIndex);
};

// --- FUNÇÃO NOVA: Gerencia a mudança de pose da capivara ---
function mudarPose(tipo, temporario = false) {
    const img = document.getElementById('capivara-img');
    
    // Se já tiver um temporizador rodando (ela estava falando), cancela ele
    // para não voltar ao normal no meio de um erro ou acerto.
    if (timerFala) {
        clearTimeout(timerFala);
        timerFala = null;
    }

    // Troca a imagem se ela existir no mapa
    if (poses[tipo]) {
        img.src = poses[tipo];
    }

    // Se for uma pose temporária (ex: falando), agenda para voltar ao normal depois de 2s
    if (temporario) {
        timerFala = setTimeout(() => {
            img.src = poses.normal;
        }, 2000); // 2000 milissegundos = 2 segundos falando
    }
}

// --- FUNÇÃO PARA A CAPIVARA FALAR ---
// Adicionamos um parâmetro 'poseEspecifica' para controlar se ela usa a pose de erro/acerto ou a pose falando normal
function capivaraFalar(texto, poseEspecifica = null) {
    const balao = document.getElementById('balao');
    balao.innerHTML = texto; 
    balao.classList.add('visivel');

    // Lógica da pose ao falar:
    if (poseEspecifica) {
        // Se for erro ou acerto, a pose é fixa (não é temporária)
        mudarPose(poseEspecifica, false);
    } else {
        // Se for uma fala comum, usa a pose 'falando' temporariamente
        mudarPose('falando', true);
    }
}

function loadLevel(index) {
    const level = levels[index];
    const targetText = document.getElementById('target-name');
    targetText.innerText = level.name;
    targetText.style.color = level.colorCode;
    
    resetSlots();
    
    // Garante que ela comece a fase na pose normal
    mudarPose('normal');

    const palavraColorida = `<span style="color: ${level.colorCode}">${level.name}</span>`;
    // Fala normal (sem pose específica de erro/acerto)
    capivaraFalar(`Quais cores misturamos para fazer o ${palavraColorida}?`);
}

function selectColor(colorName, imgSrc) {
    if (levelComplete) return;
    if (selectedColors.length >= 2) return;

    if (selectedColors.length === 0) {
        // Fala de incentivo normal
        capivaraFalar("Boa! Agora escolha a segunda cor.");
    }

    selectedColors.push(colorName);
    const slotId = selectedColors.length === 1 ? 'slot1' : 'slot2';
    const slotElement = document.getElementById(slotId);
    slotElement.innerHTML = `<img src="${imgSrc}" alt="${colorName}">`;

    if (selectedColors.length === 2) {
        checkResult();
    }
}

function checkResult() {
    const currentLevel = levels[currentLevelIndex];
    const hasColor1 = currentLevel.req.includes(selectedColors[0]);
    const hasColor2 = currentLevel.req.includes(selectedColors[1]);
    const distinct = selectedColors[0] !== selectedColors[1];

    if (hasColor1 && hasColor2 && distinct) {
        // --- ACERTOU ---
        levelComplete = true;
        
        const palavraColorida = `<span style="color: ${currentLevel.colorCode}">${currentLevel.name}</span>`;
        // Passamos 'acerto' como segundo parâmetro para fixar a pose feliz
        capivaraFalar(`Aêê! Você criou o ${palavraColorida}!`, 'acerto'); 
        
        setTimeout(() => {
            const resultImg = document.getElementById('result-img');
            resultImg.src = currentLevel.resultImg;
            document.getElementById('result-slot').classList.add('success');
            
            setTimeout(nextLevel, 2500); 
        }, 500);

    } else {
        // --- ERROU ---
        // Passamos 'erro' como segundo parâmetro para fixar a pose triste
        capivaraFalar("Ops! Essa mistura não dá certo. Tente de novo!", 'erro');
        
        setTimeout(() => {
            resetSlots();
            // Depois de resetar os slots, volta para a pose normal e dá a dica inicial de novo
            mudarPose('normal');
             const palavraColorida = `<span style="color: ${currentLevel.colorCode}">${currentLevel.name}</span>`;
            capivaraFalar(`Tente de novo: quais cores fazem o ${palavraColorida}?`);
        }, 2000); // Aumentei um pouco o tempo do erro na tela
    }
}

function resetSlots() {
    selectedColors = [];
    levelComplete = false;
    document.getElementById('slot1').innerHTML = '';
    document.getElementById('slot2').innerHTML = '';
    document.getElementById('result-img').src = 'pote-vazio.png';
    document.getElementById('result-slot').classList.remove('success');
}

function nextLevel() {
    currentLevelIndex++;
    if (currentLevelIndex < levels.length) {
        loadLevel(currentLevelIndex);
    } else {
        // Fim do jogo, pose de acerto final
        capivaraFalar("Parabéns! Você é um mestre das cores!", 'acerto');
        setTimeout(() => {
             currentLevelIndex = 0;
             loadLevel(currentLevelIndex);
        }, 4000);
    }
}