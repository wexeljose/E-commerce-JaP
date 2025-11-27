document.getElementById("botonLogin").addEventListener("click", procesarLogin);

async function procesarLogin() {
  if (validacion()) {
    try {
      fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario: document.getElementById("usuario").value.trim(),
          password: document.getElementById("password").value.trim(),
        }),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Error en el inicio de sesión");
          return response.json();
        })
        .then((data) => {
          const token = data.token;
          console.log("Token recibido:", token);
          localStorage.setItem("token", token);
        });
    } catch (error) {
      console.error("Error al procesar el inicio de sesión:", error);
      alert("Hubo un error al iniciar sesión. Intente nuevamente más tarde.");
      return;
    }

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
