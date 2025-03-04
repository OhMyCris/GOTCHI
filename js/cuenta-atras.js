document.addEventListener('DOMContentLoaded', () => {
    const tiempoElemento = document.getElementById('tiempo-restante');
    
    // Tiempo inicial en segundos (ejemplo: 20 segundos)
    let tiempoRestante = parseInt(localStorage.getItem('tiempoRestante')) || 20;
  
    // Actualiza el elemento con el tiempo restante
    tiempoElemento.textContent = tiempoRestante;
  
    // Función para manejar la cuenta atrás
    const cuentaAtras = () => {
      if (tiempoRestante > 0) {
        tiempoRestante--;
        tiempoElemento.textContent = tiempoRestante;
        localStorage.setItem('tiempoRestante', tiempoRestante);
        window.cuentaAtrasTimeout = setTimeout(cuentaAtras, 1000); // Llama a cuentaAtras cada segundo
      } else {
        tiempoElemento.textContent = "0";
        window.gotchi.discipline -=1;

        reiniciarCuentaAtras();

        localStorage.removeItem('tiempoRestante'); // Opcional: eliminar el valor de localStorage
        localStorage.setItem('tiempoRestante', 20);
      }
    };

    // Función para reiniciar la cuenta atrás
    function reiniciarCuentaAtras() {
      // Detener el timeout previo
      clearTimeout(window.cuentaAtrasTimeout);
      
      // Establecer el tiempo restante a 20 segundos
      tiempoRestante = 20;
      tiempoElemento.textContent = tiempoRestante;
      localStorage.setItem('tiempoRestante', tiempoRestante);

  }

    const paginaActual = window.location.pathname.split('/').pop();
    // Inicia la cuenta atrás
    if (paginaActual === 'refuse.html' || tiempoRestante < 20) {
      cuentaAtras();
    } else {
      localStorage.removeItem('tiempoRestante');
    }
    
  });