# 🚀 GUÍA DE SETUP - Landing Page en GitHub

Este documento te guía paso a paso para configurar y desplegar tu landing page en GitHub Pages.

---

## 📋 PRE-REQUISITOS

- [ ] Cuenta en [GitHub](https://github.com) (gratis)
- [ ] Git instalado en tu computadora
- [ ] Fotos de tu apartamento (mínimo 4, ideal 6)
- [ ] Video de YouTube (opcional pero recomendado)
- [ ] Número de teléfono con WhatsApp

---

## 🛠 PASO 1: INSTALAR GIT (si no lo tienes)

### Windows

1. Ve a [git-scm.com](https://git-scm.com/download/win)
2. Descarga e instala Git
3. Abre **Git Bash** o **PowerShell**

### macOS

```bash
# Usando Homebrew
brew install git
```

### Linux (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install git
```

### Verificar instalación

```bash
git --version
```

---

## 📝 PASO 2: CONFIGURAR GIT

```bash
# Configurar nombre
git config --global user.name "[TU NOMBRE]"

# Configurar email (el mismo de tu cuenta de GitHub)
git config --global user.email "[TU_EMAIL]"
```

---

## 🏠 PASO 3: PREPARAR FOTOS

### Descargar desde Google Drive

1. Ve a tu carpeta en Google Drive:
   https://drive.google.com/drive/u/0/folders/1rukzuhKe7HTZOor96hASSd0-nxTnV4Gp

2. Selecciona todas las fotos
3. Click derecho → Descargar
4. Guarda en una carpeta de tu computadora

### Optimizar fotos

**Opción A: Online (Recomendado)**

1. Ve a [TinyPNG](https://tinypng.com/)
2. Sube todas las fotos
3. Descarga las versiones optimizadas

**Opción B: Con herramientas locales**

Si tienes ImageMagick:

```bash
# Redimensionar a 1920x1080
convert foto-original.jpg -resize 1920x1080 foto-1.jpg

# Optimizar
convert foto-1.jpg -quality 85 foto-1-optimized.jpg
```

### Renombrar fotos

Renombra tus fotos así:

```
foto-1.jpg      # Principal (fachada o mejor ángulo)
foto-2.jpg      # Sala y comedor
foto-3.jpg      # Cocina
foto-4.jpg      # Habitación principal
foto-5.jpg      # Baños
foto-6.jpg      # Vista exterior
```

### Mover fotos a la carpeta del proyecto

```bash
# Copia fotos a la carpeta images/
cp /ruta/a/tus/fotos/*.jpg ~/apartamento-venta/images/
```

---

## 🎥 PASO 4: PREPARAR VIDEO (Opcional)

### Subir video a YouTube

1. Ve a [YouTube](https://youtube.com)
2. Click en **Crear** → **Subir video**
3. Sube tu video del apartamento
4. Espera a que se procese

### Obtener VIDEO_ID

1. Ve a tu video en YouTube
2. La URL es: `youtube.com/watch?v=VIDEO_ID`
3. Copia solo el `VIDEO_ID`

**Ejemplo:**
```
URL: https://www.youtube.com/watch?v=dQw4w9WgXcQ
VIDEO_ID: dQw4w9WgXcQ
```

### Actualizar en index.html

Busca esta línea en `index.html`:

```html
<iframe src="https://www.youtube.com/embed/[VIDEO_ID]">
```

Reemplaza `[VIDEO_ID]` con tu ID real:

```html
<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ">
```

---

## 🎯 PASO 5: PERSONALIZAR CONTENIDO

Edita el archivo `index.html` y reemplaza todos los marcadores:

### Información básica

```html
<!-- Reemplaza [UBICACIÓN], [X], [ÁREA], [PRECIO] -->
<h1 class="title">Apartamento en Venta</h1>
<p class="subtitle">[UBICACIÓN] | Estrato [X] | [ÁREA] m²</p>
<div class="price-tag">$[PRECIO] COP</div>
```

### WhatsApp

```html
<!-- Reemplaza [TU_NUMERO] sin espacios ni guiones -->
<a href="https://wa.me/57[TU_NUMERO]">
```

**Ejemplo:**
```
Tu número: 300 123 4567
Formato: 573001234567
URL: https://wa.me/573001234567
```

### Metadatos

```html
<span class="value">[ÁREA] m²</span>
<span class="value">[HABITACIONES]</span>
<span class="value">[BAÑOS]</span>
<span class="value">[PARQUEADEROS]</span>
<span class="value">[ESTRATO]</span>
<span class="value">[AÑO]</span>
```

### Descripción

```html
<div class="description-content">
    <p>
        <strong>[TÍTULO DESCRIPTIVO]</strong>
    </p>
    <p>
        [DESCRIPCIÓN DETALLADA DEL APARTAMENTO]
    </p>
</div>
```

### Features

Agrega o elimina features según tu unidad:

```html
<div class="feature-item">
    <i class="fas fa-swimming-pool"></i>
    <span>Piscina</span>
</div>
<!-- Agrega más features... -->
```

### Contacto

```html
<span class="value">[TU NOMBRE]</span>
<span class="value">[TU TELÉFONO]</span>
<span class="value">[TU EMAIL]</span>
<span class="value">[DIRECCIÓN/UBICACIÓN]</span>
```

---

## 🚀 PASO 6: CREAR REPOSITORIO EN GITHUB

1. Ve a [GitHub.com](https://github.com)
2. Click en **New** (o **New repository**)
3. Configura:

   ```
   Repository name: apartamento-venta
   Description: Landing page venta apartamento
   ☐ Private
   ☑ Public
   ☐ Add a README file
   ☐ Add .gitignore
   ☐ Choose a license
   ```

4. Click en **Create repository**

---

## 📤 PASO 7: SUBIR ARCHIVOS A GITHUB

### Opción A: Desde el VPS (método actual)

Los archivos ya están creados en `/home/hermes/apartamento-venta`.

```bash
# Ve a la carpeta del proyecto
cd ~/apartamento-venta

# Inicializa Git
git init

# Agrega todos los archivos
git add .

# Crea commit
git commit -m "Landing page venta apartamento"

# Agrega remoto (reemplaza [USUARIO])
git remote add origin https://github.com/[USUARIO]/apartamento-venta.git

# Sube a GitHub
git push -u origin main
```

### Opción B: Desde tu computadora

Si prefieres trabajar desde tu computadora:

```bash
# Clona el repositorio
git clone https://github.com/[USUARIO]/apartamento-venta.git
cd apartamento-venta

# Copia los archivos del VPS a tu computadora
# (puedes descargarlos desde GitHub o usar scp)

# Añade cambios
git add .

# Crea commit
git commit -m "Landing page venta apartamento"

# Sube a GitHub
git push origin main
```

---

## 🌐 PASO 8: HABILITAR GITHUB PAGES

1. Ve al repositorio en GitHub
2. Click en **Settings** (engranaje arriba a la derecha)
3. En la barra lateral izquierda, click en **Pages**
4. En **Build and deployment** → **Source**:

   ```
   Source: Deploy from a branch
   Branch: main
   Folder: /(root)
   ```

5. Click en **Save**

6. Espera 1-2 minutos

---

## ✅ PASO 9: VERIFICAR DEPLOY

1. Ve a la pestaña **Actions**
2. Verifica que el workflow esté en verde ✅
3. Ve a la pestaña **Code**
4. En la parte superior, aparecerá un enlace:

   ```
   🌐 https://[USUARIO].github.io/apartamento-venta/
   ```

5. Click en el enlace para verificar que funcione

---

## 🎨 PASO 10: PERSONALIZAR DOMINIO (OPCIONAL)

### Opción A: Usar subdominio gratuito de GitHub

Ya tienes uno: `https://[USUARIO].github.io/apartamento-venta/`

### Opción B: Usar dominio personalizado

1. Compra dominio en [Namecheap](https://namecheap.com), [GoDaddy](https://godaddy.com), etc.
2. Ve a GitHub Pages → **Settings** → **Pages**
3. En **Custom domain**, agrega tu dominio:

   ```
   mi-apartamento.com
   ```

4. Click en **Save**

5. En tu proveedor de dominio:

   **Registro CNAME:**
   ```
   Type: CNAME
   Name: www
   Value: [USUARIO].github.io
   TTL: 3600
   ```

   **Registro A (opcional, para dominio sin www):**
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   TTL: 3600
   ```

6. Espera 24-48 horas para que se propague el DNS

---

## 📊 PASO 11: AGREGAR ANALYTICS (OPCIONAL)

### Google Analytics

1. Crea cuenta en [Google Analytics](https://analytics.google.com/)
2. Crea propiedad (Web)
3. Obtén el Tracking ID (ej: `UA-XXXXXXXXX-X`)
4. Abre `index.html`
5. Antes de `</head>`, agrega:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=[TRACKING_ID]"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '[TRACKING_ID]');
</script>
```

6. Guarda y commit:

```bash
git add index.html
git commit -m "Add Google Analytics"
git push origin main
```

---

## 🧪 PASO 12: PROBAR EN DIFERENTES DISPOSITIVOS

1. Abre tu landing page en:
   - Desktop (Chrome, Firefox, Safari)
   - Tablet (iPad, Android tablet)
   - Mobile (iPhone, Android phone)

2. Verifica:
   - ✅ Fotos cargan correctamente
   - ✅ Carrusel funciona
   - ✅ Botón WhatsApp funciona
   - ✅ Video se reproduce
   - ✅ Navegación es suave
   - ✅ Texto es legible
   - ✅ No hay errores en consola (F12)

---

## 📱 PASO 13: COMPARTIR

### En redes sociales

Comparte el enlace:

```
https://[USUARIO].github.io/apartamento-venta/
```

### En portales inmobiliarios

Agrega el enlace en:
- Fincaraíz
- Metrocuadrado
- Properati
- Facebook Marketplace

---

## 🔧 TROUBLESHOOTING

### Las fotos no se muestran

**Solución:**
1. Verifica que estén en la carpeta `images/`
2. Verifica que los nombres coincidan con `index.html`
3. Verifica que el tamaño sea ≤ 2MB

### El carrusel no funciona

**Solución:**
1. Abre la consola del navegador (F12)
2. Busca errores relacionados con Swiper
3. Verifica que Swiper.js esté cargado

### GitHub Pages no funciona

**Solución:**
1. Revisa la pestaña **Actions** para errores
2. Verifica que la rama sea `main`
3. Verifica que el folder sea `/(root)`
4. Espera 1-2 minutos más
5. Intenta con un navegador diferente (modo incógnito)

### El botón WhatsApp no funciona

**Solución:**
1. Verifica que el formato sea `57[TU_NUMERO]`
2. Sin espacios ni guiones
3. Ejemplo: `573001234567`

---

## 📝 PASO 14: MANTENIMIENTO

### Actualizar contenido

```bash
# Edita archivos
nano index.html
# o
nano css/style.css

# Commit cambios
git add .
git commit -m "Update content"
git push origin main
```

### Actualizar fotos

```bash
# Reemplaza fotos en images/
cd images/
# Sube nuevas fotos

# Commit
cd ..
git add images/
git commit -m "Update photos"
git push origin main
```

---

## 🎯 RESUMEN FINAL

### Checklist

- [ ] Fotos optimizadas en `images/`
- [ ] Video subido a YouTube (opcional)
- [ ] Contenido personalizado en `index.html`
- [ ] Repositorio creado en GitHub
- [ ] Archivos subidos a GitHub
- [ ] GitHub Pages habilitado
- [ ] Deploy verificado
- [ ] Probado en diferentes dispositivos
- [ ] Enlace compartido

---

## 📞 AYUDA

Si tienes problemas:

1. **Revisa la consola del navegador** (F12)
2. **Revisa GitHub Actions** para errores
3. **Verifica que todos los marcadores `[...]` hayan sido reemplazados**
4. **Pregunta en la comunidad de GitHub**

---

**¡Felicidades! Tu landing page está lista para vender tu apartamento! 🎉**

---

**URL final:**
```
https://[USUARIO].github.io/apartamento-venta/
```

**O con dominio personalizado:**
```
https://mi-apartamento.com/
```