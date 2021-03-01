'use strict'

const Prueba = use("App/Models/Prueba");
const Equipo = use("App/Models/Equipo");
const { validate } = use('Validator');
const User = use("App/Models/User");
const Query = require("../../Utils/Query");
class PruebaController {
 
  async index ({ request, response, view }) {
  }

  async create ({ request, response, view }) {
  }

  async store ({ request, response , auth}) {
    try {
      const user = await auth.getUser();
      const img = request.file('img', {
        type: ['image'],
        size: '2mb'
      });
      
      await img.move(Helpers.publicPath('uploads'),{
        name: `avatar-1.jpg`,
        overwrite: true
      })
    } catch (error) {
      console.log(error)
      return response.status(400).json('Hubo un error en el proceso ' , error)
    }
  }

  /**
   * Display a single prueba.
   * GET pruebas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing prueba.
   * GET pruebas/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update prueba details.
   * PUT or PATCH pruebas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a prueba with id.
   * DELETE pruebas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = PruebaController
