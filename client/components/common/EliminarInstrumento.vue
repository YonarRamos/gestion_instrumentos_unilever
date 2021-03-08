<template>
  <div>
    <v-icon small @click="dialog=true"> mdi-delete </v-icon>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="headline blue darken-4 white--text">
          Eliminar Instrumento
        </v-card-title>

        <v-card-subtitle class="mt-5 Subtitle 1">
            <strong><h3>¿Está seguro de que desea eliminar este instrumento.?</h3></strong>
        </v-card-subtitle>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="dialog=false">
            Cancelar
          </v-btn>
          <v-btn color="blue darken-1" text @click="deleteItem">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Modal msj una vez Eliminado-->
    <v-dialog
      v-model="dialogEliminado"
      persistent
      max-width="435">
      <v-card>
        <v-card-title class="headline">
          <v-alert width="435" outlined :type="alertType"> 
            {{alertMsg}}
          </v-alert>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="hide"
          >
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <loading :tag="'Borrando Instrumento'"/>

  </div>
</template>

<script>
import axios from '~/plugins/axios'
import Cookies from 'js-cookie'
import { mapMutations } from "vuex";
import Loading from "~/components/common/Loading.vue";
export default {
  components:{
    Loading
  },
  props:{
    id:{
    type: String,
    required:true
    },
  },
  data(){
    return{
      dialog:false,
      dialogEliminado:false,
      alertType:'',
      alertMsg:''
    }
  },
  methods:{
   ...mapMutations(['toggleLoading']),
   async deleteItem() {
      const token = Cookies.get('token');
      this.toggleLoading(true);
      try {
        await axios
          .delete(`instrumento/${this.id}`, {
              headers: { 
                Authorization: `Bearer ${token}`,
                params:{id:this.id} 
              },
        })
        .then(()=>{
          this.dialog = false;
          this.toggleLoading(false);
          this.alertMsg = "Se ha eliminado el instrumento correctamente";
          this.alertType = 'success'
          this.dialogEliminado = true;
          this.$emit('click');
        });
      } catch (error) {
        this.toggleLoading(false);
        this.dialog = false;
        this.alertMsg = `No es posible eliminar este Instrumento ya que está asociado a un equipo`;
        this.alertType = 'error'
        this.dialogEliminado = true;
        console.log('Error Eliminar instrumento:',error);
      }
    },
    hide(){ //oculta el modal despues de eliminar el instrumento.
      this.dialogEliminado = false;
      this.$emit('click');
    }
  }
}
</script>

<style>
</style>