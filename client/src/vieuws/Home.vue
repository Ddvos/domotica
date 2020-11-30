<template>
<div class="background">
  <div class="row">
    <div class="col-3" >
      <div class="data">
        <h4>IP Car</h4>
         <ul>
          <li>status: {{status}}</li>
          <li>snelheid: {{speed}}km</li>
          <li>accu: {{accu}}%</li>
          <li>trim: {{trim}}</li>
          <li>verlichting: {{light}}</li>
          <li>camera: {{camera}}</li>
        </ul>
          <button v-on:click="connect">Connect</button>
      </div>
   </div>
   <div class="col-9" >
    <div class="livefeed">
        <video mute='true' playsinline autoplay id='v'  ></video> <!--  //v-bind:style="{ 'border': '7px solid'+color1.hex+'' }" -->
    </div>
  </div>

 </div>
</div>
  
</template>


            
<script>
import osc from "osc";
import io from "socket.io-client";



 var port = new osc.WebSocketPort({
          url: "wss://circusfamilyprojects.nl:8084" // ws://localhost:8083 online server wss://circusfamilyprojects.nl:8084
        }); 

 port.open();

 //connect to server
let ipcar = io.connect("https://stepverder.nl:6500") // poort to connect with


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
    sendSpeedValue: 0,
    
     
    
  }},
   created: function(){
           
       this.gameController()  
       this.siteVisitor();  
     

     },
  computed: {
   

   
  },
  methods:{ 
     siteVisitor: function(){

      ipcar.on("welcome",(data)=>{
          console.log(data)
        })

         ipcar.on("clientList",(clients)=>{
          console.log(clients)
        })

        //ipcar.emit("joinIPcar", "clientRoom");

        ipcar.on("newUser",(res) =>{
          console.log(res)

        })

       ///raum.on("err",(err)=> console.log(err))
       //raum.on("succes",(res)=> console.log(res))
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
          this.Kruisje = gamepads[0].buttons[3].value; // driehoekje
         // this.L1 = gamepads[0].buttons[4].value;  //L1
         // this.R1 = gamepads[0].buttons[5].value;  //R1
        

         // maping speed to km/h
   

      
          this.speed = this.map(gamepads[0].buttons[7].value,0,1,1500,1600);  //R2
          this.reverse = this.map(gamepads[0].buttons[6].value,0,1,1500,1400);  //L2
        //  this.BL = gamepads[0].buttons[14].value;  //Button left
        //  this.BR = gamepads[0].buttons[15].value;  //Button right

        // function zodat je niet kan remmen en gas geven tegelijk
        if( this.speed >1501){
            this.sendSpeedValue =this.speed // send voorruit rijden
        } else if(this.reverse <1501){
            this.sendSpeedValue = this.reverse // send achteruit rijden
        }else if(this.reverse <1499 &&  this.speed >1501){
           this.sendSpeedValue = 1500; // voor en achteruit tegelijk is 0
        }
      console.log(this.sendSpeedValue)
        ipcar.emit("controllerInput", [this.xAxesLeft,this.sendSpeedValue ]);
      //console.log( this.Kruisje);
       

        }
        
      window.requestAnimationFrame(this.inputController) // this reload the function inputcontroller function every framerate
      }, // einde input controller
      map( x,  in_min,  in_max,  out_min,  out_max){ // maps de waardes van de controller zodat de de ESC ze begrijpt
            return ((x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min).toFixed(0)
      },
      connect(){
          this.videoStream()
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
          try {
            const msg = JSON.parse(e.data);
              console.log("camera and selected car are the same "+ msg.from)
               
            if (msg.type === 'offer') {
              const peerConnection = new RTCPeerConnection(config);
              connections.set(msg.from, peerConnection);
                console.log('incoming data '+e);
                 this.camera = "Online";
              peerConnection.ontrack = (e) => {
                console.log('on track', e);
                window.v.srcObject = e.streams[0];
                 window.v.play();
                //window.wait.classList.add('hidden');
               // window.controls.classList.remove('hidden');
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
                 this.camera = "Offline";
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