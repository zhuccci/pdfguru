const barHeights = [24,17,18,14,20,34,40,38,38,24,32,17,13,35,18,20,22,37,26,29,28,18,31,28,21,15,32,17,37,36,17,32,38,32,20,12,22,14,21,31,39,16,34,25,36,12,19,37,17,30,15,12,13,17,34];

/** Figma 105:781. A semantic progress display, composed of the source waveform bars. */
export function WaveformProgress() {
  const root = document.createElement('div');
  root.className = 'waveform-progress';
  root.setAttribute('role', 'progressbar');
  root.setAttribute('aria-label', 'Composing tracks');
  root.setAttribute('aria-valuemin', '0');
  root.setAttribute('aria-valuemax', '100');
  const bars = barHeights.map(height => {
    const bar = document.createElement('span');
    bar.className = 'waveform-bar';
    bar.style.height = `${height}px`;
    bar.setAttribute('aria-hidden', 'true');
    root.append(bar);
    return bar;
  });
  function setProgress(percent) {
    const count = Math.round(bars.length * percent / 100);
    bars.forEach((bar, index) => bar.classList.toggle('is-filled', index < count));
    root.setAttribute('aria-valuenow', String(Math.round(percent)));
  }
  setProgress(36);
  return { element: root, setProgress };
}
