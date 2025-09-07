
//
// Botones en la barra de busquedad (Version escritorio y tablet)
//

const botonNuevos = document.getElementById("btnFilterNew");
const botonPrecioAsc = document.getElementById("btnFilterPriceAsc");
const botonPrecioDesc = document.getElementById("btnFilterPriceDesc");
const botonRelevantes = document.getElementById("btnFilterRelevant");
const inputPrecioMin = document.getElementById("inputPriceMin");
const inputPrecioMax = document.getElementById("inputPriceMax");

let currentFilter = "NUEVOS";

function desactivarBotones() {
    botonNuevos.classList.remove("active");
    botonPrecioAsc.classList.remove("active");
    botonPrecioDesc.classList.remove("active");
    botonRelevantes.classList.remove("active");
}

// Eventos al clickear botones

botonNuevos.addEventListener("click", () => {
    if (currentFilter === "NUEVOS") return;
    currentFilter = "NUEVOS";

    desactivarBotones();
    botonNuevos.classList.add("active");
    setSortCriteria(ORDER_DEFAULT);
});

botonPrecioAsc.addEventListener("click", () => {
    if (currentFilter === "PRECIO_ASC") return;
    currentFilter = "PRECIO_ASC";

    desactivarBotones();
    botonPrecioAsc.classList.add("active");
    setSortCriteria(ORDER_ASC_BY_PRICE);
});

botonPrecioDesc.addEventListener("click", () => {
    if (currentFilter === "PRECIO_DESC") return;
    currentFilter = "PRECIO_DESC";

    desactivarBotones();
    botonPrecioDesc.classList.add("active");
    setSortCriteria(ORDER_DESC_BY_PRICE);
});

botonRelevantes.addEventListener("click", () => {
    if (currentFilter === "RELEVANTES") return;
    currentFilter = "RELEVANTES";

    desactivarBotones();
    botonRelevantes.classList.add("active");
    setSortCriteria(ORDER_BY_SOLD_COUNT);
});

inputPrecioMin.addEventListener("input", () => {
    const price = parseInt(inputPrecioMin.value);
    if (!isNaN(price)) {
        setMinPrice(price);
    } else {
        setMinPrice(undefined);
        inputPrecioMin.value = "";
    }
});

inputPrecioMax.addEventListener("input", () => {
    const price = parseInt(inputPrecioMax.value);
    if (!isNaN(price)) {
        setMaxPrice(price);
    } else {
        setMaxPrice(undefined);
        inputPrecioMax.value = "";
    }
});

//
// Botones en el menú desplegable (Versión celular)
// 

const botonPrecioAscMobile = document.getElementById("btnFilterPriceAscMobile");
const botonPrecioDescMobile = document.getElementById("btnFilterPriceDescMobile");
const botonRelevantesMobile = document.getElementById("btnFilterRelevantMobile");
const inputPrecioMinMobile = document.getElementById("inputPriceMinMobile");
const inputPrecioMaxMobile = document.getElementById("inputPriceMaxMobile");

function desactivarBotonesMobile() {
    botonPrecioAscMobile.classList.remove("selected");
    botonPrecioDescMobile.classList.remove("selected");
    botonRelevantesMobile.classList.remove("selected");
}

// Eventos al clickear botones

botonPrecioAscMobile.addEventListener("click", () => {
    if (currentFilter === "PRECIO_ASC") {
        currentFilter = "NUEVOS";
        desactivarBotonesMobile();
        setSortCriteria(ORDER_DEFAULT);
        return;
    }

    currentFilter = "PRECIO_ASC";
    desactivarBotonesMobile();
    botonPrecioAscMobile.classList.add("selected");
    setSortCriteria(ORDER_ASC_BY_PRICE);
});

botonPrecioDescMobile.addEventListener("click", () => {
    if (currentFilter === "PRECIO_DESC") {
        currentFilter = "NUEVOS";
        desactivarBotonesMobile();
        setSortCriteria(ORDER_DEFAULT);
        return;
    }

    currentFilter = "PRECIO_DESC";
    desactivarBotonesMobile();
    botonPrecioDescMobile.classList.add("selected");
    setSortCriteria(ORDER_DESC_BY_PRICE);
});

botonRelevantesMobile.addEventListener("click", () => {
    if (currentFilter === "RELEVANTES") {
        currentFilter = "NUEVOS";
        desactivarBotonesMobile();
        setSortCriteria(ORDER_DEFAULT);
        return;
    }

    currentFilter = "RELEVANTES";
    desactivarBotonesMobile();
    botonRelevantesMobile.classList.add("selected");
    setSortCriteria(ORDER_BY_SOLD_COUNT);
});

inputPrecioMinMobile.addEventListener("input", () => {
    const price = parseInt(inputPrecioMinMobile.value);
    if (!isNaN(price)) {
        setMinPrice(price);
    } else {
        setMinPrice(undefined);
        inputPrecioMinMobile.value = "";
    }
});

inputPrecioMaxMobile.addEventListener("input", () => {
    const price = parseInt(inputPrecioMaxMobile.value);
    if (!isNaN(price)) {
        setMaxPrice(price);
    } else {
        setMaxPrice(undefined);
        inputPrecioMaxMobile.value = "";
    }
});

//
// Funciones de ordenamiento
//

