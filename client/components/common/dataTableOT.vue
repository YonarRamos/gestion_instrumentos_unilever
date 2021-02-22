<template>
  <v-card color="#EBEDEF">
    <v-simple-table class="table-responsive" @keyup.enter="addRow">
      <template v-slot:default>
        <thead >
          <tr>
            <th class="text-left">Item</th>
            <th class="text-left">Seccion</th>
            <th class="text-left">Titulo</th>
            <th class="text-left">Real</th>
            <th class="text-left">Estado</th>
            <th class="text-left">Observaciones</th>
            <th class="text-left">Imagenes</th>
            <th class="text-left">Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in arrayOT" :key="i">
            <td data-label="Item" style="border: hidden" >
              <v-chip dark class="mt-2" color="primary">
                {{i+1}}
              </v-chip>
            </td>
            <td data-label="Sección" style="border: hidden">
              <v-text-field
                class="my-2"
                v-model="arrayOT[i].seccion"
                outlined
                dense
                hide-details
              ></v-text-field>
            </td>
            <td data-label="Título" style="border: hidden">
              <v-text-field
                class="my-2"
                v-model="arrayOT[i].titulo"
                outlined
                dense
                hide-details
              />
            </td>
            <td data-label="Real" style="border: hidden">
              <v-chip class="px-0 " style="height:40px" color="grey" label outlined >
                <v-checkbox
                  color="primary"
                  class="ml-2"
                  v-model="arrayOT[i].real"
                ></v-checkbox
              ></v-chip>
            </td>
            <td data-label="Estado" style="border: hidden">
              <div class="radio d-flex">
                <v-spacer></v-spacer>
                <v-radio-group v-model="arrayOT[i].estado" class="ma-0 pa-0" hide-details dense row>
                  <v-radio class="ma-0 pa-0 mr-1" label="Ver" color="primary" value="ver"></v-radio>
                  <v-radio class="ma-0 pa-0" label="Ok" color="primary" value="ok"></v-radio>
                </v-radio-group>
              </div> 
            </td>
            <td data-label="Descripción" style="border: hidden">
              <v-textarea v-model="arrayOT[i].observaciones" dense outlined rows="1" hide-details class="my-2"/>
            </td>
            <td data-label="Imagenes" style="border: hidden">
              <v-file-input accept="image/png, image/jpeg, image/bmp" :placeholder="files.length > 0 ? `${files.length} imagenes` : '0_imagenes'" prepend-icon prepend-inner-icon="mdi-camera" dense outlined hide-details v-model="arrayOT[i].imagenes" multiple ></v-file-input>
            </td>
            <td data-label="Eliminar" style="border: hidden">
              <v-btn x-small fab color="error" class="btn" dark @click="deleteRow(i)"><v-icon>delete</v-icon></v-btn>
            </td>
          </tr>
          <hr/>
<!--****************************** CURRENT ITEM ****************************************-->
          <tr style="background:#F0F0F0">
            <td data-label="Item"  style="border: hidden">
              <v-chip dark class="mt-2" color="grey">
               1
              </v-chip>
            </td>
            <td data-label="Sección">
              <v-text-field
                class="my-2"
                v-model="currentItem.seccion"
                outlined
                dense
                hide-details
                background-color="white"
                @keyup.enter="addRow"
                ref="seccion"
              />
            </td>
            <td data-label="Título">
              <v-text-field
                class="my-2"
                v-model="currentItem.titulo"
                outlined
                dense
                hide-details
                background-color="white"
                @keydown.enter="addRow"
              />
            </td>
            <td data-label="Real">
              <v-chip class="px-0 " style="height:40px" color="grey" label outlined >
                <v-checkbox
                  color="#808080"
                  class="ml-2"
                  v-model="currentItem.real"
                ></v-checkbox
              ></v-chip>
            </td>
            <td data-label="Estado">
              <div class="radio d-flex">
                <v-spacer></v-spacer>
                <v-radio-group v-model="currentItem.estado" class="ma-0 pa-0" hide-details dense row>
                  <v-radio class="ma-0 pa-0 mr-1" label="Ver" color="grey" value="ver"></v-radio>
                  <v-radio class="ma-0 pa-0" label="Ok" color="grey" value="ok"></v-radio>
                </v-radio-group>
              </div> 
            </td>
            <td data-label="Descripción">
              <v-textarea v-model="currentItem.observaciones" @keydown.enter="addRow" dense outlined rows="1" hide-details class="my-2" background-color="white"/>
            </td>
            <td data-label="Imagenes">
              <observaciones-ot class="img" ref="obs"  @filesImg="files = $event" v-model="currentItem.imagenes"/>
            </td>
            <td data-label="Agregar">
              <v-btn ref="filaActual" x-small fab color="success" dark class="btn" @click="addRow"><v-icon>add</v-icon></v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
