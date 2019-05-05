<template>
  <div>
    <div>
      <chart :chart-data="$store.state.datacollection" />
    </div>
  </div>
</template>

<style>
canvas {
  height: 480px !important;
  width: 100%;
}
</style>

<script>
import Chart from './Chart'

export default {
  components: {
    Chart
  }
}
</script>
