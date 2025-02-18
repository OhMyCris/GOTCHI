
async function returnPrev(){
    window.gotchi.looks.splice(0, 2, '../img/Mari1-left.png', '../img/Mari2-right.png');
    setInterval(() => {
        let targetUrl = '';
        //Vuelve al html anterior del que se vino
        targetUrl = document.referrer;
        if (!targetUrl) {
            targetUrl = 'main.html';
        }
        window.location.href = targetUrl;
        
    }, 4000);
}

returnPrev();
