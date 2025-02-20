//A veces tarda en reaccionar o no se suma el 20
function restoreHealth() {
    if(window.gotchi.health <= 80 && sick()) {
        window.gotchi.health += 20;
        updateHealthIcon();
        document.addEventListener('healthChange', sick);
    } else {
        //El monigote se niega
    }
}

function sick(){
    if (gotchi.health <= 60) {
        const isSick = Math.random() < 0.5;
        if (isSick) {
            animation(edadGotchi(), 'sick');
            
            document.removeEventListener('healthChange', sick);
            return isSick;
        } else {
            animation(edadGotchi(), 'idle');
            return false;
        }
        
    } else {
        animation(edadGotchi(), 'idle');
        return false;
    }
}

document.addEventListener('healthChange', sick);

function updateHealthIcon() {
    if (gotchi.health > 60) {
        animation(edadGotchi(), 'idle'); // Icono normal
    }
}