// Este bloque de código se encarga de mostrar y ocultar el menú de filtros
// cuando haces clic en el botón "Filtros".
// ---
// 1. Obtiene el botón "Filtros" usando su ID.
const filterButton = document.getElementById("filterButton");

// 2. Obtiene el contenedor que guarda las opciones del filtro (Precio, Más Vendidos).
const filterOptions = document.getElementById("filterOptions");

// 3. Agrega un "escuchador de eventos" (event listener) que espera un clic en el botón "Filtros".
filterButton.addEventListener("click", () => {
  // 4. Alterna la clase 'hidden' en el contenedor de opciones.
  // Si la clase 'hidden' existe, la elimina, haciendo el elemento visible.
  // Si la clase 'hidden' no existe, la añade, ocultando el elemento.
  filterOptions.classList.toggle("hidden");
});

// ---
// Este bloque de código controla la visibilidad del buscador
// en la barra de navegación cuando se hace clic en la lupa.
document.addEventListener('DOMContentLoaded', () => {
  // Obtiene el botón de la lupa que activará el buscador.
  const searchButton = document.getElementById('searchButton');
  // Obtiene el contenedor del campo de búsqueda y sus elementos.
  const searchBox = document.getElementById('searchBox');
  // Obtiene la lista de enlaces de navegación para ocultarla.
  const navLinks = document.querySelector('#navbarNav ul');
  // Obtiene el botón de cierre dentro del buscador.
  const closeSearchBtn = document.getElementById('closeSearchBtn');

  // Función auxiliar para alternar la visibilidad del buscador y los enlaces.
  const toggleSearch = () => {
    // Alterna la clase 'd-none' para mostrar/ocultar el buscador.
    searchBox.classList.toggle('d-none');
    // Alterna la clase 'd-none' para mostrar/ocultar los enlaces de navegación.
    navLinks.classList.toggle('d-none');
  };

  // Escucha el clic en el botón de la lupa.
  searchButton.addEventListener('click', () => {
    // Llama a la función para mostrar el buscador y ocultar los enlaces.
    toggleSearch();
    // Opcional: Enfoca el campo de texto cuando el buscador aparece,
    // para que el usuario pueda empezar a escribir de inmediato.
    const searchInput = searchBox.querySelector('input');
    if (!searchBox.classList.contains('d-none')) {
      searchInput.focus();
    }
  });

  // Escucha el clic en el botón de cerrar.
  closeSearchBtn.addEventListener('click', () => {
    // Llama a la misma función para ocultar el buscador y mostrar los enlaces.
    toggleSearch();
  });
});