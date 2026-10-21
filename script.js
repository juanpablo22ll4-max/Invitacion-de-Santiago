/* =========================================================
   SANTIAGO JOSÉ
   NIVEL 2 DESBLOQUEADO
   PAW PATROL BIRTHDAY INVITATION
========================================================= */

"use strict";


/* =========================================================
   CONFIGURACIÓN PRINCIPAL
========================================================= */

const CONFIG = {

    nombre: "Santiago José",

    edad: 2,

    lugar: "Chuck E. Cheese",

    // Sábado 14 de noviembre de 2026
    // 3:00 p. m. - Hora de Chicago

    fecha: "2026-11-14T15:00:00-06:00",

    // GOOGLE MAPS

    mapsURL: "https://maps.app.goo.gl/pnQHC26ZSyE6uAeL7",

    // CONFIRMACIÓN POR WHATSAPP

    metodoConfirmacion: "whatsapp",

    whatsappNumber: "18156931464",

    // ANIMACIONES

    confettiCantidad: 110,

    activarParticulas: true,

    activarParallax: true,

    activarBienvenida: true

};


/* =========================================================
   CONFIGURACIÓN DE MOVIMIENTO
========================================================= */

const reducirMovimiento = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;


/* =========================================================
   ELEMENTOS PRINCIPALES
========================================================= */

const welcomeScreen = document.getElementById(
    "welcomeScreen"
);

const openButton = document.getElementById(
    "openButton"
);

const invitation = document.getElementById(
    "invitation"
);

const confettiContainer = document.getElementById(
    "confettiContainer"
);

const particlesContainer = document.getElementById(
    "particles"
);

const santiagoPhoto = document.getElementById(
    "santiagoPhoto"
);

const eventDate = document.getElementById(
    "eventDate"
);

const countdownSection = document.getElementById(
    "countdownSection"
);

const mapsButton = document.getElementById(
    "mapsButton"
);

const locationMessage = document.getElementById(
    "locationMessage"
);


/* =========================================================
   PANTALLA DE BIENVENIDA
========================================================= */

function iniciarBienvenida() {

    if (!welcomeScreen) return;

    if (!CONFIG.activarBienvenida) {

        welcomeScreen.hidden = true;

        return;

    }

    document.body.classList.add("no-scroll");

    if (!openButton) return;

    openButton.addEventListener("click", () => {

        abrirInvitacion();

    });

}


/* =========================================================
   ABRIR INVITACIÓN
========================================================= */

function abrirInvitacion() {

    if (!welcomeScreen) return;

    welcomeScreen.classList.add("is-hidden");

    document.body.classList.remove("no-scroll");

    if (!reducirMovimiento) {

        lanzarConfeti();

    }

    setTimeout(() => {

        welcomeScreen.hidden = true;

        window.scrollTo({
            top: 0,
            behavior: "auto"
        });

    }, reducirMovimiento ? 0 : 800);

}


/* =========================================================
   CONFETI
========================================================= */

function lanzarConfeti() {

    if (!confettiContainer) return;

    const colores = [
        "#ffd43c",
        "#f1494b",
        "#0878d8",
        "#ffffff",
        "#38bd86",
        "#87d4ff"
    ];

    const cantidad = Math.min(
        CONFIG.confettiCantidad,
        160
    );

    for (let i = 0; i < cantidad; i++) {

        const pieza = document.createElement("span");

        pieza.classList.add("confetti-piece");

        const color = colores[
            Math.floor(Math.random() * colores.length)
        ];

        const izquierda = Math.random() * 100;

        const retraso = Math.random() * 1.5;

        const duracion = 3 + Math.random() * 3;

        const tamaño = 6 + Math.random() * 8;

        pieza.style.left = `${izquierda}%`;

        pieza.style.width = `${tamaño}px`;

        pieza.style.height = `${tamaño * 1.5}px`;

        pieza.style.setProperty(
            "--confetti-color",
            color
        );

        pieza.style.setProperty(
            "--delay",
            `${retraso}s`
        );

        pieza.style.setProperty(
            "--duration",
            `${duracion}s`
        );

        confettiContainer.appendChild(pieza);

        setTimeout(() => {

            pieza.remove();

        }, (duracion + retraso) * 1000 + 200);

    }

}


/* =========================================================
   PARTÍCULAS DE LA PORTADA
========================================================= */

function crearParticulas() {

    if (
        !particlesContainer ||
        !CONFIG.activarParticulas ||
        reducirMovimiento
    ) return;

    const cantidad = window.innerWidth < 700
        ? 15
        : 28;

    for (let i = 0; i < cantidad; i++) {

        const particula = document.createElement(
            "span"
        );

        particula.classList.add("particle");

        const izquierda = Math.random() * 100;

        const arriba = Math.random() * 100;

        const duracion = 4 + Math.random() * 5;

        const retraso = Math.random() * -8;

        const tamaño = 2 + Math.random() * 5;

        particula.style.left = `${izquierda}%`;

        particula.style.top = `${arriba}%`;

        particula.style.width = `${tamaño}px`;

        particula.style.height = `${tamaño}px`;

        particula.style.animationDelay =
            `${retraso}s`;

        particula.style.setProperty(
            "--particle-duration",
            `${duracion}s`
        );

        particlesContainer.appendChild(particula);

    }

}


