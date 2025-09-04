let ALL_PRODUCTS = []; // Guarda todos los productos cargados desde la API

// Inicializa la aplicación
function init() {
  console.log("Aplicación inicializada");
  loadProducts(); // Carga los productos desde la API
}

// Carga los productos según la categoría seleccionada
function loadProducts() {
  const catID = localStorage.getItem("catID"); // Obtiene la categoría del localStorage
  fetch(`https://japceibal.github.io/emercado-api/cats_products/${catID}.json`)
    .then((response) => response.json())
    .then((data) => {
      console.log("Productos cargados:", data);
      ALL_PRODUCTS = data.products; // Guarda los productos en la variable global
      showCards(data);             // Muestra las tarjetas de productos en la página
      setupLiveSearch();           // Configura el buscador de la página
      setupNavSearch();            // Configura el buscador de la barra de navegación
    })
    .catch((error) => console.error("Error al cargar productos:", error));
}

// Muestra las tarjetas de productos en el contenedor #product-list
function showCards(data) {
  const container = document.getElementById("product-list");
  container.innerHTML = ""; // Limpia el contenido anterior

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
    container.appendChild(card); // Agrega la tarjeta al contenedor
  });
}

// Filtra los productos según el texto ingresado
function filtrarProductos(query) {
  const q = query.trim().toLowerCase(); // Convierte la búsqueda a minúsculas
  if (!q) { 
    showCards({ products: ALL_PRODUCTS }); // Si el campo está vacío, muestra todos
    return;
  }
  // Filtra productos que contengan el texto en nombre o descripción
  const filtered = ALL_PRODUCTS.filter(
    (p) =>
      (p.name && p.name.toLowerCase().includes(q)) ||
      (p.description && p.description.toLowerCase().includes(q))
  );
  showCards({ products: filtered }); // Muestra los productos filtrados
}

// Configura el buscador de la página
function setupLiveSearch() { 
  const form = document.querySelector("#segundoBuscador form");
  if (form) form.addEventListener("submit", (e) => e.preventDefault()); // Evita recargar la página al hacer submit

  let input = document.querySelector("#segundoBuscador input");
  if (input) input.type = "search"; // Cambia el input a tipo búsqueda

  input.addEventListener("input", (e) => { // Escucha cada cambio en el input
    filtrarProductos(e.target.value);       // Filtra los productos en tiempo real
  });
}

// Configura el buscador en la barra de navegación
function setupNavSearch() { 
  const searchBtn = document.getElementById("searchButton"); // Botón para mostrar input
  const searchBox = document.getElementById("searchBox");    // Contenedor del input
  const closeBtn = document.getElementById("closeSearchBtn"); // Botón cerrar
  const navInput = searchBox ? searchBox.querySelector("input") : null; // Input del navbar

  if (searchBtn && searchBox && closeBtn && navInput) {
    navInput.type = "search"; // Cambia el input a tipo búsqueda

    searchBtn.addEventListener("click", () => { // Al hacer click en el botón
      searchBox.classList.remove("d-none"); // Muestra el input
      navInput.focus(); // Pone el foco en el input
    });

    closeBtn.addEventListener("click", () => { // Al cerrar el buscador
      searchBox.classList.add("d-none"); // Oculta el input
      navInput.value = "";               // Limpia el input
      showCards({ products: ALL_PRODUCTS }); // Resetea la lista de productos
    });

    navInput.addEventListener("input", (e) => { // Escucha cambios en input navbar
      filtrarProductos(e.target.value);          // Filtra en tiempo real
    });
  }
}

// Inicia la aplicación
init();
