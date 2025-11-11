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


function finalizarCompra() {

  const tipoEnvio = document.getElementById("envio").value;
  const tipoPago = document.getElementById("pago").value;

  if (tipoEnvio !== "" && tipoPago !== "") {
    alert("¡Gracias por su compra!");
  } else {
    alert("Por favor, seleccione un tipo de envío y una forma de pago antes de finalizar la compra.");
  }

}
const botonFinalizar = document.getElementById("finalizarPago");
botonFinalizar.addEventListener("click", () => {
  finalizarCompra();
});