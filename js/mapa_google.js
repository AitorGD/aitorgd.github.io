let mapa;
let coordenadas = [];

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  setTimeout(() => inicializarMapa(), 100); // pequeño delay para asegurar que el div existe

  fetch("data/itinerarios.json")
    .then(res => res.json())
    .then(data => {
      const todosLosPuntos = [];

      data.forEach(dia => {
        if (Array.isArray(dia.coordenadas)) {
          dia.coordenadas.forEach(punto => todosLosPuntos.push(punto));
        }
      });
    
      coordenadas=todosLosPuntos
      console.log(coordenadas.length)
    })
    .catch(error => {
      console.error("Error cargando coordenadas:", error);
      document.getElementById("map").innerHTML = "<p>Error cargando el mapa.</p>";
    });
});

function inicializarMapa() {
  const mapaElemento = document.getElementById("map");
  console.log(coordenadas.length+"hola")
  if (!mapaElemento || coordenadas.length === 0){
    return;
  } 
  
  mapa = new google.maps.Map(mapaElemento, {
    zoom: 5,
    center: { lat: coordenadas[0].lat, lng: coordenadas[0].lng },
  });

  const bounds = new google.maps.LatLngBounds();

  coordenadas.forEach((punto, index) => {
    const iconUrl = obtenerIconoPorTipo(punto.tipo);

    const marker = new google.maps.Marker({
      position: { lat: punto.lat, lng: punto.lng },
      map: mapa,
      title: punto.titulo || "Ubicación",
      icon: {
        url: iconUrl,
        scaledSize: new google.maps.Size(18, 18), // ajusta el tamaño según necesites
      }
    });

    const infowindow = new google.maps.InfoWindow({
      content: `<strong>${punto.titulo}</strong>`,
    });

    marker.addListener("click", () => {
      infowindow.open(mapa, marker);
    });

    bounds.extend(marker.getPosition());
  });

  mapa.fitBounds(bounds);
}

function obtenerIconoPorTipo(tipo) {
  switch (tipo) {
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
      return iconUrl;
}
