<template>
  <div class="fondo">
    <v-container >
    <!--             <v-treeview
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
            :bench="benched"
            :items="items"
            height="530"
            item-height="64"
          >
            <template v-slot:default="{ item }">
              <v-list-item :key="item.id" class="scrollItem">
                <v-list-item-action>
                  <v-btn
                    fab
                    small
                    depressed
                    color="primary"
                  >
                    {{ item.id }}
                  </v-btn>
                </v-list-item-action>

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

              <!-- Modal Agregar -->
                  <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on"
                      >
                        Agregar
                      </v-btn>
                    </template>

                    <v-card>
                      <v-card-title class="headline blue darken-4" style="color:white">
                        <span >Nuevo</span>
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
                        <v-btn color="red darken-1" text @click="close">
                          Cancel
                        </v-btn>
                        <v-btn color="green darken-1" text @click="save">
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
          <!-- Termina Modal Agregar -->
          <!--  Modal Eliminar  -->
                  <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                      <v-card-title class="headline"
                        >Está seguro de que desea eliminar el
                        equipo?</v-card-title
                      >
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete"
                          >Cancelar</v-btn
                        >
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="deleteItemConfirm"
                          >OK</v-btn
                        >
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
         <!--  Termina Modal Eliminar -->
            </v-toolbar>
          </template>
          
              <template v-slot:[`item.tag`]={item} >
                <nuxt-link to="/formulario" :exact="true">
                  <v-chip class="tag">{{item.tag}}</v-chip>
                </nuxt-link>
              </template> 
              <template v-slot:[`item.acciones`]="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
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
export default {
  middleware: 'NOAUTH',
  components:{
    Filtro
  },
    data: () => ({
      token: Cookies.get("token"),
      benched: 0,
      items: [],
      itemsSelected: [],
      totalTableItems: 0,
      loading: true,
      options: {},
      txtBuscar: '',
      filtroTree: undefined,
      listRutas: [],
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {
        id: '',
        tag: '',
        descripcion: '',
        sector_id: '',
        empresa: ''
      },
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
        { text: 'Acciones', value: 'acciones', sortable: false}
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

          console.log(res)
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
    editItem(item) {
      this.editedIndex = this.tableData.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.tableData.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm() {
      this.tableData.splice(this.editedIndex, 1)
      this.closeDelete()
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