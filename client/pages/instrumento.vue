<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title style="box-shadow: 1px 2px 4px #888888">
              Instrumento
            </v-card-title>

            <v-divider></v-divider>
            <v-row>
              <v-col>
                <filtro />
                <v-divider></v-divider>
              </v-col>
            </v-row>
            <v-data-table
              :headers="headers"
              :items="tableData"
              :options.sync="options"
              :loading="loading"
              multi-sort
              class="elevation-1"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-text-field
                    append-icon="mdi-magnify"
                    label="Buscar"
                    single-line
                    hide-details
                    @keyup.enter="date"
                    v-model="txtBuscar"
                  ></v-text-field>

                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="error"
                    
                    class="mr-3 mb-2"
                  >
                    Limpiar Filtros
                  </v-btn>
                  <agregar-instrumento-index @click="getInstrumentos" />
                </v-toolbar>
              </template>

              <template v-slot:[`item.tag`]="{ item }">
                <nuxt-link :to="`detalle_equipo/${item.id}`" :exact="true">
                  <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        fab
                        small
                        depressed
                        class="tag"
                        v-bind="attrs"
                        v-on="on"
                      >
                        {{ item.tag }}
                      </v-btn>
                    </template>
                    <span>Ver Detalle</span>
                  </v-tooltip>
                </nuxt-link>
              </template>
              <template v-slot:[`item.acciones`]="{ item }">
                <v-row class="d-flex justify-center">
                  <!--<v-icon small @click="downloadCert(item.instrumento_id)">
                    mdi-download
                  </v-icon>-->
                  <editar-instrumento
                    :id="item.id"
                    class="mr-2"
                    @click="getInstrumentos"
                  />
                  <eliminar-instrumento
                    :id="item.id"
                    @click="getInstrumentos"
                  />
                </v-row>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Filtro from '@/components/public/Filtro';
import EditarInstrumento from "~/components/common/EditarInstrumento.vue";
import EliminarInstrumento from "~/components/common/EliminarInstrumento.vue";
import axios from '~/plugins/axios'
import { mapMutations, mapState } from 'vuex'
import Cookies from 'js-cookie'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
export default {
  middleware: 'NOAUTH',
  components: {
    Filtro,
    EditarInstrumento,
    EliminarInstrumento
  },
  data: () => ({
    instrumento_id:null,
    token: Cookies.get('token'),
    benched: 0,
    items: [],
    itemsSelected: [],
    loading: false,
    options: {},
    txtBuscar: '',
    filtroTree: undefined,
    listRutas: [],
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
   
    headers: [
      { text: 'estado', align: 'start', value: 'estado' },
      { text: 'Marca', value: 'marca' },
      { text: 'Modelo', value: 'modelo' },
      { text: 'Serie', value: 'serie' },
      { text: 'Rango_de', value: 'rango_de' },
      { text: 'Rango_a', value: 'rango_a' },
      { text: 'Rango_normal_de', value: 'rango_normal_de' },
      { text: 'Rango_normal_a', value: 'rango_mormal_a' },
      { text: 'Resolucíon', value: 'resolucion' },
      { text: 'Tolerancia', value: 'tolerancia' },
      { text: 'Tipo', value: 'tipo' },
      { text: 'Unidad', value: 'unidad' },
      { text: 'Magnitud', value: 'magnitud' },
      { text: 'Encargado', value: 'encargado' },
      { text: 'Acciones', value: 'acciones', sortable: false, align: 'start' },
    ],
    tableData: [],
  }),
  methods: {
    async getInstrumentos() {
      try {
        await axios
          .get('instrumento', {
            headers: { Authorization: `Bearer ${this.token}` },
          })
          .then((res) => {
            this.tableData = res.data.data.data;
            this.instrumento_id = res.data.data.data[0].id
          })
      } catch (error) {
        console.log(error)
      }
    },
  },
  mounted(){
      this.getInstrumentos()
  } 
  
}
</script>

<style>
</style>