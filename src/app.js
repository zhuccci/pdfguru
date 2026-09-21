import { HomePage } from './pages/HomePage.js';
import { MusicPage } from './pages/MusicPage.js?v=motion-2';
import { TrackResultsPage } from './pages/TrackResultsPage.js?v=tracks-1';
import { Footer } from './components/Footer.js';
import { Dialog } from './components/Dialog.js';

const app = document.querySelector('#app');
const dialog = Dialog();
const actions = {
  onPreview: label => dialog.show(label, 'This destination is not connected in the prototype yet.'),
  onLogin: () => dialog.show('Log in', 'This is a visual prototype. Sign-in is not connected and no credentials are collected.'),
  onGenerate: settings => {
    try { sessionStorage.setItem('pdfguru:track-prompt', settings.prompt); } catch {}
    window.location.href = './results.html';
  },
  onLyricsGenerate: () => dialog.show('Lyrics generation preview', 'Lyrics generation is not connected yet. You can write your own lyrics in the field.'),
};
const page = document.body.dataset.page === 'results' ? TrackResultsPage(actions) : document.body.dataset.page === 'music' ? MusicPage(actions) : HomePage(actions);
app.replaceChildren(page, Footer(actions), dialog.element);
