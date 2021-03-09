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
              <v-btn color="primary" text @click="editarInstrumento">
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
    id: String,
    required: true
  },
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
        magnitud_id: '',
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
    show(){
      this.getUnidad();
      this.getMagnitud();
      this.getInstrumento();
      this.getInstrumentoTipo();
      this.dialog = true;
    },
   async editarInstrumento(){
      try {
        if(this.$refs.form.validate()){
          this.instrumento.tipo_id = this.instrumentoTipo[this.instrumento.tipo_id];
          this.instrumento.unidad_id = this.instrumentoUnidad[this.instrumento.unidad_id];
          this.instrumento.magnitud_id = this.instrumentoUnidad[this.instrumento.magnitud_id];
          console.log('InstrumentoEnviado:', this.instrumento);
          await axios.post('instrumento', this.instrumento ,{
              headers: { Authorization: `Bearer ${this.token}` },
            })
            .then(()=>{
              this.alertMsg = "Instrumento actualizado correctamente"
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
   async getInstrumento(){
        try {
         await axios.put(`instrumento/${this.id}`,this.item, {
            headers: { Authorization: `Bearer ${this.token}` },
          })
          .then((res)=>{
            console.log('EditarInst:',res.data.data);
            this.instrumento = res.data.data;
            this.instrumento.magnitud_id ='Dato de prueba'
          })
          } catch (error) {
            console.log(error)
          }
        },
    getInstrumentoTipo(){
        try {
          axios.get('instrumentoTipo', {
            headers: { Authorization: `Bearer ${this.token}` },
          })
          .then((res)=>{
            for (const item of res.data.data) {
              this.instrumentoTipo[item.nombre] = item.id ;
            }
          })
          } catch (error) {
            console.log(error)
          }
        },
      getUnidad(){
        try {
          axios.get('unidad', {
            headers: { Authorization: `Bearer ${this.token}` },
          })
          .then((res)=>{
            for (const item of res.data.data) {
              this.instrumentoUnidad[item.nombre] = item.id ;
            }
          })

          } catch (error) {
            console.log(error)
          }

      },
      getMagnitud(){
      try {
        axios.get('magnitud', {
          headers: { Authorization: `Bearer ${this.token}` },
        })
        .then((res)=>{
          for (const item of res.data.data) {
            this.instrumentoMagnitud[item.nombre] = item.id ;
          }
        })

        } catch (error) {
          console.log(error)
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
