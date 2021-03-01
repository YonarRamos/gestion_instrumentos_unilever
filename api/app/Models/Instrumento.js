'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Instrumento extends Model {

    static get table () {
        return 'instrumento'
    }

    equipo () {
        return this.belongsTo('App/Models/Equipo', 'id', 'instrumento_id')
    }

    estado_rel () {
        return this.hasOne('App/Models/InstrumentoEstado', 'estado', 'id')
    }

    tipo () {
        return this.hasOne('App/Models/InstrumentoTipo', 'tipo_id', 'id')
    }

    unidad () {
        return this.hasOne('App/Models/Unidad', 'unidad_id', 'id')
    }

    magnitud () {
        return this.hasOne('App/Models/Magnitud', 'magnitud_id', 'id')
    }

    encargado () {
        return this.hasOne('App/Models/User', 'encargado_calibracion', 'id')
    }

    tareaCalibracion () {
        return this.hasOne('App/Models/CalibracionTarea', 'id', 'instrumento_id')
    }
    calibracion_tipo () {
        return this.hasOne('App/Models/CalibracionTipo', 'calibracion_tipo_id','id')
    }
    
}

module.exports = Instrumento
