<template>
  <div>
    <v-icon small @click="dialog=true"> mdi-delete </v-icon>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="headline blue darken-4 white--text">
          Eliminar Instrumento
        </v-card-title>

        <v-card-subtitle class="mt-5 Subtitle 1">
            <strong><h3>¿Está seguro de que desea eliminar este instrumento</h3></strong>
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
      max-width="400">
      <v-card>
        <v-card-title class="headline">
          <v-alert width="380" outlined type="success"> 
            Se ha eliminado el instrumento correctamente
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
    }
  },
  methods:{
   ...mapMutations(['toggleLoading']),
   async deleteItem() {
      const token = Cookies.get('token');
      this.toggleLoading(true);
      try {
       await axios.delete(`instrumento/${this.id}`, {
          headers: { 
            Authorization: `Bearer ${token}`,
            params:{id:this.id} 
            },
        })
        .then(()=>{
          this.dialog = false;
          this.toggleLoading(false);
          this.dialogEliminado = true;
          this.$emit('click');
        });
      } catch (error) {
        this.toggleLoading(false);
        console.log('Error Eliminar Item:',error);
      }
    },
    hide(){
      this.dialogEliminado = false;
      this.$emit('click');
    }
  }
}
</script>

<style>
</style>