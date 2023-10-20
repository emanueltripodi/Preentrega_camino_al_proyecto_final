let productos = [
    {id:1, nombre:"Pupy", descripcion:"Labrador Retriever: Amigable y leal, perfecto para familias activas..", imagen:"https://static.vecteezy.com/system/resources/previews/023/651/797/original/small-labrador-puppy-on-transparent-background-created-with-generative-ai-png.png", precio:"Mucha atemcion", categoria:"medium"},
    {id:2, nombre:"Camilo",  descripcion:"Bulldog Francés: Carismático y de bajo mantenimiento, ideal para apartamentos.", imagen:"https://elarcadelfrances.com/wp-content/uploads/2022/08/zyro-image.png", precio:"atencion a mediano plazo", categoria:"small"},
    {id:3, nombre:"Evaluna", descripcion:"Golden Retriever: Alegre y cariñosa, la compañera perfecta para todos.", imagen:"https://goldenmeadowsretrievers.com/wp-content/uploads/2023/05/Golden-Retriever-Puppy-4-Weeks-Old.png", precio:"mucha atencion", categoria:"big"},
    {id:4, nombre:"Susana", descripcion:"Dachshund: Pequeña y valiente, ideal para espacios reducidos.", imagen:"https://www.petbarn.com.au/petspot/app/uploads/2016/08/63.-Miniature-Dachshund1.png", precio:"casi independiente", categoria:"small"},
    {id:6, nombre:"Sofia",  descripcion:"Border Collie: Inteligente y enérgico, ideal para dueños activos.", imagen:"https://uploads-ssl.webflow.com/63634f4a7b868a399577cf37/64e51ace5f7fb5a277a1e2ae_PYmMxgn.png", precio:"atencion a mediano plazo", categoria:"big"},
    {id:7, nombre:"Camila",  descripcion:"Cocker Spaniel: Encantadora y afectuosa, una compañía inigualable en casa.", imagen:"https://images-ra.adoptapet.com/seo/1/h/40_h.png", precio:"mucha atencion", categoria:"medium"},
    {id:8, nombre:"Atorrante",  descripcion:"Pomerania: Divertida y coqueta, una bola de pelusa llena de amor.", imagen:"https://i0.wp.com/bullkans.com/wp-content/uploads/2023/01/WhatsApp_Image_2023-01-30_at_09.41.54__3_-removebg-preview.png?fit=512%2C487&ssl=1", precio:"casi independiente", categoria:"small"}
];

const guardarProductosLS = (productos) => {
    localStorage.setItem("productos", JSON.stringify(productos));
}

const cargarProductosLS = () => {
    return JSON.parse(localStorage.getItem("productos")) || [];
}

const renderProductos = () => {
    const productos = cargarProductosLS();
    let contenidoHTML = "";

    productos.forEach(producto => {
        contenidoHTML += `<div class="col-md-3 mb-5 text-center"
        <div class="card">
        <a href="producto.html" onclick="guardarProductoLS(${producto.id})"><img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}"></a>
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">${producto.precio}</p>
          <a href="#" class="btn btn-warning" onclick="agregarProductoCarrito(${producto.id})">Adoptar (🐾)</a>
        </div>
        </div>
        </div>`;
    });

    document.getElementById("contenido").innerHTML = contenidoHTML;
}

const renderCarrito = () => {
    const productos = cargarCarritoLS();
    let contenidoHTML;

    if (cantProductosCarrito() > 0) {
        contenidoHTML = `<table class="table">
        <tr>
        <td colspan="7" class="text-end"><button class="btn btn-warning" onclick="vaciarCarrito()" title="Vaciar Carrito">Vaciar Carrito [x]</button></td>
        </tr>`;

        productos.forEach(producto => {
            contenidoHTML += `<tr>
            <td><img src="${producto.imagen}" alt="${producto.nombre}" width="64"></td>
            <td class="align-middle">${producto.nombre}</td>
            <td class="align-middle">${producto.precio}</td>
            <td class="align-middle"><button class="btn btn-warning rounded-circle" onclick="decrementarCantidadProducto(${producto.id})">-</button> ${producto.cantidad} <button class="btn btn-warning rounded-circle" onclick="incrementarCantidadProducto(${producto.id})">+</button></td>
            <td class="align-middle">$${producto.precio * producto.cantidad}</td>
            <td class="align-middle text-end"><img src="images/trash.svg" alt="Eliminar" width="24" onclick="eliminarProductoCarrito(${producto.id})"></td>
            </tr>`;
        });

        contenidoHTML += `<tr>
        <td>&nbsp;</td>
        <td>Total</td>$
        <td><b>${sumaProductosCarrito()}</b></td>
        <td>&nbsp;</td>
        </tr>
        </table>`;
    } else {
        contenidoHTML = `<div class="alert alert-warning my-5 text-center" role="alert">No se encontaron Productos en el Carrito!</div>`;
    }
    
    document.getElementById("contenido").innerHTML = contenidoHTML;
}

