<template>
<div class="background">
  <div class="row">
    <div class="col-2" >
      <div class="data">
        <h4>Car Control</h4>
         <ul>
          <li>status: {{status}}</li>
          <li>snelheid: {{speed}}km</li>
          <li>accu: {{accu}}%</li>
          <li>trim: {{trim}}</li>
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
    xAxesLeft: 0,
    
     
    
  }},
   created: function(){
             this.OSCMessage();    
             this.gameController()  
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
          gameController(){
         // gamepadconnected with pc
        
       
           window.addEventListener("gamepadconnected", () => {
               //this.hideGamepad = false;
                         
                           
              this.inputController()

              //gamepads is an array with all the gamepad buttons
              this.gamepads = navigator.getGamepads();
              //console.log(this.gamepads);

          });

          // gamepadconnected disconnected with pc
            window.addEventListener("gamepaddisconnected", () => {
               // this.hideGamepad = true;   
          });
          

      },
      inputController(){

        const gamepads = navigator.getGamepads()


        if(gamepads[0]){
          // console.log(gamepads[0]);
          this.gamepadState ={
            id: gamepads[0].id,
            axes:[
                gamepads[0].axes[0],
            ],
            buttons:[
                {button_1: gamepads[0].buttons[0].value},
                {button_3: gamepads[0].buttons[3].value},
                {button_4: gamepads[0].buttons[4].value},
                {button_5: gamepads[0].buttons[5].value},
                {button_6: gamepads[0].buttons[6].value},
                {button_7: gamepads[0].buttons[7].value},
                {button_14: gamepads[0].buttons[14].value},
                {button_15: gamepads[0].buttons[15].value},
            ]
          }

          // set button values eagle to vue variable so they can be send via OSC
          this.xAxesLeft= gamepads[0].axes[0];   // x as linkerkant
          this.Kruisje = gamepads[0].buttons[0].value;  // kruisje
          this.Driehoekje = gamepads[0].buttons[3].value; // driehoekje
         // this.L1 = gamepads[0].buttons[4].value;  //L1
         // this.R1 = gamepads[0].buttons[5].value;  //R1
         // this.L2 = gamepads[0].buttons[6].value;  //L2

         // maping speed to km/h
          this.speed = (gamepads[0].buttons[7].value*25).toFixed(2);  //R2
        //  this.BL = gamepads[0].buttons[14].value;  //Button left
        //  this.BR = gamepads[0].buttons[15].value;  //Button right
        
      //console.log( this.Kruisje);
       

        }
        
      window.requestAnimationFrame(this.inputController) // this reload the function inputcontroller function every framerate
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
    text-align: left;
 margin-left: 20px;
   width: 100%;
  height: 100vh;
    background-color: #1e3a42;

}
h4{
   margin-bottom: 5px;
}

ul {
    list-style-type: none;
    text-align: left;
    padding-top: 10px;
    padding-left: 5px;
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