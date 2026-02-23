const jogadores = [
    // GOLEIROS
    { id: 1, nome: "Alisson", posicao: "Goleiro", clube: "Liverpool", liga: "Premier League", forca: 89, foto: "img/goleiros/alisson.png" },
    { id: 2, nome: "Ederson", posicao: "Goleiro", clube: "Fenerbahçe", liga: "Liga Turca", forca: 86, foto: "img/goleiros/ederson.png" },
    { id: 3, nome: "Bento", posicao: "Goleiro", clube: "Al-Nassr", liga: "Liga Arabe", forca: 82, foto: "img/goleiros/bento.png" },
    { id: 4, nome: "Hugo Souza", posicao: "Goleiro", clube: "Corinthians", liga: "Brasileirão", forca: 82, foto: "img/goleiros/hugo.png" },
    { id: 5, nome: "John Victor", posicao: "Goleiro", clube: "Nottingham Forest", liga: "Premier League", forca: 81, foto: "img/goleiros/john.png" },
    { id: 6, nome: "Carlos Miguel", posicao: "Goleiro", clube: "Palmeiras", liga: "Brasileirão", forca: 83, foto: "img/goleiros/carlos.png" },


    // ZAGUEIROS
    { id: 7, nome: "Marquinhos", posicao: "Zagueiro", clube: "PSG", liga: "Ligue 1", forca: 85, foto: "img/zagueiros/marquinhos.png" },
    { id: 8, nome: "Gabriel Magalhães", posicao: "Zagueiro", clube: "Arsenal", liga: "Premier League", forca: 86, foto: "img/zagueiros/magalhaes.png" },
    { id: 9, nome: "Éder Militão", posicao: "Zagueiro", clube: "Real Madrid", liga: "La Liga", forca: 86, foto: "img/zagueiros/militao.png" },
    { id: 10, nome: "Murillo", posicao: "Zagueiro", clube: "Nottingham Forest", liga: "Premier League", forca: 83, foto: "img/zagueiros/murillo.png" },
    { id: 11, nome: "Beraldo", posicao: "Zagueiro", clube: "PSG", liga: "Ligue 1", forca: 80, foto: "img/zagueiros/beraldo.png" },
    { id: 12, nome: "Bremer", posicao: "Zagueiro", clube: "Juventus", liga: "Serie A", forca: 82, foto: "img/zagueiros/bremer.png" },
    { id: 13, nome: "Alexsandro Ribeiro", posicao: "Zagueiro", clube: "Lille", liga: "Ligue 1", forca: 82, foto: "img/zagueiros/alexsandro.png" },
    { id: 14, nome: "Leo Ortiz", posicao: "Zagueiro", clube: "Flamengo", liga: "Brasileirão", forca: 81, foto: "img/zagueiros/ortiz.png" },
    { id: 15, nome: "Fabricio Bruno", posicao: "Zagueiro", clube: "Cruzeiro", liga: "Brasileirão", forca: 80, foto: "img/zagueiros/fabricio.png" },
    { id: 16, nome: "Thiago Silva", posicao: "Zagueiro", clube: "Fluminense", liga: "Brasileirão", forca: 82, foto: "img/zagueiros/thiago.png" },
    { id: 17, nome: "Leo Pereira", posicao: "Zagueiro", clube: "Flamengo", liga: "Brasileirão", forca: 80, foto: "img/zagueiros/leo_pereira.png" },
    { id: 18, nome: "Vito Reis", posicao: "Zagueiro", clube: "Girona", liga: "Premier League", forca: 80, foto: "img/zagueiros/vitor_reis.png" },

    // LATERAIS
    { id: 19, nome: "Vanderson", posicao: "Lateral Direito", clube: "Monaco", liga: "Ligue 1", forca: 80, foto: "img/lateral/vanderson.png" },
    { id: 20, nome: "Yan Couto", posicao: "Lateral Direito", clube: "Dortmund", liga: "Bundesliga", forca: 80, foto: "img/lateral/yan_couto.png" },
    { id: 21, nome: "Arana", posicao: "Lateral Esquerdo", clube: "Atlético-MG", liga: "Brasileirão", forca: 78, foto: "img/lateral/arana.png" },
    { id: 22, nome: "Wesley", posicao: "Lateral Direito", clube: "Roma", liga: "Serie A", forca: 79, foto: "img/lateral/wesley.png" },
    { id: 23, nome: "Paulo Henrique", posicao: "Lateral Direito", clube: "Vasco", liga: "Brasileirão", forca: 77, foto: "img/lateral/paulo.png" },
    { id: 24, nome: "Douglas Santos", posicao: "Lateral Esquerdo ", clube: "Zenit", liga: "Premier League Russa", forca: 80, foto: "img/lateral/douglas.png" },
    { id: 25, nome: "Luciano Juba", posicao: "Lateral Esquerdo", clube: "Bahia", liga: "Brasileirão", forca: 76, foto: "img/lateral/juba.png" },
    { id: 26, nome: "Carlos Augusto", posicao: "Lateral Esquerdo", clube: "Inter de Milão", liga: "Serie A", forca: 78, foto: "img/lateral/carlos.png" },
    { id: 27, nome: "Reinaldo", posicao: "Lateral Esquerdo", clube: "Mirassol", liga: "Brasileirão", forca: 76, foto: "img/lateral/reinaldo.png" },
    { id: 28, nome: "Caio Henrique", posicao: "Lateral Esquerdo", clube: "Monaco", liga: "Ligue 1", forca: 79, foto: "img/lateral/caio.png" },
    { id: 29, nome: "Matheus Bidu ", posicao: "Lateral Esquerdo", clube: "Corinthians", liga: "Brasileirão", forca: 76, foto: "img/lateral/bidu.png" },
    { id: 30, nome: "Matheusinho ", posicao: "Lateral Direito", clube: "Corinthians", liga: "Brasileirão", forca: 76, foto: "img/lateral/matheusinho.png" },
    { id: 31, nome: "Alex Sandro ", posicao: "Lateral Esquerdo", clube: "Flamengo", liga: "Brasileirão", forca: 78, foto: "img/lateral/alex_sandro.png" },
    { id: 9, nome: "Eder Militão", posicao: "Lateral Direito", clube: "Real Madrid", liga: "La Liga", forca: 86, foto: "img/zagueiros/militao.png" },
    // MEIAS
    { id: 32, nome: "Bruno Guimarães", posicao: "Meia", clube: "Newcastle", liga: "Premier League", forca: 84, foto: "img/meio/bruno_guimaraes.png" },
    { id: 33, nome: "Éderson", posicao: "Meia", clube: "Atalanta", liga: "Serie A", forca: 81, foto: "img/meio/ederson.png" },
    { id: 34, nome: "João Gomes", posicao: "Meia", clube: "Wolves", liga: "Premier League", forca: 80, foto: "img/meio/joao_gomes.png" },
    { id: 35, nome: "André", posicao: "Meia", clube: "Wolves", liga: "Premier League", forca: 80, foto: "img/meio/andre.png" },
    { id: 36, nome: "Lucas Paquetá", posicao: "Meia", clube: "Flamengo", liga: "Brasileirão", forca: 84, foto: "img/meio/paqueta.png" },
    { id: 37, nome: "Neymar", posicao: "Meia", clube: "Santos", liga: "Brasileirão", forca: 84, foto: "img/meio/neymar.png" },
    { id: 38, nome: "Lucas Moura", posicao: "Meia", clube: "São Paulo", liga: "Brasileirão", forca: 77, foto: "img/meio/lucas_moura.png" },
    { id: 39, nome: "Raphael Veiga", posicao: "Meia", clube: "Palmeiras", liga: "Brasileirão", forca: 76, foto: "img/meio/veiga.png" },
    { id: 40, nome: "Casemiro", posicao: "Meia", clube: "Man. United", liga: "Premier League", forca: 85, foto: "img/meio/casemiro.png" },
    { id: 41, nome: "Matheus Pereira", posicao: "Meia", clube: "Cruzeiro", liga: "Brasileirão", forca: 79, foto: "img/meio/matheus_pereira.png" },
    { id: 42, nome: "Gerson", posicao: "Meia", clube: "Zenit", liga: "Premier League Russa", forca: 80, foto: "img/meio/gerson.png" },
    { id: 43, nome: "Joelinton", posicao: "Meia", clube: "Newcastle", liga: "Premier League", forca: 80, foto: "img/meio/joelinton.png" },
    { id: 44, nome: "Fabinho", posicao: "Meia", clube: "AL-Ittihad", liga: "Liga Arabe", forca: 81, foto: "img/meio/fabinho.png" },
    { id: 45, nome: "Andreas Pereira", posicao: "Meia", clube: "Palmeiras", liga: "Brasileirão", forca: 81, foto: "img/meio/andreas.png" },
    { id: 46, nome: "Breno Bidon", posicao: "Meia", clube: "Corinthians", liga: "Brasileirão", forca: 79, foto: "img/meio/breno.png" },
    { id: 47, nome: "Arthur Melo", posicao: "Meia", clube: "Gremio", liga: "Brasileirão", forca: 79, foto: "img/meio/arthur_melo.png" },
    { id: 48, nome: "Andrey Santos", posicao: "Meia", clube: "Chealsea", liga: "Premier League", forca: 82, foto: "img/meio/andrey_santos.png" },
    { id: 49, nome: "Douglas Luis", posicao: "Meia", clube: "Nottingham Forest", liga: "Premier League", forca: 78, foto: "img/meio/douglas_luis.png" },


    // ATACANTES
    { id: 50, nome: "Vinícius Jr", posicao: "Ponta", clube: "Real Madrid", liga: "La Liga", forca: 90, foto: "img/atacantes/vini.png" },
    { id: 51, nome: "Raphinha", posicao: "Ponta", clube: "Barcelona", liga: "La Liga", forca: 88, foto: "img/atacantes/raphinha.png" },
    { id: 52, nome: "Rodrygo", posicao: "Ponta, Meia", clube: "Real Madrid", liga: "La Liga", forca: 85, foto: "img/atacantes/rodrygo.png" },
    { id: 53, nome: "Estêvão", posicao: "Ponta", clube: "Chelsea", liga: "Premier League", forca: 86, foto: "img/atacantes/estevao.png" },
    { id: 54, nome: "Savinho", posicao: "Ponta", clube: "Man. City", liga: "Premier League", forca: 83, foto: "img/atacantes/savinho.png" },
    { id: 55, nome: "Endrick", posicao: "Centroavante", clube: "Real Madrid", liga: "La Liga", forca: 85, foto: "img/atacantes/endrick.png" },
    { id: 56, nome: "Pedro", posicao: "Centroavante", clube: "Flamengo", liga: "Brasileirão", forca: 79, foto: "img/atacantes/pedro.png" },
    { id: 57, nome: "Vitor Roque", posicao: "Centroavante", clube: "Palmeiras", liga: "Brasileirão", forca: 81, foto: "img/atacantes/vitor_roque.png" },
    { id: 58, nome: "Igor Jesus", posicao: "Centroavante", clube: "Nottingham Forest", liga: "Premier League", forca: 82, foto: "img/atacantes/igor_jesus.png" },
    { id: 59, nome: "João Pedro", posicao: "Centroavante", clube: "Chelsea", liga: "Premier League", forca: 84, foto: "img/atacantes/joao_pedro.png" },
    { id: 60, nome: "Richarlison", posicao: "Centroavante", clube: "Tottenham", liga: "Premier League", forca: 80, foto: "img/atacantes/richarlison.png" },
    { id: 61, nome: "Luiz Henrique", posicao: "Ponta", clube: "Zenit", liga: "Premier League Russa", forca: 82, foto: "img/atacantes/luiz_henrique.png" },
    { id: 62, nome: "Igor Paixão", posicao: "Ponta", clube: "Olympique de Marseille", liga: "Ligue 1", forca: 81, foto: "img/atacantes/paixao.png" },
    { id: 63, nome: "Yuri Alberto", posicao: "Centroavante", clube: "Corinthians", liga: "Brasileirão", forca: 78, foto: "img/atacantes/yuri.png" },
    { id: 64, nome: "Kaio Jorge", posicao: "Centroavante", clube: "Cruzeiro", liga: "Brasileirão", forca: 79, foto: "img/atacantes/kaio_jorge.png" },
    { id: 65, nome: "Antony", posicao: "Ponta", clube: "Real Betis", liga: "La Liga", forca: 82, foto: "img/atacantes/antony.png" },
    { id: 66, nome: "Martinelli", posicao: "Ponta", clube: "Arsenal", liga: "Premier League", forca: 85, foto: "img/atacantes/martinelli.png" },
    { id: 67, nome: "Matheus Cunha", posicao: "Ponta", clube: "Wolves", liga: "Premier League", forca: 82, foto: "img/atacantes/cunha.png" },
    { id: 68, nome: "Marcos Leonardo", posicao: "Centroavante", clube: "Al-Hilal", liga: "Liga Arabe", forca: 82, foto: "img/atacantes/marcos_leonardo.png" }

];

