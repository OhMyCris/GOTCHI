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
    const healthSpan = document.getElementById('health-icon');
    if (gotchi.health <= 60) {
        const isSick = Math.random() < 0.5;
        if (isSick) {
            window.gotchi.looks.splice(0, 2, '../img/Mari1-sick.png', '../img/Mari2-sick.png');
            //healthSpan.innerHTML = '<img src="../img/Mari1-sick.png" alt="">';
            document.removeEventListener('healthChange', sick);
            return isSick;
        } else {
            window.gotchi.looks.splice(0, 2, '../img/Mari1-idle.png', '../img/Mari2-idle.png');
            return false;
        }
        
    } else {
        window.gotchi.looks.splice(0, 2, '../img/Mari1-idle.png', '../img/Mari2-idle.png');
        return false;
    }
}

document.addEventListener('healthChange', sick);

function updateHealthIcon() {
    const healthSpan = document.getElementById('health-icon');
    if (gotchi.health > 60) {
        healthSpan.innerHTML = '<img src="../img/Mari1-idle.png" alt="">'; // Icono normal
    }
}