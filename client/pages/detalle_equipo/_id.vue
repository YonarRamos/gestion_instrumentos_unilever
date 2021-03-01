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
                        <v-card-title class="pt-0"> TAG - {{item.tag}} </v-card-title>
                        <v-card-subtitle>
                          {{item.descripcion}}
                        </v-card-subtitle>
                      </v-col>

                      <v-col class="d-flex justify-end">
                        <div class="img_banner">
                            <v-img
                              v-if="item.img"
                              max-height="145"
                              max-width="245"
                              style="border-radius: 7px;"
                              src="../indus.jpg"
                              alt="No hay imagen"
                            ></v-img>
                            <div class="input-file-wrap">
<!--                               <v-file-input
                                id="file_inp"
                                outlined
                                height="145"
                                :full-width="true"
                                prepend-icon
                                prepend-inner-icon="mdi-camera"
                                accept="image/png, image/jpeg, image/bmp"
                                label="Agregar img"
                                style="cursor: pointer !important;"
                                hide-details
                                class="input-file"
                              >
                              </v-file-input> -->
                              <input class="file-input" type="file" />
                            </div>
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
                  <v-col cols="2" class="d-flex align-center" >
        
                    <div>
                      <v-checkbox
                        v-model="item.serie_requerido"
                        label="Serie"
                        hide-details
                        class="mb=5"
                      ></v-checkbox>
                    </div>
      
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

                <v-row>
                  <v-col cols="12" sm="8">
                    <v-row>
                      <v-col cols="10">
                        <div class="overline">
                          Instrumentos del Equipo
                        </div>
                      </v-col>
                      <v-spacer></v-spacer>
                      <v-col cols="2 d-flex justify-end pt-2">
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn 
                            depressed 
                            x-small 
                            height="30" 
                            color="info"
                            v-bind="attrs"
                            v-on="on"
                            >
                              <v-icon>mdi-plus</v-icon>
                            </v-btn>
                          </template>
                          <span>Agregar Instrumento</span>
                        </v-tooltip>
                        
                      </v-col>
                    </v-row>
                    <v-divider></v-divider>
                  </v-col>

                  <v-col cols="12" sm="4">
                    <v-row>
                      <v-col cols="10">
                        <div class="overline">
                          Tareas de Calibración
                        </div>
                      </v-col>
                      <v-spacer></v-spacer>
                      <v-col cols="2 d-flex justify-end pt-2">
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn 
                            depressed 
                            x-small 
                            height="30" 
                            color="info"
                            v-bind="attrs"
                            v-on="on"
                            >
                              <v-icon>mdi-plus</v-icon>
                            </v-btn>
                          </template>
                          <span>Agregar Tarea</span>
                        </v-tooltip>
                        
                      </v-col>
                    </v-row>
                    <v-divider></v-divider>
                  </v-col>
                </v-row>

                <v-row class="mt-2" >
                 <v-col cols="12" sm="8">
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
                 <v-col cols="12" sm="4">
                        <v-card height="425" width="auto" flat style="border: 2px groove #D6D6D8 ;">
                            <v-data-table
                            :headers="headers"
                            :items="desserts"
                            hide-default-footer
                            height="420"
                            >
                              <template v-slot:[`item.certificado`]={item}>
                                <v-btn icon fab small :color="item.certificado ? 'success' : 'gray'" @click="show(item)"><v-icon>verified</v-icon></v-btn>
                                <agregar-certificado  @certificar="certificar,actualizarCertificado(item)" ref="cert" @click="show"/>
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
               Calibracion Tarea Realizada
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

