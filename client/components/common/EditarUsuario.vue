<template>
  <div class="d-flex justify-end">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
              <v-icon
              v-bind="attrs"
              v-on="on"
              @click="show"
              >mdi-pencil
              </v-icon>
          </template>
          <span>Editar Usuario</span>
        </v-tooltip>

        <v-dialog v-model="dialog" width="500">
          <v-card>
            <v-card-title class="headline white--text blue darken-4">
                Editar Usuario
            </v-card-title>

            <v-card-text>
              <v-form ref="form" lazy-validation v-model="valid">
                <v-container>
                 <v-row>
                    <v-col cols="6">
                      <v-text-field 
                      v-model="usuario.nombre"
                      label="Nombre"
                      :rules="rules"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field 
                      v-model="usuario.apellido"
                      label="Apellido"
                      :rules="rules"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="6">
                      <v-text-field 
                      v-model="usuario.email"
                      label="Email"
                      :rules="rules"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="6">
                  <v-text-field
                    :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="rules"
                    v-model="usuario.password"
                    :type="show3 ? 'text' : 'password'"
                    label="Constraseña"
                    @click:append="show3 = !show3"
                  ></v-text-field>
                </v-col>
                  </v-row>
                   <v-row>
                    <v-col cols="6">
                      <v-select
                      v-model="usuario.rol"
                      label="Rol"
                      :items="listRol"
                      :rules="rules"
                      >
                      </v-select>
                      
                    </v-col>
                    <v-col cols="6">
                         <v-text-field 
                      v-model="usuario.empresa"
                      label="Empresa"
                      :rules="rules"
                      >
                         </v-text-field>
                    </v-col>
                   </v-row>
                  <!-- Modal status http request -->
                  <v-row v-if="alertShow">
                    <v-col cols="12" class="px-0">
                      <v-alert
                        dense
                        text
                        :type="alertType"
                      >
                        {{alertMsg}}
                      </v-alert>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" text @click="hide">
                Cancelar
              </v-btn>
              <v-btn color="primary" text @click="editarUsuario">
                Ok
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
  </div>
</template>

<script>
import axios from '~/plugins/axios';
import Cookies from 'js-cookie';
export default {
  props:{
    id: Number,
    required: true
  },
  data() {
    return {
      show3: false,
      valid:false,
      token: Cookies.get('token'),
      dialog: false,
      alertShow: false,
      alertMsg:'',
      alertType:'success',
      usuario:{
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        empresa: "",
        rol: ""
      },
      listRol: [
                  {text: "Administrador", value: 1},
                  {text: "Operador", value: 2},
                  {text: "Contratista", value: 3}
        ],
      rules:[ v => !!v || 'Requerido' ],
    }
  },
  methods:{
    show(){
      this.getUsuario()
      this.dialog = true;
    },
   async editarUsuario(){
      try {
        if(this.$refs.form.validate()){
          await axios.put(`user/${this.id}`, this.usuario ,{
              headers: { Authorization: `Bearer ${this.token}` },
            })
            .then(()=>{
              this.alertMsg = "Usuario actualizado correctamente"
              this.alertType = "success"
              this.alertShow = true;
              this.$refs.form.reset();
              this.$emit('click');
            })
      }
      } catch (error) {
        console.log(error)
        this.alertMsg = "Hubo un error al processar tu solicitud"
        this.alertType = "error"
        this.alertShow = true;
      }
    },
    async getUsuario(){
      try {
      await axios.get(`user/${this.id}`,{
        headers: { Authorization: `Bearer ${this.token}` },
      }).then(resp=>{
        this.usuario = resp.data.data
      })  
      } catch (error) {
        
      }
    },
      hide(){
        this.$refs.form.reset();
        this.dialog = false;
      },
  }
}
</script>

<style>
</style>
