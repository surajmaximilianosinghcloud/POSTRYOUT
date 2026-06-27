/**
 * ui.js
 * Genera el HTML de cada pantalla y maneja transiciones visuales.
 * No contiene lógica de negocio, solo presentación.
 */

const UI = (() => {

  // ─── UTILIDADES ──────────────────────────────────────────────────────────

  /** Muestra una pantalla y oculta las demás con animación. */
  function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => {
      s.classList.remove('active');
    });
    const target = document.getElementById(id);
    if (target) {
      target.classList.add('active');
      target.scrollTop = 0;
    }
  }

  /** Genera estrellas HTML (0-3 rellenas). */
  function starsHTML(count) {
    let html = '';
    for (let i = 0; i < 3; i++) {
      html += `<span class="star ${i < count ? 'filled' : ''}">★</span>`;
    }
    return html;
  }

  /** Crea la barra de progreso superior. */
  function progressBar(pct, label = '') {
    return `
      <div class="progress-bar-wrap">
        ${label ? `<span class="progress-label">${label}</span>` : ''}
        <div class="progress-bar">
          <div class="progress-fill" style="width:${pct}%"></div>
        </div>
        <span class="progress-pct">${pct}%</span>
      </div>`;
  }

  /** Botón volver genérico. */
  function backBtn(targetScreen) {
    return `<button class="btn-back" onclick="App.navigate('${targetScreen}')">← Volver</button>`;
  }

  // ─── PANTALLA: INICIO ────────────────────────────────────────────────────

  function renderHome(state) {
    const pct = Storage.getProgress(state);
    const el  = document.getElementById('screen-home');
    el.innerHTML = `
      <div class="home-header">
        <div class="home-logo">🏔️</div>
        <h1 class="home-title">Historia de<br><span>Rosario de la Frontera</span></h1>
        <p class="home-subtitle">¡Explorá la historia de tu ciudad!</p>
      </div>

      <div class="home-progress-card">
        <p>Tu progreso</p>
        ${progressBar(pct)}
        <p class="home-stars">⭐ ${state.totalStars} estrellas ganadas</p>
      </div>

      <div class="home-btns">
        <button class="btn-primary btn-xl" onclick="App.navigate('chapters')">
          📚 ¡Jugar!
        </button>
        <div class="home-btns-row">
          <button class="btn-secondary" onclick="App.navigate('progress')">📊 Progreso</button>
          <button class="btn-secondary" onclick="App.navigate('settings')">⚙️ Ajustes</button>
          <button class="btn-secondary" onclick="App.navigate('credits')">ℹ️ Créditos</button>
        </div>
      </div>

      <p class="home-credit">Creado por <strong>Suraj Maximiliano Singh</strong></p>
    `;
  }

  // ─── PANTALLA: CAPÍTULOS ─────────────────────────────────────────────────

  const chapterMeta = [
    { title: 'Las Aguas Sagradas',        emoji: '💧', color: '#4FC3F7', subtitle: 'Los pueblos originarios' },
    { title: 'La Fundación',              emoji: '🏘️', color: '#81C784', subtitle: 'La ciudad nace' },
    { title: 'El Dr. Palau y las Termas', emoji: '♨️', color: '#FFB74D', subtitle: 'El primer balneario' },
    { title: 'El Ferrocarril',            emoji: '🚂', color: '#F06292', subtitle: 'El progreso llega' },
    { title: 'El Hotel y su Esplendor',   emoji: '🏨', color: '#CE93D8', subtitle: 'Una época dorada' },
  ];

  function renderChapters(state) {
    const el = document.getElementById('screen-chapters');
    let cards = '';
    chapterMeta.forEach((ch, i) => {
      const data   = state.chapters[i];
      const locked = !data.unlocked;
      const done   = data.completed;
      cards += `
        <div class="chapter-card ${locked ? 'locked' : ''} ${done ? 'done' : ''}"
             onclick="${locked ? '' : `App.startChapter(${i})`}"
             style="--ch-color:${ch.color}">
          <div class="chapter-emoji">${locked ? '🔒' : ch.emoji}</div>
          <div class="chapter-info">
            <span class="chapter-num">Capítulo ${i + 1}</span>
            <h3>${ch.title}</h3>
            <p>${ch.subtitle}</p>
          </div>
          <div class="chapter-status">
            ${done ? starsHTML(data.stars) : locked ? '<span class="lock-msg">Completá el anterior</span>' : '<span class="badge-new">¡NUEVO!</span>'}
          </div>
        </div>`;
    });

    el.innerHTML = `
      ${backBtn('home')}
      <h2 class="screen-title">📚 Capítulos</h2>
      <p class="screen-sub">¡Explorá la historia jugando!</p>
      <div class="chapters-list">${cards}</div>
    `;
  }

  // ─── PANTALLA: HISTORIA (NARRACIÓN) ──────────────────────────────────────

  const stories = [
    {
      pages: [
        {
          title: 'Las Aguas del Sol',
          emoji: '☀️',
          text: 'Hace muchísimos años, antes de que existiera la ciudad, los pueblos originarios <strong>pazioca</strong> y <strong>lule</strong> descubrieron algo increíble en estos cerros: ¡unas aguas que salían calientes de la tierra!',
          bg: '#E3F2FD',
        },
        {
          title: 'Inti Yaku',
          emoji: '💧',
          text: 'Cuando los Incas llegaron en 1480, quedaron maravillados. Llamaron a estas aguas <strong>"Inti Yaku"</strong>, que significa <em>"agua del Sol"</em> en quechua. ¡Creían que eran un regalo del dios Sol!',
          bg: '#FFF9C4',
        },
        {
          title: 'Aguas que Curan',
          emoji: '♨️',
          text: 'Las termas tienen <strong>9 tipos de aguas diferentes</strong>. Algunas llegan a los <strong>90°C</strong>, ¡casi como agua hirviendo! Los originarios construían piletones de piedra para poder bañarse sin quemarse.',
          bg: '#F3E5F5',
        },
      ],
    },
    {
      pages: [
        {
          title: 'Una Señora Muy Generosa',
          emoji: '🏡',
          text: 'En el año 1873, una señora llamada <strong>Melchora Figueroa y Goyechea de Cornejo</strong> tomó una decisión muy importante: ¡donar sus tierras para fundar un pueblo!',
          bg: '#E8F5E9',
        },
        {
          title: 'El Primer Trazado',
          emoji: '📐',
          text: 'El agrimensor <strong>Carlos Schossig</strong> dibujó el plano del nuevo pueblo: <strong>9 manzanas</strong> ordenadas alrededor de una plaza central. ¡Así nacía la Villa del Rosario!',
          bg: '#FFF3E0',
        },
        {
          title: 'Fecha Oficial',
          emoji: '📅',
          text: 'El <strong>11 de marzo de 1874</strong> quedó oficializada la donación y con ella, el nacimiento de Rosario de la Frontera. ¡Ese es su cumpleaños!',
          bg: '#FCE4EC',
        },
      ],
    },
    {
      pages: [
        {
          title: 'Un Médico Curioso',
          emoji: '👨‍⚕️',
          text: 'En 1874, un médico español llamado <strong>Dr. Antonio Palau</strong> vivía en Tucumán. Escuchó hablar de unas aguas mágicas en los cerros de Salta y decidió ir a verlas.',
          bg: '#E3F2FD',
        },
        {
          title: 'Las Primeras Carpas',
          emoji: '⛺',
          text: 'El <strong>1 de abril de 1880</strong>, el Dr. Palau instaló unas sencillas carpas junto a las aguas termales. ¡Fue el primer balneario termal de toda Argentina y de Sudamérica!',
          bg: '#FFF9C4',
        },
        {
          title: 'Agua Palau',
          emoji: '🍶',
          text: 'El Dr. Palau tuvo una gran idea: embotellar el agua mineral y venderla. El <strong>"Agua Palau"</strong> se hizo famosa en todo el país. ¡Hasta en Buenos Aires había publicidad!',
          bg: '#E8F5E9',
        },
      ],
    },
    {
      pages: [
        {
          title: '¡El Tren Llega!',
          emoji: '🚂',
          text: 'El <strong>23 de noviembre de 1885</strong>, un sonido nunca visto recorrió el pueblo: ¡el silbato del ferrocarril! El tren llegaba a Rosario de la Frontera por primera vez.',
          bg: '#FCE4EC',
        },
        {
          title: 'Sarmiento Visita las Termas',
          emoji: '📖',
          text: 'En <strong>1886</strong>, el mismísimo <strong>Domingo Faustino Sarmiento</strong>, el gran educador y ex presidente argentino, visitó las termas. ¡Quedó encantado con las aguas!',
          bg: '#F3E5F5',
        },
        {
          title: 'La Escuela Normal',
          emoji: '🏫',
          text: 'El <strong>17 de enero de 1910</strong> se fundó la <strong>Escuela Normal</strong>, siendo su primera directora la señorita Carmen Salas. ¡La educación fue clave para el progreso del pueblo!',
          bg: '#E8F5E9',
        },
      ],
    },
    {
      pages: [
        {
          title: 'Un Hotel de Lujo',
          emoji: '🏨',
          text: 'Los arquitectos españoles <strong>Manuel y José Graña</strong> diseñaron un hotel lujosísimo. ¡Tenía cubiertos de plata, porcelana inglesa y obras de arte traídas desde Europa!',
          bg: '#E3F2FD',
        },
        {
          title: 'El Primer Casino de Sudamérica',
          emoji: '🎰',
          text: 'En 1893 se inauguró el casino del hotel, que fue el <strong>primer casino de toda Sudamérica</strong>. Presidentes, escritores y personalidades de todo el mundo venían a conocerlo.',
          bg: '#FFF9C4',
        },
        {
          title: 'Monumento Histórico',
          emoji: '🏛️',
          text: 'En <strong>2015</strong>, el Hotel Termas fue declarado <strong>Monumento Histórico Nacional</strong>. Hoy sigue recibiendo visitantes de todo el mundo, ¡un orgullo de Rosario de la Frontera!',
          bg: '#FCE4EC',
        },
      ],
    },
  ];

  function renderStory(chapterIndex, pageIndex, state) {
    const story = stories[chapterIndex];
    const page  = story.pages[pageIndex];
    const total = story.pages.length;
    const pct   = Math.round(((pageIndex + 1) / total) * 100);
    const el    = document.getElementById('screen-story');
    const meta  = chapterMeta[chapterIndex];

    el.innerHTML = `
      ${backBtn('chapters')}
      <div class="story-header" style="background:${page.bg}">
        <div class="story-emoji">${page.emoji}</div>
        <h2>${page.title}</h2>
      </div>
      ${progressBar(pct, `Página ${pageIndex + 1} de ${total}`)}
      <div class="story-body">
        <p>${page.text}</p>
      </div>
      <div class="story-nav">
        ${pageIndex > 0
          ? `<button class="btn-secondary" onclick="App.storyPage(${chapterIndex},${pageIndex - 1})">← Anterior</button>`
          : '<span></span>'}
        ${pageIndex < total - 1
          ? `<button class="btn-primary" onclick="App.storyPage(${chapterIndex},${pageIndex + 1})">Siguiente →</button>`
          : `<button class="btn-primary" onclick="App.navigate('minigame')">¡Jugar! 🎮</button>`}
      </div>
    `;
  }

  // ─── PANTALLA: MINIJUEGO ─────────────────────────────────────────────────

  function renderMinigame(chapterIndex) {
    const gameData = Game.getGame(chapterIndex);
    const el       = document.getElementById('screen-minigame');
    const meta     = chapterMeta[chapterIndex];

    if (!gameData) {
      el.innerHTML = `<p>Minijuego no disponible.</p>`;
      return;
    }

    let content = '';
    if      (gameData.type === 'memory')    content = buildMemoryUI(gameData);
    else if (gameData.type === 'truefalse') content = buildTrueFalseUI(gameData);
    else if (gameData.type === 'timeline')  content = buildTimelineUI(gameData);
    else if (gameData.type === 'match')     content = buildMatchUI(gameData);
    else if (gameData.type === 'pick')      content = buildPickUI(gameData);

    el.innerHTML = `
      ${backBtn('chapters')}
      <h2 class="screen-title">${meta.emoji} ${gameData.title}</h2>
      <p class="screen-sub">${gameData.instruction}</p>
      <div id="minigame-area">${content}</div>
    `;

    // Inicializar lógica del juego después de insertar el HTML
    if (gameData.type === 'memory')   initMemory(gameData);
    if (gameData.type === 'timeline') initTimeline(gameData);
    if (gameData.type === 'match')    initMatch(gameData);
  }

  // ── Memotest ──
  function buildMemoryUI(gameData) {
    const cards = Game.buildMemoryCards(gameData.pairs);
    window._memCards = cards; // guardar estado
    let html = '<div class="memory-grid">';
    cards.forEach((c, i) => {
      html += `<div class="mem-card" data-index="${i}" onclick="UI._memFlip(${i})">
                 <div class="mem-front">?</div>
                 <div class="mem-back">${c.emoji}</div>
               </div>`;
    });
    html += '</div><p id="mem-msg" class="game-msg"></p>';
    html += `<button class="btn-primary" id="btn-next-game" style="display:none" onclick="App.navigate('quiz')">¡Al Quiz! ❓</button>`;
    return html;
  }

  function initMemory() {
    window._memState = { flipped: [], matched: 0, lock: false };
  }

  // Exponer flip para onclick inline
  function _memFlip(index) {
    const state = window._memState;
    const cards = window._memCards;
    const card  = cards[index];
    const el    = document.querySelectorAll('.mem-card')[index];

    if (state.lock || card.flipped || card.matched) return;

    card.flipped = true;
    el.classList.add('flipped');
    state.flipped.push({ index, id: card.id });

    if (state.flipped.length === 2) {
      state.lock = true;
      const [a, b] = state.flipped;
      if (a.id === b.id) {
        // ¡Par encontrado!
        cards[a.index].matched = true;
        cards[b.index].matched = true;
        document.querySelectorAll('.mem-card')[a.index].classList.add('matched');
        document.querySelectorAll('.mem-card')[b.index].classList.add('matched');
        state.matched += 2;
        state.flipped = [];
        state.lock    = false;
        const msg = document.getElementById('mem-msg');
        if (msg) msg.textContent = '¡Par encontrado! 🎉';
        if (state.matched === window._memCards.length) {
          setTimeout(() => {
            if (msg) msg.textContent = '¡Completaste el memotest! 🏆';
            const btn = document.getElementById('btn-next-game');
            if (btn) btn.style.display = 'block';
          }, 500);
        }
      } else {
        setTimeout(() => {
          cards[a.index].flipped = false;
          cards[b.index].flipped = false;
          document.querySelectorAll('.mem-card')[a.index].classList.remove('flipped');
          document.querySelectorAll('.mem-card')[b.index].classList.remove('flipped');
          const msg = document.getElementById('mem-msg');
          if (msg) msg.textContent = 'No son iguales, ¡seguí buscando!';
          state.flipped = [];
          state.lock    = false;
        }, 900);
      }
    }
  }

  // ── Verdadero / Falso ──
  function buildTrueFalseUI(gameData) {
    let html = '<div class="tf-list">';
    gameData.statements.forEach((st, i) => {
      html += `
        <div class="tf-item" id="tf-${i}">
          <p class="tf-text">${st.text}</p>
          <div class="tf-btns">
            <button class="btn-tf btn-true"  onclick="UI._tfAnswer(${i}, true)">✅ Verdadero</button>
            <button class="btn-tf btn-false" onclick="UI._tfAnswer(${i}, false)">❌ Falso</button>
          </div>
          <p class="tf-result" id="tf-res-${i}"></p>
        </div>`;
    });
    html += '</div>';
    html += `<p id="tf-score" class="game-msg"></p>`;
    html += `<button class="btn-primary" id="btn-next-game" style="display:none" onclick="App.navigate('quiz')">¡Al Quiz! ❓</button>`;
    window._tfData    = { statements: gameData.statements, answers: {}, total: gameData.statements.length };
    return html;
  }

  function _tfAnswer(index, answer) {
    const data    = window._tfData;
    const correct = Game.checkTrueFalse(data.statements[index], answer);
    data.answers[index] = correct;
    const resEl   = document.getElementById(`tf-res-${index}`);
    const item    = document.getElementById(`tf-${index}`);
    if (resEl) resEl.textContent = correct ? '¡Correcto! 🎉' : '¡Incorrecto! La respuesta era ' + (data.statements[index].answer ? 'Verdadero' : 'Falso');
    if (item)  item.classList.add(correct ? 'tf-correct' : 'tf-wrong');
    // Deshabilitar botones de este ítem
    item.querySelectorAll('.btn-tf').forEach(b => b.disabled = true);
    // Verificar si terminó
    if (Object.keys(data.answers).length === data.total) {
      const ok    = Object.values(data.answers).filter(Boolean).length;
      const score = document.getElementById('tf-score');
      if (score) score.textContent = `Obtuviste ${ok} de ${data.total} correctas 🌟`;
      const btn = document.getElementById('btn-next-game');
      if (btn) btn.style.display = 'block';
    }
  }

  // ── Línea del Tiempo (drag simple táctil) ──
  function buildTimelineUI(gameData) {
    // Mostrar como tarjetas que el usuario numera con clicks
    const shuffled = [...gameData.events].sort(() => Math.random() - 0.5);
    window._tlData = { events: gameData.events, correct: gameData.correctOrder, order: [], shuffled };
    let html = '<p class="tf-text">Tocá los eventos en el orden histórico correcto (del más antiguo al más reciente):</p>';
    html += '<div class="timeline-cards">';
    shuffled.forEach((ev, i) => {
      html += `<div class="tl-card" id="tl-${ev.id}" onclick="UI._tlPick('${ev.id}')">
                 <span class="tl-num" id="tl-num-${ev.id}">—</span>
                 <span class="tl-text">${ev.text}</span>
               </div>`;
    });
    html += '</div>';
    html += `<button class="btn-secondary" onclick="UI._tlCheck()" style="margin-top:1rem">✅ Comprobar</button>`;
    html += `<p id="tl-msg" class="game-msg"></p>`;
    html += `<button class="btn-primary" id="btn-next-game" style="display:none" onclick="App.navigate('quiz')">¡Al Quiz! ❓</button>`;
    return html;
  }

  function initTimeline() {}

  function _tlPick(id) {
    const data = window._tlData;
    if (data.order.includes(id)) {
      // Quitar
      data.order = data.order.filter(x => x !== id);
    } else if (data.order.length < data.correct.length) {
      data.order.push(id);
    }
    // Actualizar números
    data.shuffled.forEach(ev => {
      const numEl = document.getElementById(`tl-num-${ev.id}`);
      const pos   = data.order.indexOf(ev.id);
      if (numEl) numEl.textContent = pos >= 0 ? pos + 1 : '—';
      document.getElementById(`tl-${ev.id}`)?.classList.toggle('tl-selected', pos >= 0);
    });
  }

  function _tlCheck() {
    const data = window._tlData;
    if (data.order.length < data.correct.length) {
      const msg = document.getElementById('tl-msg');
      if (msg) msg.textContent = `¡Falta ordenar ${data.correct.length - data.order.length} eventos más!`;
      return;
    }
    const isCorrect = data.order.every((id, i) => id === data.correct[i]);
    const msg = document.getElementById('tl-msg');
    if (isCorrect) {
      if (msg) msg.textContent = '¡Orden correcto! ¡Sos un historiador! 🏆';
      const btn = document.getElementById('btn-next-game');
      if (btn) btn.style.display = 'block';
    } else {
      if (msg) msg.textContent = '¡Casi! Revisá el orden e intentá de nuevo.';
      // Reset
      data.order = [];
      data.shuffled.forEach(ev => {
        const numEl = document.getElementById(`tl-num-${ev.id}`);
        if (numEl) numEl.textContent = '—';
        document.getElementById(`tl-${ev.id}`)?.classList.remove('tl-selected');
      });
    }
  }

  // ── Match (emparejar con clicks) ──
  function buildMatchUI(gameData) {
    const rights = Game.shuffleRightSide(gameData.pairs);
    window._matchData = {
      pairs: gameData.pairs,
      rights,
      selectedLeft: null,
      matched: {},
      total: gameData.pairs.length,
    };
    let html = '<div class="match-wrap">';
    html += '<div class="match-col">';
    gameData.pairs.forEach(p => {
      html += `<div class="match-item match-left" id="ml-${p.left.id}" onclick="UI._matchLeft('${p.left.id}')">
                 ${p.left.emoji} ${p.left.text}
               </div>`;
    });
    html += '</div><div class="match-col">';
    rights.forEach(r => {
      html += `<div class="match-item match-right" id="mr-${r.id}" onclick="UI._matchRight('${r.id}')">
                 ${r.text}
               </div>`;
    });
    html += '</div></div>';
    html += `<p id="match-msg" class="game-msg"></p>`;
    html += `<button class="btn-primary" id="btn-next-game" style="display:none" onclick="App.navigate('quiz')">¡Al Quiz! ❓</button>`;
    return html;
  }

  function initMatch() {}

  function _matchLeft(id) {
    const data = window._matchData;
    if (data.matched[id]) return;
    data.selectedLeft = id;
    document.querySelectorAll('.match-left').forEach(el => el.classList.remove('selected'));
    document.getElementById(`ml-${id}`)?.classList.add('selected');
  }

  function _matchRight(rightId) {
    const data = window._matchData;
    if (!data.selectedLeft) return;
    // Buscar el par correcto
    const pair = data.pairs.find(p => p.left.id === data.selectedLeft);
    if (!pair) return;
    const correct = pair.right.id === rightId;
    const leftEl  = document.getElementById(`ml-${data.selectedLeft}`);
    const rightEl = document.getElementById(`mr-${rightId}`);
    if (correct) {
      leftEl?.classList.add('match-ok');
      rightEl?.classList.add('match-ok');
      leftEl?.setAttribute('onclick', '');
      rightEl?.setAttribute('onclick', '');
      data.matched[data.selectedLeft] = true;
      const msg = document.getElementById('match-msg');
      if (msg) msg.textContent = '¡Correcto! 🎉';
      if (Object.keys(data.matched).length === data.total) {
        setTimeout(() => {
          if (msg) msg.textContent = '¡Emparejaste todo! 🏆';
          const btn = document.getElementById('btn-next-game');
          if (btn) btn.style.display = 'block';
        }, 400);
      }
    } else {
      leftEl?.classList.add('match-err');
      rightEl?.classList.add('match-err');
      setTimeout(() => {
        leftEl?.classList.remove('match-err', 'selected');
        rightEl?.classList.remove('match-err');
        const msg = document.getElementById('match-msg');
        if (msg) msg.textContent = 'No es ese par, ¡intentá de nuevo!';
      }, 700);
    }
    data.selectedLeft = null;
  }

  // ── Pick (múltiple opción visual) ──
  function buildPickUI(gameData) {
    window._pickData = { questions: gameData.questions, current: 0, score: 0 };
    return `<div id="pick-area">${renderPickQ(0, gameData.questions)}</div>`;
  }

  function renderPickQ(index, questions) {
    const q = questions[index];
    if (!q) return '';
    let opts = '';
    q.options.forEach((o, i) => {
      opts += `<button class="btn-pick" onclick="UI._pickAnswer(${i})">${o}</button>`;
    });
    return `
      <div class="pick-card">
        <div class="pick-emoji">${q.emoji}</div>
        <p class="pick-clue">${q.clue}</p>
        <div class="pick-opts">${opts}</div>
        <p id="pick-msg" class="game-msg"></p>
      </div>`;
  }

  function _pickAnswer(index) {
    const data = window._pickData;
    const q    = data.questions[data.current];
    const btns = document.querySelectorAll('.btn-pick');
    btns.forEach(b => b.disabled = true);
    const msg  = document.getElementById('pick-msg');
    if (index === q.correct) {
      btns[index]?.classList.add('pick-ok');
      data.score++;
      if (msg) msg.textContent = '¡Correcto! 🎉';
    } else {
      btns[index]?.classList.add('pick-err');
      btns[q.correct]?.classList.add('pick-ok');
      if (msg) msg.textContent = '¡Casi! La correcta está marcada en verde.';
    }
    data.current++;
    setTimeout(() => {
      const area = document.getElementById('pick-area');
      if (data.current < data.questions.length) {
        if (area) area.innerHTML = renderPickQ(data.current, data.questions);
      } else {
        if (area) area.innerHTML = `
          <div class="pick-done">
            <p class="game-msg">¡Terminaste! Obtuviste ${data.score} de ${data.questions.length} 🌟</p>
            <button class="btn-primary" onclick="App.navigate('quiz')">¡Al Quiz! ❓</button>
          </div>`;
      }
    }, 1200);
  }

  // ─── PANTALLA: QUIZ ──────────────────────────────────────────────────────

  function renderQuiz(chapterIndex) {
    const questions = QuizData.getQuestions(chapterIndex);
    window._quizData = { questions, current: 0, correct: 0, chapterIndex };
    const el = document.getElementById('screen-quiz');
    el.innerHTML = `
      ${backBtn('chapters')}
      <h2 class="screen-title">❓ Quiz</h2>
      <p class="screen-sub">Capítulo ${chapterIndex + 1} – ¡Demostrá lo que aprendiste!</p>
      <div id="quiz-area">${renderQuizQ(0, questions)}</div>
    `;
  }

  function renderQuizQ(index, questions) {
    const q   = questions[index];
    const pct = Math.round(((index) / questions.length) * 100);
    let opts  = '';
    q.options.forEach((o, i) => {
      opts += `<button class="btn-quiz-opt" onclick="UI._quizAnswer(${i})">${o}</button>`;
    });
    return `
      <div class="quiz-card">
        ${progressBar(pct, `Pregunta ${index + 1} de ${questions.length}`)}
        <h3 class="quiz-q">${q.q}</h3>
        <div class="quiz-opts">${opts}</div>
        <div class="quiz-fact" id="quiz-fact" style="display:none"></div>
      </div>`;
  }

  function _quizAnswer(index) {
    const data = window._quizData;
    const q    = data.questions[data.current];
    const btns = document.querySelectorAll('.btn-quiz-opt');
    btns.forEach(b => b.disabled = true);

    const correct = index === q.correct;
    if (correct) data.correct++;
    btns[index]?.classList.add(correct ? 'quiz-ok' : 'quiz-err');
    btns[q.correct]?.classList.add('quiz-ok');

    const factEl = document.getElementById('quiz-fact');
    if (factEl) {
      factEl.textContent = q.fact;
      factEl.style.display = 'block';
    }

    data.current++;
    setTimeout(() => {
      const area = document.getElementById('quiz-area');
      if (data.current < data.questions.length) {
        if (area) area.innerHTML = renderQuizQ(data.current, data.questions);
      } else {
        // Quiz terminado → ir a resultado
        App.finishQuiz(data.chapterIndex, data.correct, data.questions.length);
      }
    }, 1400);
  }

  // ─── PANTALLA: RESULTADO / MEDALLA ───────────────────────────────────────

  function renderResult(chapterIndex, stars, pct) {
    const meta = chapterMeta[chapterIndex];
    const el   = document.getElementById('screen-result');
    const msgs = ['¡Seguí intentando!', '¡Bien hecho!', '¡Muy bien!', '¡Sos un campeón!'];

    el.innerHTML = `
      <div class="result-hero" style="background:${meta.color}22">
        <div class="result-emoji">${stars >= 2 ? '🏅' : '⭐'}</div>
        <h2>Capítulo ${chapterIndex + 1} completado</h2>
        <p>${meta.title}</p>
      </div>
      <div class="result-stars">${starsHTML(stars)}</div>
      <p class="result-score">${pct}% de respuestas correctas</p>
      <p class="result-msg">${msgs[stars] || msgs[0]}</p>
      ${chapterIndex < 4
        ? `<button class="btn-primary btn-xl" onclick="App.startChapter(${chapterIndex + 1})">Siguiente Capítulo ▶</button>`
        : `<button class="btn-primary btn-xl" onclick="App.navigate('credits')">¡Felicitaciones! 🎊</button>`}
      <button class="btn-secondary" onclick="App.navigate('chapters')" style="margin-top:.5rem">Ver todos los capítulos</button>
    `;
  }

  // ─── PANTALLA: PROGRESO ───────────────────────────────────────────────────

  function renderProgress(state) {
    const pct = Storage.getProgress(state);
    const el  = document.getElementById('screen-progress');
    let rows  = '';
    chapterMeta.forEach((ch, i) => {
      const data = state.chapters[i];
      rows += `
        <div class="prog-row">
          <span class="prog-emoji">${ch.emoji}</span>
          <div class="prog-info">
            <strong>Cap. ${i + 1}: ${ch.title}</strong>
            <div>${starsHTML(data.stars || 0)}</div>
          </div>
          <span class="prog-badge ${data.completed ? 'badge-done' : data.unlocked ? 'badge-open' : 'badge-lock'}">
            ${data.completed ? '✅' : data.unlocked ? '▶' : '🔒'}
          </span>
        </div>`;
    });

    el.innerHTML = `
      ${backBtn('home')}
      <h2 class="screen-title">📊 Tu Progreso</h2>
      ${progressBar(pct, 'Progreso total')}
      <p class="screen-sub">⭐ ${state.totalStars} estrellas en total</p>
      <div class="prog-list">${rows}</div>
      <button class="btn-danger" onclick="App.resetProgress()">🗑️ Reiniciar progreso</button>
    `;
  }

  // ─── PANTALLA: CONFIGURACIÓN ──────────────────────────────────────────────

  function renderSettings(state) {
    const s  = state.settings;
    const el = document.getElementById('screen-settings');
    el.innerHTML = `
      ${backBtn('home')}
      <h2 class="screen-title">⚙️ Ajustes</h2>
      <div class="settings-list">
        <div class="setting-row">
          <span>🔊 Sonidos</span>
          <label class="toggle">
            <input type="checkbox" ${s.sound ? 'checked' : ''} onchange="App.setSetting('sound', this.checked)">
            <span class="slider"></span>
          </label>
        </div>
        <div class="setting-row">
          <span>🎵 Música</span>
          <label class="toggle">
            <input type="checkbox" ${s.music ? 'checked' : ''} onchange="App.setSetting('music', this.checked)">
            <span class="slider"></span>
          </label>
        </div>
        <div class="setting-row">
          <span>✨ Animaciones</span>
          <label class="toggle">
            <input type="checkbox" ${s.animations ? 'checked' : ''} onchange="App.setSetting('animations', this.checked)">
            <span class="slider"></span>
          </label>
        </div>
      </div>
      <div class="settings-info">
        <p>📍 Rosario de la Frontera, Salta, Argentina</p>
        <p>🎮 Versión 1.0</p>
      </div>
    `;
  }

  // ─── PANTALLA: CRÉDITOS ───────────────────────────────────────────────────

  function renderCredits() {
    const el = document.getElementById('screen-credits');
    el.innerHTML = `
      ${backBtn('home')}
      <div class="credits-hero">
        <div class="credits-emoji">🏔️</div>
        <h2>Historia de<br>Rosario de la Frontera</h2>
      </div>
      <div class="credits-body">
        <div class="credit-card">
          <h3>💡 Idea y desarrollo</h3>
          <p><strong>Suraj Maximiliano Singh</strong></p>
        </div>
        <div class="credit-card">
          <h3>🎯 Objetivo</h3>
          <p>Proyecto educativo interactivo para que los alumnos aprendan la historia de su ciudad jugando.</p>
        </div>
        <div class="credit-card">
          <h3>📚 Fuentes históricas</h3>
          <p>Wikipedia, Municipio de Rosario de la Frontera, Hotel Termas, Argentina.gob.ar</p>
        </div>
        <div class="credit-card">
          <h3>🛠️ Tecnologías</h3>
          <p>HTML5 · CSS3 · JavaScript Vanilla</p>
        </div>
      </div>
      <button class="btn-primary" onclick="App.navigate('home')">🏠 Inicio</button>
    `;
  }

  // ─── EXPORTS ──────────────────────────────────────────────────────────────

  return {
    showScreen,
    renderHome,
    renderChapters,
    renderStory,
    renderMinigame,
    renderQuiz,
    renderResult,
    renderProgress,
    renderSettings,
    renderCredits,
    chapterMeta,
    // Funciones de juego expuestas para onclick inline
    _memFlip,
    _tfAnswer,
    _tlPick,
    _tlCheck,
    _matchLeft,
    _matchRight,
    _pickAnswer,
    _quizAnswer,
  };
})();