import ObservacionesOt from './observacionesOt.vue'
import { mapMutations, mapState } from 'vuex'
export default {
   props: {
    arrayOT: {
      type: Array,
      require: true,
    },
  },
  components: {
    ObservacionesOt,
  },
  data() {
    return {
      currentItem: {
        updated:"",
        item: this.arrayOT ? this.arrayOT.length + 1 : 1,
        seccion: '',
        titulo: '',
        real: false,
        estado: 'ver',
        observaciones: '',
        imagenes: []
      },
      indice: 1,
      files: [],
      search: '',
      headers: [
        { text: 'Item', value: 'itemTb', align: 'center', sortable: false },
        { text: 'Sección', value: 'seccion', align: 'center', sortable: false },
        { text: 'Título', value: 'titulo', align: 'center', sortable: false },
        { text: 'Real', value: 'real', align: 'center', sortable: false },
        { text: 'Estado', value: 'estado', align: 'center', sortable: false },
        {
          text: 'Observaciones',
          value: 'observaciones',
          align: 'center',
          sortable: false,
        },
        {
          text: 'Imágenes',
          value: 'imagenes',
          align: 'center',
          sortable: false,
        },
      ],
    }
  },
  computed:{
  },
  methods: {
    addRow() {
      this.currentItem.updated = new Date(Date.now()).toISOString().slice(0,10);
      this.currentItem.imagenes = this.files
      this.arrayOT.push(this.currentItem);
      console.log(this.currentItem);
      this.currentItem = {
        updated:this.fecha,
        item: this.arrayOT ? this.arrayOT.length + 1 : 1,
        seccion: '',
        titulo: '',
        real: false,
        estado: 'ver',
        observaciones: '',
        imagenes:[]
      }
      this.files=[]
      this.$refs.obs.clearFiles()
      let options = { duration: 1000 };
    this.$vuetify.goTo(this.$refs.filaActual.$el, options);
    this.$refs.seccion.focus();
    },
    deleteRow(index){
      this.arrayOT.splice(index, 1)
    }
  },
  created() {},
}
</script>

<style lang="css" scoped>
hr {
border: 0px; /* le sacamos el borde! */
height: 2px; /* le asignamos una altura */
background-color: white; /* le ponemos el color que deseamos */
}
thead{
  background-color: #808080;
  border-top-right-radius: 15px ;
}
th{
  color: white !important;
}
@media screen and (max-width: 600px) {
  table {
    border: 0;
  }

  table caption {
    font-size: 1.3em;
  }

  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  table tr {
    border-bottom: 6px solid #ddd;
    display: block;
  }

  table td {
    display: block;
    font-size: 0.8em;
    text-align: right;
    padding-right: 10px;
  }

  table td::before {
    content: attr(data-label);
    float: left;
    font-weight: bold;
    padding-top: 10px;
    padding-right: 10px;
  }
  td .radio{
   padding-top: 10px;
   align-self: flex-end;

  }
  td .img{
   padding-top: 4px;
   align-self: flex-end;

  }

  td .btn{
    margin-top: 8px;
    align-self: flex-end;

  }
}
</style>