# 🏠 Landing Page - Venta de Apartamento

Landing page moderna y profesional para la venta de tu apartamento. Diseño responsive, animaciones fluidas y optimizada para conversión.

## 📋 Contenido

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Personalización](#personalización)
- [Deploy en GitHub Pages](#deploy-en-github-pages)
- [Assets e Imágenes](#assets-e-imágenes)
- [Optimizaciones](#optimizaciones)

---

## ✨ Características

### 🎨 Diseño
- ✅ Diseño moderno y fresco
- ✅ UI/UX intuitiva y de fácil lectura
- ✅ Paleta de colores profesionales
- ✅ Tipografía limpia (Poppins)
- ✅ Animaciones suaves y fluidas
- ✅ 100% responsive (mobile-first)
- ✅ Accessible (WCAG AA)

### 🔧 Funcionalidades
- ✅ Carrusel de fotos con Swiper.js
- ✅ Autoplay y navegación por teclado
- ✅ Miniaturas interactivas
- ✅ Video de YouTube embebido
- ✅ Botón WhatsApp directo
- ✅ Navegación suave (smooth scroll)
- ✅ Animaciones al scroll (scroll reveal)
- ✅ Header dinámico con glassmorphism

### ⚡ Performance
- ✅ Lazy loading de imágenes
- ✅ Optimización de assets
- ✅ Código minificado (opcional)
- ✅ CDN para librerías externas
- ✅ Cache de navegador optimizado

---

## 🛠 Tecnologías

| Tecnología | Uso | Versión |
|------------|-----|---------|
| HTML5 | Estructura | 5 |
| CSS3 | Estilos | 3 |
| JavaScript | Interactividad | ES6+ |
| Swiper.js | Carrusel | 10.x |
| Font Awesome | Iconos | 6.4.0 |
| Google Fonts | Tipografía | Poppins |

---

## 📁 Estructura del Proyecto

```
apartamento-venta/
├── index.html          # Página principal
├── css/
│   └── style.css       # Estilos principales
├── js/
│   └── main.js         # JavaScript principal
├── images/
│   ├── foto-1.jpg      # Foto principal
│   ├── foto-2.jpg      # Foto sala
│   ├── foto-3.jpg      # Foto cocina
│   ├── foto-4.jpg      # Foto habitación
│   ├── foto-5.jpg      # Foto baños
│   └── foto-6.jpg      # Foto exterior
├── README.md           # Este archivo
└── .gitignore          # Archivos a ignorar en Git
```

---

## 🎯 Personalización

### 1. Información del Inmueble

Reemplaza los marcadores en `index.html`:

```html
<!-- Título y ubicación -->
<h1 class="title">Apartamento en Venta</h1>
<p class="subtitle">[UBICACIÓN] | Estrato [X] | [ÁREA] m²</p>

<!-- Precio -->
<div class="price-tag">$[PRECIO] COP</div>

<!-- WhatsApp -->
<a href="https://wa.me/57[TU_NUMERO]" class="btn-whatsapp">
    <i class="fab fa-whatsapp"></i> Contáctanos por WhatsApp
</a>
```

### 2. Metadatos

```html
<div class="metadata-grid">
    <div class="metadata-item">
        <i class="fas fa-expand-arrows-alt"></i>
        <div>
            <span class="label">Área</span>
            <span class="value">[ÁREA] m²</span>
        </div>
    </div>
    <!-- Más metadatos... -->
</div>
```

### 3. Descripción

```html
<div class="description-content">
    <p>
        <strong>[TÍTULO DESCRIPTIVO]</strong>
    </p>
    <p>
        [DESCRIPCIÓN DETALLADA DEL APARTAMENTO]
    </p>
    <p>
        [INCLUYE: UBICACIÓN, DISTRIBUCIÓN, ILUMINACIÓN, VISTAS, ACABADOS, ETC.]
    </p>
</div>
```

### 4. Features de la Unidad

```html
<div class="features-grid">
    <div class="feature-item">
        <i class="fas fa-swimming-pool"></i>
        <span>Piscina</span>
    </div>
    <!-- Agrega o elimina features según tu unidad -->
</div>
```

### 5. Video

```html
<iframe 
    src="https://www.youtube.com/embed/[VIDEO_ID]" 
    title="Video del Apartamento" 
    allowfullscreen>
</iframe>
```

**Para obtener el VIDEO_ID:**
1. Ve a tu video en YouTube
2. La URL es: `youtube.com/watch?v=VIDEO_ID`
3. Copia solo el `VIDEO_ID` (ej: `dQw4w9WgXcQ`)

### 6. Datos de Contacto

```html
<div class="contact-item">
    <i class="fas fa-user"></i>
    <div>
        <span class="label">Vendedor</span>
        <span class="value">[TU NOMBRE]</span>
    </div>
</div>
```

---

## 🚀 Deploy en GitHub Pages

### Paso 1: Crear Repositorio en GitHub

1. Ve a [GitHub.com](https://github.com)
2. Click en **New repository**
3. Nombre: `apartamento-venta`
4. Marca **Public**
5. Click en **Create repository**

### Paso 2: Subir Archivos a GitHub

```bash
# Clona el repositorio
git clone https://github.com/[USUARIO]/apartamento-venta.git
cd apartamento-venta

# Copia todos los archivos a la carpeta
# (index.html, css/, js/, images/)

# Añade archivos a Git
git add .

# Crea commit
git commit -m "Landing page venta apartamento"

# Sube a GitHub
git push origin main
```

### Paso 3: Habilitar GitHub Pages

1. Ve a **Settings** del repositorio
2. En la barra lateral izquierda, click en **Pages**
3. En **Build and deployment** → **Source**:
   - Selecciona: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/(root)**
4. Click en **Save**

### Paso 4: Obtener URL

Tu landing page estará disponible en:

```
https://[USUARIO].github.io/apartamento-venta/
```

**Ejemplo:**
```
https://edavidlink.github.io/apartamento-venta/
```

### Paso 5: (Opcional) Dominio Personalizado

1. Compra dominio en Namecheap, GoDaddy, etc.
2. En GitHub Pages Settings → Custom domain
3. Agrega tu dominio (ej: `mi-apartamento.com`)
4. En tu proveedor de dominio:
   - Agrega registro CNAME:
     - Name: `www`
     - Value: `[USUARIO].github.io`
   - Agrega registro A (opcional):
     - Name: `@`
     - Value: `185.199.108.153`

---

## 📸 Assets e Imágenes

### Requisitos de las Fotos

| Parámetro | Valor recomendado |
|-----------|-------------------|
| Formato | JPG, PNG o WebP |
| Dimensión | 1920x1080px (16:9) |
| Tamaño máximo | 2MB por imagen |
| Calidad | Alta (80-90%) |
| Nombre | foto-1.jpg, foto-2.jpg, etc. |

### Optimización de Imágenes

**Online Tools:**
- [TinyPNG](https://tinypng.com/) - Comprimir imágenes sin perder calidad
- [Squoosh](https://squoosh.app/) - Optimización avanzada
- [Cloudinary](https://cloudinary.com/) - CDN de imágenes

**Comando (si tienes ImageMagick):**
```bash
# Redimensionar a 1920x1080
convert foto-original.jpg -resize 1920x1080 foto-1.jpg

# Optimizar JPG
convert foto-1.jpg -quality 85 foto-1-optimized.jpg
```

### Organización de Fotos

```
images/
├── foto-1.jpg      # Principal (fachada o mejor ángulo)
├── foto-2.jpg      # Sala y comedor
├── foto-3.jpg      # Cocina
├── foto-4.jpg      # Habitación principal
├── foto-5.jpg      # Baños
├── foto-6.jpg      # Vista exterior o amenidades
└── (opcional) more...
```

---

## ⚡ Optimizaciones

### 1. Minificar CSS y JS

**Opción A: Online**
- [CSS Minifier](https://cssminifier.com/)
- [JS Minifier](https://jsminifier.com/)

**Opción B: Con herramientas**

```bash
# Minificar CSS (instala cssnano)
npm install -g cssnano-cli
cssnano css/style.css css/style.min.css

# Minificar JS (instala terser)
npm install -g terser
terser js/main.js -o js/main.min.js
```

### 2. Lazy Loading

Las imágenes ya tienen `loading="lazy"` agregado. Si quieres más control:

```html
<img 
    src="images/placeholder.jpg" 
    data-src="images/foto-1.jpg" 
    alt="Foto 1" 
    loading="lazy"
>
```

El JavaScript manejará el lazy loading automáticamente.

### 3. CDN para Librerías

Las librerías ya están cargadas desde CDN:

```html
<!-- Swiper CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css">

<!-- Font Awesome -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<!-- Swiper JS -->
<script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js"></script>
```

### 4. Cache de Navegador

El `.htaccess` (si usas Apache) o `nginx.conf` (si usas Nginx) puede incluir:

```apache
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
</IfModule>
```

---

## 🐛 Troubleshooting

### Las fotos no se muestran

**Solución:**
1. Verifica que las fotos estén en la carpeta `images/`
2. Verifica que los nombres coincidan con el HTML
3. Verifica que el tamaño sea ≤ 2MB

### El carrusel no funciona

**Solución:**
1. Verifica que Swiper.js esté cargado en el `<head>` o antes del cierre del `</body>`
2. Verifica que haya al menos 2 fotos en el carrusel
3. Revisa la consola del navegador (F12) para errores

### El video no se carga

**Solución:**
1. Verifica que el VIDEO_ID sea correcto
2. Verifica que el video en YouTube sea público
3. Intenta con otro video de prueba

### GitHub Pages no funciona

**Solución:**
1. Verifica que la rama sea `main`
2. Verifica que el folder sea `/(root)`
3. Espera 1-2 minutos después de hacer push
4. Revisa la pestaña "Actions" para errores

---

## 📱 Soporte de Navegadores

| Navegador | Versión mínima |
|-----------|---------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |
| Opera | 76+ |

---

## 🎨 Personalización Avanzada

### Cambiar Colores

En `css/style.css`, modifica las variables CSS:

```css
:root {
    /* Colores principales */
    --primary-color: #2563eb;      /* Azul principal */
    --secondary-color: #3b82f6;    /* Azul secundario */
    --whatsapp-green: #25D366;     /* WhatsApp */
    
    /* Colores de fondo */
    --bg-white: #ffffff;
    --bg-light: #f9fafb;
}
```

### Cambiar Fuente

En `index.html`, cambia Google Fonts:

```html
<!-- Actual -->
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

<!-- Ejemplo: Roboto -->
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
```

Luego actualiza `css/style.css`:

```css
body {
    font-family: 'Roboto', sans-serif;
}
```

---

## 📊 Analytics (Opcional)

### Google Analytics

1. Crea cuenta en [Google Analytics](https://analytics.google.com/)
2. Crea propiedad (Web)
3. Obtén el Tracking ID (ej: `UA-XXXXXXXXX-X`)
4. Agrega en `index.html` antes de `</head>`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=[TRACKING_ID]"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '[TRACKING_ID]');
</script>
```

---

## 📝 Notas Finales

- ✅ Reemplaza todos los marcadores `[...]` con tu información real
- ✅ Optimiza las fotos antes de subirlas
- ✅ Verifica que todos los enlaces funcionen
- ✅ Prueba en diferentes dispositivos (mobile, tablet, desktop)
- ✅ Comparte el enlace en redes sociales

---

## 🤝 Contribuciones

Este proyecto fue creado para venta de apartamento en Colombia. Si quieres mejorarlo:

1. Fork el proyecto
2. Crea branch (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abre Pull Request

---

## 📄 Licencia

Este proyecto es de uso personal para venta de inmuebles.

---

## 👤 Contacto

**Vendedor:** [Tu Nombre]
**Teléfono:** [Tu Teléfono]
**Email:** [Tu Email]
**WhatsApp:** https://wa.me/57[TU_NUMERO]

---

**Creado con ❤️ usando HTML, CSS y JavaScript puro**