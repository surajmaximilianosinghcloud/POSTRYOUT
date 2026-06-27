/**
 * quiz.js
 * Preguntas del quiz por capítulo.
 * Todas las preguntas están basadas en hechos históricos reales.
 */

const QuizData = (() => {

  // Banco de preguntas por capítulo (índice 0 = capítulo 1, etc.)
  const questions = [

    // ─── CAPÍTULO 1: Los pueblos originarios y las aguas sagradas ───
    [
      {
        q: '¿Cómo llamaban los Incas al agua de las termas?',
        options: ['Inti Yaku', 'Mamá Cocha', 'Pachamama', 'Wiracocha'],
        correct: 0,
        fact: '¡Correcto! "Inti Yaku" significa "agua del Sol" en quechua.'
      },
      {
        q: '¿Qué etnias originarias conocían las propiedades de las aguas termales?',
        options: ['Guaraní y Mapuche', 'Pazioca y Lule', 'Diaguita y Comechingón', 'Huarpe y Toba'],
        correct: 1,
        fact: '¡Así es! Los pazioca y lule fueron los primeros en usar estas aguas curativas.'
      },
      {
        q: '¿Cuántos tipos de agua diferentes tienen las termas?',
        options: ['3', '6', '9', '12'],
        correct: 2,
        fact: '¡Perfecto! Las termas tienen 9 tipos diferentes de aguas minerales.'
      },
      {
        q: '¿A qué temperatura llega el agua sulfurosa más caliente?',
        options: ['40°C', '60°C', '75°C', '90°C'],
        correct: 3,
        fact: '¡Increíble! El agua sulfurosa puede llegar a los 90°C.'
      },
    ],

    // ─── CAPÍTULO 2: La fundación de la ciudad ───
    [
      {
        q: '¿Quién donó las tierras para fundar Rosario de la Frontera?',
        options: ['Carmen Salas', 'Juana Manuela Gorriti', 'Melchora Figueroa de Cornejo', 'Lola Mora'],
        correct: 2,
        fact: 'Correcto! Doña Melchora Figueroa y Goyechea de Cornejo donó sus tierras para fundar la ciudad.'
      },
      {
        q: '¿En qué año quedó oficializada la fundación de la ciudad?',
        options: ['1699', '1816', '1874', '1885'],
        correct: 2,
        fact: '¡Muy bien! El 11 de marzo de 1874 se oficializó la fundación de la Villa del Rosario.'
      },
      {
        q: '¿Cuántas manzanas tenía el trazado original del pueblo?',
        options: ['3', '6', '9', '12'],
        correct: 2,
        fact: 'Exacto! El agrimensor Carlos Schossig diseñó el primer trazado de 9 manzanas.'
      },
      {
        q: '¿Cuándo comenzó a funcionar la Municipalidad de Rosario de la Frontera?',
        options: ['1816', '1857', '1874', '1910'],
        correct: 1,
        fact: 'Perfecto! La Municipalidad comenzó a funcionar el 25 de abril de 1857.'
      },
    ],

    // ─── CAPÍTULO 3: El Dr. Palau y las termas ───
    [
      {
        q: '¿De qué país era originario el Dr. Antonio Palau?',
        options: ['Italia', 'Francia', 'España', 'Portugal'],
        correct: 2,
        fact: 'Correcto! El Dr. Antonio Palau era un médico español radicado en Argentina.'
      },
      {
        q: '¿En qué año inauguró el Dr. Palau el primer balneario termal?',
        options: ['1874', '1880', '1886', '1893'],
        correct: 1,
        fact: '¡Muy bien! El 1 de abril de 1880 inauguró el primer balneario, con unas sencillas carpas.'
      },
      {
        q: '¿Qué lugar fue el primero en tener un balneario termal en Sudamérica?',
        options: ['Bariloche', 'Mar del Plata', 'Rosario de la Frontera', 'Mendoza'],
        correct: 2,
        fact: '¡Increíble! Las termas de Rosario de la Frontera son el primer balneario termal de Sudamérica.'
      },
      {
        q: '¿Cómo se llamaba el agua mineral que embotellaba el Dr. Palau?',
        options: ['Agua Termal', 'Agua Salta', 'Agua Palau', 'Agua del Sol'],
        correct: 2,
        fact: 'Correcto! "Agua Palau" se vendía en todo el país, ¡incluso había publicidad en Buenos Aires!'
      },
    ],

    // ─── CAPÍTULO 4: El ferrocarril y el progreso ───
    [
      {
        q: '¿En qué año llegó el ferrocarril a Rosario de la Frontera?',
        options: ['1874', '1880', '1885', '1921'],
        correct: 2,
        fact: 'Correcto! El 23 de noviembre de 1885 llegó el ferrocarril a Rosario de la Frontera.'
      },
      {
        q: '¿Quién era intendente cuando llegó el ferrocarril?',
        options: ['Genaro Gutiérrez', 'Martín Gabriel Güemes', 'Antonio Palau', 'Carlos Schossig'],
        correct: 1,
        fact: '¡Muy bien! Martín Gabriel Güemes era intendente cuando llegó el ferrocarril en 1885.'
      },
      {
        q: '¿Quién fue el famoso presidente argentino que visitó las termas en 1886?',
        options: ['Bartolomé Mitre', 'Hipólito Yrigoyen', 'Julio Roca', 'Domingo F. Sarmiento'],
        correct: 3,
        fact: '¡Correcto! Domingo Faustino Sarmiento, el gran educador argentino, visitó las termas en 1886.'
      },
      {
        q: '¿En qué año se fundó la Escuela Normal de Rosario de la Frontera?',
        options: ['1885', '1900', '1910', '1921'],
        correct: 2,
        fact: '¡Perfecto! La Escuela Normal fue fundada el 17 de enero de 1910 y fue clave para la educación local.'
      },
    ],

    // ─── CAPÍTULO 5: El Hotel Termas y su esplendor ───
    [
      {
        q: '¿Quiénes fueron los arquitectos que diseñaron el Hotel Termas?',
        options: ['Palau y Cantón', 'Manuel y José Graña', 'Seguí y Tornquist', 'Torres y Schossig'],
        correct: 1,
        fact: 'Correcto! Los arquitectos españoles Manuel y José Graña -padre e hijo- diseñaron el hotel.'
      },
      {
        q: '¿Cuál fue el primer casino de Sudamérica?',
        options: ['Casino de Salta', 'Casino de Buenos Aires', 'Casino del Hotel Termas', 'Casino de Tucumán'],
        correct: 2,
        fact: '¡Increíble! El casino del Hotel Termas fue el primero en toda Sudamérica.'
      },
      {
        q: '¿Qué famosa escritora nació en el Hotel Termas en 1929?',
        options: ['Juana Manuela Gorriti', 'Victoria Ocampo', 'Lola Mora', 'No fue una escritora'],
        correct: 3,
        fact: 'El escritor y jurista Dr. Héctor Eduardo Tizón nació en el Hotel Termas el 21 de octubre de 1929.'
      },
      {
        q: '¿En qué año fue declarado el Hotel Termas Monumento Histórico Nacional?',
        options: ['1990', '2000', '2010', '2015'],
        correct: 3,
        fact: 'Correcto! En 2015, el Hotel Termas fue declarado Monumento Histórico Nacional de Argentina.'
      },
    ],
  ];

  /**
   * Retorna las preguntas de un capítulo dado.
   * Las mezcla aleatoriamente para que no sean siempre iguales.
   * @param {number} chapterIndex - Índice del capítulo (0-4).
   */
  function getQuestions(chapterIndex) {
    const pool = questions[chapterIndex] || [];
    return [...pool].sort(() => Math.random() - 0.5).slice(0, 3);
  }

  /**
   * Calcula la puntuación y las estrellas según respuestas correctas.
   * @param {number} correct - Respuestas correctas.
   * @param {number} total - Total de preguntas.
   */
  function calcScore(correct, total) {
    const pct   = Math.round((correct / total) * 100);
    const stars = pct >= 90 ? 3 : pct >= 60 ? 2 : pct >= 30 ? 1 : 0;
    return { pct, stars };
  }

  return { getQuestions, calcScore };
})();
