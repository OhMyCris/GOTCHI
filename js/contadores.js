//const savedState = localStorage.getItem('objectState');
window.gotchi = /*savedState ? JSON.parse(savedState) : */{
    age: 0,
    health: 100,
    hunger: 100,
    happiness: 100,
    date: new Date(),
    alive: true,
    discipline: 50,
    looks: [
        {
            name: 'baby',
            idle: ['img/Cindi1-idle.png', 'img/Cindi2-idle.png'],
            sick: ['img/Cindi1-sick.png', 'img/Cindi2-sick.png'],
            refuse: ['../img/Cindi1-left.png', '../img/Cindi2-right.png'],
            dead: ['../img/Cindi1-dead.png', '../img/Cindi2-dead.png']
        },
        {
            name: 'stage1-1',
            idle: ['img/Mari1-idle.png', 'img/Mari2-idle.png'],
            sick: ['img/Mari1-sick.png', 'img/Mari2-sick.png'],
            refuse: ['../img/Mari1-left.png', '../img/Mari2-right.png'],
            dead: ['../img/Mari1-dead.png', '../img/Mari2-dead.png']
        },
        {
            name: 'stage2-1',
            idle: ['img/Rose1-idle.png', 'img/Rose2-idle.png'],
            sick: ['img/Rose1-sick.png', 'img/Rose2-sick.png'],
            refuse: ['../img/Rose1-left.png', '../img/Rose2-right.png'],
            dead: ['../img/Rose1-dead.png', '../img/Rose2-dead.png'],
            sleep: ['../img/Rose1-sleep.png', '../img/Rose2-sleep.png']
        }
    ]  
}
//Se declara aqui pero la estoy usando tambien en otros js
let targetUrl = '';

//Para que se incremente cualquier valor sin pasar de 100
function increaseParams(amount, param){
    console.log(`Aumentando ${param} en ${amount}`);
    gotchi[param] += amount;
    if(gotchi[param] >= 100) {
        gotchi[param] = 100;
        alert('Your pet refuses');
    }
}

function decreaseParams(amount, param){
    console.log(`Reduciendo ${param} en ${amount}`);
    gotchi[param] -= amount;
    if(gotchi[param] <= 0) {
        gotchi[param] = 0;
    }
}

//Para que se actualice la hora
function clock(){
    window.gotchi.date = new Date();
}
setInterval(clock, 1000);

//Cuando se abre el tamagotchi por primera vez, se guarda la fecha actual en el localStorage
let fechaAlmacenada = localStorage.getItem('fechaAlmacenada');

if (fechaAlmacenada) {
    // Si la fecha está en localStorage y es una fecha válida
    fechaAlmacenada = new Date(fechaAlmacenada);
    console.log(fechaAlmacenada);
} else {
    // Si no hay fecha almacenada, guarda la fecha actual
    fechaAlmacenada = gotchi.date;
    localStorage.setItem('fechaAlmacenada', fechaAlmacenada.toISOString());
    console.log("Fecha almacenada:", fechaAlmacenada);
}

function calcularDiferenciaDias(fechaAlmacenada, fechaActual) {
    const unDia = 24 * 60 * 60 * 1000; // Milisegundos en un día
    const diferenciaEnMilisegundos = fechaActual - fechaAlmacenada;
    const diferenciaEnDias = Math.floor(diferenciaEnMilisegundos / unDia);
    return diferenciaEnDias;
}

const diasTranscurridos = calcularDiferenciaDias(fechaAlmacenada, gotchi.date);
console.log(diasTranscurridos);

let edadAnterior = gotchi.age;
//Se suma un año cada semana
if(diasTranscurridos >= 7){
    const incrementos = Math.floor(diasTranscurridos / 7);
    gotchi.age += incrementos;

    if(gotchi.age !== edadAnterior){
        //Evolucion o muerte dependiendo de la edad, me ha sumado un año cuando deberia esperar una semana para ello
        /*switch(gotchi.age){
            case 1:
                if (!window.location.pathname.includes('index.html')) {
                    targetUrl = '../index.html';
                    window.location.href= targetUrl;
                } else{
                    targetUrl = 'html/evolution-1.html';
                    window.location.href = targetUrl;
                }
                
                break;
            case 3:
                if (!window.location.pathname.includes('index.html')) {
                    targetUrl = '../index.html';
                    window.location.href= targetUrl;
                }else{
                    targetUrl = 'html/evolution-2.html';
                    window.location.href = targetUrl;
                }
                
                break;
            case 5:
                if (!window.location.pathname.includes('index.html')) {
                    targetUrl = '../index.html';
                    window.location.href= targetUrl;
                }else{
                    targetUrl = 'html/dead.html';
                    window.location.href = targetUrl;
                }
                
                break;
        }*/
    }
    
}

