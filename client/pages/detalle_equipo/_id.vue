<template>
  <v-container>
        <v-card>
          <v-container>
            <v-row>
              <v-col>
                <v-card color="rgb(41, 83, 130)" dark class="mt-3">
                  <v-container class="py-0">
                    <v-row>
                      <v-col cols="12" sm="8" class="pb-0">
                        <v-card-title class="pt-0"> {{item.tag}} </v-card-title>
                        <v-card-subtitle class="pb-0">
                          {{item.descripcion}}
                        </v-card-subtitle>
                      </v-col>

                      <v-col cols="12" sm="4" class="d-flex justify-end ">
                        <div class="input-file-wrap">
                          <v-img
                            style="border-radius: 7px;"
                            src="../indus.jpg"
                            alt="No hay imagen"
                            class="img"
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
                  <v-col cols="2" class="d-flex align-center" >
        
                    <div>
                      <v-checkbox
                        v-model="item.serie_requerido"
                        label="Serie"
                        disabled
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



          <v-container class="pt-0" >
            <v-card color="#FAFAFA"> 
              <v-container>
                <v-row class="mt-2" >
                 <v-col cols="12" sm="7">


                  <v-row>
                    <v-col class="d-flex pt-0">
                      <div class="overline d-flex align-end" style="padding-top:8px;">
                        Instrumentos del Equipo
                      </div>
                      <asignar-instrumento :equipo="item" :equipoID="$route.params.id" @click="getEquipo" class="ml-3"/>
                    </v-col>  
                                          
                  </v-row> 
                  <v-divider></v-divider>    
                    <v-row class="mt-3">
                        <v-col cols="6">
  
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
                <v-col cols="12" sm="5">
                    <v-row>
                      <v-col cols="10" class="pt-2">
                        <div class="overline">
                          Asignaciones
                        </div>
                      </v-col>
                      <v-spacer></v-spacer>
                      <v-col cols="2 d-flex justify-end pt-2">
                     <!--    <agregar-calibracion :instrumento="item"/>-->
                      </v-col>
                    </v-row>
                      <v-divider></v-divider>
                        <v-card height="425" width="auto" flat style="border: 2px groove #D6D6D8 ;" class="mt-3">
                            <v-data-table
                            :headers="headersEquiposAsignados"
                            :items="equipoAsignado"
                            hide-default-footer
                            height="420"
                            >
                              <template v-slot:[`item.desde`]={item}>
                                {{item.desde.toString().slice(0,10)}}
                              </template>
                              <template v-slot:[`item.hasta`]={item}>
                                {{item.hasta.toString().slice(0,10)}}
                              </template>
<!--                               <template v-slot:[`item.certificado`]={item}>
                                <agregar-certificado  @certificar="certificar" ref="cert" @click="show"/>
                                <v-btn icon fab small :color="item.certificado ? 'success' : 'gray'" @click="show(item)"><v-icon>verified</v-icon></v-btn>
                              </template> -->
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
                <v-row>      
                  <v-col cols="12" sm="6">
                    <v-row>
                      <v-col class="d-flex pr-1">
                        <div class="overline" style="padding-top:8px;">
                          Tareas de Calibracion
                        </div>
                        <agregar-calibracion :instrumento="item" @click="getEquipo" class="ml-3"/>
                      </v-col>
                    </v-row>
                      <v-divider></v-divider>
                        <v-card height="425" width="auto" flat style="border: 2px groove #D6D6D8;" class="mt-2">
                            <v-divider/>
                            <v-data-table
                            :headers="headersTareasCalibracion"
                            :items="tareasCalibracion"
                            hide-default-footer
                            height="420"
                            >
                            <template v-slot:[`item.cargar`]>
                                <cargar-tarea-calibracion-realizada :calibracion_tarea_id="item.num_tarea"/>
                            </template>
                            </v-data-table> 
                        </v-card>     
                  </v-col>
                  <v-col cols="12" sm="6" class="mt-2">  
                    <div class="overline">
                      Tareas de Calibración Realizadas
                    </div>
                    <v-divider></v-divider>                    
                      <v-card height="425" width="auto" flat style="border: 2px groove #D6D6D8 ;" class="mt-2">
                          <v-data-table
                          :headers="headersTareasRealizadas"
                          :items="tareasRealizadas"
                          hide-default-footer
                          height="420"
                          >
                            <template v-slot:[`item.certificado`]={item}>
                                <v-tooltip bottom>
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn 
                                    :v-on="on" 
                                    v-bind="attrs" 
                                    text  
                                    small 
                                    color="info"
                                    :href="`http://127.0.0.1:3333/Pdf/${item.certificado}`" 
                                    target="_blank"
                                    download
                                    >
                                    <v-icon>mdi-download</v-icon>Descargar</v-btn>
                                  </template>
                                  <span>Descargar Certificado</span>
                                </v-tooltip>  
                            </template>
                          
                          </v-data-table>
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
import AsignarInstrumento from "~/components/common/AsignarInstrumento.vue";
import AgregarCalibracion from "~/components/common/AgregarCalibracion.vue";
import CargarTareaCalibracionRealizada from "~/components/common/CargarTareaCalibracionRealizada.vue";

