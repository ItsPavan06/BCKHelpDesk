const clock = document.querySelector('#clock');
const queryText = document.querySelector('#query-text');
const listeningDuration = 3600;
const resultsDuration = 8000;
const transitionDuration = 340;

function navigateTo(destination) {
  document.body.classList.add('page-leaving');
  window.setTimeout(() => {
    window.location.href = destination;
  }, transitionDuration);
}

function beginListening() {
  navigateTo('listening.html');
}

function showResults(query) {
  sessionStorage.setItem('wayfinderQuery', query || 'How can I help you?');
  navigateTo('results.html');
}

function updateClock() {
  const now = new Date();
  clock.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const startButton = document.querySelector('.start-listening');
const stopButton = document.querySelector('.stop-listening');
const askAgainButton = document.querySelector('.ask-again');

if (startButton) {
  startButton.addEventListener('click', (event) => {
    if (startButton.tagName === 'A') return;
    event.preventDefault();
    beginListening();
  });
}

if (stopButton) {
  stopButton.addEventListener('click', () => {
    navigateTo('index.html');
  });
}

if (askAgainButton) {
  askAgainButton.addEventListener('click', beginListening);
}

document.querySelectorAll('a[href]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const destination = link.getAttribute('href');
    if (!destination || destination.startsWith('#') || link.target === '_blank') return;
    event.preventDefault();
    navigateTo(destination);
  });
});

document.addEventListener('keydown', (event) => {
  if (event.code === 'Space' && !event.repeat && !event.target.matches('input, textarea, button')) {
    event.preventDefault();
    beginListening();
  }
});

if (queryText) {
  queryText.textContent = sessionStorage.getItem('wayfinderQuery') || 'Where can I print something?';
}

// Integration seam for the NLP team: call this with a live query to open the results page.
window.wayfinderShowResults = showResults;

if (clock) {
  updateClock();
  window.setInterval(updateClock, 30000);
}

if (window.location.pathname.endsWith('listening.html')) {
  window.setTimeout(() => showResults('Where can I print something?'), listeningDuration);
}

if (window.location.pathname.endsWith('results.html')) {
  window.setTimeout(() => {
    navigateTo('index.html');
  }, resultsDuration);
}
