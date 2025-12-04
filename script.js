// ============================
// 1. DATOS FIJOS (EDITABLES)
// ============================

// 💌 Cartas que se mostrarán en el mini álbum
const LETTERS = [
  {
    title: "Carta 02 de 100",
    text:
      "Holaaaaaa bonita, espero que cuando leas esto estés teniendo un lindo día y estés muy bien, seré algo breve pero dejándote un bonito mensaje; espero que te guste este pequeño regalo que te estaré dando.\n\n" +
      "Hay una idea que me gustó y me gustaría comenzar… recordarás que te di una nota hace unas dos semanas más o menos y en la parte superior izquierda con un número (1 de 100), quiero comenzarte a dar alguna nota o algo parecido de sorpresa, que te caiga sin aviso y en el plazo de un año si Dios quiere que la nota número 100 sea algo bonito y especial; no esperes nada para que cada nota sea realmente especial viniendo de mí, espero de corazón que este detalle te guste y no te incomode este bonito gesto que quiero tener contigo…\n\n" +
      "Te quieroooooo muchisimoooooooooo bonita!!!",
    date: "Nota 02 de 100",
  },
  // Si quieres agregar más cartas, copia esto:
  // {
  //   title: "Carta 2 de 100",
  //   text: "Aquí va la carta 2...",
  //   date: "Nota 2 de 100",
  // },
];

// ✨ Frases que se verán en la sección de frases
const PHRASES = [
  "Me gusta cómo incluso cuando estás cansada, tu sonrisa sigue siendo mi lugar favorito.",
  "Si supieras lo mucho que pienso en ti, te daría risa y un poco de pena jsj.",
  // Agrega más frases así:
  // "Otra frase bonita para ti...",
];

// 📷 Fotos fijas (asegúrate de subir las imágenes a tu proyecto, por ejemplo carpeta img/)
const PHOTOS = [
  {
     src: "img/1.jpg",
     caption: "Asi de increible te vez siempre ✨",
   },
   {
     src: "img/2.jpg",
     caption: "Esta foto es una prueba para ver como tomaba fotos mi cel jsjs💙",
   },
   {
     src: "img/3.jpg",
     caption: "La primera de muchas fotos que voy a tomar pensando en ti bonita",
   },
   {
     src: "img/4.jpg",
     caption: "Las nubes en la noche todas hermosas pero ninguna como tú 🌥️",
   },
];


// =================================
// 2. NAVEGACIÓN ENTRE PANTALLAS
// =================================

const screens = document.querySelectorAll(".screen");
const backBtn = document.getElementById("backBtn");

