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
          <span>Agregar Instrumento</span>
        </v-tooltip>

        <v-dialog v-model="dialog" width="500">
          <v-card>
            <v-card-title class="headline white--text blue darken-4">
              Agregar Instrumento
            </v-card-title>

            <v-card-text>
              <v-form ref="form" lazy-validation>
                <v-container>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field 
                      v-model="instrumento.marca"
                      label="Marca"
                      :rules="rules"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field 
                      v-model="instrumento.modelo"
                      label="Modelo"
                      :rules="rules"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="6">
                      <v-text-field 
                      v-model="instrumento.serie"
                      label="Serie"
                      :rules="rules"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-select
                      v-model="instrumento.tipo_id"
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
                      v-model="instrumento.resolucion"
                      label="Resolución"
                      :rules="rules"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                      v-model="instrumento.tolerancia" 
                      label="Tolerancia"
                      :rules="rules"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>


                  <v-row>
                    <v-col cols="6">
                      <v-select
                      v-model="instrumento.unidad_id"
                      label="Unidad"
                      :items="['tipo 1', 'tipo 2']"
                      :rules="rules"
                      >
                      </v-select>
                    </v-col>
                    <v-col cols="6">
                      <v-select
                      v-model="instrumento.magnitud_id"
                      label="Magnitud"
                      :items="['tipo 1', 'tipo 2']"
                      :rules="rules"
                      >
                      </v-select>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12">
                      <v-select
                      v-model="instrumento.encargado_calibracion"
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
                      v-model="instrumento.rango_a"
                      label="Rango A"
                      :rules="rules"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                      v-model="instrumento.rango_de" 
                      label="Rango DE"
                      :rules="rules"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="6">
                      <v-text-field 
                      v-model="instrumento.rango_normal_a"
                      label="Rango Normal A"
                      :rules="rules"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field 
                      v-model="instrumento.rango_normal_de"
                      label="Rango Normal DE"
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
              <v-btn color="primary" text @click="agregarInstrumento">
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
      instrumento:{
        marca: "prueba postman",
        modelo: "postman",
        serie: "prueba",
        rango_de: 54,
        rango_a: 23,
        rango_normal_de: 54,
        rango_normal_a: 32,
        resolucion: 12,
        tolerancia: 23 , 
        tipo_id: 1,
        unidad_id: 1,
        magnitud_id: 1,
        encargado_calibracion: 1
      },
      rules:[ v => !!v || 'Requerido' ],
    }
  },
  methods:{
    agregarInstrumento(){
      console.log('Instrumento:', this.instrumento)
    },
    hide(){
      this.$refs.form.reset();
      this.dialog = false;
    }
  }
}
</script>

<style>
</style>