import { Button } from './components/Button.js';
import { ToolCard } from './components/ToolCard.js';
import { UploadZone } from './components/UploadZone.js';
import { Dialog } from './components/Dialog.js';
import { tools, footerGroups } from './data/tools.js';

const app = document.querySelector('#app');
app.innerHTML = `
  <main id="content">
    <section class="hero" aria-labelledby="hero-title">
      <header class="site-header">
        <div class="nav-start"><a class="brand" href="#content" aria-label="PDF Guru home"><span class="brand-mask"><img src="./assets/3c567.svg" alt="PDF Guru"></span></a>
          <button class="nav-link" id="tools-toggle" aria-expanded="false" aria-controls="tools-menu">▦ Tools</button>
          <button class="nav-link" data-preview="Contact Us">Contact Us</button>
        </div>
        <div id="login-action"></div>
        <div class="tools-menu" id="tools-menu" hidden></div>
      </header>
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
    <section class="features" id="features" aria-labelledby="features-title"><h2 id="features-title">Unlock these features with unlimited access to PDF Guru</h2><div class="tool-grid" id="tool-grid"></div></section>
  </main>
  <footer class="site-footer"><div class="footer-brand-space" aria-hidden="true"></div><div class="footer-grid" id="footer-grid"></div><small>© PDF Guru. All rights reserved 2026. LOPOFIST LIMITED, 26 Stavrou Street, Strovolos, 2035, Nicosia, Cyprus.</small></footer>`;

const dialog = Dialog();
app.append(dialog.element);
const preview = label => dialog.show(label, 'This prototype includes only this page. This destination is not connected yet.');
document.querySelector('#login-action').append(Button({ label: 'Log in', variant: 'secondary', className: 'header-login', onClick: () => dialog.show('Log in', 'This is a visual prototype. Sign-in is not connected and no credentials are collected.') }));
document.querySelector('#music-action').append(Button({ label: 'Generate music', onClick: () => dialog.show('Create original music with AI', 'The music creation flow is coming next. This prototype does not generate audio yet.') }));
document.querySelector('#upload-slot').append(UploadZone());
const menu = document.querySelector('#tools-menu');
const toggle = document.querySelector('#tools-toggle');
function closeMenu() { menu.hidden = true; toggle.setAttribute('aria-expanded', 'false'); }
for (const tool of tools) {
  document.querySelector('#tool-grid').append(ToolCard({ ...tool, onSelect: preview }));
  const entry = Button({ label: tool.label, variant: 'text', onClick: () => { closeMenu(); preview(tool.label); } });
  menu.append(entry);
}
toggle.addEventListener('click', () => { menu.hidden = !menu.hidden; toggle.setAttribute('aria-expanded', String(!menu.hidden)); });
document.addEventListener('click', event => { if (!menu.contains(event.target) && !toggle.contains(event.target)) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !menu.hidden) { closeMenu(); toggle.focus(); } });
for (const [heading, links] of Object.entries(footerGroups)) {
  const section = document.createElement('div');
  const title = document.createElement('h3');
  title.textContent = heading;
  section.append(title);
  for (const label of links) section.append(Button({ label, variant: 'footer', onClick: () => preview(label) }));
  document.querySelector('#footer-grid').append(section);
}
document.querySelectorAll('[data-preview]').forEach(button => button.addEventListener('click', () => preview(button.dataset.preview)));
