'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


const Sector = use('App/Models/Sector');
var listRutas = [];

/**
 * Resourceful controller for interacting with sectors
 */
class SectorController {
  /**
   * Show a list of all sectors.
   * GET sectors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  
  async index ({ request, response, view, auth }) {

    //Chequea token
    try {
      await auth.check();
    }
    catch (error)
    {
      return response.status(401).json('Acceso no autorizado.');
    }

    // Armo datos para reconstruir jerarquía
    try {
      
      var sectoresResp = [];
      var sectores = await Sector.query().with('sector_contiene').with('sector_padre').fetch();
      sectores = sectores.toJSON();

      listRutas = [];

      var arrPromesas = sectores.map((it) => {

        var auxSector = {};
        
        if (!it.sector_padre) {
          auxSector.name = it.nombre;
          auxSector.id = it.id;
          auxSector.test = 1;
          
          listRutas.push({i: it.id, ruta: '/' + it.nombre})
          
          if (it.sector_contiene.length > 0) {
            auxSector.children = this.agregarSectoresHijos(sectores, it.sector_contiene, '/' + it.nombre);
          }
        }

        if (auxSector.id) {
          sectoresResp.push(auxSector);
        }
        
      });

      var data = await Promise.all(arrPromesas);

      return {sectoresResp, listRutas};

    } catch (error) {
      return error;
    }
  }

  // Función para buscar los hijos de un sector.
  agregarSectoresHijos(inSectores, lista, rutaIn) {
    
    var respuesta = [];

    lista.forEach(el => {

      var auxHijo = inSectores.find(sector => sector.id == el.sector_id);
      var auxHijoResp = {};
      
      if (auxHijo.sector_contiene.length == 0) {
        respuesta.push({id: auxHijo.id, name: auxHijo.nombre});
      }
      else
      {
        auxHijoResp.name = auxHijo.nombre;
        auxHijoResp.id = auxHijo.id;
        
        auxHijoResp.children = this.agregarSectoresHijos(inSectores, auxHijo.sector_contiene, rutaIn + '/' + auxHijo.nombre);

        respuesta.push(auxHijoResp);
      }
      listRutas.push({i: auxHijo.id, ruta: rutaIn + '/' + auxHijo.nombre})
    });
    return respuesta;
  }
  /**
   * Render a form to be used for creating a new sector.
   * GET sectors/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new sector.
   * POST sectors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single sector.
   * GET sectors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing sector.
   * GET sectors/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update sector details.
   * PUT or PATCH sectors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a sector with id.
   * DELETE sectors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = SectorController