export default {
  components:{
    BtnPDF,
    AgregarCertificado,
    AgregarCalibracion,
    CargarTareaCalibracionRealizada,
    AsignarInstrumento
  },
  layout: 'equipo',
  data(){
    return{
      paramsId:null,
      equipo:[],
      equipoAsignado:[],
      listRutas:[],
      item:{
          fecha_creacion_equipo:'',
          fecha_update_equipo:'',
          calibracion_tarea_frecuencia: null,
          calibracion_tarea_id: null,
          calibracion_tarea_proxima: "",
          calibracion_tarea_tipo: "",
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
          instrumento_rango_normal_de:"",
          instrumento_rango_normal_a:"",
          instrumento_resolucion: null,
          instrumento_serie: "",
          instrumento_tolerancia: null,
          instrumento_unidad: "",
          instrumento_update: "",
          intrumento_estado: "",
          intrumento_id: "",
          sector_name: "",
          sector_planta: "",
          serie_requerido: null,
          tag: "",
          tipo_instrumento: "",
        },
     headersEquiposAsignados: [
          { text: 'Equipo', align: 'start', value: 'equipo'},
          { text: 'Instrumento', value: 'instrumento' },
          { text: 'Desde', value: 'desde' },
          { text: 'Hasta', value: 'hasta' },
        ],
     headersTareasRealizadas: [
          { text: 'N°', align: 'start', value: 'Num_tarea'},
          { text: 'Instrumento', value: 'intrumento' },
          { text: ' Fecha Realización', value: 'fecha' },
          { text: 'Encargado', value: 'realizo' },
          {text: 'Certificado',align: 'center', value: 'certificado' }
        ],
      headersTareasCalibracion: [
          { text: 'N°', align: 'start', value: 'num_tarea'},
          { text: 'Tipo de Calibración', align: 'start', value: 'calibracion_tarea_tipo'},
          { text: 'Frecuencia', value: 'calibracion_tarea_frecuencia' },
          { text: 'Ultima Efectuada', value: 'calibracion_tarea_proxima' },
          {text: 'Proxima Calibracion',align: 'center', value: 'calibracion_tarea_proxima' },
          {text: 'Cargar',align: 'center', value: 'cargar' }
        ],
        tareasCalibracion: [],
        tareasRealizadas: [],
    }
  },
  methods:{
    getRutas() {

      try {
        const token = Cookies.get('token');

        axios
        .get("sector", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => {
        
          this.listRutas = res.data.listRutas;

          console.log(this.listRutas)

        })
      } catch (error) {
        console.log('Error al traer rutas')
      }
    },
   async getEquipo(){
      try {
        const token = Cookies.get('token');

       await axios.get(`equipo/${this.paramsId}`,{
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res)=>{
        //console.log('res:',res.data.data[0].detalleEquipos )
        this.item = res.data.data[0].detalleEquipos;

        var auxRuta = this.listRutas.find(el => el.i == this.item.sector_id);

        if (auxRuta !== undefined)
        {
          this.item.sector_name = auxRuta.ruta;
        }
        else
        {
          this.item.sector_name = 'Error en ruta';
        }
        //Tareas de calibracion pendientes
        //console.log('DALEEEEEEE ' , res.data.data[0].calibracion)
        this.tareasCalibracion = res.data.data[0].calibracion;
        
      })
      } catch (error) {
        console.log(error)
      }
    },
     async getEquipoAsignado(){
      try {
        const token = Cookies.get('token');
        await axios.get(`EquipoAsignado/${this.paramsId}`,{
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res)=>{
        console.log('resEquipoAsignado:',res.data.data.data);
        this.equipoAsignado = res.data.data;
      })
      } catch (error) {
        console.log(error)
      }
    },
    async getTareasRealizadas(){
      const token = Cookies.get('token');
      try {
        await axios.get('TareaRealizada',{
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res)=>{
          console.log('res Tareas Realizadas',res.data.data);
          this.tareasRealizadas = res.data.data;
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
  mounted(){
    this.paramsId = this.$route.params.id
    this.getRutas();
    this.getEquipo();
    this.getEquipoAsignado();
    this.getTareasRealizadas();
  },
}
</script>

<style scoped>
.img{
  width: 245px;
  height: 145px;
}
.input-file-wrap {
    background-image: url("/pic.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: 145px;
    width: 245px;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    border-radius: 7px;
    border: 3px inset #2A67A5;
}

.file-input {
    width: 100%;
    height: 100%;
    opacity: 0;
/*     padding-left: 240px;
    margin-right: -240px; */
    cursor: pointer;
}

@media screen and (max-width: 480px) {
  .input-file-wrap {
      height: 195px;
      width: 100%;
  }
  .file-input {
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
}
.img{
  width: 100%;
  height: 195px;
}
}

/* .img_banner{
  border-radius: 7px;
  border: 3px inset #2A67A5;
  height:150px;
  width:250px;
  background-color: slategrey;
} */
</style>