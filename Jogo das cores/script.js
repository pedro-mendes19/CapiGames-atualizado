const frases = {
    vermelho: "O <strong class='texto-vermelho'>Vermelho</strong> é uma cor forte! Ela está nas maçãs e no morango.",
    amarelo: "O <strong class='texto-amarelo'>Amarelo</strong> é brilhante como o sol e as bananas!",
    azul: "O <strong class='texto-azul'>Azul</strong> é a cor do céu e do mirtilo!",
    vitoria: "Muito bem! Você conheceu as 3 cores primárias. Vamos misturá-las?"
};

let coresClicadas = new Set();

function interagirCor(cor) {
    const balao = document.getElementById('balao-texto');
    
    // Atualiza o texto da capivara
    balao.innerHTML = frases[cor];
    
    // Adiciona a cor ao registro de cliques
    coresClicadas.add(cor);
    
    // Se clicar em todas as 3, libera o botão de próxima fase
    if (coresClicadas.size === 3) {
        setTimeout(() => {
            balao.innerHTML = frases.vitoria;
            document.getElementById('btn-proximo').classList.remove('d-none');
        }, 1500);
    }
}

function proximaFase() {
    alert("Indo para a Fase 2: Cores Secundárias!");
    // window.location.href = "fase2.html"; 
}