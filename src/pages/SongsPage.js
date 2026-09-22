import { songs } from '../data/songs.js';
import { SongLibraryRow } from '../components/SongLibraryRow.js?v=songs-2';

/** My Songs file view from FORMA 128:551. */
export function SongsPage(actions) {
  const main = document.createElement('main');
  main.id = 'content';
  main.className = 'songs-page';

  const sidebar = document.createElement('aside');
  sidebar.className = 'songs-sidebar';
  sidebar.innerHTML = '<a class="songs-sidebar__brand" href="./index.html" aria-label="PDF Guru home"><span class="brand-mask"><img src="./assets/3c567.svg" alt="PDF Guru"></span></a><nav class="songs-sidebar__nav" aria-label="File navigation"></nav>';
  const nav = sidebar.querySelector('nav');
  for (const [label, iconName, current] of [['My songs', 'nav-audio', true], ['All files', 'file', false], ['Tools', 'file', false]]) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `songs-sidebar__tab${current ? ' is-current' : ''}`;
    button.innerHTML = `<img src="./assets/icons/library-${iconName}.svg" alt="" width="24" height="24" aria-hidden="true"><span>${label}</span>`;
    if (current) button.setAttribute('aria-current', 'page');
    else button.addEventListener('click', () => actions.onPreview(label));
    nav.append(button);
  }

  const panel = document.createElement('section');
  panel.className = 'songs-panel';
  panel.setAttribute('aria-labelledby', 'songs-title');
  panel.innerHTML = '<h1 id="songs-title">My Songs</h1><div class="songs-table" role="table" aria-label="My songs"><div class="songs-table__head" role="row"><span role="columnheader">Name</span><span role="columnheader">Size</span><span role="columnheader">Updated</span><span role="columnheader">Access</span><span class="sr-only" role="columnheader">Actions</span></div><div class="songs-table__body" role="rowgroup"></div></div>';
  const rows = [];
  for (const song of songs) {
    const row = SongLibraryRow(song, {
      onPreview: actions.onPreview,
      onLocked: () => { window.location.href = './plans.html'; },
      onUnavailable: title => actions.onPreview(`${title} download`),
      pauseOthers: active => rows.forEach(candidate => { if (candidate.audio && candidate.audio !== active) candidate.audio.pause(); }),
    });
    rows.push(row);
    panel.querySelector('.songs-table__body').append(row.element);
  }
  main.append(sidebar, panel);
  return main;
}