let jogadoresEscalados = [];
let slotSelecionado = null; // Slot currently selected for position filtering

// Mapeamento para restaurar as siglas dos slots
const siglasOriginais = {
    'ata-1': 'PE', 'ata-2': 'CA', 'ata-3': 'PD',
    'mei-1': 'MEI', 'mei-2': 'VOL', 'mei-3': 'MEI',
    'lat-1': 'LE', 'zag-1': 'ZAG', 'zag-2': 'ZAG', 'lat-2': 'LD',
    'gol-1': 'GOL',
    'res-1': 'G1', 'res-2': 'G2', 'res-3': 'Z1', 'res-4': 'Z2', 'res-5': 'Z3',
    'res-6': 'LD1', 'res-7': 'LE1', 'res-8': 'MEI1', 'res-9': 'MEI2',
    'res-10': 'MEI3', 'res-11': 'MEI4', 'res-12': 'ATA1', 'res-13': 'ATA2',
    'res-14': 'ATA3', 'res-15': 'ATA4'
};

function renderizarMercado(filtro = 'todos') {
    const listaDoc = document.getElementById('lista-jogadores');
    listaDoc.innerHTML = '';

    let filtrados = jogadores;
    if (filtro === 'Europa') {
        const ligasPrincipais = ["Premier League", "La Liga", "Ligue 1", "Bundesliga", "Serie A"];
        filtrados = jogadores.filter(j => ligasPrincipais.includes(j.liga.trim()));
    } else if (filtro === 'Outras') {
        const ligasPrincipais = ["Premier League", "La Liga", "Ligue 1", "Bundesliga", "Serie A"];
        filtrados = jogadores.filter(j => j.liga !== "Brasileirão" && !ligasPrincipais.includes(j.liga.trim()));
    } else if (filtro === 'Brasileirão') {
        filtrados = jogadores.filter(j => j.liga.trim() === "Brasileirão");
    }

    // If a slot is selected, filter by its position
    if (slotSelecionado) {
        const posicao = slotSelecionado.getAttribute('data-posicao');
        filtrados = filtrados.filter(j => {
            const posicoes = j.posicao.split(',').map(p => p.trim());
            return posicoes.includes(posicao);
        });
    }

    // Show position filter indicator
    const indicadorExistente = document.getElementById('filtro-posicao-indicator');
    if (indicadorExistente) indicadorExistente.remove();

    if (slotSelecionado) {
        const posicao = slotSelecionado.getAttribute('data-posicao');
        const sigla = siglasOriginais[slotSelecionado.id] || slotSelecionado.id;
        const indicador = document.createElement('div');
        indicador.id = 'filtro-posicao-indicator';
        indicador.innerHTML = `
            <span>Mostrando: <strong>${posicao}s</strong> (${sigla})</span>
            <button onclick="limparSelecaoSlot()" class="btn-limpar-filtro">✕</button>
        `;
        listaDoc.parentNode.insertBefore(indicador, listaDoc);
    }

    filtrados.forEach(jog => {
        const card = document.createElement('div');
        card.className = 'card-jogador-lista';
        if (jogadoresEscalados.some(e => e.id === jog.id)) {
            card.style.opacity = "0.4";
            card.style.pointerEvents = "none";
        }
        card.innerHTML = `
            <div class="info-main">
                <img src="${jog.foto}" class="foto-lista">
                <div>
                    <span class="txt-nome">${jog.nome}</span>
                    <span class="txt-clube">${jog.clube}</span>
                </div>
            </div>
            <span class="badge-forca">${jog.forca}</span>
        `;
        card.onclick = () => escalar(jog);
        listaDoc.appendChild(card);
    });
}

