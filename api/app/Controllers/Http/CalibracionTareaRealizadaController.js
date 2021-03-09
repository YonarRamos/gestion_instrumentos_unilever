'use strict'

const { validate } = use('Validator');
const User = use('App/Models/User');
const CalibracionTarea = use('App/Models/CalibracionTarea');
const CalibracionTareaRealizada = use('App/Models/CalibracionTareaRealizada');
var moment = require('moment');
const Database = use('Database')
const Helpers = use('Helpers');
class CalibracionTareaRealizadaController {
  
  async index ({ request, response, view , auth}) {
     //Chequea token
     try {
      await auth.check();
    }
    catch (error)
    {
      return response.status(401).json('Acceso no autorizado.');
    }
    try {
      let TareaRealizada = await CalibracionTareaRealizada.query().with('realizada').with('tarea').with('tarea.instrumento').with('tarea.tipo').fetch();
      TareaRealizada = TareaRealizada.toJSON();
     var arrayTarea = TareaRealizada.map(e=>{
       return{
         "Num_tarea": e.tarea.id,
         "intrumento": e.tarea.instrumento.serie,
         "fecha": e.fecha,
         "realizo": e.realizada.empresa,
         "certificado": e.certificado 
       }
     })
     let resp = await Promise.all(arrayTarea)
      response.status(200).json({ menssage: 'Tarea Realizada', data: resp })
    } catch (error) {
      console.log(error)
      response.status(404).json({ menssage: 'Hubo un error al realizar la operación', error });
    }
  }

  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new calibraciontarearealizada.
   * POST calibraciontarearealizadas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {

    // Request
    var {calibracion_tarea_id, fecha, certificado} = request.all();
    var tarea = {calibracion_tarea_id, fecha, certificado};
    // Variables
    var user, tareaCalibracion;

    // Validaciones
    try {
      user = await auth.getUser();

      tareaCalibracion = await CalibracionTarea.query().with('instrumento').with('instrumento.equipo').where('id', tarea.calibracion_tarea_id).fetch();
      tareaCalibracion = tareaCalibracion.toJSON();

      if (tareaCalibracion.length == 0) {
        return response.status(400).json('Tarea de calibración incorrecta.')
      }
      else
      {
        if (tareaCalibracion[0].instrumento.encargado_calibracion != user.id) {
          return response.status(400).json('Acceso no autorizado.')
        }
      }
    } catch (error) {
      console.log(error)
      return response.status(401).json('Acceso no autorizado.');
    }

    // Carga de certificado
    try {
      var newItem = {
        calibracion_tarea_id: tarea.calibracion_tarea_id,
        fecha: tarea.fecha,
        realizo: user.id,
        certificado: tarea.certificado,
        equipo_id: tareaCalibracion[0].instrumento.equipo.id
      }

      const pdfSubido = request.file('certificado', {
        types: ['pdf'],
        size: '10mb'
      })
    
      console.log(tarea.certificado);

      await pdfSubido.move(Helpers.appRoot(`storage/archivos/certificados/${tareaCalibracion[0].instrumento.id}/${pdfSubido}`), {
        name: 'custom-name.jpg',
        overwrite: true
      })
    
      if (!profilePic.moved()) {
        return profilePic.error()
      }
      return 'File moved'
      
      return newItem

    } catch (error) {
      
    }
    /* const isExist = await Drive.exists(`archivos/certificados/${req.id}/${cert[0].certificado}`);
        
        if (isExist) {
            return response.download(Helpers.appRoot(`storage/archivos/certificados/${req.id}/${cert[0].certificado}`));
        } */
  }

  /**
   * Display a single calibraciontarearealizada.
   * GET calibraciontarearealizadas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing calibraciontarearealizada.
   * GET calibraciontarearealizadas/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update calibraciontarearealizada details.
   * PUT or PATCH calibraciontarearealizadas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a calibraciontarearealizada with id.
   * DELETE calibraciontarearealizadas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = CalibracionTareaRealizadaController
