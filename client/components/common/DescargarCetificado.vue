<template>
  <v-icon small @click="downloadCert(idEquipo)"> mdi-download </v-icon>
</template>

<script>
export default {
    props:{
        idEquipo:{
          type: Number,
          required: true
        }
    },
    data(){
        return{

        }
    },
    methods:{
      async downloadCert(inId) {
        try {
          await axios
          .get("download/lastcert", {
          headers: { Authorization: `Bearer ${this.token}`}, params: {id: inId}
        })
        } catch (error) {
          
        }
        
      },
    }
}
</script>

<style>

</style>