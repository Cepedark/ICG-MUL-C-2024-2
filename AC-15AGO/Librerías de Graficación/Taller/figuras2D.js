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

// Mostrar los datos correspondientes según la figura seleccionada
document.getElementById('figura').addEventListener('change', () => {
  const figura = document.getElementById('figura').value;
  document.getElementById('datosCuadradoRectangulo').classList.add('hidden');
  document.getElementById('datosTriangulo').classList.add('hidden');
  document.getElementById('datosCirculo').classList.add('hidden');
  document.getElementById('datosPoligono').classList.add('hidden');

  if (figura === 'cuadrado' || figura === 'rectangulo') {
    document.getElementById('datosCuadradoRectangulo').classList.remove('hidden');
  } else if (figura === 'triangulo') {
    document.getElementById('datosTriangulo').classList.remove('hidden');
  } else if (figura === 'circulo') {
    document.getElementById('datosCirculo').classList.remove('hidden');
  } else if (figura === 'poligono') {
    document.getElementById('datosPoligono').classList.remove('hidden');
  }
});

// Dibujar la figura seleccionada
document.getElementById('dibujar').addEventListener('click', () => {
  const figura = document.getElementById('figura').value;
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = colorBordeSeleccionado;
  ctx.fillStyle = colorInteriorSeleccionado;

  switch (figura) {
    case 'cuadrado':
      dibujarRectangulo(ctx, parseFloat(document.getElementById('coord1').value), parseFloat(document.getElementById('coord2').value), 100, 100);
      break;
    case 'rectangulo':
      dibujarRectangulo(ctx, parseFloat(document.getElementById('coord1').value), parseFloat(document.getElementById('coord2').value), 150, 100);
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
});

// Función para dibujar un rectángulo o cuadrado
function dibujarRectangulo(ctx, x, y, width, height) {
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.stroke();
  ctx.fill();
}

// Función para dibujar un triángulo
function dibujarTriangulo(ctx, x1, y1, x2, y2, x3, y3) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}

// Función para dibujar un círculo
function dibujarCirculo(ctx, x, y, radio) {
  ctx.beginPath();
  ctx.arc(x, y, radio, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fill();
}

// Función para dibujar un polígono regular
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

