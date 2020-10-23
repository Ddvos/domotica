<template>
  <div class="parentBackground">
  <div class="background">
     <br>
 <div class="row">
    <div class="col-sm-2"> </div>
     <div class="col-sm-8"> 
            <lottie :options="defaultOptions" :height="150" :width="900" v-on:animCreated="handleAnimation"/>   
           
     </div>
    <div class="col-sm-2"> </div>
      <br>
</div>
     <div class="row">
       <div class="col-sm-1"> </div>
       <div class="col-sm-2">
           <!-- <canvas id="c"></canvas> -->
        <div class="controlpanel">
            <!-- <svg-icon icon="control-panel" :hasFill="true"></svg-icon> -->
            <!-- <SvgWifiLogo v-bind:inputkoplamp="Kruisje" v-bind:buttonLeft="BL" v-bind:buttonRight="BR"></SvgWifiLogo>   -->
              <raumSVGgrid v-bind:edgeDetectionInput="swipeDeltaX"></raumSVGgrid>  
           
               
          </div>
            
             <p></p>
         </div>
      
       <div class="col-sm-6">
          <div class="livefeed">
                <div class="battery">Batterij: {{voltageCar}}%</div>
            <video mute='true' playsinline autoplay id='v'  ></video> <!--  //v-bind:style="{ 'border': '7px solid'+color1.hex+'' }" -->
           </div>
        </div>
        <div class="col-sm-2"></div>
        <div class="col-sm-1"></div>
      </div>
   



 <br>

    <div class="row">
     <div class="col-sm-3"></div>
     <div class="col-sm-3">
          <vue-dropdown :config="config" @setSelectedOption="setNewSelectedOption($event);"></vue-dropdown>
     </div>
     <div class="col-sm-3"></div>
     <div class="col-sm-3"></div>

  </div>
   <div v-if="this.config.placeholder != 'Choose your car'">
     
    <!-- rader chart -->
    <div class="row">
        <div class="col-sm-4">
              <div class="incomingData" v-if="this.config.placeholder != 'Choose your car'">  <!--show code below only when car is selected -->
                <div id='connected' >
                    <div v-if="connected">Conection status        <span class="disconnected"> </span></div>
                    <div v-if="!connected">Conection status        <span class="connected"> </span>
                     <div v-if="hideGamepad">Controller connected        <span class="disconnected"> </span></div>
                    <div v-if="!hideGamepad">Controller connected        <span class="connected"> </span></div>
                    <div v-if="!Camconnected">Camera connected  <span class="disconnected"> </span></div>
                    <div v-if="Camconnected">Camera connected   <span class="connected"> </span></div>
                   
                    <br>
                      <br>
                      <!-- <h6>Pick your car color</h6>
                      <button v-on:click="colorPicker" class="colorButton" v-bind:style="{ 'background-color': ''+color1.hex+'' }"></button>
                      <div v-if="colorPickerValue">
                        <chrome-picker :value="color1" @input="updateColor1"></chrome-picker>
                      </div> -->
               </div>
             </div>
          
        </div>
          <div class="col-sm-4">
          </div>
          <div class="col-sm-4"></div>
      </div>
   </div>
  </div>
 </div>
</div>
</template>

<script src="../../node_modules/osc/dist/osc-browser.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
 <script src="//cdnjs.cloudflare.com/ajax/libs/bodymovin/5.7.0/lottie.min.js"></script>


<script>
import osc from "osc";
import $ from 'jquery';
import VueDropdown from 'vue-dynamic-dropdown'
import { Chrome } from 'vue-color'
import io from "socket.io-client";
import SvgIcon from '../assets/carcontrol/Svg-icon';
import SvgWifiLogo from '../assets/carcontrol/SvgWifiLogo';
 import Lottie from '../lottie';
 import * as animationData from '../assets/carcontrol/data.json';

 

// websocket connection for receiving live video

  let urlObject


 /// websocket OSC Data receiving and sending
  var port = new osc.WebSocketPort({
          url: "wss://circusfamilyprojects.nl:8084" //ws://localhost:8083 online server wss://circusfamilyprojects.nl:8084
        });

 port.open();


