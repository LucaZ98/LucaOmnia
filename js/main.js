document.addEventListener('DOMContentLoaded', () => {

  // === NAVBAR ===
  const navbar = document.querySelector('.navbar');
  const burger = document.querySelector('.navbar__burger');
  const navLinks = document.querySelector('.navbar__links');
  const links = document.querySelectorAll('.navbar__links a');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // === ACTIVE SECTION ===
  const sections = document.querySelectorAll('.section, .hero');
  const navItems = document.querySelectorAll('.navbar__links a');

  const setActive = () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === '#' + current) {
        item.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', setActive);

  // === RENDER: FOTO ===
  const fotoGrid = document.querySelector('#foto .photo-grid');
  if (fotoGrid && typeof FOTO !== 'undefined') {
    fotoGrid.innerHTML = FOTO.map(f => `
      <div class="photo-card${f.wide ? ' photo-card--wide' : ''}">
        <img class="photo-card__img" src="${f.src}" alt="${f.caption}" loading="lazy">
        <div class="photo-card__overlay">
          <span class="photo-card__caption">${f.caption}</span>
        </div>
      </div>
    `).join('');
  }

  // === RENDER: VIDEO ===
  const videoGrid = document.querySelector('#video .video-grid');
  if (videoGrid && typeof VIDEO !== 'undefined') {
    videoGrid.innerHTML = VIDEO.map(v => {
      const embed = v.youtubeId
        ? `<iframe src="https://www.youtube.com/embed/${v.youtubeId}" allowfullscreen loading="lazy"></iframe>`
        : `<div class="video-card__placeholder">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            <span>Video YouTube</span>
          </div>`;
      return `
        <div class="video-card">
          <div class="video-card__embed">${embed}</div>
          <div class="video-card__info">
            <p class="video-card__title">${v.titolo}</p>
            <p class="video-card__desc">${v.descrizione}</p>
          </div>
        </div>
      `;
    }).join('');
  }

  // === RENDER: CANZONI ===
  const songsList = document.querySelector('#canzoni .songs-list');
  if (songsList && typeof CANZONI !== 'undefined') {
    const musicIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`;

    songsList.innerHTML = CANZONI.map(c => {
      if (c.soundcloudEmbed) {
        return `
          <div class="song-card">
            <div style="width:100%">${c.soundcloudEmbed}</div>
          </div>
        `;
      }
      return `
        <div class="song-card">
          <div class="song-card__cover">${musicIcon}</div>
          <div class="song-card__info">
            <p class="song-card__title">${c.titolo}</p>
            <p class="song-card__artist">${c.artista}</p>
            <div class="song-card__bar"><div class="song-card__bar-fill" style="width: ${Math.random() * 60 + 20}%"></div></div>
          </div>
          <span class="song-card__duration">${c.durata}</span>
        </div>
      `;
    }).join('');
  }

  // === RENDER: PENSIERI ===
  const thoughtsGrid = document.querySelector('#pensieri .thoughts-grid');
  if (thoughtsGrid && typeof PENSIERI !== 'undefined') {
    thoughtsGrid.innerHTML = PENSIERI.map(p => `
      <div class="thought-card">
        <p class="thought-card__date">${p.data}</p>
        <p class="thought-card__text">${p.testo}</p>
      </div>
    `).join('');
  }

  // === RENDER: PRODOTTI ===
  const productsGrid = document.querySelector('#prodotti .products-grid');
  if (productsGrid && typeof PRODOTTI !== 'undefined') {
    const gradients = [
      'linear-gradient(135deg, var(--green-pale), #d4e4d1)',
      'linear-gradient(135deg, #2d5a27, #1a3a1a)',
      'linear-gradient(135deg, #5a9e55, #3d7a3a)'
    ];

    productsGrid.innerHTML = PRODOTTI.map((p, i) => {
      const bg = p.immagine
        ? `background-image: url('${p.immagine}'); background-size: cover; background-position: center;`
        : `background: ${gradients[i % gradients.length]}`;
      const wrapper = p.link && p.link !== '#' ? [`<a href="${p.link}" target="_blank">`, '</a>'] : ['', ''];
      return `
        ${wrapper[0]}
        <div class="product-card">
          <div class="product-card__img" style="${bg}"></div>
          <div class="product-card__body">
            <span class="product-card__tag">${p.tag}</span>
            <p class="product-card__title">${p.titolo}</p>
            <p class="product-card__desc">${p.descrizione}</p>
          </div>
        </div>
        ${wrapper[1]}
      `;
    }).join('');
  }

  // === FADE-IN ANIMATIONS ===
  const fadeEls = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach(el => observer.observe(el));
});
