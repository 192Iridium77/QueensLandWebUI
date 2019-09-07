<template>
<div class="small">
  <line-chart :chart-data="datacollection"></line-chart>
  <button @click="fillData()">Randomize</button>
</div>
</template>

<script>
import LineChart from './LineChart.js';
import { map, groupBy } from "lodash";

export default {
  components: {
    LineChart
  },
  data() {
    return {
      datacollection: null
    }
  },
  props: ["data"],
  mounted() {

    this.fillData()
  },
  methods: {
    fillData() {
      const grouped = groupBy(this.data, "Crash_Atmospheric_Condition")
      console.log('GROUPED', grouped)
      this.datacollection = {
        labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        datasets: map(grouped, (value, key) => {
          console.log('KEY', key)
          const data = map(value, v => {
            return Number(v.Count_Casualty_Total)
          })
          console.log('DATA', data)
          let backgroundColor = '#FFB74D';
          if (key === "Raining") backgroundColor = '#039BE5';
          if (key === "Fog") backgroundColor = '#BDBDBD';
          return {
            label: key,
            backgroundColor,
            data
          }
        })
      }


      // this.datacollection = {
      //   labels: [this.getRandomInt(), this.getRandomInt()],
      //   datasets: [{
      //     label: 'Data One',
      //     backgroundColor: '#f87979',
      //     data: [this.getRandomInt(), this.getRandomInt()]
      //   }, {
      //     label: 'Data One',
      //     backgroundColor: '#f87979',
      //     data: [this.getRandomInt(), this.getRandomInt()]
      //   }]
      // }

    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  }
}
</script>

<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>