let color1Props = {
  hex: '#00d2ff',
  hsl: {
    h: 191,
    s: 1,
    l: 0.5,
    a: 1
  },
  hsv: {
    h: 150,
    s: 0.66,
    v: 0.30,
    a: 1
  },
  rgba: {
    r: 95,
    g: 167,
    b: 180,
    a: 1
  },
  a: 1
}



export default {


  data() {
  return{
      timer: '',
      throttle: 0,
      left: 0,
      right: 0,
      brake: 0,
      datacollection: null,
      hideGamepad: true,
      gamepads: [],
      id: undefined,
      gamepadState:{},
      xAxesLeft: 0,
      L1: 0,
      R1: 0,
      L2: 0,
      R2: 0,
      BL: 0,
      BR: 0,
      Driehoekje: 0, //lamp aan of uit
      Kruisje:0,  // groot licht
      WS_URL: "",
      previousWS_url:"",
      ws: "",
      urlImage: "", // live video feed
      connected: false,
      Camconnected: false,
      previousWS: false,
      currentWs: true,
      config: {
        options: [
          {
            value: "car1"
          },
          {
            value: "car2"
          },
          {
            value: "car3"
          },
          {
            value: "car4"
          }
        ],
        placeholder: "Choose your car",
        backgroundColor: "#cde4f5",
        textColor: "black",
        borderRadius: "1.5em",
        border: "1px solid gray",
        width: 250
      },
      color1: color1Props,
      voltageCar: '',
      trim:'',
      test: 1,
      colorPickerValue: false,
      vueCanvas: null,
      rectHeight: -20,
      dpi: null,
      ctx: null,
        defaultOptions: {animationData: animationData},
        animationSpeed: 1,
      controllercheck: 0,
      cameraConnection: null,
      bitrate: 0,

  }},
  components: {
      VueDropdown,
      'chrome-picker': Chrome,
       'svg-icon': SvgIcon,
       'SvgWifiLogo': SvgWifiLogo,
      'lottie': Lottie,
     

    },
   created: function(){
        this.OSCMessage();

        this.gameController()
        this.inputController()

        this.videoStream()

     },
   mounted: function(){
    

     },
  computed: {


  },
  watch:{},

  methods:{
     setNewSelectedOption(selectedOption) {// function that selected the rc car

      this.config.placeholder = selectedOption.value;

      console.log("dit is de geselcteerde auto "+ this.config.placeholder);

      this.test = this.test+1

                 window.v.srcObject = null;
                 this. Camconnected = false;
       
          this.videoStream()
          window.v.play();
          window.controls.classList.add('hidden');



    },

       
      
       OSCMessage: function(){

        port.on("message", (oscMessage) => {

          // console.log(oscMessage);
             this.OSCMessages(oscMessage);

      });
      },
       OSCMessages: function(oscMessage){

         //console.log(oscMessage);
       if(oscMessage.address == '/throttle'){
         this.throttle = oscMessage.args[0];
         // console.log(throttle);

       }
       if(oscMessage.address == '/left'){
         this.left = oscMessage.args[0];
         //console.log(this.left);
        }
       if(oscMessage.address == '/right'){
         this.right = oscMessage.args[0];
         //console.log(right);
        }
       if(oscMessage.address == '/brake'){
          this.brake = oscMessage.args[0];
          //console.log(brake);
         }

       if(oscMessage.address == '/'+this.config.placeholder+'volt'){
          this.voltageCar = oscMessage.args[0];
         }

       if(oscMessage.address == '/'+this.config.placeholder+'connected'){
          if(oscMessage.args[0] ==0){
              this.connected = false  //RC car is disconnected
          }
          if(oscMessage.args[0] ==1){
            this.connected = true //RC car is connected
          }
         }

       if(oscMessage.address == '/'+this.config.placeholder+'trim'){
          this.trim = oscMessage.args[0];
         }


      //console.log(oscMessage);

     },
        handleAnimation: function (anim) {
         this.anim = anim;
         },
      // stop: function () {
      //   this.anim.stop();
      // },
      // play: function () {
      //   this.anim.play();
      // },
      // pause: function () {
      //   this.anim.pause();
      // },
      // onSpeedChange: function () {
      //   this.anim.setSpeed(this.animationSpeed);
      // },

      gameController(){
         // gamepadconnected with pc
        
       
           window.addEventListener("gamepadconnected", (event) => {
             //if(this.config.placeholder != 'Choose your car'){
               this.hideGamepad = false;
                     
                     setInterval(() => this.controllerset(), 200); // function send value if controller is connected evry 0.2seconds      
                           
              this.inputController()

              //gamepads is an array with all the gamepad buttons
              this.gamepads = navigator.getGamepads();
              //console.log(this.gamepads);

          });

          // gamepadconnected disconnected with pc
            window.addEventListener("gamepaddisconnected", (event) => {
            
                this.hideGamepad = true;
                clearInterval(() => this.controllerset()); 
                this.controllercheck = 0

                port.send({
                address: "/controller_"+this.config.placeholder, // naam van de geselcteerde auto die hij stuurt bij voorbeeld "RC car 1"
                    args: [this.controllercheck ]
                });      
          });
          

      }, async controllerset(){
        
        // functions send 1 and 0 every 200 milliseonds when controller is connected
        if(this.hideGamepad == false){
         if( this.controllercheck == 0){
              this.controllercheck =1;
          } else if (this.controllercheck == 1){
                      this.controllercheck =0;
         }

            port.send({
              address: "/controller_"+this.config.placeholder, // naam van de geselcteerde auto die hij stuurt bij voorbeeld "RC car 1"
                  args: [this.controllercheck ]
               });
             //console.log("test "+this.controllercheck)
        }
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
          this.xAxesLeft= gamepads[0].axes[0];
          this.Kruisje = gamepads[0].buttons[0].value;
          this.Driehoekje = gamepads[0].buttons[3].value;
          this.L1 = gamepads[0].buttons[4].value;
          this.R1 = gamepads[0].buttons[5].value;
          this.L2 = gamepads[0].buttons[6].value;
          this.R2 = gamepads[0].buttons[7].value;
          this.BL = gamepads[0].buttons[14].value;
          this.BR = gamepads[0].buttons[15].value;
         
        
      //console.log( this.Kruisje);
       
       // this.drawRect()
            port.send({
              address: "/"+this.config.placeholder, // naam van de geselcteerde auto die hij stuurt bij voorbeeld "RC car 1"
                  args: [this.xAxesLeft, this.L1, this.R1, this.L2, this.R2,this.BL,this.BR,this.Kruisje,this.Driehoekje ]
               });

        }
        
      window.requestAnimationFrame(this.inputController) // this reload the function inputcontroller function every framerate
      },
      colorPicker(){

       if(this.colorPickerValue == false){
        this.colorPickerValue = true

       }else{
           this.colorPickerValue = false
       }
      },
      updateColor1 (value) {

      this.color1 = value
       //console.log("/color"+this.config.placeholder,)

         port.send({
          address: "/color"+this.config.placeholder,
             args: [this.color1.rgba.r,this.color1.rgba.g,this.color1.rgba.b],
          });
      },
      
      async videoStream(){

              /// websocket WebRTC for live stream
      

      const config = {
        iceServers: [{
          urls: ['stun:stun.l.google.com:19302']
        }]
      };

      const getRandomId = () => {
        return Math.floor(Math.random() * 10000);
      };

      const peerId = this.config.placeholder+getRandomId();
      const peerType = 'screen';
      const connections = new Map();

      let ws;
      const getSocket = async (peerId, peerType) => {
        if (ws) return ws;

        return new Promise((resolve, reject) => {
          try {
            const protocol = (
              window.location.protocol === 'https:' ?
                'wss:' :
                'ws:'
            );
            
            ws = new WebSocket('wss://circusfamilyprojects.nl:4084/car2');  // ws://localhost:4083 online server wss://circusfamilyprojects.nl:4084
          
          console.log(peerId)
           
           const onOpen = () => {
             
              ws.send(JSON.stringify({
                type: 'register',
                peerType,
                peerId,
              }));

              ws.removeEventListener('open', onOpen);
              // console.log(this.test);
              resolve(ws);
            };

            ws.addEventListener('open', onOpen);
          } catch (e) {
            reject(e);
          }
        });
      };

      try {
        //console.log('in screen');
        const socket = await getSocket(peerId, peerType);
        socket.addEventListener('message', async (e) => {
          try {
            const msg = JSON.parse(e.data);
             // console.log("camera and selected car are the same "+ msg.from)
                this.Camconnected = true;
            if (msg.type === 'offer') {
              const peerConnection = new RTCPeerConnection(config);
              connections.set(msg.from, peerConnection);

              peerConnection.ontrack = (e) => {
                console.log('on track', e);
                window.v.srcObject = e.streams[0];
                 window.v.play();
                window.wait.classList.add('hidden');
                window.controls.classList.remove('hidden');
              };

              peerConnection.onicecandidate = (e) => {
                if (e.candidate) {
                  socket.send(JSON.stringify({
                    type: 'candidate',
                    from: peerId,
                    to: msg.from,
                    data: e.candidate,
                  }));
                }
              };

              await peerConnection.setRemoteDescription(msg.data);
              const sdp = await peerConnection.createAnswer();
              await peerConnection.setLocalDescription(sdp);

             // console.log('sending answer');
              socket.send(JSON.stringify({
                to: msg.from,
                from: peerId,
                type: 'answer',
                data: peerConnection.localDescription
              }));
            }

            if (msg.type === 'disconnect') {
              const connection = connections.get(msg.from);
              if (connection) {
                console.log('Disconnecting from', msg.from);
                connection.ontrack = null;
                connection.onicecandidate = null;
                connection.close();
                connections.delete(msg.from);
              }
            }

            if (msg.type === 'candidate') {
              const connection = connections.get(msg.from);
              if (connection) {
                console.log('Adding candidate to', msg.from);
                connection.addIceCandidate(new RTCIceCandidate(
                  msg.data
                ));
              }
            }
           
          } catch (e) {
            console.error(e);
                 console.log("error niewe verbiding openen lukt niet")
          }
        });

       } catch (e) {
          console.error(e);
          console.log("error niewe verbiding openen lukt niet")
          }
      },
  },

}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.parentBackground{
     position: absolute;
    height: 100%;
      width: 100vw;
     background-color: #1A1A1A;
    padding: 0px;
    margin: 0px;
}

