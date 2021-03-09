<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title style="box-shadow: 1px 2px 4px #888888">
              Usuarios
            </v-card-title>

            <v-divider></v-divider>
           
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
                  <agregar-usuario @click="getUser"/>
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
                  <editar-usuario
                    :id="item.id"
                    class="mr-2"
                    @click="getUser"
                  />
                  <eliminar-usuario
                    :id="item.id"
                    @click="getUser"
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
import Cookies from 'js-cookie'
import axios from '~/plugins/axios'
import AgregarUsuario from "~/components/common/AgregarUsuario.vue";
import EliminarUsuario from "~/components/common/EliminarUsuario.vue";
import EditarUsuario from "~/components/common/EditarUsuario.vue";
import 'material-design-icons-iconfont/dist/material-design-icons.css'
export default {
 middleware: 'NOAUTH',
  components: {
      AgregarUsuario,
      EditarUsuario,
      EliminarUsuario
    
  },
  data: () => ({
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
      { text: 'Nombre', align: 'start', value: 'nombre' },
      { text: 'Apellido', value: 'apellido' },
      { text: 'Email', value: 'email' },
      { text: 'Empresa', value: 'empresa' },
      { text: 'Creado', value: 'created_at' },
      { text: 'Acciones', value: 'acciones', sortable: false, align: 'start' },
    ],
    tableData: [],
  }),
     methods: {
    async getUser() {
      try {
        await axios
          .get('User', {
            headers: { Authorization: `Bearer ${this.token}` },
          })
          .then((res) => {
              console.log(res.data.data)
            this.tableData = res.data.data;
            //this.instrumento_id = res.data.data.data[0].id
          })
      } catch (error) {
        console.log(error)
      }
    },
  },
   mounted(){
      this.getUser()
  } 
}
</script>

<style>

</style>