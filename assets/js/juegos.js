// import { Swal } from 'sweetalert2';

/*
* 2C = Two of Clubs (Treboles)
* 2D = Two of Diamonds
* 2H = Two of Hearts
* 2S = Two of Spades (Espadas)
*/

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0
let puntosComputadora = 0

//Referencias del HTML
const btnNuevoJuego = document.querySelector('#btnNuevoJuego');
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');

const divCartaJugador = document.querySelector('#jugador-cartas');
const divCartaComputadora = document.querySelector('#computadora-cartas');

const puntajes = document.querySelectorAll('small');

const crearDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }
    for (let tipo of tipos) {
        for (let esp of especiales) {
            deck.push(esp + tipo);
        }
    }

    deck = _.shuffle(deck)
    return deck
}

const pedirCarta = () => {
    if (deck.length === 0) {
        throw 'No hay mas cartas'
    }

    const carta = deck.pop();

    return carta;
}

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (!isNaN(valor)) ? valor * 1 : (valor === 'A') ? 11 : 10;
}

//Eventos
btnNuevoJuego.addEventListener('click', () => {
    deck = []
    puntosJugador = 0;
    puntosComputadora = 0;
    btnPedir.disabled = false;
    btnDetener.disabled = false;
    btnNuevoJuego.style.display = 'none';
    puntajes[0].innerText = 0;
    puntajes[1].innerText = 0;
    divCartaJugador.innerHTML = '';
    divCartaComputadora.innerHTML = '';
})

btnPedir.addEventListener('click', () => {
    crearDeck();
    const carta = pedirCarta();
    puntosJugador += valorCarta(carta);
    puntajes[0].innerText = puntosJugador

    /* <img class="carta" src="assets/cartas/cartas/2C.png" alt="" srcset=""></img> */
    const cartaJugador = document.createElement('img');
    cartaJugador.src = `assets/cartas/cartas/${carta}.png`
    cartaJugador.classList = ['carta'];

    divCartaJugador.append(cartaJugador)

    if (puntosJugador > 21) {
        Swal.fire({
            title: 'You lost!',
            text: 'Te pasate de 21 :c',
            icon: 'error',
            confirmButtonText: 'Cool'
          })
        btnPedir.disabled = true
        btnDetener.disabled = true
        btnNuevoJuego.style.display = 'inline'
    }

})

btnDetener.addEventListener('click', () => {
    // <img class="carta" src="assets/cartas/cartas/2C.png" alt="" srcset=""></img>
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    
    for (let i = 0; puntosComputadora < 21; i++) {
        let carta = pedirCarta();
        let cartaComputadora = document.createElement('img');
        cartaComputadora.src = `assets/cartas/cartas/${carta}.png`
        cartaComputadora.classList = ['carta'];
        divCartaComputadora.append(cartaComputadora)

        puntosComputadora += valorCarta(carta);
        puntajes[1].innerText = puntosComputadora;

        if(puntosComputadora > 19 && puntosComputadora <= 21){
            break;
        }
    }

    if (puntosJugador > puntosComputadora || puntosComputadora > 21) {
        Swal.fire({
            title: 'You win!',
            text: 'Do you want to continue',
            icon: 'success',
            confirmButtonText: 'Cool'
          })
    } else if (puntosJugador === puntosComputadora) {
        Swal.fire({
            title: 'You Tied!',
            text: 'Do you want to continue',
            icon: 'warning',
            confirmButtonText: 'Cool'
          })
    } else {
        Swal.fire({
            title: 'You lost!',
            text: 'Do you want to continue',
            icon: 'error',
            confirmButtonText: 'Cool'
          })
    }

    btnNuevoJuego.style.display = 'inline';

})


// pedirCarta()
// valorCarta(pedirCarta());

