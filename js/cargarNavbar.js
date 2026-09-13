document.addEventListener("DOMContentLoaded", function () {

    cargarNavbar();

});



function cargarNavbar() {


    fetch("../navbar/navbar.html")

        .then(function(res){

            if(!res.ok){

                throw new Error("Error navbar: " + res.status);

            }

            return res.text();

        })


        .then(function(html){


            var navbarExistente = document.querySelector("header");


            if(navbarExistente){

                navbarExistente.remove();

            }



            document.body.insertAdjacentHTML(
                "afterbegin",
                html
            );



            console.log("✅ Navbar cargado");



            ajustarBotonesSegunSesion();


            actualizarCarritoNavbar();



        })


        .catch(function(error){

            console.error(
                "❌ Error cargando navbar:",
                error
            );

        });



}








function ajustarBotonesSegunSesion(){



    let usuarioGuardado =
        localStorage.getItem("usuarioLogueado");



    let usuario =
        usuarioGuardado
        ? JSON.parse(usuarioGuardado)
        : null;




    console.log(
        "Usuario:",
        usuario
        ? usuario.nombres
        : "No conectado"
    );








    // ===============================
    // MI CUENTA
    // ===============================



    let linkMiCuenta =
        document.getElementById("linkMiCuenta");


    let textoMiCuenta =
        document.getElementById("textoMiCuenta");


    let iconoMiCuenta =
        document.getElementById("iconoMiCuenta");





    if(linkMiCuenta){



        if(usuario){



            textoMiCuenta.textContent =
                usuario.nombres || "Mi cuenta";



            iconoMiCuenta.className =
                "bi bi-person";



            linkMiCuenta.href =
                "../perfil/perfil.html";



        }


        else{


            textoMiCuenta.textContent =
                "Iniciar sesión";



            iconoMiCuenta.className =
                "bi bi-box-arrow-in-right";



            linkMiCuenta.href =
                "../inicio/login.html";



        }



    }
// ===============================
// GESTIÓN DE CITAS
// ===============================


function abrirEditarCitas(){

    localStorage.setItem(
        "modoCitas",
        "editar"
    );


    window.location.href =
    "../carrito/GestionarCitas.html";

}




function abrirCancelarCitas(){

    localStorage.setItem(
        "modoCitas",
        "cancelar"
    );


    window.location.href =
    "../carrito/GestionarCitas.html";

}




// Permitir uso desde navbar.html

window.abrirEditarCitas =
    abrirEditarCitas;


window.abrirCancelarCitas =
    abrirCancelarCitas;









    // ===============================
    // SALIR / REGISTRO
    // ===============================



    let linkSalir =
        document.getElementById("linkSalir");


    let textoSalir =
        document.getElementById("textoSalir");


    let iconoSalir =
        document.getElementById("iconoSalir");






    if(linkSalir){



        if(usuario){



            textoSalir.textContent =
                "Salir";



            iconoSalir.className =
                "bi bi-box-arrow-right";



            linkSalir.href="#";



            linkSalir.onclick=function(e){


                e.preventDefault();


                cerrarSesion();


            };



        }



        else{


            textoSalir.textContent =
                "Registrarse";



            iconoSalir.className =
                "bi bi-person-plus";



            linkSalir.href =
                "../inicio/registro.html";



        }



    }









    // ===============================
    // CARRITO
    // ===============================



    let navCarrito =
        document.getElementById("navCarrito");



    if(navCarrito){



        if(usuario){


            navCarrito.style.display="";

        }


        else{


            navCarrito.style.display="none";

        }



    }



}










// ===============================
// CERRAR SESIÓN
// ===============================



function cerrarSesion(){



    let confirmar =
        confirm(
        "¿Desea cerrar sesión?"
        );



    if(confirmar){



        localStorage.removeItem(
            "usuarioLogueado"
        );



        localStorage.removeItem(
            "token"
        );



        window.location.href =
            "../inicio/index.html";



    }


}









// ===============================
// CARRITO NAVBAR
// ===============================



function actualizarCarritoNavbar(){



    let carrito =
        JSON.parse(
            localStorage.getItem("carrito")
        )
        || [];





    let cantidad =
        document.getElementById(
            "cantidadCarrito"
        );



    if(cantidad){



        cantidad.textContent =
            carrito.length;



    }







    let lista =
        document.getElementById(
            "listaCarritoNavbar"
        );



    let total =
        document.getElementById(
            "totalCarritoNavbar"
        );





    if(!lista){

        return;

    }








    if(carrito.length===0){



        lista.innerHTML=`

        <p class="text-muted text-center">

        Carrito vacío

        </p>

        `;



        total.textContent="$0";

        return;



    }









    let suma=0;



    lista.innerHTML="";








    carrito.forEach(function(producto){



        suma += Number(producto.precio);



        lista.innerHTML += `


        <div class="d-flex justify-content-between mb-2">


            <span>

            ${producto.nombre}

            </span>



            <strong>

            $${Number(producto.precio).toLocaleString()}

            </strong>


        </div>


        `;



    });








    total.textContent =
        "$" + suma.toLocaleString();




}





// ===============================
// VACIAR CARRITO
// ===============================



function vaciarCarrito(){



    localStorage.removeItem(
        "carrito"
    );



    actualizarCarritoNavbar();



    alert(
        "Carrito vacío"
    );



}







// Permitir uso desde HTML

window.cargarNavbar =
    cargarNavbar;


window.cerrarSesion =
    cerrarSesion;


window.vaciarCarrito =
    vaciarCarrito;