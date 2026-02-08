// Código JavaScript para el portafolio

// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
    // Variables
    const menuBtn = document.getElementById("menu-btn");
    const menuLista = document.querySelector(".menu-lista");
    const enlacesNav = document.querySelectorAll(".enlace-nav");
    const formularioContacto = document.querySelector(".contacto-formulario");
    const proyectosGrid = document.querySelector(".proyectos-grid");
    const habilidadesGrid = document.querySelector(".habilidades-grid");

    // Función para alternar el menú móvil
    function alternarMenu() {
        menuLista.classList.toggle("activo");

        // Animación del botón hamburguesa
        const lineas = menuBtn.querySelectorAll(".linea");
        if (menuLista.classList.contains("activo")) {
            lineas[0].style.transform = "rotate(45deg) translate(6px, 6px)";
            lineas[1].style.opacity = "0";
            lineas[2].style.transform = "rotate(-45deg) translate(6px, -6px)";
        } else {
            lineas[0].style.transform = "none";
            lineas[1].style.opacity = "1";
            lineas[2].style.transform = "none";
        }
    }

    // Función para cerrar el menú al hacer clic en un enlace
    function cerrarMenu() {
        menuLista.classList.remove("activo");

        // Restaurar botón hamburguesa
        const lineas = menuBtn.querySelectorAll(".linea");
        lineas[0].style.transform = "none";
        lineas[1].style.opacity = "1";
        lineas[2].style.transform = "none";
    }

    // Función para resaltar el enlace de navegación activo
    function resaltarEnlaceActivo() {
        let seccionActual = "";
        const secciones = document.querySelectorAll(".seccion");

        secciones.forEach((seccion) => {
            const seccionTop = seccion.offsetTop;
            const seccionAltura = seccion.clientHeight;

            if (window.scrollY >= seccionTop - 150) {
                seccionActual = seccion.getAttribute("id");
            }
        });

        enlacesNav.forEach((enlace) => {
            enlace.classList.remove("activo");
            if (enlace.getAttribute("href") === `#${seccionActual}`) {
                enlace.classList.add("activo");
            }
        });
    }

    // Función para centrar proyectos cuando hay pocos
    function centrarProyectos() {
        if (!proyectosGrid) return;

        const proyectos = proyectosGrid.querySelectorAll(".proyecto");
        const cantidadProyectos = proyectos.length;

        // Eliminar clases anteriores
        proyectosGrid.classList.remove("centrado-1", "centrado-2");

        // Aplicar clases según la cantidad de proyectos
        if (cantidadProyectos === 1) {
            proyectosGrid.classList.add("centrado-1");
        } else if (cantidadProyectos === 2) {
            proyectosGrid.classList.add("centrado-2");
        }
    }

    // Función para centrar habilidades cuando hay pocas
    function centrarHabilidades() {
        if (!habilidadesGrid) return;

        const habilidades = habilidadesGrid.querySelectorAll(".habilidad-item");
        const cantidadHabilidades = habilidades.length;

        // Si hay menos de 4 habilidades, aplicamos centrado especial
        if (cantidadHabilidades < 4) {
            habilidadesGrid.classList.add("pocos-elementos");
        } else {
            habilidadesGrid.classList.remove("pocos-elementos");
        }
    }

    // Función para manejar el envío del formulario de contacto
    function manejarEnvioFormulario(e) {
        e.preventDefault();

        // Obtener valores del formulario
        const nombre = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const mensaje = this.querySelector("textarea").value;

        // Validación básica
        if (!nombre || !email || !mensaje) {
            alert("Por favor, completa todos los campos del formulario");
            return;
        }

        // Simular envío (en un caso real, aquí se enviaría a un servidor)
        console.log("Formulario enviado:", { nombre, email, mensaje });

        // Mostrar confirmación
        alert("¡Mensaje enviado con éxito! Te contactaré pronto.");

        // Resetear formulario
        this.reset();
    }

    // Añadir efecto hover a las tarjetas de proyecto
    const proyectos = document.querySelectorAll(".proyecto");

    proyectos.forEach((proyecto) => {
        proyecto.addEventListener("mouseenter", function () {
            this.style.transform = "translateY(-10px)";
        });

        proyecto.addEventListener("mouseleave", function () {
            this.style.transform = "translateY(0)";
        });
    });

    // Añadir efecto hover a las habilidades
    const habilidades = document.querySelectorAll(".habilidad-item");

    habilidades.forEach((habilidad) => {
        habilidad.addEventListener("mouseenter", function () {
            this.style.transform = "translateY(-5px)";
        });

        habilidad.addEventListener("mouseleave", function () {
            this.style.transform = "translateY(0)";
        });
    });

    // Añadir efecto hover a los artículos del blog
    const articulos = document.querySelectorAll(".articulo-blog");

    articulos.forEach((articulo) => {
        articulo.addEventListener("mouseenter", function () {
            this.style.transform = "translateY(-5px)";
        });

        articulo.addEventListener("mouseleave", function () {
            this.style.transform = "translateY(0)";
        });
    });

    // Event Listeners
    menuBtn.addEventListener("click", alternarMenu);

    enlacesNav.forEach((enlace) => {
        enlace.addEventListener("click", function (e) {
            // Para enlaces internos, manejar scroll suave
            if (this.getAttribute("href").startsWith("#")) {
                e.preventDefault();

                const objetivoId = this.getAttribute("href");
                const objetivoSeccion = document.querySelector(objetivoId);

                // Cerrar menú móvil si está abierto
                cerrarMenu();

                // Desplazamiento suave a la sección
                window.scrollTo({
                    top: objetivoSeccion.offsetTop - 80,
                    behavior: "smooth",
                });
            }
        });
    });

    // Manejar envío del formulario
    if (formularioContacto) {
        formularioContacto.addEventListener("submit", manejarEnvioFormulario);
    }

    // Aplicar centrado de elementos
    centrarProyectos();
    centrarHabilidades();

    // Actualizar centrado cuando cambia el tamaño de la ventana
    window.addEventListener("resize", function () {
        centrarProyectos();
        centrarHabilidades();
    });

    // Actualizar enlace activo al hacer scroll
    window.addEventListener("scroll", resaltarEnlaceActivo);

    // Inicializar estado activo del menú
    resaltarEnlaceActivo();
});
