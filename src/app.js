import { HomePage } from './pages/HomePage.js?v=music-module-1';
import { MusicPage } from './pages/MusicPage.js?v=music-module-1';
import { TrackResultsPage } from './pages/TrackResultsPage.js?v=my-files-1';
import { PlansPage } from './pages/PlansPage.js?v=regular-license-1';
import { SongsPage } from './pages/SongsPage.js?v=duration-1';
import { PaymentPage } from './pages/PaymentPage.js?v=regular-license-1';
import { PaymentSuccessPage } from './pages/PaymentSuccessPage.js?v=certificate-1';
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
  onContinuePlan: plan => {
    sessionStorage.setItem('pdfguru:selected-plan', plan.id);
    window.location.href = './payment.html';
  },
  onBackToPlans: () => { window.location.href = './plans.html'; },
  onMockPayment: () => { window.location.href = './success.html'; },
  onMockDownload: () => dialog.show('Prototype download', 'Full song files are not connected in this prototype. The supplied preview tracks remain available in My files.'),
  onCreateAnotherTrack: () => { window.location.href = './music.html'; },
};
const page = document.body.dataset.page === 'results' ? TrackResultsPage(actions) : document.body.dataset.page === 'music' ? MusicPage(actions) : document.body.dataset.page === 'plans' ? PlansPage(actions) : document.body.dataset.page === 'payment' ? PaymentPage(actions) : document.body.dataset.page === 'payment-success' ? PaymentSuccessPage(actions) : document.body.dataset.page === 'songs' ? SongsPage(actions) : HomePage(actions);
app.replaceChildren(page, ...(['songs', 'payment', 'payment-success'].includes(document.body.dataset.page) ? [] : [Footer(actions)]), dialog.element, unlockDialog.element);
