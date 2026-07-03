// ==========================================================================
// THEME TOGGLE (light / dark, persisted)
// ==========================================================================
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const next = current === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ==========================================================================
// NAV: scrolled state + active link highlighting
// ==========================================================================
const siteNav = document.getElementById('siteNav');
const navLinks = document.querySelectorAll('[data-nav]');
const sections = document.querySelectorAll('section[id]');

function onScroll(){
  siteNav.classList.toggle('scrolled', window.scrollY > 20);

  let current = '';
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top <= 120 && rect.bottom >= 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ==========================================================================
// MOBILE MENU
// ==========================================================================
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileBackdrop = document.getElementById('mobileBackdrop');

function closeMenu(){
  mobileMenu.classList.remove('open');
  mobileBackdrop.classList.remove('open');
  navToggle.classList.remove('active');
  navToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}
function openMenu(){
  mobileMenu.classList.add('open');
  mobileBackdrop.classList.add('open');
  navToggle.classList.add('active');
  navToggle.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}
navToggle.addEventListener('click', () => {
  mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
});
mobileBackdrop.addEventListener('click', closeMenu);
mobileMenu.querySelectorAll('[data-nav]').forEach(link => {
  link.addEventListener('click', closeMenu);
});
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

// ==========================================================================
// SCROLL REVEAL
// ==========================================================================
const revealEls = document.querySelectorAll('.reveal-up');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting){
      setTimeout(() => entry.target.classList.add('is-visible'), i * 40);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ==========================================================================
// CONTACT FORM (builds a mailto: draft — no backend required)
// ==========================================================================
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

if (contactForm){
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    if (!name || !email || !message){
      formNote.textContent = 'Please fill in every field before sending.';
      formNote.classList.remove('success');
      return;
    }

    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    const mailto = `https://mail.google.com/mail/?view=cm&fs=1&to=imasroy113@gmail.com&su=${subject}&body=${body}`;

    window.open(mailto, '_blank', 'noopener');
    formNote.textContent = 'Opening your email app to send this message…';
    formNote.classList.add('success');
    contactForm.reset();
  });
}
