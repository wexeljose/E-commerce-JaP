function moverALogin() {
  window.location.href = "login.html";
}

function moverAIndex() {
  window.location.href = "index.html";
}

function cerrarSesion() {
  localStorage.removeItem("usuario");
  moverALogin();
}

function revisarLogin() {
  const usuario = localStorage.getItem("usuario");
  if (usuario == null) {
    console.log("Usuario no está logueado.");
    moverALogin();
  }
}

function mostrarDatosUsuarioGlobal() {
  const usuario = localStorage.getItem("usuario");
  if (!usuario) return;

  const encodedName = encodeURIComponent(usuario);

  const spans = document.querySelectorAll("#username, .username, [data-username]");
  spans.forEach((el) => (el.textContent = usuario));

  const logoutBtns = document.querySelectorAll("#logout-btn, .logout-btn, [data-logout-btn]");
  logoutBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      if (confirm("¿Estás seguro que deseas cerrar sesión?")) {
        cerrarSesion();
      }
    });
  });
}

function actualizarNavbar() {
  const usuario = localStorage.getItem("usuario");
  if (usuario != null) {
    console.log("Usuario encontrado:", usuario);
    inicializarAvatarNavbar();
    mostrarDatosUsuarioGlobal();
  } else {
    console.warn("No se encontró usuario en el almacenamiento local.");
  }
}

function reinicializarBootstrapNavbar() {
  if (typeof bootstrap !== "undefined") {
    const toggler = document.querySelector(".navbar-toggler");
    if (toggler) {
      toggler.addEventListener("click", function () {
        const targetSelector = toggler.getAttribute("data-bs-target");
        const target = document.querySelector(targetSelector);
        if (target) {
          target.classList.toggle("show");
        }
      });
    }
  } else {
    console.warn("Bootstrap no está cargado o no disponible.");
  }
}

function actualizarBadgeCarrito() {
   console.log("antes de todo");
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const cantidadItems = carrito.length;
  const badge = document.getElementById("carrito-badge");
 console.log("antes if");
  if (badge) {
    console.log("cantidad de items " + cantidadItems);
    badge.textContent = cantidadItems;
  } else {
    console.warn("⚠️ No se encontró el badge con id carrito-badge");
        console.log("else");
  }
}

function inicializarAvatarNavbar() {
  const avatar = localStorage.getItem("avatar");
  const usuario = localStorage.getItem("usuario") || "Usuario";

  const avatarElement = document.getElementById("user-avatar");
  if (avatarElement) {
    if (avatar) {
      avatarElement.src = avatar;
    } else {
      avatarElement.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        usuario
      )}&background=random&size=35`;
    }
  }
}

revisarLogin();

document.addEventListener("DOMContentLoaded", function () {
  const navbarContainer = document.getElementById("navbar");
  if (navbarContainer) {
    fetch("navbar.html")
      .then((res) => res.text())
      .then((data) => {
        navbarContainer.innerHTML = data;

        reinicializarBootstrapNavbar();
        actualizarNavbar();

        if (typeof actualizarBadgeCarrito === "function") {
          actualizarBadgeCarrito();
        } else {
          console.warn("⚠️ actualizarBadgeCarrito no está definida.");
        }

        ocultarBadge();

      })
      .catch((err) => console.error("Error al cargar navbar:", err));
  } else {
    mostrarDatosUsuarioGlobal();
  }
});

function ocultarBadge() {
  const avatar = document.getElementById("userDropdown");
  const badgeNoti = document.getElementById("badge-notificacion");
  const dropdownToggle = document.querySelector('[data-bs-toggle="dropdown"]');

  if (avatar && badgeNoti) {
    avatar.addEventListener("click", () => {
      badgeNoti.classList.add("d-none");
    });
  }

  if (dropdownToggle && badgeNoti) {
    dropdownToggle.addEventListener("hide.bs.dropdown", () => {
      badgeNoti.classList.remove("d-none");
    });
  }
}