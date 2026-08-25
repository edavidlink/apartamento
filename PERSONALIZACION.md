# 📝 GUÍA DE PERSONALIZACIÓN - MARCADORES A REEMPLAZAR

Este documento lista todos los marcadores que debes reemplazar en `index.html`.

---

## 🎯 LISTA COMPLETA DE MARCADORES

### 1. TÍTULO Y UBICACIÓN (Líneas 30-32)

```html
<h1 class="title">Apartamento en Venta</h1>
<p class="subtitle">[UBICACIÓN] | Estrato [X] | [ÁREA] m²</p>
```

**Reemplaza:**
- `[UBICACIÓN]` → Ejemplo: Sabaneta, Caldas, Itagüí
- `[X]` → Ejemplo: 4, 5, 6
- `[ÁREA]` → Ejemplo: 85, 95, 105

**Ejemplo final:**
```html
<h1 class="title">Apartamento en Venta</h1>
<p class="subtitle">Sabaneta | Estrato 4 | 85 m²</p>
```

---

### 2. PRECIO (Línea 33)

```html
<div class="price-tag">$[PRECIO] COP</div>
```

**Reemplaza:**
- `[PRECIO]` → Ejemplo: 450000000, 500000000, 550000000

**Ejemplo final:**
```html
<div class="price-tag">$450,000,000 COP</div>
```

---

### 3. WHATSAPP (Líneas 36-38)

```html
<a href="https://wa.me/57[TU_NUMERO]" class="btn-whatsapp" target="_blank" rel="noopener">
    <i class="fab fa-whatsapp"></i> Contáctanos por WhatsApp
</a>
```

**Reemplaza:**
- `[TU_NUMERO]` → Sin espacios ni guiones, solo números

**Ejemplo:**
- Tu número: 300 123 4567
- Formato: `3001234567`
- Final: `573001234567`

**Ejemplo final:**
```html
<a href="https://wa.me/573001234567" class="btn-whatsapp" target="_blank" rel="noopener">
    <i class="fab fa-whatsapp"></i> Contáctanos por WhatsApp
</a>
```

---

### 4. FOTOS (Líneas 58-80)

```html
<div class="swiper-slide">
    <img src="images/foto-1.jpg" alt="Foto 1 - Vista principal" loading="lazy">
</div>
<!-- Más fotos... -->
```

**Reemplaza:**
- Mantén las rutas `images/foto-1.jpg`, `images/foto-2.jpg`, etc.
- Sube tus fotos reales a la carpeta `images/`
- Verifica que los nombres coincidan

**Opcional:**
- Cambia el texto del `alt` para ser más específico

---

### 5. METADATOS (Líneas 100-135)

```html
<span class="value">[ÁREA] m²</span>
<span class="value">[HABITACIONES]</span>
<span class="value">[BAÑOS]</span>
<span class="value">[PARQUEADEROS]</span>
<span class="value">[ESTRATO]</span>
<span class="value">[AÑO]</span>
```

**Reemplaza:**

| Marcador | Ejemplo |
|----------|---------|
| `[ÁREA]` | 85 |
| `[HABITACIONES]` | 3 |
| `[BAÑOS]` | 2 |
| `[PARQUEADEROS]` | 1 o 2 |
| `[ESTRATO]` | 4, 5, 6 |
| `[AÑO]` | 2018, 2020, 2023 |

**Ejemplo final:**
```html
<span class="value">85 m²</span>
<span class="value">3</span>
<span class="value">2</span>
<span class="value">1</span>
<span class="value">4</span>
<span class="value">2020</span>
```

---

### 6. DESCRIPCIÓN (Líneas 149-167)

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
    <p>
        [CARACTERÍSTICAS DESTACADAS: PISOS EN CERÁMICA, COCINA INTEGRAL, ZONA DE ROPAS, BALCÓN, ETC.]
    </p>
    <p>
        <strong>Ubicación:</strong> [DIRECCIÓN COMPLETA O REFERENCIA CLARA]
    </p>
</div>
```

**Reemplaza:**

| Marcador | Ejemplo |
|----------|---------|
| `[TÍTULO DESCRIPTIVO]` | Hermoso apartamento en zona exclusiva de Sabaneta |
| `[DESCRIPCIÓN DETALLADA]` | Excelente apartamento de 85m² con vista panorámica. Distribución optimizada con sala-comedor amplio, cocina integral tipo isla, y balcones con vista al paisaje. |
| `[INCLUYE: UBICACIÓN...]` | Ubicado en edificio moderno con seguridad 24h. Cerca a parques, supermercados y transporte público. |
| `[CARACTERÍSTICAS DESTACADAS]` | Pisos en cerámica de alta calidad, ventanas de PVC, iluminación natural excelente, balcón con área de lavadero, zona de ropas independiente. |
| `[DIRECCIÓN COMPLETA]` | Calle 10 Sur # 50-123, Sabaneta, Antioquia |

---

### 7. FEATURES DE LA UNIDAD (Líneas 170-199)

```html
<div class="feature-item">
    <i class="fas fa-swimming-pool"></i>
    <span>Piscina</span>
