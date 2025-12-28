const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

if (!usuarioActivo) {
    window.location.href = "login.html";
}

let asistencias = JSON.parse(localStorage.getItem("asistencias")) || [];

const hoy = new Date().toISOString().split("T")[0];
const horaActual = () => new Date().toLocaleTimeString();

/* =========================
   MOSTRAR ASISTENCIAS
========================= */
function pintarTabla(lista) {
    const tabla = document.getElementById("tablaUsuarios");
    tabla.innerHTML = "";

    if (lista.length === 0) {
        tabla.innerHTML = `
          <tr>
            <td colspan="4" style="text-align:center;">
              No tienes asistencias registradas
            </td>
          </tr>
        `;
        return;
    }

    lista.forEach(a => {
        tabla.innerHTML += `
          <tr>
            <td>${a.fecha}</td>
            <td>${a.horaEntrada || "-"}</td>
            <td>${a.horaSalida || "-"}</td>
            <td>${a.turno}</td>
          </tr>
        `;
    });
}

/* =========================
   MOSTRAR SOLO MIS REGISTROS
========================= */
function mostrarMisAsistencias() {
    const misRegistros = asistencias.filter(a =>
        a.nombre === usuarioActivo.nombre
    );
    pintarTabla(misRegistros);
}

/* =========================
   MARCAR ENTRADA
========================= */
function marcarEntrada() {
    const turno = document.getElementById("turno").value;

    if (turno === "") {
        document.getElementById("mensaje").innerText =
            "⚠️ Debes seleccionar un turno";
        return;
    }

    let registro = asistencias.find(a =>
        a.nombre === usuarioActivo.nombre && a.fecha === hoy
    );

    if (registro && registro.horaEntrada) {
        document.getElementById("mensaje").innerText =
            "⚠️ Ya registraste tu entrada hoy";
        return;
    }

    if (!registro) {
        asistencias.push({
            nombre: usuarioActivo.nombre,
            cargo: usuarioActivo.cargo,
            area: usuarioActivo.area,
            fecha: hoy,
            turno: turno,
            horaEntrada: horaActual(),
            horaSalida: ""
        });
    } else {
        registro.horaEntrada = horaActual();
        registro.turno = turno;
    }

    localStorage.setItem("asistencias", JSON.stringify(asistencias));
    document.getElementById("mensaje").innerText =
        "✅ Entrada registrada correctamente";

    mostrarMisAsistencias();
}

/* =========================
   MARCAR SALIDA
========================= */
function marcarSalida() {
    let registro = asistencias.find(a =>
        a.nombre === usuarioActivo.nombre && a.fecha === hoy
    );

    if (!registro || !registro.horaEntrada) {
        document.getElementById("mensaje").innerText =
            "⚠️ Primero debes marcar tu entrada";
        return;
    }

    if (registro.horaSalida) {
        document.getElementById("mensaje").innerText =
            "⚠️ Ya registraste tu salida hoy";
        return;
    }

    registro.horaSalida = horaActual();

    localStorage.setItem("asistencias", JSON.stringify(asistencias));
    document.getElementById("mensaje").innerText =
        "✅ Salida registrada correctamente";

    mostrarMisAsistencias();
}

/* =========================
   FILTRO POR RANGO DE FECHAS
========================= */
function filtrarPorFechas() {
    const inicio = document.getElementById("fechaInicio").value;
    const fin = document.getElementById("fechaFin").value;

    if (!inicio || !fin) {
        alert("Seleccione ambas fechas");
        return;
    }

    const inicioDate = new Date(inicio);
    const finDate = new Date(fin);

    const filtradas = asistencias.filter(a =>
        a.nombre === usuarioActivo.nombre &&
        new Date(a.fecha) >= inicioDate &&
        new Date(a.fecha) <= finDate
    );

    pintarTabla(filtradas);
}

/* =========================
   MOSTRAR TODO
========================= */
function mostrarTodas() {
    mostrarMisAsistencias();
}

/* =========================
   CARGA INICIAL
========================= */
mostrarMisAsistencias();