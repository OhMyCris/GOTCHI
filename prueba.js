// Variables
const caja1 = document.getElementById('caja1');
const caja2 = document.getElementById('caja2');
let salto = false;
let colisionDetectada = false;

// Velocidades
const velocidadCaja1 = 2;
const alturaSalto = 150; // Altura máxima del salto
let velocidadSalto = 5;

// Movimiento horizontal de la caja 1
let posXcaja1 = 0;

function moverCaja1() {
    posXcaja1 += velocidadCaja1;
    caja1.style.left = posXcaja1 + 'px';

    // Si la caja 1 se sale de la pantalla, volvemos al inicio
    if (posXcaja1 > window.innerWidth) {
        posXcaja1 = -50;
    }
}

// Movimiento de la caja 2 (salto)
let posYcaja2 = 100; // Posición inicial en Y
function saltarCaja2() {
    if (salto) return;

    salto = true;
    let maxAltura = posYcaja2 - alturaSalto;

    // Hacer que la caja 2 suba
    let subida = setInterval(() => {
        if (posYcaja2 > maxAltura) {
            posYcaja2 -= velocidadSalto;
            caja2.style.top = posYcaja2 + 'px';
        } else {
            clearInterval(subida);
            caerCaja2();
        }
    }, 20);
}

function caerCaja2() {
    // Hacer que la caja 2 baje
    let bajada = setInterval(() => {
        if (posYcaja2 < 100) { // Regresar a la posición inicial
            posYcaja2 += velocidadSalto;
            caja2.style.top = posYcaja2 + 'px';
        } else {
            clearInterval(bajada);
            salto = false;
        }
    }, 20);
}

// Detección de colisión
function detectarColision() {
    const rectCaja1 = caja1.getBoundingClientRect();
    const rectCaja2 = caja2.getBoundingClientRect();

    // Verificar si las cajas están tocándose
    if (
        rectCaja1.right > rectCaja2.left &&
        rectCaja1.left < rectCaja2.right &&
        rectCaja1.bottom > rectCaja2.top &&
        rectCaja1.top < rectCaja2.bottom
    ) {
        if (!colisionDetectada) {
            colisionDetectada = true;
            console.log("¡Colisión detectada!");
        }
    } else {
        if (colisionDetectada) {
            colisionDetectada = false;
            console.log("Las cajas ya no están en colisión.");
        }
    }
}

// Llamadas a las funciones de movimiento
setInterval(() => {
    moverCaja1();
    detectarColision();
}, 20);

// Evento para hacer saltar la caja 2 cuando presionas una tecla
document.addEventListener('keydown', (e) => {
    if (e.key === ' ' && !salto) {  // Espacio para saltar
        saltarCaja2();
    }
});
