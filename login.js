const usuarios = [
    {
        usuario: "jean",
        password: "1234",
        nombre: "Jean Chuquizuta",
        cargo: "Administrativo",
        area: "Dirección General",
        rol: "usuario"
    },
    {
        usuario: "admin",
        password: "admin123",
        nombre: "Oficina de Personal",
        rol: "admin"
    }
];

localStorage.setItem("usuarios", JSON.stringify(usuarios));

document.getElementById("loginForm").addEventListener("submit", e => {
    e.preventDefault();

    const user = usuario.value;
    const pass = password.value;

    const encontrado = usuarios.find(u => u.usuario === user && u.password === pass);

    if (encontrado) {
        localStorage.setItem("usuarioActivo", JSON.stringify(encontrado));

        if (encontrado.rol === "admin") {
            window.location.href = "admin.html";
        } else {
            window.location.href = "index.html";
        }
    } else {
        alert("Usuario o contraseña incorrectos");
    }
});