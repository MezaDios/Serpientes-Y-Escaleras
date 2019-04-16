import Casilla from "./Casilla.js";

class Tablero {

    constructor(columnas, filas) {
        this.columnas = columnas
        this.filas = filas
        this.totalCasillas = columnas * filas
        this.casillas = []

        for (let i = 1; i <= this.totalCasillas; i++) {
            let casilla = new Casilla(i)
            this.casillas.push(casilla)
        }

    }

    get TotalCasillas() {
        return this.totalCasillas
    }

    get Casillas() {
        return this.casillas
    }

    agregarCasilla(casilla) {
        this.casillas.push(casilla)
    }

    getCasilla(numeroCasilla) {

        return this.casillas[numeroCasilla - 1]

    }

    imprimir(canvas) {
        let context = canvas.getContext('2d')

        context.font = "12px Arial"

        let ancho = canvas.width / this.columnas
        let alto = canvas.height / this.filas

        let color = true

        for (let i = 0; i < this.columnas; i++) {
            color = !color
            for (let j = 0; j < this.filas; j++) {
                if (color) {
                    context.fillStyle = "rgb(255, 255, 255)"
                    color = !color
                }
                else {
                    context.fillStyle = "rgb(150, 150, 150)"
                    color = !color
                }

                context.fillRect(i * ancho, j * alto, ancho, alto)
            }
        }
    }

}

export default Tablero