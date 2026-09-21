import { Button } from './Button.js';
import { Icon } from './Icon.js?v=tracks-1';
import { TrackCard } from './TrackCard.js?v=tracks-2';
import { WaveformProgress } from './WaveformProgress.js?v=tracks-1';

/** Figma component variants 105:789 (loading) and 105:791 (ready). */
export function TrackGeneration({ onPreview, onUnlock }) {
  const panel = document.createElement('section');
  panel.className = 'track-generation';
  panel.setAttribute('aria-labelledby', 'track-generation-title');
  panel.innerHTML = `<div class="track-generation__heading"><h1 id="track-generation-title" aria-live="polite">Composing your tracks</h1></div><div class="track-generation__progress"></div><p class="track-generation__description"></p><div class="track-generation__cards"></div><div class="track-generation__action"></div>`;
  const description = panel.querySelector('.track-generation__description');
  description.textContent = 'Song about Emerald sky and a long-awaited return';
  const progress = WaveformProgress();
  panel.querySelector('.track-generation__progress').append(progress.element);
  const cards = [
    TrackCard({ version: 1, title: 'Emerald Sky', onPreview }),
    TrackCard({ version: 2, title: 'Emerald Sky ver. 2', onPreview, audioSrc: new URL('../../assets/audio/emerald-sky-ver-2.mp3', import.meta.url).href }),
  ];
  panel.querySelector('.track-generation__cards').append(...cards.map(card => card.element));

  let finished = false;
  let progressTimer;
  let resultTimer;
  function showResult() {
    if (finished) return;
    finished = true;
    clearInterval(progressTimer);
    progress.setProgress(100);
    panel.dataset.state = 'ready';
    panel.querySelector('h1').textContent = 'Your previews are ready';
    description.textContent = 'Listen to two 10-second previews, then unlock the full versions.';
    progress.element.remove();
    cards.forEach(card => card.setState('ready'));
    const unlock = Button({ label: 'Unlock full songs', variant: 'generate', onClick: onUnlock });
    unlock.classList.add('track-generation__unlock');
    unlock.prepend(Icon('unlock'));
    panel.querySelector('.track-generation__action').append(unlock);
  }

  let percent = 36;
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    progressTimer = window.setInterval(() => {
      percent = Math.min(94, percent + 2);
      progress.setProgress(percent);
    }, 100);
  }
  resultTimer = window.setTimeout(showResult, 3800);
  window.addEventListener('pagehide', () => { clearInterval(progressTimer); clearTimeout(resultTimer); }, { once: true });
  return panel;
}
