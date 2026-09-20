import { Button } from './Button.js';
import { Icon } from './Icon.js?v=custom-1';

/** Figma 57:942. Keeps field state when sections or Custom mode are hidden. */
export function CustomMusicFields({ onLyricsGenerate }) {
  const element = document.createElement('div');
  element.className = 'custom-music-fields';
  element.hidden = true;
  element.innerHTML = `<section class="music-options lyrics-options"><div class="options-heading"></div>
    <div class="options-body" id="lyrics-options-body">
      <label class="music-field">Track Title<input name="trackTitle" placeholder="Give your track a name"></label>
      <div class="music-field"><div class="field-heading"><label for="track-lyrics">Lyrics</label><span class="lyrics-generate-slot"></span></div>
        <textarea id="track-lyrics" name="lyrics" placeholder="Write your own lyrics or click generate and we’ll do it for you"></textarea></div>
      <div class="music-field"><span id="voice-label">Voice</span><div class="voice-options" role="group" aria-labelledby="voice-label"></div></div>
    </div></section>
    <section class="music-options style-options"><div class="options-heading"></div><div class="style-chips" id="style-options-body" role="group" aria-label="Music style"></div></section>`;
  for (const [selector, label, icon, bodyId] of [
    ['.lyrics-options', 'Lyrics', 'chevronDown', 'lyrics-options-body'],
    ['.style-options', 'Choose a style', 'chevronRight', 'style-options-body'],
  ]) {
    const section = element.querySelector(selector);
    const heading = Button({ label, variant: 'disclosure', onClick: () => {
      const body = section.querySelector(`#${bodyId}`);
      body.hidden = !body.hidden;
      heading.setAttribute('aria-expanded', String(!body.hidden));
    } });
    heading.prepend(Icon(icon));
    heading.setAttribute('aria-expanded', 'true');
    heading.setAttribute('aria-controls', bodyId);
    section.querySelector('.options-heading').append(heading);
  }
  const lyricsGenerate = Button({ label: 'Generate', variant: 'shuffle', onClick: onLyricsGenerate });
  lyricsGenerate.prepend(Icon('shuffle'));
  element.querySelector('.lyrics-generate-slot').append(lyricsGenerate);
  let voice = 'Male';
  let style = '';
  function choices(container, labels, variant, initial, onSelect) {
    for (const label of labels) {
      const button = Button({ label, variant, onClick: () => {
        const selected = variant === 'chip' && button.getAttribute('aria-pressed') === 'true' ? '' : label;
        for (const child of container.children) child.setAttribute('aria-pressed', String(child.textContent === selected));
        onSelect(selected);
      } });
      button.setAttribute('aria-pressed', String(label === initial));
      container.append(button);
    }
  }
  choices(element.querySelector('.voice-options'), ['Male', 'Female'], 'voice', voice, value => { voice = value; });
  choices(element.querySelector('.style-chips'), ['Pop', 'Hip-hop', 'Lo-fi', 'Cinematic', 'Rock', 'Jazz', 'Grime', 'Ambient', 'Synthwave'], 'chip', style, value => { style = value; });
  return { element, getValues: () => ({
    title: element.querySelector('[name="trackTitle"]').value.trim(),
    lyrics: element.querySelector('[name="lyrics"]').value.trim(),
    voice, style,
  }) };
}
