import { planFeatures } from '../data/plans.js';

/** A native radio option styled as the Figma 130:1659 pricing card. */
export function PlanCard(plan, selected = false) {
  const card = document.createElement('label');
  card.className = `plan-card${plan.popular ? ' plan-card--popular' : ''}${selected ? ' is-selected' : ''}`;
  const input = document.createElement('input');
  input.className = 'plan-card__input';
  input.type = 'radio';
  input.name = 'download-plan';
  input.value = plan.id;
  input.checked = selected;
  input.setAttribute('aria-label', `${plan.title}, ${plan.whole}${plan.fraction}${plan.period ? ' ' + plan.period : ''}`);
  card.append(input);

  if (plan.popular) {
    const badge = document.createElement('span');
    badge.className = 'plan-card__badge';
    badge.innerHTML = '<img src="./assets/icons/plan-popular.svg" width="15" height="16" alt="">Most popular';
    card.append(badge);
  }

  const content = document.createElement('div');
  content.className = 'plan-card__content';
  const title = document.createElement('h2');
  title.className = 'plan-card__title';
  title.textContent = plan.title;
  const price = document.createElement('div');
  price.className = 'plan-card__price';
  price.innerHTML = `<strong>${plan.whole}<span>${plan.fraction}</span></strong>${plan.period ? `<small>${plan.period}</small>` : ''}`;
  const tax = document.createElement('p');
  tax.className = 'plan-card__tax';
  tax.textContent = 'Taxes calculated at checkout';
  const features = document.createElement('ul');
  features.className = 'plan-card__features';
  for (const [index, feature] of planFeatures.entries()) {
    const available = index < plan.available;
    const item = document.createElement('li');
    item.className = available ? '' : 'is-unavailable';
    if (plan.id === 'annual' && index >= 5) item.classList.add('is-muted');
    const icon = document.createElement('img');
    icon.src = `./assets/icons/plan-${available ? 'check' : 'unavailable'}.svg`;
    icon.alt = '';
    icon.width = 24;
    icon.height = 24;
    item.append(icon, document.createTextNode(feature));
    features.append(item);
  }
  content.append(title, price, tax, features);
  card.append(content);
  return { element: card, input, setSelected(value) { card.classList.toggle('is-selected', value); } };
}
