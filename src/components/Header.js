import { Button } from './Button.js';
import { Icon } from './Icon.js';
import { tools } from '../data/tools.js';

/** Shared by home and music. Figma header 43:160. */
export function Header({ onPreview, onLogin }) {
  const header = document.createElement('header');
  header.className = 'site-header';
  header.innerHTML = `<nav class="nav-start" aria-label="Main navigation">
    <a class="brand" href="./index.html" aria-label="PDF Guru home"><span class="brand-mask"><img src="./assets/3c567.svg" alt="PDF Guru"></span></a>
    <div class="nav-items"></div></nav><div class="tools-menu" id="tools-menu" hidden></div>`;
  const menu = header.querySelector('.tools-menu');
  const toggle = Button({ label: 'Tools', variant: 'nav' });
  toggle.classList.add('nav-link');
  toggle.prepend(Icon('tools'));
  toggle.append(Icon('chevronDown'));
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', 'tools-menu');
  function closeMenu() { menu.hidden = true; toggle.setAttribute('aria-expanded', 'false'); }
  for (const tool of tools) menu.append(Button({ label: tool.label, variant: 'text', onClick: () => { closeMenu(); onPreview(tool.label); } }));
  toggle.addEventListener('click', () => { menu.hidden = !menu.hidden; toggle.setAttribute('aria-expanded', String(!menu.hidden)); });
  document.addEventListener('click', event => { if (!header.contains(event.target)) closeMenu(); });
  header.addEventListener('focusout', event => { if (!header.contains(event.relatedTarget)) closeMenu(); });
  header.addEventListener('keydown', event => { if (event.key === 'Escape' && !menu.hidden) { closeMenu(); toggle.focus(); } });
  header.querySelector('.nav-items').append(toggle, Button({ label: 'Contact Us', variant: 'nav', className: 'nav-link', onClick: () => { closeMenu(); onPreview('Contact Us'); } }));
  header.append(Button({ label: 'Log in', variant: 'secondary', className: 'header-login', onClick: () => { closeMenu(); onLogin(); } }));
  return header;
}
