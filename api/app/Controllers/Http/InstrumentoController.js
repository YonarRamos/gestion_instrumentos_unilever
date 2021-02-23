'use strict'
const Instrumento = use('App/Models/Instrumento');
const Query = require("../../Utils/Query");
const { validate } = use('Validator');
const User = use('App/Models/User');
var moment = require('moment');
const Database = use('Database')
class InstrumentoController {
 
  async index ({ request, response, auth }) {
    try {
      await auth.check();
    } catch (error) {
      return response.status(401).json('Acceso no Autorizado')
    }
    try {
      var query = Instrumento.query();
      var {
        page,
        perPage,
      } = request.all();
      //seteo valores por defectos
      page = page || 1
      perPage = perPage || 10
      let res = await Instrumento.query().paginate(page, perPage);
      response.status(200).json({ message: 'Listado de Instrumentos', data: res })
    } catch (error) {
      console.log(error)
      return response.status(400).json({ menssage: 'Hubo un error al realizar la operación', error })
    }
  }

  /**
   * Render a form to be used for creating a new instrumento.
   * GET instrumentos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new instrumento.
   * POST instrumentos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single instrumento.
   * GET instrumentos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing instrumento.
   * GET instrumentos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update instrumento details.
   * PUT or PATCH instrumentos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a instrumento with id.
   * DELETE instrumentos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = InstrumentoController
