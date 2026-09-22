import { HomePage } from './pages/HomePage.js?v=my-files-1';
import { MusicPage } from './pages/MusicPage.js?v=my-files-1';
import { TrackResultsPage } from './pages/TrackResultsPage.js?v=my-files-1';
import { PlansPage } from './pages/PlansPage.js?v=license-1';
import { SongsPage } from './pages/SongsPage.js?v=tools-icon-1';
import { Footer } from './components/Footer.js';
import { Dialog } from './components/Dialog.js';
import { UnlockDialog } from './components/UnlockDialog.js?v=light-area-1';

const app = document.querySelector('#app');
const dialog = Dialog();
const unlockDialog = UnlockDialog({ onMockLogin: () => {
  sessionStorage.setItem('pdfguru:mock-signed-in', 'true');
  actions.isSignedIn = true;
  window.dispatchEvent(new Event('pdfguru:mock-login'));
} });
const actions = {
  isSignedIn: sessionStorage.getItem('pdfguru:mock-signed-in') === 'true',
  onPreview: label => dialog.show(label, 'This destination is not connected in the prototype yet.'),
  onLogin: () => document.body.dataset.page === 'results' ? unlockDialog.show() : dialog.show('Log in', 'This is a visual prototype. Sign-in is not connected and no credentials are collected.'),
  onLogout: () => {
    sessionStorage.removeItem('pdfguru:mock-signed-in');
    actions.isSignedIn = false;
    window.dispatchEvent(new Event('pdfguru:mock-logout'));
  },
  onGenerate: () => { window.location.href = './results.html?rev=motion-4'; },
  onUnlock: () => unlockDialog.show(),
  onDownload: () => { window.location.href = './plans.html'; },
  onBackToResults: () => { window.location.href = './results.html?ready=1'; },
  onBackToFiles: () => { window.location.href = './songs.html'; },
  onMyFiles: () => { window.location.href = './songs.html'; },
  onContinuePlan: plan => dialog.show('Continue', `Checkout for ${plan.title} is not connected in this prototype.`),
  onCreateAnotherTrack: () => { window.location.href = './music.html'; },
};
const page = document.body.dataset.page === 'results' ? TrackResultsPage(actions) : document.body.dataset.page === 'music' ? MusicPage(actions) : document.body.dataset.page === 'plans' ? PlansPage(actions) : document.body.dataset.page === 'songs' ? SongsPage(actions) : HomePage(actions);
app.replaceChildren(page, ...(document.body.dataset.page === 'songs' ? [] : [Footer(actions)]), dialog.element, unlockDialog.element);
