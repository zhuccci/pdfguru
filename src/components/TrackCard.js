import { Icon } from './Icon.js?v=tracks-1';

/** Figma 105:713 / 105:856. The same visual component in loading and ready states. */
export function TrackCard({ version, title, onPreview }) {
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
    play.setAttribute('aria-label', `Play ${title} preview`);
    play.append(Icon('play'));
    play.addEventListener('click', () => onPreview(title));
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
