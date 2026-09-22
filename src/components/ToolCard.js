/** Figma ToolCard (25:717). Icon and label are data, not separate variants. */
export function ToolCard({ label, icon, badge, href, onSelect }) {
  const card = document.createElement(href ? 'a' : 'button');
  if (href) card.href = href;
  else card.type = 'button';
  card.className = 'tool-card';
  const image = document.createElement('img');
  image.src = `./assets/${icon}`;
  image.alt = '';
  image.width = 64;
  image.height = 64;
  const text = document.createElement('span');
  text.textContent = label;
  card.append(image, text);
  if (badge) {
    const marker = document.createElement('span');
    marker.className = 'tool-card__badge';
    marker.setAttribute('aria-label', badge);
    marker.innerHTML = '<img src="./assets/icons/new-label.svg" alt="">';
    card.append(marker);
  }
  if (!href) card.addEventListener('click', () => onSelect(label));
  return card;
}
