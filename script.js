document.title = content.title;

document.querySelectorAll("[data-text]").forEach((item) => {
  item.textContent = content[item.dataset.text];
});

const story = document.getElementById("story");
document.getElementById("openBtn").addEventListener("click", () => {
  story.hidden = false;
  story.scrollIntoView();
});

const frogAudio = document.getElementById("frogAudio");
frogAudio.src = content.frogAudioFile;

document.getElementById("playBtn").addEventListener("click", () => {
  frogAudio.currentTime = 0;
  frogAudio.play();
});

const song = document.getElementById("song");
const musicBtn = document.getElementById("musicBtn");
song.src = content.songFile;
song.volume = 0.18;

function updateMusicButton() {
  musicBtn.textContent = song.paused ? content.musicStopped : content.musicPlaying;
  musicBtn.title = song.paused ? content.musicOff : content.musicOn;
}

updateMusicButton();

document.addEventListener("click", function startMusic(event) {
  if (event.target !== musicBtn) {
    song.play().then(updateMusicButton);
  }
}, { once: true });

musicBtn.addEventListener("click", () => {
  if (song.paused) {
    song.play().then(updateMusicButton);
  } else {
    song.pause();
    updateMusicButton();
  }
});

const start = new Date(2024, 10, 28, 2, 13, 28);
const timer = document.getElementById("timer");

function wordFor(number, words) {
  const lastTwo = number % 100;
  const last = number % 10;

  if (lastTwo >= 11 && lastTwo <= 14) return words[2];
  if (last === 1) return words[0];
  if (last >= 2 && last <= 4) return words[1];
  return words[2];
}

function updateTimer() {
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  let date = new Date(start);
  date.setFullYear(date.getFullYear() + years);

  if (date > now) {
    years--;
    date = new Date(start);
    date.setFullYear(date.getFullYear() + years);
  }

  let months = 0;
  while (months < 11) {
    const next = new Date(date);
    next.setMonth(next.getMonth() + 1);
    if (next > now) break;
    date = next;
    months++;
  }

  const left = now - date;
  const values = [
    years,
    months,
    Math.floor(left / 86400000),
    Math.floor(left % 86400000 / 3600000),
    Math.floor(left % 3600000 / 60000),
    Math.floor(left % 60000 / 1000)
  ];

  timer.textContent = `Мы общаемся уже: ${values[0]} ${wordFor(values[0], content.timerWords[0])} ${values[1]} ${wordFor(values[1], content.timerWords[1])} ${values[2]} ${wordFor(values[2], content.timerWords[2])} ${values[3]} ${wordFor(values[3], content.timerWords[3])} ${values[4]} ${wordFor(values[4], content.timerWords[4])} ${values[5]} ${wordFor(values[5], content.timerWords[5])}`;
}

updateTimer();
setInterval(updateTimer, 1000);

const finalBtn = document.getElementById("finalBtn");
finalBtn.addEventListener("click", () => {
  const finalMessage = document.getElementById("finalMessage");
  finalMessage.textContent = content.finalMessage;
  finalMessage.hidden = false;
  finalBtn.disabled = true;
});
