document.addEventListener("DOMContentLoaded", function () {

    const footerContainer = document.getElementById("footer-container");

    if (!footerContainer) {
        return;
    }

    const rutaBase = "/BarakaWebTech/";

    const cssExistente = document.querySelector('link[data-footer-css]');

    if (!cssExistente) {

        const linkCSS = document.createElement("link");

        linkCSS.rel = "stylesheet";
        linkCSS.href = rutaBase + "estilos-css/footer.css";

        linkCSS.setAttribute("data-footer-css", "true");

        document.head.appendChild(linkCSS);
    }

    fetch(rutaBase + "footer/footer.html")
        .then(function (response) {

            if (!response.ok) {
                throw new Error("No se pudo cargar footer.html");
            }

            return response.text();

        })
        .then(function (html) {

            footerContainer.innerHTML = html;

            const logo = footerContainer.querySelector(".footer-logo img");

            if (logo) {
                logo.src = rutaBase + "assets/img/logoblanco.png";
            }

            const enlaces = footerContainer.querySelectorAll("a");

            enlaces.forEach(function (enlace) {

                const href = enlace.getAttribute("href");

                if (!href) {
                    return;
                }

                if (
                    href.startsWith("../") ||
                    href.startsWith("./")
                ) {

                    let nuevaRuta = href;

                    while (nuevaRuta.startsWith("../")) {
                        nuevaRuta = nuevaRuta.substring(3);
                    }

                    nuevaRuta = nuevaRuta.replace("./", "");

                    enlace.href = rutaBase + nuevaRuta;
                }

            });

            footerContainer.querySelectorAll(".cerrar-modal").forEach(function (boton) {

                boton.addEventListener("click", function () {

                    const idModal = boton.getAttribute("data-cerrar");

                    const modal = document.getElementById(idModal);

                    if (modal) {
                        modal.classList.remove("activo");
                    }

                    document.body.style.overflow = "";

                });

            });

            footerContainer.querySelectorAll(".modal-legal").forEach(function (modal) {

                modal.addEventListener("click", function (event) {

                    if (event.target === modal) {

                        modal.classList.remove("activo");

                        document.body.style.overflow = "";

                    }

                });

            });

        })
        .catch(function (error) {

            console.error("Error al cargar footer:", error);

        });

});