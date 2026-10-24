/* ---------- Theme toggle ---------- */
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const htmlElement = document.documentElement;

function applyTheme(isDark) {
  htmlElement.classList.toggle('dark', isDark);
  themeIcon.classList.toggle('fa-sun', isDark);
  themeIcon.classList.toggle('fa-moon', !isDark);
  try { localStorage.setItem('ms_portfolio_theme', isDark ? 'dark' : 'light'); } catch (e) {}
}
let savedTheme = null;
try { savedTheme = localStorage.getItem('ms_portfolio_theme'); } catch (e) {}
applyTheme(savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches));
themeToggleBtn.addEventListener('click', () => applyTheme(!htmlElement.classList.contains('dark')));

/* ---------- Typewriter ---------- */
const textArray = ["Flutter Developer", "Mobile App Engineer", "UI/UX Designer (Figma)", "Firebase & AI Integrator"];
let textIndex = 0, charIndex = 0, isDeleting = false;
const typewriterElement = document.getElementById('typewriter-text');

function type() {
  const currentText = textArray[textIndex];
  charIndex += isDeleting ? -1 : 1;
  typewriterElement.textContent = currentText.substring(0, charIndex);
  let speed = isDeleting ? 50 : 100;
  if (!isDeleting && charIndex === currentText.length) { speed = 1800; isDeleting = true; }
  else if (isDeleting && charIndex === 0) { isDeleting = false; textIndex = (textIndex + 1) % textArray.length; speed = 400; }
  setTimeout(type, speed);
}
document.addEventListener('DOMContentLoaded', () => { if (typewriterElement) setTimeout(type, 800); });

/* ---------- Project filter ---------- */
const ACTIVE = "project-filter-btn px-5 py-2 rounded-full text-xs font-bold tracking-wide uppercase transition-all bg-gradient-to-r from-brand-navy to-brand-cyan text-white shadow-md";
const INACTIVE = "project-filter-btn px-5 py-2 rounded-full text-xs font-bold tracking-wide uppercase transition-all glass-panel text-slate-700 dark:text-slate-300 hover:text-brand-blue";
const filterButtons = document.querySelectorAll('.project-filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => btn.addEventListener('click', () => {
  filterButtons.forEach(b => b.className = INACTIVE);
  btn.className = ACTIVE;
  const filter = btn.dataset.filter;
  projectCards.forEach(card => {
    const show = filter === 'all' || card.dataset.category.split(',').includes(filter);
    card.style.display = show ? 'flex' : 'none';
  });
}));

/* ---------- Project modal ---------- */
const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-description');
const modalImg = document.getElementById('modal-image');
const modalTech = document.getElementById('modal-tech');

function openModal(title, description, imageSrc, techList) {
  modalTitle.textContent = title;
  modalDesc.textContent = description;
  modalImg.src = imageSrc;
  modalTech.innerHTML = '';
  techList.split(',').forEach(item => {
    const badge = document.createElement('span');
    badge.className = 'text-xs font-semibold px-3 py-1 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-800 dark:text-slate-200';
    badge.textContent = item.trim();
    modalTech.appendChild(badge);
  });
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  modal.classList.add('hidden');
  document.body.style.overflow = 'auto';
}
document.querySelectorAll('.case-study-btn').forEach(btn => btn.addEventListener('click', () =>
  openModal(btn.dataset.title, btn.dataset.desc, btn.dataset.img, btn.dataset.tech)));
document.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', closeModal));
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal(); });

/* ---------- Mobile menu ---------- */
const mobileMenu = document.getElementById('mobile-menu');
document.getElementById('mobile-menu-btn').addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  mobileMenu.classList.toggle('flex');
});
document.querySelectorAll('.mobile-nav-link').forEach(link => link.addEventListener('click', () => {
  mobileMenu.classList.add('hidden');
  mobileMenu.classList.remove('flex');
}));

/* ---------- Contact form: email (FormSubmit) + WhatsApp ---------- */
const CONTACT_EMAIL = 'shezikhan2014pk@gmail.com';
const WHATSAPP_NUMBER = '923238999808'; // international format, no + or leading 0
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/' + CONTACT_EMAIL;

document.getElementById('portfolio-contact-form').addEventListener('submit', async e => {
  e.preventDefault();
  const form = e.target;
  const btn = document.getElementById('form-submit-btn');
  const feedback = document.getElementById('form-feedback');
  const feedbackText = document.getElementById('form-feedback-text');
  const originalBtn = btn.innerHTML;

  if (!form.reportValidity()) return;
  if (form.elements['_honey'].value) return; // bot

  const name = form.elements['name'].value.trim();
  const email = form.elements['email'].value.trim();
  const projectType = form.elements['project_type'].selectedOptions[0].textContent.replace(/\s+/g, ' ').trim();
  const message = form.elements['message'].value.trim();

  // Open the WhatsApp tab right now (inside the click) so popup blockers allow it
  const waText =
    'New Project Inquiry (Portfolio)\n\n' +
    'Name: ' + name + '\n' +
    'Email: ' + email + '\n' +
    'Project Type: ' + projectType + '\n\n' +
    'Details:\n' + message;
  const waUrl = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(waText);
  const waWindow = window.open('', '_blank');

  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner animate-spin"></i><span>Sending...</span>';
  feedback.classList.add('hidden');

  let emailOk = false;
  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        name, email,
        project_type: projectType,
        message,
        _subject: 'New Portfolio Inquiry from ' + name,
        _replyto: email,
        _template: 'table',
        _captcha: 'false'
      })
    });
    const data = await res.json().catch(() => ({}));
    emailOk = res.ok && String(data.success) !== 'false';
  } catch (err) { emailOk = false; }

  if (waWindow) waWindow.location.href = waUrl;

  feedback.classList.remove('hidden');
  feedback.classList.toggle('text-emerald-600', emailOk);
  feedback.classList.toggle('dark:text-emerald-400', emailOk);
  feedback.classList.toggle('text-red-600', !emailOk);
  feedback.classList.toggle('dark:text-red-400', !emailOk);
  feedbackText.textContent = emailOk
    ? 'Thank you! Your inquiry was emailed to Muhammad. Please also tap Send in the WhatsApp window that opened.'
    : 'Email could not be sent right now. Please tap Send in the WhatsApp window, or write to ' + CONTACT_EMAIL + ' directly.';

  btn.disabled = false;
  btn.innerHTML = emailOk
    ? '<i class="fa-solid fa-check"></i><span>Inquiry Sent!</span>'
    : originalBtn;
  if (emailOk) {
    form.reset();
    setTimeout(() => { btn.innerHTML = originalBtn; }, 4000);
  }
});
