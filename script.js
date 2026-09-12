const nombreUsuario = document.getElementById("nombre-y-apellido");
const edadUsuario = document.getElementById("edad");
const emailUsuario = document.getElementById("email");
const contraseniaUsuario = document.getElementById("contrasenia");
const confirmacionContraseniaUsuario = document.getElementById("confirmacion-contrasenia");


const registro = async (event) => {
    event.preventDefault(); 

    const nombre = nombreUsuario.value;
    const edad = Number(edadUsuario.value);
    const email = emailUsuario.value;
    const contrasenia = contraseniaUsuario.value;
    const confirmacionContrasenia = confirmacionContraseniaUsuario.value;

    const url = "https://jsonplaceholder.typicode.com/users";
    const respuesta = await fetch(url);
    const users = await respuesta.json();

    const usuariosRegistrados = users.map((usuario) => usuario.email);
    const emailEncontrado = usuariosRegistrados.filter((emailUser) => emailUser === email);

    if (emailEncontrado.length > 0) {
        alert("El email ingresado ya está registrado. Intenta con otro.");
        return;
    }

    if (contrasenia !== confirmacionContrasenia) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    const edadAprobada = 18;
    if (edad < edadAprobada) {
        alert("Necesitas ser mayor de edad para registrarte.");
        return;
    }

    if (edad === edadAprobada) {
        alert("Puedes ingresar pero con supervisión.");
    }

    localStorage.setItem("emailUsuario", email);
    window.location.href = "bienvenida.html";
};


const usuarioLogueado = () => {
    const emailActivo = localStorage.getItem("emailUsuario");
    const ruta = window.location.pathname;
    
    if (emailActivo && (ruta.endsWith("index.html") || ruta === "/")) {
        window.location.href = "bienvenida.html";
    }

    if (!emailActivo && ruta.endsWith("bienvenida.html")) {
        window.location.href = "index.html";
    }
};

usuarioLogueado();


const logout = () => {
    localStorage.clear();
    window.location.href = "index.html";
};