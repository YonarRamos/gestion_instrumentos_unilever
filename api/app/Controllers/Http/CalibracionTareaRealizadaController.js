'use strict'

const { validate } = use('Validator');
const User = use('App/Models/User');
const CalibracionTareaRealizada = use('App/Models/CalibracionTareaRealizada');
var moment = require('moment');
const Database = use('Database')
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
      var query = CalibracionTareaRealizada.query();
      let TareaRealizada = await CalibracionTareaRealizada.query().fetch();
      response.status(200).json({ menssage: 'Tarea Realizada', data: TareaRealizada })
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
  async store ({ request, response }) {
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
