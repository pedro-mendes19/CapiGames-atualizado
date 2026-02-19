from flask import Flask, render_template, request

app = Flask(__name__)

# Os dados do jogo: Situações e Escolhas
historia = {
    'inicio': {
        'texto': 'Você acorda em uma nave espacial abandonada. O alarme está tocando. O que você faz?',
        'opcoes': [
            {'escolha': 'corredor', 'texto': 'Correr para o corredor escuro'},
            {'escolha': 'cabine', 'texto': 'Procurar a cabine do piloto'}
        ]
    },
    'corredor': {
        'texto': 'O corredor está cheio de fumaça. Você vê uma sombra se movendo. É um robô!',
        'opcoes': [
            {'escolha': 'lutar', 'texto': 'Lutar com o robô'},
            {'escolha': 'inicio', 'texto': 'Voltar correndo (Reiniciar)'}
        ]
    },
    'cabine': {
        'texto': 'A cabine está intacta! Você vê o botão de "Ejeção de Emergência".',
        'opcoes': [
            {'escolha': 'vitoria', 'texto': 'Apertar o botão e fugir!'},
            {'escolha': 'inicio', 'texto': 'Voltar a dormir (Reiniciar)'}
        ]
    },
    'lutar': {
        'texto': 'O robô era de limpeza... mas você tropeçou e bateu a cabeça. Fim de jogo.',
        'opcoes': [
            {'escolha': 'inicio', 'texto': 'Tentar de novo'}
        ]
    },
    'vitoria': {
        'texto': 'PARABÉNS! Você escapou da nave em segurança e foi resgatado!',
        'opcoes': [
            {'escolha': 'inicio', 'texto': 'Jogar novamente'}
        ]
    }
}

@app.route("/", methods=['GET', 'POST'])
def jogar():
    # Se o jogador acabou de chegar ou reiniciou, começa no 'inicio'
    fase_atual = 'inicio'
    
    # Se o jogador clicou em um botão (fez um POST), pegamos a escolha dele
    if request.method == 'POST':
        fase_atual = request.form.get('proxima_fase')
    
    # Buscamos os dados da fase atual no nosso dicionário
    dados_da_fase = historia[fase_atual]
    
    return render_template("jogo.html", dados=dados_da_fase)

if __name__ == "__main__":
    app.run(debug=True)