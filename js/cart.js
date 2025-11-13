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
    if (cantidadItems > 0) {
      badgeNoti.classList.remove("d-none");
    } else {
      badgeNoti.classList.add("d-none");
    }
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

  const validarCampos = (campos) => {
    for (const campo of campos) {
      const valor = document.getElementById(campo.id)?.value.trim();
      if (!valor) {
        alert(campo.mensaje);
        return false;
      }
    }
    return true;
  };

  const finalizarCompra = () => {
    const tipoEnvio = document.getElementById("envio").value.trim();
    const tipoPago = document.getElementById("pago").value.trim();

    // Verifica primero los campos de dirección
    if (!validarCampos(camposDireccion)) return;

    if (!tipoPago) {
      alert("Por favor, seleccione una forma de pago antes de finalizar la compra.");
      return;
    }

    if (!tipoEnvio) {
      alert("Por favor, seleccione una forma de envío antes de finalizar la compra.");
      return;
    }

    alert("¡Gracias por su compra!");
    limpiarCampos();
  };

  const limpiarCampos = () => {
    [...camposDireccion.map(c => c.id), "envio", "pago"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = "";
    });
  };

  // Event listeners
  document.getElementById("finalizarPago")?.addEventListener("click", finalizarCompra);
  document.getElementById("btnIngresar")?.addEventListener("click", () => validarCampos(camposDireccion));
});
