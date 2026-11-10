'use strict';

// When you upload lec07.pdf etc., change the corresponding available to true.
const lectures = [
  { id: 1, title: 'Foundations of Particle Physics', description: 'Relativistic kinematics, particles and interactions, Mandelstam variables.', module: 'foundations', available: true },
  { id: 2, title: 'The S-Matrix and Scattering', description: 'Transition amplitudes, cross sections, phase space and QED.', module: 'foundations', available: true },
  { id: 3, title: 'Electron–Proton Scattering', description: 'Scattering of spin-½ particles, form factors and parity.', module: 'foundations', available: true },
  { id: 4, title: 'Discrete Symmetries', description: 'Parity, charge conjugation, time reversal and CPT.', module: 'foundations', available: true },
  { id: 5, title: 'Lie Groups and SU(2)', description: 'Lie algebras, generators, representation theory and angular momentum.', module: 'hadrons', available: true },
  { id: 6, title: 'SU(3) and Young Tableaux', description: 'Flavor symmetry, SU(3) representations and tensor products.', module: 'hadrons', available: true },
  { id: 7, title: 'Hadron Multiplets', description: 'SU(3) decompositions, isospin and baryon wave functions.', module: 'hadrons', available: false },
  { id: 8, title: 'Color, Quarks and DIS', description: 'Color, magnetic moments and deep inelastic scattering.', module: 'hadrons', available: false },
  { id: 9, title: 'Gauge Theory and QCD', description: 'Noether’s theorem, Yang–Mills fields, gauge invariance and QCD.', module: 'standard', available: false },
  { id: 10, title: 'Weak Interactions and Goldstone’s Theorem', description: 'Fermi theory, V–A currents, Goldstone’s theorem and electroweak symmetry.', module: 'standard', available: false },
  { id: 11, title: 'The Higgs Mechanism', description: 'Massive spin-1 fields, Abelian and non-Abelian symmetry breaking.', module: 'standard', available: false },
  { id: 12, title: 'The Electroweak Standard Model', description: 'SU(2) × U(1), W and Z masses, neutral currents and Higgs couplings.', module: 'standard', available: false },
  { id: 13, title: 'Flavor Mixing and the CKM Matrix', description: 'Cabibbo angle, GIM mechanism, mass matrices and CP violation.', module: 'flavor', available: false },
  { id: 14, title: 'Neutrino Masses and Oscillations', description: 'Dirac and Majorana neutrinos, seesaw, double-beta decay and oscillations.', module: 'flavor', available: false }
];
const modules = [
  { key: 'foundations', title: 'I. Foundations and scattering' },
  { key: 'hadrons', title: 'II. Quarks and hadrons' },
  { key: 'standard', title: 'III. Gauge theories and the Standard Model' },
  { key: 'flavor', title: 'IV. Flavor and neutrinos' }
];
const list = document.getElementById('lecture-list');
const search = document.getElementById('lecture-search');
const buttons = Array.from(document.querySelectorAll('[data-filter]'));
let selectedFilter = 'all';

function render() {
  const query = search.value.trim().toLocaleLowerCase();
  list.replaceChildren();
  let total = 0;
  for (const module of modules) {
    if (selectedFilter !== 'all' && selectedFilter !== module.key) continue;
    const items = lectures.filter(l => l.module === module.key &&
      [l.title, l.description, String(l.id)].join(' ').toLocaleLowerCase().includes(query));
    if (!items.length) continue;
    total += items.length;
    const heading = document.createElement('h3');
    heading.className = 'module-heading';
    heading.textContent = module.title;
    list.append(heading);
    for (const item of items) {
      const row = document.createElement('article');
      row.className = 'lecture';
      const number = String(item.id).padStart(2, '0');
      const numberElement = document.createElement('span');
      numberElement.className = 'lecture-number';
      numberElement.textContent = number;
      const description = document.createElement('div');
      const title = document.createElement('h3');
      title.textContent = item.title;
      const details = document.createElement('p');
      details.textContent = item.description;
      description.append(title, details);
      row.append(numberElement, description);
      if (item.available) {
        const link = document.createElement('a');
        link.className = 'file-link';
        // Full GitHub URL avoids the GitHub Pages /docs relative-path issue.
        link.href = 'lec' + number + '.pdf';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = 'View PDF ↗';
        link.setAttribute('aria-label', 'View PDF: lecture ' + item.id);
        row.append(link);
      } else {
        const pending = document.createElement('span');
        pending.className = 'pending';
        pending.textContent = 'Not yet available';
        row.append(pending);
      }
      list.append(row);
    }
  }
  document.getElementById('no-results').hidden = total !== 0;
}

buttons.forEach(button => button.addEventListener('click', () => {
  selectedFilter = button.dataset.filter;
  buttons.forEach(b => {
    const chosen = b === button;
    b.classList.toggle('selected', chosen);
    b.setAttribute('aria-pressed', String(chosen));
  });
  render();
}));
search.addEventListener('input', render);
document.getElementById('available-count').textContent = lectures.filter(l => l.available).length;
document.getElementById('year').textContent = new Date().getFullYear();
render();
