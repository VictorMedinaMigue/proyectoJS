
const pokerContainer = document.querySelector('#juegoPoker');
const botonJugar = document.getElementById('jugarPoker');

const poker = async () =>{
    const resp = await fetch('../baraja.json');
    const data = await resp.json();
    
    var baraja = [];
    data.forEach((carta)=>{
        baraja.push(carta);
    });

    pokerContainer.innerText='';

    function repartirMano(){
        let contador = 0;
        let mano = [];

        const jugada = document.createElement('ul');
        jugada.innerHTML = `
            <h2>Nueva partida</h2>
        `;
        pokerContainer.append(jugada)

        while(contador<5){
            
            numeroAleatorio = Math.round(Math.random()*51);

            for(let i =0; i<mano.length; i++){
                while(mano[i]===baraja[numeroAleatorio]){
                    numeroAleatorio = Math.round(Math.random()*51);
                }
            }
            
            mano.push(baraja[numeroAleatorio]);
            contador++;
            const li = document.createElement('li');
            li.innerHTML= `
                <p>${baraja[numeroAleatorio].nombre} ${baraja[numeroAleatorio].color}</p>
            `;
            jugada.append(li);
        }
        return mano;
    }
    repartirMano();
}

botonJugar.addEventListener('click', poker);
