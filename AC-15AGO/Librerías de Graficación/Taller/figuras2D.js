let colorBordeSeleccionado = 'black';
let colorInteriorSeleccionado = 'black';

// Manejo de colores
document.getElementById('colorBorde').addEventListener('click', (e) => {
  if (e.target.classList.contains('color-button')) {
    colorBordeSeleccionado = e.target.getAttribute('data-color');
  }
});

document.getElementById('colorInterior').addEventListener('click', (e) => {
  if (e.target.classList.contains('color-button')) {
    colorInteriorSeleccionado = e.target.getAttribute('data-color');
  }
});

// Mostrar los datos correspondientes según la figura y tipo de coordenadas seleccionados
document.getElementById('figura').addEventListener('change', mostrarCampos);
document.getElementById('coordenadas').addEventListener('change', mostrarCampos);

function mostrarCampos() {
  const figura = document.getElementById('figura').value;
  const coordenadas = document.getElementById('coordenadas').value;

  // Ocultar todos los campos primero
  document.getElementById('datosCuadradoRectangulo').classList.add('hidden');
  document.getElementById('datosTriangulo').classList.add('hidden');
  document.getElementById('datosCirculo').classList.add('hidden');
  document.getElementById('datosPoligono').classList.add('hidden');
  document.getElementById('datosPolaresCuadradoRectangulo').classList.add('hidden');
  document.getElementById('datosPolaresTriangulo').classList.add('hidden');
  document.getElementById('datosPolaresCirculo').classList.add('hidden');
  document.getElementById('datosPolaresPoligono').classList.add('hidden');

  if (coordenadas === 'cartesianas') {
    if (figura === 'cuadrado' || figura === 'rectangulo') {
      document.getElementById('datosCuadradoRectangulo').classList.remove('hidden');
    } else if (figura === 'triangulo') {
      document.getElementById('datosTriangulo').classList.remove('hidden');
    } else if (figura === 'circulo') {
      document.getElementById('datosCirculo').classList.remove('hidden');
    } else if (figura === 'poligono') {
      document.getElementById('datosPoligono').classList.remove('hidden');
    }
  } else if (coordenadas === 'polares') {
    if (figura === 'cuadrado' || figura === 'rectangulo') {
      document.getElementById('datosPolaresCuadradoRectangulo').classList.remove('hidden');
    } else if (figura === 'triangulo') {
      document.getElementById('datosPolaresTriangulo').classList.remove('hidden');
    } else if (figura === 'circulo') {
      document.getElementById('datosPolaresCirculo').classList.remove('hidden');
    } else if (figura === 'poligono') {
      document.getElementById('datosPolaresPoligono').classList.remove('hidden');
    }
  }
}

document.getElementById('dibujar').addEventListener('click', function () {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar canvas

  const figura = document.getElementById('figura').value;
  const coordenadas = document.getElementById('coordenadas').value;

  ctx.strokeStyle = colorBordeSeleccionado;
  ctx.fillStyle = colorInteriorSeleccionado;

  if (coordenadas === 'cartesianas') {
    dibujarEnCartesianas(ctx, figura);
  } else if (coordenadas === 'polares') {
    dibujarEnPolares(ctx, figura);
  }
});

function dibujarEnCartesianas(ctx, figura) {
  if (figura === 'cuadrado' || figura === 'rectangulo') {
    const x = parseFloat(document.getElementById('coord1').value);
    const y = parseFloat(document.getElementById('coord2').value);
    const ancho = 100;  // Define un valor fijo para el ancho y alto si no hay input
    const alto = 100;
    dibujarRectangulo(ctx, x, y, ancho, alto);
  } else if (figura === 'triangulo') {
    const x1 = parseFloat(document.getElementById('triX1').value);
    const y1 = parseFloat(document.getElementById('triY1').value);
    const x2 = parseFloat(document.getElementById('triX2').value);
    const y2 = parseFloat(document.getElementById('triY2').value);
    const x3 = parseFloat(document.getElementById('triX3').value);
    const y3 = parseFloat(document.getElementById('triY3').value);
    dibujarTriangulo(ctx, x1, y1, x2, y2, x3, y3);
  } else if (figura === 'circulo') {
    const x = parseFloat(document.getElementById('centroX').value);
    const y = parseFloat(document.getElementById('centroY').value);
    const radio = parseFloat(document.getElementById('radio').value);
    dibujarCirculo(ctx, x, y, radio);
  } else if (figura === 'poligono') {
    const x = parseFloat(document.getElementById('centroPoligonoX').value);
    const y = parseFloat(document.getElementById('centroPoligonoY').value);
    const lados = parseInt(document.getElementById('lados').value);
    const longitudLado = parseFloat(document.getElementById('longitudLado').value);
    dibujarPoligono(ctx, x, y, lados, longitudLado);
  }
}

