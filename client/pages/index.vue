<template>
  <div class="fondo">
    <v-container >
    <!--     <v-treeview
              :items="items"
              activatable
              item-key="id"
              v-on:update:active="filtrarTabla"
            >
            </v-treeview>
   -->
  
<v-row>
  <v-col cols="3">
      <div>
        <v-card
          elevation="3"
          max-width="400"
          class="mx-auto"
        >
          <v-virtual-scroll
            :items="items"
            height="530"
            item-height="50"
          >
            <template v-slot:default="{ item }">
              <v-list-item :key="item.id" class="scrollItem">
<!--            <v-list-item-action>
                  <v-btn
                    fab
                    small
                    depressed
                    color="primary"
                  >
                    {{ item.id }}
                  </v-btn>
                </v-list-item-action> -->

                <v-list-item-content @click="filtrarTabla(item.id)">
                  <v-list-item-title>
                    <strong> {{ item.name }}</strong>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-divider></v-divider>
            </template>
          </v-virtual-scroll>
        </v-card>
      </div>
  </v-col>
     
  <v-col cols="9">        
          <v-card>
            <v-card-title  style="box-shadow:1px 2px 4px #888888">
              Equipos
            </v-card-title>

            <v-divider></v-divider>
            <v-row>
              <v-col>
                <filtro/>
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
                <agregar-equipo @click="getDataTable"/>
            </v-toolbar>
          </template>
          
              <template v-slot:[`item.tag`]={item} >
                <nuxt-link  :to="`formulario/${item.id}`"  :exact="true">
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
                    <span>Ver Formulario</span>
                  </v-tooltip>
                </nuxt-link>

              </template> 
              <template v-slot:[`item.acciones`]="{ item }">
                <v-row>
                  <editar-equipo :id="item.id" class="mr-2" @click="getDataTable" />
                  <eliminar-equipo :id="item.id" :tag="item.tag" @click="getDataTable" />
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

import Filtro from '@/components/public/Filtro'
import axios from '~/plugins/axios'
import { mapMutations, mapState } from 'vuex'
import Cookies from 'js-cookie'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import AgregarEquipo from "~/components/common/AgregarEquipo.vue";
import EditarEquipo from "~/components/common/EditarEquipo.vue";
import EliminarEquipo from "~/components/common/EliminarEquipo.vue";

export default {
  middleware: 'NOAUTH',
  components:{
    Filtro,
    AgregarEquipo,
    EliminarEquipo,
    EditarEquipo
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
        .get("tablaequipos", { headers: { Authorization: `Bearer ${this.token}`} , params: { options: this.options, buscar: this.txtBuscar, filtroTree: this.filtroTree } })
        .then(res => {
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
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
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