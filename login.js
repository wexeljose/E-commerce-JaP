document.getElementById("botonLogin").addEventListener("click", procesarLogin);

function procesarLogin() {
  if (validacion()) {
    localStorage.setItem(
      "usuario",
      document.getElementById("usuario").value.trim()
    );
    moverAIndex();
  } else {
    alert("Por favor, complete todos los campos.");
  }
}

function moverAIndex() {
  window.location.href = "index.html";
}

function validacion() {
  let campoUsuario = document.getElementById("usuario");
  let campoContrasena = document.getElementById("password");

  if (!campoUsuario || !campoContrasena) {
    console.error("No se encontraron los inputs en el DOM.");
    return false;
  }

  let usuario = campoUsuario.value.trim();
  let contrasena = campoContrasena.value.trim();

  return usuario !== "" && contrasena !== "";
}
