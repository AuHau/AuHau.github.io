import '../css/variables.css';
import '../css/layout.css';
import '../css/pages/homepage.css';
import '../css/pages/it.css';
import '../css/responsivity.css';

// --- Year ---
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// --- Age ---
const ageEl = document.getElementById('age');
if (ageEl) {
  const birthDate = new Date(1992, 3, 5);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  ageEl.textContent = age;
}

// --- Nav active state via Intersection Observer ---
const menu = document.getElementById('menu');
const frames = document.querySelectorAll('.frame');
const projectsMenuItem = document.getElementById('projects');

if (menu && frames.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const anchor = entry.target.dataset.anchor;
          if (!anchor) return;

          // Remove all active
          menu.querySelectorAll('li.active').forEach((li) => li.classList.remove('active'));

          if (anchor.startsWith('projects-')) {
            if (projectsMenuItem) projectsMenuItem.classList.add('active');
          } else {
            const li = menu.querySelector(`[data-menuanchor="${anchor}"]`);
            if (li) li.classList.add('active');
          }
        }
      });
    },
    { threshold: 0.5 }
  );

  frames.forEach((frame) => observer.observe(frame));

  // Set initial active state
  const firstAnchor = frames[0]?.dataset.anchor;
  if (firstAnchor) {
    const li = menu.querySelector(`[data-menuanchor="${firstAnchor}"]`);
    if (li) li.classList.add('active');
    else if (firstAnchor.startsWith('projects-') && projectsMenuItem) {
      projectsMenuItem.classList.add('active');
    }
  }
}

// --- Nav color switcher ---
const CLASSES = ['orange', 'white'];
const nav = document.querySelector('nav');

function getClassFromFrame(frame) {
  for (const cls of CLASSES) {
    if (frame.classList.contains(cls)) return cls;
  }
  if (frame.dataset.menuclass) return frame.dataset.menuclass;
  return null;
}

function removeClasses(el) {
  CLASSES.forEach((cls) => el.classList.remove(cls));
}

function menuColorSwitcher() {
  if (!nav) return;
  const navHeight = nav.offsetHeight;

  for (const frame of frames) {
    const rect = frame.getBoundingClientRect();
    if (rect.top < navHeight && rect.bottom > navHeight) {
      const frameClass = getClassFromFrame(frame);
      if (frameClass && !nav.classList.contains(frameClass)) {
        removeClasses(nav);
        nav.classList.add(frameClass);
      } else if (!frameClass) {
        removeClasses(nav);
      }
      break;
    }
  }
}

window.addEventListener('scroll', menuColorSwitcher, { passive: true });
window.addEventListener('resize', menuColorSwitcher, { passive: true });
menuColorSwitcher();

// --- Next frame handler ---
document.querySelectorAll('.nextFrame').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const currentFrame = link.closest('.frame');
    const nextFrame = currentFrame?.nextElementSibling;
    if (nextFrame) {
      nextFrame.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// --- Hamburger menu: close on link click ---
const navCheckbox = document.getElementById('nav-toggle');
if (navCheckbox) {
  document.querySelectorAll('#menu a').forEach((link) => {
    link.addEventListener('click', () => {
      navCheckbox.checked = false;
    });
  });
}

// --- Carousel ---
document.querySelectorAll('.carousel').forEach((carousel) => {
  const inner = carousel.querySelector('.carousel-inner');
  const items = carousel.querySelectorAll('.carousel-item');
  if (!inner || items.length === 0) return;

  let current = 0;
  const total = items.length;

  function goTo(index) {
    current = ((index % total) + total) % total;
    inner.style.transform = `translateX(-${current * 100}%)`;
  }

  const leftBtn = carousel.querySelector('.control.left');
  const rightBtn = carousel.querySelector('.control.right');

  if (leftBtn) leftBtn.addEventListener('click', (e) => { e.preventDefault(); goTo(current - 1); });
  if (rightBtn) rightBtn.addEventListener('click', (e) => { e.preventDefault(); goTo(current + 1); });

  let timer = setInterval(() => goTo(current + 1), 4000);

  carousel.addEventListener('mouseenter', () => clearInterval(timer));
  carousel.addEventListener('mouseleave', () => {
    timer = setInterval(() => goTo(current + 1), 4000);
  });
});
