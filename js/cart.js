function actualizarBadgeCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const cantidadItems = carrito.length;

  const badgeNoti = document.getElementById("badge-notificacion");
  const badgeDropdown = document.getElementById("badge-carrito-dropdown");

  if (badgeNoti) {
    badgeNoti.textContent = cantidadItems;
    // Solo mostrar si hay algo
    if (cantidadItems > 0) {
      badgeNoti.classList.remove("d-none");
    }
  }

  if (badgeDropdown) {
    badgeDropdown.textContent = cantidadItems;
  }
}