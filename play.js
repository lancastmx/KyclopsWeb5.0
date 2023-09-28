/* Variables para controlar el estado de los botones */
let isLiked = false;  // Estado del botón "Me gusta"
let isPlaying = false;  // Estado del botón de reproducción/pausa
let isMuted = false;  // Estado del botón de volumen/mute

/* Referencia al elemento de audio */
const audioElement = document.querySelector('audio');

/* Función para cambiar el estado del botón "Me gusta" */
function toggleLike() {
    isLiked = !isLiked;  // Cambiar el estado de "Me gusta"
    let heartIcon = document.getElementById('heart').querySelector('img');  // Obtener el icono dentro del botón
    heartIcon.src = isLiked ? './img/OnHeart.png' : './img/OffHeart.png';  // Cambiar la imagen del icono
}

/* Función para cambiar el estado del botón de reproducción/pausa */
function togglePlay() {
    isPlaying = !isPlaying;  // Cambiar el estado de reproducción/pausa
    let playIcon = document.getElementById('play').querySelector('img');  // Obtener el icono dentro del botón
    playIcon.src = isPlaying ? './img/Pause.png' : './img/PlayOn.png';  // Cambiar la imagen del icono

    // Controlar la reproducción de audio
    if (isPlaying) {
        audioElement.play();  // Reproducir audio
    } else {
        audioElement.pause();  // Pausar audio
    }
}

/* Función para cambiar el estado del botón de volumen/mute */
function toggleVolume() {
    isMuted = !isMuted;  // Cambiar el estado de volumen/mute
    let volumeIcon = document.getElementById('volume').querySelector('img');  // Obtener el icono dentro del botón
    volumeIcon.src = isMuted ? './img/VolumenMute.png' : './img/VolumenHigh.png';  // Cambiar la imagen del icono

    // Controlar el estado de silencio del audio
    audioElement.muted = isMuted;
}

const barraSonido = document.querySelector('.barra-sonido');
const triangulo = document.querySelector('.triangulo');
const puntoControl = document.querySelector('.punto-control');
let arrastrando = false;

/* Función para actualizar el valor de la barra de sonido */
function actualizarBarraSonido(event) {
    if (arrastrando) {
        const posicionX = event.clientX - barraSonido.getBoundingClientRect().left;
        const anchoBarra = barraSonido.clientWidth;
        let valor = (posicionX / anchoBarra) * 100; // Calcula el porcentaje
        valor = Math.min(100, Math.max(0, valor)); // Asegura que el valor esté entre 0 y 100
        puntoControl.style.left = `${valor}%`;
        triangulo.style.width = `${valor}%`; // Actualiza el ancho del triángulo

        // Cambiar el volumen del audio
        audioElement.volume = valor / 100;
    }
}

/* Evento al hacer clic en la barra de sonido */
barraSonido.addEventListener('mousedown', () => {
    arrastrando = true;
});

/* Evento al soltar el clic en cualquier parte de la página */
document.addEventListener('mouseup', () => {
    arrastrando = false;
});

/* Evento al mover el ratón */
document.addEventListener('mousemove', actualizarBarraSonido);

/* Evento al hacer clic en el punto de control */
puntoControl.addEventListener('mousedown', (event) => {
    event.stopPropagation(); // Evita que el clic se propague a la barra de sonido
    arrastrando = true;
});

/* Evento al soltar el clic en el punto de control */
document.addEventListener('mouseup', () => {
    arrastrando = false;
});
