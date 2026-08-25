/**
 * Landing Page Venta Apartamento
 * JavaScript principal
 */

// ========================================
// INICIALIZACIÓN DEL CARRUSEL (SWIPER)
// ========================================
const initSwiper = () => {
    const swiper = new Swiper('.mySwiper', {
        // Configuración básica
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        
        // Efectos
        effect: 'slide',
        speed: 500,
        
        // Paginación
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        
        // Navegación con flechas
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
            onlyInViewport: true,
        },
        
        // Mousewheel
        mousewheel: {
            forceToAxis: true,
            sensitivity: 1,
            eventsTarget: '.swiper',
        },
        
        // Lazy loading
        lazy: {
            loadPrevNext: true,
            loadPrevNextAmount: 2,
        },
        
        // Efectos de transición
        grabCursor: true,
        preventClicks: true,
        preventClicksPropagation: true,
        
        // Responsive
        breakpoints: {
            // Cuando la ventana tiene más de 768px
            768: {
                slidesPerView: 1,
                spaceBetween: 0,
            },
        },
        
        // Callbacks
        on: {
            init: function() {
                console.log('✅ Carrusel Swiper inicializado');
            },
            slideChange: function() {
                // Actualizar miniaturas activas
                updateThumbnails(this.activeIndex);
            },
        },
    });
    
    return swiper;
};

// ========================================
// MINIATURAS DEL CARRUSEL
// ========================================
const initThumbnails = (swiper) => {
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            // Ir al slide correspondiente
            swiper.slideTo(index + 1); // +1 porque el loop duplica los slides
            
            // Actualizar miniatura activa
            updateThumbnails(index);
        });
    });
};

// Actualizar miniatura activa
const updateThumbnails = (activeIndex) => {
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    thumbnails.forEach((thumbnail, index) => {
        if (index === activeIndex) {
            thumbnail.classList.add('active');
        } else {
            thumbnail.classList.remove('active');
        }
    });
};

// ========================================
// NAVEGACIÓN SUAVE (SCROLL SMOOTH)
// ========================================
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
};

// ========================================
// ANIMACIONES AL SCROLL (SCROLL REVEAL)
// ========================================
const initScrollReveal = () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Elementos a animar
    const elementsToReveal = document.querySelectorAll(
        '.section-title, .metadata-item, .feature-item, .contact-item, .description-content'
    );
    
    elementsToReveal.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Agregar clase reveal cuando es visible
    const style = document.createElement('style');
    style.textContent = `
        .reveal {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
};

// ========================================
// HEADER DINÁMICO (CAMBIO AL SCROLL)
// ========================================
const initDynamicHeader = () => {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Cambiar estilo del header al hacer scroll
        if (currentScroll > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            header.style.backdropFilter = 'blur(15px)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
            header.style.backdropFilter = 'blur(10px)';
        }
        
        lastScroll = currentScroll;
    });
};

// ========================================
// PRELOAD DE IMÁGENES
// ========================================
const preloadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageLoader = new Image();
    
    images.forEach(img => {
        imageLoader.src = img.dataset.src;
        imageLoader.onload = () => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        };
    });
};

// ========================================
// VALIDACIÓN DE ENLACES EXTERNOS
// ========================================
const initExternalLinks = () => {
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    
    externalLinks.forEach(link => {
        const url = new URL(link.href);
        
        // Validar que los enlaces externos sean seguros
        if (!url.protocol.startsWith('http') && !url.protocol.startsWith('https')) {
            console.warn('⚠️ Enlace inseguro detectado:', link.href);
        }
    });
};

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================
const optimizePerformance = () => {
    // Lazy loading para imágenes que no usan Swiper
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img:not(.swiper-slide img)');
        images.forEach(img => {
            img.loading = 'lazy';
        });
    }
    
    // Defer scripts que no son críticos
    const nonCriticalScripts = document.querySelectorAll('script[data-defer]');
    nonCriticalScripts.forEach(script => {
        script.setAttribute('defer', '');
    });
};

// ========================================
// ERROR HANDLING
// ========================================
const handleError = (error) => {
    console.error('❌ Error:', error);
    
    // Mostrar mensaje amigable al usuario
    const errorContainer = document.createElement('div');
    errorContainer.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 20px;
        background: #fee2e2;
        border: 2px solid #ef4444;
        border-radius: 8px;
        z-index: 9999;
        max-width: 300px;
    `;
    errorContainer.innerHTML = `
        <strong>Error:</strong>
        <p>Hubo un problema al cargar la página. Por favor recarga.</p>
    `;
    document.body.appendChild(errorContainer);
    
    // Remover después de 5 segundos
    setTimeout(() => {
        errorContainer.remove();
    }, 5000);
};

// ========================================
// INICIALIZACIÓN PRINCIPAL
// ========================================
const initApp = () => {
    try {
        console.log('🚀 Inicializando Landing Page...');
        
        // Inicializar componentes
        const swiper = initSwiper();
        initThumbnails(swiper);
        initSmoothScroll();
        initScrollReveal();
        initDynamicHeader();
        preloadImages();
        initExternalLinks();
        optimizePerformance();
        
        console.log('✅ Landing Page inicializada correctamente');
        
        // Mensaje de éxito en consola
        console.log('📌 Landing Page de Venta de Apartamento');
        console.log('📌 Creada con HTML, CSS y JavaScript puro');
        console.log('📌 Carrusel con Swiper.js');
        console.log('📌 Diseño responsive y moderno');
        
    } catch (error) {
        handleError(error);
    }
};

// ========================================
// EJECUTAR CUANDO EL DOM ESTÉ LISTO
// ========================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// ========================================
// EJECUTAR CUANDO LA PÁGINA ESTÉ COMPLETAMENTE CARGADA
// ========================================
window.addEventListener('load', () => {
    console.log('✅ Página completamente cargada');
    
    // Mostrar mensaje de carga completa
    document.body.classList.add('loaded');
});

// ========================================
// EXPORTAR FUNCIONES PARA USO EXTERNO
// ========================================
window.landingPage = {
    swiper: null,
    updateThumbnails,
    initApp,
};

// Agregar swiper al objeto cuando esté inicializado
document.addEventListener('DOMContentLoaded', () => {
    window.landingPage.swiper = document.querySelector('.mySwiper')?.swiper;
});