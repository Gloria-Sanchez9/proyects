/*FRAME 3 FIGMA */
/* CARRUSEL PROYECTOS */

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('carruselContainer');
    const track = document.querySelector('.carrusel-tarjetas');
    const btnSiguiente = document.getElementById('nextBtn');
    const btnAtras = document.getElementById('prevBtn');

    // Clonación de las tarjetas para crear el efecto infinito
    const tarjetas = Array.from(track.children);
    tarjetas.forEach(tarjeta => {
        const clon = tarjeta.cloneNode(true);
        track.appendChild(clon); // se ponen los clones al final
    });

    const obtenerAnchoBase = () => {
        const tarjeta = document.querySelector('.team-member-card1');
        return tarjeta ? tarjeta.offsetWidth + 20 : 320;
    };

    // Movimiento automático
    let velocidad = 1.0; // el tiempo en el q se mueven
    let pausa = false;

    const loopInfinito = () => {
        if (!pausa) {
            container.scrollLeft += velocidad;

            // cuando el carrusel llega a la mitad, se salta al inicio (la intencion es q no se note)
            if (container.scrollLeft >= track.scrollWidth / 2) {
                container.scrollLeft = 0;
            }
        }
        requestAnimationFrame(loopInfinito);
    };

    // iniciar el loop
    requestAnimationFrame(loopInfinito);

    /*// botones para mover 
    btnSiguiente.onclick = () => {
        container.scrollLeft += obtenerAnchoBase();
        if (container.scrollLeft >= track.scrollWidth / 2) container.scrollLeft = 0;
    };

    btnAtras.onclick = () => {
        if (container.scrollLeft <= 0) container.scrollLeft = track.scrollWidth / 2;
        container.scrollLeft -= obtenerAnchoBase();
    };*/

    // pausa al pasar el mouse
    container.onmouseenter = () => pausa = true;
    container.onmouseleave = () => pausa = false;
});