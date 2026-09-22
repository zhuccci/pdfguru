import { Header } from '../components/Header.js?v=my-files-1';
import { Button } from '../components/Button.js';
import { PlanCard } from '../components/PlanCard.js?v=plans-2';
import { plans } from '../data/plans.js?v=plan-terms-2';

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
  cards.forEach(card => grid.append(card.element));

  const legal = document.createElement('div');
  legal.className = 'plans-legal';
  legal.innerHTML = `
    <p class="plans-legal__charge"></p>
    <p>To access your first document for free please click <a href="https://pdfguru.com/app/account" target="_blank" rel="noopener noreferrer">here</a>.</p>
    <p>See our <a href="https://pdfguru.com/subscription-terms" target="_blank" rel="noopener noreferrer">Subscription terms</a> for details on cancellation and refunds. We provide refunds in accordance with our <a href="https://pdfguru.com/refund-policy" target="_blank" rel="noopener noreferrer">Refund Policy</a>.</p>
  `;
  const charge = legal.querySelector('.plans-legal__charge');
  function selectPlan(card) {
    cards.forEach(candidate => candidate.setSelected(candidate === card));
    const plan = plans.find(candidate => candidate.id === card.input.value);
    charge.textContent = plan.postTrialMonthly
      ? `After 7 days, you will be charged ${plan.postTrialMonthly} (tax incl.)/month unless you cancel 24 hours before the trial ends.`
      : 'You will be charged $299.00 (tax incl.) upon purchase and automatically billed annually unless you cancel at least 24 hours before the end of the current billing period.';
  }
  cards.forEach(card => card.input.addEventListener('change', () => selectPlan(card)));
  selectPlan(cards[1]);

  const controls = document.createElement('div');
  controls.className = 'plans-actions';
  controls.append(
    Button({ label: 'Back to files', variant: 'secondary', onClick: actions.onBackToFiles }),
    Button({ label: 'Continue', variant: 'generate', onClick: () => actions.onContinuePlan(plans.find(plan => plan.id === grid.querySelector('input:checked')?.value)) }),
  );
  content.append(title, grid, controls, legal);
  main.append(header, content);
  return main;
}
