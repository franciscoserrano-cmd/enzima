
window.onscroll = function () {
  var navbar = document.getElementById("navbar");
  var letras = document.querySelectorAll(".letra-menu");

  if (window.pageYOffset > 50) {
    navbar.classList.add("scrolled");
    letras.forEach(function (letra) {
      letra.classList.add("scrolled");
    });
  } else {
    navbar.classList.remove("scrolled");
    letras.forEach(function (letra) {
      letra.classList.remove("scrolled");
    });
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

let currentIndex = -1;

function showFeaturedImage(index) {
    if (index < 0 || index >= thumbnails.length) return;

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

thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        showFeaturedImage(index);
    });
});

arrowLeft.addEventListener('click', () => {
    if (currentIndex === -1) return;
    const newIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
    showFeaturedImage(newIndex);
});

arrowRight.addEventListener('click', () => {
    if (currentIndex === -1) return;
    const newIndex = (currentIndex + 1) % thumbnails.length;
    showFeaturedImage(newIndex);
});

closeBtn.addEventListener('click', () => {
    featured.style.display = 'none';
    currentIndex = -1;
    thumbnails.forEach(t => t.classList.remove('hidden')); 
    
    // Regresa el scroll hacia la galería
    thumbnails.scrollIntoView({ behavior: 'smooth', block: 'start' })});

const toggleBtn = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');
const menuItems = document.querySelectorAll('.menu li a');

toggleBtn.addEventListener('click', () => {
navbar.classList.toggle('active');

menuItems.forEach(item => {
  item.addEventListener('click', () => {
    navbar.classList.remove('active');
    });
});
});


const filterItem = document.querySelector(".items");
const filterImg = document.querySelectorAll(".gallery .image");

window.onload = ()=>{ 
  filterItem.onclick = (selectedItem)=>{ 
    if(selectedItem.target.classList.contains("item")){ 
      filterItem.querySelector(".active").classList.remove("active");
      selectedItem.target.classList.add("active");
      let filterName = selectedItem.target.getAttribute("data-name");
      filterImg.forEach((image) => {
        let filterImges = image.getAttribute("data-name");
        if((filterImges == filterName) || (filterName == "all")){
          image.classList.remove("hide");
          image.classList.add("show");
        }else{
          image.classList.add("hide");
          image.classList.remove("show");
        }
      });
    }
  }
  for (let i = 0; i < filterImg.length; i++) {
    filterImg[i].setAttribute("onclick", "preview(this)");
  }
}

const previewBox = document.querySelector(".preview-box"),
categoryName = previewBox.querySelector(".title p"),
previewImg = previewBox.querySelector("img"),
closeIcon = previewBox.querySelector(".icon"),
shadow = document.querySelector(".shadow");

function preview(element){

  document.querySelector("body").style.overflow = "hidden";
  let selectedPrevImg = element.querySelector("img").src;
  let selectedImgCategory = element.getAttribute("data-name");
  previewImg.src = selectedPrevImg;
  categoryName.textContent = selectedImgCategory;
  previewBox.classList.add("show");
  shadow.classList.add("show");
  closeIcon.onclick = ()=>{
    previewBox.classList.remove("show");
    shadow.classList.remove("show");
    document.querySelector("body").style.overflow = "auto";
  }
}
