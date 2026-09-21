import { Button } from './Button.js';
import { Icon } from './Icon.js?v=motion-2';
import { CustomMusicFields } from './CustomMusicFields.js?v=lyrics-1';

const suggestions = [
  'Song about Emerald sky and a long-awaited return',
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
    <div class="music-field prompt-field"><div class="field-heading prompt-heading"><label for="music-prompt">Describe your track</label><span class="prompt-shuffle-slot"></span></div>
    <textarea id="music-prompt" name="prompt" aria-label="Describe your track" placeholder="Turn any idea into a song"></textarea></div>
    <div class="generation-actions"></div>`;
  const modes = form.querySelector('.generation-modes');
  const prompt = form.querySelector('textarea');
  const custom = CustomMusicFields();
  form.querySelector('.generation-actions').before(custom.element);
  let mode = 'Simple';
  let suggestionIndex = -1;
  let shuffleBag = [];

  const switchMode = nextMode => {
    if (nextMode === mode) return;
    const showCustom = nextMode === 'Custom';
    mode = nextMode;
    custom.element.inert = !showCustom;
    custom.element.setAttribute('aria-hidden', String(!showCustom));
    form.classList.toggle('is-custom', showCustom);
    generate.lastChild.textContent = showCustom ? 'Create my song' : 'Generate music';
    generate.firstChild.replaceWith(Icon(showCustom ? 'audio' : 'sparkles'));
    for (const item of modes.children) item.setAttribute('aria-pressed', String(item.textContent.trim() === mode));
  };

  for (const label of ['Simple', 'Custom']) {
    const button = Button({ label, variant: 'mode', onClick: () => switchMode(label) });
    button.setAttribute('aria-pressed', String(label === mode));
    modes.append(button);
  }
  const shuffle = Button({ label: 'Shuffle', variant: 'shuffle', onClick: () => {
    if (!shuffleBag.length) {
      shuffleBag = suggestions.map((_, index) => index);
      for (let index = shuffleBag.length - 1; index > 0; index--) {
        const swap = Math.floor(Math.random() * (index + 1));
        [shuffleBag[index], shuffleBag[swap]] = [shuffleBag[swap], shuffleBag[index]];
      }
      if (shuffleBag[shuffleBag.length - 1] === suggestionIndex) [shuffleBag[0], shuffleBag[shuffleBag.length - 1]] = [shuffleBag[shuffleBag.length - 1], shuffleBag[0]];
    }
    suggestionIndex = shuffleBag.pop();
    prompt.value = suggestions[suggestionIndex];
  } });
  shuffle.prepend(Icon('shuffle'));
  const generate = Button({ label: 'Generate music', variant: 'generate' });
  generate.type = 'submit';
  generate.prepend(Icon('sparkles'));
  form.querySelector('.prompt-shuffle-slot').append(shuffle);
  form.querySelector('.generation-actions').append(generate);
  form.addEventListener('submit', event => {
    event.preventDefault();
    onGenerate({ prompt: prompt.value.trim(), mode, ...(mode === 'Custom' ? custom.getValues() : {}) });
  });
  return form;
}
