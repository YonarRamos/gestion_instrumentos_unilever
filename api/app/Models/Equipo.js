'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Equipo extends Model {

    static get table () {
        return 'equipo'
    }

    sector () {
        return this.hasOne('App/Models/Sector', 'sector_id', 'id')
    }

    instrumento () {
        return this.hasOne('App/Models/Instrumento', 'instrumento_id', 'id')
    }

    calibracion_tarea () {
        return this.manyThrough('App/Models/Instrumento', 'tareaCalibracion', 'instrumento_id', 'id')
      }
      
}

module.exports = Equipo
