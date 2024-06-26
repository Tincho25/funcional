document.addEventListener("DOMContentLoaded", () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const container = document.getElementById("carrito");
    const totalContainer = document.getElementById("total");
    const pagarBtn = document.getElementById("pagar-btn");

    if (carrito.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.textContent = "El carrito está vacío.";
        container.appendChild(mensaje);
    } else {
        let total = 0;
        carrito.forEach((producto, index) => {
            total += producto.precio * producto.cantidad;

            const productoTarjeta = document.createElement("div");
            productoTarjeta.classList.add("card-producto", "col-12");

            const productoImagen = document.createElement("img");
            productoImagen.src = `data:image/jpeg;base64,${producto.imagen}`;
            productoTarjeta.appendChild(productoImagen);

            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body");

            const productoNombre = document.createElement("h5");
            productoNombre.classList.add("card-title");
            productoNombre.textContent = producto.nombre;
            cardBody.appendChild(productoNombre);

            const productoPrecio = document.createElement("p");
            productoPrecio.classList.add("card-text");
            productoPrecio.textContent = `Precio: $${producto.precio} - Cantidad: ${producto.cantidad}`;
            cardBody.appendChild(productoPrecio);

            const botonEliminar = document.createElement("button");
            botonEliminar.classList.add("btn", "btn-danger", "btn-eliminar");
            botonEliminar.textContent = "Eliminar";
            botonEliminar.addEventListener("click", () => {
                eliminarDelCarrito(index);
            });
            cardBody.appendChild(botonEliminar);

            const btnCantidad = document.createElement("button");
            btnCantidad.classList.add("btn", "btn-secondary", "btn-cantidad");
            btnCantidad.textContent = "Agregar más unidades";
            btnCantidad.addEventListener("click", () => {
                agregarUnidades(index);
            });
            cardBody.appendChild(btnCantidad);

            productoTarjeta.appendChild(cardBody);
            container.appendChild(productoTarjeta);
        });

        totalContainer.textContent = "Total: $" + total.toFixed(2); // Redondea el total a dos decimales
        pagarBtn.href = `/pago?monto=${total.toFixed(2)}`;
    }
});

function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    window.location.reload();
}

function agregarUnidades(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const nuevaCantidad = prompt("Ingrese la cantidad adicional:");

    if (!isNaN(nuevaCantidad) && nuevaCantidad > 0) {
        carrito[index].cantidad += parseInt(nuevaCantidad);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        window.location.reload();
    } else {
        alert("Ingrese una cantidad válida.");
    }
}