console.log(gotchi.age);

//Para que el gotchi se mueva
//El stage sirve para buscar el objeto de las imagenes (baby, stage1-1, etc...), y el imgs para ponerle
//la clave del grupo de imagenes(idle, sick, refuse, etc...)
let currentInterval;
function animation(stage, imgs){
    let image = document.getElementById('health-icon');
    let counter = 0;

    //Para que no se generen intervalos superpuestos
    if (currentInterval) {
        clearInterval(currentInterval);
    }

    let gotchiStage = window.gotchi.looks.find(look => look.name == stage);

    let idleImgs = gotchiStage[imgs];

    let targetPath = window.location.pathname;

    currentInterval = setInterval(() => {
        if(targetPath.includes('jump-game.html') || targetPath.includes('evolution')){
            image.innerHTML = counter % 2 === 0  ? `<img src="../${idleImgs[0]}" alt="">` : `<img src="../${idleImgs[1]}" alt="">`;
        } else {
            image.innerHTML = counter % 2 === 0  ? `<img src="${idleImgs[0]}" alt="">` : `<img src="${idleImgs[1]}" alt="">`;
        }
        
        counter++;
    }, 500);

}

function getCurrentStage() {
    // Obtener el nombre del stage actual
    let gotchi = window.gotchi;
    let currentStage = gotchi.looks.find(look => look.name === 'baby'); // Aquí puedes usar cualquier lógica para determinar el estado actual
    return currentStage ? currentStage.name : null;
}

//Cambia automaticamente el nombre de su fase evolutiva segun la edad que tenga
function edadGotchi(){
    if(window.gotchi.age == 0){
        return 'baby';
    } else if (window.gotchi.age >= 1 && window.gotchi.age < 3){
        return 'stage1-1';
    }
    else if (window.gotchi.age >= 3){
        return 'stage2-1';
    }
}

//Para que la animacion se ejecute solo en los que muestren al gotchi
const healthIcon = document.getElementById('health-icon');
if(healthIcon){
    animation(edadGotchi(), 'idle');
}



//Para que ejecute sick() cada vez que se actualice la salud
const healthChangeEvent = new Event('healthChange');

function updateHealth(newHealth) {
    window.gotchi.health = newHealth;
    document.dispatchEvent(healthChangeEvent);
}

let intervalId;

function updateValues(obj, interval){
   intervalId = setInterval(() => {
    console.log(obj); //Ver los valores en consola
    //Bucle for para separar los intervalos
    const properties = ['health', 'hunger', 'happiness'];
    let todasEnCero = true;

    for(const key in obj){
        if(properties.includes(key) && obj[key] > 0){
            updateGochi(key, obj);
        } 
        
        if(properties.includes(key) && obj[key] != 0){
            todasEnCero = false;
        }
    }

    const paginaActual = window.location.pathname.split('/').pop();

    if(todasEnCero){
        clearInterval(intervalId);

        // Si estás en la raíz o en 'index.html', la URL será directamente /html/dead.html
        if (paginaActual === 'index.html') {
            targetUrl = 'html/dead.html';
        } else {
            // Si estás en cualquier otro archivo, ajusta la ruta relativa
            targetUrl = '../html/dead.html';  // Esto sube un nivel
        }

        window.location.href = targetUrl;
        return;
    }
        //localStorage.setItem('objectState', JSON.stringify(obj));

        //Esto muestra los valores en el HTML, cuando funcione bien se borra
        document.getElementById('output').innerText = `Health: ${obj.health} Hunger: ${obj.hunger} Happiness: ${obj.happiness} Discipline: ${obj.discipline}`;
        if(window.location.href.includes('info')){
           document.getElementById('age').innerText = `age: ${obj.age} yrs`; 
        }
        
    }, interval);

}

function updateGochi(key, obj) {
    if (key === 'health') {
        // Aplica la lógica específica para 'health'
        let newHealth = obj.health - 1;
        updateHealth(newHealth); // Actualiza la salud y dispara el evento
        obj[key] = newHealth;
    } else {
        obj[key] -= 1;
    }

    if (obj[key] <= 0) {
        obj[key] = 0;
    }
}

updateValues(gotchi, 3000);

sessionStorage.getItem('disciplineTime');


