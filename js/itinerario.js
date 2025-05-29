let mapa;
let coordenadas = [];



document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const dia = parseInt(params.get("dia"), 10);

  fetch("data/itinerarios.json")
    .then(res => res.json())
    .then(data => {
      const info = data[dia];

      if (!info) {
        document.getElementById("contenido-itinerario").innerHTML = "<p>No hay información para este día.</p>";
        return;
      }
      // Iniciar mapa con coordenadas del JSON
        if (info.coordenadas && Array.isArray(info.coordenadas)) {
          coordenadas = info.coordenadas;
          setTimeout(() => inicializarMapa(), 100); // pequeño delay para asegurar que el div existe
        }
      const bloques = [];

      if (info.actividad_dia_completo) {
        bloques.push(`
          <h4>Actividad de Día Completo</h4>
          <p>${info.actividad_dia_completo}</p>
        `);
      } else {
        if (info.desayuno) bloques.push(`<h4>Desayuno</h4><p>${info.desayuno}</p>`);
        if (info.actividad_manana) bloques.push(`<h4>Actividad Mañana</h4><p>${info.actividad_manana}</p>`);
        if (info.comida) bloques.push(`<h4>Comida</h4><p>${info.comida}</p>`);
        if (info.actividad_tarde) bloques.push(`<h4>Actividad Tarde</h4><p>${info.actividad_tarde}</p>`);
        if (info.cena) bloques.push(`<h4>Cena</h4><p>${info.cena}</p>`);
        if (info.actividad_noche) bloques.push(`<h4>Actividad Noche</h4><p>${info.actividad_noche}</p>`);
      }

      const contenido = `
        <div class="contenedor-itinerario">
          <h3>${info.fecha || "Día sin fecha"}</h3>
          ${info.descripcion ? `<p class="descripcion">${info.descripcion}</p>` : ""}
          ${info.coste ? `<p><strong>Coste estimado:</strong> ${info.coste}</p>` : ""}
          <div id="mapa-dia"></div>
          ${bloques.join("")}
          
        </div>
      `;
//${info.imagen ? `<img src="img/${info.imagen}" alt="${info.fecha}" class="imagen-dia">` : ""}

      document.getElementById("contenido-itinerario").innerHTML = contenido;
    })
    .catch(error => {
      console.error("Error al cargar el itinerario:", error);
      document.getElementById("contenido-itinerario").innerHTML = "<p>Error al cargar el itinerario.</p>";
    });
});

function navegar(offset) {
  const params = new URLSearchParams(window.location.search);
  const dia = parseInt(params.get("dia"), 10) + offset;
  if (dia >= 0) {
    window.location.href = `itinerario.html?dia=${dia}`;
  }
}

function inicializarMapa() {
  const mapaElemento = document.getElementById("mapa-dia");
  if (!mapaElemento || coordenadas.length === 0) return;

  const centro = coordenadas[0];

  mapa = new google.maps.Map(mapaElemento, {
    zoom: 13,
    center: { lat: centro.lat, lng: centro.lng },
  });

  const bounds = new google.maps.LatLngBounds();

  coordenadas.forEach((punto, index) => {
    let iconUrl;

    if (index === 0) {
      console.log(index)
      // Primera coordenada: icono de casa
      iconUrl = "../img/casa.png";
    } else {
      switch (punto.tipo) {
        case "friki":
          iconUrl = "../img/friki.png";
          break;
        case "tren":
          iconUrl = "../img/tren.png";
          break;
        case "aeropuerto":
          iconUrl = "../img/avion.png";
          break;
        case "templo":
          iconUrl = "../img/templo.png";
          break;
        default:
          iconUrl = "../img/edificio.png";
      }
    }

    const marker = new google.maps.Marker({
      position: { lat: punto.lat, lng: punto.lng },
      map: mapa,
      title: punto.titulo || "Ubicación",
      icon: {
        url: iconUrl, // tu URL de icono
        scaledSize: new google.maps.Size(30, 30) // muy pequeño
      }
    });

    bounds.extend(marker.getPosition());

    const contentHtml = `
      <div style="max-width:200px">
        <h4>${punto.titulo || "Ubicación"}</h4>
        ${punto.imagen ? `<img src="img/${punto.imagen}" alt="${punto.titulo}" style="width:100%; margin-top:5px;">` : ""}
        ${punto.descripcion ? `<p>${punto.descripcion}</p>` : ""}
      </div>
    `;

    const infowindow = new google.maps.InfoWindow({
      content: contentHtml,
    });

    marker.addListener("click", () => {
      infowindow.open(mapa, marker);
    });
  });

  mapa.fitBounds(bounds);
}