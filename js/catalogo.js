/* ===============================
   MENÚ
================================= */

const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

if (menuBtn && menu) {
    menuBtn.addEventListener("click", () => {
        menu.classList.toggle("activo");
    });
}


/* ===============================
   ONE CLICK SERVICE
================================= */

const ONE_CLICK_SERVICE_URL = "#";


/* ===============================
   TALENTOS BARAKA
================================= */

const emprendimientos = [

    {
nombre: "Tu talento puede inspirar",

descripcion:
    "Estamos preparando este espacio para dar a conocer los talentos, conocimientos, habilidades y emprendimientos de las mujeres que hacen parte de la comunidad Baraka.",

imagen: "../assets/img/chocolateria.png",

historia: `

Estamos esperando conocer tu talento.

Queremos que este espacio sea una ventana para mostrar aquello que sabes hacer, los conocimientos que has adquirido a lo largo de tu vida y las habilidades que te hacen especial.

Comparte con nosotros tu historia, cuéntanos qué sabes hacer y ayúdanos a inspirar a más mujeres a reconocer el valor de sus propios talentos.

Muy pronto podrás hacer parte de Talentos Baraka y compartir tu historia con nuestra comunidad.

Tu experiencia puede inspirar a otra mujer.
Tu conocimiento puede abrir nuevas oportunidades.
Tu talento merece ser conocido.
`
    },

    {
    nombre: "Historias que dejan huella",

descripcion:
    "Cada talento tiene detrás una historia: alguien que enseñó, una experiencia que transformó, un reto que se superó o un sueño que decidió hacerse realidad.",

imagen: "../assets/img/artesanias.jpg",

historia: `

No queremos mostrar solamente lo que haces. También queremos conocer la historia que existe detrás de ello.

¿Cómo aprendiste? ¿Quién te enseñó? ¿Qué dificultades has superado? ¿Qué significa para ti hacer lo que haces?

Tu historia puede ser el impulso que otra mujer necesita para creer en sí misma, comenzar algo nuevo o valorar sus propias capacidades.

Estamos esperando que nos compartas tu historia para que juntas podamos inspirar a más mujeres.
`
    },

    {
       nombre: "Comunidad de oportunidades",

descripcion:
    "Talentos Baraka busca conectar conocimientos, experiencias y capacidades para construir una comunidad donde puedan surgir nuevas oportunidades.",

imagen: "../assets/img/limpieza.jpg",

historia: `

Este espacio quiere convertirse en un punto de encuentro.

Queremos conocer mujeres que tengan algo para enseñar, ofrecer, crear o compartir, y poco a poco construir una comunidad donde sus capacidades puedan ser reconocidas.

La idea es que un talento pueda encontrar una persona interesada, que una habilidad pueda convertirse en un servicio y que una experiencia pueda abrir una nueva posibilidad.

Estamos dando los primeros pasos. Muy pronto podrás hacer parte de esta comunidad y mostrar al mundo aquello que sabes hacer.
`
    },

   

];


/* ===============================
   VARIABLES
================================= */

const grid = document.getElementById("servicesGrid");
const buscador = document.getElementById("searchInput");

const total = document.getElementById("totalCount");
const visibles = document.getElementById("visibleCount");


/* ===============================
   CARGAR
================================= */

document.addEventListener("DOMContentLoaded", () => {

    mostrarTarjetas(emprendimientos);

    if (buscador) {
        buscador.addEventListener("input", buscar);
    }

});


/* ===============================
   BUSCADOR
================================= */

function buscar() {

    const texto = buscador.value.toLowerCase().trim();

    const filtrados = emprendimientos.filter(emp =>
        emp.nombre.toLowerCase().includes(texto) ||
        emp.descripcion.toLowerCase().includes(texto) ||
        emp.historia.toLowerCase().includes(texto)
    );

    mostrarTarjetas(filtrados);

}


/* ===============================
   TARJETAS
================================= */

function mostrarTarjetas(lista) {

    if (!grid) {
        return;
    }

    grid.innerHTML = "";

    if (total) {
        total.textContent = emprendimientos.length;
    }

    if (visibles) {
        visibles.textContent = lista.length;
    }

    if (lista.length === 0) {

        grid.innerHTML = `
            <div class="no-results">
                <h3>No se encontraron talentos o servicios.</h3>
                <p>Intente realizar otra búsqueda.</p>
            </div>
        `;

        return;
    }

    lista.forEach(emp => {

        const indice = emprendimientos.indexOf(emp);

        grid.innerHTML += `

            <div class="service-card">

                <div class="service-img-container">

                    <img
                        src="${emp.imagen}"
                        alt="${emp.nombre}">
                        
                </div>

                <h3 class="service-card-title">
                    ${emp.nombre}
                </h3>

                <p class="service-card-desc">
                    ${emp.descripcion}
                </p>

                <div class="botones-card">

                    <button
                        class="btn-historia"
                        onclick="abrirHistoria(${indice})">

                        Conocer su historia

                    </button>

                    <button
                        class="btn-comprar"
                        onclick="contratarServicio()">

                        Comprar / Contratar

                    </button>

                </div>

            </div>

        `;

    });

}


/* ===============================
   MODAL
================================= */

function abrirHistoria(id) {

    const emp = emprendimientos[id];

    if (!emp) {
        return;
    }

    document.getElementById("tituloModal").textContent =
        emp.nombre;

    document.getElementById("imagenModal").src =
        emp.imagen;

    document.getElementById("imagenModal").alt =
        emp.nombre;

    document.getElementById("descripcionModal").textContent =
        emp.descripcion;

    document.getElementById("historiaModal").textContent =
        emp.historia;

    document.getElementById("btnComprar").textContent =
        "Comprar / Contratar";

    document.getElementById("btnComprar").onclick =
        function () {
            contratarServicio();
        };

    const modal = new bootstrap.Modal(
        document.getElementById("modalEmprendimiento")
    );

    modal.show();

}


/* ===============================
   COMPRAR / CONTRATAR
================================= */

function contratarServicio() {

    if (
        !ONE_CLICK_SERVICE_URL ||
        ONE_CLICK_SERVICE_URL === "#"
    ) {

        const avisoExistente =
            document.querySelector(".aviso-oneclick");

        if (avisoExistente) {
            return;
        }

        const aviso = document.createElement("div");

        aviso.className = "aviso-oneclick";

        aviso.innerHTML = `

            <div class="aviso-oneclick-contenido">

                <div class="aviso-oneclick-icono">
                    <i class="bi bi-arrow-right-circle"></i>
                </div>

                <h3>Próximamente</h3>

                <p>
                    Este servicio estará disponible próximamente
                    a través de One Click Service, donde podrá
                    conocer a la prestadora y contactar directamente
                    para solicitar sus servicios.
                </p>

                <button
                    class="btn-cerrar-aviso"
                    onclick="cerrarAvisoOneClick()">

                    Entendido

                </button>

            </div>

        `;

        document.body.appendChild(aviso);

        aviso.addEventListener("click", function (evento) {

            if (evento.target === aviso) {
                cerrarAvisoOneClick();
            }

        });

        return;
    }

    window.open(
        ONE_CLICK_SERVICE_URL,
        "_blank"
    );

}


/* ===============================
   CERRAR AVISO
================================= */

function cerrarAvisoOneClick() {

    const aviso =
        document.querySelector(".aviso-oneclick");

    if (aviso) {
        aviso.remove();
    }

}