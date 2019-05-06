<template>
  <div>
    <div>
      <span>{{ selectedHtml }}</span>
    </div>
    <v-container fluid grid-list-sm>
      <v-layout row wrap>
        <v-flex v-for="item in $store.state.prefs" :key="item.prefCode" xs1>
          <v-checkbox
            v-model="selected"
            :label="item.prefName"
            :value="item.prefName"
            @change="updateData"
          ></v-checkbox>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  data() {
    return {
      selected: []
    }
  },
  computed: {
    selectedHtml: function() {
      return '都道府県: ' + _.join(Object.values(this.selected), ' / ')
    }
  },
  methods: {
    updateData() {
      this.$store.dispatch('setSelectedPrefs', this.selected)
    }
  }
}
</script>
