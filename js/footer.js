document.addEventListener("DOMContentLoaded", function () {


const footerContainer = document.getElementById("footer-container");

if (!footerContainer) {
    return;
}

const rutaBase = "/BarakaWebTech/";

if (!document.querySelector('link[data-footer-css]')) {

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

        footerContainer.querySelectorAll(".cerrar-modal").forEach(function (boton) {

            boton.onclick = function () {

                const idModal = boton.getAttribute("data-cerrar");

                const modal = document.getElementById(idModal);

                if (modal) {
                    modal.classList.remove("activo");
                }

                document.body.style.overflow = "";

            };

        });

        footerContainer.querySelectorAll(".modal-legal").forEach(function (modal) {

            modal.onclick = function (event) {

                if (event.target === modal) {

                    modal.classList.remove("activo");

                    document.body.style.overflow = "";

                }

            };

        });

    })
    .catch(function (error) {

        console.error("Error al cargar footer:", error);

    });


});
