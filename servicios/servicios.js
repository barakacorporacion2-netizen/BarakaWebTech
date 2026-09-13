document.addEventListener("DOMContentLoaded", function () {


/* =====================================================
   MENÚ
===================================================== */

const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

if (menuBtn && menu) {

    function alternarMenu() {

        const abierto = menu.classList.toggle("activo");

        menuBtn.classList.toggle("abierto", abierto);

        menuBtn.setAttribute(
            "aria-expanded",
            abierto ? "true" : "false"
        );

        menuBtn.setAttribute(
            "aria-label",
            abierto ? "Cerrar menú" : "Abrir menú"
        );
    }

    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Abrir menú");

    menuBtn.addEventListener("click", alternarMenu);

    menuBtn.addEventListener("keydown", function (event) {

        if (
            event.key === "Enter" ||
            event.key === " "
        ) {
            event.preventDefault();
            alternarMenu();
        }
    });

    const enlacesMenu = menu.querySelectorAll("a");

    enlacesMenu.forEach(function (enlace) {

        enlace.addEventListener("click", function () {

            menu.classList.remove("activo");
            menuBtn.classList.remove("abierto");

            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

            menuBtn.setAttribute(
                "aria-label",
                "Abrir menú"
            );
        });
    });
}


/* =====================================================
   ELEMENTOS DE CURSOS
===================================================== */

const contenedor =
    document.getElementById("contenedorServicios");

const buscador =
    document.getElementById("buscarServicio");

const contador =
    document.getElementById("cantidadServicios");

const sinResultados =
    document.getElementById("sinResultados");

const filtros =
    document.querySelectorAll(".filtro");

if (!contenedor) {
    return;
}


/* =====================================================
   CURSOS Y CAPACITACIONES
===================================================== */

const cursos = [
    {
        id: 1,
        titulo: "El Empleado Aumentado",
        descripcion:
            "Formación para aprender a utilizar datos, inteligencia artificial, automatización y herramientas digitales para mejorar el trabajo.",
        categoria: "tecnologia",
        icono: "fa-solid fa-robot",
        enlace:
            "https://khadija1103.github.io/El-Empleado-Aumentado/"
    },
    {
        id: 2,
        titulo: "Emprendimiento",
        descripcion:
            "Fortalezca sus capacidades para transformar ideas, talentos y conocimientos en oportunidades de emprendimiento.",
        categoria: "emprendimiento",
        icono: "fa-solid fa-lightbulb",
        enlace: null
    },
    {
        id: 3,
        titulo: "Herramientas para el trabajo",
        descripcion:
            "Capacitación práctica en herramientas digitales que facilitan la organización, el análisis de información y la gestión de actividades.",
        categoria: "tecnologia",
        icono: "fa-solid fa-laptop",
        enlace: null
    },
    {
        id: 4,
        titulo: "Habilidades para la vida",
        descripcion:
            "Espacios de formación orientados al fortalecimiento personal, la confianza, la comunicación y el desarrollo de capacidades.",
        categoria: "habilidades",
        icono: "fa-solid fa-heart",
        enlace: null
    },
    {
        id: 5,
        titulo: "Formación para el desarrollo",
        descripcion:
            "Programas de formación diseñados para fortalecer conocimientos y capacidades que puedan abrir nuevas posibilidades.",
        categoria: "formacion",
        icono: "fa-solid fa-graduation-cap",
        enlace: null
    },
    {
        id: 6,
        titulo: "Competencias digitales",
        descripcion:
            "Aprenda herramientas y conceptos digitales para desenvolverse con mayor seguridad en entornos académicos, laborales y productivos.",
        categoria: "tecnologia",
        icono: "fa-solid fa-computer",
        enlace: null
    }
];


let categoriaActual = "todos";
let textoBusqueda = "";


/* =====================================================
   MOSTRAR CURSOS
===================================================== */

function mostrarCursos() {

    const resultados = cursos.filter(function (curso) {

        const coincideCategoria =
            categoriaActual === "todos" ||
            curso.categoria === categoriaActual;

        const texto =
            curso.titulo + " " +
            curso.descripcion;

        const coincideBusqueda =
            texto
                .toLowerCase()
                .includes(
                    textoBusqueda.toLowerCase()
                );

        return coincideCategoria &&
            coincideBusqueda;
    });


    contenedor.innerHTML = "";


    if (contador) {

        contador.textContent =
            resultados.length;
    }


    if (sinResultados) {

        sinResultados.style.display =
            resultados.length === 0
                ? "block"
                : "none";
    }


    resultados.forEach(function (curso) {

        const columna =
            document.createElement("div");

        columna.className =
            "col-12 col-md-6 col-lg-4";


        columna.innerHTML = `
            <article class="curso-card h-100">

                <div class="curso-icono">
                    <i class="${curso.icono}"></i>
                </div>

                <div class="card-body">

                    <span class="curso-categoria">
                        ${obtenerNombreCategoria(curso.categoria)}
                    </span>

                    <h3 class="card-title">
                        ${curso.titulo}
                    </h3>

                    <p class="card-text">
                        ${curso.descripcion}
                    </p>

                    <button
                        type="button"
                        class="btn btn-curso"
                        onclick="verCurso(${curso.id})">

                        Conocer más

                        <i class="fa-solid fa-arrow-right"></i>

                    </button>

                </div>

            </article>
        `;


        contenedor.appendChild(columna);
    });
}


/* =====================================================
   NOMBRE DE CATEGORÍAS
===================================================== */

function obtenerNombreCategoria(categoria) {

    const nombres = {

        formacion:
            "Formación",

        emprendimiento:
            "Emprendimiento",

        tecnologia:
            "Tecnología",

        habilidades:
            "Habilidades"
    };


    return nombres[categoria] ||
        "Capacitación";
}


/* =====================================================
   BUSCADOR
===================================================== */

if (buscador) {

    buscador.addEventListener(
        "input",
        function () {

            textoBusqueda =
                this.value.trim();

            mostrarCursos();
        }
    );
}


/* =====================================================
   FILTROS
===================================================== */

filtros.forEach(function (filtro) {

    filtro.addEventListener(
        "click",
        function () {

            filtros.forEach(
                function (item) {

                    item.classList.remove(
                        "activo"
                    );
                }
            );


            this.classList.add("activo");


            categoriaActual =
                this.dataset.categoria ||
                "todos";


            mostrarCursos();
        }
    );
});


/* =====================================================
   VER CURSO
===================================================== */

window.verCurso = function (id) {

    const curso =
        cursos.find(function (item) {

            return item.id === id;
        });


    if (!curso) {
        return;
    }


    /* ================================================
       CURSO CON PÁGINA DISPONIBLE
    ================================================ */

    if (curso.enlace) {

        window.location.href =
            curso.enlace;

        return;
    }


    /* ================================================
       CURSO AÚN NO DISPONIBLE
    ================================================ */

    mostrarAlertaCurso(curso);
};


/* =====================================================
   ALERTA PERSONALIZADA
===================================================== */

function mostrarAlertaCurso(curso) {

    const alertaExistente =
        document.querySelector(
            ".alerta-baraka"
        );


    if (alertaExistente) {
        alertaExistente.remove();
    }


    const alerta =
        document.createElement("div");


    alerta.className =
        "alerta-baraka";


    alerta.innerHTML = `

        <div class="alerta-baraka-icono">

            <i class="fa-solid fa-graduation-cap"></i>

        </div>


        <div class="alerta-baraka-contenido">

            <span class="alerta-baraka-etiqueta">
                Próximamente
            </span>


            <h3>
                ${curso.titulo}
            </h3>


            <p>
                Pronto encontrará más información
                sobre esta capacitación.
            </p>

        </div>


        <button
            type="button"
            class="alerta-baraka-cerrar"
            aria-label="Cerrar">

            <i class="fa-solid fa-xmark"></i>

        </button>

    `;


    document.body.appendChild(alerta);


    /* =================================================
       BOTÓN CERRAR
    ================================================= */

    const cerrar =
        alerta.querySelector(
            ".alerta-baraka-cerrar"
        );


    if (cerrar) {

        cerrar.addEventListener(
            "click",
            function () {

                cerrarAlerta(alerta);
            }
        );
    }


    /* =================================================
       CIERRE AUTOMÁTICO
    ================================================= */

    setTimeout(function () {

        if (alerta.parentNode) {

            cerrarAlerta(alerta);
        }

    }, 5000);
}


/* =====================================================
   CERRAR ALERTA
===================================================== */

function cerrarAlerta(alerta) {

    alerta.classList.add(
        "cerrando"
    );


    setTimeout(function () {

        if (alerta.parentNode) {

            alerta.remove();
        }

    }, 250);
}


/* =====================================================
   INICIALIZAR
===================================================== */

mostrarCursos();


});
