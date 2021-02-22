<template>
  <div>
    <v-layout row wrap mb-2>
      <v-flex xs12>
        <div class="blue-grey lighten-5 elevation-1 panel-filtro">
          <v-layout row wrap>
            <v-flex
              xs5
              text-xs-left
              pl-3
              style="margin-top: 15px; margin-left: 7px"
            >
              <!-- <date-ranger-picker></date-ranger-picker> -->
              <h2 class="blue-grey--text">
                <strong>{{ 'Filtro Equipos' }}</strong>
                &nbsp;&nbsp;
              </h2>
              <div class="blue-grey--text">
                <span>Desde:</span>
                <span class="grey--text">{{ formatDate(desde) }}</span>
                -
                <span>Hasta:</span>
                <span class="grey--text">{{ formatDate(hasta) }}</span>
              </div>
            </v-flex>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      style="margin-top: 25px"
                      v-model="date"
                      label="Desde"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">
                      Cancel
                    </v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(date)">
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-menu
                  ref="menu"
                  v-model="menu1"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      style="margin-top: 25px; margin-left: 10px"
                      v-model="date"
                      label="Hasta"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">
                      Cancel
                    </v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(date)">
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-btn color="blue" outlined class="btn-fill">
              <v-icon>refresh</v-icon>Filtrar
            </v-btn>
          </v-layout>
        </div>
        <v-flex> </v-flex>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Filtro from '@/components/public/Filtro'
import moment from 'moment'
export default {
  middleware: 'NOAUTH',
  layout: 'custom',
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    menu1: false,
    modal: false,
    menu2: false,
  }),

  created() {
    this.date = moment().format('YYYY-MM-DD')
   
    const desde = moment().format('YYYY-MM-DD HH:mm:ss')

    const hasta = moment() .format('YYYY-MM-DD HH:mm:ss')
  },
  methods: {
    formatDate(date) {
      return moment(date).format('YYYY-MM-DD HH:mm')
    },
  },
}
</script>

<style  scoped>
.panel-filtro {
  margin-left: 200px;
  margin-right: 30px;
  height: 80px;
  margin-top: 80px;
}
.btn-fill {
  margin-right: 20px;
  margin-top: 30px;
}
</style>