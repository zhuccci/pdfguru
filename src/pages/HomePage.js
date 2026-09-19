import { Header } from '../components/Header.js';
import { Features } from '../components/Features.js';
import { UploadZone } from '../components/UploadZone.js';

export function HomePage(actions) {
  const template = document.createElement('template');
  template.innerHTML = `<main id="content">
    <section class="hero" aria-labelledby="hero-title">
      <div id="header-slot"></div>
      <div class="hero-intro"><h1 id="hero-title">PDF Editor for All Your Needs</h1><p>Manage all your PDF files with a single online tool.</p></div>
      <div class="hero-content"><div id="upload-slot"></div>
        <div class="benefits"><span><i aria-hidden="true">♢</i>Privacy-focused</span><span><i aria-hidden="true">▤</i>Easy to use</span><span><i aria-hidden="true">◷</i>Lightning-fast</span></div>
        <p class="terms">By uploading a file, you agree to our <button data-preview="Terms of Use">Terms of Use</button> and <button data-preview="Privacy Policy">Privacy Policy</button>.</p>
      </div>
    </section>
    <section class="music" aria-labelledby="music-title">
      <div class="music-art"><img class="music-shape" src="./assets/8709f.svg" alt=""><div class="music-image-crop"><img src="./assets/35d1a.png" alt="Laptop with an audio waveform and music creation tools"></div></div>
      <div class="music-content"><div class="music-copy"><h2 id="music-title">Create original music with AI</h2><p>Describe the sound you need and generate a track for videos, ads, podcasts, and more.</p></div><div id="music-action"></div></div>
    </section>
    
  </main>
`;
  const main = template.content.firstElementChild;
  main.querySelector('#header-slot').replaceWith(Header(actions));
  main.querySelector('#upload-slot').append(UploadZone());
  const musicLink = document.createElement('a');
  musicLink.className = 'button button--primary';
  musicLink.href = './music.html';
  musicLink.textContent = 'Generate music';
  main.querySelector('#music-action').append(musicLink);
  main.querySelectorAll('[data-preview]').forEach(button => button.addEventListener('click', () => actions.onPreview(button.dataset.preview)));
  main.append(Features(actions));
  return main;
}
