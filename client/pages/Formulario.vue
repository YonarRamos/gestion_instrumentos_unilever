<template>
  <v-container>
        <v-card>
          <v-container>
            <v-row>
              <v-col>
                <v-card color="rgb(41, 83, 130)" dark class="mt-3">
                  <v-container class="py-0">
                    <v-row>
                      <v-col>
                        <v-card-title class="pt-0"> Formulario Equipos N° </v-card-title>
                        <v-card-subtitle>
                          Descripción del equipo
                        </v-card-subtitle>
                      </v-col>
                      <v-spacer></v-spacer>
                      <v-col class="d-flex justify-end">
                        <v-img
                          max-height="150"
                          max-width="250"
                          src="indus.jpg"
                          style="border-radius: 5px;"
                        ></v-img>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
          </v-container>

          <v-container >
            <v-card color="#FAFAFA"> 
              <v-container>
              <div class="overline">
                Detalle de Equipo
              </div>
              <v-divider></v-divider>

                <v-row class="mt-2" >
                  <v-col cols="12" md="6" class="">
      
                      <v-text-field
                        v-model="item"
                        outlined
                        dense
                        disabled
                        hide-details
                        label="Tag"
                        background-color="white"
                      ></v-text-field>

                  </v-col> 
                  <v-col cols="12" md="6" class="">
        
                        <v-text-field
                          v-model="item"
                          outlined
                          dense
                          disabled
                          hide-details
                          label="Serie"
                        background-color="white"
                        ></v-text-field>
      
                  </v-col>
                  <v-col cols="12" md="6" class="">

                        <v-text-field
                          v-model="item"
                          prepend-inner-icon="mdi-calendar"
                          prepend-icon
                          disabled
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          outlined
                          hide-details
                          dense
                          label="Fecha de Creación"
                          background-color="white"
                          ></v-text-field>

                  </v-col>
                  <v-col cols="12" md="6" class="">

                        <v-text-field
                            v-model="item"
                            prepend-inner-icon="mdi-calendar"
                            prepend-icon
                            disabled
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            outlined
                            hide-details
                            dense
                            label="Fecha de Actualización"
                            background-color="white"
                          ></v-text-field>

                  </v-col>
                  <v-col>
                    <v-textarea
                    outlined
                    label="Descripción"
                    background-color="white"
                    readonly
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-container>



          <v-container >
            <v-card color="#FAFAFA"> 
              <v-container>
              <div class="overline">
                Instrumentos del Equipo
              </div>
              <v-divider></v-divider>

                <v-row class="mt-2" >
                  <v-col cols="12" md="4" class="">
      
                      <v-text-field
                        v-model="item"
                        outlined
                        dense
                        disabled
                        hide-details
                        label="Marca"
                        background-color="white"
                      ></v-text-field>

                  </v-col> 

                  <v-col cols="12" md="4" class="">
      
                      <v-text-field
                        v-model="item"
                        outlined
                        dense
                        disabled
                        hide-details
                        label="Modelo"
                        background-color="white"
                      ></v-text-field>

                  </v-col> 

                  <v-col cols="12" md="4" class="">
      
                      <v-text-field
                        v-model="item"
                        outlined
                        dense
                        disabled
                        hide-details
                        label="Serie"
                        background-color="white"
                      ></v-text-field>

                  </v-col> 
                  <v-col cols="12" md="3" class="">
        
                        <v-text-field
                          v-model="item"
                          outlined
                          dense
                          disabled
                          hide-details
                          label="Rango_d"
                          background-color="white"
                        ></v-text-field>
      
                  </v-col>
                  <v-col cols="12" md="3" class="">
        
                        <v-text-field
                          v-model="item"
                          outlined
                          dense
                          disabled
                          hide-details
                          label="Rango_a"
                          background-color="white"
                        ></v-text-field>
      
                  </v-col>
                  <v-col cols="12" md="3" class="">
        
                        <v-text-field
                          v-model="item"
                          outlined
                          dense
                          disabled
                          hide-details
                          label="Rango_d Normal"
                          background-color="white"
                        ></v-text-field>
      
                  </v-col>
                  <v-col cols="12" md="3" class="">
        
                        <v-text-field
                          v-model="item"
                          outlined
                          dense
                          disabled
                          hide-details
                          label="Rango_a Normal"
                          background-color="white"
                        ></v-text-field>
      
                  </v-col>
                  <v-col cols="12" md="6" class="">
        
                        <v-text-field
                          v-model="item"
                          outlined
                          dense
                          disabled
                          hide-details
                          label="Resolución"
                          background-color="white"
                        ></v-text-field>
      
                  </v-col>
                  <v-col cols="12" md="6" class="">
        
                        <v-text-field
                          v-model="item"
                          outlined
                          dense
                          disabled
                          hide-details
                          label="Tolerancia"
                          background-color="white"
                        ></v-text-field>
      
                  </v-col>
                  <v-col cols="12" md="4" class="">
        
                        <v-text-field
                          v-model="item"
                          outlined
                          dense
                          disabled
                          hide-details
                          label="Tipo de Instrumento"
                          background-color="white"
                        ></v-text-field>
      
                  </v-col>
                  <v-col cols="12" md="4" class="">
        
                        <v-text-field
                          v-model="item"
                          outlined
                          dense
                          disabled
                          hide-details
                          label="Unidad"
                          background-color="white"
                        ></v-text-field>
      
                  </v-col>
                  <v-col cols="12" md="4" class="">
        
                        <v-text-field
                          v-model="item"
                          outlined
                          dense
                          disabled
                          hide-details
                          label="Magnitud"
                          background-color="white"
                        ></v-text-field>
      
                  </v-col>
                  <v-col cols="12" md="4" class="">
        
                        <v-text-field
                          v-model="item"
                          outlined
                          dense
                          disabled
                          hide-details
                          label="Usuario"
                          background-color="white"
                        ></v-text-field>
      
                  </v-col>
                  <v-col cols="12" md="4" class="">
        
                        <v-text-field
                          v-model="item"
                          outlined
                          dense
                          disabled
                          hide-details
                          label="Encargado de Calibración"
                          background-color="white"
                        ></v-text-field>
      
                  </v-col>

                  <v-col cols="12" md="4" class="">

                        <v-text-field
                            v-model="item"
                            prepend-inner-icon="mdi-calendar"
                            prepend-icon
                            disabled
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            outlined
                            hide-details
                            dense
                            label="Fecha de Actualización"
                            background-color="white"
                          ></v-text-field>

                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-container>

          <v-container >
            <v-card color="#FAFAFA"> 
              <v-container>
              <div class="overline">
                Sector del Equipo
              </div>
              <v-divider></v-divider>

                <v-row class="mt-2" >
                  <v-col cols="12" md="6" class="">
      
                      <v-text-field
                        v-model="item"
                        outlined
                        dense
                        disabled
                        hide-details
                        label="Sector"
                        background-color="white"
                      ></v-text-field>

                  </v-col> 
                  <v-col cols="12" md="6" class="">
        
                        <v-text-field
                          v-model="item"
                          outlined
                          dense
                          disabled
                          hide-details
                          label="Planta"
                        background-color="white"
                        ></v-text-field>
      
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-container>

          <v-card-actions class="d-flex justify-end">
            <v-btn
              color="error"
              text
            >
              Descargar PDF
            </v-btn>
          </v-card-actions>
        </v-card>
  </v-container>
</template>

<script>
export default {
  middleware: 'NOAUTH',
  layout: 'equipo',
}
</script>

<style>
</style>