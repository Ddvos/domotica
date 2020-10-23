<script>
import osc from "osc";

import { Line, mixins } from 'vue-chartjs' // We specify what type of chart we want from vue-chartjs and the mixins module
import 'chartjs-plugin-streaming';

      const { reactiveProp } = mixins

       /// websocket OSC Data receiving and sending 
        var port = new osc.WebSocketPort({
                url: "wss://circusfamilyprojects.nl:8084" //ws://localhost:8083 online server wss://circusfamilyprojects.nl:8084
              }); 

      port.open();

// value sensor input

let Temperatuur = '';





      export default {
        extends: Line, //We are extending the base chart class as mentioned above
        mixins: [reactiveProp],
        data () {
          return {
             //valueOne: 4000,
          }
          },
           created: function(){
             this.OSCMessage();      
          //console.log("hallo");       

     },
        
        mounted () {

              port.on("message", (oscMessage) => {
              //console.log(oscMessage);

              if(oscMessage.address == '/temp'){
                    Temperatuur = oscMessage.args[0];
                // console.log(throttle);
                 }
           });
          // this.chartData is created in the mixin
              
       this.renderChart({
        datasets:[ {
          label: 'Incoming temp',
					backgroundColor: '#27D9D9',
					borderColor: '#27D9D9',
					fill: false,
					cubicInterpolationMode: 'monotone',
          
          data: [],
           pointRadius: 0,
          },
        ]
        }, {
          scales: {
             xAxes: [{
              type: 'realtime',
              realtime:{
                duration: 60000,
                ttl: 80000,
                refresh: 1000,
                delay: 0,
                pause: false,
                onRefresh: function(chart) {
                  
                   chart.data.datasets[0].data.push({
                        x: Date.now(),
                        y: Temperatuur
                      });
                
                

                },
              },
              gridLines: {
                display:false
              },
              elements: {
                    point:{
                        radius: 0
                    }
                }
            }]
          }
        });
      },
     methods:{
       OSCMessage: function(){ 
            
    
      },
     }
    }
    </script>