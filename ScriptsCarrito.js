const productos = [
    {
        id: "01",
        imagen: "imagenes/Camisetas-de-Futbol/Arg2025tit.jpg",
        alt: "Foto de camiseta del Argentina 2025",
        nombre: "Camiseta de Argentina Titular 2024/25",
        precio: 220
    },
    {
        id: "02",
        imagen: "imagenes/Camisetas-de-Futbol/Arg2025vintg.jpg",
        alt: "Foto de camiseta del Argentina Vintage",
        nombre: "Camiseta del Argentina Vintage",
        precio: 200
    },
    {
        id: "03",
        imagen: "imagenes/Camisetas-de-Futbol/atlmad2025titu.jpg",
        alt: "Foto de camiseta del Atletico Madrid",
        nombre: "Camiseta del Atletico Madrid Titular 2024/25",
        precio: 150
    },
    {
        id: "04",
        imagen: "imagenes/Camisetas-de-Futbol/barc2025sup.png",
        alt: "Foto de camiseta del barcelona Suplente 2025",
        nombre: "Camiseta del Barcelona Suplente 2024/25",
        precio: 180
    },
    {
        id: "05",
        imagen: "imagenes/Camisetas-de-Futbol/alternativaBoca25.png",
        alt: "Foto de camiseta de Boca Alternativa 2025",
        nombre: "Camiseta de Boca Suplente 2024/25",
        precio: 160
    },
    {
        id: "06",
        imagen: "imagenes/Camisetas-de-Futbol/boca2025titul.jpg",
        alt: "Foto de camiseta de Boca titular",
        nombre: "Camiseta de Boca Titular 2024/25",
        precio: 150
    },
    {
        id: "07",
        imagen: "imagenes/Camisetas-de-Futbol/chels2025sup.jpg",
        alt: "Foto de camiseta del Chelsea Suplente",
        nombre: "Camiseta del Chelsea Suplente 2024/25",
        precio: 150
    },
    {
        id: "08",
        imagen: "imagenes/Camisetas-de-Futbol/liverp2025titu.jpg",
        alt: "Foto de camiseta del Liverpool Titular",
        nombre: "Camiseta del Liverpool Titular 2024/25",
        precio: 170
    },
    {
        id: "09",
        imagen: "imagenes/Camisetas-de-Futbol/boca2526titu.jpg",
        alt: "Foto de camiseta del Liverpool Titular",
        nombre: "Camiseta de Boca Titular 2025/26",
        precio: 200
    },
];

//Funcion de comparacion para ordenar productos por ID ascendiente
//Usar con sort
function compararProductosPorIdAscendente(a, b) {
    if (a.id < b.id) {
        return 1;
    }
    if (a.id > b.id) {
        return -1
    }
    return 0
}
//Ordenar productos x ID descendente
productos.sort(compararProductosPorIdAscendente);


//Array para almacenar los productos en el carrito
let carrito = []; //Lista de objetos de mis productos

//Agregar un producto al carrito o incrementa su cantidad si ya existe
function agregarProductoAlCarrito(idProducto) {
    // Buscar si el producto ya está en el carrito
    let productoEnCarrito = null;
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === idProducto) {
            productoEnCarrito = carrito[i];
            break;
        }
    }

    if (productoEnCarrito) { // Si el producto ya esta en el carrito, le sumamos 1
        productoEnCarrito.cantidad++;
    } else {
        // Si no esta, Buscar el producto original en el array de productos
        let productoOriginal = null;
        for (let i = 0; i < productos.length; i++) {
            if (productos[i].id === idProducto) {
                productoOriginal = productos[i];
                break; // Salir del bucle
            }
        }
        // Si lo encontramos, lo agregamos al carrito con cantidad 1
        carrito.push({ ...productoOriginal, cantidad: 1 });
    }
    // Actualizar la vista del carrito
    actualizarCarritoHTML();
    mostrarNotificacion("Producto agregado al carrito 🛒");
}

//Maneja el evento del click en los botones "Comprar"
function manejarClickComprar(evento) {
    if (evento.target.classList.contains("btn-comprar")) {
        const productoId = evento.target.dataset.id;
        if (productoId) {
            agregarProductoAlCarrito(productoId);
        }
    }
}

//Agregar los productos del array "Productos" al DOM y configura los listener de "Comprar"
function agregarProductos() {
    const divProductos = document.querySelector(".productos");

    for (let i = 0; i < productos.length; i++) {
        const producto = productos[i];

        divProductos.insertAdjacentHTML("afterbegin",
            `
            <div class="producto">
                <img class="fotoProducto" src="${producto.imagen}" alt="${producto.nombre}">
                <div class="producto-contenido">
                    <h4>${producto.nombre}</h4>
                    <span>Código: ${producto.id}</span>
                    <span>Precio: $ ${producto.precio}</span>
                    <button class="btn-comprar" type="button" data-id="${producto.id}">Comprar</button>
                </div>
            </div>  
            `
        );
    }

    //Delegacion de eventos para los botones comprar
    divProductos.addEventListener("click", manejarClickComprar);
}