/* =========================================================
   ANIMACIONES AL HACER SCROLL
========================================================= */

function iniciarScrollReveal() {

    const elementos = document.querySelectorAll(
        ".reveal"
    );

    if (
        reducirMovimiento ||
        !("IntersectionObserver" in window)
    ) {

        elementos.forEach(elemento => {

            elemento.classList.add("visible");

        });

        return;

    }

    const observer = new IntersectionObserver(

        (entries, observador) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add(
                    "visible"
                );

                observador.unobserve(
                    entry.target
                );

            });

        },

        {
            threshold: 0.12,
            rootMargin: "0px 0px -35px 0px"
        }

    );

    elementos.forEach(elemento => {

        observer.observe(elemento);

    });

}


/* =========================================================
   EFECTO PARALLAX EN LA FOTO
========================================================= */

function iniciarParallax() {

    if (
        !CONFIG.activarParallax ||
        reducirMovimiento ||
        window.innerWidth < 1000
    ) return;

    const visual = document.querySelector(
        "[data-parallax]"
    );

    if (!visual) return;

    const hero = document.querySelector(
        ".hero"
    );

    if (!hero) return;

    let framePendiente = false;

    let rotacionX = 0;

    let rotacionY = 0;

    function actualizarVisual() {

        visual.style.transform = `
            perspective(1100px)
            rotateX(${rotacionX}deg)
            rotateY(${rotacionY}deg)
        `;

        framePendiente = false;

    }

    hero.addEventListener("pointermove", (event) => {

        if (event.pointerType === "touch") return;

        const rect = hero.getBoundingClientRect();

        const centroX = rect.left + rect.width / 2;

        const centroY = rect.top + rect.height / 2;

        const diferenciaX =
            (event.clientX - centroX) /
            (rect.width / 2);

        const diferenciaY =
            (event.clientY - centroY) /
            (rect.height / 2);

        rotacionX = -diferenciaY * 4;

        rotacionY = diferenciaX * 5;

        if (!framePendiente) {

            framePendiente = true;

            requestAnimationFrame(
                actualizarVisual
            );

        }

    });

    hero.addEventListener("pointerleave", () => {

        visual.style.transform = "";

    });

}


/* =========================================================
   CONTROL DE FOTOGRAFÍA
========================================================= */

function configurarFotografia() {

    if (!santiagoPhoto) return;

    santiagoPhoto.addEventListener(
        "error",
        () => {

            console.warn(
                "No se pudo cargar la foto de Santiago."
            );

        }
    );

}


/* =========================================================
   FECHA Y CUENTA REGRESIVA
========================================================= */

let fechaFinal = null;

