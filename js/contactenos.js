document.addEventListener("DOMContentLoaded", function () {


const formulario = document.getElementById("formulario");

if (!formulario) {
    return;
}

const nombre = document.getElementById("nombre");
const correo = document.getElementById("correo");
const telefono = document.getElementById("telefono");
const mensaje = document.getElementById("mensaje");
const archivo = document.getElementById("archivo");

const errorNombre = document.getElementById("errorNombre");
const errorCorreo = document.getElementById("errorCorreo");
const errorTelefono = document.getElementById("errorTelefono");
const errorMensaje = document.getElementById("errorMensaje");
const errorArchivo = document.getElementById("errorArchivo");

const mensajeFormulario =
    document.getElementById("mensajeFormulario");

const boton =
    formulario.querySelector("button[type='submit']");


/* =====================================================
   DOMINIOS DE CORREO PERMITIDOS
===================================================== */

const dominiosPermitidos = [
    "gmail.com",
    "outlook.com",
    "hotmail.com",
    "live.com",
    "yahoo.com",
    "icloud.com",
    "yahoo.es",
    "outlook.es",
    "hotmail.es",
    "proton.me",
    "protonmail.com"
];


/* =====================================================
   MOSTRAR ERROR
===================================================== */

function mostrarError(campo, mensajeError, texto) {

    campo.classList.remove("campo-valido");
    campo.classList.add("campo-error");

    mensajeError.classList.remove("validado");
    mensajeError.classList.add("error");

    mensajeError.textContent = texto;
}


/* =====================================================
   MOSTRAR CORRECTO
===================================================== */

function mostrarValido(campo, mensajeError, texto) {

    campo.classList.remove("campo-error");
    campo.classList.add("campo-valido");

    mensajeError.classList.remove("error");
    mensajeError.classList.add("validado");

    mensajeError.textContent = texto;
}


/* =====================================================
   LIMPIAR ESTADO
===================================================== */

function limpiarEstado(campo, mensajeError) {

    campo.classList.remove("campo-error");
    campo.classList.remove("campo-valido");

    mensajeError.classList.remove("error");
    mensajeError.classList.remove("validado");

    mensajeError.textContent = "";
}


/* =====================================================
   NOMBRE
===================================================== */

function validarNombre() {

    const valor =
        nombre.value.trim().replace(/\s+/g, " ");

    if (valor === "") {

        mostrarError(
            nombre,
            errorNombre,
            "Ingrese su nombre completo."
        );

        return false;
    }


    if (valor.length < 5) {

        mostrarError(
            nombre,
            errorNombre,
            "Ingrese su nombre y apellido."
        );

        return false;
    }


    if (valor.length > 50) {

        mostrarError(
            nombre,
            errorNombre,
            "Máximo 50 caracteres."
        );

        return false;
    }


    const soloLetras =
        /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+(?:\s+[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+)+$/;


    if (!soloLetras.test(valor)) {

        mostrarError(
            nombre,
            errorNombre,
            "Solo se permiten nombres y apellidos, sin números ni caracteres especiales."
        );

        return false;
    }


    const palabras =
        valor.split(" ");


    if (palabras.length < 2) {

        mostrarError(
            nombre,
            errorNombre,
            "Ingrese al menos un nombre y un apellido."
        );

        return false;
    }


    for (const palabra of palabras) {

        if (palabra.length < 2) {

            mostrarError(
                nombre,
                errorNombre,
                "Cada nombre o apellido debe tener al menos 2 letras."
            );

            return false;
        }
    }


    nombre.value = valor;

    mostrarValido(
        nombre,
        errorNombre,
        "✓ Nombre completo válido."
    );

    return true;
}


/* =====================================================
   CORREO
===================================================== */

function validarCorreo() {

    const valor =
        correo.value.trim().toLowerCase();


    if (valor === "") {

        mostrarError(
            correo,
            errorCorreo,
            "Ingrese su correo electrónico."
        );

        return false;
    }


    const formatoCorreo =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


    if (!formatoCorreo.test(valor)) {

        mostrarError(
            correo,
            errorCorreo,
            "Ingrese un correo electrónico válido."
        );

        return false;
    }


    if (valor.includes("..")) {

        mostrarError(
            correo,
            errorCorreo,
            "El correo no puede contener puntos consecutivos."
        );

        return false;
    }


    const partes =
        valor.split("@");


    if (partes.length !== 2) {

        mostrarError(
            correo,
            errorCorreo,
            "El correo electrónico no es válido."
        );

        return false;
    }


    const usuarioCorreo = partes[0];
    const dominio = partes[1];


    if (usuarioCorreo.length < 2) {

        mostrarError(
            correo,
            errorCorreo,
            "El correo electrónico no es válido."
        );

        return false;
    }


    if (!dominiosPermitidos.includes(dominio)) {

        mostrarError(
            correo,
            errorCorreo,
            "Utilice un correo válido como Gmail, Outlook, Hotmail, Yahoo o iCloud."
        );

        return false;
    }


    correo.value = valor;

    mostrarValido(
        correo,
        errorCorreo,
        "✓ Correo electrónico válido."
    );

    return true;
}


/* =====================================================
   TELÉFONO
===================================================== */

function validarTelefono() {

    const valor =
        telefono.value.trim();


    if (valor === "") {

        mostrarError(
            telefono,
            errorTelefono,
            "Ingrese su número de teléfono."
        );

        return false;
    }


    if (!/^[0-9]+$/.test(valor)) {

        mostrarError(
            telefono,
            errorTelefono,
            "El teléfono debe contener únicamente números."
        );

        return false;
    }


    if (valor.length < 7 || valor.length > 10) {

        mostrarError(
            telefono,
            errorTelefono,
            "El teléfono debe tener entre 7 y 10 números."
        );

        return false;
    }


    mostrarValido(
        telefono,
        errorTelefono,
        "✓ Número de teléfono válido."
    );

    return true;
}


/* =====================================================
   MENSAJE
===================================================== */

function validarMensaje() {

    const valor =
        mensaje.value.trim().replace(/\s+/g, " ");


    if (valor === "") {

        mostrarError(
            mensaje,
            errorMensaje,
            "Escriba un mensaje."
        );

        return false;
    }


    if (valor.length < 15) {

        mostrarError(
            mensaje,
            errorMensaje,
            "El mensaje debe tener mínimo 15 caracteres."
        );

        return false;
    }


    if (valor.length > 100) {

        mostrarError(
            mensaje,
            errorMensaje,
            "El mensaje no puede superar los 100 caracteres."
        );

        return false;
    }


    const tieneLetras =
        /[A-Za-zÁÉÍÓÚáéíóúÑñÜü]/.test(valor);


    if (!tieneLetras) {

        mostrarError(
            mensaje,
            errorMensaje,
            "El mensaje debe contener palabras."
        );

        return false;
    }


    const palabras =
        valor.split(" ").filter(function (palabra) {
            return palabra.length > 0;
        });


    if (palabras.length < 3) {

        mostrarError(
            mensaje,
            errorMensaje,
            "Escriba un mensaje coherente de al menos 3 palabras."
        );

        return false;
    }


    if (/(.)\1{5,}/i.test(valor)) {

        mostrarError(
            mensaje,
            errorMensaje,
            "Evite repetir excesivamente el mismo carácter."
        );

        return false;
    }


    const palabrasNormalizadas =
        palabras.map(function (palabra) {

            return palabra
                .toLowerCase()
                .replace(
                    /[^a-záéíóúñü]/gi,
                    ""
                );
        });


    const palabrasUnicas =
        new Set(palabrasNormalizadas);


    if (
        palabras.length >= 4 &&
        palabrasUnicas.size <= 2
    ) {

        mostrarError(
            mensaje,
            errorMensaje,
            "Escriba un mensaje coherente y evite repetir las mismas palabras."
        );

        return false;
    }


    const caracteres =
        valor.replace(/\s/g, "");


    const letras =
        (caracteres.match(
            /[A-Za-zÁÉÍÓÚáéíóúÑñÜü]/g
        ) || []).length;


    const numeros =
        (caracteres.match(/[0-9]/g) || []).length;


    if (
        numeros >= 5 &&
        numeros > letras
    ) {

        mostrarError(
            mensaje,
            errorMensaje,
            "El mensaje debe contener principalmente texto."
        );

        return false;
    }


    mensaje.value = valor;

    mostrarValido(
        mensaje,
        errorMensaje,
        "✓ Mensaje válido."
    );

    return true;
}


/* =====================================================
   PDF
===================================================== */

function validarArchivo() {

    limpiarEstado(
        archivo,
        errorArchivo
    );


    if (!archivo.files.length) {

        mostrarValido(
            archivo,
            errorArchivo,
            "✓ No se adjuntó ningún documento."
        );

        return true;
    }


    const archivoSeleccionado =
        archivo.files[0];


    const nombreArchivo =
        archivoSeleccionado.name.toLowerCase();


    const esPDF =
        archivoSeleccionado.type === "application/pdf" ||
        nombreArchivo.endsWith(".pdf");


    if (!esPDF) {

        mostrarError(
            archivo,
            errorArchivo,
            "Solo se permiten documentos PDF."
        );

        archivo.value = "";

        return false;
    }


    const maximo =
        5 * 1024 * 1024;


    if (archivoSeleccionado.size > maximo) {

        mostrarError(
            archivo,
            errorArchivo,
            "El PDF no puede superar los 5 MB."
        );

        archivo.value = "";

        return false;
    }


    mostrarValido(
        archivo,
        errorArchivo,
        "✓ Documento PDF válido."
    );

    return true;
}


/* =====================================================
   RESTRICCIONES MIENTRAS ESCRIBE
===================================================== */

nombre.addEventListener("input", function () {

    this.value =
        this.value.replace(
            /[^A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]/g,
            ""
        );

    if (this.value.length > 50) {

        this.value =
            this.value.substring(0, 50);
    }

    limpiarEstado(
        nombre,
        errorNombre
    );
});


telefono.addEventListener("input", function () {

    this.value =
        this.value.replace(
            /[^0-9]/g,
            ""
        );

    if (this.value.length > 10) {

        this.value =
            this.value.substring(0, 10);
    }

    limpiarEstado(
        telefono,
        errorTelefono
    );
});


correo.addEventListener("input", function () {

    if (this.value.length > 100) {

        this.value =
            this.value.substring(0, 100);
    }

    limpiarEstado(
        correo,
        errorCorreo
    );
});


mensaje.addEventListener("input", function () {

    if (this.value.length > 100) {

        this.value =
            this.value.substring(0, 100);
    }

    limpiarEstado(
        mensaje,
        errorMensaje
    );
});


/* =====================================================
   VALIDAR AL SALIR
===================================================== */

nombre.addEventListener(
    "blur",
    validarNombre
);

correo.addEventListener(
    "blur",
    validarCorreo
);

telefono.addEventListener(
    "blur",
    validarTelefono
);

mensaje.addEventListener(
    "blur",
    validarMensaje
);

archivo.addEventListener(
    "change",
    validarArchivo
);


/* =====================================================
   ENVÍO
===================================================== */

formulario.addEventListener(
    "submit",
    async function (evento) {

        evento.preventDefault();


        mensajeFormulario.textContent = "";

        mensajeFormulario.className = "";


        const nombreValido =
            validarNombre();

        const correoValido =
            validarCorreo();

        const telefonoValido =
            validarTelefono();

        const mensajeValido =
            validarMensaje();

        const archivoValido =
            validarArchivo();


        if (
            !nombreValido ||
            !correoValido ||
            !telefonoValido ||
            !mensajeValido ||
            !archivoValido
        ) {

            mensajeFormulario.textContent =
                "✕ No se pudo enviar el mensaje. Valide la información marcada en rojo.";

            mensajeFormulario.classList.add(
                "mensaje-error"
            );

            return;
        }


        boton.disabled = true;

        boton.textContent =
            "Enviando...";


        try {

            const datos =
                new FormData(formulario);


            const respuesta =
                await fetch(
                    formulario.action,
                    {
                        method: "POST",
                        body: datos,
                        headers: {
                            Accept:
                                "application/json"
                        }
                    }
                );


            if (respuesta.ok) {

                mensajeFormulario.textContent =
                    "✓ Mensaje enviado correctamente. Gracias por contactarnos.";

                mensajeFormulario.classList.remove(
                    "mensaje-error"
                );

                mensajeFormulario.classList.add(
                    "mensaje-exito"
                );


                formulario.reset();


                limpiarEstado(
                    nombre,
                    errorNombre
                );

                limpiarEstado(
                    correo,
                    errorCorreo
                );

                limpiarEstado(
                    telefono,
                    errorTelefono
                );

                limpiarEstado(
                    mensaje,
                    errorMensaje
                );

                limpiarEstado(
                    archivo,
                    errorArchivo
                );

            } else {

                throw new Error(
                    "Error al enviar"
                );
            }

        } catch (error) {

            mensajeFormulario.textContent =
                "✕ No se pudo enviar el mensaje. Intente nuevamente más tarde.";

            mensajeFormulario.classList.remove(
                "mensaje-exito"
            );

            mensajeFormulario.classList.add(
                "mensaje-error"
            );

        } finally {

            boton.disabled = false;

            boton.textContent =
                "Enviar Mensaje";
        }

    }
);


});
