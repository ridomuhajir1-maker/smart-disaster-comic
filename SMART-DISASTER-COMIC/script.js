let currentPage = 1;
const totalPages = 17;

// Peta Hotspot per Halaman
const hotspotData = {
  2:  [{ top: '15%', left: '30%', width: '40%', height: '50%', title: 'Ibu Guru', audio: 'audio/audio/Guru2.m4a' }],
  3:  [{ top: '15%', left: '30%', width: '40%', height: '50%', title: 'Ibu Guru', audio: 'audio/audio/Guru3.m4a' }],
  4:  [{ top: '15%', left: '30%', width: '40%', height: '50%', title: 'Ibu Guru', audio: 'audio/audio/Guru4.m4a' }],
  5:  [{ top: '15%', left: '30%', width: '40%', height: '50%', title: 'Ibu Guru', audio: 'audio/audio/Guru5.m4a' }],
  6:  [{ top: '15%', left: '30%', width: '40%', height: '50%', title: 'Ibu Guru', audio: 'audio/audio/Guru6.m4a' }],
  7:  [{ top: '15%', left: '30%', width: '40%', height: '50%', title: 'Ibu Guru', audio: 'audio/audio/Guru7.m4a' }],
  8:  [{ top: '15%', left: '30%', width: '40%', height: '50%', title: 'Ibu Guru', audio: 'audio/audio/Guru8.m4a' }],
  9:  [{ top: '15%', left: '30%', width: '40%', height: '50%', title: 'Ibu Guru', audio: 'audio/audio/Guru9.m4a' }],
  10: [{ top: '15%', left: '30%', width: '40%', height: '50%', title: 'Ibu Guru', audio: 'audio/audio/Guru10.m4a' }],
  11: [{ top: '15%', left: '30%', width: '40%', height: '50%', title: 'Ibu Guru', audio: 'audio/audio/Guru11.m4a' }],
  12: [{ top: '15%', left: '30%', width: '40%', height: '50%', title: 'Ibu Guru', audio: 'audio/audio/Guru12.m4a' }],
  13: [{ top: '15%', left: '30%', width: '40%', height: '50%', title: 'Ibu Guru', audio: 'audio/audio/Guru13.m4a' }],
  14: [{ top: '15%', left: '30%', width: '40%', height: '50%', title: 'Ibu Guru', audio: 'audio/audio/Guru14.m4a' }],
  15: [{ top: '15%', left: '30%', width: '40%', height: '50%', title: 'Ibu Guru', audio: 'audio/audio/Guru15.m4a' }],
  16: [{ top: '15%', left: '30%', width: '40%', height: '50%', title: 'Ibu Guru', audio: 'audio/audio/Guru16.m4a' }]
};
function startComic() {
  document.getElementById('welcome-screen').classList.add('hidden');
  document.getElementById('comic-screen').classList.remove('hidden');
  renderPage(currentPage);
}

function renderPage(page) {
  const imgElement = document.getElementById('comic-image');
  const pageStr = page < 10 ? `0${page}` : `${page}`;
  imgElement.src = `images/page${pageStr}.png`;
  
  document.getElementById('page-indicator').innerText = `Halaman ${page} / ${totalPages}`;

  const layer = document.getElementById('hotspot-layer');
  layer.innerHTML = '';

  if (hotspotData[page]) {
    hotspotData[page].forEach(hs => {
      const el = document.createElement('div');
      el.className = 'hotspot';
      el.style.top = hs.top;
      el.style.left = hs.left;
      el.style.width = hs.width;
      el.style.height = hs.height;
      el.title = hs.title;
      
      // DIUBAH: Pemanggilan fungsi disamakan (1 parameter)
      el.onclick = () => playAudio(hs.audio); 
      layer.appendChild(el);
    });
  }

  if (page === 9) {
    setTimeout(showQuiz, 1500);
  }
}

function nextPage() {
  if (currentPage < totalPages) {
    currentPage++;
    renderPage(currentPage);
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderPage(currentPage);
  }
}

// Fungsi Pemutar Audio Tingkat Lanjut (Menangani Ekstensi & Kodek)
function playAudio(audioPath) {
  if (!audioPath) return;

  const player = document.getElementById('global-audio-player');
  
  if (!player) {
    console.error("Elemen #global-audio-player belum ditambahkan di index.html");
    return;
  }

  // Hentikan audio yang sedang berjalan
  player.pause();
  player.currentTime = 0;

  // Setel sumber file audio
  player.src = audioPath;

  // Coba putar audio
  player.play().then(() => {
    console.log("Audio berhasil diputar:", audioPath);
  }).catch(error => {
    console.warn("Gagal memutar file dasar, mencoba variasi ekstensi...", error);
    
    // Uji coba otomatis jika nama filenya sebenarnya '.m4a.m4a' atau '_2.m4a'
    const cleanPath = audioPath.replace('.m4a', '');
    
    // Opsi cadangan 1: Cek jika ada ektensi ganda (.m4a.m4a)
    player.src = cleanPath + '.m4a.m4a';
    player.play().catch(() => {
      
      // Opsi cadangan 2: Cek jika filenya masih pakai spasi/garis bawah
      player.src = audioPath.replace('Guru2', 'Guru 2');
      player.play().catch(() => {
        alert("File audio gagal dimuat!\n\nJalur yang dicoba: " + audioPath + "\n\nPastikan file benar-benar ada di folder 'audio' di panel kiri VS Code.");
      });

    });
  });
}

// Fungsi Suara Komputer (Fallback)
function speakText(text) {
  if ('speechSynthesis' in window && text) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    window.speechSynthesis.speak(utterance);
  }
}

function playCurrentPageAudio() {
  const currentAudio = hotspotData[currentPage] ? hotspotData[currentPage][0].audio : '';
  playAudio(currentAudio, `Ini adalah narasi penuh untuk halaman ${currentPage}`);
}

/* KUIS / SIMULASI INTERAKTIF */
function showQuiz() {
  document.getElementById('quiz-modal').classList.remove('hidden');
}

function checkAnswer(isCorrect) {
  const feedback = document.getElementById('quiz-feedback');
  feedback.classList.remove('hidden', 'correct', 'wrong');
  
  if (isCorrect) {
    feedback.innerText = "HEBAT! Jawabanmu Tepat! Saat gempa, segera Drop, Cover, dan Hold On.";
    feedback.classList.add('correct');
    playAudio('', 'Hebat! Jawabanmu Tepat! Saat gempa, segera Drop, Cover, dan Hold On.');
  } else {
    feedback.innerText = "BELUM TEPAT. Jangan berlari saat guncangan masih berlangsung!";
    feedback.classList.add('wrong');
    playAudio('', 'Belum tepat. Jangan berlari saat guncangan masih berlangsung!');
  }
  document.getElementById('btn-close-quiz').classList.remove('hidden');
}

function closeQuiz() {
  document.getElementById('quiz-modal').classList.add('hidden');
}