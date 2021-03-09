<template>
  <div class="d-flex justify-end">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              v-bind="attrs"
              v-on="on"
              @click="dialog = true"
            >
              Agregar
            </v-btn>
          </template>
          <span>Agregar Instrumento</span>
        </v-tooltip>

        <v-dialog v-model="dialog" width="500">
          <v-card>
            <v-card-title class="headline white--text blue darken-4">
              Agregar Instrumento
            </v-card-title>

            <v-card-text>
              <v-form ref="form" lazy-validation v-model="valid">
                <v-container>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field 
                      v-model="instrumento.marca"
                      label="Marca"
                      :rules="rules"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field 
                      v-model="instrumento.modelo"
                      label="Modelo"
                      :rules="rules"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="6">
                      <v-text-field 
                      v-model="instrumento.serie"
                      label="Serie"
                      :rules="rules"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-autocomplete
                      v-model="instrumento.tipo_id"
                      label="Tipo"
                      :items="Object.keys(instrumentoTipo)"
                      :rules="rules"
                      >
                      </v-autocomplete>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="6">
                      <v-text-field 
                      v-model="instrumento.resolucion"
                      label="Resolución"
                      :rules="rules"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                      v-model="instrumento.tolerancia" 
                      label="Tolerancia"
                      :rules="rules"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>


                  <v-row>
                    <v-col cols="6">
                      <v-select
                      v-model="instrumento.unidad_id"
                      label="Unidad"
                      :items="Object.keys(instrumentoUnidad)"
                      :rules="rules"
                      >
                      </v-select>
                    </v-col>
                    <v-col cols="6">
                      <v-select
                      v-model="instrumento.magnitud_id"
                      label="Magnitud"
                      :items="Object.keys(instrumentoMagnitud)"
                      :rules="rules"
                      >
                      </v-select>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                      v-model="instrumento.rango_de" 
                      label="Rango de"
                      :rules="rules"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field 
                      v-model="instrumento.rango_a"
                      label="Rango a"
                      :rules="rules"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="6">
                      <v-text-field 
                      v-model="instrumento.rango_normal_de"
                      label="Rango normal de"
                      :rules="rules"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field 
                      v-model="instrumento.rango_normal_a"
                      label="Rango normal a"
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
      rules:[ v => !!v || 'Requerido' ],
    }
  },
  methods:{
   async agregarInstrumento(){
      try {
        if(this.$refs.form.validate()){
          this.instrumento.tipo_id = this.instrumentoTipo[this.instrumento.tipo_id];
          this.instrumento.unidad_id = this.instrumentoUnidad[this.instrumento.unidad_id];
          this.instrumento.magnitud_id = this.instrumentoUnidad[this.instrumento.magnitud_id];
          console.log('Instrumentoer:', this.instrumento);
          await axios.post('instrumento', this.instrumento ,{
              headers: { Authorization: `Bearer ${this.token}` },
            })
            .then(()=>{
              this.alertMsg = "Instrumento agregado correctamente"
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
    getInstrumentoTipo(){
        try {
          axios.get('instrumentoTipo', {
            headers: { Authorization: `Bearer ${this.token}` },
          })
          .then((res)=>{
            for (const item of res.data.data) {
              this.instrumentoTipo[item.nombre] = item.id ;
            }
            console.log('instrumento Tipo:', this.instrumentoTipo);
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
            console.log('instrumento Unidad:', this.instrumentoUnidad);
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
        console.log('instrumento Magnitud:', this.instrumentoMagnitud);
      })

      } catch (error) {
        console.log(error)
      }

  }
},
  created(){
    this.getInstrumentoTipo();
    this.getUnidad();
    this.getMagnitud();
  }
}
</script>

<style>
</style>
