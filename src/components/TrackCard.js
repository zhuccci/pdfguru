import { Icon } from './Icon.js?v=tracks-1';

/** Figma 105:713 / 105:856. The same visual component in loading and ready states. */
export function TrackCard({ version, title, onPreview, audioSrc }) {
  const root = document.createElement('div');
  root.className = `track-card track-card--${version}`;
  const artwork = document.createElement('div');
  artwork.className = 'track-card__artwork';
  const loader = Icon('loader');
  loader.classList.add('track-card__loader');
  artwork.append(loader);
  const caption = document.createElement('div');
  caption.className = 'track-card__caption';
  root.append(artwork, caption);
  const audio = audioSrc ? document.createElement('audio') : null;
  if (audio) {
    audio.src = audioSrc;
    audio.preload = 'metadata';
    root.append(audio);
  }

  function updatePlayback(button) {
    const playing = !audio.paused && !audio.ended;
    button.setAttribute('aria-label', `${playing ? 'Pause' : 'Play'} ${title} preview`);
    button.setAttribute('aria-pressed', String(playing));
    const glyph = playing ? document.createElement('span') : Icon('play');
    if (playing) {
      glyph.className = 'track-card__pause-glyph';
      glyph.setAttribute('aria-hidden', 'true');
    }
    button.replaceChildren(glyph);
  }

  function setState(state) {
    root.dataset.state = state;
    artwork.replaceChildren();
    caption.replaceChildren();
    if (state === 'loading') {
      artwork.append(loader);
      const label = document.createElement('span');
      label.textContent = `Version ${version}`;
      caption.append(label);
      return;
    }
    const play = document.createElement('button');
    play.className = 'track-card__play';
    play.type = 'button';
    if (audio) {
      updatePlayback(play);
      for (const event of ['playing', 'pause', 'ended']) audio.addEventListener(event, () => updatePlayback(play));
      play.addEventListener('click', () => {
        if (audio.paused) audio.play().catch(() => {
          play.disabled = true;
          play.setAttribute('aria-label', `${title} preview unavailable`);
        });
        else audio.pause();
      });
    } else {
      play.setAttribute('aria-label', `Play ${title} preview`);
      play.append(Icon('play'));
      play.addEventListener('click', () => onPreview(title));
    }
    artwork.append(play);
    const name = document.createElement('strong');
    name.textContent = title;
    const length = document.createElement('span');
    length.textContent = '10-sec preview';
    caption.append(name, length);
  }

  setState('loading');
  return { element: root, setState };
}
