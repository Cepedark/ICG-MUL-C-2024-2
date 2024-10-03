class Punto {
    #x; // Propiedad privada
    #y; // Propiedad privada

    constructor(x, y) {
        this.#x = x; // Usar la propiedad privada
        this.#y = y; // Usar la propiedad privada
    }

    get x() {
        return this.#x; // Acceso a la propiedad privada
    }

    get y() {
        return this.#y; // Acceso a la propiedad privada
    }
}

class Poligono {
    #puntos; // Propiedad privada

    constructor(puntos) {
        this.#puntos = puntos; // Usar la propiedad privada
    }

    // Método privado para ordenar puntos en sentido antihorario
    #ordenarPuntos() {
        const centroideX = calcularCentroideX(this.#puntos);
        const centroideY = calcularCentroideY(this.#puntos);

        this.#puntos.sort((a, b) => {
            const anguloA = Math.atan2(a.y - centroideY, a.x - centroideX);
            const anguloB = Math.atan2(b.y - centroideY, b.x - centroideX);
            return anguloA - anguloB; // Ordenar en sentido antihorario
        });
    }

    #esConvexo() { // Método privado
        const n = this.#puntos.length;
        let signos = [];
        for (let i = 0; i < n; i++) {
            const dx1 = this.#puntos[(i + 1) % n].x - this.#puntos[i].x;
            const dy1 = this.#puntos[(i + 1) % n].y - this.#puntos[i].y;
            const dx2 = this.#puntos[(i + 2) % n].x - this.#puntos[(i + 1) % n].x;
            const dy2 = this.#puntos[(i + 2) % n].y - this.#puntos[(i + 1) % n].y;
            const cruz = dx1 * dy2 - dy1 * dx2;
            signos.push(Math.sign(cruz));
        }
        return signos.every(s => s >= 0) || signos.every(s => s <= 0);
    }

    tipoPoligono() {
        this.#ordenarPuntos(); // Ordenar antes de determinar el tipo
        return this.#esConvexo() ? "Convexo" : "Cóncavo";
    }

    // Dibujar en formato vectorizado
    dibujar(svgElement) {
        this.#ordenarPuntos(); // Asegurarse de que los puntos estén ordenados
        while (svgElement.firstChild) {
            svgElement.removeChild(svgElement.firstChild);
        }

        let poligonoSVG = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        let puntosString = this.#puntos.map(punto => `${punto.x},${punto.y}`).join(" ");
        poligonoSVG.setAttribute("points", puntosString);
        poligonoSVG.setAttribute("stroke", "red");
        poligonoSVG.setAttribute("fill", "none");
        poligonoSVG.setAttribute("stroke-width", "2");

        svgElement.appendChild(poligonoSVG);
    }
}

// Funciones personalizadas

function calcularCentroideX(puntos) {
    return puntos.reduce((suma, punto) => suma + punto.x, 0) / puntos.length;
}

function calcularCentroideY(puntos) {
    return puntos.reduce((suma, punto) => suma + punto.y, 0) / puntos.length;
}

// Función para generar un punto aleatorio dentro del SVG
function generarPuntoAleatorio(ancho, alto) {
    return new Punto(
        Math.floor(Math.random() * ancho),
        Math.floor(Math.random() * alto)
    );
}

// Función para generar un polígono aleatorio con n vértices
function generarPoligonoAleatorio(n, ancho, alto) {
    let puntos = [];
    for (let i = 0; i < n; i++) {
        puntos.push(generarPuntoAleatorio(ancho, alto));
    }
    const poligono = new Poligono(puntos);
    return poligono;
}

// Obtener el elemento SVG
const svgElement = document.getElementById('svg');

// Función para generar y dibujar un nuevo polígono
function generarNuevoPoligono() {
    const numVertices = Math.floor(Math.random() * 8) + 3; // Entre 3 y 10
    const poligono = generarPoligonoAleatorio(numVertices, svgElement.clientWidth, svgElement.clientHeight);

    // Dibujar el polígono en SVG
    poligono.dibujar(svgElement);

    // Mostrar si el polígono es cóncavo o convexo
    document.getElementById('tipoPoligono').innerText = `El polígono es: ${poligono.tipoPoligono()}`;
}

// Generar un primer polígono al cargar la página
document.addEventListener('DOMContentLoaded', generarNuevoPoligono);
