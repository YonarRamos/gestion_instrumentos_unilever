<template>
  <div class="d-flex justify-end">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              v-on="on"
              @click="dialog = true"
            >
              check_circle_outline
            </v-icon>
          </template>
          <span>Aprobar Tarea</span>
        </v-tooltip>

        <v-dialog v-model="dialog" width="500">
          <v-card>
            <v-card-title class="headline white--text blue darken-4">
              Aprobar Tarea
            </v-card-title>

            <v-card-text>
              <v-form ref="form" lazy-validation v-model="valid">
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-file-input
                      v-model="tarea.certificado"
                      accept=".pdf"
                      :rules="rules"
                      />
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12">
                      <v-textarea
                      v-model="tarea.descripcion"
                        rows="3"
                        label="Descripcióin"
                        :rules="rules"
                      />
                    </v-col>  
                  </v-row>
                  
                  <!-- Modal status http request -->
                  <v-row v-if="alertShow">
                    <v-col cols="12" class="px-0">
                      <v-alert
                        dense
                        text
                        :type="alertType"
                      >
                        {{alertMsg}}
                      </v-alert>
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
              <v-btn color="info" text @click="aprobarTarea">
                Aprobar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
  </div>
</template>

<script>
import axios from '~/plugins/axios';
import Cookies from 'js-cookie';
export default {
/*   props:{
    instrumento:{
      type: Object,
      required: true
    }
  }, */
  data() {
    return {
      valid:false,
      token: Cookies.get('token'),
      dialog: false,
      alertShow: false,
      alertMsg:'',
      alertType:'success',
      calibracionTipo:[],
      tarea:{
          certificado:"",
          descripcion: "",
      },
      rules:[ v => !!v || 'Requerido' ],
    }
  },
  methods:{
    aprobarTarea(){
      try {

      } catch (error) {
        console.log(error)
        this.alertMsg = "Hubo un error al processar tu solicitud"
        this.alerType = "error"
        this.alertShow = true;
      }
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
