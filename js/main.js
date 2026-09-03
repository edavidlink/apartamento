/**
 * Landing Page Venta Apartamento
 * JavaScript principal
 */

// ========================================
// INICIALIZACIÓN DEL CARRUSEL (SWIPER)
// ========================================

// Adaptar altura del swiper al slide actual (soporta fotos verticales)
function adaptSlideHeight(swiper) {
    const slides = swiper.slides;
    const currentSlide = slides[swiper.activeIndex];
    if (!currentSlide) return;
    const img = currentSlide.querySelector('img');
    if (!img) return;

    const containerWidth = swiper.el.offsetWidth;
    const imgNaturalRatio = img.naturalHeight / img.naturalWidth;
    let targetHeight = containerWidth * imgNaturalRatio;

    // Limitar altura máxima a 85vh
    const maxH = window.innerHeight * 0.85;
    if (targetHeight > maxH) targetHeight = maxH;
    // Mínimo 250px
    if (targetHeight < 250) targetHeight = 250;

    // Forzar altura con !important para superar CSS de Swiper
    swiper.el.style.setProperty('height', targetHeight + 'px', 'important');
    swiper.wrapperEl.style.setProperty('height', targetHeight + 'px', 'important');
    slides.forEach(s => {
        s.style.setProperty('height', targetHeight + 'px', 'important');
    });
}

const swiper = new Swiper('.mySwiper', {
    // Configuración básica
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    
    // Paginación (puntos)
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },
    
    // Navegación (flechas)
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    
    // Autoplay
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
    
    // Keyboard
    keyboard: {
        enabled: true,
    },
    
    // Efecto de transición
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    
    // Eventos
    on: {
        slideChange: function() {
            updateThumbnails(this.realIndex);
            adaptSlideHeight(this);
        },
        init: function() {
            adaptSlideHeight(this);
        }
    }
});

// ========================================
// MINIATURAS
// ========================================
const thumbnailItems = document.querySelectorAll('.thumbnail-item');

function updateThumbnails(index) {
    thumbnailItems.forEach((item, i) => {
        if (i === index) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Click en miniatura para ir al slide
thumbnailItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        swiper.slideToLoop(index);
    });
});

// Marcar primera miniatura como activa
if (thumbnailItems.length > 0) {
    thumbnailItems[0].classList.add('active');
}

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

// Observar elementos para animación
document.querySelectorAll('.metadata-item, .feature-item, .contact-item, .description-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Estilo para elementos revelados
const style = document.createElement('style');
style.textContent = `
    .revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// ========================================
// HEADER DINÁMICO
// ========================================
let lastScroll = 0;
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
    
    lastScroll = currentScroll;
});

// ========================================
// SMOOTH SCROLL
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// LAZY LOADING DE IMÁGENES
// ========================================
if ('loading' in HTMLImageElement.prototype) {
    // Soporta lazy loading nativo
    console.log('Lazy loading nativo soportado');
} else {
    // Fallback para navegadores antiguos
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ========================================
// PRELOAD DE IMÁGENES CRÍTICAS
// ========================================
window.addEventListener('load', () => {
    // Preload primera imagen del carrusel
    const firstSlide = document.querySelector('.swiper-slide:first-child img');
    if (firstSlide) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = firstSlide.src;
        document.head.appendChild(link);
    }
});

// ========================================
// MANEJO DE ERRORES DE IMÁGENES
// ========================================
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
        console.warn('Error cargando imagen:', this.src);
    });
});

// ========================================
// ACCESIBILIDAD
// ========================================
// Navegación por teclado en el carrusel
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        swiper.slidePrev();
    } else if (e.key === 'ArrowRight') {
        swiper.slideNext();
    }
});

// Pausar autoplay al hover
const swiperContainer = document.querySelector('.swiper');
if (swiperContainer) {
    swiperContainer.addEventListener('mouseenter', () => {
        swiper.autoplay.stop();
    });
    
    swiperContainer.addEventListener('mouseleave', () => {
        swiper.autoplay.start();
    });
}

// Recalcular altura al cambiar tamaño de ventana
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => adaptSlideHeight(swiper), 150);
});

// Recalcular cuando las imágenes terminen de cargar
document.querySelectorAll('.swiper-slide img').forEach(img => {
    img.addEventListener('load', () => adaptSlideHeight(swiper));
});

// ========================================
// LOGGING
// ========================================
console.log('Landing Page Apartamento Toledo - Inicializada');
console.log('Total de slides:', document.querySelectorAll('.swiper-slide').length);
console.log('Total de miniaturas:', thumbnailItems.length);

// ========================================
// IMAGE PROTECTION (Anti-download)
// ========================================
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG' || e.target.closest('.swiper-slide') || e.target.closest('.thumbnails')) {
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
// WATERMARK - Marca de agua en cada slide
// ========================================
document.querySelectorAll('.swiper-slide').forEach(slide => {
    const wm = document.createElement('div');
    wm.className = 'watermark';
    wm.textContent = 'PH: edavidlink';
    slide.appendChild(wm);
});