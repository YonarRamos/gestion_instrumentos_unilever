'use strict'

const { validate } = use('Validator');
const User = use('App/Models/User');
const Unidad = use('App/Models/Unidad');
var moment = require('moment');
const Database = use('Database')
class UnidadController {
  
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
      var query = Unidad.query();
      let uni = await Unidad.query().fetch();
      response.status(200).json({ menssage: 'Unidad', data: uni })
    } catch (error) {
      console.log(error)
      response.status(404).json({ menssage: 'Hubo un error al realizar la operación', error });
    }
  }

  /**
   * Render a form to be used for creating a new unidad.
   * GET unidads/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new unidad.
   * POST unidads
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single unidad.
   * GET unidads/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing unidad.
   * GET unidads/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update unidad details.
   * PUT or PATCH unidads/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a unidad with id.
   * DELETE unidads/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = UnidadController
