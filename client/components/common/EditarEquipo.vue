<template>
  <div>
    <v-icon 
      small 
      @click="dialog = true">
      mdi-pencil
    </v-icon>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="headline blue darken-4" style="color:white">
          <span >Editar Equipo</span>
          <v-spacer></v-spacer>
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.tag"
                  label="Tag"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.descripcion"
                  label="Descripción"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.sector"
                  label="Sector"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.encargado"
                  label="Encargado"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog=false">
            Cancelar
          </v-btn>
          <v-btn color="blue darken-1"  text @click="editarItem(id)">
            Ok
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
      dialog:false,
      editedItem: {
        id: '',
        tag: '',
        descripcion: '',
        sector_id: '',
        empresa: ''
      },
    }
  },
  methods:{
    editarItem(id) {
      this.editedIndex = this.tableData.indexOf(id)
      this.editedItem = Object.assign({}, id)
      this.dialog = true
    },
  }
}
</script>

<style>

</style>