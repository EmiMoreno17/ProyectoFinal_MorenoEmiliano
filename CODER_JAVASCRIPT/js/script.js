const stockProductos = [
  {
    id: 1,
    nombre: "mesa industrial",
    tipo: "mesa",
    cantidad: 1,
    desc: "Mesa de Caño y Madera",
    precio: 60000,
    img: "./img/mesa.jpg",
  },
  {
    id: 2,
    nombre: "mesa vidriada",
    tipo: "mesa",
    cantidad: 1,
    desc: "Soporte de Caño y Vidrio Templado",
    precio: 50000,
    img: "./img/mesavidrios.jpg",
  },
  {
    id: 3,
    nombre: "silla",
    tipo: "silla",
    cantidad: 1,
    desc: "Silla de Material Aluminio",
    precio: 12000,
    img: "./img/sillas.jpg",
  },
  {
    id: 4,
    nombre: "Racks",
    tipo: "mueble",
    cantidad: 1,
    desc: "Mueble de Madera con Soporte en Chapa",
    precio: 45000,
    img: "./img/mueble.jpg",
  },
  {
    id: 5,
    nombre: "Decoraciones Exteriores",
    tipo: "decoraciones",
    cantidad: 1,
    desc: "Arquitectura Industrial",
    precio: 40000,
    img: "./img/exteriores.jpg",
  },
  {
    id: 6,
    nombre: "Escritorio",
    tipo: "escritorio",
    cantidad: 1,
    desc: "Escritorio Tipo Industrial",
    precio: 30000,
    img: "./img/escritorio.jpg",
  },
  {
    id: 7,
    nombre: "Cartel",
    tipo: "carteleria",
    cantidad: 1,
    desc: "Carteleria Personalizada",
    precio: 20000,
    img: "./img/carteleria.jpg",
  },
  {
    id: 8,
    nombre: "Cuadros",
    tipo: "cuadro",
    cantidad: 1,
    desc: "Cuadros de Madera Personalizados",
    precio: 5000,
    img: "./img/cuadro.jpg",
  },
  {
    id: 9,
    nombre: "Lamparas Colgantes",
    tipo: "lamparas",
    cantidad: 1,
    desc: "Lamparas de Chapa Personalizados",
    precio: 10000,
    img: "./img/lampara.jpg",
  },
];
let carrito = []

const contenedor = document.querySelector('#contenedor');
const carritoContenedor = document.querySelector('#carritoContenedor')
const vaciarCarrito = document.querySelector('#vaciarCarrito')
const precioTotal = document.querySelector('#precioTotal')
const procesarCompra = document.querySelector('#procesarCompra')
const activarFuncion = document.querySelector('#activarFuncion')
const totalProceso = document.querySelector('#totalProceso')
const formulario = document.querySelector('#procesar-pago')

if (activarFuncion) {
  activarFuncion.addEventListener('click', procesarPedido)
}

if (formulario) {
  formulario.addEventListener('submit', enviarPedido)
}
document.addEventListener('DOMContentLoaded',() =>{
    carrito = JSON.parse(localStorage.getItem('carrito')) || []
    mostrarCarrito()

    if (activarFuncion) {
  
      document.querySelector('#activarFuncion').click(procesarPedido)
    }

})

stockProductos.forEach((prod) => {
  const { id, nombre, cantidad, desc, precio, img } = prod;
  if (contenedor) {
    contenedor.innerHTML += `
    <div class="card" style="width: 18rem;">
    <img src="${img}" class="card-img-top mt-2" alt="...">
    <div class="card-body">
      <h5 class="card-title">${nombre}</h5>
      <p class="card-text">Precio: ${precio}</p>
      <p class="card-text">Descripcion: ${desc}</p>
      <p class="card-text">Cantidad: ${cantidad}</p>
      <button onClick="agregarProducto(${id})" class="btn btn-primary">Agregar al Carrito</button>
    </div>
    </div>
    `;
  }
 
});

if (procesarCompra) {

  procesarCompra.addEventListener("click", () => {
      if (carrito.length === 0) {
        Swal.fire({
          title: "¡Tu carrito está vacio!",
          text: "Compra algo para continuar con la compra",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      } else {
      location.href = "compra.html";

      
    }
});
  
}

if (vaciarCarrito) {
  vaciarCarrito.addEventListener('click', () => {
    carrito.length = []
    mostrarCarrito()
    })
  
}
  
function agregarProducto(id) {

  const existe = carrito.some(prod => prod.id === id)
  if (existe) {
        const prod = carrito.map(prod => {
            if(prod.id === id){
                prod.cantidad++
            }
        })
  }else {
    const item = stockProductos.find((prod) => prod.id === id);
    carrito.push(item);
  }

  mostrarCarrito()
  
}

const mostrarCarrito = () => {
    const modalBody = document.querySelector('.modal .modal-body')
    if (modalBody) {
      modalBody.innerHTML = ''
      carrito.forEach((prod) => {
        const { id, nombre, cantidad, desc, precio, img } = prod
        modalBody.innerHTML += `
        <div class="modal-contenedor">
        <div>
        <img class="img-fluid img-carrito" src="${img}"/>
        </div>

        <div>
        <p>Producto: ${nombre}</p>
        <p>Precio: ${precio}</p>
        <p>Cantidad: ${cantidad}</p>

        <button onClick="eliminarProducto(${id})" class="btn btn-danger">Eliminar Producto</button>
        </div>
        </div>
        `
      }) 
    }
    
    if(carrito.length === 0){
        modalBody.innerHTML = `
        <p class="text-center text-primary parrafo">¡El Carrito Esta Vacio!</p>
        `
    }else{
        console.log("agregaste un producto");
    }
    carritoContenedor.textContent = carrito.length


    if (precioTotal) {
      precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
    }

    guardarStorage()
}

function eliminarProducto(id) {
    const muebleId = id
    carrito = carrito.filter((mueble) => mueble.id !== muebleId)
    mostrarCarrito()
}


function guardarStorage(params) {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

function procesarPedido() {
  carrito.forEach((prod) =>{
    const listaCompra = document.querySelector('#lista-compra tbody')
    const {id, nombre, precio, cantidad, img} = prod

    const row = document.createElement('tr')
    row.innerHTML +=`
      <td>
      <img class="img-fluid img-carrito" src="${img}"
      </td>
      <td>${nombre}</td>
      <td>${precio}</td>
      <td>${cantidad}</td>
      <td>${precio * cantidad}</td>
    `

    listaCompra.appendChild(row)
  })
  totalProceso.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
}

function enviarPedido(e){
  e.preventDefault()
  const cliente = document.querySelector('#cliente').value
  const correo = document.querySelector('#correo').value
  

  if(correo === '' || cliente === ''){
    Swal.fire({
      title: "¡Debes completar tu email y nombre!",
      text: "Rellena el formulario",
      icon: "error",
      confirmButtonText: "Aceptar",
    })
  }else{
    const spinner = document.querySelector('#spinner')
    spinner.classList.add('d-flex')
    spinner.classList.remove('d-none')

    setTimeout(() =>{
      spinner.classList.remove('d-flex')
      spinner.classList.add('d-none')
      formulario.reset()
    }, 2500)

    const alertExito = document.createElement('p')
     alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'col-12', 'mt-2', 'alert-success')
     alertExito.textContent = 'Compra realizada correctamente. Gracias por confiar en Rusticos Industriales'
     formulario.appendChild(alertExito)

      setTimeout(() => {
        alertExito.remove()
      }, 3000)

  }

  localStorage.clear()

}