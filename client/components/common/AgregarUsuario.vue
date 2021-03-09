<template>
  <div class="d-flex justify-end">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
      <v-btn
      @click="dialog=true"
        color="primary"
        dark
        class="mb-2"
        v-bind="attrs"
        v-on="on"
      >
        Agregar
      </v-btn>
    </template>
          <span>Agregar Usuario</span>
        </v-tooltip>

        <v-dialog v-model="dialog" width="500">
          <v-card>
            <v-card-title class="headline white--text blue darken-4">
              Agregar Usuario
            </v-card-title>

            <v-card-text>
              <v-form ref="form" lazy-validation v-model="valid">
                <v-container>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field 
                      v-model="instrumento.marca"
                      label="Nombre"
                      :rules="rules"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field 
                      v-model="instrumento.modelo"
                      label="Apellido"
                      :rules="rules"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="6">
                      <v-text-field 
                      v-model="instrumento.serie"
                      label="Email"
                      :rules="rules"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="6">
                         <v-text-field 
                      v-model="instrumento.serie"
                      label="Empresa"
                      :rules="rules"
                      >
                         </v-text-field>
                    </v-col>
                  </v-row>
                   <v-row>
                    <v-col cols="6">
                      <v-select
                      v-model="instrumento.tipo_id"
                      label="Rol"
                      :items="listRol"
                      :rules="rules"
                      >
                      </v-select>
                      
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
              <v-btn color="primary" text @click="agregarInstrumento">
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
  data() {
    return {
      valid:false,
      token: Cookies.get('token'),
      dialog: false,
      alertShow: false,
      alertMsg:'',
      alertType:'success',
      instrumentoTipo:[],
      instrumentoUnidad:[],
      instrumentoMagnitud:[],
      instrumento:{
        marca: "",
        modelo: "",
        serie: "",
        rango_de: null,
        rango_a: null,
        rango_normal_de: null,
        rango_normal_a: null,
        resolucion: null,
        tolerancia: null, 
        tipo_id: null,
        unidad_id: null,
        magnitud_id: null,
        encargado_calibracion: Cookies.get('user_id')
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
   async agregarInstrumento(){
      try {
        if(this.$refs.form.validate()){
          await axios.post('instrumento', this.instrumento ,{
              headers: { Authorization: `Bearer ${this.token}` },
            })
            .then(()=>{
              this.alertMsg = "Usuario agregado correctamente"
              this.alerType = "success"
              this.alertShow = true;
              this.$refs.form.reset();
              this.$emit('click');
            })
      }
      } catch (error) {
        console.log(error)
        this.alertMsg = "Hubo un error al processar tu solicitud"
        this.alerType = "error"
        this.alertShow = true;
      }
    },
    hide(){
      this.$refs.form.reset();
      this.dialog = false;
    },
},
  created(){
    //this.getInstrumentoTipo();
    //this.getUnidad();
    //this.getMagnitud();
  }
}
</script>

<style>
</style>