.background{

     //width: 100%;
     //height: 100vh;
     //position: relative;
     background-color:#1A1A1A;
     color: #FF0049;
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

.color {
  margin: auto;
  width: 50%;
  width: 80px;
  background-color: rgba(71, 255, 178, 0.699);
  height: 80px;

}
.timer{
     font-size: 50px;
}

.lineChart{
      margin: auto;
    width: 50%;

}
.BarChart{
    margin: auto;
    width: 50%;

}

video{
    
      width: auto;
    height: 50vh;
      background-color: black;
}
#connected {
  text-align: left;
  margin-top: 10px;


}

img{
     width: 640px;
    height: 480px;
    border-style: none

}
video{
  margin: 0 auto;
  transform: rotate(180deg);
}
.disconnected{   
  background-color: #FF0049;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  display: inline-block;
}

.connected{
  background-color: #00FFAA;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  display: inline-block;
}

.incomingData{
   text-align: left;
   margin-left: 50px;
    z-index: 1;
}

.vue-dropdown{
 z-index: 2;
}

.colorButton {
  border: none;
  color: white;
  padding: 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  border-radius: 50%
}

.controlpanel{
  position: relative;
    padding-top: 60px;
    width: 100%;
  height: 50%;
   z-index: 3;
}

#c{
  background-color: white;
  width:100px;
  height: 300px
}

.battery{
   text-align: right;
}
#bm{
   
    width: 250px;
}
#KOPLAMP_x5F_UIT{
  fill: #ff0048;
}





</style>