
<template>

<div>

    
    <h3>Live Video Stream (broadcast)</h3>
   
       <video  mute='true' playsinline autoplay id='v' width='50%' height='50%'></video>
{{$route.params.id }}

</div>
  
</template>

            
<script>

export default {

  data() {
  return{
       user: "hello"
 
    
  }},
    created() {
      this.user = this.$route.params.id; 
     this.videoStream()
        
        
  },
  
   mounted: function(){ 
     },
  computed: {
  },
  methods:{
       async videoStream(){
          console.log(this.user)
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
          const peerId = this.user
          const peerType = 'camera';
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
                ws = new WebSocket('wss://stepverder.nl:4084/'+this.user+'');  // ws://localhost:4083 online server wss://circusfamilyprojects.nl:8084
               
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
            console.log('in camera');
          // console.log(this.carNumber);
            const mediaStream = await navigator.mediaDevices.getUserMedia({
               video: {
                      width: {exact: 1280},
                      height: {exact: 720},
                      frameRate: {
                                   min: 30,
                                   max: 120
                                  }
                      },
              audio: false,
            });
            window.v.srcObject = mediaStream;
            window.v.play();
            const socket = await getSocket(peerId, peerType);
            socket.addEventListener('message', async (e) => {
              console.log(e)
              const msg = JSON.parse(e.data);
              console.log('msg', msg);
              if (msg.type === 'screens') {
                console.log("vraag om beeld voor candidaten")
                console.log(e)
                for (let screen of msg.screens) {
                  const peerConnection = new RTCPeerConnection(config);
                  connections.set(screen, peerConnection);
                  // peerConnection.addStream(window.v.srcObject);
                  for (let track of mediaStream.getTracks()) {
                    peerConnection.addTrack(track, mediaStream);
                    //console.log(track)
                  }
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
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html {
    height: 100%;
}

h3 {
  
  margin: 40px;
}

video{
  width: 40vw;
  height:40vh;
}



</style>
