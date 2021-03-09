<template>
  <div>
    <v-icon small @click="show"> mdi-pencil </v-icon>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="headline blue darken-4" style="color:white">
          <span>Editar Equipo</span>
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
                  <v-autocomplete
                  v-model="item.sector_id"
                  :items="sectores"
                  label="Sector"
                  auto-select-first
                  :rules="rules"
                  >
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" md="6">
                  <v-autocomplete
                    v-model="item.instrumento_id"
                    :items="instrumentos"
                    label="Instrumento"
                    auto-select-first
                    :rules="rules"
                  ></v-autocomplete>
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
          <v-btn color="blue darken-1" text @click="editarEquipo">
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
    id:{
      type: Number,
      required : true
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
        instrumento_id: null,
        instrumento_serie: '',
        descripcion: ""
      },
      token: Cookies.get('token')
    }
  },
  methods:{
    show(){
      this.dialog = true;
      this.getSectores();
      this.getEquipo();
    },
    getEquipo(){
      try {

        axios.get(`equipo/${this.id}`,{
          headers: { Authorization: `Bearer ${this.token}` }
        })
        .then((res)=>{

          this.item.tag = res.data.data[0].detalleEquipos.tag;
          this.item.serie_requerido = res.data.data[0].detalleEquipos.serie_requerido;
          this.item.sector_id = res.data.data[0].detalleEquipos.sector_id;
          this.item.instrumento_id = res.data.data[0].detalleEquipos.instrumento_id;
          this.item.descripcion = res.data.data[0].detalleEquipos.descripcion;
          this.item.instrumento_serie = res.data.data[0].detalleEquipos.instrumento_serie;

          this.getInstrumentos();
        });

      } catch (error) {
        console.log(error)
      }
    },
    editarEquipo(){
      try {
         if(this.valid){
           this.item.sector_id = this.item.sector_id;
           this.item.instrumento_id = this.item.instrumento_id;
           this.item.serie_requerido == true ? this.item.serie_requerido = 1 : this.item.serie_requerido = '0';
           axios.put(`equipo/${this.id}`, this.item, {
             headers: { Authorization: `Bearer ${this.token}` },
           })
           .then((resp)=>{
               this.alertMsg = `Equipo ${this.item.tag} actualizado exitosamente.`;
                this.alertType = 'success';
                this.alertShow = true;
                this.$emit('click');
                setTimeout(()=>this.hideModal(), 3000);
           })
         }
      } catch (error) {
        console.log(error)
        this.alertMsg = error;
        this.alertType = 'error';
        this.alertShow = true;
        setTimeout(()=>this.alertShow = false, 3000); 
      }
    },
    getInstrumentos(){
      try {

        axios.get('instrumentoslist',{
          headers:{Authorization: `Bearer ${this.token}`},
          params: {instrumento_id: this.item.instrumento_id}
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
      this.alertShow = false;
      this.$refs.form.reset();
    }
  },
  mounted(){
    
  }
}
</script>

<style>

</style>