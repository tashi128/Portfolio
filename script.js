'use strict';

const root = document.documentElement;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const storage = {
  get(key) { try { return localStorage.getItem(key); } catch { return null; } },
  set(key, value) { try { localStorage.setItem(key, value); } catch { /* Preferences remain usable without storage. */ } }
};

// Appearance controls work independently of the project interactions.
const themeButton = document.getElementById('theme-toggle');
function setTheme(dark) {
  root.dataset.theme = dark ? 'dark' : 'light';
  themeButton.setAttribute('aria-pressed', String(dark));
  themeButton.setAttribute('aria-label', dark ? 'Enable light theme' : 'Enable dark theme');
  document.getElementById('theme-label').textContent = dark ? 'Daydream mode' : 'After hours';
  themeButton.firstElementChild.textContent = dark ? '☀' : '☾';
  document.querySelector('meta[name="theme-color"]').content = dark ? '#211d29' : '#faf5f2';
}
setTheme(storage.get('zartashia-theme') === 'dark');
themeButton.addEventListener('click', () => {
  const dark = root.dataset.theme !== 'dark';
  setTheme(dark);
  storage.set('zartashia-theme', dark ? 'dark' : 'light');
});

// Mobile navigation retains ordinary links and keyboard access.
const menuButton = document.querySelector('.menu-button');
const mobileNav = document.getElementById('mobile-nav');
function closeMenu(restoreFocus = false) {
  mobileNav.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  if (restoreFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  mobileNav.hidden = !open;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
mobileNav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !mobileNav.hidden) closeMenu(true); });
window.matchMedia('(min-width: 561px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

// Project filtering.
const filters = [...document.querySelectorAll('[data-filter]')];
const cards = [...document.querySelectorAll('.project-card')];
filters.forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  let visible = 0;
  cards.forEach(card => {
    const matches = filter === 'all' || card.dataset.category.split(' ').includes(filter);
    card.hidden = !matches;
    if (matches) visible++;
  });
  document.getElementById('filter-status').textContent = `Showing ${visible} ${filter === 'all' ? 'projects' : filter === 'ai' ? 'AI and agent projects' : 'accessibility projects'}.`;
}));

const projects = {
  mellowtab: {
    eyebrow: 'GOOGLE AI STUDENT HACKATHON · SEPTEMBER 2026',
    title: 'MellowTab',
    description: 'Built with teammates to explore a more approachable web through AI reading support and browser-based accessibility tools.',
    built: [
      'Text simplification, read-aloud support, and AI-generated descriptions for images missing alt text.',
      'A Chrome Manifest V3 extension integrating JavaScript, Gemini, and HTML5 Canvas.',
      'Experimental flashing-video detection and a project showcase deployed on DigitalOcean with a custom domain.'
    ],
    focus: 'Bringing several kinds of support into the browsing experience, while giving people control over how they engage with content.',
    note: 'The linked website is an interactive showcase. Video detection is experimental and does not guarantee safe viewing.',
    url: 'https://mellowtab.zartashia.com/'
  },
  study: {
    eyebrow: 'PERSONAL PROJECT · FEBRUARY 2026',
    title: 'AI Study Buddy',
    description: 'An AI-powered study platform that turns uploaded documents into personalized learning material.',
    built: [
      'PDF, DOCX, and TXT ingestion with document-grounded study workflows.',
      'Context-aware questions, flashcards, summaries, AI chat, and topic extraction.',
      'Progress tracking to help learners organize and interact with their study material.'
    ],
    focus: 'Connecting document ingestion, AI generation, and a usable study flow in one deployed application.',
    note: 'Generated study material should be checked against the source document.',
    url: 'https://studybuddy.zartashia.com/'
  },
  minecraft: {
    eyebrow: 'DAYTONA × GIVEAGO HACKATHON · APRIL 2026',
    title: 'Minecraft Autonomous Agent',
    description: 'A goal-driven Minecraft agent built with Mineflayer and DeepSeek, connecting planning with actions in a game world.',
    built: [
      'A planner spanning more than 1,200 recipes.',
      'Multi-step task decomposition for autonomous gameplay.',
      'Movement validation and safety checks to prevent invalid packets and server kicks.'
    ],
    focus: 'Turning a high-level goal into a sequence of valid actions, with checks between planning and execution.',
    note: 'The project link opens the recorded video demonstration.',
    url: 'https://www.youtube.com/watch?v=pzJn4Lnonj8'
  },
  shield: {
    eyebrow: 'WORKDAY HACKATHON · APRIL 2026',
    title: 'Photosensitivity Accessibility',
    description: 'A browser-extension prototype built in a team under hackathon constraints, awarded Best User Experience and Best Presentation.',
    built: [
      'Frame-level video analysis to detect flashing patterns.',
      'Accessibility-focused mitigation of detected flashes.',
      'A functional live demonstration and a presentation explaining the user experience.'
    ],
    focus: 'Making a technical video-analysis concept understandable and usable through an accessibility-focused interface.',
    note: 'This is an experimental prototype; detection cannot guarantee that video content is safe for every viewer.',
    url: 'https://puddin.pasbola.com/'
  }
};
const dialog = document.getElementById('project-dialog');
let dialogTrigger;
function textElement(tag, text, className) {
  const element = document.createElement(tag);
  element.textContent = text;
  if (className) element.className = className;
  return element;
}
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  const project = projects[button.dataset.project];
  if (!project) return;
  dialogTrigger = button;
  document.getElementById('dialog-eyebrow').textContent = project.eyebrow;
  document.getElementById('dialog-title').textContent = project.title;
  document.getElementById('dialog-description').textContent = project.description;
  const list = document.createElement('ul');
  project.built.forEach(item => list.append(textElement('li', item)));
  document.getElementById('dialog-content').replaceChildren(
    textElement('h3', 'What went into it'), list,
    textElement('h3', 'The engineering focus'), textElement('p', project.focus),
    textElement('p', project.note, 'dialog-note')
  );
  document.getElementById('dialog-link').href = project.url;
  dialog.showModal();
  document.body.style.overflow = 'hidden';
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const box = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.style.overflow = '';
  dialogTrigger?.focus();
});

