<template>

<div class="hello">
  <div class="navbar navbar-dark bg-dark shadow-sm">
    <div class="container">
      <a href="#" class="navbar-brand d-flex align-items-center">
        <strong>Dominique</strong>
      </a>
    </div>
  </div>

  <div class="row py-lg-5">
      <div class="col-lg-6 col-md-8 mx-auto">
        <h1 class="font-weight-light">RC car control</h1>
        <p class="lead text-muted">bestuur de auto via deze pagina</p>
        <p>
  
        </p>
      </div>
  </div>

  <div class="album py-5 bg-light">
    <div class="transmit">
      <h3>Transmit OSC data</h3>
      <a href="#" class="btn btn-primary">Turn something on</a>

      <br>
      <div class="wrapper">
        <input type="range" min="0" max="100" step="1" v-model="value" v-on:input="sendSlider" > 
        <span v-text="total"></span>
      </div>

      
    </div>
    <div class="receive">
      <h3>Receive OSC data</h3>
       <div id="messageArea">
            <p id="messageLabel">Remote OSC Message:</p>

            <div class="row">
              <div class="col-2"></div>
              <div class="col-4">
                       <!-- <span v-text="OSCMessage"></span>  -->
                    <p>{{this.address}}</p>
                      <!-- <p>{{this.message}}</p>  -->
                    <div class="color" v-bind:style="{ 'background-color': this.message }"></div> 
              </div>
              <div class="col-4">
                 <p>{{this.address2}}</p>
                 <p>{{this.message2}}</p> 
              </div>
               <div class="col-2"></div>
            </div>
      </div>
    </div>
    <div class="container">
      <div class="broadcasting">

      </div>

       <div class="animation">
          <video  v-on:mousemove="updateCoordinates" id="myVideo" ref="myVideo" width="650" height="360">
              <source src="../assets/WORLD_50fps.mp4" type="video/mp4"> 
                  Your browser does not support the video tag.
              </video>
             <p >
              Coordinates: {{ x }} <br /> 
             </p>

      </div>

    </div>
  </div>
  <div class="text-muted py-5">
  <div class="container">
    <p class="mb-1">Domotica control is &copy; Circus family</p>
  </div>
</div>
<button v-on:click="greet">send</button>
</div>
  
</template>
<script src="../../node_modules/osc/dist/osc-browser.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

            
<script>
import osc from "osc";
import $ from 'jquery';


 var port = new osc.WebSocketPort({
          url: "wss://circusfamilyprojects.nl:8084" // ws://localhost:8083 online server wss://circusfamilyprojects.nl:8084
        }); 

 port.open();


export default {
  

  data() {
  return{
    value: 60,
    addressen:[],
    message:'',
    address:'',
    message2:'',
    address2:'',
    videoTime: 30,
    x: 0,
    
    
    
     
    
  }},
   created: function(){
             this.OSCMessage();      
          //console.log(message);

     },
  computed: {
   

   
    total: function () {
        
      return this.value 
    }
  },
  methods:{
    updateCoordinates: function(event) {

      var rect = myVideo.getBoundingClientRect(); // postion of video element 
      console.log(rect.right, rect.left);
     
      this.x =(event.clientX-rect.left)*((5)/(rect.right-rect.left));
      this.x =  this.x.toFixed(2)
   console.log( this.x);
      //
       this.$refs.myVideo.currentTime =this.x; 
        //this.$refs.myVideo.play();

        //sending mouse postion value over OSC to the studio
         port.send({
          address: "/mousePosition ",
          args: [this.x]
         });
    
    },
     videoPlayBack: function () {
        //var vid = document.getElementById("myVideo");
     
           //this.$refs.myVideo.currentTime=10;
           // vid.play();
  
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
          
             console.log(oscMessage);
             this.OSCMessages(oscMessage);
          
      });
     },
      OSCMessages: function(oscMessage){ 
  
         
        var n = this.addressen.includes(oscMessage.address) // looks if address exist in the array if not N false otherwise it is true
         
        //console.log(oscMessage);
        if(n == false) {   // if n is false address dont exist en will add new adress in the array                    
            this.addressen.push(oscMessage.address);            
        }

        // first address with data
      if(oscMessage.address == this.addressen[0] ){
          this.message= 'rgb('+oscMessage.args+')'
          this.address= oscMessage.address
          //console.log(this.message); 
        }

    // second address with data
      if(oscMessage.address == this.addressen[1] ){
          this.message2= oscMessage.args
          this.address2= oscMessage.address
          //console.log(this.message); 
        }
         
     }, 
   
  },
  
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

.color {
  margin: auto;
  width: 50%;
  width: 80px;
  background-color: rgba(71, 255, 178, 0.699);
  height: 80px;
  
}



</style>