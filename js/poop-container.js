window.poopContainer = document.getElementById('poop-container');
window.spawnIntervalId = null;

//Igual prefiero que vaya por porcentajes en vez de por intervalo
function spawnIcon() {
    const poopContainer = document.getElementById('poop-container');
    const newIcon = document.createElement('span');
    newIcon.classList.add('icon');
    newIcon.innerHTML = '<i class="fa-solid fa-poo"></i>'; // Puedes cambiar el icono aquí
    poopContainer.appendChild(newIcon);

    const spanCount = poopContainer.getElementsByTagName('span').length;

    if(spanCount >= 10){
        let targetUrl = '';
        targetUrl = 'dead.html';
        window.location.href = targetUrl;
    }
}


function startSpawningIcons() {
    // Limpiar cualquier intervalo existente antes de iniciar uno nuevo
    if (window.spawnIntervalId) {
        clearInterval(window.spawnIntervalId);
    }
    window.spawnIntervalId = setInterval(spawnIcon, 60000);
}

function stopSpawningIcons() {
    if (window.spawnIntervalId) {
        clearInterval(window.spawnIntervalId);
        window.spawnIntervalId = null;
        const poopContainer = document.getElementById('poop-container');
        const span = document.querySelectorAll('#poop-container span');
        
        span.forEach((element) => {
            poopContainer.removeChild(element);
        });
    }
}

// Iniciar la generación de iconos
startSpawningIcons();
