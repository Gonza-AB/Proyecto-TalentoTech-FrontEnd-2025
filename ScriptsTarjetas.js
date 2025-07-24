const resenias = [
    {
        nombre: "Mauro Jorge",
        opinion: "Gran producto, un genio el vendedor!",
        fecha: "2025-04-22",
        estrellas: 5,
        imagen:"imagenes/reseñas/Anonimo1.jpg",
    },
    {
        nombre: "Pedro Lopez",
        opinion: "Muy buena calidad y llegó en el día!! Podrían tener más variedad",
        fecha: "2025-02-06",
        estrellas: 4,
        imagen:"imagenes/reseñas/Anonimo1.jpg",
    },
    {
        nombre: "Julieta Gomez",
        opinion: "La calidad es buena, tardaron en entregar el pedido.",
        fecha: "2025-05-12",
        estrellas: 3,
        imagen:"imagenes/reseñas/Anonimo1.jpg",
    },
    {
        nombre: "Silvia Rodriguez",
        opinion: "Buenas camisetas!",
        fecha: "2025-04-04",
        estrellas: 4,
        imagen:"imagenes/reseñas/susana.jpg"
    },
    {
        nombre: "Leandro Paredes",
        opinion: "Gran predisposicion para responder dudas. Buen producto",
        fecha: "2025-05-24",
        estrellas: 4,
        imagen:"imagenes/reseñas/paredes.jpg"
    },
        {
        nombre: "Silvia Messi",
        opinion: "Muy buena calidad y llegó en el día!!",
        fecha: "2025-07-18",
        estrellas: 5,
        imagen:"imagenes/reseñas/mirtha.jpg",
    },
        {
        nombre: "Jorge Riquelme",
        opinion: "Buena calidad. Podrían tener más variedad",
        fecha: "2025-07-08",
        estrellas: 3,
        imagen:"imagenes/reseñas/messi.jpg"
    },
    {
        nombre: "Keylor Orion",
        opinion: "Las mejores del pais",
        fecha: "2025-07-19",
        estrellas: 5,
        imagen:"imagenes/reseñas/Anonimo1.jpg",
    }
];

function mostrarResenias() {
    const contenedor = document.querySelector(".resenias");

    // Ordenar por fecha descendente
    resenias.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    resenias.forEach((resenia) => {
        const card = document.createElement("div");
        card.classList.add("card");

        const contenido = `
            <img src="" alt="">
            <div class="contenido-card">
                <div>
                    <img src="${resenia.imagen}" class="foto">
                    <span class="persona-card">${resenia.nombre}</span><br>
                    ${"<i class='fa-solid fa-star'></i>".repeat(resenia.estrellas)}<br>
                    <span class="fecha-card">${resenia.fecha}</span>
                </div>
                <p>${resenia.opinion}</p>
            </div>
        `;

        card.innerHTML = contenido;
        contenedor.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    mostrarResenias();
}); 
