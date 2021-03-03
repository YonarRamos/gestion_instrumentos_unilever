'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class CalibracionTareaRealizada extends Model {

    static get table () {
        return 'calibracion_tarea_realizada'
    }
    static get dates() {
        return super.dates.concat(['fecha'])
    }
      
    static castDates(field, value) {
        if (field === 'fecha' ) {
          return value.format('YYYY-MM-DD HH:mm:ss')
        }
    }

    realizada () {
        return this.hasOne('App/Models/User', 'realizo', 'id')
    }
    tarea () {
        return this.hasOne('App/Models/CalibracionTarea', 'calibracion_tarea_id', 'id')
    }
}

module.exports = CalibracionTareaRealizada
