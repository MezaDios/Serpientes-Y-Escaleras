import Dado from "./Dado.js"
import Jugador from "./Jugador.js"
import Tablero from "./Tablero.js"
import Serpiente from "./Serpiente.js"
import Escalera from "./Escalera.js"

class Juego {

    constructor(numeroJugadores, columnas, filas, numeroDado) {
        this.jugadores = []
        this.tablero = new Tablero(columnas, filas)
        this.dado = new Dado(numeroDado)

        for (let i = 1; i <= numeroJugadores; i++) {
            let jugador = new Jugador(`Jugador ${i}`)
            this.jugadores.push(jugador)
        }

        this.finalizado = false
        this.ganador = null
    }

    get Tablero() {
        return this.tablero
    }

    get Ganador() {
        return this.ganador
    }

    get Jugadores() {
        return this.jugadores
    }

    set Jugadores(jugadores) {
        this.jugadores = jugadores
    }

    elegirOrden() {
        let orden = []
        let tiradas = []
        for (let i = 0; i < this.Jugadores.length; i++) {
            let numero = this.dado.lanzar()

        }
    }

    empezar() {
        this.finalizado = false
        this.ganador = null

        //this.tablero.getCasilla(23).Serpiente = new Serpiente(23, 10)
        //this.tablero.getCasilla(99).Serpiente = new Serpiente(99, 2)
        //this.tablero.getCasilla(54).Serpiente = new Serpiente(54, 49)
        //this.tablero.getCasilla(15).Escalera = new Escalera(15, 30)
        //this.tablero.getCasilla(43).Escalera = new Escalera(43, 74)
        //this.tablero.getCasilla(58).Escalera = new Escalera(58, 66)

        do {
            for (let i = 0; i < this.jugadores.length; i++) {

                this.turno(this.jugadores[i])

                if (this.jugadores[i].PosicionActual >= this.tablero.TotalCasillas) {
                    this.finalizado = true
                    this.ganador = this.jugadores[i]
                    console.log('Juego terminado')
                    console.log(`Ganador ${this.ganador.nombre}`)
                    i = this.tablero.TotalCasillas
                }

            }

        } while (!this.finalizado)
    }

    imprimirPosicion(posicion, context, canvas) {
        //arc(x, y, radio, startAngle, endAngle, antihorario);
        context.beginPath()
        context.strokeStyle = "rgba(0,0,0)"
        let casilla = this.tablero.posicionCasilla(posicion, canvas)
        context.arc(casilla.x, casilla.y, 2.5, 0, Math.PI * 2, false)
        context.stroke()
        context.closePath()
    }

    turno(jugador) {

        let canvas = document.getElementById('tablero')
        let context = canvas.getContext('2d')

        let repetir = false

        console.log(`Turno del ${jugador.Nombre}`)

        let numeroDado = this.dado.lanzar()
        console.log(`El dado cayó ${numeroDado}`)

        if (numeroDado == this.dado.Lados) {
            console.log("Doble turno.")
            repetir = true
        }

        let posicion = jugador.avanzar(numeroDado)

        if (posicion > this.tablero.TotalCasillas) {
            jugador.PosicionActual = this.tablero.TotalCasillas - (jugador.PosicionActual - this.tablero.TotalCasillas)
            posicion = this.tablero.TotalCasillas - (posicion - this.tablero.TotalCasillas)
            console.log("Te pasaste de largo")
        }

        console.log(`El ${jugador.Nombre} está en la posición ${posicion}`)

        this.imprimirPosicion(posicion, context, canvas)

        if (this.tablero.getCasilla(posicion).Serpiente != null) {
            console.log(`Habia una serpiente.`)
            posicion = this.tablero.getCasilla(posicion).Serpiente.Final
            console.log(`Fuiste recorrido a la posicion ${posicion}`)
            jugador.PosicionActual = posicion
            this.imprimirPosicion(posicion, context, canvas)
        }
        else if (this.tablero.getCasilla(posicion).Escalera != null) {
            console.log(`Habia una escalera.`)
            posicion = this.tablero.getCasilla(posicion).Escalera.Final
            console.log(`Fuiste recorrido a la posicion ${posicion}`)
            jugador.PosicionActual = posicion
            this.imprimirPosicion(posicion, context, canvas)
        }

        console.log('----------------------')

        if (repetir && jugador.PosicionActual < this.tablero.TotalCasillas) {
            this.turno(jugador)
        }
    }

}

export default Juego