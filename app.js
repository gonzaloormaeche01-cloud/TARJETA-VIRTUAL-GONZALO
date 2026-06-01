// ============================================================
//  Lógica de la tarjeta — normalmente no necesitas tocar esto
// ============================================================
(function () {
  const C = window.CARD || {};

  const $ = (id) => document.getElementById(id);
  const setText = (id, value) => { const el = $(id); if (el && value != null && value !== "") el.textContent = value; };

  // --- Tema ---
  if (C.theme) {
    const r = document.documentElement.style;
    if (C.theme.bg1) r.setProperty("--bg1", C.theme.bg1);
    if (C.theme.bg2) r.setProperty("--bg2", C.theme.bg2);
    if (C.theme.accent) r.setProperty("--accent", C.theme.accent);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta && C.theme.bg1) meta.setAttribute("content", C.theme.bg1);
  }

  // --- Datos básicos ---
  document.title = (C.name ? C.name + " · " : "") + "Tarjeta Virtual";
  setText("name", C.name);
  setText("role", C.role);
  setText("tagline", C.tagline);
  setText("bio", C.bio);
  setText("location", C.location);

  // Logo de empresa
  const logoEl = $("logo");
  if (logoEl) {
    if (C.logo) { logoEl.src = C.logo; logoEl.alt = (C.name || "") + " logo"; logoEl.hidden = false; }
    else { logoEl.hidden = true; }
  }

  // Avatar: foto o iniciales
  const avatar = $("avatar");
  if (C.photo) {
    // Precarga: si la foto falla, dejamos las iniciales
    const probe = new Image();
    probe.onload = () => { avatar.style.backgroundImage = `url('${C.photo}')`; avatar.textContent = ""; };
    probe.onerror = () => { if (C.initials) avatar.textContent = C.initials; };
    probe.src = C.photo;
    if (C.initials) avatar.textContent = C.initials; // placeholder mientras carga
  } else if (C.initials) {
    avatar.textContent = C.initials;
  }

  // --- Enlaces de contacto ---
  function link(id, href, show) {
    const el = $(id);
    if (!el) return;
    const item = el.closest(".social-item") || el;
    if (show && href) { el.href = href; item.classList.remove("hidden"); }
    else { item.classList.add("hidden"); }
  }

  link("link-phone", C.phone ? `tel:${C.phone}` : null, C.phone);
  link("link-email", C.email ? `mailto:${C.email}` : null, C.email);
  link("link-whatsapp", C.whatsapp ? `https://wa.me/${C.whatsapp}` : null, C.whatsapp);
  link("link-linkedin", C.linkedin, C.linkedin);
  link("link-instagram", C.instagram, C.instagram);

  // Web y email en el reverso
  const webEl = $("website");
  if (webEl) {
    if (C.website) { webEl.href = C.website; webEl.textContent = C.website.replace(/^https?:\/\//, ""); webEl.parentElement.style.display = ""; }
    else { webEl.parentElement.style.display = "none"; }
  }
  const emailText = $("email-text");
  if (emailText) {
    if (C.email) { emailText.href = `mailto:${C.email}`; emailText.textContent = C.email; emailText.parentElement.style.display = ""; }
    else { emailText.parentElement.style.display = "none"; }
  }

  // --- Voltear tarjeta ---
  const card = $("card");
  $("flipBtn")?.addEventListener("click", () => card.classList.add("flipped"));
  $("flipBackBtn")?.addEventListener("click", () => card.classList.remove("flipped"));

  // --- Código QR ---
  const qrOverlay = $("qrOverlay");
  if (C.qrImage) $("qrImg")?.setAttribute("src", C.qrImage);
  const qrUrlEl = $("qrUrl");
  if (qrUrlEl && C.cardUrl) qrUrlEl.textContent = C.cardUrl.replace(/^https?:\/\//, "");
  const openQR = () => { if (qrOverlay) qrOverlay.hidden = false; };
  const closeQR = () => { if (qrOverlay) qrOverlay.hidden = true; };
  $("qrBtn")?.addEventListener("click", openQR);
  $("qrClose")?.addEventListener("click", closeQR);
  qrOverlay?.addEventListener("click", (e) => { if (e.target === qrOverlay) closeQR(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeQR(); });

  // --- Guardar contacto (vCard) ---
  function buildVCard() {
    const lines = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${C.name || ""}`,
      C.role ? `TITLE:${C.role}` : "",
      C.email ? `EMAIL;TYPE=INTERNET:${C.email}` : "",
      C.phone ? `TEL;TYPE=CELL:${C.phone}` : "",
      C.website ? `URL:${C.website}` : "",
      C.location ? `ADR;TYPE=HOME:;;${C.location};;;;` : "",
      C.bio ? `NOTE:${C.bio.replace(/\n/g, " ")}` : "",
      "END:VCARD"
    ].filter(Boolean);
    return lines.join("\r\n");
  }

  $("saveContact")?.addEventListener("click", (e) => {
    e.preventDefault();
    const blob = new Blob([buildVCard()], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(C.name || "contacto").replace(/\s+/g, "_")}.vcf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });

  // --- Instalación PWA ---
  let deferredPrompt = null;
  const installBtn = $("installBtn");

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (installBtn) installBtn.hidden = false;
  });

  installBtn?.addEventListener("click", async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    installBtn.hidden = true;
  });

  // Pista para iOS (no soporta beforeinstallprompt)
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
  if (isIOS && !isStandalone) {
    const hint = $("iosHint");
    if (hint) hint.hidden = false;
  }

  // --- Service worker (offline) ---
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("service-worker.js").catch(() => {});
    });
  }
})();
