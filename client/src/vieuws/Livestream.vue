<template>

<div >

    
    <h3>Live Video Stream (receiving)</h3>
   
      <video mute='true' playsinline autoplay id='v' width='50%' height='50%'></video>


    <div id='controls' class='hidden'>
      <div>Someone is here! Press Play.</div>
      <button id='play' style=''>
         Play
      </button>
    </div>

    <div id='wait'>
      Waiting for someone to connect.
    </div>

 <br>
    <!-- gamepad-->
  <div v-if="!hideGamepad" class="row">
       <div class="col-sm-2"></div>
        <div class="col-sm-8">
          <h2>A gamepad is connected</h2>
        </div>
         <div class="col-sm-2"></div>
    </div>
   <!-- rader chart -->
  <div class="row">
       <div class="col-sm-2"></div>
        <div class="col-sm-8">
            <div class="BarChart"> 
             <!--We are using the LineChart component imported below in the script and also setting the chart-data prop to the datacollection object-->
            <radar-chart :chart-data="datacollection" ></radar-chart>
            </div>
        </div>
         <div class="col-sm-2"></div>
    </div>
   <!-- live streaming line chart -->
  <div class="row">
       <div class="col-sm-2"></div>
        <div class="col-sm-8">
            <div class="BarChart"> 
             <!--We are using the LineChart component imported below in the script and also setting the chart-data prop to the datacollection object-->
            <!-- <live-chart></live-chart> -->
            </div>
        </div>
         <div class="col-sm-2"></div>
    </div>

     <div>{{ gamepadState}}</div>
</div>
  
</template>

<script src="../../node_modules/osc/dist/osc-browser.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

            
<script>
import osc from "osc";
import $ from 'jquery';
import RadarChart from '../components/Radar.vue';
//import BarChart from '../components/BarChart.js';
import LiveChart from '../components/Bar.vue'


 /// websocket OSC Data receiving and sending 
  var port = new osc.WebSocketPort({
          url: "wss://circusfamilyprojects.nl:8084" //ws://localhost:8083 online server wss://circusfamilyprojects.nl:8084
        }); 

 port.open();

      
          // function update(){
          //   const gamepads = navigator.getGamepads()
          //  // console.log(gamepads);

          //   window.requestAnimationFrame(update)
          // }
          // window.requestAnimationFrame(update)



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
      gamepadState:{}
  
    
  }},
  components: {
      RadarChart,
      LiveChart
    },
   created: function(){
             this.OSCMessage();      
          //console.log(message);
        this.fillData()
        this.gameController()

          
     this.inputController()
     },
   mounted: function(){


 
      
       /// websocket WebRTC for live stream

    (async function() {
  const config = {
    iceServers: [{
      urls: ['stun:stun.l.google.com:19302']
    }]
  };

  window.play.addEventListener('click', () => {
    try {
      window.v.play();
      window.controls.classList.add('hidden');
    } catch (e) {
      console.error(e);
    }
  });

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

        if (msg.type === 'offer') {
          const peerConnection = new RTCPeerConnection(config);
          connections.set(msg.from, peerConnection);

          peerConnection.ontrack = (e) => {
            console.log('on track', e);
            window.v.srcObject = e.streams[0];
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
})();
 this.fillData()

    window.addEventListener("gamepadconnected", (event) => {
           this.hideGamepad = false;
            console.log("A gamepad connected:");
            console.log(event.gamepad);

              //gamepads is an array with all the gamepad buttons
             
              //console.log(this.gamepads);
          });
           this.gamepads = navigator.getGamepads();

     },
  computed: {


  },
  watch:{},
  
  methods:{
       OSCMessage: function(){ 
               
        port.on("message", (oscMessage) => {
          
             //console.log(oscMessage);
             this.OSCMessages(oscMessage);
          
      });
      },
       OSCMessages: function(oscMessage){ 

        if(oscMessage.address == '/timer'){
          //this.timer= oscMessage.args[0]
         
        }
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
        this.fillData ()

      //console.log(oscMessage); 
          
     },
      fillData () {
        this.datacollection = {
          labels: [ 
            "Throttle",
            "right",
            "brake",
            "Left",
            ],
          datasets: [
            {
              label: 'Movement vehicle',
               fill: true,
              backgroundColor: 'rgb(50, 87, 89,0.0)',
              data: [this.throttle,this.right,this.brake ,this.left],
              pointBackgroundColor: 'rgb(50, 87, 89,0.7)'
            },
          ], 
        }
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
        //console.log(gamepads);
        
        if(gamepads[0]){
          this.gamepadState ={
            id: gamepads[0].id,
            axes:[
                gamepads[0].axes[0].toFixed(2),
                gamepads[0].axes[1].toFixed(2),
                gamepads[0].axes[2].toFixed(2),
                gamepads[0].axes[3].toFixed(2),
            ],
            buttons:[
                {button_0: gamepads[0].buttons[0].pressed},
                {button_0: gamepads[0].buttons[1].pressed},
                {button_0: gamepads[0].buttons[2].pressed},
                {button_0: gamepads[0].buttons[3].pressed},
            ]
          }
        }
       window.requestAnimationFrame(this.inputController) // this reload the function inputcontroller function every framerate
      }
  },
  
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

html {
    height: 100%;
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

</style>