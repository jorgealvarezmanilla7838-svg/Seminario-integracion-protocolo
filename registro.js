const form = document.getElementById("registroForm");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const nombre   = document.getElementById("nombre");
  const apellido = document.getElementById("apellido");
  const correo   = document.getElementById("correo");
  const password = document.getElementById("password");
  const msg      = document.getElementById("mensaje");
  const spinner  = document.getElementById("spinner");

  // Limpiar estados
  [nombre, apellido, correo, password].forEach(el => el.classList.remove("is-invalid","is-valid"));
  msg.innerHTML = "";

  let valido = true;

  if (!nombre.value.trim())   { nombre.classList.add("is-invalid");   valido = false; } else nombre.classList.add("is-valid");
  if (!apellido.value.trim()) { apellido.classList.add("is-invalid"); valido = false; } else apellido.classList.add("is-valid");
  if (!correo.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value)) { correo.classList.add("is-invalid"); valido = false; } else correo.classList.add("is-valid");
  if (!password.value || password.value.length < 6) { password.classList.add("is-invalid"); valido = false; } else password.classList.add("is-valid");

  if (!valido) {
    msg.innerHTML = `<div class="alerta alerta-error">❌ Por favor corrige los campos marcados.</div>`;
    return;
  }

  // Verificar si ya existe
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const existe   = usuarios.find(u => u.correo === correo.value);

  if (existe) {
    correo.classList.replace("is-valid","is-invalid");
    msg.innerHTML = `<div class="alerta alerta-error">❌ Este correo ya está registrado.</div>`;
    return;
  }

  if (spinner) spinner.style.display = "inline-block";

  setTimeout(() => {
    usuarios.push({ nombre: nombre.value.trim(), apellido: apellido.value.trim(), correo: correo.value, password: password.value });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    msg.innerHTML = `<div class="alerta alerta-exito">✅ Cuenta creada exitosamente. Redirigiendo...</div>`;

    setTimeout(() => { window.location.href = "login.html"; }, 1500);
  }, 600);
});
