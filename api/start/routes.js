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
    Route.get('download/lastcert', 'EquipoController.getLastCert');
    Route.get('sector', 'SectorController.index');
    Route.post('login', 'UserController.login');
    Route.post('register', 'UserController.store');
}).prefix('api/v1');

//Rutas Equipos Asignados
Route.get('/api/v1/EquipoAsignado/:id' , 'EquipoAsignacionController.show');

//Rutas formulario 
Route.get('/api/v1/formulario' , 'EquipoController.index');
Route.get("api/v1/equipo/:id", "EquipoController.show");
Route.post('/api/v1/equipo', 'EquipoController.create');
Route.put("api/v1/equipo/:id", "EquipoController.update");
Route.delete("api/v1/equipo/:id", "EquipoController.destroy");


// Rutas Instrumentos
Route.get('/api/v1/instrumento' , 'InstrumentoController.index');
Route.get('/api/v1/instrumento/:id' , 'InstrumentoController.show');
Route.get('/api/v1/instrumentoslist' , 'InstrumentoController.getInstrumentosList');
Route.post('/api/v1/instrumento' , 'InstrumentoController.store');
Route.put('/api/v1/instrumento/:id' , 'InstrumentoController.update');
Route.delete('/api/v1/instrumento/:id' , 'InstrumentoController.destroy');

//Rutas get tipo Instrumento
Route.get('/api/v1/instrumentoTipo' , 'InstrumentoTipoController.index');

//Rutas  Instrumento Estado
Route.get('/api/v1/instrumentoEstado' , 'InstrumentoEstadoController.index');

//Rutas  Unidad
Route.get('/api/v1/Unidad' , 'UnidadController.index');

//Rutas  magnitud
Route.get('/api/v1/Magnitud' , 'MagnitudController.index');

//Rutas users
Route.get('/api/v1/user' , 'UserController.index');
Route.post('/api/v1/user' , 'UserController.store');

Route.get('/api/v1/user/:id' , 'UserController.show');
Route.put('/api/v1/user/:id' , 'UserController.update');
Route.delete('/api/v1/user/:id' , 'UserController.destroy');
Route.get("api/v1/loginUsersAutomatico", "UserController.loginToken");
//Rutas users
Route.get('/api/v1/calibracionTipo' , 'calibracionTipoController.index');
//rutas tarea calibracion
Route.post('/api/v1/calibracion' , 'CalibracionTareaController.store');
Route.put('/api/v1/calibracion/:id' , 'CalibracionTareaController.update');
//Rutas Tarea Realizada 
Route.get('/api/v1/TareaRealizada' , 'CalibracionTareaRealizadaController.index');
Route.post('/api/v1/cargacertificado' , 'CalibracionTareaRealizadaController.store');


//rutas pruebas img & pdf
Route.post('/api/v1/pruebas' , 'EquipoController.prueba');
Route.get('/api/v1/pruebas/:FileName' , 'EquipoController.index');
Route.post('/api/v1/pruebasPDF' , 'EquipoController.prueba1');
