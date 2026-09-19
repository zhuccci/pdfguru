export const MAX_FILE_SIZE = 100 * 1024 * 1024;
const allowed = new Set(['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'jpg', 'jpeg', 'png', 'webp', 'heic', 'txt']);
export function validateFile(file) {
  if (!file) return 'Choose a file to continue.';
  if (file.size > MAX_FILE_SIZE) return 'Your file exceeds 100 MB. Choose a smaller file.';
  if (!allowed.has(file.name.split('.').pop().toLowerCase())) return 'This file type is not supported. Choose a PDF, document, or image.';
  return '';
}
/** Local-only state: idle → dragging → selected or error → reset. */
export function UploadZone() {
  const root = document.createElement('div');
  root.className = 'upload-zone';
  root.innerHTML = `<div class="upload-border"><button type="button" class="upload-drop" aria-label="Choose a file to upload"><span class="upload-center"><span class="upload-plus" aria-hidden="true">+</span><strong>Upload or drag &amp; drop your file</strong></span><small>Size up to 100 MB</small></button></div><input type="file" hidden accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.webp,.heic,.txt"><div class="upload-feedback" role="status" hidden></div><p class="upload-error" role="alert" hidden></p>`;
  const button = root.querySelector('button'), input = root.querySelector('input');
  const status = root.querySelector('[role=status]'), error = root.querySelector('[role=alert]');
  function select(file) {
    const message = validateFile(file);
    error.textContent = message;
    error.hidden = !message;
    status.replaceChildren();
    status.hidden = !!message;
    if (message) return;
    const text = document.createElement('span');
    text.textContent = `${file.name} · ${(file.size / 1024 / 1024).toFixed(2)} MB selected. Prototype only — your file stays on this device.`;
    const reset = document.createElement('button');
    reset.type = 'button';
    reset.textContent = 'Remove file';
    reset.addEventListener('click', () => { input.value = ''; status.hidden = true; button.focus(); });
    status.append(text, reset);
  }
  button.addEventListener('click', () => { input.value = ''; input.click(); });
  input.addEventListener('change', () => { if (input.files[0]) select(input.files[0]); });
  let depth = 0;
  button.addEventListener('dragenter', event => { event.preventDefault(); depth++; button.classList.add('is-dragging'); });
  button.addEventListener('dragover', event => event.preventDefault());
  button.addEventListener('dragleave', () => { if (--depth <= 0) button.classList.remove('is-dragging'); });
  button.addEventListener('drop', event => { event.preventDefault(); depth = 0; button.classList.remove('is-dragging'); select(event.dataTransfer.files[0]); });
  return root;
}
