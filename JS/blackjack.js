
/* El programa consiste en un programa que pide cartas como si fuera el juego 21 black Jack */


class Carta{
    constructor(nombre = "", color="", valor=0){
        this.nombre = nombre;
        this.valor = valor;
        this.color = color;
    }
}

const juego = document.getElementById('jugar');
const juegoBlackjack = document.getElementById('juegoBlackjack');


juego.addEventListener('click', juegoPersona);

function generarBaraja(){
    nombres = ["As", "Dos", "Tres", "cuatro", "Cinco", "Seis", "Siete", "J", "Q", "K"];
    colores = ["picas", "treboles", "corazones", "rombos"];
    valor = [11, 2, 3, 4, 5, 6, 7, 10, 10, 10];

    let cartas = [];
    for(let i=0; i<nombres.length; i++){
        for(let j=0; j<colores.length; j++){
            let carta = new Carta(nombres[i], colores[j], valor[i]);
            cartas.push(carta);
        }
    }
    return cartas;
}

function generarCarta(baraja){
    numeroAleatorio = Math.round(Math.random()*39);
    cartaBaraja = baraja[numeroAleatorio]; 

    while(cartaBaraja==undefined){
        numeroAleatorio = Math.round(Math.random()*39);
        cartaBaraja = baraja[numeroAleatorio]; 
    }

    baraja.splice(numeroAleatorio, 1);
    return cartaBaraja;
}

function juegoPersona(){
    const manoContainer = document.createElement('ul');
    juegoBlackjack.append(manoContainer);
    const pregunta = document.createElement('h2');
    const btnSi = document.createElement('button');
    const btnNo = document.createElement('button');
    const btnRefresh = document.createElement('button');
    pregunta.innerHTML = "¿Quieres otra carta?";
    btnRefresh.innerHTML = "Refrescar";
    btnSi.innerHTML = "Si";
    btnNo.innerHTML = "No";
    btnSi.className = 'boton';
    btnNo.className = 'boton';
    btnRefresh.className = 'boton';
    juegoBlackjack.append(pregunta);
    juegoBlackjack.append(btnSi);
    juegoBlackjack.append(btnNo);
    juegoBlackjack.append(btnRefresh);

    var baraja = generarBaraja();
    mano = [];

    cartaNueva = generarCarta(baraja);
    mano.push(cartaNueva);
    const cartaContainer = document.createElement('li');
    let {nombre, color, valor} = cartaNueva;
    cartaContainer.innerHTML = `Carta: `+nombre+` `+color +` (`+ valor+`)`;
    manoContainer.append(cartaContainer);

    btnSi.addEventListener('click', aniadirCarta);
    btnNo.addEventListener('click', pararJuego);
    btnRefresh.addEventListener('click', refrescar)

    function aniadirCarta(){
        cartaNueva = generarCarta(baraja);
        mano.push(cartaNueva);
        manoContainer.innerHTML ='';
        var suma = 0;
        for(let i =0; i < mano.length; i++){
            const cartaContainer = document.createElement('li');
            cartaContainer.innerHTML = `Carta: `+mano[i].nombre +` `+mano[0].color +` (`+ mano[i].valor+`)`;
            suma += mano[i].valor;
            manoContainer.append(cartaContainer);
        }
    }

    function pararJuego(){
        var suma = 0;
        for(let i =0; i < mano.length; i++){
            suma += mano[i].valor;
        }

        var mensaje = '';
        if(suma > 21){
            mensaje = ' Te has pasado, has pedido. Refresca para continuar';
        }else if(suma < 21){
            mensaje = ' Aun puedes pedir otra';
        }else if(suma === 21){
            mensaje = ' Enhorabuena, tu mano vale 21, has ganado. Refresca para continuar';
        }

        pregunta.innerHTML = "Tu mano vale: "+suma+mensaje;
        return mano;
    }

    function refrescar(){
        location.reload();
    }

}

function juegoCrupier(){
    let resultadoCrupier= 0;
    var baraja = generarBaraja();

    mano = [];
    do{
        cartaNueva = generarCarta(baraja);
        resultadoCrupier += cartaNueva.valor;
        mano.push(cartaNueva);

    }while(resultadoCrupier<20);

    return resultadoCrupier;
}

/* let resultado = 0;

document.write(`Hola ${nombre}, tu mano es: `);

for(let i = 0; i<mano.length; i++){
    resultado +=mano[i].valor;
    document.write(mano[i].nombre + " de "+ mano[i].color + " ");
}

document.write(" y vale: " + resultado+ "<br>");

crupier = juegoCrupier();
document.write("La mano del crupier vale: " + crupier +" <br>");


if(resultado==21 && crupier!=21){
    document.write("Has ganado");
}else if(resultado>21){
    document.write("Has perdido");
}else if(resultado==21 && crupier==21){
    document.write("Ganan los dos")
}else if(resultado <21 && resultado >crupier){
    document.write("Has ganado");
}else if(resultado < 21 && crupier == 21){
    document.write("Has perdido");
}  */
