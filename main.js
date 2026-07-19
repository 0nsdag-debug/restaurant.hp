/**
 * ===========================================================================
 * いづもや公式サイト — JavaScript
 * 学習・ポートフォリオ用架空プロジェクト
 * ===========================================================================
 */
'use strict';

/* ── Hero background ken-burns effect ── */
const heroBg = document.getElementById('hero-bg');
if (heroBg) {
  // Trigger scale animation after a tiny delay for smooth start
  requestAnimationFrame(() => {
    setTimeout(() => heroBg.classList.add('loaded'), 80);
  });
}

/* ── Header: scroll state ── */
const header = document.getElementById('site-header');

const handleScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
};

window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll(); // run on load

/* ── Mobile nav ── */
const hamburger   = document.getElementById('hamburger-btn');
const mobileNav   = document.getElementById('mobile-nav');
const mobileClose = document.getElementById('mobile-close');

const openNav = () => {
  mobileNav.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
};

const closeNav = () => {
  mobileNav.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
};

if (hamburger) hamburger.addEventListener('click', openNav);
if (mobileClose) mobileClose.addEventListener('click', closeNav);

// Close on link click
if (mobileNav) {
  mobileNav.querySelectorAll('.mobile-link, .btn').forEach(el => {
    el.addEventListener('click', closeNav);
  });
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileNav?.classList.contains('open')) closeNav();
});

/* ── Scroll reveal via IntersectionObserver ── */
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(el => io.observe(el));
} else {
  // Fallback for older browsers
  revealEls.forEach(el => el.classList.add('visible'));
}

/* ── Active nav highlight on scroll ── */
const sections = document.querySelectorAll('main section[id]');
const navLinks  = document.querySelectorAll('.site-nav a[href^="#"]');

if ('IntersectionObserver' in window && navLinks.length > 0) {
  const activateNav = (id) => {
    navLinks.forEach(a => {
      const isActive = a.getAttribute('href') === `#${id}`;
      a.style.color = isActive ? 'var(--color-white)' : '';
    });
  };

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) activateNav(entry.target.id);
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach(s => sectionObserver.observe(s));
}

/* ── Smooth scroll polyfill for older Safari ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    // Native smooth-scroll is set via CSS, this is a fallback guard
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
