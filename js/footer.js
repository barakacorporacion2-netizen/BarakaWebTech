document.addEventListener("DOMContentLoaded", function () {


const footerContainer = document.getElementById("footer-container");

if (!footerContainer) {
    return;
}

fetch("../footer/footer.html")
    .then(function (response) {

        if (!response.ok) {
            throw new Error("No se pudo cargar footer.html");
        }

        return response.text();

    })
    .then(function (html) {

        footerContainer.innerHTML = html;

        document.querySelectorAll(".cerrar-modal").forEach(function (boton) {

            boton.onclick = function () {

                const idModal = boton.getAttribute("data-cerrar");

                const modal = document.getElementById(idModal);

                if (modal) {
                    modal.classList.remove("activo");
                }

                document.body.style.overflow = "";

            };

        });

        document.querySelectorAll(".modal-legal").forEach(function (modal) {

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
