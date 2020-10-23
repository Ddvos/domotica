<script>
import { Line } from "vue-chartjs";

export default {
    valueOne: 4,
    valueTwo: 8,
    valueThree: 2,
    valueFour: 7,
    valueFive: 5,
  extends: Line,
  mounted() {
    this.renderChart(
      {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
        ],
        datasets: [
          {
            label: "Data 1",
            data: [this.valueOne, this.valueTwo, this.valueThree, this.valueFour, this.valueFive],
            backgroundColor: "transparent",
            borderColor: "rgba(1, 116, 188, 0.50)",
            pointBackgroundColor: "rgba(171, 71, 188, 1)"
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "My Data"
        }
      }
    );
  },
  computed:{
     
  }
};
</script>