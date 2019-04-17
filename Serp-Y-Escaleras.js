import Juego from "./Juego.js";

let tablero = document.getElementById('tablero')

let juego = new Juego(2, 6, 6, 6)

juego.Tablero.imprimir(tablero)

juego.empezar()

