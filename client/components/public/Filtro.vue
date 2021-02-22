<template>
<container>
  <div>
    <v-layout row wrap mb-2>
      
            <v-row>
              <v-col cols="6" sm="6" md="2" style="margin-left:60%">
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
              <v-col cols="2" sm="2" md="2">
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

</container>
  
</template>

<script>
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
  height: 80px;
  margin-top: 40px;
}
.btn-fill {
 margin-top: 35px;
 margin-right: 20px;
}
</style>