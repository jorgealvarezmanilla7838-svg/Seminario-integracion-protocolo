const form = document.getElementById("loginForm");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const correo   = document.getElementById("correo");
  const password = document.getElementById("password");
  const msg      = document.getElementById("mensaje");
  const btn      = document.getElementById("btnLogin");
  const spinner  = document.getElementById("spinner");

  // Validación visual
  let valido = true;
  [correo, password].forEach(el => { el.classList.remove("is-invalid", "is-valid"); });

  if (!correo.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value)) {
    correo.classList.add("is-invalid"); valido = false;
  } else { correo.classList.add("is-valid"); }

  if (!password.value || password.value.length < 4) {
    password.classList.add("is-invalid"); valido = false;
  } else { password.classList.add("is-valid"); }

  if (!valido) return;

  // Simular carga
  btn.disabled = true;
  if (spinner) { spinner.style.display = "inline-block"; }
  msg.innerHTML = "";

  setTimeout(() => {
    btn.disabled = false;
    if (spinner) { spinner.style.display = "none"; }

    // Admin fijo
    if (correo.value === "admin@rectificadora.com" && password.value === "admin123") {
      localStorage.setItem("usuarioActivo", JSON.stringify({
        nombre: "Administrador", correo: correo.value, rol: "admin"
      }));
      window.location.href = "admin.html";
      return;
    }

    // Usuarios normales
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario  = usuarios.find(u => u.correo === correo.value && u.password === password.value);

    if (usuario) {
      usuario.rol = "cliente";
      localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
      window.location.href = "index.html";
    } else {
      msg.innerHTML = `<div class="alerta alerta-error">❌ Correo o contraseña incorrectos.</div>`;
      correo.classList.replace("is-valid", "is-invalid");
      password.classList.replace("is-valid", "is-invalid");
    }
  }, 700);
});
