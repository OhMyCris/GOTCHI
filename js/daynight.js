function dayNight() {

    //Si son entre las 10pm y las 8am se puede apagar y encender la luz, sino no
    if(window.gotchi.date.getHours() >= 22 && window.gotchi.date.getHours() <= 8){ 
        animation(edadGotchi(), 'sleep');

        const isLightOff = document.body.style.backgroundColor === 'black';
        const firstTimeLightOff = sessionStorage.getItem('firstTimeLightOff') === 'true';
        clearInterval(movingGotchi);

        if(isLightOff){
            document.body.style.backgroundColor = 'white';
            document.body.style.color = 'black';

            if (intervalId) {
                clearInterval(intervalId);  // Detenemos el intervalo
            }
            updateValues(gotchi, 3000);
            startSpawningIcons();
        } else {
            document.body.style.backgroundColor = 'black';
            document.body.style.color = 'white';

            if (intervalId) {
                clearInterval(intervalId);  // Detenemos el intervalo
            }
            stopSpawningIcons();
            if(window.gotchi.date.getHours() >= 1 && window.gotchi.date.getHours() <= 6){
                window.gotchi.discipline -= 1;
            } else if(window.gotchi.date.getHours() == 22 && !firstTimeLightOff){
                //Si es la primera vez que se apaga la luz y son justo las 10 de la noche, se le suma 1 a la disciplina
                window.gotchi.discipline += 1;
                sessionStorage.setItem('firstTimeLightOff', 'true');
            }
           
        }
        
    } else {
        document.body.style.backgroundColor = 'white';
        document.body.style.color = 'black';
        sessionStorage.removeItem('firstTimeLightOff');
    }
}