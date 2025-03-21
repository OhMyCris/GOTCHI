'use strict';
animation(edadGotchi(), 'idle');

const gotchi = document.getElementById('health-icon');
const barra = document.getElementById('barra');
const game = document.querySelector('.mascot');



let gotchiBottom = 0;  // Controlar la altura del gotchi
let salto = false;
let score = 0;
let juegoTerminado = false;
let timeoutTime = 1000;

let colisionDetectada = false;

function newBarra(){
    let newBarra = document.createElement('div');
    newBarra.id = 'barra';
    game.appendChild(newBarra);
    console.log("barra creada");

    let gameWidth = game.getBoundingClientRect().width + 50; // Obtén el ancho del contenedor 'game'
    let leftPosition = gameWidth ; // Empieza fuera de la pantalla a la derecha
    let speed = 1; // Velocidad inicial
    let moving = true;

  function moveBarra() {
    if (moving) {
        leftPosition -= speed; // Desplaza la barra a la izquierda
            if (leftPosition < -20) { // Si la barra sale completamente por la izquierda
            score++;
            leftPosition = gameWidth; // Vuelve a la posición inicial a la derecha
            speed += 0.1;
            if (speed > 5) speed = 5; // Aumenta la velocidad, pero no más
            }

            newBarra.style.left = leftPosition + 'px'; // Mueve la barra a la nueva posición

            requestAnimationFrame(moveBarra); // Llama a la función para continuar el movimiento

            if (score >= 30) {
                moving = false; // Detener la barra
                console.log("La barra se ha detenido. Score alcanzado: " + score);
            }
    }
    
  }

  moveBarra();
}
newBarra();

// function colisiones(){
//     const barraRect = barra.getBoundingClientRect();
//     const gotchiRect = gotchi.getBoundingClientRect();
//     const gameRect = game.getBoundingClientRect();

//     // Calcular la posición vertical actual del Gotchi (top)
//     const gotchiPosicionY = parseFloat(gotchi.style.top || "60px");

//     const margenX = 20; //Margen dentro del eje X en el que detecta la colision del eje Y

//     const cercaDeLaBarraEnX = gotchiRect.right > barraRect.left - margenX && gotchiRect.left < barraRect.right + margenX;

//     // Verificar la colisión en el eje Y (vertical)
//     const colisionY = cercaDeLaBarraEnX && (gotchiRect.bottom >= barraRect.top && gotchiRect.bottom <= barraRect.top + barraRect.height);

//      // Agregar logs para ver los valores exactos de la colisión
//      console.log("gotchiRect.bottom:", gotchiRect.bottom);
//      console.log("barraRect.top:", barraRect.top);
//      console.log("barraRect.top + barraRect.height:", barraRect.top + barraRect.height);
//      console.log("¿Colisión en Y?:", colisionY);
 

//     // Verificar la colisión en el eje X (horizontal)
//     const colisionX1 = barraRect.left < gotchiRect.right && barraRect.left > gotchiRect.left;
//     const colisionX2 = barraRect.right > gotchiRect.left && barraRect.right < gotchiRect.right;

//     console.log("gotchiRect.right:", gotchiRect.right);
//      console.log("barraRect.left:", barraRect.left);
//      console.log("barraRect.right:", barraRect.right);
//      console.log("gotchiRect.left:", gotchiRect.left);
//      console.log("¿Colisión X1?:", colisionX1);
//      console.log("¿Colisión X2?:", colisionX2);

//      // Si no se ha detectado ninguna colisión previamente, mostramos los logs
//      if (!colisionDetectada) {
//         console.log("Posición Gotchi Y:", gotchiPosicionY);
//         console.log("Colisión Y:", colisionY);
//         console.log("Colisión X1:", colisionX1);
//         console.log("Colisión X2:", colisionX2);
//     }

//     // Si se detecta una colisión, cambiamos la bandera para dejar de mostrar los logs
//     if ((colisionX1 || colisionX2) && colisionY) {
//         colisionDetectada = true;
//         console.log("¡Colisión detectada! Deja de mostrar los logs.");
//     }


//     // Retornamos los valores de colisiones para usarlos en moverBarra
//     return {
//         colisionX1,
//         colisionX2,
//         colisionY,
//         gotchiPosicionY,
//         gameRect,
//         barraRect
//     };
// }

function moverBarra() {
    // const { colisionX1, colisionX2, colisionY, gotchiPosicionY, gameRect, barraRect } = colisiones();

    // // Verificar si la barra está cerca del monigote
    // if ((colisionX1 || colisionX2) && colisionY && gotchiPosicionY === 60 && !salto) {
    //     detenerJuego(); 
    //     console.log('Colision detectada, barra parada');
    // }
}

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
                timeoutTime -= 50;
                if (timeoutTime < 600) timeoutTime = 600;

                console.log("Puntaje:", score, "Tiempo de espera:", timeoutTime);
                gotchi.removeEventListener('transitionend', gestor);
        });
        
    }, timeoutTime);
}

// Se ejecuta cada 100 ms para mover la barra
let colisionTracker = setInterval(() => {
    moverBarra();
    document.getElementById('score').textContent = `score = ${score}`;

}, );

function detenerJuego() {
    juegoTerminado = true;
    //El clear interval esta haciendo que cuando salta y la barra vuelva le pase por encima al gotchi
    clearInterval(colisionTracker);
}

document.getElementById('next-button').addEventListener('click', () => {
    saltar();
    console.log('click salto');
});