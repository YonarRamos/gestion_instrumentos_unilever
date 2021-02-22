<template>
  <v-app dark>
    <v-app-bar fixed app color="#295382">
      <NuxtLink to="/ot">
      <v-btn icon ><v-icon color="white" > west </v-icon></v-btn>
      </NuxtLink>
      <span><h3 class="white--text">Gestionar OT</h3></span>
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
      clipped: false,
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
    ...mapMutations(["toggleDialogPassword"]),
    Salir(){
      console.log("Sale de la aplicacion")
    }
  }
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
