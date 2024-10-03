class SVGCanvas {
    constructor(svgId) {
        this.svg = document.getElementById(svgId);
    }

    createElement(tagName, attributes) {
        const element = document.createElementNS("http://www.w3.org/2000/svg", tagName);
        for (let attr in attributes) {
            element.setAttribute(attr, attributes[attr]);
        }
        this.svg.appendChild(element);
        return element;
    }
}

class Punto {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    getX() {
        return this.#x;
    }

    getY() {
        return this.#y;
    }

    draw(svgCanvas) {
        svgCanvas.createElement("circle", {
            cx: this.#x, cy: this.#y, r: 2,
            fill: "black"
        });
    }
}

class Linea {
    #punto1;
    #punto2;
    #svgCanvas;

    constructor(svgCanvas, punto1, punto2) {
        this.#svgCanvas = svgCanvas;
        this.#punto1 = punto1;
        this.#punto2 = punto2;
    }

    // Algoritmo de Bresenham para dibujar la línea
    draw() {
        let x1 = this.#punto1.getX();
        let y1 = this.#punto1.getY();
        let x2 = this.#punto2.getX();
        let y2 = this.#punto2.getY();

        let dx = Math.abs(x2 - x1);
        let dy = Math.abs(y2 - y1);
        let sx = (x1 < x2) ? 1 : -1;
        let sy = (y1 < y2) ? 1 : -1;
        let err = dx - dy;

        while (true) {
            // Dibuja un punto en cada posición calculada por Bresenham
            this.#svgCanvas.createElement("circle", {
                cx: x1, cy: y1, r: 1, fill: "black"
            });

            if (x1 === x2 && y1 === y2) break;
            let e2 = 2 * err;
            if (e2 > -dy) {
                err -= dy;
                x1 += sx;
            }
            if (e2 < dx) {
                err += dx;
                y1 += sy;
            }
        }
    }
}

class Circunferencia {
    #centro;
    #radio;
    #svgCanvas;

    constructor(svgCanvas, centro, radio) {
        this.#svgCanvas = svgCanvas;
        this.#centro = centro;
        this.#radio = radio;
    }

    draw() {
        this.#svgCanvas.createElement("circle", {
            cx: this.#centro.getX(), cy: this.#centro.getY(), r: this.#radio,
            stroke: "black", "stroke-width": 1, fill: "none"
        });
    }
}

class Elipse {
    #centro;
    #rx;
    #ry;
    #svgCanvas;

    constructor(svgCanvas, centro, rx, ry) {
        this.#svgCanvas = svgCanvas;
        this.#centro = centro;
        this.#rx = rx;
        this.#ry = ry;
    }

    draw() {
        this.#svgCanvas.createElement("ellipse", {
            cx: this.#centro.getX(), cy: this.#centro.getY(),
            rx: this.#rx, ry: this.#ry,
            stroke: "black", "stroke-width": 1, fill: "none"
        });
    }
}

// Instancia del SVG canvas
const mySVGCanvas = new SVGCanvas('svgCanvas');

// Crear y dibujar las primitivas usando objetos Punto
const punto1 = new Punto(50, 50);
const punto2 = new Punto(200, 200);
const linea = new Linea(mySVGCanvas, punto1, punto2);
linea.draw();

const centroCirculo = new Punto(300, 100);
const circulo = new Circunferencia(mySVGCanvas, centroCirculo, 50);
circulo.draw();

const centroElipse = new Punto(400, 300);
const elipse = new Elipse(mySVGCanvas, centroElipse, 80, 50);
elipse.draw();

punto1.draw(mySVGCanvas);
punto2.draw(mySVGCanvas);
