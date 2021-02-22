'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class CalibracionTareaRealizada extends Model {

    static get table () {
        return 'calibracion_tarea_realizada'
    }

    calibracion_tarea () {
        return this.belongsTo('App/Models/CalibracionTarea', 'calibracion_tarea_id', 'id')
    }

    realizo () {
        return this.belongsTo('App/Models/User', 'realizo', 'id')
    }
}

module.exports = CalibracionTareaRealizada
