/* ==========================================
   OURSFLIX — JavaScript Interactions + Audio Player
   ========================================== */

// === Navbar scroll effect ===
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// === Envelope & 4 Letters UI ===
const envelope = document.getElementById('envelope');
const letterCardsWrapper = document.getElementById('letterCardsWrapper');
const envelopeText = document.getElementById('envelopeText');
const letterModal = document.getElementById('letterModal');
const modalLetterImg = document.getElementById('modalLetterImg');
const modalLetterTitle = document.getElementById('modalLetterTitle');
const modalLetterTag = document.getElementById('modalLetterTag');
const modalNavIndicator = document.getElementById('modalNavIndicator');

let envelopeOpen = false;
let currentModalLetter = 1;

const lettersData = [
  { id: 1, title: 'Letter 1 • Where My Heart Began', tag: 'Letter 1 of 4', src: 'images/letter1.jpg' },
  { id: 2, title: 'Letter 2 • Why You\'re My World', tag: 'Letter 2 of 4', src: 'images/letter2.jpg' },
  { id: 3, title: 'Letter 3 • Our Sweetest Memories', tag: 'Letter 3 of 4', src: 'images/letter3.jpg' },
  { id: 4, title: 'Letter 4 • My Forever Promise', tag: 'Letter 4 of 4', src: 'images/letter4.jpg' }
];

function handleEnvelopeClick() {
  if (!envelopeOpen) {
    openLetters();
  } else {
    foldLetters();
  }
}

