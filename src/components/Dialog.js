import { Button } from './Button.js';
/** Native modal: focus trapping, Escape and focus restoration are browser-managed. */
export function Dialog() {
  const dialog = document.createElement('dialog');
  dialog.className = 'dialog';
  dialog.setAttribute('aria-labelledby', 'dialog-title');
  const title = document.createElement('h2');
  title.id = 'dialog-title';
  const content = document.createElement('p');
  const close = Button({ label: 'Close', variant: 'secondary', onClick: () => dialog.close() });
  dialog.append(title, content, close);
  dialog.addEventListener('click', event => { if (event.target === dialog) { const box = dialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close(); } });
  return { element: dialog, show(heading, message) { title.textContent = heading; content.textContent = message; dialog.showModal(); } };
}
