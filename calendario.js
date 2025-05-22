const calendario = document.getElementById("calendario");
const inicio = new Date("2025-08-20");
const diasSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

// Encabezado de la tabla
let filaEncabezado = calendario.insertRow();
diasSemana.forEach(dia => {
  const th = document.createElement("th");
  th.textContent = dia;
  filaEncabezado.appendChild(th);
});

let fechaActual = new Date(inicio);
fechaActual.setDate(inicio.getDate() - inicio.getDay()); // Empezar desde el domingo de la semana

for (let semana = 0; semana < 6; semana++) {
  const fila = calendario.insertRow();
  for (let dia = 0; dia < 7; dia++) {
    const celda = fila.insertCell();
    const fechaTexto = fechaActual.toLocaleDateString("es-ES", { day: '2-digit', month: 'short' });
    celda.textContent = fechaTexto;
    celda.className = "dia";
    let diferencia = Math.floor((fechaActual - inicio) / (1000 * 60 * 60 * 24));
    if (diferencia >= 0 && diferencia < 30) {
      celda.onclick = () => {
        window.location.href = `itinerario.html?dia=${diferencia}`;
      };
      celda.classList.add("activo");
    } else {
      celda.classList.add("inactivo");
    }
    fechaActual.setDate(fechaActual.getDate() + 1);
  }
}
