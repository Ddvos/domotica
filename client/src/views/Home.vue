<template>
<div class="background" ref="mouseEvent">
  <div class="row" v-if="desktop">
    <div class="information" >
      <div class="data">
        <h4>IP CarDesktop</h4>
         <ul>
          <li>Status: {{status}}</li>
          <li>Snelheid: {{realSpeed}}km/h</li>
          <li>Accu: {{accu}}%</li>
          <!-- <li>Trim: {{trim}}</li>
          <li>Verlichting: {{light}}</li> -->
          <li>Camera: {{camera}}</li>
        </ul>
          <div   v-bind:class="{ Buttonactive: Active, ButtonInactive: Inactive}" v-on:click="connect">{{statusButton}}</div>
      </div>
   </div>
    <div class="livefeed">
   
       
        <video mute='true' playsinline autoplay id='v'  ></video> <!--  //v-bind:style="{ 'border': '7px solid'+color1.hex+'' }" -->
    </div>

 </div>
  <div class="row" v-if="mobile">
    <div class="information" >
      <div class="data">
        <h4 class="namecar">IP car</h4><div   v-bind:class="{ Buttonactive: Active, ButtonInactive: Inactive}" v-on:click="connect">{{statusButton}}</div>
         <ul>
          <li>Status: {{status}}</li>
          <li>Snelheid: {{realSpeed}}km/h</li>
          <li>Accu: {{accu}}%</li>
          <li>Trim: {{trim}}</li>
          <li><input type="checkbox" id="checkbox" v-on:click="touchSwitch" v-model="touchState" >
              <label for="checkbox">Touch control: {{ touchState }}</label></li>
          <!-- <li>Verlichting: {{light}}</li>
          <li>Camera: {{camera}}</li> -->
        </ul>
        
      </div>
   </div>
    <div class="livefeed">
   
       
        <video mute='true' playsinline autoplay id='v'  ></video> <!--  //v-bind:style="{ 'border': '7px solid'+color1.hex+'' }" -->
    </div>
    <div v-if="touchVisibilty">
      <Joystick1 class="joystick1" @change="handleChange('left', $event);" /> 
      <Joystick2 class="joystick2" @change="handleChange('right', $event);" />
    </div>
    <!-- <MultiTouch  class="multitouch"/>       -->
 </div>
</div>
  
</template>


            
<script>
//import osc from "osc";

import Joystick1 from '../components/joystick';
import Joystick2 from '../components/joystick';
import controllerConnection from '../components/controllerConnection';

//  var port = new osc.WebSocketPort({
//           url: "wss://circusfamilyprojects.nl:8084" // ws://localhost:8083 online server wss://circusfamilyprojects.nl:8084
//         }); 

//  port.open();

let   sendChannel = null // channel waarover data gestuurd gaat worden  
let _this = null

