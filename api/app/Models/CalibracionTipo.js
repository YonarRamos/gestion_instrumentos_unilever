'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class CalibracionTipo extends Model {

    static get table () {
        return 'calibracion_tipo'
    }

    calibracion_tarea () {
        return this.belongsTo('App/Models/CalibracionTarea', 'id', 'calibracion_tipo_id')
    }
}

module.exports = CalibracionTipo
