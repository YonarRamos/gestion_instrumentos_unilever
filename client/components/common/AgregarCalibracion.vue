<template>
  <div class="d-flex justify-end">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              depressed
              x-small
              height="30"
              color="info"
              v-bind="attrs"
              v-on="on"
              @click="dialog = true"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>Agregar Calibración</span>
        </v-tooltip>

        <v-dialog v-model="dialog" width="500">
          <v-card>
            <v-card-title class="headline white--text blue darken-4">
              Agregar Tarea de Calibración
            </v-card-title>

            <v-card-text>
              <v-form ref="form" lazy-validation>
                <v-container>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field 
                      label="Marca"
                      :rules="rules"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field 
                      label="Modelo"
                      :rules="rules"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="6">
                      <v-text-field 
                      label="Serie"
                      :rules="rules"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-select
                      label="Tipo"
                      :items="['tipo 1', 'tipo 2']"
                      :rules="rules"
                      >
                      </v-select>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="6">
                      <v-text-field 
                      label="Resolución"
                      :rules="rules"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field 
                      label="Tolerancia"
                      :rules="rules"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>


                  <v-row>
                    <v-col cols="6">
                      <v-select
                      label="Unidad"
                      :items="['tipo 1', 'tipo 2']"
                      :rules="rules"
                      >
                      </v-select>
                    </v-col>
                    <v-col cols="6">
                      <v-select
                      label="Magnitud"
                      :items="['tipo 1', 'tipo 2']"
                      :rules="rules"
                      >
                      </v-select>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="6">
                      <v-select
                      label="Estado"
                      :items="['tipo 1', 'tipo 2']"
                      :rules="rules"
                      >
                      </v-select>
                    </v-col>
                    <v-col cols="6">
                      <v-select
                      label="Encargado de Calibración"
                      :items="['tipo 1', 'tipo 2']"
                      :rules="rules"
                      >
                      </v-select>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="6">
                      <v-text-field 
                      label="Rango A"
                      :rules="rules"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field 
                      label="Rango DE"
                      :rules="rules"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="6">
                      <v-text-field 
                      label="Rango Normal A"
                      :rules="rules"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field 
                      label="Rango Noarmal DE"
                      :rules="rules"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>

                </v-container>
              </v-form>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" text @click="hide">
                Cancelar
              </v-btn>
              <v-btn color="primary" text @click="dialog = false">
                Ok
              </v-btn>
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
      tarea:{
        "calibracion_tarea_tipo": "prueba",
        "calibracion_tarea_frecuencia": 23,
        "calibracion_tarea_ult_efectuada": "2020-02-22",
        "calibracion_tarea_proxima": "2021-02-23"
      },
      rules:[ v => !!v || 'Requerido' ],
    }
  },
  methods:{
    hide(){
      this.$refs.form.reset();
      this.dialog = false;
    }
  }
}
</script>

<style>
</style>