export default {
  

  data() {
  return{
    
    status: "offline",
    statusButton: "connect",
    speed: 0,
    realSpeed:0,
    accu: 0,
    trim: 0,
    light: "uit",
    camera: "offline",
    controller: "offline",
    xAxesLeft: 0,
    sendSpeedValue: 0,
    Inactive: true,
    Active: false,
    internetConnection: false,
    desktop: true,
    mobile: false,
    touchState: false,
    touchVisibilty:false,
    optionButton: 0,
    leftStick: {
        x: 0,
        y: 0,
        speed: 0,
        angle: 0
      },
     rightStick: {
        x: 0,
        y: 0,
        speed: 0,
        angle: 0
      },
    metaInfo: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport',  content:"width=device-width, viewport-fit=cover, initial-scale=1.0" }
      ]
    }
    
     
    
  }},
    components: {
     'Joystick1': Joystick1,
     'Joystick2': Joystick2,
    controllerConnection
     
  
  },
   created: function(){
           
       this.gameController()  
       _this = this


     },
    mounted: function(){
       let _this = this;
       this.$refs.mouseEvent.addEventListener('touchmove',(event) =>{
          event.preventDefault();
          event.stopImmediatePropagation();
         // this.setMobiletouch(event);
        },{ passive: false });

        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
          // true for mobile device
          console.log("mobile device");
         this.mobile =true;
         this.desktop = false;
         
        }else{
          // false for not mobile device
          console.log("not mobile device");
        this.mobile =false;
         this.desktop = true;
        }

    },
  computed: {
   

   
  },
  methods:{ 
     touchSwitch : function() { // function for turning on and off touch control
       if (this.touchVisibilty==false){
       
            this.touchVisibilty=true
       }else{
         this.touchVisibilty=false
       }
      
       
    },
     gameController(){
         // gamepadconnected with pc
          
           window.addEventListener("gamepadconnected", () => {
               //this.hideGamepad = false;  
              // console.log("controller")        
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
      //setMobiletouch(event){

         // this.mouseX = touch.clientX;
         // this.mouseY = touch.clientY;

     // },
    handleChange(id, { x, y, speed, angle }) {
        const stick = this[`${id}Stick`];
       
       
        stick.speed = speed;
        stick.angle = angle;

       if(id== "right"){
          stick.y = y;
          this.speed = this.map(stick.y,48,-48,1350,1650);  //R2      
       }
       if(id== "left"){
          stick.x = x;
         this.xAxesLeft = this.map(stick.x,-48,48,500,2500); //x as linkerkant sturen
       }

        
        

       
        if( this.mobile== true && this.touchState == true){
          console.log(this.speed)
          sendChannel.send([this.xAxesLeft,this.speed ]);
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
                {button_9: gamepads[0].buttons[7].value},
                {button_14: gamepads[0].buttons[14].value},
                {button_15: gamepads[0].buttons[15].value},
            ]
          }

          // set button values eagle to vue variable so they can be send via OSC
     
          this.Kruisje = gamepads[0].buttons[0].value;  // kruisje
          this.Kruisje = gamepads[0].buttons[3].value; // driehoekje
          this.optionButton= gamepads[0].buttons[9].value; // driehoekje
         // this.L1 = gamepads[0].buttons[4].value;  //L1
         // this.R1 = gamepads[0].buttons[5].value;  //R1

         // maping speed to km/h
          this.speed = this.map(gamepads[0].buttons[7].value,0,1,1500,1600);  //R2
          this.reverse = this.map(gamepads[0].buttons[6].value,0,1,1500,1400);  //L2
          this.xAxesLeft = this.map(gamepads[0].axes[0],-1,1,500,2500); //x as linkerkant
        //  this.BL = gamepads[0].buttons[14].value;  //Button left
        //  this.BR = gamepads[0].buttons[15].value;  //Button right

          //realSpeed is de snelheid die je op het scherm ziet en is een gemapte waarde
          if(gamepads[0].buttons[6].value ==0){
           this.realSpeed = this.map(gamepads[0].buttons[7].value,0,1,0,15);  //R2
          }
          if(gamepads[0].buttons[7].value ==0){
           this.realSpeed = this.map(gamepads[0].buttons[6].value,0,1,0,15);  //L2
          }
        // function zodat je niet kan remmen en gas geven tegelijk
        if( this.speed >1501){
            this.sendSpeedValue =this.speed // send voorruit rijden
        } else if(this.reverse <1501){
            this.sendSpeedValue = this.reverse // send achteruit rijden
        }else if(this.reverse <1499 &&  this.speed >1501){
           this.sendSpeedValue = 1500; // voor en achteruit tegelijk is 0
        }
        //console.log( this.xAxesLeft)
        if( this.controller == "online"){
          if(this.touchState == false){
            sendChannel.send("steering: "+this.xAxesLeft+", speed: "+this.sendSpeedValue+", camera: "+this.optionButton+""); //JSON.stringify({steering: this.xAxesLeft, speed: this.sendSpeedValue, camera: this.optionButton })
            //console.log( this.sendSpeedValue);
          }
        }
        }
        
      window.requestAnimationFrame(this.inputController) // this reload the function inputcontroller function every framerate
      }, // einde input controller
      map( x,  in_min,  in_max,  out_min,  out_max){ // maps de waardes van de controller zodat de de ESC ze begrijpt
            return ((x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min).toFixed(0)
      },
      connect(){
          this.carControl() // maakt de data verbinding 
          this.videoStream() // maakt de video verbinding 

         this.internetConnection = window.navigator.onLine;

         if ( this.internetConnection) {
                this.status = "internet"
            } else {
                this.status = "No internet"
            }
      },
      online(){ // set everything on online
        //2wwwconsole.log("Wat is online? "+this.controller+" " + this.camera)
       if( this.controller == "online" && this.camera == "online"){
         this.status = "connected"
         this.statusButton = "connected"

       }

      },
      async carControl(){ // verbinding controller

          /// websocket WebRTC for car cocontrol. This is the sending side to the Raspberry Pi
          // chaneel waarover data gestuurd word
          const config = {
            sdpSemantics: 'unified-plan',
            iceCandidatePoolSize: 4,
            //iceTransportPolicy: "relay",
            iceServers: [{
              urls: 'turn:turn.stepverder.nl:3478', //'stun:stun.l.google.com:19302'  turn:178.62.209.37:3478 circusfamilyprojects.nl
               username: 'Dominique',
               credential: 'WS7Yq_jT'
            
            },]
          };
          // const getRandomId = () => {
          //   return Math.floor(Math.random() * 10000);
          // };
          const peerId = 'controldata'
          const peerType = 'controller';
          const connections = new Map();
          let ws;
          const getSocket = async (peerId, peerType) => {
            if (ws) return ws;
            return new Promise((resolve, reject) => {
              try {
             
                ws = new WebSocket('wss://stepverder.nl:4084/controller');  // ws://localhost:4083 online server wss://circusfamilyprojects.nl:8084
               
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
                console.log(e)
              }
            });
          };
          try {
            console.log('in controller');
          // console.log(this.carNumber);
         
            const socket = await getSocket(peerId, peerType);
            socket.addEventListener('message', async (e) => {
              const msg = JSON.parse(e.data);
              //console.log('msg', msg);
              if (msg.type === 'Raspberrypis') {
                console.log("raspberry pi probeert te verbinden")
                for (let Raspberrypi of msg.Raspberrypis) {
                  const peerConnection = new RTCPeerConnection(config);
                  connections.set(Raspberrypi, peerConnection);
                  // peerConnection.addStream(window.v.srcObject);
                    peerConnection.addEventListener('icegatheringstatechange', ()=>{;
                       console.log(peerConnection.connectionState)
                     })
                    sendChannel = peerConnection.createDataChannel('sendDataChannel', {ordered: false, maxRetransmits: 0})
                    sendChannel.onopen = function(event) {
                          _this.status = "controller "
                          _this.controller = "online"
                           _this.online()
                          console.log("hi you")
                          //sendChannel.send(['Hi raspberrypi!']);
                    }
                    console.log(sendChannel)
                  // this.sendChannel.onclose = this.handleSendChannelStatusChange();

              
                 await peerConnection.createOffer().then(function(offer) {
                      return peerConnection.setLocalDescription(offer);
                  }).then(function() {
                      // wait for ICE gathering to complete
                      return new Promise((resolve) => {
                          if (peerConnection.iceGatheringState === 'complete') {
                              _this.status = "complete"
                              resolve();
                          } else {
                              let checkState = () =>{
                                console.log(peerConnection.iceGatheringState )
                                 _this.status = " Ice gathering "
                                 
                                  if (peerConnection.iceGatheringState === 'complete') {
                                      peerConnection.removeEventListener('icegatheringstatechange', checkState);
                                      resolve();
                                  }
                                  setTimeout(() => {// if gathering from icecandidates takes longer than 2.5secondes stop gathering ice candidates
                                      peerConnection.removeEventListener('icegatheringstatechange', checkState);
                                      resolve();
                                    }, 2500)
                              }
                             peerConnection.addEventListener('icegatheringstatechange', checkState);
                          }
                      });
                  }).then(function(){
                        console.log(peerConnection)

                        //console.log(peerConnection.localDescription.sdp)
                        console.log("offer wordt gestuurd")
                        socket.send(JSON.stringify({
                          type: 'offer',
                          to: Raspberrypi,
                          from: peerId,
                          data: peerConnection.localDescription,
                        }));
                     })
                }
              }
              if (msg.type === 'answer') {
                console.log("antwoord van raspberrypi binnen")
                const peerConnection = connections.get(msg.from);
                console.log(msg.data.sdp)
                await peerConnection.setRemoteDescription(msg.data);

                console.log(peerConnection)
                console.log(peerConnection.connectionState)
                console.log(peerConnection.iceConnectionState)
                console.log(peerConnection.signalingState)           
              }
              if (msg.type === 'disconnect') {
                const connection = connections.get(msg.from);
                _this.status = "controller disconnect"
                _this.statusButton = "connect"
                if (connection) {
                  console.log('Disconnecting from', msg.from);
                  connection.close();
                  connections.delete(msg.from);
                }
              }
            });
          } catch (e) {
            console.log("error: "+e);
          }
        },// einde controller connection
     async videoStream(){ /// begin video verbinding 

              /// websocket WebRTC for live stream
      

      const config = {
        iceServers: [{
           urls: 'turn:turn.stepverder.nl:3478', //'stun:stun.l.google.com:19302'  turn:178.62.209.37:3478
           username: 'Dominique',
           credential: 'WS7Yq_jT'
        }]
      };

      const getRandomId = () => {
        return Math.floor(Math.random() * 10000);
      };

      const peerId = 'ipcar'+getRandomId();
      const peerType = 'screen';
      const connections = new Map();

      let ws;
      const getSocket = async (peerId, peerType) => {
        if (ws) return ws;

        return new Promise((resolve, reject) => {
          try {
            
            ws = new WebSocket('wss://stepverder.nl:4084/ipcar');  // ws://localhost:4083 online server wss://circusfamilyprojects.nl:4084
          
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
       console.log('in screen');
        const socket = await getSocket(peerId, peerType);
        socket.addEventListener('message', async (e) => {
          //console.log(e)
          try {
            const msg = JSON.parse(e.data)
             console.log(msg)
               
            if (msg.type === 'offer') {
              const peerConnection = new RTCPeerConnection(config);
              connections.set(msg.from, peerConnection);
                console.log('incoming data ');
                 this.camera = "online";
                 this.statusButton = "online",
                 this.InActive = false
                 this.Active = true

              peerConnection.ontrack = (e) => {
                this.status = "camera"
                _this.online()
                console.log('on track', e);
                window.v.srcObject = e.streams[0];
                 window.v.play();
                //window.wait.classList.add('hidden');
               // window.controls.classList.remove('hidden');
              };

              peerConnection.onicecandidate = (e) => {
                  console.log('set icecandidate');
                  //console.log( e.candidate);
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
                 this.status = "camera disconnect"
                 this.camera = "Offline";
                  this.statusButton = "connect",
                  this.InActive = true
                 this.Active = false
                console.log('Disconnecting from', msg.from);
                connection.ontrack = null;
                connection.onicecandidate = null;
                connection.close();
                connections.delete(msg.from);
              }
            }

            if (msg.type === 'candidate') {
              console.log(msg.data)
              
              const connection = connections.get(msg.from);
                //console.log(connection)
              if (connection) {
                console.log('Adding candidate to', msg.from);
                connection.addIceCandidate(new RTCIceCandidate(
                  msg.data
                ));
              
              }
            }
           
          } catch (e) {
            console.error(e);
                 console.log("error video beeld niet ontvangen "+ e)
          }
        });

       } catch (e) {
          console.error(e);
          console.log("error verbinding mislukt: "+e)
          }
      },
      
   
  },  // einde video verbinding 
  
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.background{
  width: 100vw;
  height: 100vh;
  background: #1e3a42;
  overflow-x: hidden
  
}

.row,.col-9,.col-3{
     margin: 0;
    padding:0;
  }


.data{
  position: relative;
  color: white;
  margin-top: 20px;
  margin-left: 20px;
  font-size: 13px;
  text-align: left;
  width: 100%;
  height: 100vh;
  background-color: #1e3a4291;
  padding: 12px;
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);

}
h4{
   margin-bottom: 5px;
}
.namecar{
  display: inline;
}

ul {
    list-style-type: none;
    text-align: left;
    padding-top: 10px;
    padding-left: 5px;
}
.information{
    width: 20vw;
  height: 100vh;
   z-index: 1;
   overflow: hidden;
   float:left;
}

.joystick1{
  position: absolute;
  width: 5vw;
  height:5vh;
  margin-left:5%;
margin-top:-20%;
  z-index:4;
  transform: scale(1);

  
}

.joystick2{
  position: absolute;
  width: 5vw;
  height:5vh;
  margin-left:80%;
  margin-top:-20%;
  z-index:4;
  transform: scale(1);
  
}

.multitouch{
  position: absolute;
  width: 5vw;
  height:5vh;
  margin-left:60%;
  margin-top:15%;
  z-index:3;
  transform: scale(1);
  
}


.ButtonInactive{
  background-color: rgba(214, 13, 6, 0.5);
  font-size: 100%;
	border: 1px solid rgb(184, 46, 46);
  border-radius: 5px;
	width: 95px;
	padding: 10px 0;
  margin-left: 10px;
	text-align: center;
	display: inline-block;
  margin-right: 10px;
  display: inline;
}
   .ButtonInactive :hover{
     background-color: rgba(184, 46, 46, 0.5)
  }

.Buttonactive{
  background-color: rgba(6, 214, 13,0.5);
  font-size: 100%;
	border: 1px solid rgba(46, 184, 55,1);
  border-radius: 5px;
	width: 95px;
	padding: 10px 0;
	text-align: center;
	display: inline-block;
  margin-right: 10px;
}
   .Buttonactive :hover{
     background-color: rgba(46, 184, 55,0.5)
  }

.livefeed{
  margin:0;
  padding: 0;
  display: inline-block;
   overflow: hidden;
   width: 80vw;
  height: 99vh;
  background-color: #2a2a2b;
  z-index: 2;
}

  video{
  
    margin-left: 0;
    object-fit: cover;
     width: 100%;
     height: 100%;
 
    z-index:3;
}

</style>