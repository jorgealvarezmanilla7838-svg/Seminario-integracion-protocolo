// Protección admin
const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
if (!usuario || usuario.rol !== "admin") {
  window.location.href = "login.html";
}

// Logout
function logout() {
  localStorage.removeItem("usuarioActivo");
  window.location.href = "login.html";
}

// Enviar "correo"
function enviarCorreo(index) {
  const citas = JSON.parse(localStorage.getItem("citas")) || [];
  const cita  = citas[index];

  const btn = document.getElementById("btn-" + index);
  btn.disabled = true;
  btn.textContent = "✅ Enviado";
  btn.style.background = "#198754";

  // Simulación de éxito con alerta inline
  const alertEl = document.getElementById("alerta-" + index);
  if (alertEl) {
    alertEl.innerHTML = `<div class="alerta alerta-exito mt-2" style="font-size:0.85rem;">✅ Recordatorio enviado a <strong>${cita.correo}</strong></div>`;
  }
}

// Cargar citas
window.onload = function() {
  const citas      = JSON.parse(localStorage.getItem("citas")) || [];
  const contenedor = document.getElementById("listaCitas");
  const total      = document.getElementById("totalCitas");

  total.textContent = citas.length + (citas.length === 1 ? " cita" : " citas");

  if (citas.length === 0) {
    contenedor.innerHTML = `
      <div class="empty-state">
        <div class="icon">📭</div>
        <p class="fw-semibold" style="color:#495057;">No hay citas registradas aún.</p>
      </div>`;
    return;
  }

  let html = "";
  citas.forEach((cita, i) => {
    const esPasada = cita.fecha < new Date().toISOString().split("T")[0];
    const badge    = esPasada
      ? `<span class="badge bg-secondary">Completada</span>`
      : `<span class="badge" style="background:#e63946;">Próxima</span>`;

    html += `
      <div class="cita-item">
        <div class="cita-info">
          <p><strong>${cita.nombre}</strong> &nbsp;${badge}</p>
          <p>📧 ${cita.correo} &nbsp;·&nbsp; 🛠 ${cita.servicio} &nbsp;·&nbsp; 📅 ${cita.fecha} ${cita.hora ? "– " + cita.hora : ""}</p>
          <div id="alerta-${i}"></div>
        </div>
        <button id="btn-${i}" onclick="enviarCorreo(${i})" class="btn-rojo" style="white-space:nowrap; font-size:0.85rem; padding:0.45rem 1rem;">
          📧 Enviar recordatorio
        </button>
      </div>`;
  });

  contenedor.innerHTML = html;
};
