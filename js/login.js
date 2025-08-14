
document.querySelector(".botonEnviar").addEventListener("click", function(event) {
    event.preventDefault();

    let usuario = document.getElementById("usuario").value.trim();
    let password = document.getElementById("password").value.trim();

    if (usuario === "" || password === "") {
        alert("Algo hiciste mal compa!");        
        return;
    }
    window.location.href = "index.html";
});