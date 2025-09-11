
document.addEventListener('DOMContentLoaded', () => {
  const id = localStorage.getItem('productID');
  if (!id) return;

  // 1) Datos del producto
  const infoURL = PRODUCT_INFO_URL + id + EXT_TYPE;
  getJSONData(infoURL).then((result) => {
    if (result.status !== 'ok') return;
    const p = result.data || {};

   
    if (Array.isArray(p.images) && p.images.length) {
      const mainImg = document.getElementById('imagen-principal');
      if (mainImg) mainImg.src = p.images[0];

      const thumbs = document.querySelectorAll('.miniatura');
      thumbs.forEach((imgEl, i) => {
        if (p.images[i]) imgEl.src = p.images[i];
      });
    }

   
    const row = document.querySelector('main .container .row');
    if (row) {
      const cols = row.querySelectorAll(':scope > .col-md-6');
      if (cols.length >= 2) {
        const rightCol = cols[1];
        const titleEl = rightCol.querySelector('h1');
        const categoryEl = rightCol.querySelector('span.badge');
        const ps = rightCol.querySelectorAll(':scope > p');

        if (titleEl) titleEl.textContent = p.name || '';
        if (categoryEl) categoryEl.textContent = p.category || '';
        if (ps[0]) ps[0].textContent = 'Cantidad de vendidos: ' + (p.soldCount ?? 0);
        if (ps[1]) ps[1].textContent = `${p.currency || ''} ${p.cost ?? ''}`.trim();
        if (ps[2]) ps[2].textContent = p.description || '';
      }
    }
  });

  // 2) Comentarios del producto (API) -> reemplaza los actuales en #reviews
  const commentsURL = PRODUCT_INFO_COMMENTS_URL + id + EXT_TYPE;
  getJSONData(commentsURL).then((res) => {
    if (res.status !== 'ok') return;
    const comments = Array.isArray(res.data) ? res.data : [];

    const contenedorReviews = document.getElementById('reviews');
    if (!contenedorReviews) return;

    // Limpiar comentarios existentes y reemplazar por los de la API
    contenedorReviews.innerHTML = '';

    comments.forEach((c) => {
      const col = document.createElement('div');
      col.className = 'col-md-4';

      const card = document.createElement('div');
      card.className = 'border rounded p-3';

      const score = Number(c.score) || 0;
      const estrellas = '★'.repeat(score) + '☆'.repeat(5 - score);

      card.innerHTML = `
        <strong>${c.user || 'Anónimo'}</strong>
        <p>${c.description || ''}</p>
        <p>${estrellas}</p>
        <small>${c.dateTime || c.date || ''}</small>
      `;

      col.appendChild(card);
      contenedorReviews.appendChild(col);
    });
  });
});






document.addEventListener("DOMContentLoaded", () => {
  const btnEnviar = document.getElementById("enviar");
  const inputComentario = document.getElementById("comentario");
  const selectPuntuacion = document.getElementById("puntuacion");
  const contenedorReviews = document.getElementById("reviews");

  btnEnviar.addEventListener("click", () => {
    const comentario = inputComentario.value.trim();
    const puntuacion = selectPuntuacion.value;

    if (comentario === "") {
      alert("Por favor escribe un comentario.");
      return;
    }

    // Crear estrellas
    const estrellas = "★".repeat(puntuacion) + "☆".repeat(5 - puntuacion);

    // Crear nueva review
    const nuevaReview = document.createElement("div");
    nuevaReview.classList.add("col-md-4");
    nuevaReview.innerHTML = `
      <div class="border rounded p-3">
        <strong>Usuario_anónimo</strong>
        <p>${comentario}</p>
        <p>${estrellas}</p>
        <small>${new Date().toISOString().split("T")[0]}</small>
      </div>
    `;

    // Insertar al principio de la lista
    contenedorReviews.prepend(nuevaReview);

    // Limpiar formulario
    inputComentario.value = "";
    selectPuntuacion.value = "1";
  });
});
