function moverALogin() {
  window.location.href = "login.html";
}

function moverAIndex() {
  window.location.href = "index.html";
}

function cerrarSesion() {
  localStorage.removeItem("usuario");
  // Si guardas más cosas en localStorage, límpialas también:
  // localStorage.clear(); // Esto borra TODO
  moverALogin();
}

function revisarLogin() {
  const usuario = localStorage.getItem("usuario");
  if (usuario == null) {
    console.log("Usuario no está logueado.");
    moverALogin();
  }
}

function actualizarNavbar() {
  const usuario = localStorage.getItem("usuario");
  if (usuario != null) {
    console.log("Usuario encontrado");
    const userName = usuario;

    const userAvatar = document.getElementById("user-avatar");
    const usernameSpan = document.getElementById("username");

    if (userAvatar && usernameSpan) {
      usernameSpan.textContent = userName;

      const encodedName = encodeURIComponent(userName);
      const apiUrl = `https://ui-avatars.com/api/?name=${encodedName}&background=random&size=35`;

      userAvatar.src = apiUrl;

      // AQUÍ conectamos el botón de cerrar sesión
      const logoutBtn = document.getElementById("logout-btn");
      if (logoutBtn) {
        logoutBtn.addEventListener("click", function (e) {
          e.preventDefault(); // Evita que el enlace haga su acción por defecto
          if (confirm("¿Estás seguro que deseas cerrar sesión?")) {
            cerrarSesion();
          }
        });
      }
    } else {
      console.warn("Navbar aún no está cargado en el DOM");
    }
  }
}

// Llamamos primero a la validación de login
revisarLogin();

// Cuando la página termine de cargar, intentamos actualizar el navbar
document.addEventListener("DOMContentLoaded", function () {
  fetch("navbar.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("navbar").innerHTML = data;
      // Ahora que el nav existe en el DOM, actualizamos el usuario
      actualizarNavbar();
    });
});
