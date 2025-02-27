'use strict';
animation(edadGotchi(), 'idle');

const gotchi = document.getElementById('health-icon');
const barra = document.getElementById('barra');
const game = document.querySelector('.mascot');

let gotchiBottom = 0;  // Controlar la altura del gotchi
let salto = false;
let score = 0;
let juegoTerminado = false;

function moverBarra() {
    const barraRect = barra.getBoundingClientRect();
    const gotchiRect = gotchi.getBoundingClientRect();
    const gameRect = game.getBoundingClientRect();

    // Verificar si la barra está cerca del monigote
    if (barraRect.left < gotchiRect.right && barraRect.left > gotchiRect.left && !salto) {
        detenerJuego(); 
    }

    if (barraRect.right > gameRect.right) {
        barra.style.display = '0';  // Ocultamos la barra cuando sale fuera del contenedor
    }
}

// Función para hacer que el monigote salte
function saltar() {
    if (juegoTerminado) return; //Para que si se para el juego no haga nada mas
    salto = true;
    gotchi.style.transition = "top 0.5s ease";
    gotchi.style.top = '0px';  // El monigote salta hacia arriba
    let ksnd = 300;
    let ms = ksnd + "ms";

    setTimeout(() => {
        gotchi.style.top = '60px';  // El gotchi vuelve a su posición inicial (top: 60px)
        salto = false;
        if (!juegoTerminado) {
            const barraRect = barra.getBoundingClientRect();
            const gotchiRect = gotchi.getBoundingClientRect();

            if (barraRect.left < gotchiRect.right && barraRect.left > gotchiRect.left) {
                console.log("Colisión detectada, el puntaje no se incrementa.");
            } else {
                // Si no hay colisión, sumamos al puntaje
                score++;
                ksnd -=1000;
                ms = ksnd + "ms";
                gotchi.style.animation = `moverBarra ${ms} linear infinite`;
                console.log("Puntaje:", score);
            }
        }
        
    }, 1000);
}

// Se ejecuta cada 100 ms para mover la barra
setInterval(() => {
    moverBarra();
    document.getElementById('score').textContent = `score = ${score}`;
}, 100);

function detenerJuego() {
    juegoTerminado = true;
    barra.style.animationPlayState = 'paused';  // Detener la animación de la barra
}

document.getElementById('next-button').addEventListener('click', () => {
    saltar();
});