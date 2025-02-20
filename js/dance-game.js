let score = 0;
let miss = 0;
let redFlag = document.getElementById("flag1");
let whiteFlag = document.getElementById("flag2");
let isRed;
let isWhite;
let intervalTime = 4000; // Tiempo inicial del intervalo en milisegundos
let intervalId;
let scoreUpdated = false;

function danceGame(){
    if (redFlag.style.display == "flex" || whiteFlag.style.display == "flex") {
        redFlag.style.display = "none";
        whiteFlag.style.display = "none";
        isRed = false;
        isWhite = false;
    } else {
        let randomValue = Math.random();
        if (randomValue <= 0.33) {
            redFlag.style.display = "flex";
            whiteFlag.style.display = "none";
            isRed = true;
            isWhite = false;
        } else if (randomValue <= 0.66 && randomValue > 0.33) {
            redFlag.style.display = "none";
            whiteFlag.style.display = "flex";
            isRed = false;
            isWhite = true;
        } else if (randomValue <= 1 && randomValue > 0.66) {
            redFlag.style.display = "flex";
            whiteFlag.style.display = "flex";
            isRed = true;
            isWhite = true;
        }
    }

    document.getElementById('score').textContent = `Score: ${score}`;
    console.log("Score: ", score);
    console.log("Miss: ", miss);

    if(miss == 3){
        window.gotchi.happiness -= 5;
        score = 0;
        miss = 0;
        targetUrl = '../index.html';
        window.location.href = targetUrl;
    }

    if (!scoreUpdated) {
         switch(score){
            case 3:
                scoreUpdated = true;
                increaseParams(5, "happiness");
                break;
            case 7:
                increaseParams(5, "happiness");
                scoreUpdated = true;
                break;
            case 15:
                increaseParams(10, "happiness");
                increaseParams(1, "discipline");
                score = 0;
                miss = 0;
                intervalTime = 4000;
                updateInterval();
                scoreUpdated = true;
                targetUrl = '../index.html';
                window.location.href = targetUrl;
                break;
        }
    }
       
    
    

}

function updateInterval() {
    clearInterval(intervalId); // Detener el intervalo actual
    intervalId = setInterval(danceGame, intervalTime); // Crear un nuevo intervalo con el tiempo actualizado
}

document.getElementById('prev-button').addEventListener('click', () => {
    if(redFlag.style.display == "flex" || whiteFlag.style.display == "flex"){
        if(isRed && redFlag.style.display == "flex"){
            if (isWhite && whiteFlag.style.display == "flex") {
                miss += 1;
            } else{
                score += 1;
                intervalTime -= 50; // Reducir el tiempo del intervalo
                updateInterval();
                scoreUpdated = false;
            }
            
        } else {
            miss += 1;
        }
    }
});

document.getElementById('next-button').addEventListener('click', () => {
    if(redFlag.style.display == "flex" || whiteFlag.style.display == "flex"){
        if(isWhite && whiteFlag.style.display == "flex" && isRed && redFlag.style.display == "flex"){
            score += 1;
            intervalTime -= 50; // Reducir el tiempo del intervalo
            updateInterval();
            scoreUpdated = false;
        } else {
            miss += 1;
        }
    }
    
});

document.getElementById('cancel-button').addEventListener('click', () => {
    if(redFlag.style.display == "flex" || whiteFlag.style.display == "flex"){
        if(isWhite && whiteFlag.style.display == "flex"){
            if (isRed && redFlag.style.display == "flex") {
                miss += 1;
            } else{
                score += 1;
                intervalTime -= 50; // Reducir el tiempo del intervalo
                updateInterval();
                scoreUpdated = false;
            }
            
        } else {
            miss += 1;
        }
    }
    
   
});

intervalId = setInterval(danceGame, intervalTime);