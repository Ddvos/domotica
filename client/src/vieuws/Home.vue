<template>
<div class="background">
  <div class="row">
    <div class="col-2" >
      <div class="data">
        <h3>Car Control</h3>
         <ul>
          <li>status: {{status}}</li>
          <li>snelheid: {{speed}}km</li>
          <li>accu: {{accu}}%</li>
          <li>trim: {{trim}}km</li>
          <li>verlichting: {{light}}</li>
          <li>camera: {{camera}}</li>
        </ul>
      </div>
   </div>
   <div class="col-10" >
    <div class="livefeed">
        <video mute='true' playsinline autoplay id='v'  ></video> <!--  //v-bind:style="{ 'border': '7px solid'+color1.hex+'' }" -->
    </div>
  </div>

 </div>
</div>
  
</template>


            
<script>
import osc from "osc";



 var port = new osc.WebSocketPort({
          url: "wss://circusfamilyprojects.nl:8084" // ws://localhost:8083 online server wss://circusfamilyprojects.nl:8084
        }); 

 port.open();


export default {
  

  data() {
  return{
    
    status: "ok",
    speed: 0,
    accu: 0,
    trim: 0,
    light: "uit",
    camera: "offline",
    
     
    
  }},
   created: function(){
             this.OSCMessage();      
          //console.log(message);

     },
  computed: {
   

   
  },
  methods:{

      OSCMessage: function(){ 
               
        port.on("message", (oscMessage) => {
          
             console.log(oscMessage);
             this.OSCMessages(oscMessage);
          
      });
     },
      OSCMessages: function(oscMessage){ 
  
         
    console.log(oscMessage)
         
     }, 
   
  },
  
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.background{
  width: 100vw;
  height: 100vh;
  background: #1e3a42;
}

.row,.col-10,.col-2{
     margin: 0;
    padding:0;
  }


.data{
  position: relative;
  color: white;
  padding-top: 50px;

   width: 100%;
  height: 100vh;
    background-color: #1e3a42;

}

ul {
    list-style-type: none;
    text-align: left;
    padding-top: 30px;
    padding-left: 60px;
}

.livefeed{
   width: 100%;
  height: 100%;
}

  video{
   // position: absolute;
    margin-left: 0;
     width: 100%;
     height: 100%;
    background-color: #2a2a2b;
    z-index:1;
}

</style>