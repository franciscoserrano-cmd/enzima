
// Función para cambiar la clase de la barra de navegación
window.onscroll = function() {
    var navbar = document.getElementById("navbar");
    // Si el usuario ha hecho scroll más de 50px desde la parte superior
    if (window.pageYOffset > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
};


const thumbnails = document.querySelectorAll('.gallery-slide');
const featured = document.querySelector('.featured');
const featuredImg = document.querySelector('.featured-img');
const description = document.querySelector('.description');
const title = document.querySelector('.title-description');
const arrowRight = document.querySelector('.next');
const arrowLeft = document.querySelector('.prev');
const closeBtn = document.querySelector('.close-btn');

let currentIndex = -1; // Guardará el índice de la imagen actualmente destacada

// Función para mostrar una imagen destacada según el índice
function showFeaturedImage(index) {
    if (index < 0 || index >= thumbnails.length) return;

    // Restaurar todas las miniaturas
    thumbnails.forEach(t => t.classList.remove('hidden'));

    const thumbnail = thumbnails[index];
    thumbnail.classList.add('hidden');

    const img = thumbnail.querySelector('img');
    const h2 = thumbnail.querySelector('h2');
    const p = thumbnail.querySelector('p');

    if (img && h2 && p) {
        featured.style.display = 'flex';
        featuredImg.src = img.src;
        featuredImg.alt = img.alt || h2.textContent;
        title.textContent = h2.textContent;
        description.textContent = p.textContent;

        document.getElementById('featured-img-id')
            .scrollIntoView({ behavior: 'smooth', block: 'center' });

        currentIndex = index;
    }
}

// Evento al hacer clic en una miniatura
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        showFeaturedImage(index);
    });
});

// Botón "anterior"
arrowLeft.addEventListener('click', () => {
    if (currentIndex === -1) return;
    const newIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
    showFeaturedImage(newIndex);
});

// Botón "siguiente"
arrowRight.addEventListener('click', () => {
    if (currentIndex === -1) return;
    const newIndex = (currentIndex + 1) % thumbnails.length;
    showFeaturedImage(newIndex);
});

closeBtn.addEventListener('click', () => {
    featured.style.display = 'none';   // Oculta el bloque destacado
    currentIndex = -1;                 // Reinicia el índice
    thumbnails.forEach(t => t.classList.remove('hidden')); // Restaura todas las miniaturas
    
    // Regresa el scroll hacia la galería
    thumbnails.scrollIntoView({ behavior: 'smooth', block: 'start' })});