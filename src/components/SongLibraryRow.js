const icon = (name) => {
  const img = document.createElement('img');
  img.src = `./assets/icons/library-${name}.svg`;
  img.alt = '';
  img.width = 24;
  img.height = 24;
  img.setAttribute('aria-hidden', 'true');
  return img;
};

/** One file entry in the FORMA 128:551 music library. */
export function SongLibraryRow(song, { onPreview, onLocked, onUnavailable, pauseOthers }) {
  const row = document.createElement('div');
  row.className = 'song-library-row';
  row.dataset.access = song.access;
  row.setAttribute('role', 'row');

  const file = document.createElement('div');
  file.className = 'song-library-row__file';
  file.setAttribute('role', 'cell');
  const art = document.createElement('button');
  art.type = 'button';
  art.className = 'song-library-row__art';
  art.setAttribute('aria-label', `Play ${song.name}`);
  art.append(icon('audio'));
  const names = document.createElement('div');
  names.className = 'song-library-row__names';
  const title = document.createElement('strong');
  title.textContent = song.name;
  const details = document.createElement('span');
  details.textContent = song.details;
  names.append(title, details);
  file.append(art, names);

  const size = document.createElement('span');
  size.className = 'song-library-row__size';
  size.setAttribute('role', 'cell');
  size.textContent = song.size;
  const updated = document.createElement('span');
  updated.className = 'song-library-row__updated';
  updated.setAttribute('role', 'cell');
  updated.textContent = song.updated;
  const access = document.createElement('span');
  access.className = 'song-library-row__access';
  access.setAttribute('role', 'cell');
  if (song.access === 'full') access.append(icon('check'));
  access.append(document.createTextNode(song.access === 'full' ? 'Full song' : 'Preview'));

  const actions = document.createElement('div');
  actions.className = 'song-library-row__actions';
  actions.setAttribute('role', 'cell');
  const more = document.createElement('button');
  more.type = 'button';
  more.className = 'song-library-row__icon-button';
  more.setAttribute('aria-label', `More options for ${song.name}`);
  more.append(icon('more'));
  const menu = document.createElement('div');
  menu.className = 'song-library-row__menu';
  menu.hidden = true;
  const menuAction = document.createElement('button');
  menuAction.type = 'button';
  menuAction.textContent = song.access === 'full' ? 'Download song' : 'Play preview';
  menuAction.addEventListener('click', () => { menu.hidden = true; song.access === 'full' ? onUnavailable(song.name) : art.click(); });
  menu.append(menuAction);
  more.addEventListener('click', () => { menu.hidden = !menu.hidden; more.setAttribute('aria-expanded', String(!menu.hidden)); });
  more.setAttribute('aria-expanded', 'false');
  document.addEventListener('click', event => { if (!actions.contains(event.target)) { menu.hidden = true; more.setAttribute('aria-expanded', 'false'); } });
  const primary = document.createElement('button');
  primary.type = 'button';
  primary.className = `song-library-row__icon-button song-library-row__icon-button--${song.access}`;
  primary.setAttribute('aria-label', song.access === 'full' ? `Download ${song.name}` : `Unlock ${song.name}`);
  primary.append(icon(song.access === 'full' ? 'download' : 'lock'));
  primary.addEventListener('click', () => song.access === 'full' ? onUnavailable(song.name) : onLocked());
  actions.append(more, primary, menu);

  let audio;
  if (song.audio) {
    audio = document.createElement('audio');
    audio.src = song.audio;
    audio.preload = 'none';
    audio.addEventListener('play', () => { pauseOthers(audio); art.setAttribute('aria-label', `Pause ${song.name}`); });
    audio.addEventListener('pause', () => art.setAttribute('aria-label', `Play ${song.name}`));
    audio.addEventListener('timeupdate', () => { if (audio.currentTime >= 10) audio.pause(); });
    art.addEventListener('click', () => audio.paused ? (audio.currentTime >= 10 && (audio.currentTime = 0), audio.play().catch(() => onPreview(song.name))) : audio.pause());
  } else art.addEventListener('click', () => onUnavailable(song.name));

  row.append(file, size, updated, access, actions);
  if (audio) row.append(audio);
  return { element: row, audio };
}
