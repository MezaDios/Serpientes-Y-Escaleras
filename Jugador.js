class Jugador {

    constructor(nombre) {
        this.posicionActual = 0
        this.nombre = nombre
    }

    avanzar(numeroCasillas) {
        this.posicionActual += numeroCasillas
        return this.posicionActual
    }

    get Nombre() {
        return this.nombre
    }

    get PosicionActual() {
        return this.posicionActual
    }

    set PosicionActual(posicion) {
        this.posicionActual = posicion
    }
}

export default Jugador