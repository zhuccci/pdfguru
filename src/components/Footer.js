import { Button } from './Button.js';
import { Icon } from './Icon.js';
import { footerGroups } from '../data/tools.js';

/** Shared footer, including the white logo from Figma 43:234. */
export function Footer({ onPreview }) {
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = `<div class="footer-row"><a class="footer-brand" href="./index.html" aria-label="PDF Guru home"><img src="./assets/brand/logo-light.svg" alt="PDF Guru"></a><nav class="footer-grid" aria-label="Footer"></nav></div><small>© PDF Guru. All rights reserved 2026. LOPOFIST LIMITED, 26 Stavrou Street, Strovolos, 2035, Nicosia, Cyprus.</small>`;
  for (const [heading, links] of Object.entries(footerGroups)) {
    const section = document.createElement('div');
    const title = document.createElement('h3');
    title.textContent = heading;
    section.append(title);
    for (const label of links) {
      const button = Button({ label, variant: 'footer', onClick: () => onPreview(label) });
      if (heading === 'Language') button.append(Icon('chevronDownLight'));
      section.append(button);
    }
    footer.querySelector('.footer-grid').append(section);
  }
  return footer;
}
