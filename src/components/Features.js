import { ToolCard } from './ToolCard.js';
import { tools } from '../data/tools.js';

export function Features({ onPreview }) {
  const section = document.createElement('section');
  section.className = 'features';
  section.id = 'features';
  section.setAttribute('aria-labelledby', 'features-title');
  section.innerHTML = '<h2 id="features-title">Unlock these features with unlimited access to PDF Guru</h2><div class="tool-grid"></div>';
  for (const tool of tools) section.querySelector('.tool-grid').append(ToolCard({ ...tool, onSelect: onPreview }));
  return section;
}
