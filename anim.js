const audio = document.querySelector("audio");
const lyrics = document.querySelector("#lyrics");

// Datos de letras con marcas de tiempo (segundos)
const lyricsData = [
  { text: "At the time", time: 15 },
  { text: "The whisper of birds", time: 18 },
  { text: "Lonely before the sun cried", time: 27 },
  { text: "Fell from the sky", time: 32 },
  { text: "Like water drops", time: 33 },
  { text: "Where I'm now? I don't know why", time: 41 },
  { text: "Nice butterflies in my hands", time: 47 },
  { text: "Too much light for twilight", time: 54 },
  { text: "In the mood for the flowers love", time: 59 },
  { text: "That vision", time: 67 },
  { text: "Really strong, blew my mind", time: 72 },
  { text: "Silence Let me see what it was", time: 78 },
  { text: "I only want to live in clouds", time: 83 },
  { text: "Where I'm now? I don't know why", time: 91 },
  { text: "Nice butterflies in my hands", time: 97 },
  { text: "Too much light for twilight", time: 104 },
  { text: "In the mood for the flowers love", time: 108 },
  { text: "At the time", time: 144 },
  { text: "The whisper of birds", time: 148 },
  { text: "Lonely before the sun cried", time: 153 },
  { text: "Fell from the sky", time: 158 },
  { text: "Like water drops", time: 164 },
  { text: "Where I'm now? I don't know why", time: 169 },
  { text: "Nice butterflies in my hands", time: 176 },
  { text: "Too much light for twilight", time: 183 },
  { text: "In the mood for the flowers", time: 188 },
  { text: "Love.", time: 190 },
]
  // Asegura orden cronológico
  .sort((a, b) => a.time - b.time);

// Parámetros de animación de letras
const LINE_DURATION = 6; // segundos visibles por línea
const FADE_IN = 0.4; // segundos
const FADE_OUT = 0.4; // segundos

let lastText = "";

function updateLyrics() {
  if (!audio || !lyrics) return;
  const t = audio.currentTime || 0;

  const currentLine = lyricsData.find(
    (line) => t >= line.time && t < line.time + LINE_DURATION
  );

  if (!currentLine) {
    lyrics.style.opacity = 0;
    if (lastText !== "") {
      lyrics.textContent = "";
      lastText = "";
    }
  } else {
    if (lastText !== currentLine.text) {
      lyrics.textContent = currentLine.text;
      lastText = currentLine.text;
    }
    const timeIntoLine = t - currentLine.time;
    let opacity = 1;
    if (timeIntoLine < FADE_IN) {
      opacity = Math.max(0, Math.min(1, timeIntoLine / FADE_IN));
    } else if (timeIntoLine > LINE_DURATION - FADE_OUT) {
      opacity = Math.max(
        0,
        Math.min(1, (LINE_DURATION - timeIntoLine) / FADE_OUT)
      );
    }
    lyrics.style.opacity = opacity;
  }
}

// Bucle suave con requestAnimationFrame
function tick() {
  updateLyrics();
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

// función título: ocultar después de 216 segundos
function ocultarTitulo() {
  const titulo = document.querySelector(".titulo");
  if (!titulo) return;
  titulo.style.animation = "fadeOut 3s ease-in-out forwards";
  setTimeout(function () {
    titulo.style.display = "none";
  }, 3000);
}

setTimeout(ocultarTitulo, 216000);