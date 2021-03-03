<template>
  <v-container>
            <v-row style="background:#F9F9F9">
              <v-col cols="12" md="4">
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
                      v-model="date"
                      label="Desde"
                      prepend-inner-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      hide-details
                      outlined
                      dense
                      color="primary"
                      background-color="white"
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

              <v-col cols="12" md="4">
                <v-menu
                  ref="menu"
                  v-model="menu1"
                   class="picker"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date1"
                      label="Hasta"
                      prepend-inner-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      hide-details
                      outlined
                      dense
                      color="primary"
                      background-color="white"
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

              <v-col cols="12" md="4" class="d-flex justify-end align-center"> 
                <v-btn color="grey darken-1" outlined height="40">
                    <v-icon>refresh</v-icon>
                    Aplicar Filtro
                </v-btn>
              </v-col>
            </v-row>
  </v-container>
</template>

<script>
import moment from 'moment'
export default {
  middleware: 'NOAUTH',
  layout: 'custom',
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    
    date1: new Date().toISOString().substr(0, 10),
    menu: false,
    menu1: false,
    
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
  height: 80px;
  margin-top: 40px;
}
</style>