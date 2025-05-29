// js/mapa_google.js

function inicializarMapa() {
  const centro = { lat: 35.6895, lng: 139.6917 }; // Coordenadas de Tokio

  const mapa = new google.maps.Map(document.getElementById("map"), {
    center: centro,
    zoom: 5,
    mapTypeId: "roadmap",
    disableDefaultUI: false,
  });

  // Ejemplo de marcadores
  const lugares = [
    { nombre: "Tokio", lat: 35.6895, lng: 139.6917 },
    { nombre: "Osaka", lat: 34.6937, lng: 135.5023 },
    { nombre: "Kioto", lat: 35.0116, lng: 135.7681 },
    { nombre: "Nara", lat: 34.6851, lng: 135.8048 },
  ];

  lugares.forEach(lugar => {
    new google.maps.Marker({
      position: { lat: lugar.lat, lng: lugar.lng },
      map: mapa,
      title: lugar.nombre,
    });
  });
}
