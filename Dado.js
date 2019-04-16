class Dado {

    constructor(lados) {
        this.lados = lados
    }

    lanzar() {
        return Math.floor(Math.random() * (this.lados + 1 - 1)) + 1
    }

    get Lados() {
        return this.lados
    }

}
export default Dado