<template>
<div class="background" ref="mouseEvent">
  <div class="row">
    <div class="information" >
      <div class="data">
        <h4>IP Car Jean</h4>
         <ul>
          <li>Status: {{status}}</li>
          <li>Snelheid: {{speed}}km/h</li>
          <li>Accu: {{accu}}%</li>
          <li>Trim: {{trim}}</li>
          <li>Verlichting: {{light}}</li>
          <li>Camera: {{camera}}</li>
        </ul>
          <div   v-bind:class="{ Buttonactive: Active, ButtonInactive: Inactive}" v-on:click="connect">{{statusButton}}</div>
      </div>
   </div>
    <div class="livefeed">
   
       
        <video mute='true' playsinline autoplay id='v'  ></video> <!--  //v-bind:style="{ 'border': '7px solid'+color1.hex+'' }" -->
    </div>

 </div>
</div>
  
</template>


            
<script>
//import osc from "osc";
import io from "socket.io-client";



//  var port = new osc.WebSocketPort({
//           url: "wss://circusfamilyprojects.nl:8084" // ws://localhost:8083 online server wss://circusfamilyprojects.nl:8084
//         }); 

//  port.open();

 //connect to server
let ipcar = io.connect("https://stepverder.nl:6500") // poort to connect with


export default {
  

  data() {
  return{
    
    status: "connect",
    statusButton: "connect",
    speed: 0,
    accu: 0,
    trim: 0,
    light: "uit",
    camera: "offline",
    xAxesLeft: 0,
    yAxesLeft: 0,
    sendSpeedValue: 0,
    Inactive: true,
    Active: false,
    internetConnection: false,
    
     
    
  }},
   created: function(){
           
       this.gameController()  
       this.siteVisitor();  
     

     },
    mounted: function(){
       this.$refs.mouseEvent.addEventListener('touchmove',(event) =>{
          event.preventDefault();
          event.stopImmediatePropagation();
        },{ passive: false });

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

        ipcar.on("disconnect"),(res)=>{
            console.log("controller send niet naar server"+ res)
        }

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
     
          this.Kruisje = gamepads[0].buttons[0].value;  // kruisje
          this.Kruisje = gamepads[0].buttons[3].value; // driehoekje
         // this.L1 = gamepads[0].buttons[4].value;  //L1
         // this.R1 = gamepads[0].buttons[5].value;  //R1
        

        
   

         // maping speed to km/h
          //this.speed = this.map(gamepads[0].buttons[7].value,0,1,1500,1600);  //R2
         // this.reverse = this.map(gamepads[0].buttons[6].value,0,1,1500,1400);  //L2
          this.xAxesLeft = this.map(gamepads[0].axes[0],-1,1,500,2500); //x as linkerkant
          this.yAxesLeft = this.map(gamepads[0].axes[1],-1,1,1600,1400); //x as linkerkant
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

      console.log( this.xAxesLeft+ "  "+ this.yAxesLeft)
        ipcar.emit("controllerInput", [this.xAxesLeft,this.yAxesLeft ]);
      //console.log( this.Kruisje);
       

        }
        
      window.requestAnimationFrame(this.inputController) // this reload the function inputcontroller function every framerate
      }, // einde input controller
      map( x,  in_min,  in_max,  out_min,  out_max){ // maps de waardes van de controller zodat de de ESC ze begrijpt
            return ((x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min).toFixed(0)
      },
      connect(){
          this.videoStream()

         this.internetConnection = window.navigator.onLine;

         if ( this.internetConnection) {
                this.status = "connected to internet"
            } else {
                this.status = "No internet"
            }
      },
       async videoStream(){

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
          try {
            const msg = JSON.parse(e.data);
              console.log("camera and selected car are the same "+ msg.from)
               
            if (msg.type === 'offer') {
              const peerConnection = new RTCPeerConnection(config);
              connections.set(msg.from, peerConnection);
                console.log('incoming data '+e);
                 this.camera = "Online";
                 this.statusButton = "connected",
                 this.InActive = false
                 this.Active = true
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

.row,.col-9,.col-3{
     margin: 0;
    padding:0;
  }


.data{
  position: relative;
  color: white;
  padding-top: 50px;
  margin-left: 20px;
  text-align: left;
  width: 100%;
  height: 100vh;
  background-color: #1e3a42;
  padding: 12px;
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);

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
.information{
    width: 25vw;
  height: 100vh;
   z-index: 1;
}

.ButtonInactive{
  background-color: rgba(214, 13, 6, 0.5);
  font-size: 100%;
	border: 1px solid rgb(184, 46, 46);
  border-radius: 5px;
	width: 95px;
	padding: 10px 0;
	text-align: center;
	display: inline-block;
  margin-right: 10px;
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
   width: 75vw;
  height: 100vh;
  z-index: 2;
}

  video{
   // position: absolute;
    margin-left: 0;
    object-fit: cover;
     width: 100%;
     height: 100%;
    background-color: #2a2a2b;
    z-index:3;
}

</style>