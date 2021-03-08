'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Equipo extends Model {

    static get table () {
        return 'equipo'
    }
    static get dates() {
        return super.dates.concat(['proxima'])
    }
      
    static castDates(field, value) {
        if (field === 'proxima' ) {
          return value.format('YYYY-MM-DD HH:mm:ss')
        }
        if (field === 'created_at' ) {
            return value.format('YYYY-MM-DD HH:mm:ss')
          }
          if (field === 'updated_at' ) {
            return value.format('YYYY-MM-DD HH:mm:ss')
          }
    }

    sector () {
        return this.hasOne('App/Models/Sector', 'sector_id', 'id')
    }

    instrumento () {
        return this.hasOne('App/Models/Instrumento', 'instrumento_id', 'id' , 'magnitud_id' , 'id')
    }
   
    calibracion_tarea () {
        return this.manyThrough('App/Models/Instrumento', 'tareaCalibracion', 'instrumento_id', 'id')
      }
      
}

module.exports = Equipo
