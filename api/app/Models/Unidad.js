'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Unidad extends Model {

    static get table () {
        return 'unidad'
    }
}

module.exports = Unidad
