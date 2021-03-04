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
                  label="Serie"
                ></v-checkbox>
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  v-model="item.sector_id"
                  :items="Object.keys(sectores)"
                  label="Sector"
                  :rules="rules"
                ></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  v-model="item.instrumento_id"
                  :items="Object.keys(instrumentos)"
                  label="Instrumento"
                  :rules="rules"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="item.descripcion"
                  label="Descripción"
                  rows="3"
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

export default {
  
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
        instrumento_id: null,
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
           this.item.sector_id = this.sectores[this.item.sector_id];
           this.item.instrumento_id = this.instrumentos[this.item.instrumento_id];
           console.log('Equipo para agregar:', this.item)
            await axios.post('equipo', this.item, {
             headers: { Authorization: `Bearer ${this.token}` },
           })
           .then(()=>{
              this.alertMsg = `Equipo ${this.item.tag} agregado exitosamente.`;
              this.alertType = 'success';
              this.alertShow = true;
              this.$refs.form.reset();
              setTimeout(()=>this.alertShow = false, 3000);
              this.$emit('click');
           })
         }
      } catch (error) {
        console.log(error)
        this.alertMsg = error;
        this.alertType = 'error';
        this.alertShow = true;
      }
    },
    getInstrumentos(){
      try {
        axios.get('instrumento',{
          headers:{Authorization: `Bearer ${this.token}`}
        })
        .then((res)=>{
          for (const item of res.data.data.data) {
            this.instrumentos[item.modelo] = item.id;
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
          for (const item of res.data.sectoresResp) {
            this.sectores[item.name] = item.id;
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
    this.getInstrumentos();
    this.getSectores();
  }
}
</script>

<style>

</style>