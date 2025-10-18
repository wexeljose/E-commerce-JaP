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

/**
 * 🔹 Muestra el nombre y avatar del usuario en cualquier parte del sitio.
 */
function mostrarDatosUsuarioGlobal() {
  const usuario = localStorage.getItem("usuario");
  if (!usuario) return;

  const encodedName = encodeURIComponent(usuario);
  const apiUrl = `https://ui-avatars.com/api/?name=${encodedName}&background=random&size=35`;

  const spans = document.querySelectorAll("#username, .username, [data-username]");
  spans.forEach((el) => (el.textContent = usuario));

  const avatars = document.querySelectorAll("#user-avatar, .user-avatar, [data-user-avatar]");
  avatars.forEach((el) => {
    if (el.tagName === "IMG") el.src = apiUrl;
    else el.style.backgroundImage = `url('${apiUrl}')`;
  });

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

/**
 * 🔹 Actualiza los datos del navbar (se ejecuta luego de cargar navbar.html).
 */
function actualizarNavbar() {
  const usuario = localStorage.getItem("usuario");
  if (usuario != null) {
    console.log("Usuario encontrado:", usuario);
    mostrarDatosUsuarioGlobal();
  } else {
    console.warn("No se encontró usuario en el almacenamiento local.");
  }
}

/**
 * 🔹 Re-inicializa los componentes de Bootstrap cuando el navbar se carga dinámicamente.
 */
function reinicializarBootstrapNavbar() {
  // Solo se ejecuta si Bootstrap está disponible
  if (typeof bootstrap !== "undefined") {
    const toggler = document.querySelector(".navbar-toggler");
    if (toggler) {
      // Reasigna el comportamiento de colapsar
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

// --- Flujo principal ---

revisarLogin();

document.addEventListener("DOMContentLoaded", function () {
  const navbarContainer = document.getElementById("navbar");
  if (navbarContainer) {
    fetch("navbar.html")
      .then((res) => res.text())
      .then((data) => {
        navbarContainer.innerHTML = data;

        // 🔹 Re-inicializamos el navbar y usuario una vez cargado
        reinicializarBootstrapNavbar();
        actualizarNavbar();
      })
      .catch((err) => console.error("Error al cargar navbar:", err));
  } else {
    mostrarDatosUsuarioGlobal();
  }
});

