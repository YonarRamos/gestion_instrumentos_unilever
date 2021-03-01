'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class CalibracionTarea extends Model {
    static get createdAtColumn() {
        return null;
    }
        
    static get updatedAtColumn() {
        return null;
    }

    static get table () {
        return 'calibracion_tarea'
    }

    static get dates () {
        return super.dates.concat(['ult_efectuado', 'proxima'])
    }

    static castDates(field, value) {
        if (field == "ult_efectuado" || field == "proxima") return value ? value.add(3,'hour').format("YYYY-MM-DD") : value;
        else return value ? value.format("DD/MM/YYYY hh:mm:ss") : value;
        // else used for created_at / updated_at
    }

    instrumento () {
        return this.belongsTo('App/Models/Instrumento', 'instrumento_id', 'id')
      }
    
    tipo () {
        return this.hasOne('App/Models/CalibracionTipo', 'calibracion_tipo_id','id')
    }
}

module.exports = CalibracionTarea
