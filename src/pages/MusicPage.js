import { Header } from '../components/Header.js?v=signed-in-1';
import { Features } from '../components/Features.js';
import { MusicGenerator } from '../components/MusicGenerator.js?v=lyrics-1';

export function MusicPage(actions) {
  const main = document.createElement('main');
  main.id = 'content';
  main.className = 'music-page';
  main.innerHTML = `<div class="music-header"></div><section class="generation-section" aria-labelledby="generation-title">
    <div class="generation-intro"><h1 id="generation-title">Turn any idea into a song</h1><p>Type a vibe, pick an aesthetic, and generate a complete track with vocals.</p></div>
  </section>`;
  main.querySelector('.music-header').append(Header(actions));
  main.querySelector('.generation-section').append(MusicGenerator(actions));
  main.append(Features(actions));
  return main;
}