function openLetters() {
  envelopeOpen = true;
  envelope.classList.add('opened');
  if (envelopeText) envelopeText.textContent = 'Letters released! 💌 (Click to fold)';

  // Pop out and fly Harry Potter Hogwarts style letters storm across the screen
  spawnHarryPotterLetterStorm(envelope);

  // Reveal the 4 letter cards with pop-out flight animation
  setTimeout(() => {
    letterCardsWrapper.classList.add('show');
    // Smoothly scroll down so cards are well positioned in view
    setTimeout(() => {
      const rect = letterCardsWrapper.getBoundingClientRect();
      if (rect.top > window.innerHeight * 0.5) {
        letterCardsWrapper.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 450);
  }, 400);
}

function foldLetters() {
  envelopeOpen = false;
  envelope.classList.remove('opened');
  letterCardsWrapper.classList.remove('show');
  if (envelopeText) envelopeText.textContent = 'Click to open your letters';
}

// === Harry Potter Hogwarts Letters Storm ===
// Realistic 3D parchment envelopes with crimson wax seal exploding & fluttering across the screen
function spawnHarryPotterLetterStorm(originEl) {
  const rect = originEl ? originEl.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 0, height: 0 };
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 3;

  const totalLetters = 48; // Large magical storm of letters
  const container = document.body;

  for (let i = 0; i < totalLetters; i++) {
    // Wave burst timing: initial explosion followed by trailing flurries
    const delay = i < 18 ? i * 28 : (i < 34 ? 500 + (i - 18) * 35 : 1050 + (i - 34) * 40);

    setTimeout(() => {
      const letter = document.createElement('div');
      letter.className = 'hp-flying-letter';

      letter.innerHTML = `
        <div class="hp-env-inner">
          <div class="hp-env-flap"></div>
          <div class="hp-env-seal"></div>
          <div class="hp-env-crease"></div>
        </div>
      `;

      letter.style.left = `${originX}px`;
      letter.style.top = `${originY}px`;

      // Broad sweeping flight across whole viewport like the Harry Potter fireplace scene
      const screenW = window.innerWidth;
      const screenH = window.innerHeight;

      // Trajectory radiating upward and outward across the full screen
      const spreadX = (Math.random() - 0.5) * (screenW * 1.3);
      // Upward burst soaring across the viewport
      const spreadY = - (screenH * 0.35 + Math.random() * (screenH * 0.85));
      const driftX = (Math.random() - 0.5) * 120;

      const rotX = (Math.random() - 0.5) * 900;
      const rotY = (Math.random() - 0.5) * 900;
      const rotZ = (Math.random() - 0.5) * 540;
      const duration = 2.4 + Math.random() * 1.5;
      const scale = 0.65 + Math.random() * 0.65;
      const flutterDur = 0.35 + Math.random() * 0.3;

      letter.style.setProperty('--targetX', `${spreadX}px`);
      letter.style.setProperty('--targetY', `${spreadY}px`);
      letter.style.setProperty('--driftX', `${driftX}px`);
      letter.style.setProperty('--rotX', `${rotX}deg`);
      letter.style.setProperty('--rotY', `${rotY}deg`);
      letter.style.setProperty('--rotZ', `${rotZ}deg`);
      letter.style.setProperty('--scale', scale);
      letter.style.setProperty('--duration', `${duration}s`);
      letter.style.setProperty('--flutterDur', `${flutterDur}s`);

      container.appendChild(letter);
      setTimeout(() => letter.remove(), duration * 1000 + 100);
    }, delay);
  }
}

// === Our Moments Lightbox Modal (Wide Open View) ===
const imageModal = document.getElementById('imageModal');
const imageModalImg = document.getElementById('imageModalImg');
const imageModalCaption = document.getElementById('imageModalCaption');

document.querySelectorAll('.moments-section .card').forEach((card) => {
  card.addEventListener('click', () => {
    const img = card.querySelector('img');
    const caption = card.querySelector('.card-caption');
    if (img && imageModal && imageModalImg) {
      imageModalImg.src = img.src;
      imageModalImg.alt = img.alt || 'Our Moment';
      if (imageModalCaption) {
        imageModalCaption.textContent = caption ? caption.textContent : '';
      }
      imageModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });
});

function closeImageModal() {
  if (imageModal) {
    imageModal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// === Fullscreen Letter Reader Modal with 3D Book Page Flip ===
let isLetterFlipping = false;

function openLetterModal(letterNum) {
  currentModalLetter = letterNum;
  updateModalContent();
  letterModal.classList.add('active');
  document.body.style.overflow = 'hidden'; // prevent scroll while reading
}

function closeLetterModal() {
  letterModal.classList.remove('active');
  document.body.style.overflow = '';
}

function navigateLetter(dir) {
  if (isLetterFlipping) return;

  const letterModalContainer = document.querySelector('.letter-modal-container');
  if (!letterModalContainer) {
    currentModalLetter += dir;
    if (currentModalLetter < 1) currentModalLetter = lettersData.length;
    if (currentModalLetter > lettersData.length) currentModalLetter = 1;
    updateModalContent();
    return;
  }

  isLetterFlipping = true;
  const flipClass = dir > 0 ? 'book-flip-next' : 'book-flip-prev';
  letterModalContainer.classList.add(flipClass);

  // Halfway through 3D flip (280ms), swap page content
  setTimeout(() => {
    currentModalLetter += dir;
    if (currentModalLetter < 1) currentModalLetter = lettersData.length;
    if (currentModalLetter > lettersData.length) currentModalLetter = 1;
    updateModalContent();
  }, 280);

  // Clean up animation class after page turn finishes (600ms)
  setTimeout(() => {
    letterModalContainer.classList.remove('book-flip-next', 'book-flip-prev');
    isLetterFlipping = false;
  }, 600);
}

function updateModalContent() {
  const data = lettersData[currentModalLetter - 1];
  if (!data) return;

  modalLetterTag.textContent = data.tag;
  modalLetterTitle.textContent = data.title;
  modalLetterImg.src = data.src;
  modalLetterImg.alt = data.title;
  modalNavIndicator.textContent = `${currentModalLetter} / ${lettersData.length}`;

  // Reset fallback if needed
  modalLetterImg.classList.remove('modal-fallback');
}

// Keyboard shortcuts for modals navigation
document.addEventListener('keydown', (e) => {
  if (imageModal && imageModal.classList.contains('active')) {
    if (e.key === 'Escape') closeImageModal();
    return;
  }
  if (!letterModal || !letterModal.classList.contains('active')) return;
  if (e.key === 'Escape') closeLetterModal();
  if (e.key === 'ArrowRight') navigateLetter(1);
  if (e.key === 'ArrowLeft') navigateLetter(-1);
});

// === Certificate download ===
function downloadCertificate() {
  const img = document.getElementById('certificateImg');
  const link = document.createElement('a');
  link.href = img.src;
  link.download = 'Best_Boyfriend_Certificate.jpg';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  burstHearts(40);
}

// === Journey timeline scroll reveal ===
const journeyItems = document.querySelectorAll('.journey-item');
const observerOptions = { threshold: 0.2, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, observerOptions);
journeyItems.forEach((item) => observer.observe(item));

// (Paper plane feature removed per user request)

// === Floating hearts on click ===
document.addEventListener('click', (e) => {
  // Don't spawn hearts on player bar clicks
  if (e.target.closest('.audio-player-bar') || e.target.closest('.song-card')) return;
  createHeart(e.clientX, e.clientY);
});

function createHeart(x, y) {
  const hearts = ['❤️', '💕', '💖', '💗', '💘', '💝', '🥰', '✨'];
  const container = document.getElementById('floatingHearts');
  const heart = document.createElement('span');
  heart.className = 'float-heart';
  heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  container.appendChild(heart);
  setTimeout(() => heart.remove(), 4000);
}

function burstHearts(count) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      createHeart(Math.random() * window.innerWidth, window.innerHeight);
    }, i * 80);
  }
}