document.getElementById('copy-email').addEventListener('click', async () => {
  const status = document.getElementById('copy-status');
  try {
    await navigator.clipboard.writeText('saleemzartashia1@gmail.com');
    status.textContent = 'Email copied. Let’s make something good.';
  } catch {
    status.textContent = 'Copy saleemzartashia1@gmail.com, or use the Say hello button.';
  }
});

// Falling cherry-blossom petals: gentle drift, rotation, and no pointer capture.
const canvas = document.getElementById('blossoms');
const context = canvas.getContext('2d');
const motionButton = document.getElementById('motion-toggle');
let paused = reducedMotion.matches || storage.get('zartashia-motion') === 'paused';
let frame = 0;
let previousTime = 0;
let width = 0;
let height = 0;
let particles = [];
function draw(delta = 0) {
  if (!context) return;
  context.clearRect(0, 0, width, height);
  const dark = root.dataset.theme === 'dark';
  particles.forEach(p => {
    p.y += delta * p.speed;
    p.phase += delta * .00035;
    p.x += (Math.sin(p.phase) * .012 + .006) * delta;
    p.rotation += delta * p.spin;
    if (p.y > height + 20) { p.y = -20; p.x = Math.random() * width; }
    if (p.x > width + 20) p.x = -20;
    if (p.x < -20) p.x = width + 20;
    context.save();
    context.translate(p.x, p.y);
    context.rotate(p.rotation);
    context.scale(.72 + Math.abs(Math.sin(p.phase)) * .28, 1);
    context.globalAlpha = p.opacity;
    context.fillStyle = dark ? p.darkColor : p.color;
    // A petal tapers to a point and has the small notch of a cherry blossom.
    context.beginPath();
    context.moveTo(0, p.size);
    context.bezierCurveTo(-p.size * 1.12, p.size * .3, -p.size * .9, -p.size * .85, -p.size * .24, -p.size * .72);
    context.quadraticCurveTo(-p.size * .08, -p.size * .7, 0, -p.size * .42);
    context.quadraticCurveTo(p.size * .12, -p.size * .8, p.size * .35, -p.size * .75);
    context.bezierCurveTo(p.size * 1.04, -p.size * .55, p.size * .65, p.size * .55, 0, p.size);
    context.fill();
    context.restore();
  });
}
function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  context?.setTransform(ratio, 0, 0, ratio, 0, 0);
  particles = Array.from({length: width < 600 ? 24 : 45}, () => ({
    x: Math.random() * width, y: Math.random() * height,
    size: 4 + Math.random() * 5, opacity: .28 + Math.random() * .3,
    speed: .016 + Math.random() * .025, phase: Math.random() * Math.PI * 2,
    rotation: Math.random() * Math.PI * 2, spin: (Math.random() - .5) * .0006,
    color: ['#d890ad', '#e5aac0', '#dca0b8', '#c889a8'][Math.floor(Math.random() * 4)],
    darkColor: ['#f1bad0', '#daa3c2', '#e8b2d0'][Math.floor(Math.random() * 3)]
  }));
  draw();
}
function animate(time) {
  frame = 0;
  if (paused || document.hidden || !context) return;
  const delta = previousTime ? Math.min(time - previousTime, 50) : 0;
  previousTime = time;
  draw(delta);
  frame = requestAnimationFrame(animate);
}
function updateMotion() {
  root.dataset.motion = paused ? 'paused' : 'running';
  motionButton.setAttribute('aria-pressed', String(paused));
  motionButton.setAttribute('aria-label', paused ? 'Resume background animation' : 'Pause background animation');
  document.getElementById('motion-label').textContent = paused ? 'Resume the blossoms' : 'Pause the blossoms';
  document.getElementById('motion-icon').textContent = paused ? '▷' : 'Ⅱ';
  if (frame) cancelAnimationFrame(frame);
  frame = 0;
  previousTime = 0;
  if (!paused && !document.hidden && context) frame = requestAnimationFrame(animate);
  else draw();
}
motionButton.addEventListener('click', () => {
  paused = !paused;
  storage.set('zartashia-motion', paused ? 'paused' : 'running');
  updateMotion();
});
reducedMotion.addEventListener('change', event => {
  paused = event.matches || storage.get('zartashia-motion') === 'paused';
  updateMotion();
});
document.addEventListener('visibilitychange', updateMotion);
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
updateMotion();
themeButton.addEventListener('click', () => { if (paused) draw(); });

if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {threshold: .05});
  document.querySelectorAll('.section-head, .about-copy, .community, .toolkit-section').forEach(element => {
    element.classList.add('reveal-ready');
    revealObserver.observe(element);
  });
}
