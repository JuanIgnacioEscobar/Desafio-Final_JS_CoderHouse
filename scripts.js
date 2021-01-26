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
                    <a href="#" class="btn comprar" onclick="Comprar1()">Comprar</a>
                    <p id="carrito"></p>
                </div>
                </div> `
    }
}
document.getElementById('productos1').innerHTML = aux;
console.log(aux);