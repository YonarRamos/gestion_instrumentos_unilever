'use strict'

const User = use('App/Models/User');
const Response = use('App/Models/Response');


class UserController {

  async index({ auth, response, request }) {
    //Chequea token
    try {
      await auth.check();
    }
    catch (error) {
      return response.status(401).json('Acceso no autorizado.');
    }
    try {
      var query = User.query();
      let user = await User.query().fetch();
      response.status(200).json({ menssage: 'Usuario', data: user })
    } catch (error) {
      console.log(error)
      response.status(404).json({ menssage: 'Hubo un error al realizar la operación', error });
    }
  }

  async login({ auth, request, response }) {
    try {
      const { email, password } = request.all()
      var datosResp = {}
      datosResp = await auth.attempt(email, password);
      datosResp.user = await User.findBy('email', email);

      return datosResp;

    } catch (error) {
      return "Usuario o contraseña incorrecta.";
    }
  }

  async loginCheck({ auth, request, response }) {
    try {

      var respuesta = new Response(false, '', {});

      respuesta.datos = await auth.getUser();
      respuesta.feedback.estado = true;

      return respuesta;

    } catch (error) {
      return new Response(false, 'Error de autenticación', {});
    }
  }


  //metodo para crear usuarios
  async store({ auth, request, response }) {
    try {
      let { nombre, apellido, email, empresa, rol, password } = request.all();

      const user = await User.create({
        nombre,
        apellido,
        email,
        empresa,
        rol,
        password
      })
      return response.status(200).json({ message: 'Usuario creado con Exito!' })
    } catch (error) {
      return response.status(404).json(error)
    }
  }
  async loginToken({ auth, response }) {
    try {
      const user = await auth.getUser();
      if (user) {
        let data = { email: user.email, password: user.password }
        return response.status(200).json(data)
      }
    } catch (error) {
      console.log(error)
      response.status(400).json({ menssage: 'Hubo un error al realizar la operación' })
    }
  }
  async update({ auth, response, request , params:{id}}) {
    try {
      const user = await auth.getUser()
      const data = request.only(["nombre", "apellido", "email", "empresa", "rol", "updated_at"])
      if (user.rol == 0) {
        const usuarios = await User.find(id);
        usuarios.nombre = data.nombre || usuarios.nombre;
        usuarios.apellido = data.apellido || usuarios.apellido;
        usuarios.email = data.email || usuarios.email;
        usuarios.empresa = data.empresa || usuarios.empresa;
        usuarios.rol = data.rol || usuarios.rol;
        usuarios.updated_at = moment()
        await usuarios.save();
        response.status(200).json({ menssage: 'Usuario modificado con Exito!', data: usuarios })
      } else {
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
  async detroy({ auth, response, request , params}){
    try {
    const id = params.id
    const user = await auth.getUser();
    if(user.rol == 0){
      const users = await User.findOrFail(id);
      await users.delete();
      return response.status(200).json({ menssage: 'Usuario eliminado con Exito!' })
    }else{
      response.status(400).json({ menssage: "Usuario sin permisos para realizar la operacion" })
    }
    } catch (error) {
      console.log(error)
      if (error.name == 'InvalidJwtToken') {
        return response.status(400).json({ menssage: 'Usuario no Valido' })
      }
      response.status(404).json({
        message: "Usuario a eliminar no encontrado",
        id
      });
    }
  }
}

module.exports = UserController
