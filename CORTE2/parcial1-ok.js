document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('input[name="tipoMedida"]').forEach(radio => {
        radio.addEventListener('change', () => {
            if (document.getElementById('medidaApotema').checked) {
                document.getElementById('inputApotema').classList.remove('hidden');
                document.getElementById('inputLado').classList.add('hidden');
            } else if (document.getElementById('medidaLado').checked) {
                document.getElementById('inputLado').classList.remove('hidden');
                document.getElementById('inputApotema').classList.add('hidden');
            }
        });
    });
});

// Clase para coordenadas cartesianas
class Cartesiana {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    // Métodos getter y setter
    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }

    // Conversión a coordenadas polares
    aPolar() {
        const r = Math.sqrt(this._x ** 2 + this._y ** 2);
        const theta = Math.atan2(this._y, this._x) * (180 / Math.PI); // En grados
        return new Polar(r, theta);
    }
}

// Clase para coordenadas polares
class Polar {
    constructor(r, theta) {
        this._r = r;
        this._theta = theta;
    }

    // Métodos getter y setter
    get r() {
        return this._r;
    }

    set r(value) {
        this._r = value;
    }

    get theta() {
        return this._theta;
    }

    set theta(value) {
        this._theta = value;
    }

    // Conversión a coordenadas cartesianas
    aCartesiana() {
        const x = this._r * Math.cos(this._theta * (Math.PI / 180));
        const y = this._r * Math.sin(this._theta * (Math.PI / 180));
        return new Cartesiana(x, y);
    }
}

// Función pura para calcular el radio usando el lado
function calcularRadioDesdeLado(lado, numLados) {
    return lado / (2 * Math.sin(Math.PI / numLados));
}

// Función pura para calcular el radio usando el apotema
function calcularRadioDesdeApotema(apotema, numLados) {
    return apotema / Math.cos(Math.PI / numLados);
}

// Función para dibujar el polígono en el canvas
function dibujarPoligono(numLados, apotema, lado, centroX, centroY, tipoMedida) {
    const canvas = document.getElementById('miCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (isNaN(numLados) || numLados < 3) {
        alert('Número de lados debe ser al menos 3.');
        return;
    }

    let radio;
    if (tipoMedida === 'lado') {
        if (isNaN(lado) || lado <= 0) {
            alert('Por favor, ingrese un valor válido para el lado.');
            return;
        }
        radio = calcularRadioDesdeLado(lado, numLados);
    } else if (tipoMedida === 'apotema') {
        if (isNaN(apotema) || apotema <= 0) {
            alert('Por favor, ingrese un valor válido para el apotema.');
            return;
        }
        radio = calcularRadioDesdeApotema(apotema, numLados);
    } else {
        alert('Por favor, seleccione un tipo de medida.');
        return;
    }

    const angulo = 2 * Math.PI / numLados;
    const anguloBaseHorizontal = Math.PI / 2;

    ctx.beginPath();
    let vertices = [];
    for (let i = 0; i < numLados; i++) {
        const x = centroX + radio * Math.cos(i * angulo - anguloBaseHorizontal);
        const y = centroY + radio * Math.sin(i * angulo - anguloBaseHorizontal);
        const vertice = new Cartesiana(x, y); // Crear objeto Cartesiana
        vertices.push(vertice);
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.closePath();
    ctx.stroke();

    mostrarResultados(vertices, numLados);

    if (tipoMedida === 'apotema') {
        dibujarApotema(vertices, centroX, centroY);
    }
}

// Función para mostrar los resultados de los vértices y ángulos internos
function mostrarResultados(vertices, numLados) {
    const coordenadasDiv = document.getElementById('coordenadas');
    coordenadasDiv.innerHTML = '<h3>Coordenadas de los vértices:</h3>';
    
    vertices.forEach((v, i) => {
        const x = v.x.toFixed(2);
        const y = v.y.toFixed(2);
        const polar = v.aPolar(); // Conversión a coordenadas polares

        coordenadasDiv.innerHTML += `<p>Vértice ${i + 1}: (x: ${x}, y: ${y}) | Polar: (r: ${polar.r.toFixed(2)}, θ: ${polar.theta.toFixed(2)}°)</p>`;
    });

    const anguloInterno = (numLados - 2) * 180 / numLados;
    document.getElementById('anguloInterno').innerHTML = `Ángulo interno de cada vértice: ${anguloInterno.toFixed(2)}°`;
}

// Función para dibujar las líneas del apotema desde el centro a los puntos medios de los lados
function dibujarApotema(vertices, centroX, centroY) {
    const canvas = document.getElementById('miCanvas');
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;

    for (let i = 0; i < vertices.length; i++) {
        const x1 = vertices[i].x;
        const y1 = vertices[i].y;
        const x2 = vertices[(i + 1) % vertices.length].x;
        const y2 = vertices[(i + 1) % vertices.length].y;
        const xMedio = (x1 + x2) / 2;
        const yMedio = (y1 + y2) / 2;

        ctx.beginPath();
        ctx.moveTo(centroX, centroY);
        ctx.lineTo(xMedio, yMedio);
        ctx.stroke();
    }
}

// Función para limpiar el canvas y los resultados
function limpiarCanvas() {
    const canvas = document.getElementById('miCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    document.getElementById('coordenadas').innerHTML = '';
    document.getElementById('anguloInterno').innerHTML = '';
}

// Función para obtener los valores de los campos y llamar a dibujarPoligono
function ejecutarDibujo() {
    const numLados = parseInt(document.getElementById('numLados').value);
    const apotema = parseFloat(document.getElementById('apotema').value);
    const lado = parseFloat(document.getElementById('lado').value);
    const centroX = parseFloat(document.getElementById('centroX').value) || 250; // Default to center of canvas
    const centroY = parseFloat(document.getElementById('centroY').value) || 250; // Default to center of canvas
    const tipoMedida = document.querySelector('input[name="tipoMedida"]:checked')?.value;

    dibujarPoligono(numLados, apotema, lado, centroX, centroY, tipoMedida);
}
