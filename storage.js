/**
 * storage.js
 * Manejo del progreso del jugador usando localStorage.
 * Guarda: capítulos completados, medallas, estrellas, configuración.
 */

const Storage = (() => {
  const KEY = 'rosario_game_v1';

  // Estado inicial del juego
  const defaultState = () => ({
    playerName: '',
    currentChapter: 0,
    chapters: {
      0: { unlocked: true,  completed: false, stars: 0, medal: false, quizScore: 0 },
      1: { unlocked: false, completed: false, stars: 0, medal: false, quizScore: 0 },
      2: { unlocked: false, completed: false, stars: 0, medal: false, quizScore: 0 },
      3: { unlocked: false, completed: false, stars: 0, medal: false, quizScore: 0 },
      4: { unlocked: false, completed: false, stars: 0, medal: false, quizScore: 0 },
    },
    settings: {
      sound: true,
      music: true,
      animations: true,
    },
    totalStars: 0,
    lastPlayed: null,
  });

  /** Carga el estado desde localStorage. Si no existe, crea uno nuevo. */
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return defaultState();
      return JSON.parse(raw);
    } catch (e) {
      console.warn('Storage: error al cargar datos, reiniciando.', e);
      return defaultState();
    }
  }

  /** Guarda el estado actual en localStorage. */
  function save(state) {
    try {
      state.lastPlayed = new Date().toISOString();
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Storage: error al guardar datos.', e);
    }
  }

  /** Resetea todo el progreso. */
  function reset() {
    localStorage.removeItem(KEY);
    return defaultState();
  }

  /**
   * Marca un capítulo como completado y desbloquea el siguiente.
   * @param {object} state - Estado actual del juego.
   * @param {number} chapterIndex - Índice del capítulo completado.
   * @param {number} stars - Estrellas obtenidas (0-3).
   * @param {number} quizScore - Puntuación del quiz (0-100).
   */
  function completeChapter(state, chapterIndex, stars, quizScore) {
    if (!state.chapters[chapterIndex]) return state;

    state.chapters[chapterIndex].completed = true;
    state.chapters[chapterIndex].medal = true;
    state.chapters[chapterIndex].stars = Math.max(
      state.chapters[chapterIndex].stars,
      stars
    );
    state.chapters[chapterIndex].quizScore = Math.max(
      state.chapters[chapterIndex].quizScore,
      quizScore
    );

    // Desbloquear el siguiente capítulo
    const next = chapterIndex + 1;
    if (state.chapters[next] !== undefined) {
      state.chapters[next].unlocked = true;
    }

    // Recalcular estrellas totales
    state.totalStars = Object.values(state.chapters).reduce(
      (acc, ch) => acc + (ch.stars || 0),
      0
    );

    return state;
  }

  /** Calcula el porcentaje global de completado. */
  function getProgress(state) {
    const total = Object.keys(state.chapters).length;
    const done  = Object.values(state.chapters).filter(c => c.completed).length;
    return Math.round((done / total) * 100);
  }

  return { load, save, reset, completeChapter, getProgress, defaultState };
})();
