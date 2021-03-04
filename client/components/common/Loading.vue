<template>
    <v-dialog
      v-model="dialogLoading"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          {{tag}}...
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
</template>

<script>
import { mapState } from "vuex";
export default {
    props:{
        tag: String
    },
    computed:{
        ...mapState(['dialogLoading'])
    }
}
</script>

<style>

</style>