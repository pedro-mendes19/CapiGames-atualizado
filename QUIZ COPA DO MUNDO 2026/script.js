let gols = 0;
let perguntasRespondidas = 0;
const TOTAL_PERGUNTAS_JOGO = 15;
let perguntasDaPartida = [];

const bancoPerguntas = [
    // GRUPO A, B, C
    { p: "Qual seleção joga de verde e tem o apelido de 'El Tri'?", o: ["México", "EUA", "Canadá", "Brasil"], c: "México" },
    { p: "Qual seleção  tem uma folha de bordo na bandeira?", o: ["Canadá", "Suíça", "Catar", "Noruega"], c: "Canadá" },
    { p: "Quantas Copas o Brasil já venceu?", o: ["4", "5", "6", "3"], c: "5" },
    { p: "Qual surpreendeu o mundo na Copa de 2022?", o: ["Marrocos", "Haiti", "Escócia", "Egito"], c: "Marrocos" },

    // GRUPO D, E, F
    { p: "Qual seleção é conhecida como 'Socceroos'?", o: ["Austrália", "EUA", "Paraguai", "Japão"], c: "Austrália" },
    { p: "A Alemanha venceu sua última Copa em qual ano?", o: ["2010", "2014", "2018", "2006"], c: "2014" },
    { p: "Qual seleção africana tem como apelido 'Os Elefantes'?", o: ["Costa do Marfim", "Equador", "Curaçao", "Senegal"], c: "Costa do Marfim" },
    { p: "Qual seleção usa um uniforme laranja vibrante?", o: ["Holanda", "Japão", "Tunísia", "Bélgica"], c: "Holanda" },

    // GRUPO G, H, I
    { p: "Qual seleção tem o apelido de 'Diabos Vermelhos'?", o: ["Bélgica", "Irã", "Egito", "Noruega"], c: "Bélgica" },
    { p: "A Espanha é famosa por qual estilo de jogo?", o: ["Catenaccio", "Tiki-taka", "Joga Bonito", "Kick and Rush"], c: "Tiki-taka" },
    { p: "Qual seleção tem 2 títulos e é chamada de 'La Celeste'?", o: ["Uruguai", "Cabo Verde", "Espanha", "Argentina"], c: "Uruguai" },
    { p: "A França venceu a Copa em 1998 e em qual outro ano?", o: ["2014", "2018", "2022", "2010"], c: "2018" },
    { p: "Qual craque joga na seleção da Noruega?", o: ["Haaland", "Mbappé", "Kane", "Messi"], c: "Haaland" },

    // GRUPO J, K, L (E OUTROS)
    { p: "Quem é o capitão e camisa 10 da Argentina ?", o: ["Messi", "Di María", "Alvarez", "Enzo"], c: "Messi" },
    { p: "Qual seleção tem o craque Cristiano Ronaldo?", o: ["Portugal", "Colômbia", "Uzbequistão", "Áustria"], c: "Portugal" },
    { p: "Qual seleção veste uma camisa quadriculada?", o: ["Croácia", "Inglaterra", "Gana", "Panamá"], c: "Croácia" },
    { p: "Qual seleção tem o apelido de 'The Three Lions'?", o: ["Inglaterra", "Gana", "Croácia", "Panamá"], c: "Inglaterra" },
    { p: "A seleção de Gana  é conhecida como?", o: ["Estrelas Negras", "Leões", "Águias", "Elefantes"], c: "Estrelas Negras" },

    // PERGUNTAS GERAIS SOBRE OS 48 TIMES
    { p: "Qual destes países é uma ilha no Caribe?", o: ["Curaçao", "Equador", "Alemanha", "Jordânia"], c: "Curaçao" },
    { p: "Qual seleção asiática participou da última abertura de Copa?", o: ["Catar", "Irã", "Japão", "Coreia do Sul"], c: "Catar" },
    { p: "Qual seleção é conhecida como 'Raposas do Deserto'?", o: ["Argélia", "Egito", "Senegal", "Marrocos"], c: "Argélia" },
    { p: "Qual seleção é sul-americana e veste amarelo?", o: ["Colômbia", "Paraguai", "Uruguai", "Peru"], c: "Colômbia" },
    { p: "Qual país sediou a Copa de 2010?", o: ["África do Sul", "México", "Coreia do Sul", "Catar"], c: "África do Sul" },
    { p: "O Paraguai faz parte de qual confederação?", o: ["CONMEBOL", "CONCACAF", "UEFA", "AFC"], c: "CONMEBOL" }
];

function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function mostrarTela(tela) {
    document.querySelectorAll('.game-container').forEach(div => div.classList.add('hidden'));
    document.getElementById('modal-fim').classList.add('hidden');
    document.body.classList.remove('body-quiz');

    if (tela === 'inicio') document.getElementById('tela-inicio').classList.remove('hidden');
    if (tela === 'quiz') {
        document.getElementById('tela-quiz').classList.remove('hidden');
        document.body.classList.add('body-quiz');
        prepararJogo();
    }
    if (tela === 'grupos') document.getElementById('tela-grupos').classList.remove('hidden');
}

function prepararJogo() {
    perguntasDaPartida = embaralhar([...bancoPerguntas]).slice(0, TOTAL_PERGUNTAS_JOGO);
    perguntasRespondidas = 0; gols = 0;
    document.getElementById("gols").innerText = "0";
    proximaPergunta();
}

function proximaPergunta() {
    if (perguntasRespondidas < TOTAL_PERGUNTAS_JOGO) {
        renderizar(perguntasDaPartida[perguntasRespondidas]);
    } else {
        finalizarJogo();
    }
}

function renderizar(item) {
    document.getElementById("fase-label").innerText = `Pergunta ${perguntasRespondidas + 1} de ${TOTAL_PERGUNTAS_JOGO}`;
    document.getElementById("pergunta").innerText = item.p;
    document.getElementById("progress-bar").style.width = `${(perguntasRespondidas / TOTAL_PERGUNTAS_JOGO) * 100}%`;
    const container = document.getElementById("opcoes");
    container.innerHTML = "";

    embaralhar([...item.o]).forEach(opcao => {
        const btn = document.createElement("button");
        btn.innerText = opcao;
        btn.classList.add("btn-opcao");
        btn.onclick = () => {
            const todos = container.querySelectorAll("button");
            todos.forEach(b => b.classList.add("desabilitado"));
            if (opcao === item.c) { btn.classList.add("correta"); gols++; }
            else { btn.classList.add("errada"); todos.forEach(b => { if (b.innerText === item.c) b.classList.add("correta"); }); }
            document.getElementById("gols").innerText = gols;
            perguntasRespondidas++;
            setTimeout(proximaPergunta, 1200);
        };
        container.appendChild(btn);
    });
}

function finalizarJogo() {
    document.getElementById("modal-fim").classList.remove("hidden");
    document.getElementById("resultado-gols").innerText = gols;
    document.getElementById("texto-modal").innerText = `Partida encerrada! Você marcou ${gols} gols!`;
}