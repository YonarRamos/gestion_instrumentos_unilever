<template>
  <v-container>
        <v-card>
          <v-container>
            <v-row>
              <v-col>
                <v-card color="rgb(41, 83, 130)" dark class="mt-3">
                  <v-container class="py-0">
                    <v-row>
                      <v-col cols="12" sm="7">
                        <v-card-title class="pt-0"> TAG - {{item.tag}} </v-card-title>
                        <v-card-subtitle>
                          <!-- {{item.descripcion}} -->
                          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero saepe ducimus deleniti doloribus iure corrupti earum, culpa vitae? Modi quasi consequatur sed libero fugiat reiciendis recusandae hic ipsa nihil laboriosam.
                        </v-card-subtitle>
                      </v-col>

                      <v-col cols="12" sm="5" class="d-flex justify-end">
                        <div class="input-img-wrap" >
                            <v-img
                              class="img"
                              style="border-radius: 7px;"
                              src="../indus.jpg"
                              alt="No hay imagen"
                            ></v-img>
                        </div>
                            <div class="input-file-wrap" v-if="item.img">
                              <input class="file-input" type="file" />
                            </div>
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
                  <v-col cols="10" >
      
                      <v-text-field
                        v-model="item.tag"
                        outlined
                        dense
                        disabled
                        hide-details
                        label="Tag"
                        background-color="white"
                      ></v-text-field>

                  </v-col> 
                  <v-col cols="2" class="pt-0 d-flex justify-center" >
      
                      <v-checkbox
                        v-model="item.serie_requerido"
                        label="Serie"
                        hide-details
                        class="pt-1"
                        
                      ></v-checkbox>
      
                  </v-col>
                  <v-col cols="12" md="6" >

                        <v-text-field
                          v-model="item.fecha_creacion_equipo"
                          prepend-inner-icon="mdi-calendar"
                          prepend-icon
                          disabled
                          readonly
                          outlined
                          hide-details
                          dense
                          label="Fecha de Creación"
                          background-color="white"
                          ></v-text-field>

                  </v-col>
                  <v-col cols="12" md="6" >

                        <v-text-field
                            v-model="item.fecha_update_equipo"
                            prepend-inner-icon="mdi-calendar"
                            prepend-icon
                            disabled
                            readonly
                            outlined
                            hide-details
                            dense
                            label="Fecha de Actualización"
                            background-color="white"
                          ></v-text-field>

                  </v-col>
 <!--                  <v-col>
                    <v-textarea
                    v-model="item.descripcion"
                    outlined
                    label="Descripción"
                    background-color="white"
                    readonly
                    ></v-textarea>
                  </v-col> -->
                </v-row>
              </v-container>
              <v-container>
              <div class="overline">
                Sector del Equipo
              </div>
              <v-divider></v-divider>

                <v-row class="mt-2" >
                  <v-col cols="12" md="6" >
      
                      <v-text-field
                        v-model="item.sector_name"
                        outlined
                        dense
                        disabled
                        hide-details
                        label="Sector"
                        background-color="white"
                      ></v-text-field>

                  </v-col> 
                  <v-col cols="12" md="6" >
        
                        <v-text-field
                          v-model="item.sector_planta"
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



          <v-container >
            <v-card color="#FAFAFA"> 
              <v-container>
                <v-row class="mt-2" >
                 <v-col cols="12" sm="6">

                    <v-row>
                      <v-col>
                        <v-row>
                          <v-col cols="10">
                            <div class="overline">
                              Instrumentos del Equipo
                            </div>
                          </v-col>
                          <v-spacer></v-spacer>
                          <v-col cols="2">
                                <agregar-instrumento />                       
                          </v-col>
                        </v-row>
                        <v-divider></v-divider>
                      </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="6" >
  
                          <v-text-field
                            v-model="item.instrumento_marca"
                            outlined
                            dense
                            disabled
                            hide-details
                            label="Marca"
                            background-color="white"
                          ></v-text-field>

                      </v-col> 

                      <v-col cols="6" >
          
                          <v-text-field
                            v-model="item.instrumento_modelo"
                            outlined
                            dense
                            disabled
                            hide-details
                            label="Modelo"
                            background-color="white"
                          ></v-text-field>

                      </v-col> 
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="6" >
            
                            <v-text-field
                              v-model="item.instrumento_resolucion"
                              outlined
                              dense
                              disabled
                              hide-details
                              label="Resolución"
                              background-color="white"
                            ></v-text-field>
          
                      </v-col>
                      <v-col cols="12" sm="6" >
            
                            <v-text-field
                              v-model="item.instrumento_tolerancia"
                              outlined
                              dense
                              disabled
                              hide-details
                              label="Tolerancia"
                              background-color="white"
                            ></v-text-field>
          
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" >
          
                          <v-text-field
                            v-model="item.instrumento_serie"
                            outlined
                            dense
                            disabled
                            hide-details
                            label="Serie"
                            background-color="white"
                          ></v-text-field>

                      </v-col> 
                      <v-col cols="6" >
          
                          <v-text-field
                            v-model="item.tipo_instrumento"
                            outlined
                            dense
                            disabled
                            hide-details
                            label="Tipo de Instrumento"
                            background-color="white"
                          ></v-text-field>
        
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" >
            
                            <v-text-field
                              v-model="item.instrumento_unidad"
                              outlined
                              dense
                              disabled
                              hide-details
                              label="Unidad"
                              background-color="white"
                            ></v-text-field>
          
                      </v-col>
                      <v-col cols="6" >
            
                            <v-text-field
                              v-model="item.instrumento_magnitud"
                              outlined
                              dense
                              disabled
                              hide-details
                              label="Magnitud"
                              background-color="white"
                            ></v-text-field>
          
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" >
            
                            <v-text-field
                              v-model="item.instrumento_creado_usuario"
                              outlined
                              dense
                              disabled
                              hide-details
                              label="Usuario"
                              background-color="white"
                            ></v-text-field>
          
                      </v-col>
                      <v-col cols="6" >
            
                            <v-text-field
                              v-model="item.instrumento_encargado_calibracion"
                              outlined
                              dense
                              disabled
                              hide-details
                              label="Encargado de Calibración"
                              background-color="white"
                            ></v-text-field>
          
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="3" sm="3" >
          
                            <v-text-field
                              v-model="item.instrumento_rango_de"
                              outlined
                              dense
                              disabled
                              hide-details
                              label="Rango_d"
                              background-color="white"
                            ></v-text-field>
          
                      </v-col>
                      <v-col cols="3" sm="3" >
            
                            <v-text-field
                              v-model="item.instrumento_rango_a"
                              outlined
                              dense
                              disabled
                              hide-details
                              label="Rango_a"
                              background-color="white"
                            ></v-text-field>
          
                      </v-col>
                      <v-col cols="3" sm="3" >
            
                            <v-text-field
                              v-model="item.instrumento_rango_normal_de"
                              outlined
                              dense
                              disabled
                              hide-details
                              label="Rango_d Normal"
                              background-color="white"
                            ></v-text-field>
          
                      </v-col>
                      <v-col cols="3" sm="3" >
            
                            <v-text-field
                              v-model="item.instrumento_rango_normal_a"
                              outlined
                              dense
                              disabled
                              hide-details
                              label="Rango_a Normal"
                              background-color="white"
                            ></v-text-field>
          
                      </v-col>                      
                    </v-row>
                    <v-row>
                      <v-col cols="12" >

                            <v-text-field
                                v-model="item.instrumento_update"
                                prepend-inner-icon="mdi-calendar"
                                prepend-icon
                                disabled
                                readonly
                                outlined
                                hide-details
                                dense
                                label="Fecha de Actualización"
                                background-color="white"
                              ></v-text-field>

                      </v-col>
                    </v-row>
                 </v-col>
                 <v-col cols="12" sm="6">
                    <v-row>
                      <v-col cols="10">
                        <div class="overline">
                          Tareas de Calibración
                        </div>
                      </v-col>
                      <v-spacer></v-spacer>
                      <v-col cols="2 d-flex justify-end pt-2">
                        <agregar-calibracion @nuevaTarea="agregarTareaPendiente" :instrumento="item"/>
                      </v-col>
                    </v-row>
                      <v-divider></v-divider>
                        <v-card height="440" width="auto" flat style="border: 2px groove #D6D6D8 ;" class="mt-2">
                            <v-data-table
                            :headers="headers"
                            :items="tareasPendientes"
                            hide-default-footer
                            height="435"
                            >
                              <template v-slot:[`item.certificado`]={item}>
                                <agregar-certificado  @certificar="certificar(item)" ref="cert" @click="show"/>
                                <v-btn icon fab small :color="item.certificado ? 'success' : ''" @click="show(item)"><v-icon>verified</v-icon></v-btn>
                              </template>
                            </v-data-table>
                        </v-card>
                 </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-container>

          <v-container >
            <v-card color="#FAFAFA"> 
              <v-container>
              <div class="overline">
                Calibración Tarea Realizada
              </div>
              <v-divider></v-divider>

                <v-row class="mt-2" >
                  <v-col cols="12" sm="6" class="pt-0">  
                        <v-card height="425" width="auto" flat style="border: 2px groove #D6D6D8 ;">
                            <v-data-table
                            :headers="headers2"
                            :items="desserts2"
                            hide-default-footer
                            height="420"
                            >

                              <template v-slot:[`item.protein`]>
                                  <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-btn :v-on="on"  v-bind="attrs" icon small color="info"><v-icon>mdi-download</v-icon>Descargar</v-btn>
                                    </template>
                                    <span>Certificación</span>
                                  </v-tooltip>
                                
                              </template>
                            
                            </v-data-table>
                        </v-card>
                  </v-col> 
                  <v-col cols="12" sm="6" class="pt-0" >
        
                        <v-card height="425" width="auto" flat style="border: 2px groove #D6D6D8 ;">
    <!--                         <v-data-table
                            :headers="headers"
                            :items="desserts"
                            hide-default-footer
                            height="420"
                            /> -->
                        </v-card>
      
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-container>

          <v-card-actions class="d-flex justify-end">
            <v-col class="d-flex justify-end">
              <v-spacer></v-spacer>
              <!-- <btn-pdf :equipo="item" /> -->
            </v-col>
          </v-card-actions>
        </v-card>

  </v-container>
