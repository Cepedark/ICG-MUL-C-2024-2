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
  document.getElementById('datosPolares').classList.add('hidden');

  // Mostrar campos según el sistema de coordenadas
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
    document.getElementById('datosPolares').classList.remove('hidden');
  }
}

// Función para convertir coordenadas polares a cartesianas
function convertirPolaresACartesianas(r, anguloGrados) {
  const anguloRadianes = (anguloGrados * Math.PI) / 180;
  const x = r * Math.cos(anguloRadianes);
  const y = r * Math.sin(anguloRadianes);
  return { x, y };
}

// Dibujar las figuras
document.getElementById('dibujar').addEventListener('click', () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.strokeStyle = colorBordeSeleccionado;
  ctx.fillStyle = colorInteriorSeleccionado;

  const coordenadas = document.getElementById('coordenadas').value;
  const figura = document.getElementById('figura').value;

  if (coordenadas === 'polares') {
    const r = parseFloat(document.getElementById('radioPolar').value);
    const angulo = parseFloat(document.getElementById('anguloPolar').value);
    const { x, y } = convertirPolaresACartesianas(r, angulo);
    dibujarFigura(figura, ctx, x, y);
  } else {
    dibujarFigura(figura, ctx);
  }
});

function dibujarFigura(figura, ctx, x = 0, y = 0) {
  switch (figura) {
    case 'cuadrado':
    case 'rectangulo':
      dibujarRectangulo(ctx, parseFloat(document.getElementById('coord1').value), parseFloat(document.getElementById('coord2').value), 100, 50);
      break;
    case 'triangulo':
      dibujarTriangulo(ctx, parseFloat(document.getElementById('triX1').value), parseFloat(document.getElementById('triY1').value), parseFloat(document.getElementById('triX2').value), parseFloat(document.getElementById('triY2').value), parseFloat(document.getElementById('triX3').value), parseFloat(document.getElementById('triY3').value));
      break;
    case 'circulo':
      dibujarCirculo(ctx, parseFloat(document.getElementById('centroX').value), parseFloat(document.getElementById('centroY').value), parseFloat(document.getElementById('radio').value));
      break;
    case 'poligono':
      dibujarPoligono(ctx, parseFloat(document.getElementById('centroPoligonoX').value), parseFloat(document.getElementById('centroPoligonoY').value), parseInt(document.getElementById('lados').value), parseFloat(document.getElementById('longitudLado').value));
      break;
  }
}

// Funciones para dibujar cada figura
function dibujarRectangulo(ctx, x, y, width, height) {
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.stroke();
  ctx.fill();
}

function dibujarTriangulo(ctx, x1, y1, x2, y2, x3, y3) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}

function dibujarCirculo(ctx, x, y, radio) {
  ctx.beginPath();
  ctx.arc(x, y, radio, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fill();
}

function dibujarPoligono(ctx, x, y, lados, longitud) {
  const angulo = (2 * Math.PI) / lados;
  ctx.beginPath();
  for (let i = 0; i < lados; i++) {
    const xCoord = x + longitud * Math.cos(i * angulo);
    const yCoord = y + longitud * Math.sin(i * angulo);
    if (i === 0) {
      ctx.moveTo(xCoord, yCoord);
    } else {
      ctx.lineTo(xCoord, yCoord);
    }
  }
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}

// Reiniciar canvas
document.getElementById('reiniciar').addEventListener('click', () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
