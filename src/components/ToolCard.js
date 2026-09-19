/** Figma ToolCard (25:717). Icon and label are data, not separate variants. */
export function ToolCard({ label, icon, onSelect }) {
  const card = document.createElement('button');
  card.type = 'button';
  card.className = 'tool-card';
  const image = document.createElement('img');
  image.src = `./assets/${icon}`;
  image.alt = '';
  image.width = 64;
  image.height = 64;
  const text = document.createElement('span');
  text.textContent = label;
  card.append(image, text);
  card.addEventListener('click', () => onSelect(label));
  return card;
}
