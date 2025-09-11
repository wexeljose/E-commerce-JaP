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
