import { Bar, mixins } from 'vue-chartjs'


export default {
 
  mixins: [mixins.reactiveProp],
  props:{

  },

  mounted () {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options)
  }
}