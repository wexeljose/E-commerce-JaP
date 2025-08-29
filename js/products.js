function init() {
  console.log("Aplicación inicializada");
  loadProducts();
}

function loadProducts() {
  fetch("https://japceibal.github.io/emercado-api/cats_products/101.json")
    .then((response) => response.json())
    .then((data) => {
      console.log("Productos cargados:", data);
      showCards(data);
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

init();
