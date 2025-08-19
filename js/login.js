document.getElementById("botonLogin").addEventListener("click", procesarLogin);

function procesarLogin() {
  if (validacion()) {
    localStorage.setItem(
      "usuario",
      document.getElementById("usuario").value.trim()
    );
    moverAIndex();
  }
}

function moverAIndex() {
  window.location.href = "index.html";
}

function validacion() {
  return true;
}
