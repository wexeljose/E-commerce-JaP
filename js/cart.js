
function actualizarBadgeCarrito() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const cantidadItems = carrito.length;
  const badge = document.getElementById('carrito-badge');

  if (badge) {
    badge.textContent = cantidadItems;
  } else {
    console.warn("No se encontró el badge con id carrito-badge");
  }
}
