<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        dark
        class="mb-2"
        v-bind="attrs"
        v-on="on"
      >
        Agregar
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="headline blue darken-4" style="color:white">
        <span >Agregar Equipo</span>
        <v-spacer></v-spacer>
        <v-btn
          icon
          dark
          @click="hideModal"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="pb-0">
        <v-container>
          <v-form ref="form" lazy-validation v-model="valid">
            <v-row>

              <v-col cols="9">
                <v-text-field
                  v-model="item.tag"
                  label="Tag"
                  :rules="rules"
                ></v-text-field>
              </v-col>
              <v-col cols="3" >
                <v-checkbox
                  v-model="item.serie_requerido"
                  label="Serie requerido"
                ></v-checkbox>
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  v-model="item.sector_id"
                  :items="sectores"
                  label="Sector"
                  auto-select-first
                  :rules="rules"
                />
              </v-col>
              <v-col cols="9">
                <v-autocomplete
                  v-model="item.instrumento_id"
                  :items="instrumentos"
                  label="Instrumento"
                  :rules="rules"
                ></v-autocomplete>
              </v-col>
              <v-col cols="3" class="d-flex justify-center align-center">
                <agregar-instrumento @click="nuevoInstrumento"/>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="item.descripcion"
                  label="Descripción"
                  rows="1"
                  no-resize
                  :rules="rules"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <!-- Mensaje del request http -->
      <v-col cols="12" v-if="alertShow">
        <v-alert
          dense
          text
          :type="alertType"
          class="mx-4"
        >
          {{alertMsg}}
        </v-alert>
      </v-col>
      <!--Fin Mensaje del request http -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="hideModal">
          Cancelar
        </v-btn>
        <v-btn color="blue darken-1" text @click="agregarEquipo">
          Ok
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from '~/plugins/axios';
import Cookies from 'js-cookie';
import SeleccionarSector from "~/components/common/SeleccionarSector.vue";
import AgregarInstrumento from "~/components/common/AgregarInstrumento.vue";

export default {
  
  components:{
    SeleccionarSector,
    AgregarInstrumento
  },
  watch:{
    dialog: function () {
      if (this.dialog)
      {
        this.getInstrumentos();
        this.getSectores();
      }
      else
      {
        this.hideModal() 
      }
    }
  },

  data(){
    return{
      valid:false,
      dialog:false,
      alertMsg:"",
      alertType:"",
      alertShow:"",
      rules:[ v => !!v || 'Requerido' ],
      instrumentos:[],
      sectores:[],
      item: {
        tag:"",
        serie_requerido: 0,
        sector_id: null,
        instrumento_id:'',
        descripcion: ""
      },
      token: Cookies.get('token')
    }
  },
  methods:{
   async agregarEquipo(){
      try {
         if(this.$refs.form.validate()){
           this.item.serie_requerido == true ? this.item.serie_requerido = 1 : this.item.serie_requerido = 0;
           this.item.sector_id = this.item.sector_id;
           this.item.instrumento_id = this.item.instrumento_id;
           
            await axios.post('equipo', this.item, {
             headers: { Authorization: `Bearer ${this.token}` },
           })
           .then((resp)=>{
             if (resp.data.estado) {
               this.alertMsg = `Equipo ${this.item.tag} agregado exitosamente.`;
                this.alertType = 'success';
                this.alertShow = true;
                this.$refs.form.reset();
                setTimeout(()=>this.alertShow = false, 3000);
                this.$emit('click');
             }
             else
             {
                this.alertMsg = resp.data.message;
                this.alertType = 'error';
                this.alertShow = true;
             }
              
           })
         }
      } catch (error) {
        console.log(error)
        this.alertMsg = error;
        this.alertType = 'error';
        this.alertShow = true;
      }
    },
    nuevoInstrumento(){
      this.getInstrumentos();
     /* this.item.instrumento_id = this.instrumentos[parseInt(this.instrumentos.length-1)].serie */;

    },
    getInstrumentos(){
      try {
        axios.get('instrumentoslist',{
          headers:{Authorization: `Bearer ${this.token}`}
        })
        .then((res)=>{
          for (const item of res.data.data) {
            this.instrumentos.push({ text: item.serie , value: item.id});
          }
        });

      } catch (error) {
        console.log('error instrumentos', error)
      }
    },
    getSectores(){
      try {
        axios.get('sector',{
          headers:{Authorization: `Bearer ${this.token}`}
        })
        .then((res)=>{
          for (const item of res.data.listRutas) {
            this.sectores.push({ text: item.ruta , value: item.i});
          }
        })
      } catch (error) {
        console.log('error Sector', error)
      }
    },
    hideModal(){
      this.dialog = false;
      this.$refs.form.reset();
    }
  },
  mounted(){
  }
}
</script>

<style>

</style>