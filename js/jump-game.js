'use strict';
animation(edadGotchi(), 'idle');

const game = document.querySelector('.mascot');

let gotchiBottom = 0;  // Controlar la altura del gotchi
let salto = false;
let score = 0;
let juegoTerminado = false;
let timeoutTime = 1000;
let moving = true;

let colisionDetectada = false;

function newBarra(){
    let newBarra = document.createElement('div');
    newBarra.id = 'barra';
    game.appendChild(newBarra);
    console.log("barra creada");

    let gameWidth = game.getBoundingClientRect().width + 50; // Obtén el ancho del contenedor 'game'
    let leftPosition = gameWidth ; // Empieza fuera de la pantalla a la derecha
    let speed = 1; // Velocidad inicial
    
  function moveBarra() {
    if (moving) {
        leftPosition -= speed; // Desplaza la barra a la izquierda
            if (leftPosition < -20) { // Si la barra sale completamente por la izquierda
            score++;
            leftPosition = gameWidth; // Vuelve a la posición inicial a la derecha
            speed += 0.1;
            if (speed > 5) speed = 5; // Aumenta la velocidad, pero no más
            timeoutTime -= 50;
            if (timeoutTime < 500) timeoutTime = 500;
            }

            newBarra.style.left = leftPosition + 'px'; // Mueve la barra a la nueva posición

            requestAnimationFrame(moveBarra); // Llama a la función para continuar el movimiento

            if (score >= 50) {
                moving = false; // Detener la barra
                console.log("La barra se ha detenido. Score alcanzado: " + score);
            }
    }
    
  }

  moveBarra();
}
newBarra();

const gotchi = document.getElementById('health-icon');
const barra = document.getElementById('barra');

function isColliding(gotchi, barra){
    const gotchiRect = gotchi.getBoundingClientRect();
    const barraRect = barra.getBoundingClientRect();

    return !(
        gotchiRect.right < barraRect.left ||
        gotchiRect.left > barraRect.right ||
        gotchiRect.bottom < barraRect.top ||
        gotchiRect.top > barraRect.bottom
    );
}

let colisionTracker = setInterval(() => {
    document.getElementById('score').textContent = `score = ${score}`;
    if(isColliding(gotchi, barra)){
        console.log('Colision detectada');
        detenerJuego();
        clearInterval(colisionTracker);
        gotchi.style.transform = 'rotate(-90deg)';
    }
}, )

// Función para hacer que el monigote salte
function saltar() {
    if (juegoTerminado || salto) return; //Para que si se para el juego no haga nada mas
    salto = true;
    gotchi.style.transition = "top 0.5s ease";
    gotchi.style.top = '0px';  // El gotchi salta hacia arriba
    console.log('gotchi salta');
    

    setTimeout(() => {
        gotchi.style.top = '60px';  // El gotchi vuelve a su posición inicial
        console.log('gotchi baja');
       
            
        gotchi.addEventListener('transitionend', function gestor() {
            console.log('La transición ha terminado');
            salto = false;

            console.log("Puntaje:", score, "Tiempo de espera:", timeoutTime);
            gotchi.removeEventListener('transitionend', gestor);
        });
        
    }, timeoutTime);
}

function detenerJuego() {
    juegoTerminado = true;
    //El clear interval esta haciendo que cuando salta y la barra vuelva le pase por encima al gotchi
    moving = false;
}

document.getElementById('next-button').addEventListener('click', () => {
    saltar();
    console.log('click salto');
});