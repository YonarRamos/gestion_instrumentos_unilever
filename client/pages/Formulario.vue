<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-container fluid>
            <v-row>
              <v-col cols="12">
                <v-card color="rgb(41, 83, 130)" dark>
                  <v-container class="py-0">
                    <v-row>
                      <v-col>
                        <v-card-title> Formulario Equipos N° </v-card-title>
                        <v-card-subtitle>
                          Descripcion del equipo
                        </v-card-subtitle>
                      </v-col>
                      <v-col>
                        <v-img
                        class="imgForm"
                          max-height="150"
                          max-width="250"
                          src="indus.jpg"
                        ></v-img>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
              <v-col cols="12" md="6" class="py-0">
                <v-col class="px-0">
                  <v-text-field
                    v-model="item"
                    outlined
                    dense
                    disabled
                    hide-details
                    placeholder="Nombre"
                  ></v-text-field>
                </v-col>
              </v-col>
              <v-col cols="12" md="6" class="py-0">
                <v-col class="px-0">
                  <v-text-field
                    v-model="item"
                    outlined
                    dense
                    disabled
                    hide-details
                    placeholder="Descripcion"
                  ></v-text-field>
                </v-col>
              </v-col>
              <v-col cols="12" md="6" class="py-0">
                <v-col class="px-0">
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
                      label="Fecha Realizado"
                    ></v-text-field>
                </v-col>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {}
</script>

<style>
.imgForm{
  margin-left: 50%;
}
</style>