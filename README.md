# 💳 Tarjeta Virtual — Gonzalo Ormaeche

Tarjeta de presentación digital tipo **app** (PWA). Se abre en el móvil desde el
navegador y se puede **guardar en la pantalla de inicio** con su propio icono,
funcionando sin conexión.

## ✨ Qué incluye
- Tarjeta con efecto **flip 3D** (frente / reverso "Sobre mí").
- Botones para **llamar, email, WhatsApp** y redes sociales.
- Botón **«Guardar contacto»** que descarga un archivo `.vcf` (vCard) para añadirte a la agenda.
- **Instalable** como app (Android: botón "Instalar"; iPhone: «Añadir a pantalla de inicio»).
- Funciona **offline** gracias al service worker.

## ✏️ Cómo personalizarla
Edita **solo** el archivo [`config.js`](config.js): nombre, profesión, biografía,
teléfono, email, WhatsApp, redes y colores. No hace falta tocar nada más.

```js
window.CARD = {
  name: "Tu Nombre",
  role: "Tu profesión",
  phone: "+34600111222",
  whatsapp: "34600111222",
  ...
};
```

Para usar una foto en vez de iniciales, ponla en `icons/foto.jpg` y en `config.js`:
`photo: "icons/foto.jpg"`.

## ▶️ Cómo verla
Por seguridad, las PWA necesitan un pequeño servidor (no basta con abrir el archivo).

```bash
# Desde esta carpeta:
python3 -m http.server 8000
```
Luego abre **http://localhost:8000** en el navegador.

### Para verla en el móvil
- **Opción fácil:** súbela a un hosting gratis (GitHub Pages, Netlify, Vercel) y
  abre el enlace en el móvil → "Añadir a pantalla de inicio".
- **En la misma red WiFi:** abre `http://IP-DE-TU-PC:8000` desde el móvil.

## 👥 ¿Quieres varias tarjetas?
Sí. Tienes dos formas:
1. **Duplicar la carpeta** y editar el `config.js` de cada copia (una tarjeta por persona).
2. **Modo multi-tarjeta** integrado: ver la sección de abajo / pídemelo y te lo dejo montado.
