<template>
  <v-app dark>
<!--     <v-navigation-drawer
      
       v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      
      app
    >

      <v-list>       
        <v-list-item class="menuUser pointer" @click="drawer=false" to="/">
          <v-list-item-title>
            <v-icon left color="#295382" align="center" >list</v-icon>
            Equipos
          </v-list-item-title>
        </v-list-item>        
        <v-list-item class="menuUser pointer" @click="drawer=false" to="/datos">           
          <v-list-item-title>
            <v-icon left color="#295382" align="center" >post_add</v-icon>
            Carga de Datos
          </v-list-item-title>
        </v-list-item>
      </v-list>

      <password/>
    </v-navigation-drawer>
 -->
<v-app-bar :clipped-left="clipped" fixed app color="#295382">
      <v-btn 
      icon 
      dark 
      @click="redirigir"
      >
        <v-icon dark>
          keyboard_backspace
        </v-icon>
      </v-btn>
      <span class="white--text ml-2"><strong>Equipos</strong></span>
      
      <v-spacer />

<v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn dark icon v-bind="attrs" v-on="on">
            <v-img max-width="40px" max-height="40px" src="../user2.png" />
          </v-btn>
        </template>

       <v-list>
          <v-list-item class="menuUser pointer">
            <v-list-item-title  @click="toggleDialogPassword(true)">
              <v-icon left color="#295382" align="center" >lock</v-icon>
              Cambiar Contraseña
            </v-list-item-title>
          </v-list-item>
          <v-list-item class="menuUser poiter">
            <v-list-item-title @click="Salir()">
              <v-icon left color="#295382" >west</v-icon>
              Salir
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
        <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import password from "@/components/cambiarPassword";

export default {
  components:{
    password
  },
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
  methods: {
    ...mapMutations(["SET_DESLOGIN"]),
    Salir(){
     // console.log(...mapMutations())
      this.SET_DESLOGIN();
    },
    redirigir(){
      this.$router.back();
    }
  },
}
</script>

<style scoped>
a {  
  text-decoration: none;
  color:rgb(0, 0, 0, 0.87);
  }
.menuUser:hover{
 background: rgb(189, 189, 189);
  
}
.pointer {cursor: pointer;}
</style>