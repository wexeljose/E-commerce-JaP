document.addEventListener("DOMContentLoaded", function () {
  const usuario = localStorage.getItem("usuario");
  document.getElementById("avatar").src =
    "https://ui-avatars.com/api/?name=" +
    usuario +
    "&background=random&size=30";
});
