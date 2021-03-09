<template>
  <v-app dark>
    <v-navigation-drawer
      
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
        <v-list-item class="menuUser pointer" @click="drawer=false" to="/instrumento">
          <v-list-item-title>
            <v-icon left color="#295382" align="center" >build</v-icon>
            Instrumentos
          </v-list-item-title>
        </v-list-item>         
        
      </v-list>

      <password/>
    </v-navigation-drawer>

<v-app-bar :clipped-left="clipped" fixed app color="#295382">
      <v-app-bar-nav-icon dark @click.stop="drawer = !drawer" />
      <!--<v-btn dark icon><v-icon  @click.stop="drawer = !drawer">list</v-icon></v-btn>-->
      
      <v-spacer />

<v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn dark icon v-bind="attrs" v-on="on">
            <v-img max-width="40px" max-height="40px" src="user2.png" />
          </v-btn>
        </template>

       <v-list>
          <v-list-item class="menuUser pointer">
            <v-list-item-title  @click="toggleDialogPassword(true)">
              <v-icon left color="#295382" align="center" >lock</v-icon>
              Cambiar Contraseña
            </v-list-item-title>
          </v-list-item>
           <v-list-item class="menuUser poiter" to="/admin">
            <v-list-item-title>
              <v-icon left color="#295382" >settings</v-icon>
              Adm. Usuarios
            </v-list-item-title>
          </v-list-item>
          <v-list-item class="menuUser poiter">
            <v-list-item-title @click="SET_DESLOGIN()">
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
import { mapMutations } from "vuex";
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