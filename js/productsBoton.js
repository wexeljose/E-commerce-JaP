// 1. Obtiene el botón "Filtros" usando su ID
    const filterButton = document.getElementById('filterButton');
    
    // 2. Obtiene el contenedor de las opciones de filtro
    const filterOptions = document.getElementById('filterOptions');

    // 3. Agrega un "escuchador de eventos" (event listener) al botón "Filtros"
    filterButton.addEventListener('click', () => {
        // 4. Alterna la clase 'hidden' en el contenedor de las opciones
        // Si la clase existe, la quita. Si no existe, la añade.
        filterOptions.classList.toggle('hidden');
    });