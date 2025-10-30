function actualizarBadgeCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const cantidadItems = carrito.length;

  const badgeNoti = document.getElementById("badge-notificacion");
  const badgeDropdown = document.getElementById("badge-carrito-dropdown");

  if (badgeNoti) {
    badgeNoti.textContent = cantidadItems;
    // Solo mostrar si hay algo
    if (cantidadItems > 0) {
      badgeNoti.classList.remove("d-none");
    }
  }

  if (badgeDropdown) {
    badgeDropdown.textContent = cantidadItems;
  }
}



document.addEventListener("DOMContentLoaded", () => {
  let productosIds = JSON.parse(localStorage.getItem("carrito")) || [];
  const tbodyProds = document.getElementById("tbodyProds");
  let cantTotalPago = 0;

  document.getElementById("cantProds").textContent = "Tus productos: " + productosIds.length;

  if (productosIds.length === 0) {
    document.getElementById("totalPago").textContent = "$0";
    document.getElementById("subtotalPago").textContent = "$0";
    return;
  }

  for (let id of productosIds) {
    let infoURL = PRODUCT_INFO_URL + id + EXT_TYPE;

    getJSONData(infoURL).then((result) => {
      if (result.status !== "ok") return;
      const p = result.data || {};
      cantTotalPago += p.cost;
      let trHtml =
        `<tr>
          <td class="d-flex align-items-center gap-3">
            <figure class="product-img m-0">
              <img src="${p.images[0]}" alt="Producto 1" class="img-fluid imgProd" />
            </figure>
            <span class="nombreProd">${p.name}</span>
          </td>
          <td>
            <div class="containerCartStyles containerCantidad">
              <span class="restarCantidad"><i class="fa-solid fa-minus iBtn"></i></span>
              <input class="cantidadInput" value="1" type="number" data-precio="${p.cost}">
              <span class="sumarCantidad"><i class="fa-solid fa-plus iBtn"></i></span>
            </div>
          </td>
          <td class="fw-bold precioProd">$${p.cost}</td>
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
        actualizarTotales();
      });
    });

    restarBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const input = btn.parentElement.querySelector("input");
        let nuevaCantidad = parseInt(input.value) - 1;
        if (nuevaCantidad < 1) nuevaCantidad = 1;
        input.value = nuevaCantidad;
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
    });


    function actualizarTotales() {
      let total = 0;
      document.querySelectorAll(".cantidadInput").forEach(input => {
        const cantidad = parseInt(input.value);
        const precioUnitario = parseFloat(input.dataset.precio);
        const precioTotal = cantidad * precioUnitario;

        const tdPrecio = input.closest("tr").querySelector(".precioProd");
        tdPrecio.textContent = "$" + precioTotal;
        document.getElementById("cantProds").textContent = "Tus productos: " + productosIds.length;
        total += precioTotal;
      });

      document.getElementById("totalPago").textContent = "$" + total;
      document.getElementById("subtotalPago").textContent = "$" + total;
    }


  }, 500);

});