window.addEventListener('load', () => {
  setTimeout(() => burstHearts(15), 1500);
});

// === Nav active link highlight ===
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 100) current = section.getAttribute('id');
  });
  navLinks.forEach((link) => {
    link.style.color = link.getAttribute('href') === `#${current}` ? '#e50914' : '';
  });
});

// === Parallax hero ===
window.addEventListener('scroll', () => {
  const heroImg = document.querySelector('.hero-img');
  if (heroImg) heroImg.style.transform = `scale(${1 + window.scrollY * 0.0003})`;
});


/* ==========================================
   🎵 AUDIO PLAYER — Full Music Playback
   ========================================== */

const audio = document.getElementById('audioElement');
const playerBar = document.getElementById('audioPlayerBar');
const playerTitle = document.getElementById('playerTitle');
const playerArtist = document.getElementById('playerArtist');
const playerArt = document.getElementById('playerArt');
const playerPlayBtn = document.getElementById('playerPlayBtn');
const playerProgressFill = document.getElementById('playerProgressFill');
const playerProgress = document.getElementById('playerProgress');
const playerCurrent = document.getElementById('playerCurrent');
const playerDuration = document.getElementById('playerDuration');
const volumeFill = document.getElementById('volumeFill');
const volumeBar = document.getElementById('volumeBar');
const volumeIcon = document.getElementById('volumeIcon');

const songCards = document.querySelectorAll('.song-card[data-audio]');
let currentSongIndex = -1;
let isPlaying = false;
let songList = [];

// Build the song list from HTML data attributes
songCards.forEach((card, index) => {
  songList.push({
    audio: card.dataset.audio,
    title: card.dataset.title || 'Unknown',
    artist: card.dataset.artist || 'Unknown',
    art: card.querySelector('.song-art')?.src || '',
    element: card
  });

  card.addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentSongIndex === index && isPlaying) {
      pauseSong();
    } else if (currentSongIndex === index && !isPlaying) {
      resumeSong();
    } else {
      playSong(index);
    }
  });
});

function playSong(index) {
  if (index < 0 || index >= songList.length) return;

  const song = songList[index];
  currentSongIndex = index;

  // Update audio source
  audio.src = song.audio;
  audio.load();
  audio.play().catch(() => {
    // If autoplay blocked, show the player anyway
    console.log('Click play to start the song');
  });

  // Update player bar info
  playerTitle.textContent = song.title;
  playerArtist.textContent = song.artist;
  playerArt.src = song.art;
  playerArt.style.background = getComputedStyle(song.element.querySelector('.song-art')).background;

  // Show player bar
  playerBar.classList.add('visible');
  document.body.classList.add('player-active');

  // Update play button
  isPlaying = true;
  updatePlayIcon();

  // Highlight active card
  highlightActiveCard(index);
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  updatePlayIcon();
  removeEqualizer();
}

function resumeSong() {
  audio.play();
  isPlaying = true;
  updatePlayIcon();
  addEqualizer(currentSongIndex);
}

