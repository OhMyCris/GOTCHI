'use strict';
animation(edadGotchi(), 'idle');

const gotchi = document.getElementById('health-icon');
const barra = document.getElementById('barra');
const game = document.querySelector('.mascot');

let gotchiBottom = 0;  // Controlar la altura del gotchi
let salto = false;
let score = 0;
let juegoTerminado = false;
let velBarra = 3000;
let ms = velBarra + "ms";
let timeoutTime = 1000;

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
    if (juegoTerminado || salto) return; //Para que si se para el juego no haga nada mas
    salto = true;
    gotchi.style.transition = "top 0.5s ease";
    gotchi.style.top = '0px';  // El monigote salta hacia arriba
    

    setTimeout(() => {
        gotchi.style.top = '60px';  // El gotchi vuelve a su posición inicial (top: 60px)
        if (!juegoTerminado) {
            const barraRect = barra.getBoundingClientRect();
            const gotchiRect = gotchi.getBoundingClientRect();

            if (barraRect.left < gotchiRect.right && barraRect.left > gotchiRect.left) {
                console.log("Colisión detectada, el puntaje no se incrementa.");
            } else {
                // Si no hay colisión, sumamos al puntaje
                score++;
                velBarra -=100;
                timeoutTime -= 50;
                if (velBarra < 100) velBarra = 100;
                if (timeoutTime < 600) timeoutTime = 600;
                ms = velBarra + "ms";

                barra.style.right = '0'; // Esto restablece la barra a la esquina derecha
                barra.style.animation = 'none';
                setTimeout(() => {
                    barra.style.animation = `moverBarra ${ms} linear infinite`;  // Reiniciamos la animación con la nueva duración
                }, 20);
                console.log("Puntaje:", score, "Velocidad de la barra:", velBarra, "Tiempo de espera:", timeoutTime);
            }
        }

        gotchi.addEventListener('transitionend', () => {
            console.log('La transición ha terminado');
            salto = false;
        });
        
    }, timeoutTime);
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