const guardarCarritoLS = (carrito) => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

const cargarCarritoLS = () => {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

const guardarProductoLS = (id) => {
    localStorage.setItem("producto", JSON.stringify(id));
}

const cargarProductoLS = () => {
    return JSON.parse(localStorage.getItem("producto")) || [];
}

const vaciarCarrito = () => {
    localStorage.removeItem("carrito");
    renderCarrito();
    renderBotonCarrito();
}

const agregarProductoCarrito = (id) => {
    const carrito = cargarCarritoLS();

    if (estaEnElCarrito(id)) {
        const producto = carrito.find(item => item.id === id);
        producto.cantidad += 1;
    } else {
        const producto = buscarProducto(id);
        producto.cantidad = 1;
        carrito.push(producto);
    }

    guardarCarritoLS(carrito);
    renderBotonCarrito();
}

const eliminarProductoCarrito = (id) => {
    const carrito = cargarCarritoLS();
    const nuevoCarrito = carrito.filter(item => item.id !== id);
    guardarCarritoLS(nuevoCarrito);
    renderCarrito();
    renderBotonCarrito();
}

const incrementarCantidadProducto = (id) => {
    const carrito = cargarCarritoLS();
    const producto = carrito.find(item => item.id === id);
    producto.cantidad += 1;
    guardarCarritoLS(carrito);
    renderCarrito();
    renderBotonCarrito();
}

const decrementarCantidadProducto = (id) => {
    const carrito = cargarCarritoLS();
    const producto = carrito.find(item => item.id === id);

    if (producto.cantidad > 1) {
        producto.cantidad -= 1;
        guardarCarritoLS(carrito);
        renderCarrito();
        renderBotonCarrito();
    } else {
        eliminarProductoCarrito(id);
    }
}

const buscarProducto = (id) => {
    const productos = cargarProductosLS();
    let producto = productos.find(item => item.id === id);

    return producto;
}

const estaEnElCarrito = (id) => {
    const productos = cargarCarritoLS();

    return productos.some(item => item.id === id);
}

const cantProductosCarrito = () => {
    const carrito = cargarCarritoLS();

    return carrito.reduce((acumulador, item) => acumulador += item.cantidad, 0);
}

const sumaProductosCarrito = () => {
    const carrito = cargarCarritoLS();

    return carrito.reduce((acumulador, item) => acumulador += item.precio * item.cantidad, 0);
}

const sumaCaloriasCarrito = () => {
    const carrito = cargarCarritoLS();

    return carrito.reduce((acumulador, item) => acumulador += item.calorias * item.cantidad, 0);
}

const renderBotonCarrito = () => {
    let totalCarrito = document.getElementById("totalCarrito");
    totalCarrito.innerHTML = cantProductosCarrito();
}

const renderProducto = () => {
    const idProducto = cargarProductoLS();
    const producto = buscarProducto(idProducto);

    document.getElementById("imagenProducto").src = producto.imagen;
    document.getElementById("tituloProducto").innerHTML = producto.nombre;
    document.getElementById("descripcionProducto").innerHTML = producto.descripcion;
    document.getElementById("precioProducto").innerHTML = "🐾" + producto.precio;
    document.getElementById("botonAgregar").innerHTML= `<a href="#" class="btn btn-warning" onclick="agregarProductoCarrito(${producto.id})">Adoptar (🐾)</a>`;
}