// Verificar que sea administrador
const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

if (!usuarioActivo || usuarioActivo.rol !== "admin") {
    alert("Acceso restringido");
    window.location.href = "login.html";
}

// Obtener usuarios
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
const tabla = document.getElementById("tablaUsuarios");

// Crear usuario
document.getElementById("formUsuario").addEventListener("submit", e => {
    e.preventDefault();

    const nuevoUsuario = {
        nombre: nombre.value,
        usuario: usuario.value,
        password: password.value,
        cargo: cargo.value,
        area: area.value,
        rol: "usuario"
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    document.getElementById("formUsuario").reset();
    mostrarUsuarios();
});

// Mostrar usuarios creados
function mostrarUsuarios() {
    tabla.innerHTML = "";

    usuarios
        .filter(u => u.rol === "usuario")
        .forEach(u => {
            tabla.innerHTML += `
                <tr>
                    <td>${u.nombre}</td>
                    <td>${u.usuario}</td>
                    <td>${u.cargo}</td>
                    <td>${u.area}</td>
                </tr>
            `;
        });
}

mostrarUsuarios();