const gotchimoving = document.getElementById('health-icon');
const mascot = document.querySelector('.mascot');

const iconSize = mascot.clientWidth / 10;

// Obtener las dimensiones del contenedor .mascot
const mascotWidth = mascot.clientWidth;

// Inicializamos la posición actual del icono
let currentX = 0;

function moveHealthIcon() {
    // Movimiento aleatorio: 1 para derecha, -1 para izquierda
    const directionX = Math.random() < 0.5 ? 1 : -1;  // Aleatorio entre 1 (derecha) o -1 (izquierda)

    // Calcular la nueva posición horizontal
    const newX = currentX + (directionX * iconSize);

    // Verificar si el icono se sale de los límites
    if (newX + iconSize <= mascotWidth && newX >= 0) {
        currentX = newX;  // Solo actualizar si está dentro de los límites
    }

    // Aplicar la transformación para mover el icono a la posición aleatoria
    gotchimoving.style.transform = `translate(${currentX}px)`;
}

// Llamar a la función para mover el icono cada cierto tiempo aleatorio
setInterval(moveHealthIcon, 2000); // Cada 1 segundo, mueve el icono