'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Planta extends Model {

    static get table () {
        return 'planta'
    }
}

module.exports = Planta
