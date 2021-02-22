'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Magnitud extends Model {

    static get table () {
        return 'magnitud'
    }
}

module.exports = Magnitud
