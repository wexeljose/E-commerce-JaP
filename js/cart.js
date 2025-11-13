
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

    console.log(producto);

    if (!producto || producto.length === 0 || producto === "[]") {
      console.log("dentro del if producto");
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
