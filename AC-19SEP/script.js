class SVGCanvas {
    constructor(svgId) {
        this.svg = document.getElementById(svgId);
    }

    // Método para crear un elemento SVG
    createElement(tagName, attributes) {
        const element = document.createElementNS("http://www.w3.org/2000/svg", tagName);
        for (let attr in attributes) {
            element.setAttribute(attr, attributes[attr]);
        }
        this.svg.appendChild(element);
        return element;
    }
}

class Line {
    constructor(svgCanvas, x1, y1, x2, y2) {
        this.svgCanvas = svgCanvas;
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    draw() {
        this.svgCanvas.createElement("line", {
            x1: this.x1, y1: this.y1, x2: this.x2, y2: this.y2,
            stroke: "black", "stroke-width": 1
        });
    }
}

class Circumference {
    constructor(svgCanvas, cx, cy, r) {
        this.svgCanvas = svgCanvas;
        this.cx = cx;
        this.cy = cy;
        this.r = r;
    }

    draw() {
        this.svgCanvas.createElement("circle", {
            cx: this.cx, cy: this.cy, r: this.r,
            stroke: "black", "stroke-width": 1, fill: "none"
        });
    }
}

class Ellipse {
    constructor(svgCanvas, cx, cy, rx, ry) {
        this.svgCanvas = svgCanvas;
        this.cx = cx;
        this.cy = cy;
        this.rx = rx;
        this.ry = ry;
    }

    draw() {
        this.svgCanvas.createElement("ellipse", {
            cx: this.cx, cy: this.cy, rx: this.rx, ry: this.ry,
            stroke: "black", "stroke-width": 1, fill: "none"
        });
    }
}

// Instancia del SVG canvas
const mySVGCanvas = new SVGCanvas('svgCanvas');

// Crear y dibujar las primitivas
const line = new Line(mySVGCanvas, 50, 50, 200, 200);
line.draw();

const circle = new Circumference(mySVGCanvas, 300, 100, 50);
circle.draw();

const ellipse = new Ellipse(mySVGCanvas, 400, 300, 80, 50);
ellipse.draw();
