//Variables


let info;
let aciertos = [];

localStorage.length === 0 ? info = localStorage.setItem('info', JSON.stringify({nombre:'', apellido:'', mail:''})) : info="undefined";


let nombreInfo = JSON.parse(localStorage.getItem('info')).nombre;
let apellidoInfo = JSON.parse(localStorage.getItem('info')).apellido;
let emailInfo = JSON.parse(localStorage.getItem('info')).mail;


const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const email = document.getElementById('email');
const formulario = document.getElementById('form');
const menu = document.querySelector('.menu__lista');


const juegos = document.getElementById('juegos');
juegos.className = "invisible";

function salir(){
    if(nombreInfo !=='' && apellidoInfo !== '', emailInfo !== ''){
        formulario.className = 'invisible';
        juegos.classList.remove('invisible');
        juegos.className = 'juegos';
    
        let salirLink = document.createElement('a');
        salirLink.setAttribute("href", "./index.html");
        salirLink.innerHTML = 'Salir';
        let salirLi = document.createElement('li');
        salirLi.append(salirLink);
        menu.append(salirLi);
        salirLink.addEventListener('click', salirApp);
    }
}
salir();

//Eventos

email.addEventListener('blur', validarFormulario);
apellido.addEventListener('blur', validarFormulario);
nombre.addEventListener('blur', validarFormulario);



//Funciones

function validarFormulario(e){
    e.preventDefault();

    if(e.target.value.length > 0){ 
        const error = document.querySelector('p.mensajeError');
        if(error){
            error.remove();
        }
        e.target.classList.remove('fallo');
        e.target.classList.add('acierto');
    }else{
        e.target.classList.add('fallo');
        e.target.classList.remove('acierto');

        const error = document.querySelector('p.mensajeError');
        if(error){
            error.remove();
        }
        mostrarMensaje("Todos los campos son obligatorios");
    }
    if(e.target.type === 'email'){
        const valorArroba = e.target.value.indexOf('@');
        const valorDominio = e.target.value.indexOf('.');

        if(valorArroba < 0 || valorDominio < 0){
            mostrarMensaje("Introduce un email real");
            e.target.classList.add('fallo');
            e.target.classList.remove('acierto');
        }else{
            e.target.classList.remove('fallo');
            e.target.classList.add('acierto');
        }
    }

    aciertos = document.querySelectorAll('.acierto');
    console.log(aciertos.length);

    aciertos.length === 3 ? formulario.addEventListener('submit', entrarEnWeb) : formulario.addEventListener('submit', (e)=>{
        e.preventDefault();
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Rellena el formulario',
          })
    });
}

function mostrarMensaje(mensaje){
    const error = document.createElement('p');
    error.innerHTML = mensaje;
    error.className = "mensajeError";
    const errores = document.querySelectorAll('.mensajeError');
    if(errores.length === 0){
        formulario.append(error);
    } 
}

function entrarEnWeb(e){
    localStorage.setItem('info', JSON.stringify({nombre: e.target.nombre.value, apellido: e.target.apellido.value, mail: e.target.email.value}));
    juegos.classList.remove('invisible');
    formulario.className = 'invisible';
    Swal.fire({
        icon: 'success',
        title: 'Bienvenido',
        text: 'Disfruta de tu visita',
      })
}   

function salirApp(){
    localStorage.clear();
}






