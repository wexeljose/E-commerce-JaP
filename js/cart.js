function actualizarBadgeCarrito() {
  let carrito = [];

  try {
    const data = localStorage.getItem("carrito");
    carrito = data && data.trim() !== "" ? JSON.parse(data) : [];
  } catch (error) {
    console.warn("⚠️ Error al leer o parsear el carrito:", error);
    carrito = [];
  }

  const cantidadItems = carrito.length;

  const badgeNoti = document.getElementById("badge-notificacion");
  const badgeDropdown = document.getElementById("badge-carrito-dropdown");

  if (badgeNoti) {
    badgeNoti.textContent = cantidadItems;
    badgeNoti.classList.toggle("d-none", cantidadItems === 0);
  }

  if (badgeDropdown) {
    badgeDropdown.textContent = cantidadItems;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const camposDireccion = [
    { id: "inputState", mensaje: "Por favor, seleccione un departamento." },
    { id: "inputNumber", mensaje: "Por favor, ingrese un número de casa." },
    { id: "inputCity", mensaje: "Por favor, ingrese una localidad." },
    { id: "inputCross", mensaje: "Por favor, ingrese una esquina." },
    { id: "inputAddress", mensaje: "Por favor, ingrese una calle." },
  ];

  const mostrarToast = (mensaje, tipo = "info") => {
    const toastContainer = document.getElementById("toastContainer");
    if (!toastContainer) return;

    const toast = document.createElement("div");
    toast.className = `toast align-items-center text-bg-${tipo} border-0 show mb-2`;
    toast.role = "alert";
    toast.innerHTML = `
      <div class="d-flex">
        <div class="toast-body fw-semibold">${mensaje}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto"
                data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    `;

    toastContainer.appendChild(toast);

    const bsToast = new bootstrap.Toast(toast, { delay: 3500 });
    bsToast.show();

    toast.addEventListener("hidden.bs.toast", () => toast.remove());
  };


  const validarCampos = (campos) => {
    for (const campo of campos) {
      const valor = document.getElementById(campo.id)?.value.trim();
      if (!valor) {
        mostrarToast(campo.mensaje, "danger");
        return false;
      }
    }
    return true;
  };

  const producto = localStorage.getItem("carrito");

  const finalizarCompra = () => {
    const tipoEnvio = document.getElementById("envio").value.trim();
    const tipoPago = document.getElementById("pago").value.trim();


    if (!validarCampos(camposDireccion)) return;

    if (!tipoPago) {
      mostrarToast("Seleccione una forma de pago antes de finalizar la compra.", "danger");
      return;
    }

    if (!tipoEnvio) {
      mostrarToast("Seleccione una forma de envío antes de finalizar la compra.", "danger");
      return;
    }

    if (!producto) {
      mostrarToast("Seleccione un producto para comprar.", "danger");
      return;
    }

    mostrarToast("¡Gracias por su compra!", "success");

    limpiarCampos();
  };

  const limpiarCampos = () => {
    [...camposDireccion.map(c => c.id), "envio", "pago", producto].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = "";
    });
  };


  document.getElementById("finalizarPago")?.addEventListener("click", finalizarCompra);
  document.getElementById("btnIngresar")?.addEventListener("click", () => validarCampos(camposDireccion));
});
