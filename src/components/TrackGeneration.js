import { Button } from './Button.js';
import { Icon } from './Icon.js?v=tracks-1';
import { TrackCard } from './TrackCard.js?v=tracks-3';
import { WaveformProgress } from './WaveformProgress.js?v=tracks-1';

/** Figma component variants 105:789 (loading) and 105:791 (ready). */
export function TrackGeneration({ onPreview, onUnlock, onDownload, onCreateAnotherTrack, isSignedIn = false }) {
  const panel = document.createElement('section');
  panel.className = 'track-generation';
  panel.dataset.state = 'loading';
  panel.setAttribute('aria-labelledby', 'track-generation-title-loading');

  const loadingStage = document.createElement('div');
  loadingStage.className = 'track-generation__stage track-generation__stage--loading';
  loadingStage.innerHTML = '<div class="track-generation__heading"><h1 id="track-generation-title-loading">Composing your tracks</h1></div><div class="track-generation__progress"></div><p class="track-generation__description">Song about Emerald sky and a long-awaited return</p><div class="track-generation__cards"></div>';
  const progress = WaveformProgress();
  loadingStage.querySelector('.track-generation__progress').append(progress.element);
  loadingStage.querySelector('.track-generation__cards').append(
    TrackCard({ version: 1, title: 'Emerald Sky', onPreview }).element,
    TrackCard({ version: 2, title: 'Emerald Sky ver. 2', onPreview }).element,
  );

  const readyStage = document.createElement('div');
  readyStage.className = 'track-generation__stage track-generation__stage--ready';
  readyStage.inert = true;
  readyStage.setAttribute('aria-hidden', 'true');
  readyStage.innerHTML = '<div class="track-generation__heading"><h1 id="track-generation-title-ready">Your previews are ready</h1></div><p class="track-generation__description">Listen to two 10-second previews, then unlock the full versions.</p><div class="track-generation__cards"></div><div class="track-generation__action"></div>';
  const cards = [];
  cards.push(
    TrackCard({ version: 1, title: 'Emerald Sky', onPreview, audioSrc: new URL('../../assets/audio/emerald-sky-ver-1.mp3', import.meta.url).href, onPlaybackStart: () => cards[1]?.pause() }),
    TrackCard({ version: 2, title: 'Emerald Sky ver. 2', onPreview, audioSrc: new URL('../../assets/audio/emerald-sky-ver-2.mp3', import.meta.url).href, onPlaybackStart: () => cards[0]?.pause() }),
  );
  cards.forEach(card => card.setState('ready'));
  readyStage.querySelector('.track-generation__cards').append(...cards.map(card => card.element));
  const unlock = Button({ label: 'Unlock full songs', variant: 'generate', onClick: onUnlock });
  unlock.classList.add('track-generation__unlock');
  unlock.prepend(Icon('unlock'));
  const download = Button({ label: 'Download full songs', variant: 'generate', onClick: onDownload });
  download.classList.add('track-generation__unlock');
  download.prepend(Icon('unlock'));
  const createAnother = Button({ label: 'Create another track', variant: 'plain', className: 'track-generation__again', onClick: onCreateAnotherTrack });
  const action = readyStage.querySelector('.track-generation__action');
  action.append(unlock, download, createAnother);
  function setSignedIn(signedIn) {
    panel.dataset.signedIn = String(signedIn);
    unlock.hidden = signedIn;
    download.hidden = !signedIn;
    createAnother.hidden = !signedIn;
  }
  setSignedIn(isSignedIn);
  window.addEventListener('pdfguru:mock-login', () => setSignedIn(true));
  window.addEventListener('pdfguru:mock-logout', () => setSignedIn(false));

  const announcement = document.createElement('span');
  announcement.className = 'sr-only';
  announcement.setAttribute('aria-live', 'polite');
  panel.append(loadingStage, readyStage, announcement);

  let finished = false;
  let progressTimer;
  function showResult() {
    if (finished) return;
    finished = true;
    clearInterval(progressTimer);
    progress.setProgress(100);
    panel.dataset.state = 'ready';
    panel.setAttribute('aria-labelledby', 'track-generation-title-ready');
    loadingStage.inert = true;
    loadingStage.setAttribute('aria-hidden', 'true');
    readyStage.inert = false;
    readyStage.removeAttribute('aria-hidden');
    announcement.textContent = 'Your previews are ready';
  }

  let percent = 36;
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    progressTimer = window.setInterval(() => {
      percent = Math.min(94, percent + 2);
      progress.setProgress(percent);
    }, 100);
  }
  const resultTimer = window.setTimeout(showResult, 3800);
  window.addEventListener('pagehide', () => { clearInterval(progressTimer); clearTimeout(resultTimer); }, { once: true });
  return panel;
}
