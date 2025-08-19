function moverALogin() {
  window.location.href = "login.html";
}

function moverAIndex() {
  window.location.href = "index.html";
}

function revisarLogin() {
  const usuario = localStorage.getItem("usuario");
  if (usuario == null) {
    console.log("Usuario ya está logueado: " + usuario);
    moverALogin();
  }
}

revisarLogin();
