/**
 * Landing Page Venta Apartamento
 * JavaScript principal — CSS Carousel (sin dependencias)
 */

// ========================================
// DATOS DE FOTOS
// ========================================
const photos = [
    { src: 'images/foto-02.jpg', caption: 'Sala de cerca' },
    { src: 'images/foto-01.jpg', caption: 'Sala principal' },
    { src: 'images/foto-03.jpg', caption: 'Sala y cocina integrada' },
    { src: 'images/foto-04.jpg', caption: 'Cocina integral en granito' },
    { src: 'images/foto-05.jpg', caption: 'Cocina - vista cercana' },
    { src: 'images/foto-06.jpg', caption: 'Comedor' },
    { src: 'images/foto-07.jpg', caption: 'Comedor y sala' },
    { src: 'images/foto-08.jpg', caption: 'Pasillo habitaciones' },
    { src: 'images/foto-09.jpg', caption: 'Cuarto auxiliar con closet' },
    { src: 'images/foto-10.jpg', caption: 'Baño auxiliar cabinado' },
    { src: 'images/foto-11.jpg', caption: 'Estudio / posible 3er cuarto' },
    { src: 'images/foto-12.jpg', caption: 'Habitación principal y estudio' },
    { src: 'images/foto-13.jpg', caption: 'Habitación principal' },
    { src: 'images/foto-14.jpg', caption: 'Vestier habitación principal' },
    { src: 'images/foto-15.jpg', caption: 'Baño privado cabinado' },
    { src: 'images/foto-16.jpg', caption: 'Ducha baño principal' },
    { src: 'images/foto-17.jpg', caption: 'Balcón con vista al oriente' },
    { src: 'images/foto-18.jpg', caption: 'Zona de ropas independiente' },
    { src: 'images/foto-19.jpg', caption: 'Calentador de agua a gas' }
];

let currentSlide = 0;
let autoplayTimer = null;

// ========================================
// ELEMENTOS
// ========================================
const carousel = document.getElementById('cssCarousel');
const track = carousel.querySelector('.carousel-track');
const dotsContainer = carousel.querySelector('.carousel-dots');
const thumbnailsContainer = document.getElementById('thumbnails');
const prevBtn = carousel.querySelector('.carousel-prev');
const nextBtn = carousel.querySelector('.carousel-next');

// ========================================
// GENERAR MINIATURAS
// ========================================
photos.forEach((photo, i) => {
    const item = document.createElement('div');
    item.className = 'thumbnail-item' + (i === 0 ? ' active' : '');
    item.dataset.index = i;
    item.innerHTML = `
        <img src="${photo.src}" alt="${photo.caption}" class="thumbnail" loading="lazy">
        <span class="thumb-caption">${photo.caption}</span>
    `;
    item.addEventListener('click', () => goToSlide(i));
    thumbnailsContainer.appendChild(item);
});

// ========================================
// GENERAR PUNTOS DE PAGINACIÓN
// ========================================
photos.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Foto ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
});

// ========================================
// NAVEGACIÓN
// ========================================
function goToSlide(index) {
    currentSlide = index;
    const slide = track.children[index];
    if (slide) {
        slide.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
    updateActiveStates();
    resetAutoplay();
}

function nextSlide() {
    goToSlide((currentSlide + 1) % photos.length);
}

function prevSlide() {
    goToSlide((currentSlide - 1 + photos.length) % photos.length);
}

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// ========================================
// SINCRONIZAR CON SCROLL
// ========================================
function syncFromScroll() {
    const scrollLeft = track.scrollLeft;
    const slideWidth = track.offsetWidth;
    const index = Math.round(scrollLeft / slideWidth);
    if (index !== currentSlide && index >= 0 && index < photos.length) {
        currentSlide = index;
        updateActiveStates();
    }
}

let scrollTimer;
track.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(syncFromScroll, 100);
});

// ========================================
// ESTADOS ACTIVOS
// ========================================
function updateActiveStates() {
    // Puntos
    dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
    // Miniaturas
    thumbnailsContainer.querySelectorAll('.thumbnail-item').forEach((item, i) => {
        item.classList.toggle('active', i === currentSlide);
    });
}

// ========================================
// AUTOPLAY
// ========================================
function startAutoplay() {
    autoplayTimer = setInterval(nextSlide, 90000);
}

function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
}

carousel.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
carousel.addEventListener('mouseleave', startAutoplay);

// ========================================
// TECLADO
// ========================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    else if (e.key === 'ArrowRight') nextSlide();
});

// ========================================
// IMAGE PROTECTION (Anti-download)
// ========================================
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG' || e.target.closest('.carousel-slide') || e.target.closest('.thumbnails')) {
        e.preventDefault();
        return false;
    }
});

document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
        return false;
    }
});

// ========================================
// SCROLL REVEAL (Animaciones al scroll)
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.metadata-item, .feature-item, .contact-item, .description-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

const style = document.createElement('style');
style.textContent = `.revealed { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);

// ========================================
// HEADER DINÁMICO
// ========================================
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
    }
});

// ========================================
// SMOOTH SCROLL
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ========================================
// INICIAR
// ========================================
startAutoplay();
console.log('Landing Page Apartamento Toledo — CSS Carousel inicializado');
console.log('Total de fotos:', photos.length);
