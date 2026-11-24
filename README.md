# Vuela en Alto

Sitio estático (HTML + CSS + JS, sin instalaciones) para publicar en GitHub Pages.

## Publicar en GitHub Pages

1. En GitHub, crea un repositorio nuevo (por ejemplo `vuela-en-alto`).
2. Sube **el contenido de esta carpeta** (no la carpeta en sí): `index.html`, `css/`, `js/` y `assets/`.
3. Ve a **Settings → Pages**. En *Build and deployment* elige **Deploy from a branch**, rama `main` y carpeta `/ (root)`. Guarda.
4. En uno o dos minutos el sitio queda en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPOSITORIO/`.

## Estructura

```
index.html              página (incluye la mascota animada de la intro)
css/styles.css          estilos y animación de la intro
js/main.js              intro (primera visita, saltar, repetir) y comparador antes/después
assets/mascota.svg      mascota (convertida desde el archivo .ai)
assets/productos/       fotos de los 6 productos
assets/antes.jpg, despues.jpg   fotos del comparador
assets/videos/          los dos videos y sus portadas
```

## Cosas que puedes cambiar

- **Textos y precios:** están directamente en `index.html`, dentro de cada `<article class="producto">`.
- **Títulos de los videos:** al final de `index.html`, en cada `<figcaption>`.
- **Intro:** se ve solo la primera vez (se guarda en el navegador de cada persona). Para probarla, agrega `?intro` a la dirección, o usa «Ver la bienvenida otra vez» en el pie.
- **Duración de la intro:** `DURACION_AUTO` al inicio de `js/main.js` (en milisegundos).
- **Colores:** variables al inicio de `css/styles.css`.
- **Tipografías:** se cargan desde Google Fonts (Bagel Fat One y Figtree); sin conexión, el sitio usa tipografías del sistema.
