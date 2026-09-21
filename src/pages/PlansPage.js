import { Header } from '../components/Header.js?v=signed-in-1';
import { Button } from '../components/Button.js';
import { PlanCard } from '../components/PlanCard.js?v=plans-2';
import { plans } from '../data/plans.js';

/** Pricing selection screen from FORMA 130:1659; checkout remains a prototype. */
export function PlansPage(actions) {
  const main = document.createElement('main');
  main.id = 'content';
  main.className = 'plans-page';
  const header = document.createElement('div');
  header.className = 'plans-header';
  header.append(Header(actions));

  const content = document.createElement('section');
  content.className = 'plans-content';
  content.setAttribute('aria-labelledby', 'plans-title');
  const title = document.createElement('h1');
  title.id = 'plans-title';
  title.textContent = 'Choose a plan to download your file';

  const grid = document.createElement('fieldset');
  grid.className = 'plans-grid';
  grid.innerHTML = '<legend class="sr-only">Choose a plan</legend>';
  const cards = plans.map(plan => PlanCard(plan, plan.id === 'full'));
  cards.forEach(card => {
    card.input.addEventListener('change', () => cards.forEach(candidate => candidate.setSelected(candidate === card)));
    grid.append(card.element);
  });

  const legal = document.createElement('div');
  legal.className = 'plans-legal';
  legal.innerHTML = `
    <p>You will be charged $299.00 (tax incl.) upon purchase and automatically billed annually unless you cancel at least 24 hours before the end of the current billing period.</p>
    <p>To access your first document for free please click <button type="button" data-preview="Account">here</button>.</p>
    <p>See our <button type="button" data-preview="Subscription terms">Subscription terms</button> for details on cancellation and refunds. We provide refunds in accordance with our <button type="button" data-preview="Refund Policy">Refund Policy</button>.</p>
  `;
  legal.querySelectorAll('[data-preview]').forEach(link => link.addEventListener('click', () => actions.onPreview(link.dataset.preview)));

  const controls = document.createElement('div');
  controls.className = 'plans-actions';
  controls.append(
    Button({ label: 'Back to files', variant: 'secondary', onClick: actions.onBackToResults }),
    Button({ label: 'Continue', variant: 'generate', onClick: () => actions.onContinuePlan(plans.find(plan => plan.id === grid.querySelector('input:checked')?.value)) }),
  );
  content.append(title, grid, legal, controls);
  main.append(header, content);
  return main;
}