function dibujarEnPolares(ctx, figura) {
  if (figura === 'cuadrado' || figura === 'rectangulo') {
    const r = parseFloat(document.getElementById('radioPolar1').value);
    const angulo = parseFloat(document.getElementById('anguloPolar1').value);
    const { x, y } = convertirPolaresACartesianas(r, angulo);
    const ancho = 100;  // Define un valor fijo para el ancho y alto si no hay input
    const alto = 100;
    dibujarRectangulo(ctx, x, y, ancho, alto);
  } else if (figura === 'triangulo') {
    const r1 = parseFloat(document.getElementById('radioPolar1').value);
    const angulo1 = parseFloat(document.getElementById('anguloPolar1').value);
    const r2 = parseFloat(document.getElementById('radioPolar2').value);
    const angulo2 = parseFloat(document.getElementById('anguloPolar2').value);
    const r3 = parseFloat(document.getElementById('radioPolar3').value);
    const angulo3 = parseFloat(document.getElementById('anguloPolar3').value);

    const { x: x1, y: y1 } = convertirPolaresACartesianas(r1, angulo1);
    const { x: x2, y: y2 } = convertirPolaresACartesianas(r2, angulo2);
    const { x: x3, y: y3 } = convertirPolaresACartesianas(r3, angulo3);

    dibujarTriangulo(ctx, x1, y1, x2, y2, x3, y3);
  } else if (figura === 'circulo') {
    const r = parseFloat(document.getElementById('radioPolarCentro').value);
    const angulo = parseFloat(document.getElementById('anguloPolarCentro').value);
    const { x, y } = convertirPolaresACartesianas(r, angulo);
    const radio = parseFloat(document.getElementById('radioCirculo').value);
    dibujarCirculo(ctx, x, y, radio);
  } else if (figura === 'poligono') {
    const r = parseFloat(document.getElementById('radioPolarCentroPoligono').value);
    const angulo = parseFloat(document.getElementById('anguloPolarCentroPoligono').value);
    const { x, y } = convertirPolaresACartesianas(r, angulo);
    const lados = parseInt(document.getElementById('ladosPoligono').value);
    const longitudLado = parseFloat(document.getElementById('longitudLadoPoligono').value);
    dibujarPoligono(ctx, x, y, lados, longitudLado);
  }
}

function convertirPolaresACartesianas(r, angulo) {
  const radianes = (angulo * Math.PI) / 180;
  const x = r * Math.cos(radianes);
  const y = r * Math.sin(radianes);
  return { x, y };
}

function dibujarRectangulo(ctx, x, y, ancho, alto) {
  ctx.beginPath();
  ctx.rect(x, y, ancho, alto);
  ctx.fill();
  ctx.stroke();
}

function dibujarTriangulo(ctx, x1, y1, x2, y2, x3, y3) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function dibujarCirculo(ctx, x, y, radio) {
  ctx.beginPath();
  ctx.arc(x, y, radio, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.stroke();
}

function dibujarPoligono(ctx, x, y, lados, longitudLado) {
  const angulo = (2 * Math.PI) / lados;
  ctx.beginPath();
  for (let i = 0; i < lados; i++) {
    const xOffset = longitudLado * Math.cos(i * angulo);
    const yOffset = longitudLado * Math.sin(i * angulo);
    if (i === 0) {
      ctx.moveTo(x + xOffset, y + yOffset);
    } else {
      ctx.lineTo(x + xOffset, y + yOffset);
    }
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}
// Reiniciar canvas
document.getElementById('reiniciar').addEventListener('click', () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});


