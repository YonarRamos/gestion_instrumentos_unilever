'use strict'

class Response {
    constructor (estado, msj, datos) {
        this.feedback = { estado: estado, mensaje: msj};
        this.datos = datos;
    }
}

module.exports = Response
