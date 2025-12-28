/* =========================
   VALIDAR ADMIN
========================= */
const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

if (!usuarioActivo || usuarioActivo.rol !== "admin") {
    window.location.href = "login.html";
}

document.getElementById("adminNombre").innerText =
    "Administrador: " + usuarioActivo.nombre;

/* =========================
   DATOS
========================= */
let asistencias = JSON.parse(localStorage.getItem("asistencias")) || [];
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

/* =========================
   CREAR USUARIO
========================= */
function crearUsuario() {
    const nombre = document.getElementById("nuevoNombre").value.trim();
    const usuario = document.getElementById("nuevoUsuario").value.trim();
    const password = document.getElementById("nuevoPassword").value.trim();
    const cargo = document.getElementById("nuevoCargo").value;
    const area = document.getElementById("nuevoArea").value.trim();
    const rol = document.getElementById("nuevoRol").value;

    if (!nombre || !usuario || !password || !cargo || !rol) {
        document.getElementById("mensajeUsuario").innerText =
            "⚠️ Complete todos los campos obligatorios";
        return;
    }

    const existe = usuarios.find(u => u.usuario === usuario);
    if (existe) {
        document.getElementById("mensajeUsuario").innerText =
            "⚠️ El usuario ya existe";
        return;
    }

    usuarios.push({
        nombre,
        usuario,
        password,
        cargo,
        area,
        rol
    });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    document.getElementById("mensajeUsuario").innerText =
        "✅ Usuario creado correctamente";

    // Limpiar formulario
    document.getElementById("nuevoNombre").value = "";
    document.getElementById("nuevoUsuario").value = "";
    document.getElementById("nuevoPassword").value = "";
    document.getElementById("nuevoCargo").value = "";
    document.getElementById("nuevoArea").value = "";
    document.getElementById("nuevoRol").value = "usuario";
}

/* =========================
   PINTAR TABLA ADMIN
========================= */
function pintarTabla(lista) {
    const tbody = document.getElementById("tablaAdmin");
    tbody.innerHTML = "";

    if (lista.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center;">
                    No hay registros
                </td>
            </tr>
        `;
        return;
    }

    lista.forEach(a => {
        tbody.innerHTML += `
            <tr>
                <td>${a.nombre}</td>
                <td>${a.cargo}</td>
                <td>${a.fecha}</td>
                <td>${a.horaEntrada || "-"}</td>
                <td>${a.horaSalida || "-"}</td>
                <td>${a.turno}</td>
            </tr>
        `;
    });
}

/* =========================
   APLICAR FILTROS
========================= */
function aplicarFiltros() {
    const usuario = document.getElementById("filtroUsuario").value.toLowerCase();
    const inicio = document.getElementById("fechaInicio").value;
    const fin = document.getElementById("fechaFin").value;

    let resultado = asistencias;

    if (usuario !== "") {
        resultado = resultado.filter(a =>
            a.nombre.toLowerCase().includes(usuario)
        );
    }

    if (inicio && fin) {
        const fInicio = new Date(inicio);
        const fFin = new Date(fin);

        resultado = resultado.filter(a => {
            const fecha = new Date(a.fecha);
            return fecha >= fInicio && fecha <= fFin;
        });
    }

    pintarTabla(resultado);
}

/* =========================
   LIMPIAR FILTROS
========================= */
function limpiarFiltros() {
    document.getElementById("filtroUsuario").value = "";
    document.getElementById("fechaInicio").value = "";
    document.getElementById("fechaFin").value = "";

    pintarTabla(asistencias);
}

/* =========================
   CERRAR SESIÓN
========================= */
function cerrarSesion() {
    localStorage.removeItem("usuarioActivo");
    window.location.href = "login.html";
}

/* =========================
   CARGA INICIAL
========================= */
pintarTabla(asistencias);