// Maneja el evento de clic en los botones de cantidad y eliminar del carrito.
function manejarClicCarrito(evento) {
    const target = evento.target;

    if (target.classList.contains("btn-cantidad") || target.classList.contains("btn-eliminar")) {
        const productoId = target.dataset.id;
        const accion = target.dataset.action;

        if (accion === "eliminar") {
            eliminarProductoDelCarrito(productoId);
        } else if (accion === "restar") {
            restarCantidadProducto(productoId);
        } else if (accion === "sumar") {
            sumarCantidadProducto(productoId);
        }
    }
}
//Actualiza el contenido hmtl del carrito
function actualizarCarritoHTML() {
    const carritoCompras = document.querySelector(".carritoCompras");
    if (!carritoCompras) {
        console.error("Error: No se encontro el contendor con la clase 'CarritoCompras'. Asegurate de que exista en tu html.")
        return;
    }
    //Limpiar el contenido actual del carrito y recrear
    carritoCompras.innerHTML = `
    <h2>Tu Carrito de Compras</h2>
    <ul class="lista-carrito"></ul>
    <p class="total-carrito"></p>
    <p class="cantidad-carrito"></p>
    `;

    const listaCarrito = carritoCompras.querySelector(".lista-carrito");
    let totalPagar = 0;
    let cantidadProductosUnicos = 0;

    if (carrito.length === 0) {
        listaCarrito.innerHTML = "<p>El carrito esta vacio</p>";
    } else {
        //usando un bucle for tradicional en lugar de forEach
        for (let i = 0; i < carrito.length; i++) {
            const item = carrito[i];
            const li = document.createElement("Li");
            li.innerHTML = `
            <span>${item.nombre} - $${item.precio} x ${item.cantidad}</span>
            <div>
                <button class="btn-cantidad" data-id="${item.id}" data-action="restar">-</button>
                <button class="btn-cantidad" data-id="${item.id}" data-action="sumar">+</button>
                <button class="btn-eliminar" data-id="${item.id}" data-action="eliminar">x</button>
            </div>  
        `;
            listaCarrito.appendChild(li);
            totalPagar += item.precio * item.cantidad;
            cantidadProductosUnicos++;
        }
    }

    //mostrar el total a pagar y la cantidad de productos
    carritoCompras.querySelector(".total-carrito").textContent = `Total a pagar: $${totalPagar}`;
    carritoCompras.querySelector(".cantidad-carrito").textContent = `Productos en carrito: ${cantidadProductosUnicos}`;

    //Configurar el Event listener para botones cantidad y eliminar
    const nuevoListaCarrito = carritoCompras.querySelector(".lista-carrito");
    nuevoListaCarrito.addEventListener("click", manejarClicCarrito);
    //Nota: el uso de "{once: true} es util si el mismo listener "NO" es recreado
    //COmo el UL se borra y se crea de nuevo. el listener anterior se desecha
    // Añadirlo sin "once: true" aquie sta bien porque se esta añadiendo un "nuevo" elemento DOM
}

//Suma una unidad a la cantidad de un producto en el carrito
function sumarCantidadProducto(idProducto) {
    ///Buscar el producto en el carrito
    let productoEnCarrito = null;
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === idProducto) {
            productoEnCarrito = carrito[i];
            break;
        }
    }
    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
        actualizarCarritoHTML(); //Actualizar la vista
    }
}


function restarCantidadProducto(idProducto) {
    //Buscar el producto en el carrito
    let productoEnCarrito = null;
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === idProducto) {
            productoEnCarrito = carrito[i];
            break;

        }
    }
    if (productoEnCarrito) {
        productoEnCarrito.cantidad--;
        if (productoEnCarrito.cantidad <= 0) {
            eliminarProductoDelCarrito(idProducto); //Eliminar si la cantidad llega a 0
        } else {
            actualizarCarritoHTML(); //Solo actualizar si la cantidad aun es positiva
        }
    }
}


//Eliminar producto
function eliminarProductoDelCarrito(idProducto) {
    //Reconstruir el array carrito sin el producto a eliminar
    const nuevoCarrito = [];
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id !== idProducto) {
            nuevoCarrito.push(carrito[i]);
        }
    }
    carrito = nuevoCarrito;
    actualizarCarritoHTML();
}

//Mensaje de carrito
function mostrarNotificacion(mensaje) {
    const noti = document.getElementById("notificacion-carrito");
    noti.textContent = mensaje;
    noti.classList.remove("oculto");
    noti.classList.add("mostrar");

    setTimeout(() => {
        noti.classList.remove("mostrar");
        noti.classList.add("oculto");
    }, 2000); // se oculta a los 2 segundos
}



//Inicializar la aplicacion
agregarProductos();
actualizarCarritoHTML(); //LLamar al inicio para mostrar el carrito vacio si no hay productos
