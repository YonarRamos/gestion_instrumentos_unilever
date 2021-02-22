'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class InstrumentoEstado extends Model {

    static get table () {
        return 'instrumento_estado'
    }

}

module.exports = InstrumentoEstado
