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

let ProductoBodyTiny = new Producto('Body Tiny','Body rayado con cartera y puños a contratono Composición Tejido: jersey rayado 24/1 peinado 100% algodón.Composición Tejido puños: reeb color 24/1 peinado 100% algodón.', 800, 10, 'https://tienda.pachibebes.com/image/cache/catalog/2021/Verano/213275_aero-900x900.jpg')
let ProductoBodyVeggie = new Producto('Body Veggie','Body estampado por metro "verduras" sobre jersey con puños en color.Composición Tejido: jersey estampado por metro 24/1 peinado 100% algodón.Composición Tejido puños: reeb color 24/1 peinado 100% algodón.', 700, 3,'https://tienda.pachibebes.com/image/cache/catalog/2021/Verano/213200_kaki-400x400.jpg')
let productoPantVeggie = new Producto('Pantalon Veggie', 'Mini babucha con puños, ideal para medio tiempo. Composición Tejido: reeb 24/1, 100% algodón', 700, 20, 'https://tienda.pachibebes.com/image/cache/catalog/2021/Verano/213209_kaki-900x900.jpg')
let productoBuzoLuan = new Producto('Buzo Luan', 'Buzo de rustico, combinado, con capucha forrada cuello con cartera y broches, ideal para medio tiempo, super cancheros. Composición Tejido: rustico color 100% algodón.', 1000, 12, 'https://tienda.pachibebes.com/image/cache/catalog/2021/Verano/211804_kaki-900x900.jpg')
let productoJoggerTiny = new Producto('Jogger Tiny', 'Jogger towel con alforzas, bolsillos y puños. Composición Tejido: towell, 100% algodón', 800, 20, 'https://tienda.pachibebes.com/image/cache/catalog/2021/Verano/211904_verde-900x900.jpg')
let productoRemeraLuan = new Producto('Remera Luan', 'Remera con puños a contratono, con gran estampa. Composición Tejido: jersey color 100% algodón.', 700, 15, 'https://tienda.pachibebes.com/image/cache/catalog/2021/Verano/213262_verde-900x900.jpg')
let productoBaberoBeni = new Producto('Babero Beni', 'Babero de algodón estampado con colareta a contra tono.', 500, 5, 'https://tienda.pachibebes.com/image/cache/catalog/2020/Invierno/205606_verde-900x900.jpg')
let productoSaquitoVeggie = new Producto('Saquito Veggie', 'Mini saquito estampado verduras por metro sobre jersey con capucha forrada.', 900, 11, 'https://tienda.pachibebes.com/image/cache/catalog/2021/Verano/213202_kaki-900x900.jpg')

let baseDeDatos = [];
baseDeDatos.push(ProductoBodyTiny);
baseDeDatos.push(ProductoBodyVeggie);
baseDeDatos.push(productoPantVeggie);
baseDeDatos.push(productoBuzoLuan);
baseDeDatos.push(productoJoggerTiny);
baseDeDatos.push(productoRemeraLuan);
baseDeDatos.push(productoBaberoBeni);
baseDeDatos.push(productoSaquitoVeggie);

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
                        Precio: <strong>$${baseDeDatos[i].precio}</strong></p>
                        <div class="card-footer">
                        <button class="btn btn-primary" style="width:100%" 
                        onclick='agregarProducto(${JSON.stringify(
                        baseDeDatos[i]
                        )})'>Agregar al carrito</button>
                        </div>
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

// desafio agregar jquery
$('#btn-jquery').click (function() {
    let inputName = $('#inputName').val();
    let inputApellido = $('#inputApellido').val();
    if(inputName && inputApellido) { 
    $('#texto').html('<h5>Bienvenido '+'<br/>'+inputName+'<br/>'+inputApellido+'</h5>') 
    }else{
        alert('debes completar todos los datos');
    }
})