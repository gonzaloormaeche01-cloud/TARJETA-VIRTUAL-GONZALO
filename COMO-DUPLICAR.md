# 🔁 Cómo duplicar esta tarjeta para otra persona

Tienes dos caminos. La **Opción A** es la más rápida y fiable (copia exacta).

---

## ✅ Opción A — Copiar el proyecto (recomendada, sin programar)

1. **Descarga este repo**: botón verde **Code → Download ZIP** y descomprime.
2. **Crea un repo nuevo** en GitHub (nombre en **minúsculas**, p. ej. `tarjeta-maria`).
   > Usa minúsculas para evitar el lío de mayúsculas en la URL de GitHub Pages.
3. **Sube todos los archivos** del ZIP al repo nuevo (Add file → Upload files).
4. **Edita `config.js`** con los datos de la nueva persona (ver lista abajo).
5. Sube su **foto** a `fotos/` (como `foto.jpg`) y su **logo** si lo tiene.
6. **Regenera el QR** con la nueva URL (ver nota al final) — o pídeselo a Claude.
7. **Settings → Pages → Deploy from a branch →** rama `main` + `/ (root)` → Save.
8. Repo en **público** (Settings → Danger Zone) para que Pages funcione gratis.

Tu enlace será: `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`

---

## 🤖 Opción B — Pedírselo a Claude en el espacio nuevo

Copia y pega este mensaje en la nueva sesión, **rellenando tus datos**:

> Quiero una **tarjeta de presentación digital** como **PWA estática** (HTML, CSS y JS,
> sin frameworks), para abrir en el móvil y guardar en la pantalla de inicio.
> Requisitos:
> - Una sola pantalla con: **logo de empresa** arriba, **foto/avatar** circular,
>   nombre, cargo y una frase; con **efecto flip** a un reverso "Sobre mí".
> - Botones de contacto con **icono + etiqueta de texto debajo** (Llamar, Email,
>   WhatsApp, LinkedIn, Instagram); cada botón se oculta si el dato está vacío.
> - Botón **"Guardar contacto"** que descarga una **vCard (.vcf)**.
> - Botón **"Mostrar QR"** que abre el QR del enlace de la tarjeta en una ventana
>   (IMPORTANTE: el QR debe estar oculto al cargar y abrirse SOLO con el botón;
>   añade la regla CSS `.qr-overlay[hidden]{display:none!important}` para que el
>   `display:flex` no anule el atributo `hidden`).
> - Todos los textos y datos en un único archivo **`config.js`** fácil de editar,
>   con un objeto de **tema** (3 colores: fondo1, fondo2, acento).
> - **NO uses service worker / caché offline** (da problemas de versiones pegadas);
>   que la web cargue siempre fresca.
> - `manifest.json` + iconos para poder "Añadir a pantalla de inicio".
> - Genera el **QR** con la URL pública final.
> Mis datos: (pega aquí la lista de abajo)

---

## 📋 Datos que tienes que dar (rellena estos)

- **Nombre y apellidos:**
- **Cargo / profesión:**
- **Frase corta (tagline):**
- **Empresa y logo:** (sí/no, y adjunta el logo)
- **Foto de perfil:** (adjunta la imagen) o iniciales
- **Biografía (reverso "Sobre mí"):**
- **Ubicación:**
- **Web:**
- **Email:**
- **Teléfono** (con prefijo, ej. +34...):
- **WhatsApp** (sin + ni espacios, ej. 34666...):
- **LinkedIn:**
- **Instagram** (opcional):
- **Colores corporativos** (3 en hex, ej. fondo `#002D4B`, fondo2 `#21557C`, acento `#80BC51`):
- **URL pública final** (para el QR), ej. `https://usuario.github.io/repo/`

---

## ⚙️ Nota: regenerar el QR

El QR es una imagen (`fotos/qr.png`) con la URL pública. Para regenerarlo, pídeselo a
Claude ("regenera el QR con esta URL: ...") o usa cualquier generador de QR online y
guarda la imagen como `fotos/qr.png`.

## ⚠️ Lecciones aprendidas (para que no se repitan los fallos)
- **URL de GitHub Pages distingue mayúsculas/minúsculas** → nombra el repo en minúsculas.
- **Repo privado = Pages no funciona gratis** → ponlo público.
- **Sin service worker** → se evitan versiones viejas "pegadas" en caché.
- La regla `.qr-overlay[hidden]{display:none!important}` evita que el QR salga solo.
