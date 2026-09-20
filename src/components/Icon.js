/** Original Figma exports; decorative icons inherit their control's accessible name. */
export const iconAssets = Object.freeze({
  tools: 'tools-grid.png',
  shuffle: 'shuffle.svg',
  sparkles: 'sparkles.svg',
  chevronDown: 'chevron-down.svg',
  chevronRight: 'chevron-right.svg',
  chevronDownLight: 'chevron-down-light.svg',
});

export function Icon(name) {
  if (!iconAssets[name]) throw new Error(`Unknown icon: ${name}`);
  const image = document.createElement('img');
  image.className = 'icon';
  image.src = new URL(`../../assets/icons/${iconAssets[name]}`, import.meta.url).href;
  image.alt = '';
  image.width = 24;
  image.height = 24;
  image.setAttribute('aria-hidden', 'true');
  return image;
}
