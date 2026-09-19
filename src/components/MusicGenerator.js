import { Button } from './Button.js';
import { Icon } from './Icon.js';

const suggestions = [
  'A dreamy indie pop song about a late-night drive, with warm vocals and a gentle synth beat.',
  'An upbeat funk track for a sunny morning, with playful vocals, groovy bass, and bright guitar.',
  'A cinematic electronic song about new beginnings, with airy vocals and a soaring chorus.',
  'A cozy acoustic song for a rainy afternoon, with soft vocals and fingerpicked guitar.',
];

/** Figma instance 51:712. UI-only until the generation flow is specified. */
export function MusicGenerator({ onGenerate }) {
  const form = document.createElement('form');
  form.className = 'music-generator';
  form.setAttribute('aria-label', 'Music generator');
  form.innerHTML = `<div class="generation-modes" role="group" aria-label="Generation mode"></div>
    <label class="sr-only" for="music-prompt">Describe your song</label>
    <textarea id="music-prompt" name="prompt" placeholder="Turn any idea into a song" required></textarea>
    <div class="generation-actions"></div>`;
  const modes = form.querySelector('.generation-modes');
  const prompt = form.querySelector('textarea');
  let mode = 'Simple';
  let suggestionIndex = -1;
  for (const label of ['Simple', 'Custom']) {
    const button = Button({ label, variant: 'mode', onClick: () => {
      mode = label;
      for (const item of modes.children) item.setAttribute('aria-pressed', String(item === button));
    } });
    button.setAttribute('aria-pressed', String(label === mode));
    modes.append(button);
  }
  const shuffle = Button({ label: 'Shuffle', variant: 'shuffle', onClick: () => {
    suggestionIndex = (suggestionIndex + 1 + Math.floor(Math.random() * (suggestions.length - 1))) % suggestions.length;
    prompt.value = suggestions[suggestionIndex];
    prompt.setCustomValidity('');
    prompt.focus();
  } });
  shuffle.prepend(Icon('shuffle'));
  const generate = Button({ label: 'Generate music', variant: 'generate' });
  generate.type = 'submit';
  generate.prepend(Icon('sparkles'));
  form.querySelector('.generation-actions').append(shuffle, generate);
  prompt.addEventListener('input', () => prompt.setCustomValidity(''));
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!prompt.value.trim()) {
      prompt.setCustomValidity('Describe the song you want to create.');
      prompt.reportValidity();
      return;
    }
    onGenerate({ prompt: prompt.value.trim(), mode });
  });
  return form;
}
