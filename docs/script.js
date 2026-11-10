'use strict';
// Update available: true when the corresponding PDF is uploaded to repository root.
const lectures = [
  {id:1, title:'Foundations of Particle Physics', description:'Relativistic kinematics, particles and interactions, Mandelstam variables.', module:'foundations', available:true},
  {id:2, title:'The S-Matrix and Scattering', description:'Transition amplitudes, cross sections, phase space and QED.', module:'foundations', available:true},
  {id:3, title:'Electron–Proton Scattering', description:'Scattering of spin-½ particles, form factors and parity.', module:'foundations', available:true},
  {id:4, title:'Discrete Symmetries', description:'Parity, charge conjugation, time reversal and CPT.', module:'foundations', available:true},
  {id:5, title:'Lie Groups and SU(2)', description:'Lie algebras, generators, representation theory and angular momentum.', module:'hadrons', available:true},
  {id:6, title:'SU(3) and Young Tableaux', description:'Flavor symmetry, SU(3) representations and tensor products.', module:'hadrons', available:true},
  {id:7, title:'Hadron Multiplets', description:'SU(3) decompositions, isospin and baryon wave functions.', module:'hadrons', available:false},
  {id:8, title:'Color, Quarks and DIS', description:'The color quantum number, magnetic moments and deep inelastic scattering.', module:'hadrons', available:false},
  {id:9, title:'Gauge Theory and QCD', description:'Noether’s theorem, Yang–Mills fields, gauge invariance and QCD.', module:'standard', available:false},
  {id:10, title:'Weak Interactions and Goldstone’s Theorem', description:'Fermi theory, V–A currents, Goldstone’s theorem and electroweak symmetry.', module:'standard', available:false},
  {id:11, title:'The Higgs Mechanism', description:'Massive spin-1 fields, Abelian and non-Abelian symmetry breaking.', module:'standard', available:false},
  {id:12, title:'The Electroweak Standard Model', description:'SU(2) × U(1), W and Z masses, neutral currents and Higgs couplings.', module:'standard', available:false},
  {id:13, title:'Flavor Mixing and the CKM Matrix', description:'Cabibbo angle, the GIM mechanism, mass matrices and CP violation.', module:'flavor', available:false},
  {id:14, title:'Neutrino Masses and Oscillations', description:'Dirac and Majorana neutrinos, seesaw, double-beta decay and oscillations.', module:'flavor', available:false},
];
const moduleNames = {foundations:'Foundations', hadrons:'Quarks & hadrons', standard:'Standard Model', flavor:'Flavor & neutrinos'};
const grid = document.getElementById('cards');
const search = document.getElementById('search');
const count = document.getElementById('result-count');
const noResults = document.getElementById('no-results');
const buttons = Array.from(document.querySelectorAll('[data-filter]'));
let filter = 'all';
function render() {
  const term = search.value.trim().toLocaleLowerCase();
  const matched = lectures.filter(l => (filter === 'all' || l.module === filter) &&
    [l.title, l.description, moduleNames[l.module], String(l.id)].join(' ').toLocaleLowerCase().includes(term));
  grid.replaceChildren();
  count.textContent = matched.length;
  noResults.hidden = matched.length > 0;
  for (const lecture of matched) {
    const card = document.createElement('article'); card.className = 'card';
    const number = String(lecture.id).padStart(2,'0');
    card.innerHTML = '<div class="card-header"><span class="number"></span><span class="status"></span></div><h3></h3><p></p><div class="card-footer"><span class="module"></span></div>';
    card.querySelector('.number').textContent = 'LECTURE ' + number;
    card.querySelector('.status').textContent = lecture.available ? 'PDF available' : 'Coming soon';
    if (lecture.available) card.querySelector('.status').classList.add('published');
    card.querySelector('h3').textContent = lecture.title;
    card.querySelector('p').textContent = lecture.description;
    card.querySelector('.module').textContent = moduleNames[lecture.module];
    const footer = card.querySelector('.card-footer');
    if (lecture.available) {
      const link = document.createElement('a'); link.href = 'https://github.com/kgraczyk/TEP-lecture/blob/main/lec' + number + '.pdf';
      link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = 'View PDF ↗';
      link.setAttribute('aria-label', `View PDF of lecture ${lecture.id}: ${lecture.title}`);
      footer.append(link);
    } else {
      const msg = document.createElement('span'); msg.className = 'unpublished';
      msg.textContent = 'Not yet uploaded'; footer.append(msg);
    }
    grid.append(card);
  }
}
buttons.forEach(button => button.addEventListener('click', () => {
  filter = button.dataset.filter;
  buttons.forEach(b => { b.classList.toggle('selected', b === button); b.setAttribute('aria-pressed', String(b === button)); });
  render();
}));
search.addEventListener('input', render);
document.getElementById('year').textContent = new Date().getFullYear();
const themeToggle = document.getElementById('theme-toggle');
let theme = 'dark';
try { theme = localStorage.getItem('tep-theme') || 'dark'; } catch (_) {}
function setTheme() {
  document.documentElement.classList.toggle('light', theme === 'light');
  themeToggle.textContent = theme === 'light' ? '☾' : '☀';
  themeToggle.setAttribute('aria-label', 'Switch to ' + (theme === 'light' ? 'dark' : 'light') + ' mode');
}
themeToggle.addEventListener('click', () => {
  theme = theme === 'dark' ? 'light' : 'dark'; setTheme();
  try { localStorage.setItem('tep-theme', theme); } catch (_) {}
});
setTheme(); render();
