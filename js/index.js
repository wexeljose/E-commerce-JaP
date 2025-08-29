document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("autos").addEventListener("click", function () {
    localStorage.setItem("catID", 101);
    window.location = "products.html";
  });
  document.getElementById("juguetes").addEventListener("click", function () {
    localStorage.setItem("catID", 102);
    window.location = "products.html";
  });
  document.getElementById("muebles").addEventListener("click", function () {
    localStorage.setItem("catID", 103);
    window.location = "products.html";
  });
});

const user = localStorage.getItem("usuario");

if (user) {
  console.log("Usuario encontrado");
  const userName = user;

  const userAvatar = document.getElementById("user-avatar");
  const usernameSpan = document.getElementById("username");

  usernameSpan.textContent = userName;

  const encodedName = encodeURIComponent(userName);
  const apiUrl = `https://ui-avatars.com/api/?name=${encodedName}&background=random&size=30`;

  userAvatar.src = apiUrl;
}
