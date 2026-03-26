/**
 * @fileoverview Lógica principal do jogo "Quem Sou Eu?"
 * Arquitetura baseada em Classes ES6 com separação de responsabilidades.
 * 
 * Funcionalidades:
 * - Persistência de dados com localStorage (Recorde, Vitórias).
 * - Busca de imagens com Promise.race e timeout de 3s.
 * - Tratamento de CORS e fallback CSS para imagens indisponíveis.
 * - Fuzzy matching para acentos e maiúsculas/minúsculas.
 */

'use strict';

/* ============================================================
   PERSISTÊNCIA (LOCALSTORAGE)
   ============================================================ */

class PersistenceManager {
  static STORAGE_KEY = 'quem_sou_eu_stats';

  static load() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : { highScore: 0, wins: 0, totalGames: 0 };
    } catch (e) {
      console.error("Erro ao carregar dados:", e);
      return { highScore: 0, wins: 0, totalGames: 0 };
    }
  }

  static save(stats) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(stats));
    } catch (e) {
      console.error("Erro ao salvar dados:", e);
    }
  }
}

/* ============================================================
   ESTADO DO JOGO
   ============================================================ */

class GameState {
  constructor() {
    this.currentAnimal = null;
    this.clueIndex = 0;
    this.score = 0;
    this.round = 0;
    this.stats = PersistenceManager.load();
    this.isRoundActive = false;
  }

  resetRound() {
    this.clueIndex = 0;
    this.isRoundActive = true;
  }

  calculatePoints() {
    // 100 base, -15 por pista extra. Mínimo 10.
    return Math.max(10, 100 - (this.clueIndex * 15));
  }

  updateStats(won, points = 0) {
    this.score += points;
    if (won) this.stats.wins++;
    this.stats.totalGames++;
    if (this.score > this.stats.highScore) {
      this.stats.highScore = this.score;
    }
    PersistenceManager.save(this.stats);
  }
}

/* ============================================================
   CONTROLE DE INTERFACE (UI)
   ============================================================ */

class UIController {
  constructor() {
    this.nodes = {
      score: document.getElementById('stat-score'),
      round: document.getElementById('stat-round'),
      highScore: document.getElementById('stat-high-score'),
      wins: document.getElementById('stat-wins'),
      clueText: document.getElementById('clue-text'),
      clueNumber: document.getElementById('clue-number'),
      clueDots: document.getElementById('clue-dots'),
      guessInput: document.getElementById('guess-input'),
      btnSubmit: document.getElementById('btn-submit'),
      btnNextClue: document.getElementById('btn-next-clue'),
      btnGiveUp: document.getElementById('btn-give-up'),
      cluePoints: document.getElementById('clue-points-value'),
      
      // Overlay
      overlay: document.getElementById('result-overlay'),
      modalName: document.getElementById('result-name'),
      modalSci: document.getElementById('result-sci'),
      modalFact: document.getElementById('result-fact-text'),
      modalVerdict: document.getElementById('result-verdict'),
      modalImage: document.getElementById('result-image'),
      modalImageContainer: document.getElementById('result-image-container'),
      modalNextBtn: document.getElementById('btn-next-animal'),
      modalNewGameBtn: document.getElementById('btn-new-game'),
      
      // Toast
      toast: document.getElementById('feedback-toast') || this.createToast()
    };
  }

  createToast() {
    const t = document.createElement('div');
    t.id = 'feedback-toast';
    t.className = 'toast';
    document.body.appendChild(t);
    return t;
  }

  updateStats(state) {
    this._animateChange(this.nodes.score, state.score);
    this.nodes.round.textContent = state.round;
    this.nodes.highScore.textContent = state.stats.highScore;
    this.nodes.wins.textContent = state.stats.wins;
  }

  _animateChange(node, value) {
    if (node.textContent !== String(value)) {
      node.textContent = value;
      node.classList.add('pop');
      setTimeout(() => node.classList.remove('pop'), 400);
    }
  }

  renderClue(animal, index, points) {
    this.nodes.clueNumber.textContent = `Pista ${index + 1}`;
    this.nodes.clueText.textContent = animal.clues[index];
    this.nodes.cluePoints.textContent = points;
    
    // Dots
    this.nodes.clueDots.innerHTML = '';
    animal.clues.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = `clue-dot ${i === index ? 'active' : (i < index ? 'used' : '')}`;
      this.nodes.clueDots.appendChild(dot);
    });
  }

  showToast(msg, type = 'info') {
    this.nodes.toast.textContent = msg;
    this.nodes.toast.className = `toast active toast--${type}`;
    setTimeout(() => this.nodes.toast.classList.remove('active'), 2500);
  }

  showResult(animal, won, points, cluesUsed) {
    this.nodes.modalVerdict.textContent = won ? 'Correto!' : 'Resposta Revelada';
    this.nodes.modalVerdict.className = `result-verdict result-verdict--${won ? 'correct' : 'revealed'}`;
    this.nodes.modalName.textContent = animal.name;
    this.nodes.modalSci.textContent = animal.scientificName;
    this.nodes.modalFact.textContent = animal.funFact;
    
    // Reset Imagem
    this.nodes.modalImage.classList.remove('loaded');
    this.nodes.modalImage.src = '';
    
    // Limpar Fallback anterior
    const oldFallback = this.nodes.modalImageContainer.querySelector('.fallback-card');
    if (oldFallback) oldFallback.remove();

    // Mostrar Shimmer
    const shimmer = document.createElement('div');
    shimmer.className = 'skeleton-shimmer';
    shimmer.innerHTML = `<span>Buscando foto...</span>`;
    this.nodes.modalImageContainer.appendChild(shimmer);

    this.nodes.overlay.classList.add('active');
  }

  updateModalImage(src, animal) {
    const shimmer = this.nodes.modalImageContainer.querySelector('.skeleton-shimmer');
    if (shimmer) shimmer.remove();

    if (src) {
      this.nodes.modalImage.src = src;
      this.nodes.modalImage.onload = () => this.nodes.modalImage.classList.add('loaded');
    } else {
      this.showFallbackCard(animal);
    }
  }

  showFallbackCard(animal) {
    const card = document.createElement('div');
    card.className = 'fallback-card';
    card.style.setProperty('--silhouette-gradient', animal.silhouetteColor);
    card.innerHTML = `
      <div class="fallback-card__sci-name">${animal.scientificName}</div>
      <div class="fallback-card__badge">Foto indisponível</div>
    `;
    this.nodes.modalImageContainer.appendChild(card);
  }

  closeModal() {
    this.nodes.overlay.classList.remove('active');
  }
}

