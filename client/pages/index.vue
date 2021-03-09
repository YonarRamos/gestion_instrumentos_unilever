<template>
  <div class="fondo">
    <v-container >
      <v-row>
        <v-col cols="12" md="3">
            <div>

            <v-treeview
              rounded
              hoverable
              activatable
              :active="itemsSelected"
              :items="items"
              item-key="id"
              v-on:update:active="filtrarTabla"
              style="cursor:pointer;"
            />
          </div> 
      </v-col>
     
      <v-col cols="12" md="9">        
          <v-card>
            <v-card-title  style="box-shadow:1px 2px 4px #888888">
              Equipos
            </v-card-title>

            <v-divider></v-divider>
            <v-row>
              <v-col>
                <filtro @click="filterByDate" />
                <v-divider></v-divider>
              </v-col>
            </v-row>

            <v-data-table
              :headers="headers"
              :items="tableData"
              :options.sync="options"
              :server-items-length="totalTableItems"
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
                    @keyup.enter="getDataTable()"
                    v-model="txtBuscar"
                  ></v-text-field>

                <v-spacer></v-spacer>
                <v-btn text color="error" @click="limpiarFiltros" class="mr-3 mb-2">
                  Limpiar Filtros
                </v-btn>
                <agregar-equipo @click="getDataTable"/>
            </v-toolbar>
          </template>
          
              <template v-slot:[`item.tag`]={item} >

                <nuxt-link  :to="`detalle_equipo/${item.id}`"  :exact="true">
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
                        {{item.tag}}
                      </v-btn>
                    </template>
                    <span>Ver Detalle</span>
                  </v-tooltip>
                </nuxt-link>
              </template> 

              <template v-slot:[`item.acciones`]="{ item }">
                <v-row class="d-flex justify-center">
                  <descargar-cetificado :idEquipo="item.id"/>
                  <editar-equipo :id="item.id" class="ml-2" @click="getDataTable" />
                  <eliminar-equipo :id="item.id" class="ml-2" :tag="item.tag" @click="getDataTable" />
                </v-row>
              </template>

              <template v-slot:[`item.proximaCalib`]={item}>
                {{item.proximaCalib | fecha}} 
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import moment from 'moment';
import Filtro from '@/components/public/Filtro';
import axios from '~/plugins/axios';
import { mapMutations, mapState } from 'vuex';
import Cookies from 'js-cookie';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import AgregarEquipo from "~/components/common/AgregarEquipo.vue";
import EditarEquipo from "~/components/common/EditarEquipo.vue";
import EliminarEquipo from "~/components/common/EliminarEquipo.vue";
import DescargarCetificado from "~/components/common/DescargarCetificado.vue";

export default {
  middleware: 'NOAUTH',
  components:{
    Filtro,
    AgregarEquipo,
    EliminarEquipo,
    EditarEquipo,
    DescargarCetificado
  },
    data: () => ({
      token: Cookies.get("token"),
      benched: 0,
      items: [],
      itemsSelected: [],
      totalTableItems: 0,
      loading:false,
      options: {},
      txtBuscar: '',
      filtroTree: undefined,
      listRutas: [],
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      defaultItem: {
        tag: '',
        descripcion: '',
        sector: '',
        encargado: ''
      },
      headers: [
        { text: 'Tag', align: 'start', value: 'tag' },
        { text: 'Descripción', value: 'descripcion' },
        { text: 'Sector', value: 'sectorName' },
        { text: 'Estado', value: 'estadoName' },
        { text: 'Próxima', value: 'proximaCalib' },
        { text: 'Encargado', value: 'empresa' },
        { text: 'Acciones', value: 'acciones', sortable: false, align: 'start'}
      ],
      tableData: []
  }),
  computed: {
    ...mapState(['dialogPassword']),

    formTitle() {
      return this.editedIndex === -1 ? 'Nuevo' : 'Editar'
    },
  },
  filters:{
    fecha(v){
      if(v=='')
      {return "No hay tarea asignada"}
      else{
      return v.toString().slice(0,10);
      }
    }
  },
  methods: {
    ...mapMutations(['toggleDialogPassword']),
    async fillItems() {

      await axios
        .get("sector", {
        headers: { Authorization: `Bearer ${this.token}` },
      })
        .then(res => {
          
          this.items = res.data.sectoresResp;
          this.listRutas = res.data.listRutas;

        })
    },
    async getDataTable() {
      this.loading = true
      await axios
        .get("tablaequipos", { headers: { Authorization: `Bearer ${this.token}`} , params: { desde: this.desde, hasta: this.hasta, options: this.options, buscar: this.txtBuscar, filtroTree: this.filtroTree } })
        .then(res => {
          console.log('resEquipoTabla:',res.data.tableItemsData )
          this.totalTableItems = res.data.total;
          res.data.tableItemsData.forEach(it => {
            var auxRuta = this.listRutas.find(el => el.i == it.sector_id);

            if (auxRuta !== undefined)
            {
              it.sectorName = auxRuta.ruta;
            }
            else
            {
              it.sectorName = 'Error en ruta';
            }
          })

          this.tableData = res.data.tableItemsData;
          this.loading = false;

        })
    },
    async filtrarTabla (id) {
      this.filtroTree = id;
      this.fillItems();
      this.getDataTable();
    },
    async limpiarFiltros () {
      this.filtroTree = undefined;
      this.desde = null;
      this.hasta = null;
      this.txtBuscar = '';
      this.itemsSelected = [];
      this.getDataTable();
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    async filterByDate(desde, hasta){
      this.desde = desde;
      this.hasta = hasta;
      this.getDataTable()
    },
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.tableData[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
  },
  watch: {
    options: {
      handler () {
        this.fillItems();
        this.getDataTable();
      },
      deep: true,
    },
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },
  mounted() {
    this.fillItems();
  }
}
</script>

<style lang="css" scoped>
.limpiar:hover{
  color:lightcoral;
  font-weight:600;
}
.scrollItem:hover{
  background: rgb(245, 245, 245);
  cursor: pointer;
}
.tag{
  cursor: pointer;
  color: blue;
  background: lightblue;
}
.tag:hover{
  color:white;
  background: #1976D2;
}
a {
  text-decoration: none;
}
.fondo {
  background: #ebedef;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}

.font-weight-medium {
  size: 1;
}
.txt-treview{
  margin-top: 15px;
}
</style>