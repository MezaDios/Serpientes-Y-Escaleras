class Casilla {
    constructor(numero) {
        this.numero = numero
        this.escalera = null
        this.serpiente = null
    }

    set Serpiente(serpiente) {
        if (this.escalera == null) {
            if (serpiente.inicio != 0 && serpiente.final != 0) {
                this.serpiente = serpiente
            }
        }
    }

    set Escalera(escalera) {
        if (this.serpiente == null) {
            if (escalera.inicio != 0 && escalera.final != 0) {
                this.escalera = escalera
            }
        }
    }

    get Serpiente() {
        return this.serpiente
    }

    get Escalera() {
        return this.escalera
    }
}
export default Casilla