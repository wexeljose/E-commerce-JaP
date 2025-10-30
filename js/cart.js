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

function ocultarBadge() {
  const avatar = document.getElementById("userDropdown");
  const badgeNoti = document.getElementById("badge-notificacion");
  const dropdownToggle = document.querySelector('[data-bs-toggle="dropdown"]');

  // 🔹 Oculta el badge al hacer clic en el avatar (abrir el menú)
  if (avatar && badgeNoti) {
    avatar.addEventListener("click", () => {
      badgeNoti.classList.add("d-none");
    });
  }

  // 🔹 Al cerrar el menú, solo mostrar el badge si hay productos en el carrito
  if (dropdownToggle && badgeNoti) {
    dropdownToggle.addEventListener("hide.bs.dropdown", () => {
      try {
        const data = localStorage.getItem("carrito");
        const carrito = data && data.trim() !== "" ? JSON.parse(data) : [];

        if (carrito.length > 0) {
          badgeNoti.classList.remove("d-none");
        } else {
          badgeNoti.classList.add("d-none");
        }
      } catch (error) {
        console.warn("⚠️ Error al leer o parsear el carrito en ocultarBadge:", error);
        badgeNoti.classList.add("d-none");
      }
    });
  }
}
