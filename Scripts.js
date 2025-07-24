
//Que no se vaya de mi pagina
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // evitar mi redirección
        // Mostrar mensaje
        const toast2 = document.createElement("div");
        toast2.className = "toast mostrar";
        toast2.textContent = "✅ ¡Mensaje enviado!";
        document.body.appendChild(toast2);
        setTimeout(() => toast2.remove(), 3000);
        form.reset();
    });
});