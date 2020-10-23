<script>
// this line chart is for Peter Plantenbak
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins

export default {
       extends: Line, //We are extending the base chart class as mentioned above
        mixins: [reactiveProp],
        data () {
          return {
            options: {
              scales: {
                    yAxes: [{
                        display: true,
                        ticks: {
                             min: 0,
                             max: 10,
                             stepSize: 2,
                              fontColor: "white", // To format the ticks, coming on the axis/lables which we are passing.
                               fontSize: 14
                        }
                    }]
                },
                legend: { 
                  display: false
                },
                backgroundRules: [{
                    backgroundColor: 'rgba(255, 0, 0,1)', 
                    yAxisSegement: 4
                }, {
                    backgroundColor: 'rgba(0, 255, 0,1)',
                    yAxisSegement: 7
                }, {
                    backgroundColor: 'rgba(0, 0, 255,1)',
                    yAxisSegement: 10
                }],
            },
                
                
            
            
          }
        },     
   

  mounted() {

    this.addPlugin({
        id: 'kwhWeek',
        beforeDraw(chart) {
          var rules = chart.chart.options.backgroundRules;
                    var ctx = chart.chart.ctx;
                    var yAxis = chart.chart.scales["y-axis-0"];
                    var xaxis = chart.chart.scales["x-axis-0"];
                    for (var i = 0; i < rules.length; ++i) {
                        var yAxisSegement = (rules[i].yAxisSegement > yAxis.ticksAsNumbers[0] ? yAxis.ticksAsNumbers[0] : rules[i].yAxisSegement);
                        var yAxisPosStart = yAxis.height - ((yAxisSegement * yAxis.height) / yAxis.ticksAsNumbers[0]) + chart.chart.controller.chartArea.top;
                        var yAxisPosEnd = (i === 0 ? yAxis.height : yAxis.height - ((rules[i - 1].yAxisSegement * yAxis.height) / yAxis.ticksAsNumbers[0]));
                        ctx.fillStyle = rules[i].backgroundColor;
                        ctx.fillRect(xaxis.left, yAxisPosStart, xaxis.width, yAxisPosEnd - yAxisPosStart + chart.chart.controller.chartArea.top);
                    }
        },
      });
 
        // this.chartData is created in the mixin
          this.renderChart(this.chartData, this.options)
  }
};
</script>
<style scoped>
.chartjs-render-monitor{
     max-height: 300px;
    max-width: 300px;
    
}
</style>