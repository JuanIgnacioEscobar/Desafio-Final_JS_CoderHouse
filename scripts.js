// desafio agregar jquery
$('#btn-jquery').click (function() {
    let inputName = $('#inputName').val();
    let inputApellido = $('#inputApellido').val();
    if(inputName && inputApellido) { 
    $('#texto').slideDown(1000).html('<h5>Bienvenido '+'<br/>'+inputName+'<br/>'+inputApellido+'</h5>');  
    }else{
        alert('debes completar todos los datos');
    }
});

const pagM12 = document.getElementById('m12');
const pagM36 = document.getElementById('m36');
const productos = document.getElementById('productos');
const items = document.getElementById('items');
const footerTotal = document.getElementById('footerTotal')
const card = document.getElementById('cardTemplate').content;
const mostrarCarrito = document.getElementById('mostrarCarrito').content
const mostrarCarritoFooter = document.getElementById('mostrarCarritoFooter').content
const fragment = document.createDocumentFragment();
let carrito = {};

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
    if(localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'));
        mostrarEnCarrito();
    }
});
productos.addEventListener('click', (e) => {
    agregarCarrito(e);
});
pagM12.addEventListener('click', (e) => {
    agregarCarrito(e);
});
pagM36.addEventListener('click', (e) => {
    agregarCarrito(e);
});
items.addEventListener('click', e => {
    btnAccion(e);
});

const fetchData = async () => {
    try {
        const res = await fetch('productos.json');
        const data = await res.json();
        cards(data);
    } catch (error) {
        console.log('error');
    }
}

const cards = data => {
    data.forEach(producto => {
        card.querySelector('img').setAttribute('src', producto.imagen); 
        card.querySelector('h5').textContent = producto.nombre;
        card.querySelector('.descripcion').textContent = producto.descripcion;
        card.querySelector('.precio strong').textContent = producto.precio;
        card.querySelector('.btn-primary').dataset.id = producto.id;
        const clone = card.cloneNode(true);
        fragment.appendChild(clone);
    });
    productos.appendChild(fragment);
}

const agregarCarrito = (e) => {
    if(e.target.classList.contains('btn-primary')) {
        setCarrito(e.target.parentElement);
    }
    e.stopPropagation(); //sirve para detener cualquier otro evento que se puede generar en productos
}

const setCarrito = objeto => {
    const producto = {
        id: objeto.querySelector('.btn-primary').dataset.id,
        nombre: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('.precio strong').textContent,
        cantidad: 1
    }
    if(carrito.hasOwnProperty(producto.id)) { //hasOwnProperty indica si el objeto tiene la propiedad especificada
        producto.cantidad = carrito[producto.id].cantidad + 1; 
    }

    carrito[producto.id] = {...producto};
    mostrarEnCarrito();
}

const mostrarEnCarrito = () => {
    items.innerHTML = ``;
    Object.values(carrito).forEach(producto => {
        mostrarCarrito.querySelector('.nombreProd').textContent = producto.nombre;
        mostrarCarrito.querySelector('.cantidadProd').textContent = producto.cantidad;
        mostrarCarrito.querySelector('.btn-info').dataset.id = producto.id;
        mostrarCarrito.querySelector('.btn-danger').dataset.id = producto.id;
        mostrarCarrito.querySelector('.precioProd span').textContent = producto.cantidad * producto.precio;

        const clone = mostrarCarrito.cloneNode(true);
        fragment.appendChild(clone);
    })
    items.appendChild(fragment);
    mostrarFooterCarrito();

    localStorage.setItem('carrito', JSON.stringify(carrito));
}

const mostrarFooterCarrito = () => {
    footerTotal.innerHTML = ``;
    if(Object.keys(carrito).length === 0) {
        footerTotal.innerHTML = `
        <th class="row footerTotal" colspan="5">Aún no hay productos añadidos 😕</th>
        `;
        return;
    }

    const todasLasCantidades = Object.values(carrito).reduce((acumular, {cantidad}) => acumular + cantidad,0);
    const todosLosPrecios = Object.values(carrito).reduce((acumular,{cantidad, precio}) => acumular + cantidad * precio,0);

    mostrarCarritoFooter.querySelectorAll('.totalProd').textContent = todasLasCantidades;
    mostrarCarritoFooter.querySelector('span').textContent = todosLosPrecios;

    const clone = mostrarCarritoFooter.cloneNode(true);
    fragment.appendChild(clone);
    footerTotal.appendChild(fragment);

    const btnVaciar = document.getElementById('vaciar-carrito');
    btnVaciar.addEventListener('click', () => {
        carrito = {}
        mostrarEnCarrito();
    })
}

const btnAccion = e => {
    if(e.target.classList.contains('btn-info')) {
        carrito[e.target.dataset.id]
        const producto = carrito[e.target.dataset.id];
        producto.cantidad = carrito[e.target.dataset.id].cantidad + 1;
        carrito[e.target.dataset.id] = {...producto};
        mostrarEnCarrito();
    }
    if(e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id];
        producto.cantidad = carrito[e.target.dataset.id].cantidad - 1;
        if(producto.cantidad === 0) {
            delete carrito[e.target.dataset.id];
        }
        mostrarEnCarrito();
    }
    e.stopPropagation();
}
// pagina 12 meses
const mostrarPagM12 = () => {
    pagM12.style.display = 'flex';
    pagM36.style.display = 'none';
    productos.style.display = 'none';
}

fetch('otrosProductos.json')
.then(res => 
    res.json()
).then(res => {
    let m12 = ``;
    for(let i = 0; i < (res.pagM12).length; i++) {
        m12 +=`
        <div class="card">
                    <div class="card-body">
                    <img src="${(res.pagM12[i]).imagen}" class="card-img-top">
                    <h5 class="card-title titulo-card">${(res.pagM12[i]).nombre}</h5>
                    <p class="card-text descripcion">${(res.pagM12[i]).descripcion}</p>
                    <p class="precio"><strong>${(res.pagM12[i]).precio}</strong></p>
                        <button class="btn btn-primary">Agregar al carrito</button>
                </div>
                </div> 
        `;
    }
    document.getElementById('m12').innerHTML = m12;
});

// pagina 36 meses
const mostrarPagM36 = () => {
    pagM36.style.display = 'flex';
    pagM12.style.display = 'none';
    productos.style.display = 'none';
}

fetch('otrosProductos.json')
.then(res => 
    res.json()
).then(res => {
    let m36 = ``;
    for(let i = 0; i < (res.pagM36).length; i++) {
        m36 +=`
        <div class="card">
                    <div class="card-body">
                    <img src="${(res.pagM36[i]).imagen}" class="card-img-top">
                    <h5 class="card-title titulo-card">${(res.pagM36[i]).nombre}</h5>
                    <p class="card-text descripcion">${(res.pagM36[i]).descripcion}</p>
                    <p class="precio"><strong>${(res.pagM36[i]).precio}</strong></p>
                        <button class="btn btn-primary">Agregar al carrito</button>
                </div>
                </div>
        `;
    }
    document.getElementById('m36').innerHTML = m36;
});