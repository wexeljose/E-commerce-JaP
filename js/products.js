let ALL_PRODUCTS = []; // Guarda todos los productos cargados desde la API

// Filtros de ordenamiento
const ORDER_DEFAULT = "Pred";
const ORDER_ASC_BY_PRICE = "PriceAsc";
const ORDER_DESC_BY_PRICE = "PriceDesc";
const ORDER_BY_SOLD_COUNT = "Vend.";
let searchQuery = undefined;
let currentSortCriteria = undefined;
let minPrice = undefined;
let maxPrice = undefined;

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
        <p class="card-text vendidos-text">Cantidad de vendidos: ${product.soldCount}</p>
        <br>
        <p class="card-price">${product.currency} ${product.cost}</p>
      </div>
    `;
    
  // CONSIGNA: guardar el ID del producto y redirigir al detalle
  card.addEventListener("click", function () {
    localStorage.setItem("productID", String(product.id));
    window.location.href = "product-info.html";
  });

  container.appendChild(card); // Agrega la tarjeta al contenedor
  });
}

// Filtra los productos según la búsqueda y los rangos de precio
function filtrarProductos() {
  let filtered = [...ALL_PRODUCTS]; // Copia todos los productos inicialmente
  console.log("Filtrando productos:", { searchQuery, minPrice, maxPrice, currentSortCriteria });

  // Filtra por búsqueda
  if (searchQuery !== undefined) {
    var q = searchQuery.toLowerCase().trim();
    if (q) { 
      filtered = filtered.filter(
        (p) =>
          (p.name && p.name.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }
  }

  // Filtra por rango de precios
  if (minPrice !== undefined) {
    filtered = filtered.filter((p) => p.cost >= minPrice);
  }

  if (maxPrice !== undefined) {
    filtered = filtered.filter((p) => p.cost <= maxPrice);
  }

  // Ordena los productos si hay un criterio seleccionado
  if (currentSortCriteria !== undefined) {
    filtered = sortArrayByCriteria(currentSortCriteria, filtered);
  }

  showCards({ products: filtered }); // Muestra los productos filtrados
}

// Configura el buscador de la página
function setupLiveSearch() { 
  const form = document.querySelector("#segundoBuscador form");
  if (form) form.addEventListener("submit", (e) => e.preventDefault()); // Evita recargar la página al hacer submit

  let input = document.querySelector("#segundoBuscador input");
  if (input) input.type = "search"; // Cambia el input a tipo búsqueda

  input.addEventListener("input", (e) => { // Escucha cada cambio en el input
    searchQuery = e.target.value; // Actualiza la variable global
    filtrarProductos();       // Filtra los productos en tiempo real
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
      searchQuery = undefined;          // Resetea la variable global
      filtrarProductos();               // Muestra todos los productos
    });

    navInput.addEventListener("input", (e) => { // Escucha cambios en input navbar
      searchQuery = e.target.value; // Actualiza la variable global
      filtrarProductos();          // Filtra en tiempo real
    });
  }
}

// Inicia la aplicación
init();

// Funciones para establecer filtros

function setMinPrice(price) {
    minPrice = price;
    filtrarProductos();
}

function setMaxPrice(price) {
    maxPrice = price;
    filtrarProductos();
}

function setSortCriteria(criteria) {
    currentSortCriteria = criteria;
    filtrarProductos();
}

function sortArrayByCriteria(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_SOLD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }else {
        result = array;
    }

    return result;
}