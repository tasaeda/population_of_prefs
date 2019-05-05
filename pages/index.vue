<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-xs-center">
        <Prefs />
      </div>

      <div class="text-xs-center">
        <Graph />
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import Prefs from '~/components/Prefs.vue'
import Graph from '~/components/Graph.vue'

export default {
  components: {
    Prefs,
    Graph
  },
  mounted() {
    this.$store.dispatch('getPrefs')
  }
}
</script>
