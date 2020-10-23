<template>
  <div class="parentBackground">
  <div class="background" >
    
    <h3>Control your RC car</h3>

      <br>

     <div class="row">
       <div class="col-sm-1">
         
       </div>
       <div class="col-sm-2">
         <vue-dropdown :config="config" @setSelectedOption="setNewSelectedOption($event);"></vue-dropdown>

         <br>
         <div class="incomingData" v-if="this.config.placeholder != 'Choose your car'">  <!--show code below only when car is selected -->
            <h4>Incoming data</h4>
            <h5>Batterij: {{voltageCar}}%</h5>
            <h5>Trim: {{trim}}</h5>
             <p></p>
         </div>
       </div>
       <div class="col-sm-6">
          <div class="livefeed"> 
            <video mute='true' playsinline autoplay id='v' width='640px' height='480px'></video>

         
            <div id='connected' >
                <div v-if="!connected">RC car: <span class="disconnected">offline</span></div> 
                 <div v-if="connected">RC car: <span class="connected">online</span></div> 
                 <div v-if="!Camconnected">Camera: <span class="disconnected">offline</span></div> 
                 <div v-if="Camconnected">Camera: <span class="connected">online</span></div>       
            </div>
             </div>
        </div>
        <div class="col-sm-2">
           <div v-if="this.config.placeholder != 'Choose your car'">  <!--show code below only when car is selected -->
              <h4>Pick your car color</h4>
              <chrome-picker :value="color1" @input="updateColor1"></chrome-picker>  
           </div> 
       </div>
        <div class="col-sm-1"></div>
    </div>


  
 <br>
    <!-- gamepad-->
  <div v-if="!hideGamepad" class="row">
       <div class="col-sm-2"></div>
        <div class="col-sm-8">
          <h2>A gamepad is connected</h2>
        </div>
         <div class="col-sm-2"></div>
              <div>{{ gamepadState}}</div>
    </div>
     <div v-if="hideGamepad" class="row">
       <div class="col-sm-2"></div>
        <div class="col-sm-8">
          <h2>Connect your Ps4 controller with your PC</h2>
        </div>
         <div class="col-sm-2"></div>
    </div>
   <!-- rader chart -->
  <div class="row">
       <div class="col-sm-2"></div>
        <div class="col-sm-8">
            <div class="BarChart"> 
             <!--We are using the LineChart component imported below in the script and also setting the chart-data prop to the datacollection object-->
            <!-- <radar-chart :chart-data="datacollection" ></radar-chart> -->
            </div>
        </div>
         <div class="col-sm-2"></div>
    </div>


 </div>
</div> 
</template>

<script src="../../node_modules/osc/dist/osc-browser.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

            
<script>
import osc from "osc";
import $ from 'jquery';
import VueDropdown from 'vue-dynamic-dropdown'
import { Chrome } from 'vue-color'
//import io from "socket.io-client";


// websocket connection for receiving live video   
 
  let urlObject


 /// websocket OSC Data receiving and sending 
  var port = new osc.WebSocketPort({
          url: "wss://circusfamilyprojects.nl:8084" //ws://localhost:8083 online server wss://circusfamilyprojects.nl:8084
        }); 

 port.open();

      
