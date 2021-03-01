'use strict'

const { validate } = use('Validator');
const User = use('App/Models/User');
const CalibracionTipo = use('App/Models/CalibracionTipo');
var moment = require('moment');
const Database = use('Database')
class CalibracionTipoController {
  
  async index ({ request, response, view, auth }) {
      //Chequea token
      try {
        await auth.check();
      }
      catch (error)
      {
        return response.status(401).json('Acceso no autorizado.');
      }
      try {
        var query = CalibracionTipo.query();
        let tipocal = await CalibracionTipo.query().fetch();
        response.status(200).json({ menssage: 'Tarea Realizada', data: tipocal })
      } catch (error) {
        console.log(error)
        response.status(404).json({ menssage: 'Hubo un error al realizar la operación', error });
      }
  }

  /**
   * Render a form to be used for creating a new calibraciontipo.
   * GET calibraciontipos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new calibraciontipo.
   * POST calibraciontipos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single calibraciontipo.
   * GET calibraciontipos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing calibraciontipo.
   * GET calibraciontipos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update calibraciontipo details.
   * PUT or PATCH calibraciontipos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a calibraciontipo with id.
   * DELETE calibraciontipos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = CalibracionTipoController
