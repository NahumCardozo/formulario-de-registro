const nombreUsuario = document.getElementById("nombre-y-apellido");
const edadUsuario = document.getElementById("edad");
const emailUsuario = document.getElementById("email");
const contraseniaUsuario = document.getElementById("contrasenia");
const confirmarcontraseniaUsuario = document.getElementById("confirmacion-contrasenia");

const registro = async (event) => { 
    event.preventDefault();

    const nombreyapellido = nombreUsuario.value;
    const edad = Number(edadUsuario.value);
    const email = emailUsuario.value;
    const contrasenia = contraseniaUsuario.value;
    const confirmarContrasenia = confirmarcontraseniaUsuario.value;

    const url = "https://jsonplaceholder.typicode.com/users";
    const respuesta = await fetch(url);
    const user = await respuesta.json();

    const usuariosRegistrados = user.map((usuario) => usuario.email);
    const emailIngresado = usuariosRegistrados.filter ((emailUser) => emailUser === email)

    if (emailIngresado.length > 0) {
        alert("El email ingresado ya se encuentra registrado, por favor ingrese otro email.");
        return;
    }

    if (contrasenia !== confirmarContrasenia) {
        alert("Las contraseñas no coinciden.");
        return;
    }
    
    const edadAprobada = 18;
    if (edad < edadAprobada) {
        alert("Debes ser mayor de edad para registrarte.");
        return;
    }

    if (edad >= edadAprobada) {
        alert("Registro exitoso.");
    }

    localStorage.setItem("emailUsuario", email);
    window.location.href = "bienvenida.html";
};

const usuariologeado = () => {
    const emailActivo = localStorage.getItem("emailUsuario");
    const ruta = window.location.pathname;

    if (emailActivo && (ruta.endsWith("index.html") || ruta === "/")) {
        window.location.href = "bienvenida.html";
    }

    if (!emailActivo && ruta.endsWith("bienvenida.html")) {
        window.location.href = "index.html";
    }
};

usuariologeado();

const logout = () => {
    localStorage.clear();
    window.location.href = "index.html";
}; 



