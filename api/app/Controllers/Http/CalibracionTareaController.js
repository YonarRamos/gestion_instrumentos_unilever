'use strict'

const { validate } = use('Validator');
const User = use('App/Models/User');
const CalibracionTarea = use('App/Models/CalibracionTarea');
const CalibracionTareaRealizada = use('App/Models/CalibracionTareaRealizada');
var moment = require('moment');
const Database = use('Database')
class CalibracionTareaController {
 
  async index ({ request, response, view }) {
  }

  
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new calibraciontarea.
   * POST calibraciontareas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response , auth}) {
    try {
      const user = await auth.getUser();
      let { instrumento_id,  calibracion_tipo_id,  frecuencia , proxima  } = request.all();
      const rules = {
        instrumento_id: 'required',
        calibracion_tipo_id: 'required',
        frecuencia: 'required',
        proxima: 'required'
      }
      let validation = await validate({ instrumento_id, calibracion_tipo_id,  frecuencia, proxima }, rules);
      if (validation.fails()) {
        return response.status(404).json({ message: "Datos Insufiente" });
      }
      if(user.rol == 0){
        const calibracionTarea = await CalibracionTarea.create({
        instrumento_id,
        calibracion_tipo_id,
        frecuencia,
        ult_efectuado: moment().format('YYYY-MM-DD HH:mm:ss'),
        proxima
      
      })
      return response.status(200).json({ message: "Equipo creado con exito!", data: calibracionTarea})
     }else{
      return response.status(400).json({ menssage: "Usuario sin permiso suficiente para realizar esta operacion!" })
     }

    } catch (error) {
      console.log(error)
      return response.status(400).json({ menssage: 'Hubo un error al intentar realizar la operación', error })
    }

  }

  /**
   * Display a single calibraciontarea.
   * GET calibraciontareas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing calibraciontarea.
   * GET calibraciontareas/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update calibraciontarea details.
   * PUT or PATCH calibraciontareas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response , auth}) {
    const id = params.id
    try {
      const user = await auth.getUser();
      if(user.rol == 0){
        const insertTareaRealizada = await Database.from('calibracion_tarea_realizada').insert([{calibracion_tarea_id:id, fecha : moment() , realizo : user.id , certificado : 'avatar-4.pdf'}])
        return response.status(200).json({menssage: 'Tarea Realizada Aprobada.!'})
      }
    } catch (error) {
      if (error.name == 'InvalidJwtToken') {
        return response.status(400).json({ menssage: 'Usuario no Valido' })
      }
      response.status(404).json({
        message: "Tarea no encontrada",
        id
      });
    }
  }

  /**
   * Delete a calibraciontarea with id.
   * DELETE calibraciontareas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = CalibracionTareaController
