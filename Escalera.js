class Escalera {

    constructor(inicio, final) {
        this.inicio = inicio
        this.final = final

        if (inicio > final) {
            this.inicio = 0
            this.inicio = 0
        }
    }

    get Inicio() {
        return this.inicio
    }

    get Final() {
        return this.final
    }

}

export default Escalera