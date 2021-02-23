'use strict'

const Equipo = use('App/Models/Equipo');
const SectorPertenece = use('App/Models/SectorPertenece');
const InstrumentoEstado = use('App/Models/InstrumentoEstado');
const CalibracionTareaRealizada = use('App/Models/CalibracionTareaRealizada');
const CalibracionTarea = use('App/Models/CalibracionTarea');
const Instrumento = use('App/Models/Instrumento');
const Query = require("../../Utils/Query");
const { validate } = use('Validator');
const User = use('App/Models/User');
var moment = require('moment');
const Database = use('Database')

class EquipoController {
 
  async index ({ request, response, view , auth}) {
    try {
      await auth.check();
    } catch (error) {
      return response.status(401).json('Acceso no Autorizado')
    }
    try {
      var query = Equipo.query();
      var {
        page,
        perPage,
      } = request.all();
      //seteo valores por defectos
      page = page || 1
      perPage = perPage || 10
      let equipos = await Equipo.query().with('sector').with('instrumento').with('calibracion_tarea').paginate(page, perPage);
      response.status(200).json({ message: 'Listado de Equipos', data: equipos })
    } catch (error) {
      console.log(error)
      return response.status(400).json({ menssage: 'Hubo un error al realizar la operación', error })
    }
  }

    async create({request, response , auth}){
       
      try {
        const user = await auth.getUser();
        let { tag,  descripcion, serie_requerido , sector_id , instrumento_id} = request.all();
        
        const rules = {
          tag: 'required',
          serie_requerido: 'required',
          sector_id: 'required',
          instrumento_id: 'required',
          descripcion: 'required'
        }
        let validation = await validate({ serie_requerido, sector_id, instrumento_id, tag, descripcion }, rules);
        if (validation.fails()) {
          return response.status(404).json({ message: "Datos Insufiente" });
        }
        if(user.rol == 0){
          const equipo = await Equipo.create({
            tag,
            serie_requerido,
            sector_id,
            instrumento_id,
            descripcion,
            created_at :  moment().format('YYYY-MM-DD HH:mm:ss'),
            updated_at:moment().format('YYYY-MM-DD HH:mm:ss'),
          })

          return response.status(200).json({ message: "Equipo creado con exito!", data: equipo})
        }else{
          return response.status(400).json({ menssage: "Usuario sin permiso suficiente para realizar esta operacion!" })
        }
      } catch (error) {
        console.log(error)
        return response.status(400).json({ menssage: 'Hubo un error al intentar realizar la operación', error })
      }
    }

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
      console.log(req.options)
      var sortBy = req.options.sortBy;
      var sortDesc = req.options.sortDesc;
      var page = req.options.page;
      var itemsPerPage = req.options.itemsPerPage;
      var filtroTree = req.filtroTree;
      //var desde = new Date('2020-01-01'), hasta = new Date('2020-03-30')
      var desde = req.desde;
      var hasta = req.hasta;
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
  async show ({ params, request, response, auth }) {
    try {
      const user = await auth.getUser()
      var id = params.id
      let equipo = await Equipo.query().with('sector').with('instrumento').with('calibracion_tarea').where('id', id).fetch();
      return response.status(200).json({ menssage: 'Equipo', data: equipo });
    } catch (error) {
      console.log(error)
      if (error.name == 'InvalidJwtToken') {
        return response.status(400).json({ menssage: 'Usuario no Valido' })
      }
      return response.status(400).json({
        menssage: 'Grupo no encontrado',
        id
      })
    }
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
  async update ({ params: {id}, request, response , auth }) {
    try {
      const user = await auth.getUser()
      const data = request.only(["tag", "serie_requerido", "sector_id", "instrumento_id", "descripcion"])
      if (user.rol == 0) {
        const equipo = await Equipo.find(id);
        equipo.tag = data.tag || equipo.tag;
        equipo.serie_requerido = data.serie_requerido || equipo.serie_requerido;
        equipo.sector_id = data.sector_id || equipo.sector_id;
        equipo.instrumento_id = data.instrumento_id || equipo.instrumento_id;
        equipo.descripcion = data.descripcion || equipo.descripcion; 
        await equipo.save();
        response.status(200).json({ menssage: 'Equipo modificado con Exito!', data: equipo })
      }
      else {
        response.status(400).json({ menssage: "Usuario sin permisos para realizar la operacion" })
      }
    } catch (error) {
      console.log(error)
      if (error.name == 'InvalidJwtToken') {
        return response.status(400).json({ menssage: 'Usuario no Valido' })
      }
      response.status(400).json({
        menssage: "Hubo un error al realizar la operación",
      })
    }
  }

  /**
   * Delete a equipo with id.
   * DELETE equipos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response , auth }) {
    const id = params.id
    try {
      const user = await auth.getUser()
      if (user.rol == 0) {

        const equi = await Equipo.findOrFail(id);
        await equi.delete();
        return response.status(200).json({ menssage: 'Equipo eliminado con Exito!' })
      }
    } catch (error) {
      console.log(error)
      if (error.name == 'InvalidJwtToken') {
        return response.status(400).json({ menssage: 'Usuario no Valido' })
      }
      response.status(404).json({
        message: "Equipo a eliminar no encontrado",
        id
      });
      return;
    }

  }
}

module.exports = EquipoController