export default {
  components:{
    BtnPDF,
    AgregarCertificado
  },
  layout: 'equipo',
  data(){
    return{
      paramsId:null,
      equipo:[],
      item:{
          fecha_creacion_equipo:'',
          fecha_update_equipo:'',
          calibracion_tarea_frecuencia: 23,
          calibracion_tarea_id: "3",
          calibracion_tarea_proxima: "2021-02-23",
          calibracion_tarea_tipo: "prueba",
          calibracion_tarea_ult_efectuada: "2020-02-22",
          descripcion: "Descripción 266",
          id: 9,
          instrumento_creado_usuario: "admin",
          instrumento_create: "2020-02-21 21:00:00",
          instrumento_encargado_calibracion: "systelec",
          instrumento_magnitud: "prueba",
          instrumento_marca: "prueba",
          instrumento_modelo: "prueba",
          instrumento_rango_a: 23,
          instrumento_rango_de: 23,
          instrumento_rango_normal_de:"",
          instrumento_rango_normal_a:"",
          instrumento_resolucion: 23,
          instrumento_serie: "prueba",
          instrumento_tolerancia: 23,
          instrumento_unidad: "prueba",
          instrumento_update: "2020-02-21 21:00:00",
          intrumento_estado: "disponible",
          intrumento_id: "9",
          sector_name: "prueba3",
          sector_planta: "prueba",
          serie_requerido: true,
          tag: "266",
          tipo_instrumento: "prueba",
        },
     headers: [
          { text: 'Dessert (100g serving)', align: 'start', value: 'name'},
          { text: 'Calories', value: 'calories' },
          { text: 'Estatus', value: 'certificado' ,sortable:false }
        ],
     headers2: [
          { text: 'Dessert (100g serving)', align: 'start', value: 'name'},
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          {text: 'Certificado',align: 'center', value: 'protein' }
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            certificado: true,
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            certificado: false
          },
          {
            name: 'Eclair',
            calories: 262,
            certificado: true,

          },
          {
            name: 'Cupcake',
            calories: 305,
            certificado: false,
          },
          {
            name: 'Gingerbread',
            calories: 356,
            certificado: true,
          },
          {
            name: 'Jelly bean',
            calories: 375,
            certificado: true,
          },
          {
            name: 'Lollipop',
            calories: 392,
            certificado: false,
          },
          {
            name: 'Honeycomb',
            calories: 408,
            certificado: true,
          },
          {
            name: 'Donut',
            calories: 452,
            certificado: false,
          },
          {
            name: 'KitKat',
            calories: 518,
            certificado: true,
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
    getEquipo(){
      try {
        const token = Cookies.get('token');

        axios.get(`formulario/${this.paramsId}`,{
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res)=>{
        console.log('Equipos res:', res.data.data)
        this.item = res.data.data[0];
/*      this.item.tag = res.data.data[0].tag;
        this.item.serie = res.data.data[0].serie_requerido;
        this.item.fecha_creacion = res.data.data[0].created_at;
        this.item.fecha_actualizacion_equipo = res.data.data[0].updated_at;
        this.item.descripcion = res.data.data[0].descripcion;
        this.item.marca = res.data.data[0].instrumento.marca;
        this.item.modelo = res.data.data[0].instrumento.modelo;
        this.item.serie_instrumento = res.data.data[0].instrumento.serie;
        this.item.rango_de = res.data.data[0].instrumento.rango_de;
        this.item.rango_a = res.data.data[0].instrumento.rango_a;
        this.item.rango_de_normal = res.data.data[0].instrumento.rango_normal_de;
        this.item.rango_a_normal = res.data.data[0].instrumento.rango_normal_a;
        this.item.resolucion = res.data.data[0].instrumento.resolucion;
        this.item.tolerancia = res.data.data[0].instrumento.tolerancia;
        this.item.encargado_calibracion = res.data.data[0].instrumento.encargado_calibracion;
        this.item.fecha_actualizacion_instrumento = res.data.data[0].instrumento.updated_at; 
        this.item.sector = res.data.data[0].sector.nombre;*/

      })
      } catch (error) {
        console.log(error)
      }
    },
    show(item){
      if(item.certificado == 'false'){
        this.$refs.cert.show();
      }
    },
    certificar(certificado){
      return certificado;
    },
    actualizarCertificado(item){
      item.certificado = true;
    },
  },
  created(){
    this.paramsId = this.$route.params.id;
    this.getEquipo();
  },
}
</script>

<style scoped>
.input-file-wrap {
    background-image: url("/pic.jpg");
    height: 145px;
    width: 245px;
    overflow: hidden;
    position: relative;
    cursor: pointer;
}

.file-input {
    width: 100%;
    height: 100%;
    opacity: 0;
    padding-left: 240px;
    margin-right: -240px;
    cursor: pointer;
}

.img_banner{
  border-radius: 7px;
  border: 3px inset #2A67A5;
  height:150px;
  width:250px;
  background-color: slategrey;
}
</style>