</div>
<!-- Más features... -->
```

**Opciones de features disponibles:**

| Icono | Texto | Cuándo usar |
|-------|-------|-------------|
| `fas fa-swimming-pool` | Piscina | Si tu unidad tiene piscina |
| `fas fa-dumbbell` | Gimnasio | Si tu unidad tiene gimnasio |
| `fas fa-tree` | Zonas Verdes | Si tu unidad tiene zonas verdes |
| `fas fa-shield-alt` | Seguridad 24h | Si tu unidad tiene seguridad 24h |
| `fas fa-child` | Juegos Infantiles | Si tu unidad tiene juegos infantiles |
| `fas fa-utensils` | Zona BBQ | Si tu unidad tiene zona BBQ |
| `fas fa-video` | CCTV | Si tu unidad tiene cámaras de seguridad |
| `fas fa-wheelchair` | Accesibilidad | Si tu unidad tiene rampas o accesibilidad |
| `fas fa-parking` | Parqueadero | Si tu unidad tiene parqueadero cubierto |
| `fas fa-tint` | Agua 24h | Si tu unidad tiene agua 24h |
| `fas fa-bolt` | Luz 24h | Si tu unidad tiene luz 24h |
| `fas fa-fire` | Gas Natural | Si tu unidad tiene gas natural |
| `fas fa-tv` | Cable/Internet | Si tu unidad tiene cable/internet incluido |
| `fas fa-wifi` | WiFi | Si tu unidad tiene WiFi en áreas comunes |
| `fas fa-escalator` | Ascensor | Si tu unidad tiene ascensor |

**Cómo agregar o eliminar features:**

**Agregar:**
```html
<div class="feature-item">
    <i class="fas fa-[ICONO]"></i>
    <span>[TEXTO]</span>
</div>
```

**Eliminar:**
Simplemente borra el bloque `<div class="feature-item">...</div>` correspondiente.

---

### 8. VIDEO (Líneas 209-217)

```html
<iframe 
    src="https://www.youtube.com/embed/[VIDEO_ID]" 
    title="Video del Apartamento - Tour Virtual" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
    allowfullscreen
    loading="lazy">
</iframe>
```

**Reemplaza:**
- `[VIDEO_ID]` → ID de tu video de YouTube

**Cómo obtener el VIDEO_ID:**

1. Ve a tu video en YouTube
2. La URL es: `youtube.com/watch?v=VIDEO_ID`
3. Copia solo lo que está después de `v=`

**Ejemplo:**
```
URL: https://www.youtube.com/watch?v=dQw4w9WgXcQ
VIDEO_ID: dQw4w9WgXcQ
```

**Ejemplo final:**
```html
<iframe 
    src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
    title="Video del Apartamento - Tour Virtual" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
    allowfullscreen
    loading="lazy">
</iframe>
```

**Si NO tienes video:**

Elimina toda la sección `<section class="video">...</section>` (Líneas 205-229).

---

### 9. DATOS DE CONTACTO (Líneas 234-267)

```html
<div class="contact-item">
    <i class="fas fa-user"></i>
    <div>
        <span class="label">Vendedor</span>
        <span class="value">[TU NOMBRE]</span>
    </div>
</div>
<!-- Más datos de contacto... -->
```

**Reemplaza:**

| Marcador | Ejemplo |
|----------|---------|
| `[TU NOMBRE]` | David Link |
| `[TU TELÉFONO]` | 300 123 4567 |
| `[TU EMAIL]` | edavid.link@gmail.com |
| `[DIRECCIÓN/UBICACIÓN]` | Calle 10 Sur # 50-123, Sabaneta |

**Ejemplo final:**
```html
<div class="contact-item">
    <i class="fas fa-user"></i>
    <div>
        <span class="label">Vendedor</span>
        <span class="value">David Link</span>
    </div>
</div>
<div class="contact-item">
    <i class="fas fa-phone"></i>
    <div>
        <span class="label">Teléfono</span>
        <span class="value">300 123 4567</span>
    </div>
</div>
<div class="contact-item">
    <i class="fas fa-envelope"></i>
    <div>
        <span class="label">Email</span>
        <span class="value">edavid.link@gmail.com</span>
    </div>
</div>
<div class="contact-item">
    <i class="fas fa-map-marker-alt"></i>
    <div>
        <span class="label">Ubicación</span>
        <span class="value">Calle 10 Sur # 50-123, Sabaneta</span>
    </div>
