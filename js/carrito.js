// Variables globales
let carrito = []; // Array para almacenar los productos
let total = 0; // Total del precio

// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Selecciona todos los botones "Agregar al carrito"
    const botonesAgregar = document.querySelectorAll('.agregar-carrito');

    // Agrega un evento click a cada botón
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', () => {
            // Obtén los datos del producto
            const id = boton.getAttribute('data-id');
            const nombre = boton.getAttribute('data-nombre');
            const precio = parseFloat(boton.getAttribute('data-precio'));

            // Verifica si los datos están correctos
            if (!nombre || isNaN(precio)) {
                console.error('Error: Atributos "data-nombre" o "data-precio" no válidos.');
                return;
            }

            // Agrega el producto al carrito o actualiza su cantidad
            agregarOActualizarProducto(id, nombre, precio);
        });
    });
});

// Función para agregar o actualizar productos en el carrito
function agregarOActualizarProducto(id, nombre, precio) {
    // Busca el producto en el carrito por su id
    const productoExistente = carrito.find(producto => producto.id === id);

    if (productoExistente) {
        // Si el producto ya existe, incrementa la cantidad y actualiza el subtotal
        productoExistente.cantidad++;
        productoExistente.subtotal += precio;
    } else {
        // Si el producto no existe, crea uno nuevo con cantidad inicial de 1
        const nuevoProducto = {
            id,
            nombre,
            precio,
            cantidad: 1,
            subtotal: precio
        };
        carrito.push(nuevoProducto);
    }

    // Actualiza el total
    total += precio;

    // Actualiza el carrito en la interfaz
    mostrarCarrito();
}

// Función para mostrar el carrito en la página
function mostrarCarrito() {
    const carritoItems = document.getElementById('carrito-items');
    const totalPrecio = document.getElementById('total-precio');

    // Limpia el contenido actual del carrito
    carritoItems.innerHTML = '';

    // Recorre los productos en el carrito y crea filas en la tabla
    carrito.forEach((producto, index) => {
        carritoItems.innerHTML += `
            <tr>
                <td>${producto.nombre}</td>
                <td>${producto.cantidad}</td>
                <td>${producto.subtotal} Bs</td>
                <td><button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">Eliminar</button></td>
            </tr>
        `;
    });

    // Actualiza el total en la página
    totalPrecio.innerText = total;
}

// Función para eliminar un producto del carrito
function eliminarProducto(index) {
    // Resta el subtotal del producto al total
    total -= carrito[index].subtotal;

    // Elimina el producto del array
    carrito.splice(index, 1);

    // Actualiza la interfaz
    mostrarCarrito();
}
