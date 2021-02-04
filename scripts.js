let carrito = [];
if (localStorage.getItem('carrito') !=null) {
    carrito = JSON.parse(localStorage.getItem('carrito'));
    document.getElementById('contador').innerHTML = carrito.length;
}
class Producto{
    constructor(nombreProducto, nombreDescripcion, precioProducto, stockProducto, imagenProducto){
        this.nombre = nombreProducto;
        this.descripcion = nombreDescripcion;
        this.precio = precioProducto;
        this.stock = stockProducto;
        this.imagen = imagenProducto;
    }
    mostrarProductos(){
        document.getElementById('carrito').innerHTML = ``;
    }
}

let ProductoBodyTiny = new Producto('Body Tiny','Body rayado con cartera y puños a contratono Composición Tejido: jersey rayado 24/1 peinado 100% algodón.Composición Tejido puños: reeb color 24/1 peinado 100% algodón.', '$800', 10, 'https://tienda.pachibebes.com/image/cache/catalog/2021/Verano/213275_aero-900x900.jpg')
let ProductoBodyVeggie = new Producto('Body Veggie','Body estampado por metro "verduras" sobre jersey con puños en color.Composición Tejido: jersey estampado por metro 24/1 peinado 100% algodón.Composición Tejido puños: reeb color 24/1 peinado 100% algodón.', '$700', 3,'https://tienda.pachibebes.com/image/cache/catalog/2021/Verano/213200_kaki-400x400.jpg')
let productoPantVeggie = new Producto('Pantalon Veggie', 'Mini babucha con puños, ideal para medio tiempo. Composición Tejido: reeb 24/1, 100% algodón', '$700', 20, 'https://tienda.pachibebes.com/image/cache/catalog/2021/Verano/213209_kaki-900x900.jpg')

let baseDeDatos = [];
baseDeDatos.push(ProductoBodyTiny);
baseDeDatos.push(ProductoBodyVeggie);
baseDeDatos.push(productoPantVeggie);

let aux = ``
for(let i = 0; i < baseDeDatos.length; i++) {
    if (baseDeDatos[i].stock > 0) {
        aux +=`
        <div class="card" style="width: 18rem;">
                    <img src="${baseDeDatos[i].imagen}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title titulo-card">${baseDeDatos[i].nombre}</h5>
                    <p class="card-text descripcion1">
                        ${baseDeDatos[i].descripcion}
                        <br>
                        <br>
                        Precio: <strong>${baseDeDatos[i].precio}</strong></p>
                        <p>Cantidad: <strong>${baseDeDatos[i].stock}</strong></p>
                    <button class="btn comprar" onclick="agregarProducto(${JSON.stringify(baseDeDatos[i])})">Comprar</button>
                </div>
                </div> `
    }
}

document.getElementById('productos1').innerHTML = aux;

// carrito funcionamiento
function agregarProducto(productos) {
    carrito.push(productos)
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    let aux = 0;
    for(let i = 0; i < carrito.length; i++){
        aux += carrito[i].precio;
    }

    document.getElementById('contador').innerHTML = carrito.length;
}

function borrarProducto(){
    const nuevoCarrito = [];
    for(let i = 0; i < carrito.length; i++){
        if(i != 1){
            nuevoCarrito.push(carrito[i]);
        }
    }
    localStorage.setItem('carrito',JSON.stringify(nuevoCarrito));
    carrito = nuevoCarrito;
    document.getElementById('contador').innerHTML = carrito.length;
}

// let mostrarEnCarrito = [{
//                             nombre:'Body Tiny', 
//                             descripcion:'Body rayado con cartera y puños a contratono Composición Tejido: jersey rayado 24/1 peinado 100% algodón.Composición Tejido puños: reeb color 24/1 peinado 100% algodón.', 
//                             precio: '$800', 
//                             imagen: 'https://tienda.pachibebes.com/image/cache/catalog/2021/Verano/213275_aero-900x900.jpg'
//                         },
                        
//                         {
//                             nombre:'Body Veggie',
//                             descripcion:'Body estampado por metro "verduras" sobre jersey con puños en color.Composición Tejido: jersey estampado por metro 24/1 peinado 100% algodón.Composición Tejido puños: reeb color 24/1 peinado 100% algodón.',
//                             precio:'$700',
//                             imagen:'https://tienda.pachibebes.com/image/cache/catalog/2021/Verano/213209_kaki-900x900.jpg'
//                         },
//                         {
//                             nombre:'Pantalon Veggie',
//                             descripcion:'Mini babucha con puños, ideal para medio tiempo. Composición Tejido: reeb 24/1, 100% algodón',
//                             precio:'$700',
//                             imagen:'https://tienda.pachibebes.com/image/cache/catalog/2021/Verano/213209_kaki-900x900.jpg'
//                         }]