function togglePlayPause() {
  if (isPlaying) {
    pauseSong();
  } else {
    if (currentSongIndex === -1 && songList.length > 0) {
      playSong(0);
    } else {
      resumeSong();
    }
  }
}

function nextSong() {
  const next = (currentSongIndex + 1) % songList.length;
  playSong(next);
}

function prevSong() {
  // If more than 3 seconds in, restart; otherwise go to previous
  if (audio.currentTime > 3) {
    audio.currentTime = 0;
    return;
  }
  const prev = (currentSongIndex - 1 + songList.length) % songList.length;
  playSong(prev);
}

function closePlayer() {
  audio.pause();
  audio.currentTime = 0;
  isPlaying = false;
  currentSongIndex = -1;
  playerBar.classList.remove('visible');
  document.body.classList.remove('player-active');
  removeHighlight();
  removeEqualizer();
  updatePlayIcon();
}

function updatePlayIcon() {
  const icon = playerPlayBtn.querySelector('i');
  icon.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';

  // Also update the active card's play button
  songCards.forEach((card, i) => {
    const playIcon = card.querySelector('.song-play i');
    if (i === currentSongIndex) {
      playIcon.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
    } else {
      playIcon.className = 'fas fa-play';
    }
  });
}

function highlightActiveCard(index) {
  removeHighlight();
  songList[index].element.classList.add('now-playing');
  if (isPlaying) addEqualizer(index);
}

function removeHighlight() {
  songCards.forEach((card) => card.classList.remove('now-playing'));
  removeEqualizer();
}

function addEqualizer(index) {
  removeEqualizer();
  const card = songList[index].element;
  const eq = document.createElement('div');
  eq.className = 'equalizer';
  eq.innerHTML = `
    <span class="eq-bar"></span>
    <span class="eq-bar"></span>
    <span class="eq-bar"></span>
    <span class="eq-bar"></span>
    <span class="eq-bar"></span>
  `;
  card.appendChild(eq);
}

function removeEqualizer() {
  document.querySelectorAll('.equalizer').forEach((eq) => eq.remove());
}

// === Audio time update → progress bar ===
audio.addEventListener('timeupdate', () => {
  if (!audio.duration) return;
  const percent = (audio.currentTime / audio.duration) * 100;
  playerProgressFill.style.width = `${percent}%`;
  playerCurrent.textContent = formatTime(audio.currentTime);
});

audio.addEventListener('loadedmetadata', () => {
  playerDuration.textContent = formatTime(audio.duration);
});

audio.addEventListener('ended', () => {
  nextSong(); // Auto-play next
});

// === Click on progress bar to seek ===
playerProgress.addEventListener('click', (e) => {
  const rect = playerProgress.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const percent = clickX / rect.width;
  audio.currentTime = percent * audio.duration;
});

// === Volume controls ===
audio.volume = 0.8;

volumeBar.addEventListener('click', (e) => {
  const rect = volumeBar.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const percent = Math.max(0, Math.min(1, clickX / rect.width));
  audio.volume = percent;
  volumeFill.style.width = `${percent * 100}%`;
  updateVolumeIcon(percent);
});

function toggleMute() {
  audio.muted = !audio.muted;
  if (audio.muted) {
    volumeIcon.className = 'fas fa-volume-mute';
    volumeFill.style.width = '0%';
  } else {
    updateVolumeIcon(audio.volume);
    volumeFill.style.width = `${audio.volume * 100}%`;
  }
}

function updateVolumeIcon(vol) {
  if (vol === 0) volumeIcon.className = 'fas fa-volume-mute';
  else if (vol < 0.5) volumeIcon.className = 'fas fa-volume-down';
  else volumeIcon.className = 'fas fa-volume-up';
}

function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// === NETFLIX POPUP SURPRISE MODAL ===
function openNetflixPopup() {
  const modal = document.getElementById('netflixModal');
  if (!modal) return;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeNetflixPopup() {
  const modal = document.getElementById('netflixModal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Esc key listener for modal closing
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeNetflixPopup();
    if (typeof closeImageModal === 'function') closeImageModal();
  }
});
