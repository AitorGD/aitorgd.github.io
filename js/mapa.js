const map = L.map('map').setView([35.6762, 139.6503], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

fetch("data/itinerarios.json")
  .then(res => res.json())
  .then(data => {
    data.forEach(dia => {
      if (dia.lat && dia.lng) {
        L.marker([dia.lat, dia.lng]).addTo(map)
          .bindPopup(`<b>${dia.fecha}</b><br>${dia.descripcion}`);
      }
    });
  });