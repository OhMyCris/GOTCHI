
async function returnPrev(){
    animation(edadGotchi(), 'refuse');
    setInterval(() => {
        let targetUrl = '';
        //Vuelve al html anterior del que se vino
        targetUrl = document.referrer;
        if (!targetUrl) {
            targetUrl = '../index.html';
        }
        window.location.href = targetUrl;
        
    }, 4000);
}

returnPrev();
