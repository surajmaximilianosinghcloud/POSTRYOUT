/**
 * app.js
 * Controlador principal. Maneja la navegación y el flujo del juego.
 * Es el único módulo que coordina Storage, UI, Game y Quiz.
 */

const App = (() => {

  // ─── ESTADO GLOBAL ────────────────────────────────────────────────────────
  let state          = null;
  let currentChapter = 0;

  // ─── INICIALIZACIÓN ───────────────────────────────────────────────────────

  function init() {
    state = Storage.load();
    navigate('home');
    // Registrar Service Worker para funcionamiento offline (opcional)
    // if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js');
  }

  // ─── NAVEGACIÓN ───────────────────────────────────────────────────────────

  /**
   * Navega a una pantalla y renderiza su contenido.
   * @param {string} screenName - Nombre de la pantalla.
   */
  function navigate(screenName) {
    switch (screenName) {
      case 'home':
        UI.renderHome(state);
        UI.showScreen('screen-home');
        break;
      case 'chapters':
        UI.renderChapters(state);
        UI.showScreen('screen-chapters');
        break;
      case 'story':
        UI.renderStory(currentChapter, 0, state);
        UI.showScreen('screen-story');
        break;
      case 'minigame':
        UI.renderMinigame(currentChapter);
        UI.showScreen('screen-minigame');
        break;
      case 'quiz':
        UI.renderQuiz(currentChapter);
        UI.showScreen('screen-quiz');
        break;
      case 'result':
        // El resultado se renderiza desde finishQuiz
        UI.showScreen('screen-result');
        break;
      case 'progress':
        UI.renderProgress(state);
        UI.showScreen('screen-progress');
        break;
      case 'settings':
        UI.renderSettings(state);
        UI.showScreen('screen-settings');
        break;
      case 'credits':
        UI.renderCredits();
        UI.showScreen('screen-credits');
        break;
      default:
        navigate('home');
    }
  }

  // ─── INICIO DE CAPÍTULO ───────────────────────────────────────────────────

  /**
   * Arranca un capítulo: guarda cuál es y navega a la historia.
   * @param {number} index - Índice del capítulo (0-4).
   */
  function startChapter(index) {
    if (!state.chapters[index] || !state.chapters[index].unlocked) return;
    currentChapter = index;
    navigate('story');
  }

  // ─── NAVEGACIÓN DENTRO DE LA HISTORIA ────────────────────────────────────

  /**
   * Muestra una página concreta de la narración.
   * @param {number} chapterIndex
   * @param {number} pageIndex
   */
  function storyPage(chapterIndex, pageIndex) {
    UI.renderStory(chapterIndex, pageIndex, state);
  }

  // ─── FIN DEL QUIZ ─────────────────────────────────────────────────────────

  /**
   * Procesa el resultado del quiz, guarda el progreso y muestra la medalla.
   * @param {number} chapterIndex
   * @param {number} correctAnswers
   * @param {number} totalQuestions
   */
  function finishQuiz(chapterIndex, correctAnswers, totalQuestions) {
    const { pct, stars } = QuizData.calcScore(correctAnswers, totalQuestions);
    state = Storage.completeChapter(state, chapterIndex, stars, pct);
    Storage.save(state);
    UI.renderResult(chapterIndex, stars, pct);
    UI.showScreen('screen-result');
  }

  // ─── CONFIGURACIÓN ────────────────────────────────────────────────────────

  /**
   * Actualiza un ajuste y guarda.
   * @param {string} key   - Clave del ajuste (sound, music, animations).
   * @param {boolean} value
   */
  function setSetting(key, value) {
    state.settings[key] = value;
    Storage.save(state);
  }

  // ─── RESET ────────────────────────────────────────────────────────────────

  function resetProgress() {
    if (!confirm('¿Seguro que querés reiniciar todo tu progreso? Se perderán tus medallas y estrellas.')) return;
    state = Storage.reset();
    navigate('home');
  }

  // ─── EXPORTS ──────────────────────────────────────────────────────────────

  return {
    init,
    navigate,
    startChapter,
    storyPage,
    finishQuiz,
    setSetting,
    resetProgress,
  };
})();

// Arrancar la app cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', App.init);
