// llamo al LS
const productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"))

//elementos del DOM
const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#carrito-productos");
const carritoAcciones = document.querySelector("#carrito-acciones");
const carritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-borrar")
const botonVaciarCarrito = document.querySelector("#boton-vaciar-carrito");
const total = document.querySelector("#total");
const botonComprarCarrito = document.querySelector("#boton-comprar-carrito");


//agrego y saco las clases para que vea lo que  yo quiero
function cargarProductosCarrito() {

    if (productosEnCarrito && productosEnCarrito.length > 0) {
        carritoVacio.classList.add("ocultar")
        carritoProductos.classList.remove("ocultar")
        carritoAcciones.classList.remove("ocultar")
        carritoComprado.classList.add("ocultar")

     //creo desde aca los productos que se van a querer comprar 
    //  tambien aplico la clase ocultar(creada en html con estilos css) a los div correspondientes para verlo o no segun corresponda
        carritoProductos.innerHTML = "";

        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito.producto");
            div.innerHTML = `
            <div class="carrito-producto">
            <img src="${producto.imagen}" class="carrito-imagen" alt="${producto.titulo}">
            <div class="carrito-producto-titulo">
                <small>Título</small>
                <h3>${producto.titulo}</h3>
            </div>
            <div class="carrito-producto-cantidad">
                <small>Cantidad</small>
                <p>${producto.cantidad}</p>
            </div>
            <div class="carrito-producto-precio">
                <small>Precio</small>
                <p>1000</p>
            </div>
            <div class="carrito-producto-subtotal">
                <small>Subtotal</small>
                <p>$${producto.precio * producto.cantidad}</p>
            </div>
            <button class="carrito-producto-borrar" id="${producto.id}"><i class="bi bi-trash3-fill"></i></button>
        </div>
            `;
            carritoProductos.append(div);
        })

    } else {
        carritoVacio.classList.remove("ocultar")
        carritoProductos.classList.add("ocultar")
        carritoAcciones.classList.add("ocultar")
        carritoComprado.classList.add("ocultar")
    }

    actualizarbotonEliminar()
    totalProductos()
}


cargarProductosCarrito()


//organizo los botones de eliminar del carrito, llamando a todos, para convertilos en array y les doy un evento con la funcion eliminar del carrito
function actualizarbotonEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-borrar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito)
    })
}

//creo la funcion eliminar de carrito
function eliminarDelCarrito(e) {
    // inicia de alerta
    Toastify({
        text: "Eliminaste un producto",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: `right`, // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #BC6110, #5b7e73)",
            borderRadius: "1rem",
            fontSize: ".75rem",
            textTransform: "upperCase"


        },
        onClick: function () {} // Callback after click
    }).showToast();
// fin de alerta



    let identificadorBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === identificadorBoton)
    // console.log(productosEnCarrito)
    productosEnCarrito.splice(index, 1)
    // console.log(productosEnCarrito)
    cargarProductosCarrito()

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
}



// creo la funcion del boton vaciar carrito ,adentro de está el alert
botonVaciarCarrito.addEventListener("click", vaciarCarrito)

function vaciarCarrito() {

    // inicia de alerta
    Swal.fire({
        title: 'Queres vaciar el carrito?',
        text: "Se van a borrar todos los productos",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Vaciar el carrito'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Tu carrito quedó vacio!',
                'Todos los productos fueron borrados',
                'success'
            )
            productosEnCarrito.length = 0
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
            cargarProductosCarrito()
        }
    })
    // fin de alerta

}

// inicia la funcion del total del productos 
function totalProductos() {
    const totalProd = productosEnCarrito.reduce((acumulador, producto) => acumulador + (producto.precio * producto.cantidad), 0);
    total.innerText = ` $${totalProd}`
}


// Evento del boton para comprar 
botonComprarCarrito.addEventListener("click", comprarCarrito)

// Funcion comprar carrito, con su alert adentro
function comprarCarrito() {
// inicio de alert
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: true
    })

    swalWithBootstrapButtons.fire({
        title: 'Querés comprar los productos seleccionados?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si, quiero comprar!',
        cancelButtonText: 'No!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
                'Tu comprar se ha realizado con éxito',
                'Muchas gracias!',
                'success'
            )
            productosEnCarrito.length = 0
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))

            carritoVacio.classList.add("ocultar")
            carritoProductos.classList.add("ocultar")
            carritoAcciones.classList.add("ocultar")
            carritoComprado.classList.remove("ocultar")
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelaste tu compra',
                'Podés seguir seleccionando productos',
                'error'
            )
        }
    })
// FIn de alert
}