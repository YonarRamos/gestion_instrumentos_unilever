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
                        <v-card-title class="pt-0"> Formulario Equipos N°{{item.tag}} </v-card-title>
                        <v-card-subtitle>
                          Descripción del equipo
                        </v-card-subtitle>
                      </v-col>
                      <v-spacer></v-spacer>
                      <v-col class="d-flex justify-end">
                        <v-img
                          max-height="150"
                          max-width="250"
                          src="../indus.jpg"
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
                        v-model="item.tag"
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
                          v-model="item.serie"
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
                          v-model="item.fecha_creacion"
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
                  <v-col cols="12" md="6" class="">

                        <v-text-field
                            v-model="item.fecha_actualizacion_equipo"
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
                        v-model="item.marca"
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
                        v-model="item.modelo"
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
                        v-model="item.serie_instrumento"
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
                          v-model="item.rango_de"
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
                          v-model="item.rango_a"
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
                          v-model="item.rango_de_normal"
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
                          v-model="item.rango_a_normal"
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
                          v-model="item.resolucion"
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
                          v-model="item.tolerancia"
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
                          v-model="item.tipo_instrumento"
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
                          v-model="item.unidad"
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
                          v-model="item.magnitud"
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
                          v-model="item.usuario"
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
                          v-model="item.encargado_calibracion"
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
                            v-model="item.fecha_actualizacion_instrumento"
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
                        v-model="item.sector"
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
                          v-model="item.planta"
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
            <v-col class="d-flex justify-end">
              <v-spacer></v-spacer>
              <btn-pdf :equipo="item" />
            </v-col>
          </v-card-actions>
        </v-card>
  </v-container>
</template>

<script>
import BtnPDF from "~/components/common/btnPDF.vue";
import axios from '~/plugins/axios';
import Cookies from 'js-cookie';

export default {
  middleware: 'NOAUTH',
  components:{
    BtnPDF
  },
  layout: 'equipo',
  data(){
    return{
      paramsId:null,
      equipo:[],
      item:{
        tag:"",
        descripcion:"",
        serie:"",
        fecha_creacion:"",
        fecha_actualizacion_equipo:"",
        marca:"",
        modelo:"",
        serie_instrumento:"",
        rango_de:"",
        rango_a:"",
        rango_de_normal:"",
        rango_a_normal:"",
        resolucion:"",
        tolerancia:"",
        tipo_instrumento:"",
        unidad:"",
        magnitud:"",
        usuario:"",
        encargado_calibracion:"",
        fecha_actualizacion_instrumento:"",
        sector:"",
        planta:""
      }
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
        this.item.tag = res.data.data[0].tag;
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

        this.item.sector = res.data.data[0].sector.nombre;

      })
      } catch (error) {
        console.log(error)
      }
    }
  },
  created(){
    this.paramsId = this.$route.params.id;
    this.getEquipo();
  },
}
</script>

<style>
</style>