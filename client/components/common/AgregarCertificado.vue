<template>
    <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="300"
    >
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Agregar Certificado
        </v-card-title>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="certificar"
          >
            Certificar         
            </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
    data(){
        return{
            dialog:false,
            certificado: true
        }
    },
    methods:{
        show(){
          this.dialog = true
        },
        certificar(){
          this.$emit("certificar", this.certificado);
          this.dialog=false;

        }
    }
}
</script>

<style>

</style>