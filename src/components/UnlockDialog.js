/** Figma 114:735. Visual-only login prompt for the music prototype. */
export function UnlockDialog({ onMockLogin }) {
  const dialog = document.createElement('dialog');
  dialog.className = 'unlock-dialog';
  dialog.setAttribute('aria-labelledby', 'unlock-dialog-title');
  dialog.innerHTML = `
    <div class="unlock-dialog__header">
      <h2 id="unlock-dialog-title">Log in to download your songs</h2>
      <button class="unlock-dialog__close" type="button" aria-label="Close dialog"><img src="./assets/icons/close.svg" alt=""></button>
    </div>
    <div class="unlock-dialog__options">
      <button class="unlock-dialog__google" type="button"><img src="./assets/icons/google-mark.png" width="24" height="24" alt="">Continue with Google</button>
      <div class="unlock-dialog__divider"><span>or</span></div>
      <label class="unlock-dialog__email-label" for="unlock-email">Email</label>
      <div class="unlock-dialog__email-field">
        <img src="./assets/icons/email.svg" alt="">
        <input id="unlock-email" type="email" autocomplete="off" placeholder="zhuk.deniz@gmail.com">
      </div>
    </div>
    <button class="unlock-dialog__submit" type="button">Log in with email</button>
    <p class="unlock-dialog__signup">Do not have an account yet? <button type="button">Sign Up</button></p>
    <p class="unlock-dialog__status" role="status" hidden>Sign-in is not connected in this prototype.</p>
  `;

  const status = dialog.querySelector('.unlock-dialog__status');
  const showPrototypeStatus = () => { status.hidden = false; };
  const finishMockLogin = () => { dialog.close(); onMockLogin(); };
  dialog.querySelector('.unlock-dialog__close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.unlock-dialog__google').addEventListener('click', finishMockLogin);
  dialog.querySelector('.unlock-dialog__submit').addEventListener('click', finishMockLogin);
  dialog.querySelector('.unlock-dialog__signup button').addEventListener('click', showPrototypeStatus);
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });

  // Center the modal in the visible light area above the footer.
  function positionDialog() {
    if (!dialog.open) return;
    const footerTop = document.querySelector('.site-footer')?.getBoundingClientRect().top ?? window.innerHeight;
    const lightAreaBottom = Math.min(window.innerHeight, Math.max(0, footerTop));
    const dialogHeight = dialog.getBoundingClientRect().height;
    const halfHeight = dialogHeight / 2;
    const center = Math.max(halfHeight + 16, Math.min(lightAreaBottom / 2, window.innerHeight - halfHeight - 16));
    dialog.style.setProperty('--unlock-dialog-center-y', `${center}px`);
  }
  dialog.addEventListener('close', () => {
    window.removeEventListener('resize', positionDialog);
    window.removeEventListener('scroll', positionDialog);
  });

  return {
    element: dialog,
    show() {
      status.hidden = true;
      dialog.showModal();
      positionDialog();
      window.addEventListener('resize', positionDialog);
      window.addEventListener('scroll', positionDialog);
    },
  };
}
