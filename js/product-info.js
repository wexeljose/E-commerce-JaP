document.addEventListener("DOMContentLoaded", () => {
  const id = localStorage.getItem("productID");
  if (!id) return;

  // 1) Datos del producto
  const infoURL = PRODUCT_INFO_URL + id + EXT_TYPE;
  getJSONData(infoURL).then((result) => {
    if (result.status !== "ok") return;
    const p = result.data || {};

    // Cargar imagenes y miniaturas
    if (Array.isArray(p.images) && p.images.length) {
      const mainImg = document.getElementById("imagen-principal");
      if (mainImg) mainImg.src = p.images[0];

      const thumbs = document.querySelectorAll(".miniatura");
      thumbs.forEach((imgEl, i) => {
        if (p.images[i]) imgEl.src = p.images[i];
      });
    }

    // Rellenar datos del producto (titulo, categoria, vendidos, precio, descripcion)
    const row = document.querySelector("main .container .row");
    if (row) {
      const cols = row.querySelectorAll(":scope > .col-md-6");
      if (cols.length >= 2) {
        const rightCol = cols[1];
        const titleEl = rightCol.querySelector("h1");
        const categoryEl = rightCol.querySelector("span.badge");
        const ps = rightCol.querySelectorAll(":scope > p");

        if (titleEl) titleEl.textContent = p.name || "";
        if (categoryEl) categoryEl.textContent = p.category || "";
        if (ps[0])
          ps[0].textContent = "Cantidad de vendidos: " + (p.soldCount ?? 0);
        if (ps[1])
          ps[1].textContent = `${p.currency || ""} ${p.cost ?? ""}`.trim();
        if (ps[2]) ps[2].textContent = p.description || "";
      }
    }

    // Productos relacionados
    // Solo si existen productos relacionados en la API
    console.log(p.relatedProducts);
    if (Array.isArray(p.relatedProducts) && p.relatedProducts.length) {
      console.log("Cargando productos relacionados...");
      const contenedor = document.getElementById("related-products");
      if (contenedor) {
        contenedor.innerHTML = "";
        p.relatedProducts.forEach((rp) => {
          // Cada producto relacionado ingresar en el siguiente formato:
          const card = document.createElement("div");
          card.className = "card mb-2 shadow cards-product";
          card.style = "cursor: pointer;";
          card.innerHTML = `
             <img src="${
               rp.image || ""
             }" style="object-fit: contain" class="card-img-top img-fluid" alt="${
            rp.name || ""
          }">
             <div class="card-body">
               <h5 class="card-title">${rp.name || ""}</h5>
             </div>
           `;
          // Al hacer click en el producto relacionado, se debe guardar
          card.addEventListener("click", function () {
            localStorage.setItem("productID", String(rp.id));
            window.location.href = "product-info.html";
          });
          contenedor.appendChild(card);
        });
      }
    }
  });

  // 2) Comentarios del producto (API) -> reemplaza los actuales en #reviews
  const commentsURL = PRODUCT_INFO_COMMENTS_URL + id + EXT_TYPE;
  getJSONData(commentsURL).then((res) => {
    if (res.status !== "ok") return;
    const comments = Array.isArray(res.data) ? res.data : [];

    const contenedorReviews = document.getElementById("reviews");
    if (!contenedorReviews) return;

    // Limpiar comentarios existentes y reemplazar por los de la API
    contenedorReviews.innerHTML = "";

    comments.forEach((c) => {
      const col = document.createElement("div");
      col.className = "col-md-4";

      const card = document.createElement("div");
      card.className = "border rounded p-3";

      const score = Number(c.score) || 0;
      const estrellas = getStars(Number(score));

      card.innerHTML = `
        <strong>${c.user || "Anónimo"}</strong>
        <p>${c.description || ""}</p>
        <div>${estrellas}</div>
        <small>${c.dateTime || c.date || ""}</small>
      `;

      col.appendChild(card);
      contenedorReviews.appendChild(col);
    });
  });
});

/* Guille Estuvo acá */
/* hola guille /*/

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
    const estrellas = getStars(Number(puntuacion));

    const nombreUsuario = localStorage.getItem("usuario") || "Usuario_anónimo";

    // Crear nueva review
    const nuevaReview = document.createElement("div");
    nuevaReview.classList.add("col-md-4");
    const fecha = new Date()
      .toLocaleString("sv-SE", { timeZone: "America/Montevideo" }) // Formato sueco: YYYY-MM-DD HH:mm:ss
      .replace("T", " "); // por si querés quitar la T, aunque sv-SE ya usa espacio
    console.log(fecha);

    nuevaReview.innerHTML = `
      <div class="border rounded p-3">
        <strong>${nombreUsuario}</strong>
        <p>${comentario}</p>
        <div>${estrellas}</div>
        <small>${fecha}</small>
      </div>
    `;

    // Insertar al principio de la lista
    contenedorReviews.prepend(nuevaReview);

    // Limpiar formulario
    inputComentario.value = "";
    selectPuntuacion.value = "1";
  });
});

function getStars(vote) {
  const rating = Math.round(vote);
  let stars = "";
  for (let i = 0; i < 5; i++) {
    // Aquí puedes agregar la lógica para las estrellas vacías
    stars += '<span class="fa fa-star';
    if (i < rating) {
      stars += ' checked text-warning"></span>';
    } else {
      stars += '"></span>';
    }
  }
  return stars;
}

// Boton comprar
const btnComprar = document.getElementById("btn-comprar");
btnComprar.addEventListener("click", () => {
  if (!localStorage.getItem("carrito")) {
    localStorage.setItem(
      "carrito",
      JSON.stringify([localStorage.getItem("productID")])
    );
  } else {
    const carrito = JSON.parse(localStorage.getItem("carrito"));
    carrito.push(localStorage.getItem("productID"));
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
  window.location.href = "cart.html";
});
