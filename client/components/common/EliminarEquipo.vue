<template>
  <div>
    <v-icon small @click="dialog=true"> mdi-delete </v-icon>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="headline blue darken-4 white--text">
          Eliminar Equipo
        </v-card-title>

        <v-card-subtitle class="mt-5 Subtitle 1">
            <strong><h3>¿Está seguro de que desea eliminar el equipo?</h3></strong>
        </v-card-subtitle>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="dialog=false">
            Cancelar
          </v-btn>
          <v-btn color="blue darken-1" text @click="deleteItem(id)">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props:{
    id:Number,
    required:true
  },
  data(){
    return{
      dialog:false
    }
  },
  methods:{
    deleteItem(id){
      this.dialog = false;
    }
  }
}
</script>

<style>
</style>