import { Header } from '../components/Header.js';
import { TrackGeneration } from '../components/TrackGeneration.js?v=tracks-1';

/** Figma page 105:330. Shares the site's header and footer via app.js. */
export function TrackResultsPage(actions) {
  const main = document.createElement('main');
  main.id = 'content';
  main.className = 'track-results-page';
  const header = document.createElement('div');
  header.className = 'music-header';
  header.append(Header(actions));
  let prompt = '';
  try { prompt = sessionStorage.getItem('pdfguru:track-prompt') || ''; } catch {}
  main.append(header, TrackGeneration({
    prompt,
    onPreview: () => actions.onPreview('10-second audio preview'),
    onUnlock: () => actions.onPreview('Unlock full songs'),
  }));
  return main;
}
