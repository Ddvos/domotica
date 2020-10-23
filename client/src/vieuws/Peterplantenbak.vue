<template>
<div class="app">

  <div class="navbar navbar-dark bg-dark shadow-sm">
    <div class="container">
      <a href="#" class="navbar-brand d-flex align-items-center">
        <strong>Peter Plantenbak</strong>
      </a>
            <div class="notification"> 
            <p>Notifications</p>
            </div>
     
    </div>
  </div>

  <!-- Full Page Image Header with Vertically Centered Content -->
<!-- <div class="hero-image">
  <div class="hero-text">
    <h1 class="font-weight-light">Overview status Peter Plantenbak</h1>
        <p class="font-weight-light">Hier kan je de huidige waardes van sensoren uitlezen</p>
  </div>
</div> -->
<br>

  <!-- Below you ccn find all the sensor data -->

  <div class="row">
    <div class="col-3"></div>
    <div class="col-3">
       <div class="valueBackground">
        <h2 class="valueHeadText">Soil moisture</h2>
             <!--We are using the LineChart component imported below in the script and also setting the chart-data prop to the datacollection object-->
              <line-chart :chart-data="datacollection"></line-chart>
      </div>    
    </div>
    <div class="col-3">
      <div class="valueBackground">
        <h2 class="valueHeadText">Temperature</h2>
             <LiveTempChart></LiveTempChart> 
      </div>
    </div>
    <div class="col-3"></div>
  </div>
  <div class="row">
    <div class="col-3"></div>
    <div class="col-3">
      <div class="valueBackground">
        <h2 class="valueHeadText">Lux index</h2>
            <p>{{lux}} lumen/m²</p>
        </div>
        
    </div>
    <div class="col-3">
      <div class="valueBackground">
        <h2 class="valueHeadText">Water tank level</h2>
          <div class="meldingen">
            <p>- humidity is good</p>
            <p v-if="vlotter">- Water tank is almost empty</p> 
          </div>
      </div>
    </div>
    <div class="col-3"></div>
  </div>



 
 <!-- This is the footer -->
  <div class="text-muted py-5">
    <div class="container">
        <p class="mb-1">Peter Plantenbak &copy; Circus family</p>
    </div>
 </div>
</div>
</template>
<script src="../../node_modules/osc/dist/osc-browser.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>

            
<script>
import osc from "osc";
import $ from 'jquery';
import LineChart from '../components/Line.vue';
import LiveTempChart from '../components/liveTempChart.vue'


  
       //     const WS_URL = 'wss://circusfamilyprojects.nl:6084';
        //    const ws = new WebSocket(WS_URL);
        //   let urlObject
            


/// websocket for sending and receiving osc
 var port = new osc.WebSocketPort({
          url: "wss://circusfamilyprojects.nl:8084" // ws://localhost:8083 online server wss://circusfamilyprojects.nl:8084
        }); 

 port.open();


export default {
  

  data() {
  return{
  Bodemvochtigheid: '',
  Temperatuur:21,
  lux:0,
  vlotter: true,
  Waterstand: 0, // true is eagle to high
  toggled: false,
  datacollection: null,
  urlImage: "",

    
    
    
     
    
  }},
   created: function(){
             this.OSCMessage();      
          //console.log(message);
         this.fillData ()
         this.getImgUrl()
     },
  components: {
       LineChart,
       LiveTempChart,
   


  },
  methods:{
      getImgUrl: function(){
          // ws.onopen = () => console.log(`Connected to ${WS_URL}`);
          //  ws.onmessage = message => {
          //       console.log(message.data);
           //     const arrayBuffer = message.data;
           //     if(urlObject){
           //         URL.revokeObjectURL(urlObject);
                    
          //      }
          //      urlObject = URL.createObjectURL(new Blob([arrayBuffer]));
           //     this.urlImage=  urlObject;
                 //console.log(urlObject )
          //  }

      },


    greet: function(){
      
      port.send({
        address: "/hello",
          args: ["De slider werkt!"]
         });
    },
      sendSlider: function(){

        port.send({
        address: "/hello",
          args: [this.value]
         });

     },
      OSCMessage: function(){ 
               
        port.on("message", (oscMessage) => {
          
             //console.log(oscMessage);
             this.OSCMessages(oscMessage);
          
      });
     },
      OSCMessages: function(oscMessage){ 

       if(oscMessage.address == '/temp'){
         this.Temperatuur = oscMessage.args[0];
         //console.log(this.Temperatuur);
        }

        if(oscMessage.address == '/bodem'){
         this.Bodemvochtigheid = oscMessage.args[0];
         //console.log(this.Bodemvochtigheid);
        }

          if(oscMessage.address == '/lux'){
         this.lux = oscMessage.args[0];
         //console.log(this.Bodemvochtigheid);
        }

        

        if(oscMessage.address == '/vlotter'){
            console.log(oscMessage.args[0]);
         if(oscMessage.args[0] == 1){
              // waterbak is vol
                this.vlotter = false
         }else{
             // waterbak is leeg
               this.vlotter = true
         }
         
        }

        this.fillData ();
         
     }, 

       fillData () {
        this.datacollection = {
          labels: [ 
            "",
            "",
            "",
            "",
            ],
          datasets: [
            {
              label: '',
             
              fill: true,
               fontColor: "white",
              backgroundColor: 'rgba(43, 208, 180,0.8)',
              borderColor:'rgba(255, 255, 255,0.9)',
              data: [this.Bodemvochtigheid+1,this.Bodemvochtigheid,this.Bodemvochtigheid-0.5 ,this.Bodemvochtigheid+0.5],
                pointRadius: 0,
            },
          ], 
        }
      },
   
  },
  
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Didact+Gothic&display=swap');

html {
    height: 100%;
}

.app{
   position: relative;
   width: 100%;
  height: 100vh;
   color: white;
background-color: 	#15232e;
}
h3 {
      
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}

.wrapper{
  padding-top: 20px;
}

.btn-primary{
    margin-top: 20px;
}


.col-3{
    font-family: 'Didact Gothic', sans-serif;
    color: #2bd0b4;
    margin: 10px;
    width: 80%;
    max-height: 350px;
}


.valueHeadText{
    font-family: 'Didact Gothic', sans-serif;
     color: #2bd0b4;
    margin: 5px;
}

.valueBackground{
    border-radius: 10px;
    color:  #ffffff;
     font-size: 50px;
     background-color: #1f2935;
     width: 100%;
    height:100%;
}
.lux{
    color:  #ffffff;
     font-size: 50px;
}
.notification{
    text-align: center;
    color:  #ffffff;
    margin-top: 15px;
     font-size: 15px;
}
.besturing{
       color:  #ffffff;
     font-size: 20px;
}
pre{
     color:  #ffffff;
}

.hero-image {
  min-height: 250px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url("../assets/headerimage.jpg");
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.hero-text {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
}



</style>