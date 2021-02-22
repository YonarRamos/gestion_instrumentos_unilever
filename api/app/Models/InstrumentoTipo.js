'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class InstrumentoTipo extends Model {

    static get table () {
        return 'instrumento_tipo'
    }
}

module.exports = InstrumentoTipo
