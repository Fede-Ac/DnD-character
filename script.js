// REEMPLAZA ESTA URL con la URL pública real de tu Cloudflare Worker (ej: https://dnd-api.tu-usuario.workers.dev)
const WORKER_URL = "https://dnd-api.fedeacosta6.workers.dev";

document.addEventListener("DOMContentLoaded", async () => {
  const initiativeInput = document.getElementById("initiative");
  const maxHpInput = document.getElementById("max-hp");
  const currentHpInput = document.getElementById("current-hp");
  const saveBtn = document.getElementById("save-stats-btn");
  const statusSpan = document.getElementById("save-status");

  // 1. Cargar datos al abrir la web
  try {
    const response = await fetch(`${WORKER_URL}/api/stats`);
    if (response.ok) {
      const data = await response.json();
      initiativeInput.value = data.initiative;
      maxHpInput.value = data.max_hp;
      currentHpInput.value = data.current_hp;
    } else {
      console.error("No se pudieron cargar los datos del personaje");
    }
  } catch (error) {
    console.error("Error de red al conectar con el backend:", error);
  }

  // 2. Guardar datos al presionar el botón
  saveBtn.addEventListener("click", async () => {
    const initiative = parseInt(initiativeInput.value);
    const max_hp = parseInt(maxHpInput.value);
    const current_hp = parseInt(currentHpInput.value);

    // Pedir contraseña por una ventana emergente
    // guardarla en localStorage para no tener que escribirla todo el tiempo
    let secret = localStorage.getItem("dnd_secret");
    if (!secret) {
      secret = prompt("Ingresa la contraseña para guardar los cambios:");
      if (!secret) return; // Si cancela, no hace nada
      localStorage.setItem("dnd_secret", secret); // La guarda para la sesión
    }

    // Validación rápida local
    if (initiative < -5 || initiative > 20) {
      alert("La iniciativa debe estar entre -5 y 20.");
      return;
    }
    if (max_hp < 0 || current_hp < 0) {
      alert("La vida no puede ser negativa.");
      return;
    }

    if (max_hp < current_hp) {
      alert("La vida actual no puede superar a la vida máxima");
      return;
    }

    saveBtn.disabled = true;
    statusSpan.textContent = "Guardando...";
    statusSpan.style.color = "orange";

    try {
      const response = await fetch(`${WORKER_URL}/api/stats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Secret": secret // Enviamos la contraseña en los headers
        },
        body: JSON.stringify({ initiative, max_hp, current_hp }),
      });

      if (response.ok) {
        statusSpan.textContent = "¡Guardado con éxito!";
        statusSpan.style.color = "green";
      } else if (response.status === 401) {
        // Si la contraseña es incorrecta, borramos la guardada para que la vuelva a pedir
        localStorage.removeItem("dnd_secret");
        throw new Error("Contraseña incorrecta");
      } else {
        throw new Error("Error al guardar en el servidor");
      }
    } catch (error) {
      console.error(error);
      statusSpan.textContent = error.message || "Error al guardar";
      statusSpan.style.color = "red";
    } finally {
      saveBtn.disabled = false;
      setTimeout(() => {
        statusSpan.textContent = "";
      }, 3000);
    }
  });