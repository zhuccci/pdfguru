/** Figma Button (27:979). Native button semantics and source default/hover colors. */
export function Button({ label, variant = 'primary', onClick, className = '' }) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = `button button--${variant} ${className}`.trim();
  button.textContent = label;
  if (onClick) button.addEventListener('click', onClick);
  return button;
}
