'use strict'

const { validate } = use('Validator');
const User = use('App/Models/User');
const InstrumentoTipo = use('App/Models/InstrumentoTipo');
var moment = require('moment');
const Database = use('Database')
class InstrumentoTipoController {

  async index ({ request, response, view , auth }) {
     //Chequea token
     try {
      await auth.check();
    }
    catch (error)
    {
      return response.status(401).json('Acceso no autorizado.');
    }
    try {
      var query = InstrumentoTipo.query();
      let tipo = await InstrumentoTipo.query().fetch();
      response.status(200).json({ menssage: 'Tipo de instrumento', data: tipo })
    } catch (error) {
      console.log(error)
      response.status(404).json({ menssage: 'Hubo un error al realizar la operación', error });
    }
  }

  /**
   * Render a form to be used for creating a new instrumentotipo.
   * GET instrumentotipos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new instrumentotipo.
   * POST instrumentotipos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single instrumentotipo.
   * GET instrumentotipos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing instrumentotipo.
   * GET instrumentotipos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update instrumentotipo details.
   * PUT or PATCH instrumentotipos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a instrumentotipo with id.
   * DELETE instrumentotipos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = InstrumentoTipoController
