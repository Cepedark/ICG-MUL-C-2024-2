class Punto {
    #x; // Propiedad privada
    #y; // Propiedad privada

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }
}

class Poligono {
    #puntos; // Propiedad privada

    constructor(puntos) {
        this.#puntos = this.ordenarPuntos(puntos); // Usar la propiedad privada
    }

    // Método para calcular el centroide
    calcularCentroide(puntos) {
        const sumaX = puntos.reduce((acc, punto) => acc + punto.x, 0);
        const sumaY = puntos.reduce((acc, punto) => acc + punto.y, 0);
        const n = puntos.length;
        return new Punto(sumaX / n, sumaY / n);
    }

    // Método para ordenar puntos en sentido antihorario
    ordenarPuntos(puntos) {
        const centroide = this.calcularCentroide(puntos);
        return puntos.sort((a, b) => {
            const anguloA = Math.atan2(a.y - centroide.y, a.x - centroide.x);
            const anguloB = Math.atan2(b.y - centroide.y, b.x - centroide.x);
            return anguloA - anguloB; // Ordenar de menor a mayor (sentido antihorario)
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
        return this.#esConvexo() ? "Convexo" : "Cóncavo";
    }

    dibujar(context) {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Limpiar el canvas
        context.beginPath();
        context.moveTo(this.#puntos[0].x, this.#puntos[0].y);
        for (let i = 1; i < this.#puntos.length; i++) {
            context.lineTo(this.#puntos[i].x, this.#puntos[i].y);
        }
        context.closePath();
        context.strokeStyle = 'red';
        context.lineWidth = 2;
        context.stroke();
    }
}

// Función para generar un punto aleatorio dentro del canvas
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
    return new Poligono(puntos);
}

// Inicializar el canvas y contexto
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// Función para generar y dibujar un nuevo polígono
function generarNuevoPoligono() {
    // Generar un polígono aleatorio con entre 3 y 10 vértices
    const numVertices = Math.floor(Math.random() * 8) + 3; // Entre 3 y 10
    const poligono = generarPoligonoAleatorio(numVertices, canvas.width, canvas.height);

    // Dibujar el polígono
    poligono.dibujar(context);

    // Mostrar si el polígono es cóncavo o convexo
    document.getElementById('tipoPoligono').innerText = `El polígono es: ${poligono.tipoPoligono()}`;
}

// Generar un primer polígono al cargar la página
document.addEventListener('DOMContentLoaded', generarNuevoPoligono);
