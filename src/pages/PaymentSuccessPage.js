import { Header } from '../components/Header.js?v=my-files-1';
import { Button } from '../components/Button.js';

/** FORMA 137:1086: prototype confirmation after any payment action. */
export function PaymentSuccessPage(actions) {
  const main = document.createElement('main');
  main.id = 'content';
  main.className = 'payment-success-page';
  const header = document.createElement('div');
  header.className = 'payment-success-header';
  header.append(Header(actions));

  const content = document.createElement('section');
  content.className = 'payment-success-content';
  content.setAttribute('aria-labelledby', 'payment-success-title');
  const card = document.createElement('div');
  card.className = 'payment-success-card';
  const artwork = document.createElement('img');
  artwork.className = 'payment-success-artwork';
  artwork.src = './assets/payment-success-illustration.png';
  artwork.alt = '';
  const title = document.createElement('h1');
  title.id = 'payment-success-title';
  title.textContent = 'Payment successful!';
  const message = document.createElement('p');
  message.className = 'payment-success-message';
  message.append('Your full songs are downloading now. ', document.createElement('br'), 'If the download doesn’t start, ');
  const retry = document.createElement('button');
  retry.type = 'button';
  retry.className = 'payment-success-retry';
  retry.textContent = 'click here';
  retry.addEventListener('click', actions.onMockDownload);
  message.append(retry, '.');

  const controls = document.createElement('div');
  controls.className = 'payment-success-actions';
  const files = Button({ label: 'Go to My files', variant: 'secondary', onClick: actions.onMyFiles });
  const another = Button({ label: 'Create another track', variant: 'generate', onClick: actions.onCreateAnotherTrack });
  const icon = document.createElement('img');
  icon.src = './assets/icons/audio.svg';
  icon.alt = '';
  icon.width = 24;
  icon.height = 24;
  another.prepend(icon);
  controls.append(files, another);
  card.append(artwork, title, message, controls);
  content.append(card);
  main.append(header, content);
  return main;
}
