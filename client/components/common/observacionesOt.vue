<template>
  <div>
    <v-text-field
      @click="dialog = true"
      prepend-inner-icon="mdi-camera"
      readonly
      hide-details
      outlined
      background-color="white"
      dense
      :placeholder="files.length > 0 ? `${files.length} imagenes` : 'Importar imagenes'"
      style="cursor:pointer"
    />

    <v-dialog v-model="dialog" width="500px">
        <v-card class="pt-2">
          <v-card class="pa-2 mx-2" color="grey lighten-3">
            <v-file-input
            accept="image/png, image/jpeg, image/bmp"
            v-model="files"  
            dense 
            small-chips 
            outlined 
            hide-details 
            placeholder="Puede imortar una o varias imagenes a la vez" 
            multiple
            background-color="white"
            @change="onAddFiles"/>
          </v-card>

        <v-sheet class="mx-auto" max-width="800" >

              <v-card
                height="100"
                max-width="700"
                class="ma-6 d-flex justify-center"
                 v-if="files.length <= 0"
                 flat
              >
              <v-card-title class="grey--text">No hay imagenes seleccionadas</v-card-title>
              </v-card>
  
          <v-slide-group
            class="pa-4"
            active-class="success"
            show-arrows
            v-if="files.length > 0"
          >
            <v-slide-item
              v-for="(n,i) in previews"
              :key="i"
              v-slot="{ active, toggle }"
            >
              <v-card
                :color="active ? undefined : 'grey lighten-1'"
                class="ma-2"
                height="100"
                width="100"
                @click="toggle"
              >
                <v-img height="100" :src="n.path"></v-img>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>
      <v-divider />
        <v-card-actions>
          <v-spacer/>
          <v-spacer/><v-btn color="error" @click="clearFiles"> Cancelar </v-btn>
          <v-btn color="success" @click="enviarDatos"> Aceptar </v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      menu: false,
      chip1: true,
      previews: [],
      files:[]
    }
  },
  methods: {
      onAddFiles(files) {
        console.log('It works')
        this.previews = []
        files.forEach((file, index) => {
          const reader = new FileReader()
          reader.addEventListener('load', (e) => {
            this.previews.push({
              name: `archivo ${index}`,
              path: reader.result.toString(),
            })
          })
          reader.addEventListener(
            'error',
            (e) => (this.previews[index] = this.errorImage)
          )
          reader.readAsDataURL(file)
        })
      },
      clearFiles(){
        this.files=[]
        this.dialog=false
      },
      enviarDatos(){
      this.dialog = false
      this.$emit('filesImg', this.files)
      }
  },
}
</script>

<style lang="css" scoped>
.topright {
  position: absolute;
  top: 8px;
  right: 16px;
  font-size: 18px;
}
input:hover{
  cursor: pointer;
}
</style>