/* ============================================================
   MOTOR DO JOGO (ORQUESTRADOR)
   ============================================================ */

class GameEngine {
  constructor() {
    this.state = new GameState();
    this.ui = new UIController();
    this.animals = this._shuffle([...ANIMAL_DATA]);
    this.animalIdx = 0;
    
    this._init();
  }

  _init() {
    this.ui.nodes.btnSubmit.onclick = () => this.handleGuess();
    this.ui.nodes.btnNextClue.onclick = () => this.nextClue();
    this.ui.nodes.btnGiveUp.onclick = () => this.giveUp();
    this.ui.nodes.modalNextBtn.onclick = () => this.nextRound();
    this.ui.nodes.modalNewGameBtn.onclick = () => location.reload();
    
    document.getElementById('btn-start-game').onclick = () => {
        document.getElementById('welcome-screen').classList.add('hidden');
        document.getElementById('game-screen').classList.remove('hidden');
        this.nextRound();
    };

    // Enter key
    this.ui.nodes.guessInput.onkeypress = (e) => {
      if (e.key === 'Enter') this.handleGuess();
    };
  }

  _shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }

  nextRound() {
    if (this.animalIdx >= this.animals.length) {
      this.animalIdx = 0;
      this.animals = this._shuffle(this.animals);
    }

    this.state.currentAnimal = this.animals[this.animalIdx++];
    this.state.round++;
    this.state.resetRound();
    
    this.ui.closeModal();
    this.ui.updateStats(this.state);
    this.ui.renderClue(this.state.currentAnimal, this.state.clueIndex, this.state.calculatePoints());
    this.ui.nodes.guessInput.value = '';
    this.ui.nodes.guessInput.focus();
    this.ui.nodes.btnNextClue.disabled = false;
  }

  handleGuess() {
    if (!this.state.isRoundActive) return;

    const input = this.ui.nodes.guessInput.value;
    const guess = this._sanitize(input);
    const correct = this._sanitize(this.state.currentAnimal.name);

    if (guess === correct) {
      this.win();
    } else {
      this.ui.nodes.guessInput.classList.add('shake');
      setTimeout(() => this.ui.nodes.guessInput.classList.remove('shake'), 500);
      this.ui.showToast('Tente novamente!', 'error');
    }
  }

  _sanitize(str) {
    return str.toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .trim();
  }

  nextClue() {
    if (this.state.clueIndex < this.state.currentAnimal.clues.length - 1) {
      this.state.clueIndex++;
      this.ui.renderClue(this.state.currentAnimal, this.state.clueIndex, this.state.calculatePoints());
      if (this.state.clueIndex === this.state.currentAnimal.clues.length - 1) {
        this.ui.nodes.btnNextClue.disabled = true;
      }
    }
  }

  giveUp() {
    this.state.isRoundActive = false;
    this.state.updateStats(false);
    this.ui.updateStats(this.state);
    this.ui.showResult(this.state.currentAnimal, false, 0, this.state.clueIndex + 1);
    this.fetchImage(this.state.currentAnimal);
  }

  win() {
    this.state.isRoundActive = false;
    const pts = this.state.calculatePoints();
    this.state.updateStats(true, pts);
    this.ui.updateStats(this.state);
    this.ui.showResult(this.state.currentAnimal, true, pts, this.state.clueIndex + 1);
    this.ui.showToast('Excelente!', 'success');
    this.fetchImage(this.state.currentAnimal);
  }

  async fetchImage(animal) {
    const query = animal.imageQuery;
    const url = `https://source.unsplash.com/featured/800x600/?${encodeURIComponent(query)}`;

    // Timeout de 3 segundos com Promise.race
    const timeout = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout')), 3000)
    );

    try {
      // Tentar fetch para verificar CORS/Disponibilidade
      const fetchPromise = fetch(url, { mode: 'no-cors' }).then(() => url);
      
      const resultUrl = await Promise.race([fetchPromise, timeout]);
      this.ui.updateModalImage(resultUrl, animal);
    } catch (err) {
      console.warn("Falha ao carregar imagem:", err);
      this.ui.updateModalImage(null, animal);
    }
  }
}

// Inicializar
window.onload = () => new GameEngine();
