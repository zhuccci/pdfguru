import { Button } from './Button.js';
import { Icon } from './Icon.js?v=custom-3';

const styleNames = ['Pop', 'Hip-hop', 'Lo-fi', 'Cinematic', 'Rock', 'Jazz', 'Grime', 'Ambient', 'Synthwave'];
const formatOptions = [['Track', 'Structured song'], ['Loop', 'Seamless repeat'], ['Jingle', 'Short catchy hook']];
const durationOptions = [['Short', 'Up to 30 seconds'], ['Standard', 'Around 90 seconds'], ['Full Length', '2 minutes or longer']];

function Disclosure({ label, bodyId, root }) {
  const button = Button({ label, variant: 'disclosure' });
  button.prepend(Icon('chevronDown'));
  button.setAttribute('aria-expanded', 'true');
  button.setAttribute('aria-controls', bodyId);
  button.addEventListener('click', () => {
    const body = root.querySelector(`#${bodyId}`);
    body.hidden = !body.hidden;
    button.setAttribute('aria-expanded', String(!body.hidden));
  });
  return button;
}

function Selectors({ options, name, initial, onChange }) {
  const group = document.createElement('div');
  group.className = `detail-selectors ${name}-options`;
  group.setAttribute('role', 'group');
  group.setAttribute('aria-label', name === 'format' ? 'Format' : 'Duration');
  for (const [label, description] of options) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'detail-selector';
    button.innerHTML = `<strong>${label}</strong><span>${description}</span>`;
    button.setAttribute('aria-pressed', String(label === initial));
    button.addEventListener('click', () => {
      for (const item of group.children) item.setAttribute('aria-pressed', String(item === button));
      onChange(label);
    });
    group.append(button);
  }
  return group;
}

/** Figma 57:942. Keeps field state when sections or Custom mode are hidden. */
export function CustomMusicFields({ onLyricsGenerate }) {
  const element = document.createElement('div');
  element.className = 'custom-music-fields';
  element.hidden = true;
  element.innerHTML = `<section class="music-options lyrics-options"><div class="options-heading"></div>
    <div class="options-body" id="lyrics-options-body">
      <div class="vocals-toggle-row"><button class="vocals-toggle" type="button" role="switch" aria-checked="true" aria-controls="vocals-dependent" aria-labelledby="vocals-toggle-label"><span aria-hidden="true"></span></button><span id="vocals-toggle-label">Add vocals</span></div>
      <div class="vocals-dependent" id="vocals-dependent">
        <div class="music-field"><div class="field-heading"><label for="track-lyrics">Lyrics</label><span class="lyrics-generate-slot"></span></div>
          <textarea id="track-lyrics" name="lyrics" placeholder="Write your own lyrics or click generate and we’ll do it for you"></textarea></div>
        <div class="music-field"><span id="voice-label">Voice</span><div class="voice-options" role="group" aria-labelledby="voice-label"></div></div>
      </div>
    </div></section>
    <section class="music-options style-options"><div class="options-heading"></div><div class="options-body" id="style-options-body">
      <div class="style-chips" role="group" aria-label="Music styles"></div>
      <div class="music-field"><span>Format</span><div class="format-slot"></div></div>
    </div></section>
    <section class="music-options duration-options"><div class="options-heading"></div><div class="options-body" id="duration-options-body"><div class="duration-slot"></div></div></section>`;

  element.querySelector('.lyrics-options .options-heading').append(Disclosure({ label: 'Voice & Lyrics', bodyId: 'lyrics-options-body', root: element }));
  element.querySelector('.style-options .options-heading').append(Disclosure({ label: 'Style & format', bodyId: 'style-options-body', root: element }));
  element.querySelector('.duration-options .options-heading').append(Disclosure({ label: 'Duration', bodyId: 'duration-options-body', root: element }));

  const lyricsGenerate = Button({ label: 'Generate', variant: 'shuffle', onClick: onLyricsGenerate });
  lyricsGenerate.prepend(Icon('listSparkle'));
  element.querySelector('.lyrics-generate-slot').append(lyricsGenerate);

  let addVocals = true;
  let voice = 'Male';
  let format = 'Track';
  let duration = 'Short';
  const styles = new Set();
  const toggle = element.querySelector('.vocals-toggle');
  toggle.addEventListener('click', () => {
    addVocals = !addVocals;
    toggle.setAttribute('aria-checked', String(addVocals));
    element.querySelector('.vocals-dependent').hidden = !addVocals;
  });

  const voiceGroup = element.querySelector('.voice-options');
  for (const label of ['Male', 'Female']) {
    const button = Button({ label, variant: 'voice', onClick: () => {
      voice = label;
      for (const item of voiceGroup.children) item.setAttribute('aria-pressed', String(item === button));
    } });
    button.setAttribute('aria-pressed', String(label === voice));
    voiceGroup.append(button);
  }

  for (const label of styleNames) {
    const chip = Button({ label, variant: 'chip', onClick: () => {
      if (styles.has(label)) styles.delete(label);
      else styles.add(label);
      chip.setAttribute('aria-pressed', String(styles.has(label)));
    } });
    chip.setAttribute('aria-pressed', 'false');
    element.querySelector('.style-chips').append(chip);
  }

  element.querySelector('.format-slot').append(Selectors({ options: formatOptions, name: 'format', initial: format, onChange: value => { format = value; } }));
  element.querySelector('.duration-slot').append(Selectors({ options: durationOptions, name: 'duration', initial: duration, onChange: value => { duration = value; } }));

  return { element, getValues: () => ({
    addVocals,
    lyrics: addVocals ? element.querySelector('[name="lyrics"]').value.trim() : '',
    voice: addVocals ? voice : null,
    styles: [...styles],
    format,
    duration,
  }) };
}
