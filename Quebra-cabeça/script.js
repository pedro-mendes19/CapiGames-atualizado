// Pegando os elementos da tela
const menuScreen = document.getElementById('menu-screen');
const gameScreen = document.getElementById('game-screen');
const loadingText = document.getElementById('loading-text');

let generoEscolhido = null;

function irParaJogo(genero) {
    console.log("Gênero escolhido: " + genero);
    generoEscolhido = genero;

    // 1. Esconde o Menu
    menuScreen.style.display = 'none';

    // 2. Mostra a Tela do Jogo
    gameScreen.style.display = 'flex';

    // Apenas para feedback visual por enquanto
    if(genero === 'girl') {
        loadingText.innerText = "Preparando a Menina...";
    } else {
        loadingText.innerText = "Preparando o Menino...";
    }
}

function voltarMenu() {
    // Esconde o Jogo e mostra o Menu de novo
    gameScreen.style.display = 'none';
    menuScreen.style.display = 'flex';
}

// Verifica se estamos na tela do jogo antes de rodar o código
if (document.getElementById('target-body')) {
    
    let placedCount = 0;
    const totalOrgans = 6;
    const winMessage = document.getElementById('win-message');
    const targetBody = document.getElementById('target-body');

    // Drag & Drop Logic
    let activeOrgan = null;
    let xOffset = 0, yOffset = 0;

    const organs = document.querySelectorAll('.organ');
    const dropZones = document.querySelectorAll('.drop-zone');

    organs.forEach(organ => {
        organ.addEventListener('mousedown', dragStart);
        organ.addEventListener('touchstart', dragStart, {passive: false});
    });

    function dragStart(e) {
        if (e.target.classList.contains('placed')) return;

        activeOrgan = e.target;
        
        // Calcular posição inicial do toque/mouse
        if (e.type === "touchstart") {
            initialX = e.touches[0].clientX;
            initialY = e.touches[0].clientY;
        } else {
            initialX = e.clientX;
            initialY = e.clientY;
        }

        // Tira o órgão da sidebar e coloca no corpo do documento (para flutuar livre)
        document.body.appendChild(activeOrgan);
        activeOrgan.style.position = 'fixed';
        activeOrgan.style.zIndex = 1000;
        
        // Centraliza visualmente no cursor
        const rect = activeOrgan.getBoundingClientRect();
        xOffset = rect.width / 2;
        yOffset = rect.height / 2;
        
        moveOrgan(e); // Atualiza posição já no clique

        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);
        document.addEventListener('touchmove', drag, {passive: false});
        document.addEventListener('touchend', dragEnd);
    }

    function drag(e) {
        if (activeOrgan) {
            e.preventDefault();
            moveOrgan(e);
        }
    }

    function moveOrgan(e) {
        let currentX, currentY;
        if (e.type.includes('touch')) {
            currentX = e.touches[0].clientX;
            currentY = e.touches[0].clientY;
        } else {
            currentX = e.clientX;
            currentY = e.clientY;
        }
        
        activeOrgan.style.left = (currentX - xOffset) + "px";
        activeOrgan.style.top = (currentY - yOffset) + "px";
    }

    function dragEnd(e) {
        if (!activeOrgan) return;

        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', dragEnd);
        document.removeEventListener('touchmove', drag);
        document.removeEventListener('touchend', dragEnd);

        checkDrop();
    }

    function checkDrop() {
        const organRect = activeOrgan.getBoundingClientRect();
        const organName = activeOrgan.id;
        let dropped = false;

        dropZones.forEach(zone => {
            if (zone.dataset.organ === organName) {
                const zoneRect = zone.getBoundingClientRect();
                
                // Distância entre centros
                const dist = Math.hypot(
                    (organRect.left + organRect.width/2) - (zoneRect.left + zoneRect.width/2),
                    (organRect.top + organRect.height/2) - (zoneRect.top + zoneRect.height/2)
                );

                // Se estiver perto (menos de 70px)
                if (dist < 70) {
                    snapToZone(activeOrgan, zone);
                    dropped = true;
                }
            }
        });

        if (!dropped) {
            // Se errou, volta para a barra lateral original
            resetOrgan(activeOrgan);
        }
        activeOrgan = null;
    }

    function snapToZone(organ, zone) {
        organ.classList.add('placed');
        targetBody.appendChild(organ); // Move para dentro do container do corpo
        
        // Pega a posição da zona (ex: top: 20%) e aplica no órgão
        organ.style.position = 'absolute';
        organ.style.left = zone.style.left;
        organ.style.top = zone.style.top;

        placedCount++;
        if (placedCount === totalOrgans) {
            setTimeout(() => winMessage.style.display = 'block', 500);
        }
    }

    function resetOrgan(organ) {
        organ.style.position = 'static'; // Volta ao normal
        organ.style.zIndex = 10;
        
        // Verifica de qual lado ele veio originalmente (baseado nos IDs)
        const leftOrgans = ['brain', 'lungs', 'heart'];
        if (leftOrgans.includes(organ.id)) {
            document.querySelector('.left-side').appendChild(organ);
        } else {
            document.querySelector('.right-side').appendChild(organ);
        }
    }
}