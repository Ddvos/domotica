<script>
import { Radar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins

export default {
       extends: Radar, //We are extending the base chart class as mentioned above
        mixins: [reactiveProp],
        data () {
          return {
            options: {
               scale: {
                   ticks: {
                      max: 1,
                      min: 0,
                        stepSize: 0.1
                   }
                },
            }
          }
        },     
   

  mounted() {
        // this.chartData is created in the mixin
          this.renderChart(this.chartData, this.options)
  }
};
</script>