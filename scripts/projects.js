(function () {
  const cards = document.querySelectorAll('.project-card');

  cards.forEach(card => {
    const live = (card.dataset.live || '').trim();
    const repo = (card.dataset.repo || '').trim();
    const video = (card.dataset.video || '').trim();

    const primary = live || repo || video || '';
    const cover = card.querySelector('.card-cover');

    if (cover) {
      if (primary) {
        cover.setAttribute('href', primary);
        cover.style.pointerEvents = 'auto';
      } else {
        cover.removeAttribute('href');
        cover.style.pointerEvents = 'none';
      }
    }

    const fillButton = (kind, url) => {
      const btn = card.querySelector(`.card-actions [data-kind="${kind}"]`);
      if (!btn) return;
      if (url) { btn.setAttribute('href', url); }
      else { btn.style.display = 'none'; }
    };

    fillButton('live', live);
    fillButton('repo', repo);
    fillButton('video', video);

    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && primary) {
        window.open(primary, '_blank', 'noopener');
      }
    });

    if (!primary) card.classList.add('is-soon');
  });
})();
