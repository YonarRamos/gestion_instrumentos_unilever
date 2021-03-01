'use strict'

const User = use('App/Models/User');
const Response = use('App/Models/Response');


class UserController {

    async index({auth , response, request}){
         //Chequea token
     try {
        await auth.check();
      }
      catch (error)
      {
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

    async login ({ auth, request, response }) {
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

    async loginCheck ({ auth, request, response }) {
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
    async store({ auth, request , response}){
        try {
            let{ nombre , apellido , email , empresa , rol , password }= request.all();

            const user = await User.create({
                nombre,
                apellido,
                email,
                empresa,
                rol,
                password
            })
            return response.status(200).json({message: 'Usuario creado con Exito!'})
        } catch (error) {
            return response.status(404).json(error)
        }
    }
}

module.exports = UserController
