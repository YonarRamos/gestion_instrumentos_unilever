'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/api/v1',() => {

    return { greeting: 'Welcome API Certificados ' }
})

// Rutas del Runtime
Route.group(() => {
    Route.get('tablaequipos', 'EquipoController.getEquiposTable');
    Route.get('sector', 'SectorController.index');
    Route.post('login', 'UserController.login');
    Route.post('register', 'UserController.store');
}).prefix('api/v1');



//Rutas formulario 
Route.get('/api/v1/formulario' , 'EquipoController.index');
Route.get('/api/v1/formulario/:id' , 'EquipoController.show');
Route.post('/api/v1/equipo', 'EquipoController.create');
Route.put("api/v1/equipo/:id", "EquipoController.update");
Route.delete("api/v1/equipo/:id", "EquipoController.destroy");


// Rutas Instrumentos
Route.get('/api/v1/instrumento' , 'InstrumentoController.index');
Route.post('/api/v1/instrumento' , 'InstrumentoController.store');


//Rutas get tipo Instrumento
Route.get('/api/v1/instrumentoTipo' , 'InstrumentoTipoController.index');

//Rutas  Instrumento Estado
Route.get('/api/v1/instrumentoEstado' , 'InstrumentoEstadoController.index');

//Rutas  Unidad
Route.get('/api/v1/Unidad' , 'UnidadController.index');

//Rutas  magnitud
Route.get('/api/v1/Magnitud' , 'MagnitudController.index');

//Rutas users
Route.get('/api/v1/User' , 'UserController.index');

//Rutas Tarea Realizada 
Route.get('/api/v1/TareaRealizada' , 'CalibracionTareaRealizadaController.index');
