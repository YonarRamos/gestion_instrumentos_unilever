<template>
 <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
        v-bind="attrs"
        v-on="on"
        icon
        text  
        small 
        @click="show"
        >
          <v-icon>mdi-pencil</v-icon>
       </v-btn>
      </template>
      <span>Agregar Sector</span>
    </v-tooltip> 

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="headline blue darken-4" style="color:white">
          <span >Agregar Sector</span>
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

                <v-col cols="12">
                  <v-text-field
                    v-model="sector.nombre"
                    label="Nombre"
                    :rules="rules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-autocomplete
                    v-model="sector.ruta"
                    :items="sectores"
                    label="Sector"
                    auto-select-first
                    :rules="rules"
                  />
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
          <v-btn color="blue darken-1" text @click="agregarSector">
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
import SeleccionarSector from "~/components/common/SeleccionarSector.vue";
import AgregarInstrumento from "~/components/common/AgregarInstrumento.vue";

export default {
  
  components:{
    SeleccionarSector,
    AgregarInstrumento
  },
  data(){
    return{
      valid:false,
      dialog:false,
      alertMsg:"",
      alertType:"",
      alertShow:"",
      rules:[ v => !!v || 'Requerido' ],
      sectores:[],
      sector: {
        nombre:"",
        ruta:""
      },
      token: Cookies.get('token')
    }
  },
  methods:{
    show(){
      this.dialog = true;
      this.getSectores()
    },
   async agregarSector(){
/*       try {
         if(this.$refs.form.validate()){
            await axios.post('equipo', this.item, {
             headers: { Authorization: `Bearer ${this.token}` },
           })
           .then((resp)=>{
             if (resp.data.estado) { */
               this.alertMsg = `Sector agregado exitosamente`;
                this.alertType = 'success';
                this.alertShow = true;
                this.$refs.form.reset();
                setTimeout(()=>this.alertShow = false, 3000);
   /*             this.$emit('click');
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
      } */
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
    },
  },
}
</script>

<style>

</style>