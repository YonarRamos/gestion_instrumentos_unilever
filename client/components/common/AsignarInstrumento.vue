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
              @click="show"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>Asignar Instrumento</span>
        </v-tooltip>

        <v-dialog v-model="dialog" width="500">
          <v-card>
            <v-card-title class="headline white--text blue darken-4">
              Asignar Instrumento
            </v-card-title>

            <v-card-text>
              <v-form ref="form" lazy-validation v-model="valid">
                <v-container>
                  <v-row>
                <v-col cols="12" class="px-0">
                  <v-card flat style="border: 2px solid lightgray;" color="#F9F9F9">
                    <v-autocomplete
                      v-model="seleccionado"
                      :items="Object.keys(instrumentosDisponibles)"
                      label="Seleccione un Instrumento disponible:"
                      class="mx-3"
                       clearable
                      @change="mostrarInstrumento"
                    >
                    </v-autocomplete>
                  </v-card>

              <v-col>
                <div class="overline">
                  Asigne un instrumento Nuevo
                </div>
                <v-divider></v-divider>
              </v-col>

              </v-col>
                    <v-col cols="6">
                      <v-text-field 
                      v-model="instrumento.marca"
                      label="Marca"
                      :disabled="manual"  
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field 
                      v-model="instrumento.modelo"
                      label="Modelo"
                      :disabled="manual"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="6">
                      <v-text-field 
                      v-model="instrumento.serie"
                      label="Serie"
                      :disabled="manual"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-autocomplete
                      v-model="instrumento.tipo_id"
                      label="Tipo"
                      :items="instrumentosTipo"
                      item-text="nombre"
                      :disabled="manual"
                      >
                      </v-autocomplete>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="6">
                      <v-text-field 
                      v-model="instrumento.resolucion"
                      label="Resolución"
                      :disabled="manual"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                      v-model="instrumento.tolerancia" 
                      label="Tolerancia"
                      :disabled="manual"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>


                  <v-row>
                    <v-col cols="6">
                      <v-autocomplete
                      v-model="instrumento.unidad_id"
                      label="Unidad"
                      :items="instrumentoUnidad"
                      item-text="nombre"
                      :disabled="manual"
                      >
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="6">
                      <v-autocomplete 
                      v-model="instrumento.magnitud_id"
                      label="Magnitud"
                      :items="instrumentoMagnitud"
                      item-text="nombre"
                      :disabled="manual"
                      >
                      </v-autocomplete>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="6">
                      <v-text-field 
                      v-model="instrumento.rango_a"
                      label="Rango A"
                      :disabled="manual"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                      v-model="instrumento.rango_de" 
                      label="Rango DE"
                      :disabled="manual"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="6">
                      <v-text-field 
                      v-model="instrumento.rango_normal_a"
                      label="Rango Normal A"
                      :disabled="manual"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field 
                      v-model="instrumento.rango_normal_de"
                      label="Rango Normal DE"
                      :disabled="manual"
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
              <v-btn v-if="manual" color="primary" text @click="editarEquipo(equipoActualizado)">
                Asignar Instrumento
              </v-btn>
              <v-btn v-if="!manual" color="primary" text @click="agregarInstrumento">
                Asignar Instrumento Nuevo
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
    equipo:{
      type: Object,
      required: true
    },
    equipoID:{
      type: String,
      required: true
    }
  },
  data() {
    return {
      manual:false,
      valid:false,
      token: Cookies.get('token'),
      dialog: false,
      alertMsg:"",
      alertType:"",
      alertShow:false,
      instrumentosTipo:[],
      instrumentoUnidad:[],
      instrumentoMagnitud:[],
      instrumentosDisponibles:[],
      seleccionado:null,
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
      equipoActualizado:{
        tag:"",
        serie_requerido: 0,
        sector_id: null,
        instrumento_id: null,
        instrumento_serie: '',
        descripcion: ""
      },
      rules:[ v => !!v || 'Requerido' ],
    }
  },
  methods:{
  handleInput (valor) {
    this.instrumento.tipo_id = valor;
  },
   getInstrumentList(){
    try {
        axios.get('instrumentoslist', {
          headers: { Authorization: `Bearer ${this.token}` },
        })
        .then((res)=>{
          for (const item of res.data.data) {
            this.instrumentosDisponibles[item.serie] = item.id;
          }
        })
    } catch (error) {
      console.log(error)
    }
  },
    editarEquipo(equipoActualizado){
      equipoActualizado.serie_requerido == true ? equipoActualizado.serie_requerido = 1 : equipoActualizado.serie_requerido = '0';
      try {
           axios.put(`equipo/${this.equipoID}`, equipoActualizado, {
             headers: { Authorization: `Bearer ${this.token}` },
           })
           .then((resp)=>{
               this.alertMsg = `Se ha actualizado en instrumento Asociado al equipo ${equipoActualizado.tag}`;
                this.alertType = 'success';
                this.alertShow = true;
                this.$emit('click');
           })

      } catch (error) {
        console.log(error)
        this.alertMsg = error;
        this.alertType = 'error';
        this.alertShow = true;
      }
    },
  async mostrarInstrumento(){
   try { 
    if(this.seleccionado != null){
      let id = this.instrumentosDisponibles[this.seleccionado];
        await axios.get(`instrumento/${id}`,{
                headers: { Authorization: `Bearer ${this.token}` },
              })
              .then((res)=>{
                this.instrumento = res.data.data
                let indexTipo = this.instrumentosTipo.findIndex(p => p.id == this.instrumento.tipo_id);
                let indexUnidad = this.instrumentoUnidad.findIndex(p => p.id == this.instrumento.unidad_id);
                let indexMagnitud = this.instrumentoMagnitud.findIndex(p => p.id == this.instrumento.magnitud_id);
                this.instrumento.tipo_id = this.instrumentosTipo[indexTipo].nombre;
                this.instrumento.unidad_id = this.instrumentoUnidad[indexUnidad].nombre;
                this.instrumento.magnitud_id = this.instrumentoMagnitud[indexMagnitud].nombre;
                //Llenamos los datos del equipo actualizando el id
                this.equipoActualizado.instrumento_id = id
                this.equipoActualizado.tag = this.equipo.tag
                this.equipoActualizado.serie_requerido = this.equipo.serie_requerido
                this.equipoActualizado.instrumento_serie = this.equipo.instrumento_serie
                this.equipoActualizado.serie_requerido = this.equipo.serie_requerido
                this.equipoActualizado.descripcion = this.equipo.descripcion
              })
          }else{
            this.$refs.form.reset();
          }
      
    } catch (error) {
      console.log(error)
      this.$refs.form.reset();
    }
  },
   async agregarInstrumento(){
      try {
        if(this.$refs.form.validate()){
        let indexTipo = this.instrumentosTipo.findIndex(p => p.nombre == this.instrumento.tipo_id);
        let indexUnidad = this.instrumentoUnidad.findIndex(p => p.nombre == this.instrumento.unidad_id);
        let indexMagnitud = this.instrumentoMagnitud.findIndex(p => p.nombre == this.instrumento.magnitud_id);
        this.instrumento.tipo_id = this.instrumentosTipo[indexTipo].id;
        this.instrumento.unidad_id = this.instrumentoUnidad[indexUnidad].id;
        this.instrumento.magnitud_id = this.instrumentoMagnitud[indexMagnitud].id;

        await axios.post('instrumento', this.instrumento ,{
            headers: { Authorization: `Bearer ${this.token}` },
          })
          .then((res)=>{
            console.log('Instrumento nuevo:',res.data.data.id);
            let id = res.data.data.id;
            //Llenamos los datos del equipo actualizando el id
            this.equipoActualizado.instrumento_id = id
            this.equipoActualizado.tag = this.equipo.tag
            this.equipoActualizado.serie_requerido = this.equipo.serie_requerido
            this.equipoActualizado.instrumento_serie = this.equipo.instrumento_serie
            this.equipoActualizado.serie_requerido = this.equipo.serie_requerido
            this.equipoActualizado.descripcion = this.equipo.descripcion
            this.editarEquipo(this.equipoActualizado);
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
      this.alertShow = false;
      this.getInstrumentList();
    },
    show(){
      this.getUnidad();
      this.getMagnitud();
      this.getInstrumentoTipo();
      this.getInstrumentList();
      this.dialog = true;
    },
    getInstrumentoTipo(){
        try {
          axios.get('instrumentoTipo', {
            headers: { Authorization: `Bearer ${this.token}` },
          })
          .then((res)=>{
            for (const item of res.data.data) {
              this.instrumentosTipo.push({id:item.id, nombre:item.nombre});
            }
            console.log('instrumento Tipo:', this.instrumentosTipo);
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
              this.instrumentoUnidad.push({id:item.id, nombre:item.nombre});
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
          this.instrumentoMagnitud.push({id:item.id, nombre:item.nombre});
        }
      })

      } catch (error) {
        console.log(error)
      }

  }
},
mounted(){
  this.getInstrumentList();
},
watch:{
  seleccionado: function () {
    if(this.seleccionado != null){
      this.manual = true;
      }else{this.manual = false}
    }
}
}
</script>

<style>
</style>
