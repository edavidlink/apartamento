# CSS Styles

Este archivo contiene todos los estilos de la landing page.

## Estructura

1. **Variables CSS** (`:root`)
   - Colores principales y secundarios
   - Colores de texto y fondo
   - Espaciado y bordes
   - Transiciones

2. **Reset & Base**
   - Reset de márgenes y padding
   - Estilos base del body
   - Contenedores

3. **Header**
   - Logo y navegación
   - Glassmorphism

4. **Hero Section**
   - Título destacado
   - Precio
   - Botón WhatsApp

5. **Gallery**
   - Carrusel Swiper
   - Miniaturas

6. **Metadata**
   - Grid de información del inmueble

7. **Description**
   - Texto descriptivo

8. **Features**
   - Grid de características de la unidad

9. **Video**
   - Iframe de YouTube

10. **Contact**
    - Datos de contacto
    - Botones de acción

11. **Footer**
    - Copyright

12. **Responsive**
    - Media queries para tablet y mobile

13. **Animaciones**
    - Fade in
    - Transiciones

14. **Accessibility**
    - Prefers-reduced-motion
    - Focus visible

## Personalización

### Cambiar colores

```css
:root {
    --primary-color: #2563eb;      /* Azul principal */
    --whatsapp-green: #25D366;     /* WhatsApp */
    /* Más colores... */
}
```

### Cambiar tipografía

En `index.html`, cambia Google Fonts:

```html
<link href="https://fonts.googleapis.com/css2?family=[FUENTE]:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

Luego actualiza `css/style.css`:

```css
body {
    font-family: '[FUENTE]', sans-serif;
}
```

### Cambiar tamaños

```css
.title {
    font-size: 3rem;  /* Cambia este valor */
}

.section-title {
    font-size: 2.25rem;  /* Cambia este valor */
}
```

## Optimización

Para producción, minifica este archivo:

1. Visita [CSS Minifier](https://cssminifier.com/)
2. Copia el contenido de `style.css`
3. Minifica
4. Guarda como `style.min.css`
5. Actualiza `index.html`:

```html
<!-- Cambia -->
<link rel="stylesheet" href="css/style.css">

<!-- Por -->
<link rel="stylesheet" href="css/style.min.css">
```