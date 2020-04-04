let data = require("./data");

// Limpiar entrada de datos
data = data.replace("<ul>\n", ""); // Eliminar primer línea
data = data.replace("\n</ul>", ""); // Eliminar última línea
data = data.replace(/  <li data-time="/g, ""); // ELiminar <li data-time=" de todas las líneas
data = data.replace(/<\/li>/g, ""); // ELiminar </li> de todas las líneas

// Divido la entrada por líneas usando el caracter de salto de línea
const list = data.split("\n");

// Declaro contador de segundos totales
let totalSeconds = 0;

// Declaro video a buscar
const searchVideo = "Flexbox Video";

// Convertir minutos a segundos
function minToSec(duration) {
  const [minutes, seconds] = duration.split(":");
  return minutes * 60 + parseInt(seconds);
}

// Recorrer el objeto
list.map((video) => {
  const [duration, name] = video.split('">');
  // Validar si es flexbox
  if (name === searchVideo) {
    const seconds = minToSec(duration);
    // Si --> Aumentar contador
    totalSeconds += seconds;
  }
});

// Mostrar contador
console.log("El total de segundos de " + searchVideo + " es: " + totalSeconds);
