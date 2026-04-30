// ============================================================
//  CHATBOT – Rectificadora Automotriz
//  Respuestas preprogramadas con árbol de botones.
//  Sin API. Funciona offline y en archivos locales.
// ============================================================

(function () {

  // ── BASE DE RESPUESTAS ───────────────────────────────────────
  const RESPUESTAS = {

    inicio: {
      texto: "¡Hola! 👋 Soy el asistente de <strong>Rectificadora Automotriz</strong>.<br>Elige una opción para que te ayude:",
      botones: ["servicios","precios","como_agendar","mis_citas","locaciones","refacciones","horarios","contacto"]
    },

    servicios: {
      texto: `🛠 <strong>Servicios disponibles:</strong><br><br>
• <strong>Rectificación de motor</strong> — Restauramos las dimensiones originales del motor con maquinaria de precisión.<br>
• <strong>Reparación mecánica</strong> — Diagnóstico y reparación de frenos, suspensión y transmisión.<br>
• <strong>Pintado automotriz</strong> — Cabina climatizada con pintura de alta duración.<br>
• <strong>Lavado profesional</strong> — Exterior e interior a detalle.<br>
• <strong>Encerado</strong> — Pulido y encerado de carrocería.`,
      botones: ["precios","como_agendar","volver_inicio"]
    },

    precios: {
      texto: `💰 <strong>Lista de precios:</strong><br><br>
• Rectificación de motor — <strong>$3,500</strong><br>
• Reparación mecánica — <strong>$1,200</strong><br>
• Pintado automotriz — <strong>$4,500</strong><br>
• Lavado profesional — <strong>$150</strong><br>
• Encerado — <strong>$300</strong><br><br>
⚠️ <em>Los precios pueden variar según el modelo. Llama para cotización exacta.</em>`,
      botones: ["como_agendar","contacto","volver_inicio"]
    },

    como_agendar: {
      texto: `📅 <strong>¿Cómo agendar una cita?</strong><br><br>
<strong>1.</strong> Inicia sesión (o regístrate si es la primera vez).<br>
<strong>2.</strong> En el menú, haz clic en <strong>"Agendar"</strong>.<br>
<strong>3.</strong> Selecciona el <strong>servicio</strong> que necesitas.<br>
<strong>4.</strong> Elige <strong>fecha</strong> y <strong>hora</strong> (9:00 – 18:00).<br>
<strong>5.</strong> Pulsa <strong>"Confirmar cita"</strong>.<br><br>
✅ Recibirás confirmación en pantalla de inmediato.`,
      botones: ["mis_citas","precios","volver_inicio"]
    },

    mis_citas: {
      texto: `📋 <strong>¿Cómo ver tus citas?</strong><br><br>
<strong>1.</strong> Inicia sesión en tu cuenta.<br>
<strong>2.</strong> Haz clic en <strong>"Mis citas"</strong> en el menú.<br>
<strong>3.</strong> Verás todas tus citas con su estado:<br>
&nbsp;&nbsp;🔴 <strong>Próxima</strong> — pendiente.<br>
&nbsp;&nbsp;⚫ <strong>Completada</strong> — ya realizada.`,
      botones: ["como_agendar","volver_inicio"]
    },

    locaciones: {
      texto: `📍 <strong>Nuestras sucursales:</strong><br><br>
🏢 <strong>Sucursal Centro</strong><br>
&nbsp;Av. Principal #123<br>
&nbsp;📞 (33) 1234-5678<br>
&nbsp;🕐 Lun–Sáb: 9:00 – 18:00<br><br>
🏢 <strong>Sucursal Norte</strong><br>
&nbsp;Calle Mecánicos #45<br>
&nbsp;📞 (33) 8765-4321<br>
&nbsp;🕐 Lun–Sáb: 9:00 – 18:00<br><br>
🅿️ Estacionamiento gratuito en ambas.`,
      botones: ["horarios","contacto","volver_inicio"]
    },

    horarios: {
      texto: `🕐 <strong>Horarios de atención:</strong><br><br>
• <strong>Lunes a Sábado:</strong> 9:00 – 18:00 hrs<br>
• <strong>Domingos:</strong> Cerrado<br><br>
💡 Te recomendamos agendar con anticipación para asegurar tu lugar.`,
      botones: ["como_agendar","locaciones","volver_inicio"]
    },

    refacciones: {
      texto: `🔩 <strong>Refacciones disponibles:</strong><br><br>
• Cera para automóvil — <strong>$120</strong><br>
• Limpiabrisas (par) — <strong>$90</strong><br>
• Parachoques — <strong>$1,500</strong><br>
• Rueda deportiva 17" — <strong>$2,200</strong><br><br>
📦 Consulta disponibilidad para tu modelo en cualquier sucursal.`,
      botones: ["precios","locaciones","volver_inicio"]
    },

    contacto: {
      texto: `📞 <strong>Contáctanos:</strong><br><br>
🏢 <strong>Centro:</strong> (33) 1234-5678<br>
🏢 <strong>Norte:</strong> (33) 8765-4321<br><br>
🕐 Atención telefónica:<br>Lunes a Sábado, 9:00 – 18:00 hrs<br><br>
También puedes agendar directamente desde esta app.`,
      botones: ["como_agendar","locaciones","volver_inicio"]
    },

    volver_inicio: {
      texto: "¿En qué más te puedo ayudar? 😊",
      botones: ["servicios","precios","como_agendar","mis_citas","locaciones","refacciones","horarios","contacto"]
    }
  };

  const ETIQUETAS = {
    servicios:    "🛠 Servicios",
    precios:      "💰 Precios",
    como_agendar: "📅 ¿Cómo agendar?",
    mis_citas:    "📋 Mis citas",
    locaciones:   "📍 Sucursales",
    refacciones:  "🔩 Refacciones",
    horarios:     "🕐 Horarios",
    contacto:     "📞 Contacto",
    volver_inicio:"↩ Menú principal"
  };

  // ── CSS ──────────────────────────────────────────────────────
  const styleEl = document.createElement("style");
  styleEl.textContent = `
  #_cfab{position:fixed;bottom:24px;right:24px;z-index:99999;font-family:'Segoe UI',system-ui,sans-serif;}

  #_ctoggle{
    width:58px;height:58px;border-radius:50%;
    background:#e63946;border:none;color:white;
    font-size:1.45rem;cursor:pointer;
    box-shadow:0 4px 20px rgba(230,57,70,.5);
    transition:transform .2s,box-shadow .2s;
    display:flex;align-items:center;justify-content:center;
    position:relative;
  }
  #_ctoggle:hover{transform:scale(1.09);box-shadow:0 6px 28px rgba(230,57,70,.65);}

  #_cbadge{
    position:absolute;top:-3px;right:-3px;
    width:16px;height:16px;border-radius:50%;
    background:#4ade80;border:2px solid white;
    animation:_cpulse 2s infinite;
  }
  @keyframes _cpulse{0%,100%{transform:scale(1)}50%{transform:scale(1.25)}}

  #_cwin{
    position:fixed;bottom:92px;right:24px;z-index:99999;
    width:340px;max-width:calc(100vw - 36px);
    background:white;border-radius:18px;
    box-shadow:0 12px 48px rgba(0,0,0,.22);
    display:none;flex-direction:column;
    overflow:hidden;max-height:530px;
    animation:_cin .25s ease;
  }
  @keyframes _cin{from{opacity:0;transform:translateY(14px) scale(.97)}to{opacity:1;transform:none}}

  #_chead{
    background:#1a1a2e;color:white;
    padding:13px 16px;
    display:flex;align-items:center;gap:10px;
    flex-shrink:0;
  }
  #_chead .cav{
    width:38px;height:38px;border-radius:50%;
    background:#e63946;display:flex;align-items:center;
    justify-content:center;font-size:1.05rem;flex-shrink:0;
  }
  #_chead .cinf{flex:1;}
  #_chead .cinf strong{font-size:.91rem;display:block;}
  #_chead .cinf span{font-size:.71rem;opacity:.6;}
  #_chead .conl{width:8px;height:8px;border-radius:50%;background:#4ade80;flex-shrink:0;}
  #_chead button{background:none;border:none;color:rgba(255,255,255,.65);font-size:1.1rem;cursor:pointer;padding:0 3px;line-height:1;}
  #_chead button:hover{color:white;}

  #_cmsgs{
    flex:1;overflow-y:auto;padding:14px 12px;
    display:flex;flex-direction:column;gap:10px;
    background:#f4f5f7;
  }
  #_cmsgs::-webkit-scrollbar{width:4px;}
  #_cmsgs::-webkit-scrollbar-thumb{background:#ddd;border-radius:4px;}

  ._cmsg{
    max-width:90%;padding:10px 13px;
    border-radius:14px;font-size:.84rem;
    line-height:1.55;word-break:break-word;
  }
  ._cbot{
    background:white;color:#212529;
    border-bottom-left-radius:4px;
    box-shadow:0 1px 4px rgba(0,0,0,.08);
    align-self:flex-start;
  }
  ._cusr{
    background:#e63946;color:white;
    border-bottom-right-radius:4px;
    align-self:flex-end;
  }

  ._cbtns{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;}
  ._cbtn{
    background:white;border:1.5px solid #e63946;
    color:#e63946;border-radius:20px;
    padding:5px 12px;font-size:.77rem;
    cursor:pointer;transition:all .18s;
    font-family:inherit;line-height:1.3;
  }
  ._cbtn:hover{background:#e63946;color:white;}
  ._cbtn:disabled{opacity:.35;cursor:default;pointer-events:none;}

  #_cfoot{
    padding:8px 14px;background:white;
    border-top:1px solid #eee;
    font-size:.72rem;color:#9ca3af;text-align:center;
    flex-shrink:0;
  }
  `;
  document.head.appendChild(styleEl);

  // ── HTML ─────────────────────────────────────────────────────
  const fab = document.createElement("div");
  fab.id = "_cfab";
  fab.innerHTML = `
    <div id="_cwin">
      <div id="_chead">
        <div class="cav">🔧</div>
        <div class="cinf">
          <strong>Asistente Virtual</strong>
          <span>Rectificadora Automotriz</span>
        </div>
        <div class="conl"></div>
        <button id="_cx">✕</button>
      </div>
      <div id="_cmsgs"></div>
      <div id="_cfoot">Selecciona una opción para continuar</div>
    </div>
    <button id="_ctoggle" title="Asistente">
      <span id="_cicon">💬</span>
      <div id="_cbadge"></div>
    </button>
  `;
  document.body.appendChild(fab);

  // ── LÓGICA ───────────────────────────────────────────────────
  const win    = document.getElementById("_cwin");
  const toggle = document.getElementById("_ctoggle");
  const cicon  = document.getElementById("_cicon");
  const cx     = document.getElementById("_cx");
  const msgs   = document.getElementById("_cmsgs");
  const badge  = document.getElementById("_cbadge");

  let abierto = false;
  let iniciado = false;

  function abrir() {
    abierto = true;
    win.style.display = "flex";
    cicon.textContent = "✕";
    badge.style.display = "none";
    if (!iniciado) { iniciado = true; mostrar("inicio"); }
  }

  function cerrar() {
    abierto = false;
    win.style.display = "none";
    cicon.textContent = "💬";
  }

  toggle.addEventListener("click", () => abierto ? cerrar() : abrir());
  cx.addEventListener("click", cerrar);

  function mostrar(clave) {
    const data = RESPUESTAS[clave];
    if (!data) return;

    // Wrapper de burbuja + botones
    const wrap = document.createElement("div");
    wrap.style.cssText = "display:flex;flex-direction:column;align-self:flex-start;max-width:94%;";

    const burbuja = document.createElement("div");
    burbuja.className = "_cmsg _cbot";
    burbuja.innerHTML = data.texto;

    const btnsWrap = document.createElement("div");
    btnsWrap.className = "_cbtns";

    data.botones.forEach(k => {
      const b = document.createElement("button");
      b.className = "_cbtn";
      b.textContent = ETIQUETAS[k] || k;
      b.addEventListener("click", () => {
        // Mensaje "usuario"
        const u = document.createElement("div");
        u.className = "_cmsg _cusr";
        u.textContent = ETIQUETAS[k] || k;
        msgs.appendChild(u);

        // Desactiva botones de este grupo
        btnsWrap.querySelectorAll("._cbtn").forEach(el => el.disabled = true);

        setTimeout(() => {
          mostrar(k);
          msgs.scrollTop = msgs.scrollHeight;
        }, 280);
      });
      btnsWrap.appendChild(b);
    });

    wrap.appendChild(burbuja);
    wrap.appendChild(btnsWrap);
    msgs.appendChild(wrap);
    msgs.scrollTop = msgs.scrollHeight;
  }

})();
