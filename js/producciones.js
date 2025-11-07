// Renderer for productions gallery
// - Loads data/producciones.json
// - Renders thumbnails into #productions-gallery
// - Adds filtering by category (uses same nav .items .item elements)
// - Adds a simple modal/lightbox with title & description

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

  function createCard(p) {
    const div = document.createElement('div');
    div.className = 'image show';
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
    const pdesc = document.createElement('p');
    pdesc.textContent = p.description;
    meta.appendChild(h3);
    meta.appendChild(pdesc);

    div.appendChild(span);
    div.appendChild(meta);

    // click opens modal
    div.addEventListener('click', () => openModal(p));

    return div;
  }

  // render
  productions.forEach(p => gallery.appendChild(createCard(p)));

  // --- filter logic (re-uses existing .items nav) ---
  const filterItem = document.querySelector('.items');
  function applyFilter(filterName){
    const imgs = gallery.querySelectorAll('.image');
    imgs.forEach(image => {
      const name = image.getAttribute('data-name');
      if (filterName === 'all' || name === filterName) {
        image.classList.remove('hide');
        image.classList.add('show');
      } else {
        image.classList.add('hide');
        image.classList.remove('show');
      }
    });
  }

  if (filterItem) {
    filterItem.addEventListener('click', (ev)=>{
      const target = ev.target;
      if (!target.classList.contains('item')) return;
      filterItem.querySelector('.active').classList.remove('active');
      target.classList.add('active');
      const filterName = target.getAttribute('data-name');
      applyFilter(filterName);
    });
  }

  // --- modal ---
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
    // ensure modal is hidden by default (prevents stray button showing)
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
