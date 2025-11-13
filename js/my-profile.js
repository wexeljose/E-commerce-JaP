// Esperar que el DOM cargue completamente
document.addEventListener("DOMContentLoaded", () => {
  inicializarAvatar();
  document
    .getElementById("avatar-upload")
    .addEventListener("change", manejarSubida);
});

// 🔹 Cargar avatar desde localStorage o usar uno por defecto
function inicializarAvatar() {
  const avatar = localStorage.getItem("avatar");
  const usuario = localStorage.getItem("usuario") || "Usuario";

  const avatarElement = document.getElementById("avatar");
  if (avatar) {
    avatarElement.src = avatar;
  } else {
    avatarElement.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      usuario
    )}&background=random&size=100`;
  }
}

// 🔹 Cuando el usuario selecciona una imagen
function manejarSubida(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const cuadrada = recortarImagenCuadrada(img);
      const base64 = cuadrada.toDataURL("image/png");
      localStorage.setItem("avatar", base64); // persistir
      actualizarAvatar(base64);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// 🔹 Recorta la imagen al centro para hacerla cuadrada
function recortarImagenCuadrada(img) {
  const size = Math.min(img.width, img.height);
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const x = (img.width - size) / 2;
  const y = (img.height - size) / 2;
  ctx.drawImage(img, x, y, size, size, 0, 0, size, size);
  return canvas;
}

// 🔹 Actualiza el avatar mostrado
function actualizarAvatar(base64) {
  const avatar = document.getElementById("avatar");
  avatar.src = base64;
}

function guardarPerfilEnLocalStorage() {
  const perfil = {
    nombre: document.getElementById("nombrePerfil").value.trim(),
    apellido: document.getElementById("apellidoPerfil").value.trim(),
    email: document.getElementById("emailPerfil").value.trim(),
    telefono: document.getElementById("telPerfil").value.trim()
  };

  localStorage.setItem("perfilUsuario", JSON.stringify(perfil));

  return perfil;
}

document.getElementById("profileForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const perfilGuardado = guardarPerfilEnLocalStorage();

  mostrarToast("Perfil actualizado con éxito.");
});

function cargarPerfilDesdeLocalStorage() {
  const perfilJSON = localStorage.getItem("perfilUsuario");
  if (perfilJSON) {
    const perfil = JSON.parse(perfilJSON);
    document.getElementById("nombrePerfil").value = perfil.nombre || "";
    document.getElementById("apellidoPerfil").value = perfil.apellido || "";
    document.getElementById("emailPerfil").value = perfil.email || "";
    document.getElementById("telPerfil").value = perfil.telefono || "";
  }
}
// Cargar el perfil al iniciar la página
document.addEventListener("DOMContentLoaded", cargarPerfilDesdeLocalStorage);