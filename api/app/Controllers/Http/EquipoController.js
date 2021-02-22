'use strict'

const Equipo = use('App/Models/Equipo');
const SectorPertenece = use('App/Models/SectorPertenece');
const InstrumentoEstado = use('App/Models/InstrumentoEstado');
const CalibracionTareaRealizada = use('App/Models/CalibracionTareaRealizada');
const CalibracionTarea = use('App/Models/CalibracionTarea');
const Instrumento = use('App/Models/Instrumento');
const User = use('App/Models/User');
const Database = use('Database')

class EquipoController {
  /**
   * Show a list of all equipos.
   * GET equipos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {

    try {
      
      var tableItems = await Equipo.query().with('instrumento').with('sector').fetch();
      tableItems = tableItems.toJSON();
      var total = tableItems.length;
      console.log(total)
      
      return {tableItems, total};

    } catch (error) {
      return "Error";
    }
  }


    /**
   * Lista equipos para vista principal
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async getEquiposTable ({ request, response, view, auth }) {

    //Chequea token
    try {
      await auth.check();
    }
    catch (error)
    {
      return response.status(401).json('Acceso no autorizado.');
    }

    //Variables
    var data = null, tableItems = {};

    try {

      var req = request.all();

      req.options = JSON.parse(req.options);
      
      var sortBy = req.options.sortBy;
      var sortDesc = req.options.sortDesc;
      var page = req.options.page;
      var itemsPerPage = req.options.itemsPerPage;
      var filtroTree = req.filtroTree;
      //var desde = new Date('2020-01-01'), hasta = new Date('2020-03-30')
      var desde = null, hasta = null;
      var listSectores = [], auxListSectores = [];

      var query = Equipo.query()
      .select('equipo.*', 'instrumento.id as instrumento_id2', 'instrumento.created_at as instrumento_created_at', 'instrumento.updated_at as instrumento_updated_at'
      ,'instrumento_estado.nombre as estadoName', 'sector.nombre as sectorName', 'instrumento.serie', 'users.empresa as empresa', 'proximaCalib')
      .leftJoin('instrumento', 'equipo.instrumento_id', 'instrumento.id')
      .leftJoin('instrumento_estado', 'instrumento.estado', 'instrumento_estado.id')
      .leftJoin('sector', 'equipo.sector_id', 'sector.id')
      .leftJoin('users', 'instrumento.encargado_calibracion', 'users.id')
      .joinRaw('LEFT JOIN (SELECT instrumento_id, MIN([proxima]) as proximaCalib FROM calibracion_tarea GROUP BY instrumento_id) AS b ON equipo.instrumento_id = b.instrumento_id')

      if (filtroTree !== undefined)
      {
        listSectores.push(filtroTree[0]);
        auxListSectores.push(filtroTree[0]);

        var auxListSectoresLoop = await Database.table('sector_pertenece').whereIn('pertenece_a_sector_id', auxListSectores);

        while(auxListSectoresLoop.length > 0)
        {
          auxListSectores = [];
          auxListSectoresLoop.forEach(it => {
            listSectores.push(it.sector_id);
            auxListSectores.push(it.sector_id);
          })
          auxListSectoresLoop = await Database.table('sector_pertenece').whereIn('pertenece_a_sector_id', auxListSectores);
        }

        query.whereIn('equipo.sector_id', listSectores);
      }

      if (desde && hasta) {
        query.whereBetween('proximaCalib', [desde, hasta]);
      }

      if (req.buscar) {
        query.where(function () {
          this.where('tag', 'like', '%' + req.buscar + '%')
          .orWhere('descripcion', 'like', '%' + req.buscar + '%')
          .orWhere('empresa', 'like', '%' + req.buscar + '%')
          .orWhere('instrumento_estado.nombre', 'like', '%' + req.buscar + '%')
          .orWhere('sector.nombre', 'like', '%' + req.buscar + '%')
        })        
      }      

      if (sortBy.length == 0) {
        sortBy.push('tag')
      }

      sortBy.forEach((it, i) => {
        query.orderBy(it, sortDesc[i] || false ? 'DESC' : 'ASC')
      });
      
      if (itemsPerPage == -1) {
        data = await query.fetch();
        data = data.toJSON()
        tableItems.data = data;
      }
      else
      {
        data = await query.paginate(page, itemsPerPage);
        data = data.toJSON()
        tableItems = data;
      }

      var arrayPromises = tableItems.data.map((it) => {
        var auxIt = {};

        auxIt.id = it.id;
        auxIt.tag = it.tag;
        auxIt.descripcion = it.descripcion;
        auxIt.sector_id = it.sector_id;
        auxIt.instrumento_id = it.instrumento_id;
        auxIt.sectorName = it.sectorName;
        auxIt.empresa = it.empresa;
        auxIt.proximaCalib = it.proximaCalib || '';
        auxIt.estadoName = it.estadoName;

        return auxIt;
      })

      var tableItemsData = await Promise.all(arrayPromises);
    
      return {tableItemsData, total: tableItems.total};

    } catch (error) {
      console.log(error)
      return "Error " + error;
    }
  }


  /**
   * Render a form to be used for creating a new equipo.
   * GET equipos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new equipo.
   * POST equipos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    return "hola";
  }

  /**
   * Display a single equipo.
   * GET equipos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing equipo.
   * GET equipos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update equipo details.
   * PUT or PATCH equipos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a equipo with id.
   * DELETE equipos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = EquipoController
