const scenes = [...document.querySelectorAll('.scene')];
let current = 0;
let lastAdvance = 0;
function show(index) {
  current = (index + scenes.length) % scenes.length;
  scenes.forEach((scene, i) => {
    scene.hidden = i !== current;
    scene.classList.toggle('active', i === current);
  });
  document.title = current === 0 ? 'Grok Bot — Work That Stays On' : `${scenes[current].getAttribute('aria-label')} — Grok Bot`;
}
function advance() {
  if (Date.now() - lastAdvance < 320) return;
  lastAdvance = Date.now();
  show(current + 1);
}
document.querySelectorAll('[data-next]').forEach(el => el.addEventListener('click', advance));
document.addEventListener('keydown', e => {
  if (e.code === 'Space') { e.preventDefault(); if (!e.repeat) advance(); }
  else if (e.key.toLowerCase() === 'r' && !e.repeat) { e.preventDefault(); lastAdvance = Date.now(); show(0); }
});
show(0);