</div>
```

---

### 10. WHATSAPP (BOTÓN GRANDE - LÍNEAS 270-275)

```html
<a href="https://wa.me/57[TU_NUMERO]" class="btn-whatsapp-large" target="_blank" rel="noopener">
    <i class="fab fa-whatsapp"></i> Contáctanos por WhatsApp
</a>
```

**Reemplaza:**
- `[TU_NUMERO]` → Sin espacios ni guiones, solo números

**Debe ser el MISMO número que en el botón del hero.**

---

## ✅ CHECKLIST FINAL

Antes de hacer commit y push a GitHub:

- [ ] **[UBICACIÓN]** reemplazado
- [ ] **[X]** (estrato) reemplazado
- [ ] **[ÁREA]** reemplazado en título
- [ ] **[PRECIO]** reemplazado
- [ ] **[TU_NUMERO]** reemplazado (3 veces: hero, contacto, botón grande)
- [ ] Fotos en carpeta `images/`
- [ ] Nombres de fotos coinciden con HTML
- [ ] **[ÁREA]** reemplazado en metadatos
- [ ] **[HABITACIONES]** reemplazado
- [ ] **[BAÑOS]** reemplazado
- [ ] **[PARQUEADEROS]** reemplazado
- [ ] **[ESTRATO]** reemplazado
- [ ] **[AÑO]** reemplazado
- [ ] **[TÍTULO DESCRIPTIVO]** reemplazado
- [ ] **[DESCRIPCIÓN DETALLADA]** reemplazado
- [ ] **[INCLUYE: UBICACIÓN...]** reemplazado
- [ ] **[CARACTERÍSTICAS DESTACADAS]** reemplazado
- [ ] **[DIRECCIÓN COMPLETA]** reemplazado
- [ ] Features actualizados (agregados/eliminados según tu unidad)
- [ ] **[VIDEO_ID]** reemplazado (si tienes video)
- [ ] Sección video eliminada (si NO tienes video)
- [ ] **[TU NOMBRE]** reemplazado
- [ ] **[TU TELÉFONO]** reemplazado
- [ ] **[TU EMAIL]** reemplazado
- [ ] **[DIRECCIÓN/UBICACIÓN]** reemplazado
- [ ] Todos los enlaces funcionan
- [ ] No hay marcadores `[...]` pendientes
- [ ] Código HTML válido (sin etiquetas rotas)
- [ ] Fotos optimizadas y ≤ 2MB

---

## 🎯 EJEMPLO COMPLETO PERSONALIZADO

```html
<!-- Hero Section -->
<h1 class="title">Apartamento en Venta</h1>
<p class="subtitle">Sabaneta | Estrato 4 | 85 m²</p>
<div class="price-tag">$450,000,000 COP</div>
<a href="https://wa.me/573001234567" class="btn-whatsapp" target="_blank" rel="noopener">
    <i class="fab fa-whatsapp"></i> Contáctanos por WhatsApp
</a>

<!-- Metadatos -->
<span class="value">85 m²</span>
<span class="value">3</span>
<span class="value">2</span>
<span class="value">1</span>
<span class="value">4</span>
<span class="value">2020</span>

<!-- Descripción -->
<p>
    <strong>Hermoso apartamento en zona exclusiva de Sabaneta</strong>
</p>
<p>
    Excelente apartamento de 85m² con vista panorámica. Distribución optimizada con sala-comedor amplio, cocina integral tipo isla, y balcones con vista al paisaje.
</p>
<p>
    Ubicado en edificio moderno con seguridad 24h. Cerca a parques, supermercados y transporte público.
</p>
<p>
    Pisos en cerámica de alta calidad, ventanas de PVC, iluminación natural excelente, balcón con área de lavadero, zona de ropas independiente.
</p>
<p>
    <strong>Ubicación:</strong> Calle 10 Sur # 50-123, Sabaneta, Antioquia
</p>

<!-- Contacto -->
<span class="value">David Link</span>
<span class="value">300 123 4567</span>
<span class="value">edavid.link@gmail.com</span>
<span class="value">Calle 10 Sur # 50-123, Sabaneta</span>

<a href="https://wa.me/573001234567" class="btn-whatsapp-large" target="_blank" rel="noopener">
    <i class="fab fa-whatsapp"></i> Contáctanos por WhatsApp
</a>
```

---

## 🚀 PASO SIGUIENTE

Una vez que hayas personalizado todo el contenido:

1. Commit los cambios:

```bash
git add index.html
git commit -m "Personalizar contenido del apartamento"
git push origin main
```

2. Espera 1-2 minutos

3. Verifica en GitHub Pages que se hayan aplicado los cambios

4. Comparte el enlace en redes sociales y portales inmobiliarios

---

**¡Listo para vender tu apartamento! 🎉**