'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Sector extends Model {

    static get table () {
        return 'sector'
    }

    planta () {
        return this.hasOne('App/Models/Planta', 'planta_id', 'id')
    }

    sector_contiene () {
        return this.hasMany('App/Models/SectorPertenece', 'id', 'pertenece_a_sector_id')
    }

    sector_padre () {
        return this.hasOne('App/Models/SectorPertenece', 'id', 'sector_id')
    }
}

module.exports = Sector
