document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica de navegación activa ---
    const navLinks = document.querySelectorAll('.nav-item a');
    const sections = document.querySelectorAll('section');

    const updateActiveNavLink = () => {
        let currentActive = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Un offset para que el enlace se active antes de llegar al top exacto
            if (pageYOffset >= sectionTop - 150) { 
                currentActive = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentActive)) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Llama al inicio para activar el primer enlace

    // --- Animaciones al Scroll (Intersection Observer) ---
    const animatedElements = document.querySelectorAll(
        '.anim-slide-up, .anim-slide-in, .anim-slide-right, .anim-slide-left, .anim-fade-in, .anim-rotate-in, .anim-zoom-in-stagger, .anim-slide-up-stagger, .anim-section-fade'
    );

    const observerOptions = {
        root: null, // Observa el viewport
        rootMargin: '0px',
        threshold: 0.1 // El elemento es visible si el 10% está en el viewport
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Si es visible, añade la clase 'visible'
                entry.target.classList.add('visible');
                // Si es una sección principal, aplica la clase visible a ella
                if (entry.target.classList.contains('anim-section-fade')) {
                    entry.target.classList.add('visible');
                }
                observer.unobserve(entry.target); // Deja de observar una vez animado
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
        
        // Asignar el retraso para animaciones escalonadas
        // Esto es para los elementos que tienen anim-delay-X en su HTML
        const delayMatch = element.className.match(/anim-delay-(\d+)/);
        if (delayMatch) {
            const delay = parseInt(delayMatch[1]) * 0.15; // 0.15s por cada paso de retraso
            element.style.setProperty('--delay', `${delay}s`);
        }
    });

    // --- Animaciones de carga inicial para la Hero Section ---
    // Asegurarse de que los elementos de la hero section tengan el delay al cargar
    const heroElements = document.querySelectorAll('#hero .anim-fade-in, #hero .anim-slide-left, #hero .anim-slide-right, #hero .anim-slide-up');
    heroElements.forEach(element => {
        const delayMatch = element.className.match(/anim-delay-(\d+)/);
        if (delayMatch) {
            const delay = parseInt(delayMatch[1]) * 0.2; // Un retraso un poco más largo para la carga inicial
            element.style.setProperty('--delay', `${delay}s`);
        }
        element.classList.add('visible'); // Forzar la visibilidad al cargar
    });


    // --- Menú Toggle para móviles ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Cierra el menú cuando se hace clic en un enlace (en móvil)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });
});