/**
 * game.js
 * Lógica de los minijuegos por capítulo.
 * Cada capítulo tiene una actividad diferente y sencilla.
 */

const Game = (() => {

  // ─── DATOS DE CADA MINIJUEGO ──────────────────────────────────────────────

  const miniGames = [

    // Capítulo 1 – Memotest con elementos originarios
    {
      type: 'memory',
      title: '¡Memoria Originaria!',
      instruction: 'Encontrá los pares de imágenes que van juntos.',
      pairs: [
        { id: 'agua',    emoji: '💧', label: 'Agua termal'   },
        { id: 'sol',     emoji: '☀️', label: 'Sol (Inti)'    },
        { id: 'cerro',   emoji: '⛰️', label: 'Cerro'         },
        { id: 'planta',  emoji: '🌿', label: 'Planta medicinal'},
        { id: 'vapor',   emoji: '♨️', label: 'Vapor termal'  },
        { id: 'estrella',emoji: '⭐', label: 'Estrella'       },
      ],
    },

    // Capítulo 2 – Completar línea del tiempo (ordenar eventos)
    {
      type: 'timeline',
      title: '¡Ordená la Historia!',
      instruction: 'Arrastrá los eventos al orden correcto en la línea del tiempo.',
      events: [
        { id: 'a', text: 'Trazado de 9 manzanas',         year: '1873', order: 0 },
        { id: 'b', text: 'Donación de tierras de Melchora',year: '1874', order: 1 },
        { id: 'c', text: 'Municipalidad de Rosario',       year: '1857', order: 2 }, // roto a propósito para que ordenen
        { id: 'd', text: 'División en dos secciones',      year: '1904', order: 3 },
      ],
      // Orden correcto por year: 1857 → 1873 → 1874 → 1904
      correctOrder: ['c', 'a', 'b', 'd'],
    },

    // Capítulo 3 – Verdadero o Falso sobre el Dr. Palau
    {
      type: 'truefalse',
      title: '¿Verdadero o Falso?',
      instruction: 'Leé cada afirmación y elegí si es Verdadera o Falsa.',
      statements: [
        { text: 'El Dr. Palau era un médico español.',                      answer: true  },
        { text: 'El primer balneario fue inaugurado en 1890.',              answer: false },
        { text: 'Las termas de Rosario de la Frontera son las primeras de Sudamérica.', answer: true  },
        { text: 'El Agua Palau solo se vendía en Salta.',                   answer: false },
        { text: 'El Dr. Palau instaló unas carpas como primer establecimiento.', answer: true },
      ],
    },

    // Capítulo 4 – Relacionar imágenes (drag and drop)
    {
      type: 'match',
      title: '¡Uní los Pares!',
      instruction: 'Arrastrá cada elemento de la izquierda con su par correcto.',
      pairs: [
        { left: { id: 'tren',     emoji: '🚂', text: 'Ferrocarril' },   right: { id: '1885', text: '1885' } },
        { left: { id: 'sarmiento',emoji: '📚', text: 'Sarmiento' },     right: { id: 'pres',  text: 'Presidente visitante' } },
        { left: { id: 'escuela',  emoji: '🏫', text: 'Escuela Normal' },right: { id: '1910', text: '1910' } },
        { left: { id: 'intendente',emoji:'🏛️', text: 'Martín Güemes' }, right: { id: 'int',  text: 'Primer intendente del ferrocarril' } },
      ],
    },

    // Capítulo 5 – Elegir la respuesta correcta (múltiple opción visual)
    {
      type: 'pick',
      title: '¿Quién es Quién?',
      instruction: 'Mirá la descripción y elegí la respuesta correcta.',
      questions: [
        {
          clue: 'Soy los arquitectos que diseñamos el lujoso Hotel Termas.',
          emoji: '🏛️',
          options: ['Palau y Cantón', 'Manuel y José Graña', 'Seguí y Tornquist', 'Torres y Cía.'],
          correct: 1,
        },
        {
          clue: 'Fui el primer casino de toda Sudamérica.',
          emoji: '🎰',
          options: ['Casino de Salta', 'Casino de Buenos Aires', 'Casino del Hotel Termas', 'Casino de Tucumán'],
          correct: 2,
        },
        {
          clue: 'Nacieron en mí el 21 de octubre de 1929 un gran escritor argentino.',
          emoji: '✍️',
          options: ['Juana M. Gorriti', 'Héctor Eduardo Tizón', 'Victoria Ocampo', 'Belisario Roldán'],
          correct: 1,
        },
      ],
    },
  ];

  /** Retorna la configuración del minijuego para un capítulo dado. */
  function getGame(chapterIndex) {
    return miniGames[chapterIndex] || null;
  }

  // ─── LÓGICA DEL MEMOTEST ─────────────────────────────────────────────────

  /**
   * Genera las tarjetas del memotest mezcladas.
   * @param {Array} pairs - Array de pares { id, emoji, label }.
   * @returns {Array} - Tarjetas duplicadas y mezcladas.
   */
  function buildMemoryCards(pairs) {
    const cards = [];
    pairs.forEach(p => {
      cards.push({ ...p, uid: p.id + '_a', flipped: false, matched: false });
      cards.push({ ...p, uid: p.id + '_b', flipped: false, matched: false });
    });
    return cards.sort(() => Math.random() - 0.5);
  }

  // ─── LÓGICA DEL VERDADERO/FALSO ─────────────────────────────────────────

  /**
   * Evalúa si la respuesta del usuario es correcta.
   * @param {object} statement - Afirmación con .answer (bool).
   * @param {boolean} userAnswer - Respuesta del usuario.
   */
  function checkTrueFalse(statement, userAnswer) {
    return statement.answer === userAnswer;
  }

  // ─── LÓGICA DE DRAG & MATCH ──────────────────────────────────────────────

  /**
   * Mezcla los elementos del lado derecho para el juego de emparejar.
   * @param {Array} pairs
   */
  function shuffleRightSide(pairs) {
    const rights = pairs.map(p => ({ ...p.right })).sort(() => Math.random() - 0.5);
    return rights;
  }

  return {
    getGame,
    buildMemoryCards,
    checkTrueFalse,
    shuffleRightSide,
  };
})();
