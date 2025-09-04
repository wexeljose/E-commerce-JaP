let ALL_PRODUCTS = [];

function init() {
  console.log("Aplicación inicializada");
  loadProducts();
}

function loadProducts() {
  const catID = localStorage.getItem("catID");
  fetch(`https://japceibal.github.io/emercado-api/cats_products/${catID}.json`)
    .then((response) => response.json())
    .then((data) => {
      console.log("Productos cargados:", data);
      ALL_PRODUCTS = data.products;
      showCards(data);
      setupLiveSearch();   // buscador en página
      setupNavSearch();    // buscador en la barra de navegación
    })
    .catch((error) => {
      console.error("Error al cargar productos:", error);
    });
}

function showCards(data) {
  const container = document.getElementById("product-list");
  container.innerHTML = "";

  data.products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "card mb-2 shadow";
    card.innerHTML = `
      <img src="${product.image}" class="card-img-top" alt="${product.name}">
      <div class="card-body">
        <h5 class="card-title">${product.name}</h5>
        <p class="card-text">${product.description}</p>
        <p class="card-text">Cantidad de vendidos: ${product.soldCount}</p>
        <br>
        <p class="card-price">${product.currency} ${product.cost}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

function filtrarProductos(query) { 
  const q = query.trim().toLowerCase();
  if (!q) {
    showCards({ products: ALL_PRODUCTS });
    return;
  }
  const filtered = ALL_PRODUCTS.filter(
    (p) =>
      (p.name && p.name.toLowerCase().includes(q)) ||
      (p.description && p.description.toLowerCase().includes(q))
  );
  showCards({ products: filtered });
}

function setupLiveSearch() { /* Busqueda en Vivo */
  const form = document.querySelector("#segundoBuscador form");
  if (form) form.addEventListener("submit", (e) => e.preventDefault());

  let input = document.querySelector("#segundoBuscador input");
  if (input) input.type = "search";

  input.addEventListener("input", (e) => {
    filtrarProductos(e.target.value);
  });
}

function setupNavSearch() { /* Funcion para la busqueda */
  const searchBtn = document.getElementById("searchButton");
  const searchBox = document.getElementById("searchBox");
  const closeBtn = document.getElementById("closeSearchBtn");
  const navInput = searchBox ? searchBox.querySelector("input") : null;

  if (searchBtn && searchBox && closeBtn && navInput) {
    // Mostrar el cuadro de búsqueda
    searchBtn.addEventListener("click", () => {
      searchBox.classList.remove("d-none");
      navInput.focus();
    });

    // Cerrar el cuadro de búsqueda
    closeBtn.addEventListener("click", () => {
      searchBox.classList.add("d-none");
      navInput.value = "";
      showCards({ products: ALL_PRODUCTS }); // resetear lista
    });

    // Filtrar en vivo desde el input del nav
    navInput.addEventListener("input", (e) => {
      filtrarProductos(e.target.value);
    });
  }
}

init();
