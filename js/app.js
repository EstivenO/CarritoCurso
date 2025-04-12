//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarrito = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarritos = [];

cargarEventListeners();
function cargarEventListeners () {
    // cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCursos);

    //Elimina curso de carrito
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar el carrito
    vaciarCarrito.addEventListener('click', () =>{
        articulosCarritos = [];
        limpiarHtml();
    });
}

//Funciones
function agregarCursos (e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso( cursoSeleccionado);
    }
}

//Eliminar Curso
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')) {
       const cursoId = e.target.getAttribute('data-id');

       //elimina del arreglo 
       articulosCarritos = articulosCarritos.filter( curso => curso.id !== cursoId);
       
       carritoHtml();// volvemos a iterar sobre el carrito

    }

}

//lee el contenido html 
function leerDatosCurso (curso) {
    //crear curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1

    }

    //revisar si ya un elemento existe en el carrito
    const existe = articulosCarritos.some( curso => curso.id === infoCurso.id);
    if(existe) {
        const cursos = articulosCarritos.map ( curso => {
            if (  curso.id === infoCurso.id ) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        });
        articulosCarritos = [...cursos];
    } else {
         //agregar elementos al carrito
        articulosCarritos = [...articulosCarritos, infoCurso];
    }
   
    //console.log(articulosCarritos);
    carritoHtml();
}

//muestra el html 
function carritoHtml () {
    // limpiar html
    limpiarHtml();
    //recorre los articulos dentro del carrito
    articulosCarritos.forEach( curso => {
        const {imagen,titulo,precio,cantidad,id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100" >
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}" > X </a>
            </td>
        `;
        
        contenedorCarrito.appendChild(row);
    });
}

//elimina elementos 
function limpiarHtml () { 

   while(contenedorCarrito.firstChild ){
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
   }
}