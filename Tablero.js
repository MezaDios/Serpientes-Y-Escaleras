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

        let contador = this.totalCasillas

        let reversa = true

        for (let y = 0; y < this.filas; y++) {
            if (this.columnas % 2 == 0) {
                color = !color
            }

            reversa = !reversa

            if (y % 2 == 0 && y != 0) {
                contador--
                contador -= this.columnas
                console.log("par")
            }

            if (reversa) {
                contador -= this.columnas
                contador++
            }

            console.log(this.columnas)
            console.log('-------------------')

            for (let x = 0; x < this.columnas; x++) {
                if (color) {
                    context.fillStyle = "rgb(240,156,103)"
                    color = !color
                }
                else {
                    context.fillStyle = "rgb(92,160,211)"
                    color = !color
                }

                if (contador == 1) {
                    context.fillStyle = "rgb(0,189,86)"
                }
                if (contador == this.totalCasillas) {
                    context.fillStyle = "rgb(145,53,53)"
                }

                //context.fillRect(x,y,w,h)
                context.fillRect(x * ancho, y * alto, ancho, alto)

                context.font = "30px Arial black"
                context.fillStyle = "rgb(233,238,201)"
                context.textAlign = "center"

                //context.fillText(text, x, y)
                context.fillText(`${contador}`, (x * ancho) + (ancho / 2), (y * alto) + (alto / 2))

                if ((contador) % this.columnas == 0) {
                    let flecha = ""
                    if (reversa) {
                        flecha = "←"
                    }
                    else {
                        flecha = "→"
                    }
                    context.font = "24px Arial black"
                    context.fillText(flecha, x * ancho + ancho / 2, y * alto)
                }

                if (reversa) {
                    contador++
                }
                else {
                    contador--
                }
            }
        }
    }

}

export default Tablero