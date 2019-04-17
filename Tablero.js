import Casilla from "./Casilla.js";
import Serpiente from "./Serpiente.js"
import Escalera from "./Escalera.js"

class Tablero {

    constructor(columnas, filas) {
        this.columnas = columnas
        this.filas = filas
        this.totalCasillas = columnas * filas
        this.casillas = []
        this.casillasOcupadas = []
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

    generarCasillas() {
        for (let i = 1; i <= this.totalCasillas; i++) {
            let casilla = new Casilla(i)
            this.casillas.push(casilla)
        }
    }

    posicionCasilla(numeroCasilla, canvas) {
        let ancho = canvas.width / this.columnas
        let alto = canvas.height / this.filas

        let contador = this.totalCasillas

        let reversa = true

        for (let y = 0; y < this.filas; y++) {

            reversa = !reversa

            if (y % 2 == 0 && y != 0) {
                contador--
                contador -= this.columnas
            }

            if (reversa) {
                contador -= this.columnas
                contador++
            }

            for (let x = 0; x < this.columnas; x++) {

                if (contador == numeroCasilla) {
                    return {
                        'x': x * ancho + ancho / 2,
                        'y': y * alto + alto / 2
                    }
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

    imprimirSerpiente(serpiente, context, canvas) {
        context.beginPath()
        let inicio = this.posicionCasilla(serpiente.Inicio, canvas)
        let final = this.posicionCasilla(serpiente.Final, canvas)

        //moveTo(x, y) - defines the starting point of the line
        //lineTo(x, y) - defines the ending point of the line

        context.moveTo(inicio.x, inicio.y)
        context.lineTo(final.x, final.y)
        context.strokeStyle = "rgba(145,53,53,0.5)"
        context.lineWidth = "5"
        context.stroke()
        context.closePath()
    }

    imprimirEscalera(escalera, context, canvas) {
        context.beginPath()
        let inicio = this.posicionCasilla(escalera.Inicio, canvas)
        let final = this.posicionCasilla(escalera.Final, canvas)

        //moveTo(x, y) - defines the starting point of the line
        //lineTo(x, y) - defines the ending point of the line

        context.moveTo(inicio.x, inicio.y)
        context.lineTo(final.x, final.y)
        context.strokeStyle = "rgba(0,189,86,0.5)"
        context.lineWidth = "5"
        context.stroke()
        context.closePath()
    }

    generarSerpientes(context, canvas) {
        for (let i = 1; i <= this.filas / 2; i++) {
            let inicio = Math.floor(Math.random() * (this.totalCasillas + 1 - 1)) + 1
            let final = Math.floor(Math.random() * (this.totalCasillas + 1 - 1)) + 1

            if (inicio < final || inicio == 1 || inicio == this.totalCasillas
                || final == this.totalCasillas || final == 1) {
                i--
            }
            else {
                if (this.casillasOcupadas.includes(inicio) || this.casillasOcupadas.includes(final)
                    || Math.abs(inicio - final) < this.columnas) {
                    i--
                }
                else {
                    this.casillasOcupadas.push(inicio)
                    this.casillasOcupadas.push(final)
                    let serpiente = new Serpiente(inicio, final)
                    this.getCasilla(inicio).Serpiente = serpiente

                    this.imprimirSerpiente(serpiente, context, canvas)

                }
            }
        }
    }

    generarEscaleras(context, canvas) {
        for (let i = 1; i <= this.filas / 2; i++) {
            let inicio = Math.floor(Math.random() * (this.totalCasillas + 1 - 1)) + 1
            let final = Math.floor(Math.random() * (this.totalCasillas + 1 - 1)) + 1

            if (inicio > final || inicio == 1 || inicio == this.totalCasillas
                || final == this.totalCasillas || final == 1) {
                i--
            }
            else {
                if (this.casillasOcupadas.includes(inicio) || this.casillasOcupadas.includes(final)
                    || Math.abs(inicio - final) < this.columnas) {
                    i--
                }
                else {
                    this.casillasOcupadas.push(inicio)
                    this.casillasOcupadas.push(final)
                    let escalera = new Escalera(inicio, final)
                    this.getCasilla(inicio).Escalera = escalera

                    this.imprimirEscalera(escalera, context, canvas)

                }
            }
        }
    }

    imprimirTablero(context, canvas) {
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
            }

            if (reversa) {
                contador -= this.columnas
                contador++
            }

            for (let x = 0; x < this.columnas; x++) {
                context.beginPath()
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
                context.closePath()
                context.beginPath()
                context.font = "2vw Arial black"
                context.fillStyle = "white"
                context.textAlign = "center"

                //context.fillText(text, x, y)
                context.fillText(`${contador}`, (x * ancho) + (ancho / 2), (y * alto) + (alto / 1.7))

                if ((contador) % this.columnas == 0 || contador == 1) {

                    let flecha = ""
                    if (reversa) {
                        flecha = "←"
                    }
                    else {
                        flecha = "→"
                    }
                    context.font = "2vw Arial black"
                    if (contador == 1) {
                        if (reversa) {
                            context.fillText("→", x * ancho + ancho / 2, y * alto + alto)
                        }
                        else {
                            context.fillText("←", x * ancho + ancho / 2, y * alto + alto)
                        }
                    }
                    else {
                        context.fillText(flecha, x * ancho + ancho / 2, y * alto)
                    }
                }
                context.closePath()
                if (reversa) {
                    contador++
                }
                else {
                    contador--
                }
            }
        }
    }

    imprimir(canvas) {

        this.casillasOcupadas = []

        let context = canvas.getContext('2d')

        this.generarCasillas()

        this.imprimirTablero(context, canvas)

        this.generarSerpientes(context, canvas)

        this.generarEscaleras(context, canvas)

    }

}

export default Tablero