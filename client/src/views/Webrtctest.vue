<template>
<div class="background" ref="mouseEvent">
    <button v-on:click="carControl">connect</button>
      <button v-on:click="sendData">send</button>
</div>
  
</template>


            
<script>

      
export default {
  

  data() {
  return{
    data: 1,
    sendChannel: null,
    
  }},
 
   created: function(){
           

     

     },
  
  computed: {
   

   
  },
  methods:{ 

    
async carControl(){

              /// websocket WebRTC for car cocontrol. This is the sending side to the Raspberry Pi
 // chaneel waarover data gestuurd word

          const config = {
            iceServers: [{
              urls: 'turn:turn.stepverder.nl:3478', //'stun:stun.l.google.com:19302'  turn:178.62.209.37:3478 circusfamilyprojects.nl
               username: 'Dominique',
               credential: 'WS7Yq_jT'
            
            }]
          };
          // const getRandomId = () => {
          //   return Math.floor(Math.random() * 10000);
          // };
          const peerId = 'controller1'
          const peerType = 'controller';
          const connections = new Map();
          let ws;
          const getSocket = async (peerId, peerType) => {
            if (ws) return ws;
            return new Promise((resolve, reject) => {
              try {
             
                ws = new WebSocket('wss://stepverder.nl:5083');  // ws://localhost:4083 online server wss://circusfamilyprojects.nl:8084
               
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
              console.log('msg', msg);
              if (msg.type === 'Raspberrypi') {
                console.log("raspberry pi probeert te verbinden")
                for (let Raspberrypi of msg.Raspberrypis) {
                  const peerConnection = new RTCPeerConnection(config);
                  connections.set(Raspberrypi, peerConnection);
                  // peerConnection.addStream(window.v.srcObject);
                  this.sendChannel = peerConnection.createDataChannel('sendDataChannel');
                  
                
                  const sdp = await peerConnection.createOffer();
                  await peerConnection.setLocalDescription(sdp);
                  peerConnection.onicecandidate = (e) => {
                    if (e.candidate) {
                      socket.send(JSON.stringify({
                        type: 'candidate',
                        from: peerId,
                        to: screen,
                        data: e.candidate,
                      }));
                    }
                  };
                  socket.send(JSON.stringify({
                    type: 'offer',
                    to: screen,
                    from: peerId,
                    data: peerConnection.localDescription,
                  }));
                }
              }
              if (msg.type === 'answer') {
                const peerConnection = connections.get(msg.from);
                peerConnection.setRemoteDescription(msg.data);
              }
              if (msg.type === 'disconnect') {
                const connection = connections.get(msg.from);
                if (connection) {
                  console.log('Disconnecting from', msg.from);
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
            });
          } catch (e) {
            console.log("error: "+e);
          }
        },
      
   
  },
  sendData: function(){
      this.sendChannel.send(this.data);
  }


  
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