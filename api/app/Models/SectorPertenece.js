'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class SectorPertenece extends Model {

    static get table () {
        return 'sector_pertenece'
    }
    
}

module.exports = SectorPertenece
