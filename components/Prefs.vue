<template>
  <div>
    <v-container fluid grid-list-sm>
      <v-layout row wrap>
        <v-flex v-for="item in $store.state.prefs" :key="item.prefCode" xs1>
          <v-checkbox
            v-model="selected"
            :label="item.prefName"
            :value="item.prefCode"
            @change="updateData"
          ></v-checkbox>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: []
    }
  },
  methods: {
    updateData() {
      this.$store.dispatch('setSelectedPrefs', this.selected)
    }
  }
}
</script>
