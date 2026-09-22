import { Header } from '../components/Header.js?v=my-files-1';
import { Button } from '../components/Button.js';
import { planFeatures, plans } from '../data/plans.js?v=full-access-1';

/** FORMA 137:813. The checkout controls are visual prototype actions. */
export function PaymentPage(actions) {
  const selectedId = sessionStorage.getItem('pdfguru:selected-plan');
  const plan = plans.find(candidate => candidate.id === selectedId) ?? plans[0];
  const priceWhole = plan.id === 'annual' ? '$299.' : plan.whole;
  const priceFraction = plan.id === 'annual' ? '00' : plan.fraction;

  const main = document.createElement('main');
  main.id = 'content';
  main.className = 'payment-page';

  const header = document.createElement('div');
  header.className = 'payment-header';
  header.append(Header(actions));

  const content = document.createElement('section');
  content.className = 'payment-content';
  content.setAttribute('aria-labelledby', 'payment-title');
  const title = document.createElement('h1');
  title.id = 'payment-title';
  title.textContent = 'Payment details';

  const columns = document.createElement('div');
  columns.className = 'payment-columns';
  const paymentCard = document.createElement('section');
  paymentCard.className = 'payment-card';
  paymentCard.setAttribute('aria-label', 'Payment options');
  const paymentHeading = document.createElement('h2');
  paymentHeading.textContent = 'Total due today:';
  const amount = document.createElement('strong');
  amount.className = 'payment-card__amount';
  amount.innerHTML = `${priceWhole}<span>${priceFraction}</span>`;
  const tax = document.createElement('p');
  tax.className = 'payment-card__tax';
  tax.textContent = 'Taxes calculated at checkout';
  const expressHeading = document.createElement('h3');
  expressHeading.textContent = 'Express checkout';

  const methods = document.createElement('div');
  methods.className = 'payment-methods';
  for (const method of [
    { label: 'Google Pay', icon: './assets/icons/google-pay-g.png', text: 'Pay' },
    { label: 'Apple Pay', icon: './assets/icons/apple-pay.svg', text: 'Pay' },
    { label: 'Pay with card', text: 'Pay with card' },
  ]) {
    const button = Button({ label: method.text, className: 'payment-method', onClick: () => actions.onMockPayment(method.label) });
    button.setAttribute('aria-label', method.label);
    if (method.icon) {
      const icon = document.createElement('img');
      icon.src = method.icon;
      icon.alt = '';
      button.prepend(icon);
    }
    methods.append(button);
  }

  const legal = document.createElement('p');
  legal.className = 'payment-card__legal';
  const billing = plan.postTrialMonthly
    ? `if you don't cancel at least 24 hours prior to the end of the 7-day trial, you will automatically be charged ${plan.postTrialMonthly} (tax incl.) every month until you cancel in settings.`
    : 'you will be charged $299.00 (tax incl.) upon purchase and automatically billed annually unless you cancel at least 24 hours before the end of the current billing period.';
  legal.innerHTML = `By continuing, you agree that, as described in our <a href="https://pdfguru.com/terms" target="_blank" rel="noopener noreferrer">Terms and Conditions</a> and <a href="https://pdfguru.com/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>, ${billing} <a href="https://pdfguru.com/subscription-terms" target="_blank" rel="noopener noreferrer">Subscription Policy</a> and <a href="https://pdfguru.com/refund-policy" target="_blank" rel="noopener noreferrer">Refund Policy</a>. For customer support, please call us at <a href="tel:+18667166045">+1 (866) 716-6045</a> or e-mail <a href="mailto:support@pdfguru.com">support@pdfguru.com</a>. To access your first document for free please click <a href="https://pdfguru.com/app/account" target="_blank" rel="noopener noreferrer">here</a>.`;
  paymentCard.append(paymentHeading, amount, tax, expressHeading, methods, legal);

  const summary = document.createElement('div');
  summary.className = 'payment-summary';
  const features = document.createElement('section');
  features.className = 'payment-summary__features';
  const planHeading = document.createElement('h2');
  planHeading.textContent = plan.title;
  const list = document.createElement('ul');
  for (const label of planFeatures.slice(0, plan.available)) {
    const item = document.createElement('li');
    const icon = document.createElement('img');
    icon.src = './assets/icons/plan-check.svg';
    icon.alt = '';
    const text = document.createElement('span');
    text.textContent = label;
    item.append(icon, text);
    list.append(item);
  }
  features.append(planHeading, list);
  const total = document.createElement('div');
  total.className = 'payment-summary__total';
  total.innerHTML = `<span>Total due today:</span><strong>${priceWhole}<small>${priceFraction}</small></strong>`;
  const controls = document.createElement('div');
  controls.className = 'payment-actions';
  controls.append(
    Button({ label: 'Back to plans', variant: 'secondary', onClick: actions.onBackToPlans }),
    Button({ label: 'Pay and download my song', variant: 'generate', onClick: () => actions.onMockPayment('Pay and download my song') }),
  );
  summary.append(features, total, controls);
  columns.append(paymentCard, summary);
  content.append(title, columns);
  main.append(header, content);
  return main;
}
