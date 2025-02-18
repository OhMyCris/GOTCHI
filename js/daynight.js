function dayNight() {

    //Si son entre las 10pm y las 8am se puede apagar y encender la luz, sino no
    if(window.gotchi.date.getHours() >= 22 && window.gotchi.date.getHours() <= 8){ 
        const styleSheet = document.getElementById('dynamic-styles').sheet;
        // Inserta la regla para el pseudo-elemento ::before
        styleSheet.insertRule("#health-icon::before { content: 'zzz'; display: block; }", styleSheet.cssRules.length);

        const isLightOff = document.body.style.backgroundColor === 'black';
        const firstTimeLightOff = sessionStorage.getItem('firstTimeLightOff') === 'true';

        if(isLightOff){
            document.body.style.backgroundColor = 'white';
            document.body.style.color = 'black';
        } else {
            document.body.style.backgroundColor = 'black';
            document.body.style.color = 'white';
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