</template>

<script>
import BtnPDF from "~/components/common/btnPDF.vue";
import axios from '~/plugins/axios';
import Cookies from 'js-cookie';
import AgregarCertificado from "~/components/common/AgregarCertificado.vue";
import AgregarInstrumento from "~/components/common/AgregarInstrumento.vue";
import AgregarCalibracion from "~/components/common/AgregarCalibracion.vue";

export default {
  components:{
    BtnPDF,
    AgregarCertificado,
    AgregarInstrumento,
    AgregarCalibracion
  },
  layout: 'equipo',
  data(){
    return{
      paramsId:null,
      equipo:[],
      item:{
          fecha_creacion_equipo:'',
          fecha_update_equipo:'',
          calibracion_tarea_frecuencia: null,
          calibracion_tarea_id: null,
          calibracion_tarea_proxima: "",
          calibracion_tarea_tipo: null,
          calibracion_tarea_ult_efectuada: "",
          descripcion: "",
          id: null,
          instrumento_creado_usuario: "",
          instrumento_create: "",
          instrumento_encargado_calibracion: "",
          instrumento_magnitud: "",
          instrumento_marca: "",
          instrumento_modelo: "",
          instrumento_rango_a: null,
          instrumento_rango_de: null,
          instrumento_rango_normal_de:null,
          instrumento_rango_normal_a:null,
          instrumento_resolucion: null,
          instrumento_serie: "",
          instrumento_tolerancia: null,
          instrumento_unidad: "",
          instrumento_update: "",
          intrumento_estado: "",
          intrumento_id: null,
          sector_name: "",
          sector_planta: "",
          serie_requerido: true,
          tag: "",
          tipo_instrumento: "",
        },
     headers: [
          { text: 'Tipo', align: 'start', value: 'tipo'},
          { text: 'Frecuencia', value: 'frecuencia' },
          { text: 'Próxima Calibración', value: 'proxima' },
          {text: 'Certificado',align: 'center', value: 'certificado' }
        ],
     headers2: [
          { text: 'Dessert (100g serving)', align: 'start', value: 'name'},
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          {text: 'Certificado',align: 'center', value: 'protein' }
        ],
        tareasPendientes: [
          {
            tipo: 'Prueba',
            frecuencia: 159,
            proxima: '12-12-21',
            certificado: true,
          },
          {
            tipo: 'Prueba',
            frecuencia: 159,
            proxima: '12-12-21',
            certificado: false,
          },
        ],
        desserts2: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 'success',
            carbs: 24,
            protein: 4.0,
            iron: '1%',
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 'gray',
            carbs: 37,
            protein: 4.3,
            iron: '1%',
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 'success',
            carbs: 23,
            protein: 6.0,
            iron: '7%',
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 'success',
            carbs: 67,
            protein: 4.3,
            iron: '8%',
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 'success',
            carbs: 49,
            protein: 3.9,
            iron: '16%',
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 'gray',
            carbs: 94,
            protein: 0.0,
            iron: '0%',
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 'success',
            carbs: 98,
            protein: 0,
            iron: '2%',
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 'gray',
            carbs: 87,
            protein: 6.5,
            iron: '45%',
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 'success',
            carbs: 51,
            protein: 4.9,
            iron: '22%',
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 'success',
            carbs: 65,
            protein: 7,
            iron: '6%',
          },
        ],
    }
  },
  methods:{
    agregarTareaPendiente(obj){
      
      let tarea ={
        tipo: obj.calibracion_tipo_id,
        frecuencia: obj.frecuencia,
        proxima: obj.proxima,
        certificado: false,
      }
      this.tareasPendientes.push(tarea);
    },
  async  getEquipo(){
      try {
        const token = Cookies.get('token');

      await axios.get(`formulario/${this.paramsId}`,{
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res)=>{
        this.item = res.data.data[0].detalleEquipos;
      })
      } catch (error) {
        console.log(error)
      }
    },
    show(item){
      if(item.certificado == false){
        this.$refs.cert.show();
      }
    },
    certificar(item){
      item.certificado = true;
    },
  },
  mounted(){
   this.paramsId = this.$route.params.id;
   this.getEquipo();
  }
}
</script>

<style scoped>
.img{
  height: 150px;
  width: 245px;
}
.input-file-wrap {
    background-image: url("/pic.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: 145px;
    width: 245px;
    position: relative;
    cursor: pointer;
    border-radius: 10px;
    border: 3px inset #2A67A5;

}
.input-img-wrap {
    height: 155px;
    width: 245px;
    position: relative;
    cursor: pointer;
    border-radius: 10px;
    border: 3px inset #2A67A5;
}
@media only screen and (max-width: 600px) {
  .img{
    width: 100%;
    height: 190px;
  }
  .input-file-wrap {
    width: 100%;
    height: 195px;
  }
  .input-img-wrap{
    width: 100%;
    height: 195px;
  }
}
.file-input {
    width: 100%;
    height: 100%;
    opacity: 0;
/*     padding-left: 340px;
    margin-right: -340px; */
    cursor: pointer;
}

</style>