let color1Props = {
  hex: '#5FA7B4E6',
  hsl: {
    h: 150,
    s: 0.5,
    l: 0.2,
    a: 0.9
  },
  hsv: {
    h: 150,
    s: 0.66,
    v: 0.30,
    a: 0.9
  },
  rgba: {
    r: 159,
    g: 96,
    b: 43,
    a: 0.9
  },
  a: 0.9
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
    
  }},
  components: {
      VueDropdown,
      'chrome-picker': Chrome,
    
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

      console.log(this.config.placeholder);
  
          window.v.play();
          window.controls.classList.add('hidden');
      
    

      // if rc car is selected make connection with websocket for live video feed
       this.WS_URL = 'wss://circusfamilyprojects.nl:6084/'+this.config.placeholder+'';
       this.ws = new WebSocket(this.WS_URL);
    
   
         this.getImgUrl();

     
        
       
    },
  
        getImgUrl: function(){
          //console.log("test");
         
           this.ws.onopen = () => console.log("Connected to: "+ this.WS_URL);
            //console.log( this.ws);
            this.ws.onmessage = message => {
           // console.log( message.currentTarget.url);
           
               //console.log(message.remoteAddress)
                const arrayBuffer = message.data;
                if(urlObject){
                    URL.revokeObjectURL(urlObject);
                    
                }
                urlObject = URL.createObjectURL(new Blob([arrayBuffer]));
                this.urlImage=  urlObject;
                 this. Camconnected = true;
             
            }
          this. Camconnected = false;
      },
       OSCMessage: function(){ 
               
        port.on("message", (oscMessage) => {
          
           //console.log(oscMessage);
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
      gameController(){
         // gamepadconnected with pc
         //console.log("hallo")

           window.addEventListener("gamepadconnected", (event) => {
           this.hideGamepad = false;
            console.log("A gamepad connected:");
            console.log(event.gamepad);

              //gamepads is an array with all the gamepad buttons
              this.gamepads = navigator.getGamepads();
              //console.log(this.gamepads);
          });

          // gamepadconnected wdisconnected with pc
          window.addEventListener("gamepaddisconnected", (event) => {
            this.hideGamepad = true;
           // console.log("A gamepad disconnected:");
           // console.log(event.gamepad);
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
          this.L1 = gamepads[0].buttons[4].value;
          this.R1 = gamepads[0].buttons[5].value;
          this.L2 = gamepads[0].buttons[6].value;
          this.R2 = gamepads[0].buttons[7].value;
          this.BL = gamepads[0].buttons[14].value;
          this.BR = gamepads[0].buttons[15].value;

            port.send({
              address: "/"+this.config.placeholder, // naam van de geselcteerde auto die hij stuurt bij voorbeeld "RC car 1"
                  args: [this.xAxesLeft, this.L1, this.R1, this.L2, this.R2,this.BL,this.BR ]
               });

        }
       window.requestAnimationFrame(this.inputController) // this reload the function inputcontroller function every framerate
      },
      updateColor1 (value) {
      
      this.color1 = value
       //console.log("/color"+this.config.placeholder,)

         port.send({
          address: "/colorcar2",
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

      const peerId = getRandomId();
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
            ws = new WebSocket('wss://circusfamilyprojects.nl:4084');  // ws://localhost:4083 online server wss://circusfamilyprojects.nl:4084

            const onOpen = () => {
              ws.send(JSON.stringify({
                type: 'register',
                peerType,
                peerId,
              }));

              ws.removeEventListener('open', onOpen);
              resolve(ws);
            };

            ws.addEventListener('open', onOpen);
          } catch (e) {
            reject(e);
          }
        });
      };

      try {
        console.log('in screen');
        const socket = await getSocket(peerId, peerType);
        socket.addEventListener('message', async (e) => {
          try {
            const msg = JSON.parse(e.data);
            console.log('msg', msg);
            console.log(msg.from +" is glijk aan geselcteerde auto"+this.config.placeholder);
            if(msg.from == this.config.placeholder){
              console.log("camera and selected car are the same")
              }
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

              console.log('sending answer');
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
          }
        });

       } catch (e) {
          console.error(e);
          }
      },
  },
  
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.parentBackground{
    position: absolute;
    width: 100%; 
    height: 100%;
     background-color: #1c4863; 
    z-index: 1; 
}

.background{
   
     width: 100%; 
    height: 100%;
      position: relative;
     background-color: #1c4863; 
    color:#ffffff
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
.livefeed{
  transform: rotate(180deg);
    margin: auto;
    margin-bottom: 60px;
    width: 640px;
    height: 480px;
    background-color: black;
    border-style: none;
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
.disconnected{
     color: red;
}

.connected{
     color: rgb(0, 255, 21);
}

.incomingData{
   text-align: left;
   margin-left: 50px;
}

</style>