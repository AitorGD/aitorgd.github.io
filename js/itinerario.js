const params = new URLSearchParams(window.location.search);
let dia = parseInt(params.get("dia"), 10);
fetch("data/itinerarios.json")
  .then(res => res.json())
  .then(data => {
    const info = data[dia];
    if (info) {
      document.getElementById("contenido-itinerario").innerHTML = `
        <h3>${info.fecha}</h3>
        <p class="descripcion">${info.descripcion}</p>
        <p><strong>Coste estimado:</strong> ${info.coste}</p>
        <img src="img/${info.imagen}" alt="${info.fecha}" class="imagen-dia">
        ${info.actividad_dia_completo ? `
          <h4>Actividad de Día Completo</h4>
          <p>${info.actividad_dia_completo}</p>
        ` : `
          <h4>Desayuno</h4><p>${info.desayuno || 'Libre'}</p>
          <h4>Actividad Mañana</h4><p>${info.actividad_manana || 'Libre'}</p>
          <h4>Comida</h4><p>${info.comida || 'Libre'}</p>
          <h4>Actividad Tarde</h4><p>${info.actividad_tarde || 'Libre'}</p>
          <h4>Cena</h4><p>${info.cena || 'Libre'}</p>
          <h4>Actividad Noche</h4><p>${info.actividad_noche || 'Libre'}</p>
        `}
      `;

      if (info.lat && info.lng) {
        const mapaDiv = document.getElementById("mapa-dia");
      
        // Asegúrate de limpiar cualquier mapa anterior si hay navegación
        mapaDiv.innerHTML = ""; // limpia el div para evitar múltiples mapas
      
        setTimeout(() => {
          const map = L.map(mapaDiv).setView([info.lat, info.lng], 13);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
          }).addTo(map);
          L.marker([info.lat, info.lng]).addTo(map).bindPopup(info.fecha);
      
          map.invalidateSize(); // fuerza el recálculo del tamaño real
        }, 300); // asegura que el div esté visible y con tamaño
      }
      
      
      
    } else {
      document.getElementById("contenido-itinerario").textContent = "No hay datos para este día.";
    }
  });

function navegar(offset) {
  const nuevoDia = dia + offset;
  if (nuevoDia >= 0 && nuevoDia <= 11) {
    window.location.href = `itinerario.html?dia=${nuevoDia}`;
  }
}