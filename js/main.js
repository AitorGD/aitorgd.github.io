/* js/main.js */
document.addEventListener("DOMContentLoaded", () => {
    const fechaViaje = new Date("2025-08-23");
    const hoy = new Date();
    const diasFaltantes = Math.ceil((fechaViaje - hoy) / (1000 * 60 * 60 * 24));
    document.getElementById("contador").innerHTML = `Faltan <span class="numero-dias">${diasFaltantes}</span> días para el viaje.`;
  
    
  
    btn.onclick = () => modal.style.display = "block";
    cerrar.onclick = () => modal.style.display = "none";
    window.onclick = (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };
  });
  