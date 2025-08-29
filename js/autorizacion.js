function moverALogin() {
  window.location.href = "login.html";
}

function moverAIndex() {
  window.location.href = "index.html";
}

function revisarLogin() {
  const usuario = localStorage.getItem("usuario");
  if (usuario == null) {
    console.log("Usuario no está logueado.");
    moverALogin();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const usuario = localStorage.getItem("usuario");
  if (usuario != null)  {
    console.log("Usuario encontrado");
    const userName = usuario;

    const userAvatar = document.getElementById("user-avatar");
    const usernameSpan = document.getElementById("username");

    usernameSpan.textContent = userName;

    const encodedName = encodeURIComponent(userName);
    const apiUrl = `https://ui-avatars.com/api/?name=${encodedName}&background=random&size=30`;

    userAvatar.src = apiUrl;
  }
});

revisarLogin();
