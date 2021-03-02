<template>
  <div class="d-flex justify-end">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              depressed
              x-small
              height="30"
              color="info"
              v-bind="attrs"
              v-on="on"
              @click="dialog = true"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>Agregar Tarea</span>
        </v-tooltip>

        <v-dialog v-model="dialog" width="500">
          <v-card>
            <v-card-title class="headline white--text blue darken-4">
              Agregar  Nueva Tarea
            </v-card-title>

            <v-card-text>
              <v-form ref="form" lazy-validation v-model="valid">
                <v-container>
<!--                   <v-row>
                    <v-col cols="12">
                      <h3>Modelo:{{instrumento.instrumento_modelo}}</h3>
                      <h3>Marca:{{instrumento.instrumento_marca}}</h3>
                    </v-col>
                  </v-row> -->

                  <v-row>
                    <v-col cols="12">
                      <v-select
                      v-model="tarea.calibracion_tipo_id"
                      label="Tipo de Calirbación"
                      :items="Object.keys(calibracionTipo)"
                      :rules="rules"
                      >
                      </v-select>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="tarea.frecuencia"
                        type="number"
                        label="Frecuencia"
                        :rules="rules"
                      ></v-text-field>
                    </v-col>  
                  </v-row>
                  

                  <v-row>
                    <v-col cols="12">

                      <v-card class="pa-5">
                        <v-text-field
                          v-model="tarea.proxima"
                          label="Próxima Calibración"
                          readonly
                        ></v-text-field>

                        <v-date-picker
                          v-model="tarea.proxima"
                          :first-day-of-week="1"
                          locale="es-ar"
                          width="auto"
                        ></v-date-picker>
                      </v-card>

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
              <v-btn color="primary" text @click="agregarTareaCalibracion">
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
    instrumento:{
      type: Object,
      required: true
    }
  },
  data() {
    return {
      picker: new Date().toISOString().substr(0, 10),
      valid:false,
      token: Cookies.get('token'),
      dialog: false,
      alertShow: false,
      alertMsg:'',
      alertType:'success',
      calibracionTipo:[],
      tarea:{
          instrumento_id:null,
          calibracion_tipo_id: 1,
          frecuencia: 45,
          proxima: new Date().toISOString().substr(0, 10),
      },
      rules:[ v => !!v || 'Requerido' ],
    }
  },
  methods:{
    agregarTareaCalibracion(){
      const obj = this.tarea;
      this.$emit('nuevaTarea', obj);
      this.$refs.form.reset();
      this.dialog = false;
      try {
/*         if(this.$refs.form.validate()){
          this.tarea.instrumento_id = this.instrumento.intrumento_id;
          this.tarea.calibracion_tipo_id = this.calibracionTipo[this.tarea.calibracion_tipo_id];
          console.log('Nueva Tarea', this.tarea);
          axios.post('calibracion', this.tarea ,{
              headers: { Authorization: `Bearer ${this.token}` },
            })
            .then(()=>{
              this.alertMsg = "Instrumento agregado correctamente"
              this.alerType = "success"
              this.alertShow = true;
              this.$refs.form.reset();
              this.$emit('nuevaTarea', obj);
            }) 
      }*/
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
    getCalibracionTipo(){
        try {
          axios.get('calibracionTipo', {
            headers: { Authorization: `Bearer ${this.token}` },
          })
          .then((res)=>{
            for (const item of res.data.data) {
              this.calibracionTipo[item.nombre] = item.id ;
            }
            console.log('Calibracion Tipo:', this.calibracionTipo);
          })
          } catch (error) {
            console.log(error)
          }
        }
},
  created(){
 this.getCalibracionTipo();
  }
}
</script>

<style>
</style>
