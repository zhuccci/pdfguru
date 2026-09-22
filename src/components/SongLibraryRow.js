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
export function SongLibraryRow(song, { onPreview, onLocked, onUnavailable, onCertificate, pauseOthers }) {
  let currentName = song.name;
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
  art.setAttribute('aria-label', `Play ${currentName}`);
  const audioIcon = icon('audio');
  audioIcon.className = 'song-library-row__art-audio';
  const playIcon = document.createElement('img');
  playIcon.className = 'song-library-row__art-play';
  playIcon.src = './assets/icons/play.svg';
  playIcon.alt = '';
  playIcon.width = 24;
  playIcon.height = 24;
  playIcon.setAttribute('aria-hidden', 'true');
  const pauseIcon = document.createElement('span');
  pauseIcon.className = 'song-library-row__art-pause';
  pauseIcon.setAttribute('aria-hidden', 'true');
  art.append(audioIcon, playIcon, pauseIcon);
  const names = document.createElement('div');
  names.className = 'song-library-row__names';
  const title = document.createElement('strong');
  title.textContent = currentName;
  const details = document.createElement('span');
  details.textContent = song.details;
  names.append(title, details);
  file.append(art, names);

  const size = document.createElement('span');
  size.className = 'song-library-row__size';
  size.setAttribute('role', 'cell');
  size.textContent = song.size;
  const duration = document.createElement('span');
  duration.className = 'song-library-row__duration';
  duration.setAttribute('role', 'cell');
  duration.textContent = song.duration;
  const updated = document.createElement('span');
  updated.className = 'song-library-row__updated';
  updated.setAttribute('role', 'cell');
  updated.textContent = song.updated;
  const access = document.createElement('div');
  access.className = 'song-library-row__access';
  access.setAttribute('role', 'cell');
  if (song.access === 'full') access.append(icon('check'));
  const accessCopy = document.createElement('span');
  accessCopy.className = 'song-library-row__access-copy';
  const accessTitle = document.createElement('strong');
  accessTitle.textContent = song.access === 'full' ? 'Full song' : 'Preview';
  const accessDetail = document.createElement('span');
  accessDetail.textContent = song.access === 'full' ? 'Commercial license' : 'Unlicensed';
  accessCopy.append(accessTitle, accessDetail);
  access.append(accessCopy);

  const actions = document.createElement('div');
  actions.className = 'song-library-row__actions';
  actions.setAttribute('role', 'cell');
  const more = document.createElement('button');
  more.type = 'button';
  more.className = 'song-library-row__icon-button';
  more.setAttribute('aria-label', `More options for ${currentName}`);
  more.append(icon('more'));
  const menu = document.createElement('div');
  menu.className = 'song-library-row__menu';
  menu.id = `song-options-${song.id}`;
  menu.setAttribute('aria-label', `Options for ${currentName}`);
  menu.hidden = true;
  more.setAttribute('aria-controls', menu.id);
  const closeMenu = () => { menu.hidden = true; more.setAttribute('aria-expanded', 'false'); };
  const menuItem = (label, iconName, onClick) => {
    const button = document.createElement('button');
    button.type = 'button';
    const image = icon(iconName);
    image.width = 16;
    image.height = 16;
    button.append(image, document.createTextNode(label));
    button.addEventListener('click', () => { closeMenu(); onClick(); });
    return button;
  };
  function changeTitle() {
    const editor = document.createElement('input');
    editor.className = 'song-library-row__title-editor';
    editor.type = 'text';
    editor.maxLength = 80;
    editor.setAttribute('aria-label', 'Track title');
    editor.value = currentName;
    title.hidden = true;
    names.insertBefore(editor, details);
    let cancelled = false;
    const finish = () => {
      if (!editor.isConnected) return;
      const nextName = editor.value.trim();
      if (!cancelled && nextName) currentName = nextName;
      title.textContent = currentName;
      title.hidden = false;
      editor.remove();
      more.setAttribute('aria-label', `More options for ${currentName}`);
      menu.setAttribute('aria-label', `Options for ${currentName}`);
      primary.setAttribute('aria-label', `${song.access === 'full' ? 'Download' : 'Unlock'} ${currentName}`);
      art.setAttribute('aria-label', `${audio && !audio.paused ? 'Pause' : 'Play'} ${currentName}`);
    };
    editor.addEventListener('blur', finish);
    editor.addEventListener('keydown', event => {
      if (event.key === 'Enter') { event.preventDefault(); finish(); }
      if (event.key === 'Escape') { event.preventDefault(); cancelled = true; finish(); }
    });
    editor.focus();
    editor.select();
  }
  menu.append(
    menuItem('Change title', 'pencil', changeTitle),
    menuItem('Download PDF certificate', song.access === 'full' ? 'download' : 'certificate-lock', () => song.access === 'full' ? onCertificate(currentName) : onLocked()),
    menuItem('Delete track', 'trash', () => {
      if (!window.confirm(`Delete ${currentName}?`)) return;
      audio?.pause();
      row.remove();
    }),
  );
  more.addEventListener('click', () => {
    const willOpen = menu.hidden;
    document.querySelectorAll('.song-library-row__menu:not([hidden])').forEach(other => {
      other.hidden = true;
      other.parentElement?.querySelector('[aria-expanded]')?.setAttribute('aria-expanded', 'false');
    });
    menu.hidden = !willOpen;
    more.setAttribute('aria-expanded', String(willOpen));
  });
  more.setAttribute('aria-expanded', 'false');
  document.addEventListener('click', event => { if (!actions.contains(event.target)) closeMenu(); });
  actions.addEventListener('keydown', event => { if (event.key === 'Escape' && !menu.hidden) { closeMenu(); more.focus(); } });
  const primary = document.createElement('button');
  primary.type = 'button';
  primary.className = `song-library-row__icon-button song-library-row__icon-button--${song.access}`;
  primary.setAttribute('aria-label', song.access === 'full' ? `Download ${currentName}` : `Unlock ${currentName}`);
  primary.append(icon(song.access === 'full' ? 'download' : 'lock'));
  primary.addEventListener('click', () => song.access === 'full' ? onUnavailable(currentName) : onLocked());
  actions.append(more, primary, menu);

  let audio;
  if (song.audio) {
    audio = document.createElement('audio');
    audio.src = song.audio;
    audio.preload = 'none';
    audio.addEventListener('play', () => { pauseOthers(audio); art.classList.add('is-playing'); art.setAttribute('aria-label', `Pause ${currentName}`); });
    audio.addEventListener('pause', () => { art.classList.remove('is-playing'); art.setAttribute('aria-label', `Play ${currentName}`); });
    audio.addEventListener('timeupdate', () => { if (audio.currentTime >= 10) audio.pause(); });
    art.addEventListener('click', () => audio.paused ? (audio.currentTime >= 10 && (audio.currentTime = 0), audio.play().catch(() => onPreview(currentName))) : audio.pause());
  } else art.addEventListener('click', () => onUnavailable(currentName));

  row.append(file, size, updated, duration, access, actions);
  if (audio) row.append(audio);
  return { element: row, audio };
}
