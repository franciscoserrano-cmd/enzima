
(async function(){
  const dataUrl = 'data/producciones.json';
  let productions = [];

  try {
    const res = await fetch(dataUrl);
    productions = await res.json();
  } catch (e) {
    console.error('Error loading productions data:', e);
    return;
  }

  const gallery = document.getElementById('productions-gallery');
  if (!gallery) return;

  function getDelayClass(index) {
    const delayMap = ['delay-1', 'delay-2', 'delay-3', 'delay-4', 'delay-5', 'delay-6'];
    return delayMap[index % delayMap.length];
  }

  function resetCardAnimation(card, index) {
    card.className = `image disclose ${getDelayClass(index)}`;
    card.classList.remove('show');
    card.classList.remove('observed');
    card.style.opacity = '';
    card.style.transform = '';
  }

  function createCard(p, index) {
    const div = document.createElement('div');
    resetCardAnimation(div, index);
    div.setAttribute('data-name', p.category);
    div.setAttribute('data-id', p.id);

    const span = document.createElement('span');
    const img = document.createElement('img');
    img.src = p.thumb;
    img.alt = p.title;
    span.appendChild(img);

    const meta = document.createElement('div');
    meta.className = 'production-meta';
    const h3 = document.createElement('h3');
    h3.textContent = p.title + ' (' + p.year + ')';
   

    meta.appendChild(h3);
    div.appendChild(span);
    div.appendChild(meta);

    // click opens modal
    div.addEventListener('click', () => openModal(p));

    return div;
  }

  const filterItem = document.querySelector('.items');
  function renderGallery(filterName = 'all') {
    gallery.innerHTML = '';
    const filteredProductions = filterName === 'all'
      ? productions
      : productions.filter((p) => p.category === filterName);

    filteredProductions.forEach((p, index) => gallery.appendChild(createCard(p, index)));

    requestAnimationFrame(() => {
      if (window.observeReveals) {
        window.observeReveals();
      }
    });
  }

  function applyFilter(filterName) {
    renderGallery(filterName);
  }

  renderGallery('all');

  if (filterItem) {
    filterItem.addEventListener('click', (ev)=>{
      const target = ev.target;
      if (!target.classList.contains('item')) return;

      const currentActive = filterItem.querySelector('.active');
      if (currentActive === target) return;

      if (currentActive) {
        currentActive.classList.remove('active');
      }
      target.classList.add('active');
      const filterName = target.getAttribute('data-name');
      applyFilter(filterName);
    });
  }

  let modalEl = document.getElementById('productions-modal');
  if (!modalEl) {
    modalEl = document.createElement('div');
    modalEl.id = 'productions-modal';
    modalEl.className = 'productions-modal';
    modalEl.innerHTML = `
      <div class="productions-modal-inner">
        <button class="modal-close" aria-label="Cerrar">✕</button>
        <div class="modal-media"><img src="" alt="" /></div>
        <div class="modal-info">
          <h2 class="modal-title"></h2>
          <p class="modal-desc"></p>
        </div>
      </div>
    `;
    document.body.appendChild(modalEl);
    modalEl.style.display = 'none';
  }

  const modalImg = modalEl.querySelector('.modal-media img');
  const modalTitle = modalEl.querySelector('.modal-title');
  const modalDesc = modalEl.querySelector('.modal-desc');
  const modalClose = modalEl.querySelector('.modal-close');

  function openModal(p){
    modalImg.src = p.image || p.thumb;
    modalImg.alt = p.title;
    modalTitle.textContent = p.title + ' — ' + p.year;
    modalDesc.textContent = p.description || '';
    modalEl.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeModal(){
    modalEl.style.display = 'none';
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);
  modalEl.addEventListener('click', (ev)=>{
    if (ev.target === modalEl) closeModal();
  });

})();
