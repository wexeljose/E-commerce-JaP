// Función para actualizar el ícono del botón (sol o luna)
function actualizarIcono(isDarkMode) {
    // Busca el ícono <i> dentro del botón con ID 'theme-toggle'
    const icon = document.querySelector('#theme-toggle i');
    
    if (icon) {
        // 1. Remueve las clases de íconos de Font Awesome existentes
        icon.classList.remove('fa-sun', 'fa-moon');
        
        // 2. Agrega el ícono apropiado basado en el tema actual
        if (isDarkMode) {
            // Si es modo oscuro, muestra el sol (para cambiar a modo claro)
            icon.classList.add('fa-sun'); 
        } else {
            // Si es modo claro, muestra la luna (para cambiar a modo oscuro)
            icon.classList.add('fa-moon'); 
        }
    }
}

function inicializarBotonTema() {
    // Apunta al nuevo ID del botón redondo
    const btn = document.getElementById('theme-toggle');
    
    // Obtiene el estado inicial del tema
    const isDarkModeInitial = document.body.classList.contains('dark-mode');
    
    // Inicializa el ícono inmediatamente si el botón existe
    if (btn) {
        actualizarIcono(isDarkModeInitial); 
    }

    if (btn) {
        btn.addEventListener('click', function() {
            // Alterna la clase dark-mode en el body
            document.body.classList.toggle('dark-mode'); 
            
            const isDarkMode = document.body.classList.contains('dark-mode');

            // Actualiza el ícono Sol/Luna
            actualizarIcono(isDarkMode);

            // Guarda la preferencia en localStorage
            if (isDarkMode) {
                localStorage.setItem('tema', 'dark');
            } else {
                localStorage.setItem('tema', 'light');
            }
        });
    }
}

// Aplica el tema guardado al cargar la página
document.addEventListener("DOMContentLoaded", function() {
    const temaGuardado = localStorage.getItem('tema');
    
    if (temaGuardado === 'dark') {
        document.body.classList.add('dark-mode');
    }
    
    // Llama a la función de inicialización aquí también.
    // Aunque 'init.js' la llama, este asegura que el ícono se configure 
    // correctamente incluso si el tema se carga desde localStorage antes del script por fetch.
    if (typeof inicializarBotonTema === 'function') {
        inicializarBotonTema();
    }
});