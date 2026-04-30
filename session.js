// Protege la página: redirige a login si no hay sesión
const _usuario = localStorage.getItem("usuarioActivo");
if (!_usuario) {
  window.location.href = "login.html";
}

// Inyecta nombre de usuario en el navbar si existe el elemento
document.addEventListener("DOMContentLoaded", function() {
  const el = document.getElementById("navUsuario");
  if (el && _usuario) {
    const u = JSON.parse(_usuario);
    el.textContent = "👤 " + u.nombre;
  }
});

function logout() {
  localStorage.removeItem("usuarioActivo");
  window.location.href = "login.html";
}