function configurarFecha() {

    if (!eventDate) return;

    if (!CONFIG.fecha) {

        eventDate.textContent = "Por confirmar";

        if (countdownSection) {

            countdownSection.hidden = true;

        }

        return;

    }

    const fecha = new Date(CONFIG.fecha);

    if (Number.isNaN(fecha.getTime())) {

        eventDate.textContent = "Por confirmar";

        if (countdownSection) {

            countdownSection.hidden = true;

        }

        return;

    }

    fechaFinal = fecha;

    const formato = new Intl.DateTimeFormat(
        "es-US",
        {
            timeZone: "America/Chicago",
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

    const textoFecha = formato.format(fecha);

    eventDate.textContent =
        textoFecha.charAt(0).toUpperCase() +
        textoFecha.slice(1);

    if (countdownSection) {

        countdownSection.hidden = false;

    }

    actualizarCuentaRegresiva();

    setInterval(
        actualizarCuentaRegresiva,
        1000
    );

}


/* =========================================================
   ACTUALIZAR CUENTA REGRESIVA
========================================================= */

function actualizarCuentaRegresiva() {

    if (!fechaFinal) return;

    let diferencia =
        fechaFinal.getTime() - Date.now();

    if (diferencia < 0) {

        diferencia = 0;

    }

    const segundosTotales = Math.floor(
        diferencia / 1000
    );

    const dias = Math.floor(
        segundosTotales / 86400
    );

    const horas = Math.floor(
        (segundosTotales % 86400) / 3600
    );

    const minutos = Math.floor(
        (segundosTotales % 3600) / 60
    );

    const segundos =
        segundosTotales % 60;

    actualizarNumero("days", dias);

    actualizarNumero("hours", horas);

    actualizarNumero("minutes", minutos);

    actualizarNumero("seconds", segundos);

}


/* =========================================================
   CAMBIAR NÚMEROS
========================================================= */

function actualizarNumero(id, numero) {

    const elemento = document.getElementById(id);

    if (!elemento) return;

    elemento.textContent = String(
        numero
    ).padStart(2, "0");

}


/* =========================================================
   GOOGLE MAPS
========================================================= */

function configurarMapa() {

    if (!mapsButton) return;

    if (!CONFIG.mapsURL) {

        mapsButton.hidden = true;

        if (locationMessage) {

            locationMessage.textContent =
                "Pronto compartiremos la dirección exacta.";

        }

        return;

    }

    let url;

    try {

        url = new URL(CONFIG.mapsURL);

    } catch (error) {

        console.warn(
            "Enlace de Google Maps no válido."
        );

        return;

    }

    if (
        url.protocol !== "https:" &&
        url.protocol !== "http:"
    ) return;

    mapsButton.href = url.href;

    mapsButton.hidden = false;

    if (locationMessage) {

        locationMessage.textContent =
            "Consulta la ubicación exacta de nuestra celebración.";

    }

}


/* =========================================================
   CONFIRMACIÓN DE ASISTENCIA - WHATSAPP
========================================================= */

function iniciarConfirmacion() {

    const formulario = document.getElementById(
        "rsvpForm"
    );

    const guestName = document.getElementById(
        "guestName"
    );

    const attendance = document.getElementById(
        "attendance"
    );

    const rsvpMessage = document.getElementById(
        "rsvpMessage"
    );

    if (
        !formulario ||
        !guestName ||
        !attendance
    ) return;


    /* ==========================================
       CREAR MENSAJE DE CONFIRMACIÓN
    ========================================== */

    function generarMensaje() {

        const nombre = guestName.value.trim();

        const asistir = attendance.value === "yes";

        let mensaje = "";

        mensaje += "CONFIRMACIÓN DE ASISTENCIA\n\n";

        mensaje += "Cumpleaños de Santiago José\n";

        mensaje += "Nivel 2 desbloqueado\n\n";

        mensaje += `Nombre: ${nombre}\n`;

        mensaje += `Fecha: ${eventDate?.textContent || "14 de noviembre de 2026"}\n`;

        mensaje += `Lugar: ${CONFIG.lugar}\n`;

        mensaje += "Horario: 3:00 p. m. - 5:00 p. m.\n\n";

        if (asistir) {

            mensaje += "Asistencia: Sí asistiré\n\n";

            mensaje += "¡Nos vemos en la celebración!";

        } else {

            mensaje += "Asistencia: No podré asistir\n\n";

            mensaje += "Gracias por la invitación.";

        }

        return mensaje;

    }


    /* ==========================================
       ENVIAR CONFIRMACIÓN
    ========================================== */

    formulario.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            if (!formulario.reportValidity()) {
                return;
            }

            const nombre = guestName.value.trim();

            if (!nombre) {

                if (rsvpMessage) {

                    rsvpMessage.textContent =
                        "Por favor, escribe tu nombre.";

                }

                guestName.focus();

                return;

            }

            if (
                attendance.value !== "yes" &&
                attendance.value !== "no"
            ) {

                if (rsvpMessage) {

                    rsvpMessage.textContent =
                        "Selecciona si asistirás o no.";

                }

                attendance.focus();

                return;

            }

            const mensaje = generarMensaje();

            const numero = CONFIG.whatsappNumber.replace(
                /\D/g,
                ""
            );

            const enlace =
                "https://wa.me/" +
                numero +
                "?text=" +
                encodeURIComponent(mensaje);

            if (rsvpMessage) {

                rsvpMessage.textContent =
                    "Abriendo WhatsApp para enviar tu confirmación...";

            }

            window.location.href = enlace;

        }
    );

}


/* =========================================================
   INICIALIZACIÓN
========================================================= */

function iniciarPagina() {

    iniciarBienvenida();

    crearParticulas();

    iniciarScrollReveal();

    iniciarParallax();

    configurarFotografia();

    configurarFecha();

    configurarMapa();

    iniciarConfirmacion();

}


/* =========================================================
   CARGAR PÁGINA
========================================================= */

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        iniciarPagina
    );

} else {

    iniciarPagina();

}

/* ==========================================
   MÚSICA DE FONDO - SANTIAGO JOSÉ
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const music = document.getElementById("backgroundMusic");
    const button = document.getElementById("musicButton");

    if (!music || !button) return;

    music.volume = 0.45;

    let musicStarted = false;

    function updateButton() {
        const playing = !music.paused;

        button.classList.toggle("playing", playing);
        button.textContent = playing ? "♫" : "♪";

        button.setAttribute(
            "aria-label",
            playing ? "Pausar música" : "Reproducir música"
        );
    }

    async function startMusic() {

        if (musicStarted) return;

        try {
            await music.play();

            musicStarted = true;
            updateButton();

        } catch (error) {
            console.log("La música necesita interacción del usuario.");
        }
    }

    // Intentar reproducir al abrir la invitación
    startMusic();

    // Iniciar con la primera interacción
    document.addEventListener("pointerdown", (event) => {

        if (button.contains(event.target)) return;

        startMusic();

    }, { once: true });

    document.addEventListener("keydown", startMusic, { once: true });

    // Botón para activar y pausar
    button.addEventListener("click", async () => {

        if (music.paused) {

            try {
                await music.play();
                musicStarted = true;
            } catch (error) {
                console.log("No se pudo reproducir la música.");
            }

        } else {
            music.pause();
        }

        updateButton();
    });

    music.addEventListener("play", updateButton);
    music.addEventListener("pause", updateButton);

    updateButton();

});