'use strict'

const { validate } = use('Validator');
const User = use('App/Models/User');
const Magnitud = use('App/Models/Magnitud');
var moment = require('moment');
const Database = use('Database')
class MagnitudController {
 
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
      var query = Magnitud.query();
      let mag = await Magnitud.query().fetch();
      response.status(200).json({ menssage: 'Magnitud', data: mag })
    } catch (error) {
      console.log(error)
      response.status(404).json({ menssage: 'Hubo un error al realizar la operación', error });
    }
  }

  /**
   * Render a form to be used for creating a new magnitud.
   * GET magnituds/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new magnitud.
   * POST magnituds
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single magnitud.
   * GET magnituds/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing magnitud.
   * GET magnituds/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update magnitud details.
   * PUT or PATCH magnituds/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a magnitud with id.
   * DELETE magnituds/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = MagnitudController