function selecionarSlot(slot) {
    if (slot.classList.contains('preenchido')) return;

    // Toggle: clicking the same slot again deselects it
    if (slotSelecionado === slot) {
        limparSelecaoSlot();
        return;
    }

    // Remove highlight from previous selection
    if (slotSelecionado) {
        slotSelecionado.classList.remove('slot-selecionado');
    }

    slotSelecionado = slot;
    slot.classList.add('slot-selecionado');
    renderizarMercado();
}

function limparSelecaoSlot() {
    if (slotSelecionado) {
        slotSelecionado.classList.remove('slot-selecionado');
    }
    slotSelecionado = null;
    const indicador = document.getElementById('filtro-posicao-indicator');
    if (indicador) indicador.remove();
    renderizarMercado();
}

function escalar(jogador) {
    if (jogadoresEscalados.some(e => e.id === jogador.id)) return;

    // If a slot is selected, try to place in that specific slot first
    let slot;
    if (slotSelecionado && !slotSelecionado.classList.contains('preenchido')) {
        const posicaoSlot = slotSelecionado.getAttribute('data-posicao');
        const posicoes = jogador.posicao.split(',').map(p => p.trim());
        if (posicoes.includes(posicaoSlot) || posicaoSlot === 'Reserva') {
            slot = slotSelecionado;
        }
    }

    // Fallback: Tenta Titular -> Se não der, tenta Reserva
    if (!slot) {
        const posicoes = jogador.posicao.split(',').map(p => p.trim());
        for (const pos of posicoes) {
            slot = Array.from(document.querySelectorAll(`.slot[data-posicao="${pos}"]`))
                .find(s => !s.classList.contains('preenchido'));
            if (slot) break;
        }
    }

    if (!slot) {
        slot = Array.from(document.querySelectorAll(`.slot[data-posicao="Reserva"]`))
            .find(s => !s.classList.contains('preenchido'));
    }

    if (slot) {
        const idSlot = slot.id;
        const conteudoOriginal = slot.innerHTML;

        slot.innerHTML = `
            <img src="${jogador.foto}" class="foto-escalado">
            <span class="nome-player-campo">${jogador.nome.split(' ')[0]}</span>
        `;
        slot.classList.add('preenchido');
        slot.classList.remove('slot-selecionado');
        jogadoresEscalados.push(jogador);

        slot.onclick = () => removerJogador(jogador.id, slot, idSlot, conteudoOriginal);

        // Clear selection after placing player
        if (slotSelecionado === slot) {
            slotSelecionado = null;
        }

        atualizarMedia();
        renderizarMercado();
    } else {
        mostrarModal({
            titulo: "CONVOCAÇÃO CHEIA!",
            mensagem: "Você já atingiu o limite de jogadores para esta posição e para o banco de reservas.",
            tipo: "alert"
        });
    }
}

function removerJogador(id, slot, idSlot, conteudoOriginal) {
    jogadoresEscalados = jogadoresEscalados.filter(j => j.id !== id);

    // Restaura a sigla original do slot
    if (siglasOriginais[idSlot]) {
        slot.innerHTML = `<b>${siglasOriginais[idSlot]}</b>`;
    }

    slot.classList.remove('preenchido');
    slot.onclick = () => selecionarSlot(slot);
    atualizarMedia();
    renderizarMercado();
}

function limparTudo() {
    mostrarModal({
        titulo: "ZERAR CONVOCAÇÃO?",
        mensagem: "Isso removerá todos os jogadores escalados e reservas. Esta ação não pode ser desfeita.",
        tipo: "confirm",
        onConfirm: () => {
            // Clear any slot selection
            if (slotSelecionado) {
                slotSelecionado.classList.remove('slot-selecionado');
                slotSelecionado = null;
            }
            const indicador = document.getElementById('filtro-posicao-indicator');
            if (indicador) indicador.remove();

            document.querySelectorAll('.slot').forEach(slot => {
                const id = slot.id;
                if (siglasOriginais[id]) {
                    slot.innerHTML = `<b>${siglasOriginais[id]}</b>`;
                }
                slot.classList.remove('preenchido');
                slot.onclick = () => selecionarSlot(slot);
            });

            jogadoresEscalados = [];
            atualizarMedia();
            renderizarMercado();
        }
    });
}

function filtrar(liga) {
    document.querySelectorAll('.btn-filtro').forEach(btn => btn.classList.remove('active'));
    if (event) event.target.classList.add('active');
    renderizarMercado(liga);
}

function atualizarMedia() {
    const el = document.getElementById('media-forca');
    if (jogadoresEscalados.length === 0) { el.innerText = "0.0"; return; }
    const media = (jogadoresEscalados.reduce((acc, j) => acc + j.forca, 0) / jogadoresEscalados.length).toFixed(1);
    el.innerText = media;
}

// --- FUNÇÕES DO MODAL ---
function mostrarModal({ titulo, mensagem, tipo, onConfirm, onCancel }) {
    const overlay = document.getElementById('modal-overlay');
    const h2 = document.getElementById('modal-titulo');
    const p = document.getElementById('modal-mensagem');
    const containerBotoes = document.getElementById('modal-botoes');

    h2.innerText = titulo;
    p.innerText = mensagem;
    containerBotoes.innerHTML = '';

    if (tipo === 'confirm') {
        const btnSim = document.createElement('button');
        btnSim.className = 'modal-btn modal-btn-confirmar';
        btnSim.innerText = 'SIM, ZERAR';
        btnSim.onclick = () => {
            if (onConfirm) onConfirm();
            fecharModal();
        };

        const btnNao = document.createElement('button');
        btnNao.className = 'modal-btn modal-btn-cancelar';
        btnNao.innerText = 'CANCELAR';
        btnNao.onclick = () => {
            if (onCancel) onCancel();
            fecharModal();
        };

        containerBotoes.appendChild(btnNao);
        containerBotoes.appendChild(btnSim);
    } else {
        const btnOk = document.createElement('button');
        btnOk.className = 'modal-btn modal-btn-confirmar';
        btnOk.innerText = 'ENTENDI';
        btnOk.onclick = fecharModal;
        containerBotoes.appendChild(btnOk);
    }

    overlay.classList.add('ativo');
}

function fecharModal() {
    document.getElementById('modal-overlay').classList.remove('ativo');
}

// Fechar modal ao clicar fora da caixa
document.getElementById('modal-overlay').addEventListener('click', (e) => {
    if (e.target.id === 'modal-overlay') fecharModal();
});

// Initialize: add click handlers to empty slots for position filtering
function inicializarSlots() {
    document.querySelectorAll('.slot').forEach(slot => {
        if (!slot.classList.contains('preenchido')) {
            slot.onclick = () => selecionarSlot(slot);
        }
    });
}

inicializarSlots();
renderizarMercado();