// declaro mi array de productos

let productos = [
    { id:1, nombre:"Pupy", precio:0, descripcion:"Labrador Retriever: Amigable y leal, perfecto para familias activas.", imagen:"https://static.vecteezy.com/system/resources/previews/023/651/797/original/small-labrador-puppy-on-transparent-background-created-with-generative-ai-png.png", size:"medium"},
    { id:2, nombre:"Camilo", precio:0, descripcion:"Bulldog Francés: Carismático y de bajo mantenimiento, ideal para apartamentos.", imagen:"https://elarcadelfrances.com/wp-content/uploads/2022/08/zyro-image.png",size: "small"},
    { id:3, nombre:"evaluna", precio:0, descripcion:"Golden Retriever: Alegre y cariñosa, la compañera perfecta para todos.", imagen:"https://goldenmeadowsretrievers.com/wp-content/uploads/2023/05/Golden-Retriever-Puppy-4-Weeks-Old.png", size:"big"},
    { id:4, nombre:"susana", precio:0, descripcion:"Dachshund: Pequeña y valiente, ideal para espacios reducidos.", imagen:"https://www.petbarn.com.au/petspot/app/uploads/2016/08/63.-Miniature-Dachshund1.png", size:"small"},
    { id:5, nombre:"ramon", precio:0, descripcion:"Border Collie: Inteligente y enérgico, ideal para dueños activos.", imagen:"https://uploads-ssl.webflow.com/63634f4a7b868a399577cf37/64e51ace5f7fb5a277a1e2ae_PYmMxgn.png", size:"big"},
    { id:6, nombre:"sofia", precio:0, descripcion:"Cocker Spaniel: Encantadora y afectuosa, una compañía inigualable en casa.", imagen:"https://images-ra.adoptapet.com/seo/1/h/40_h.png", size:"medium"},
    { id:7, nombre:"cami", precio:0, descripcion:"Pomerania: Divertida y coqueta, una bola de pelusa llena de amor.", imagen:"https://i0.wp.com/bullkans.com/wp-content/uploads/2023/01/WhatsApp_Image_2023-01-30_at_09.41.54__3_-removebg-preview.png?fit=512%2C487&ssl=1", size:"small"},
    { id:8, nombre:"atorrante", precio:0, descripcion:"Bichón Maltés: Elegante y cariñoso, una mascota ideal para la compañía constante.", imagen:"https://tucachorrotienda.com/wp-content/uploads/2018/06/MALTES-puppy.png", size:"medium"},
];

// creo las localstorage para guardar las adopciones y que interactue
const guardarperritosADS = (productos) => {
    localStorage.setItem("productos", JSON.stringify(productos));
}

const cargarperritosADS = () => {
    return JSON.parse(localStorage.getItem("productos")) || [];
}

guardarperritosADS(productos);

// recorremos el array

 const renderproductos = () => {
    const productos = cargarperritosADS();
    let contenidoHTML = "";

    productos.forEach(producto => {
        contenidoHTML += `<div class = "col-md-3 mb-5 text-center"
        <div class="card">
        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">${producto.descripcion}</p>
          <a href="#" class="btn btn-warning" onclick="agregarAlCarrito(${producto.id})">Adoptar (+)</a>
        </div>
        </div>
      </div>`;
    });

    document.getElementById("contenido").innerHTML = contenidoHTML;

}

//carrito
const guardarcarritoADS = (carrito) => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

const cargarCarritoLS = () => {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

const agregarAlCarrito = (id) => {
    const carrito = cargarCarritoLS();
    const producto = buscarProducto(id);
    carrito.push(producto);
    guardarcarritoADS(carrito);
 
 }

const buscarProducto = (id) => {
    const productos = cargarperritosADS(); 
    let producto = productos.find(item => item.id === id);

    return producto;
} 

const estaEnElCarrito = (id) => {
    const productos = cargarperritosADS(); 

    return productos.some(item => item.id === id);
    
}

 const renderCarrito = () => {
    const productos = cargarCarritoLS();
    console.log(productos);
    let contenidoHTML = `<table class="table">`;

    productos.forEach(producto => {
        contenidoHTML += `<tr>
        <td><img src="${producto.imagen}"  alt="${producto.nombre}" width="80"></td>
        <td>${producto.nombre}</td>
        <td><img src="../imagenes/casa vacia.svg" alt="eliminar" width="24"></td>
        </tr>`;
    });
 
    contenidoHTML += `</table>`;
    document.getElementById("contenido").innerHTML = contenidoHTML;
}