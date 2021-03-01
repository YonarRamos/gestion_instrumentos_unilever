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

  async store ({ request, response ,auth}) {
    
    try {
      const user = await auth.getUser();
      let {   marca, modelo , serie , rango_de , rango_a , rango_normal_de , rango_normal_a , resolucion , tolerancia , tipo_id , unidad_id , magnitud_id , encargado_calibracion} = request.all();
       // console.log( marca, modelo , serie , rango_de , rango_a , rango_normal_de , rango_normal_a , resolucion , tolerancia , tipo_id , unidad_id , magnitud_id , encargado_calibracion)
      const rules = {
        marca: 'required',
        modelo: 'required',
        serie: 'required',
        rango_de: 'required',
        rango_a: 'required',
        rango_normal_de: 'required',
        rango_normal_a: 'required',
        resolucion: 'required',
        tolerancia: 'required',
        tipo_id: 'required',
        unidad_id: 'required',
        magnitud_id: 'required',
        encargado_calibracion: 'required'
      }
      let validation = await validate({ marca, modelo , serie , rango_de , rango_a , rango_normal_de , rango_normal_a , resolucion , tolerancia , tipo_id , unidad_id , magnitud_id , encargado_calibracion }, rules);
      if (validation.fails()) {
        return response.status(404).json({ message: "Datos Insufiente" });
      }
      if(user.rol == 0){
        const instrumento = await Instrumento.create({
          estado: 1,
          marca,
          serie,
          modelo,
          rango_de,
          rango_a,
          rango_normal_de,
          rango_normal_a,
          resolucion,
          tolerancia,
          tipo_id,
          unidad_id,
          magnitud_id,
          creado_usuario: encargado_calibracion,
          encargado_calibracion,
          created_at :  moment().format('YYYY-MM-DD HH:mm:ss'),
          updated_at:moment().format('YYYY-MM-DD HH:mm:ss'),
        })

        return response.status(200).json({ message: "Instrumento creado con exito!", data: instrumento})
      }else{
        return response.status(400).json({ menssage: "Usuario sin permiso suficiente para realizar esta operacion!" })
      }
    } catch (error) {
      console.log(error)
      response.status(404).json({ menssage: 'Hubo un error al realizar la operación', error });
    }
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