function showScreen(id) {
  screens.forEach((s) => s.classList.remove("active"));
  const target = document.getElementById(id);
  if (target) {
    target.classList.add("active");
  }

  if (id === "welcomeScreen") {
    backBtn.classList.remove("visible");
  } else {
    backBtn.classList.add("visible");
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

backBtn.addEventListener("click", () => {
  showScreen("welcomeScreen");
});


// =====================================
// 3. CARTA PRINCIPAL QUE SE ABRE
// =====================================

const envelope = document.getElementById("envelope");
const letterPanels = document.getElementById("letterPanels");
let envelopeOpened = false;

if (envelope) {
  envelope.addEventListener("click", () => {
    if (envelopeOpened) return;
    envelopeOpened = true;

    envelope.style.transition = "transform 0.4s ease, opacity 0.4s ease";
    envelope.style.transform = "translateY(-40px) scale(0.9)";
    envelope.style.opacity = "0";

    setTimeout(() => {
      envelope.style.display = "none";
      letterPanels.classList.add("visible");
    }, 380);
  });
}

if (letterPanels) {
  letterPanels.addEventListener("click", (e) => {
    const panel = e.target.closest(".panel");
    if (!panel) return;
    const targetId = panel.dataset.target;
    if (targetId) showScreen(targetId);
  });
}


// =====================================
// 4. MINI ÁLBUM DE SOBRES (CARTAS)
// =====================================

const lettersAlbum = document.getElementById("lettersAlbum");

function renderLetters() {
  if (!lettersAlbum) return;

  lettersAlbum.innerHTML = "";

  if (!LETTERS.length) {
    const empty = document.createElement("div");
    empty.className = "letters-empty";
    empty.textContent =
      "Todavía no hay cartas. En esta versión, las cartas se agregan editando el archivo script.js 💌";
    lettersAlbum.appendChild(empty);
    return;
  }

  LETTERS.forEach((letter) => {
    const card = document.createElement("div");
    card.className = "letter-card";

    card.innerHTML = `
      <div class="letter-envelope">
        <div class="letter-envelope-body"></div>
        <div class="letter-envelope-flap"></div>
        <div class="letter-seal">❤</div>
      </div>
      <div class="letter-meta">
        <div class="letter-title">${letter.title || "Sin título"}</div>
        <div class="letter-date">${letter.date || ""}</div>
      </div>
      <div class="letter-paper">
        <div class="letter-paper-inner">
          <h4>${letter.title || "Sin título"}</h4>
          <p>${letter.text || ""}</p>
        </div>
      </div>
    `;

    lettersAlbum.appendChild(card);
  });
}

// abrir/cerrar carta del mini álbum
if (lettersAlbum) {
  lettersAlbum.addEventListener("click", (e) => {
    const card = e.target.closest(".letter-card");
    if (!card) return;

    document
      .querySelectorAll(".letter-card.open")
      .forEach((c) => c !== card && c.classList.remove("open"));

    card.classList.toggle("open");
  });
}


// =========================
// 5. FRASES ESTÁTICAS
// =========================

const phrasesList = document.getElementById("phrasesList");
const savePhraseBtn = document.getElementById("savePhraseBtn");

function renderPhrases() {
  if (!phrasesList) return;

  phrasesList.innerHTML = "";

  if (!PHRASES.length) {
    phrasesList.innerHTML =
      '<div class="list-item" style="text-align:center;color:var(--text-muted);">Cuando agregues frases en script.js, aparecerán aquí ✨</div>';
    return;
  }

  PHRASES.slice()
    .reverse()
    .forEach((text) => {
      const item = document.createElement("div");
      item.className = "list-item";
      item.innerHTML = `
        <div class="list-item-header">
          <div class="list-item-title">Frase</div>
          <div class="list-item-date"></div>
        </div>
        <div class="list-item-body">${text}</div>
      `;
      phrasesList.appendChild(item);
    });
}

// si mantienes el botón de guardar frase en el HTML:
if (savePhraseBtn) {
  savePhraseBtn.addEventListener("click", () => {
    alert(
      "En la versión pública, las frases se agregan editando el archivo script.js en la sección PHRASES. ✨"
    );
  });
}


// =========================
// 6. FOTOS ESTÁTICAS
// =========================

const photoInput = document.getElementById("photoInput");
const photoCaptionInput = document.getElementById("photoCaption");
const addPhotosBtn = document.getElementById("addPhotosBtn");
const photoGrid = document.getElementById("photoGrid");

// panel colapsable
const photosForm = document.getElementById("photosForm");
const togglePhotosFormBtn = document.getElementById("togglePhotosForm");

if (togglePhotosFormBtn && photosForm) {
  togglePhotosFormBtn.addEventListener("click", () => {
    const collapsed = photosForm.classList.toggle("photos-input-collapsed");
    togglePhotosFormBtn.setAttribute("aria-expanded", String(!collapsed));
    togglePhotosFormBtn.textContent = collapsed ? "▸" : "▾";
  });
}

function renderPhotos() {
  if (!photoGrid) return;

  photoGrid.innerHTML = "";

  if (!PHOTOS.length) {
    photoGrid.innerHTML =
      '<div class="list-item" style="text-align:center;color:var(--text-muted);grid-column:1/-1;">Todavía no hay fotos. Agrégalas en script.js en la sección PHOTOS 📷</div>';
    return;
  }

  PHOTOS.forEach((photo) => {
    const card = document.createElement("div");
    card.className = "photo-card";
    card.innerHTML = `
      <img src="${photo.src}" alt="Foto" />
      ${
        photo.caption
          ? `<div class="photo-caption">${photo.caption}</div>`
          : ""
      }
    `;
    photoGrid.appendChild(card);
  });
}

// botón "agregar fotos" ahora solo avisa
if (addPhotosBtn) {
  addPhotosBtn.addEventListener("click", () => {
    alert(
      "En la versión pública, las fotos se agregan editando el archivo script.js (sección PHOTOS) y subiendo las imágenes a tu repositorio. 📂"
    );
  });
}


// ==========================================
// 7. LIGHTBOX (PANTALLA COMPLETA + ZOOM)
// ==========================================

const lightbox = document.getElementById("photoLightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");
const zoomInBtn = document.getElementById("zoomInBtn");
const zoomOutBtn = document.getElementById("zoomOutBtn");
const zoomLabel = document.getElementById("zoomLabel");

let currentScale = 1;

function openLightbox(src, captionText = "") {
  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = src;
  if (lightboxCaption) lightboxCaption.textContent = captionText || "";
  currentScale = 1;
  updateZoom();
  lightbox.classList.remove("hidden");
}

function closeLightbox() {
  if (!lightbox || !lightboxImg) return;
  lightbox.classList.add("hidden");
  lightboxImg.src = "";
}

function updateZoom() {
  if (!lightboxImg) return;
  lightboxImg.style.transform = `scale(${currentScale})`;
  if (zoomLabel) {
    zoomLabel.textContent = `${Math.round(currentScale * 100)}%`;
  }
}

if (zoomInBtn) {
  zoomInBtn.addEventListener("click", () => {
    currentScale = Math.min(currentScale + 0.25, 3);
    updateZoom();
  });
}

if (zoomOutBtn) {
  zoomOutBtn.addEventListener("click", () => {
    currentScale = Math.max(currentScale - 0.25, 1);
    updateZoom();
  });
}

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

// cerrar al hacer click en el fondo oscuro
if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (
      e.target === lightbox ||
      e.target.classList.contains("lightbox-backdrop")
    ) {
      closeLightbox();
    }
  });
}

// zoom con scroll (en compu)
if (lightboxImg) {
  lightboxImg.addEventListener("wheel", (e) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.2 : -0.2;
    currentScale = Math.min(3, Math.max(1, currentScale + delta));
    updateZoom();
  });
}

// abrir lightbox al dar click en una foto
if (photoGrid) {
  photoGrid.addEventListener("click", (e) => {
    const card = e.target.closest(".photo-card");
    if (!card) return;

    const img = card.querySelector("img");
    const captionEl = card.querySelector(".photo-caption");
    if (!img) return;

    const captionText = captionEl ? captionEl.textContent : "";
    openLightbox(img.src, captionText);
  });
}


// ====================
// 8. RENDER INICIAL
// ====================

renderLetters();
renderPhrases();
renderPhotos();
