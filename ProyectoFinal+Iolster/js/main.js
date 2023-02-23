let productos = []

fetch("../productos.json").then(response => response.json())
    .then(data => {
        productos = data

        cargarProductos(productos)
    })

    // elementos del DOM
const contenedorProductos = document.querySelector("#contenedor-productos")
const botonesCategoria = document.querySelectorAll(".boton-cat")
const tituloPrincipal = document.querySelector("#titulo-principal")
let botonesAgregarProducto = document.querySelectorAll(".agregar-producto")
const numero = document.querySelector("#numero")
const botonCarrito = document.querySelector("boton-carrito")



//funcion para cargar los productos 
function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
                <img class="imagen-producto" src="${producto.imagen}" alt="${producto.titulo}" height="350px";>
                <div class="detalles-producto">
                    <h3 class="titulo-producto">${producto.titulo} </h3>
                    <p class="precio-origen">${producto.origen}</p>
                    <p class="precio-tostado">${producto.tostado}</p>
                    <p class="precio-producto">$${producto.precio}</p>
                    <button class="agregar-producto" id="${producto.id}">Agregar</button>
            </div>
            `;
        contenedorProductos.append(div)

    })

    actualizarBotonAgregar()
}

//filtrar los productos por categoria 
botonesCategoria.forEach(boton => {
    boton.addEventListener("click", (e) => {


        botonesCategoria.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productosFiltrados = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosFiltrados);
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;

        } else {

            cargarProductos(productos);
        }
    })
})

//funcion para los botones agregar producto
function actualizarBotonAgregar() {

    botonesAgregarProducto = document.querySelectorAll(".agregar-producto");

    botonesAgregarProducto.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito)
    })
}

//numero del carrito actualizado
let productosEnCarrito
const productosEnCarritoLs = JSON.parse(localStorage.getItem("productos-en-carrito"))
if (productosEnCarritoLs) {
    productosEnCarrito = productosEnCarritoLs
    actualizarNumero()
} else {
    productosEnCarrito = [];
}

//esta funcion identifica el boton con el id del producto. si coincide lo agrega al carrito, tambien identifica si es el mismo producto para eso le agregue una propiededad mas "cantidad" 
//tambíen agrego el alert de "agregaste un producto"
function agregarAlCarrito(e) {
//Toastify
    Toastify({
        text: "Agregaste un producto",
        duration: 5000,
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


//Fin de Toasty

    const identificadorBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === identificadorBoton);

    if (productosEnCarrito.some(producto => producto.id === identificadorBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === identificadorBoton)
        productosEnCarrito[index].cantidad++;

    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado)
    }

    actualizarNumero()
    //guardo en el LS el array productos  en carrito
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}
//funcion que actualiza el numero de productos del html

function actualizarNumero() {
    let numeroCarrito = productosEnCarrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0);
    numero.innerText = numeroCarrito;
}

// LOG IN (SECCIÓN INGRESAR)

function login(){
    var user, password

    user = document.getElementById("usuario").value
    password = document.getElementById("contrasena").value

    if (user === "liviolster" && password === "1234"){
        alert("Iniciaste sesión " + user)
    } else {
        alert("Datos incorrectos")
    }

}

