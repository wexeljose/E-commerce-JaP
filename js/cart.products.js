function actualizarTotales() {
    let total = 0;
    let productosIds = JSON.parse(localStorage.getItem("carrito")) || [];
    document.getElementById("cantProds").textContent = "Tus productos: " + productosIds.length;

    document.querySelectorAll(".cantidadInput").forEach(input => {
        const cantidad = parseInt(input.value);
        const precioUnitario = parseFloat(input.dataset.precio);
        const precioTotal = cantidad * precioUnitario;

        const tdPrecio = input.closest("tr").querySelector(".precioProd");
        tdPrecio.textContent = "$" + precioTotal;
        total += precioTotal;
    });

    document.getElementById("totalPago").textContent = "$" + total;
    document.getElementById("subtotalPago").textContent = "$" + total;
}

function irAPaginaProducto(id) {
    localStorage.setItem("productID", id);
    window.location.href = "product-info.html";
}

document.addEventListener("DOMContentLoaded", () => {
  let productosIds = JSON.parse(localStorage.getItem("carrito")) || [];
  const tbodyProds = document.getElementById("tbodyProds");
  let cantTotalPago = 0;

  document.getElementById("cantProds").textContent = "Tus productos: " + productosIds.length;

  if (productosIds.length === 0) {
    document.getElementById("totalPago").textContent = "$0";
    document.getElementById("subtotalPago").textContent = "$0";
    document.getElementById("mensajeCarrito").textContent = "El carrito está vacío.";
    return;
  }

  // Desde la lista repetida de IDs, formar una array con los IDs unicos y su cantidad
  let finalProducts = [];

  for (let id of productosIds) {
    let existingProduct = finalProducts.find(p => p.id === id);
    if (existingProduct) {
      existingProduct.cantidad++;
    } else {
      finalProducts.push({ id: id, cantidad: 1 });
    }
  }

  for (let prod of finalProducts) {
    let infoURL = PRODUCT_INFO_URL + prod.id + EXT_TYPE;

    getJSONData(infoURL).then((result) => {
      if (result.status !== "ok") return;
      const p = result.data || {};
      cantTotalPago += p.cost*prod.cantidad;
      let trHtml =
        `<tr>
          <td class="d-flex align-items-center gap-3">
            <figure class="product-img m-0">
              <img src="${p.images[0]}" alt="Producto 1" class="img-fluid imgProd" />
            </figure>
            <span class="nombreProd" onclick="irAPaginaProducto(${p.id})">${p.name}</span>
          </td>
          <td>
            <div class="containerCartStyles containerCantidad">
              <span class="restarCantidad"><i class="fa-solid fa-minus iBtn"></i></span>
              <input class="cantidadInput" value="${prod.cantidad}" type="number" data-id="${p.id}" data-precio="${p.cost}">
              <span class="sumarCantidad"><i class="fa-solid fa-plus iBtn"></i></span>
            </div>
          </td>
          <td class="fw-bold precioProd">$${p.cost*prod.cantidad}</td>
          <td>
            <input type="hidden" value="${p.id}" />
            <span class="eliminar"><i class="fa-solid fa-x iBtn"></i></span>
          </td>
        </tr>`;
      tbodyProds.innerHTML += trHtml;

      document.getElementById("totalPago").textContent = "$" + cantTotalPago;
      document.getElementById("subtotalPago").textContent = "$" + cantTotalPago;
    });
  }

  setTimeout(() => {
    const sumarBtns = document.querySelectorAll(".sumarCantidad");
    const restarBtns = document.querySelectorAll(".restarCantidad");

    sumarBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const input = btn.parentElement.querySelector("input");
        input.value = parseInt(input.value) + 1;

        const prodid = btn.parentElement.querySelector("input").dataset.id;
        const carrito = JSON.parse(localStorage.getItem("carrito"));
        carrito.push(prodid);
        localStorage.setItem("carrito", JSON.stringify(carrito));

        actualizarTotales();
        actualizarBadgeCarrito();
      });
    });

    restarBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const input = btn.parentElement.querySelector("input");
        let nuevaCantidad = parseInt(input.value) - 1;
        if (nuevaCantidad < 1) return;
        input.value = nuevaCantidad;

        const prodid = btn.parentElement.querySelector("input").dataset.id;
        const carrito = JSON.parse(localStorage.getItem("carrito"));
        const index = carrito.indexOf(prodid);
        if (index > -1) {
            carrito.splice(index, 1);
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));

        actualizarTotales();
      });
    });

    document.querySelectorAll('.eliminar').forEach(btn => {
      btn.addEventListener('click', function () {
        const id = btn.parentElement.querySelector("input").value;
        productosIds = productosIds.filter(item => item !== id);

        btn.parentElement.parentElement.remove();
        localStorage.setItem("carrito", JSON.stringify(productosIds));
        actualizarTotales();
        if (productosIds.length === 0) {
          document.getElementById("totalPago").textContent = "$0";
          document.getElementById("subtotalPago").textContent = "$0";
          document.getElementById("cantProds").textContent = "Tus productos: 0";
          actualizarBadgeCarrito();
          document.getElementById("mensajeCarrito").textContent = "El carrito está vacío.";
          return;
        }
      });
    });

    document.getElementById("vaciarCarrito").addEventListener("click", () => {
      localStorage.removeItem("carrito");
      tbodyProds.innerHTML = "";
      document.getElementById("totalPago").textContent = "$0";
      document.getElementById("subtotalPago").textContent = "$0";
      document.getElementById("cantProds").textContent = "Tus productos: 0";
      actualizarBadgeCarrito();
      document.getElementById("mensajeCarrito").textContent = "El carrito está vacío.";
    });

  }, 500);

});