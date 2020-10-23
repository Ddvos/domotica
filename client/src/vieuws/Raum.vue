<template>
<div class="background"  ref="mouseEvent"> <!-- v-hammer:pan="onPan"  v-on:mousemove="onMouseMovePc"  -->


 

    <div class="cursor" >  <!--if cursor is not in webGL element mouse vissible-->
      <div ref="ballBig" class="cursor__ball cursor__ball--big ">
        
          <svg   height="30" width="30" display= "none" >     <!--display= "none" -->
              <circle cx="15" cy="15" r="12" stroke-width="0"></circle>
          </svg>
   
      </div>
      
      <div ref="ballSmall" class="cursor__ball cursor__ball--small">
         <transition name="fade" v-on:enter="enter">
          <svg  v-if="show" height="10" width="10"  v-bind:style="{ 'display': this.visibility}" >  
            <circle cx="5" cy="5" r="3" stroke-width="0"></circle>
          </svg>
         </transition>
      </div>
    </div>

 
    <div class="row" v-if="desktop" >   
       
        <div class="splash" v-if="splash">
           <div class="splash">links</div>
           <div class="col-4">Harmonie</div>
           <div class="col-4">rechts</div>
        </div>

          <!-- WebGL -->
          <div class="col-8"  ref="webGLSpeelveld" v-if="mainpage">
            <div  id="speelveld"> 
                  <WebGLRaum  v-bind:bigBallPosition="ballposition" v-bind:smallBallPosition="smalBallposition" v-bind:raumid="raumid"></WebGLRaum> 
              </div>

          </div>
            <!-- video livestream -->
          <div class="col-4" id="stream" v-if="mainpage"> 
              <div class="overlay" v-on:click="infobutton">
                <div class="tekst">
                     <p> Totaal online bezoekers: {{totalClients}}</p>
                  <h1 id="info-title"> HARMONIE</h1>
                  <p>Living apart together installation</p>

                  <p class="info-tekst">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad 
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                </p>

                <div class="logos">
                  <img src="../assets/raum/RAUM.svg" alt="logo Raum" height="67" width="80" /> 
                  <img src="../assets/raum/CIRCUS_FAMILY.svg" alt="logo Raum" height="67" width="80" /> 
               </div>
                </div>

              
                  <div class="info-button"></div>
               
              
              </div>       
              <video mute='muted'  autoplay="true"  id='v'></video> <!--  //v-bind:style="{ 'border': '7px solid'+color1.hex+'' }" -->
             
          </div>  
    
   </div>
    <div v-if="mobile" > 
<div class="overlay" v-on:click="infobutton">
               <div class="tekst">
                  <p> Totaal online bezoekers: {{totalClients}}</p>
                  <h1 id="info-title"> HARMONIE</h1>
                  <p>Living apart together installation</p>

                  <p class="info-tekst">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad 
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                </p>

                   <div class="logos">
                      <img src="../assets/raum/RAUM.svg" alt="logo Raum" height="67" width="80" /> 
                      <img src="../assets/raum/CIRCUS_FAMILY.svg" alt="logo Raum" height="67" width="80" /> 
                   </div>
                </div>
                <div class="info-button"></div>
          </div> 
        
      <!-- video livestream -->
        <div class="row" id="video" >
             <video mute='muted'  autoplay="true" playsinline id='v'></video> <!--  //v-bind:style="{ 'border': '7px solid'+color1.hex+'' }" -->
      
        </div>   
      <!-- WebGL -->
        <div class="row">
          <div ref="webGLSpeelveld" id="speelveld"> 
               <WebGLRaum  v-bind:bigBallPosition="ballposition" v-bind:smallBallPosition="smalBallposition" v-bind:raumid="raumid"></WebGLRaum> 
          </div>
        </div>
       
   </div>
 
   
</div>

</template>
<script>
 import { TweenMax} from 'gsap'
// import raumSVGgrid from '../assets/raum/raumSVGgrid';
// import pilaar from '../assets/raum/pilaar';
 import WebGLRaum from '../assets/raum/WebGLRaum';
 import osc from "osc";
import io from "socket.io-client";
//const $hoverables = document.querySelectorAll('.hoverable');
 // for sending osc
 var port = new osc.WebSocketPort({
          url: "wss://circusfamilyprojects.nl:8084" //  ws://localhost:8083 online server wss://circusfamilyprojects.nl:8084
        }); 

 port.open();

//connect to server
let raum = io.connect("https://circusfamilyprojects.nl:6500/raum") // poort to connect with
//let allUsers = socket.adapter.rooms;


export default {
   
  data() {
  return{
    bigBall: null,
    smallBall: null,
    clientcolor: '#f2ff00',
    ballposition: null,
    smalBallposition: null,
    ballpositionmobile:[],
    mouseX: null,
    mouseY: null,
    mousecolor:[],
   visibility: 'block',
   show: true,
   splash: false,
   mainpage: true,
   desktop: true,
   mobile: false,
   windowWidth: 0,
   totalClients: null,
   raumid: "3423",
       
  }
  },
  components: {
  // 'raumSVGgrid': raumSVGgrid,
  //'pilaar': pilaar,
  'WebGLRaum': WebGLRaum,
  
  },
  created() {
     this.siteVisitor();  
     this.videoStream()
   
     
    
    },
    beforeDestroy() {
      document.addEventListener('mousemove',this.mousePCinput);
      document.addEventListener('touchmove',this.mouseMobile);
  },
    mounted(){
      this.$refs.mouseEvent.addEventListener('mousemove', (event)=>{this.mousePC(event)});
      this.$refs.mouseEvent.addEventListener('touchmove',(event) =>{
          event.preventDefault();
          event.stopImmediatePropagation();
          this.mouseMobile(event)
        },{ passive: false });
     
      this.bigBall = document.querySelector('.cursor__ball--big');
      this.smallBall = document.querySelector('.cursor__ball--small');


      //window.addEventListener('touchmove',this.mouseMobile);
    
  
        this.windowWidth = window.innerWidth;
      if (this.windowWidth < 700){
        //console.log("device is mobile")
        this.mobile = true
        this.desktop = false
      } else{
        // console.log("device is desktop")
        this.mobile = false
        this.desktop = true
      }

      //console.log(this.windowWidth)
    },
 
  methods:{
    siteVisitor: function(){

       raum.on("welcome",(data)=>{
         this.siteVisitors(data);
        })

         raum.on("clientList",(clients)=>{
         this.someAllClients(clients);
        })

        raum.emit("joinRaum", "clientRoom");

        raum.on("newUser",(res) =>{
          console.log(res)
          this.newUser = true;

          setTimeout(() => this.newUser= false, 3000);
        })

       ///raum.on("err",(err)=> console.log(err))
       //raum.on("succes",(res)=> console.log(res))
     },
     
       siteVisitors: function(data) {
      
      console.log(data);
 
       this.raumid = raum.id;
      console.log(this.raumid)
          port.send({
            address: "/newID",
            args:  this.raumid
         });

     },
     someAllClients: function(clients){
       this.totalClients = clients.length
       this.clientsIDArray =clients
       //console.log(this.clientsIDArray)

          port.send({
            address: "/clientsID",
            args:  this.clientsIDArray
         });
    
       
     },
    
    mousePC: function(event){
        
        this.mouseX = event.x;
        this.mouseY = event.y;
         
         //console.log(this.mouseX)
         TweenMax.to(this.bigBall, 0.1,{
           x: event.x -10,
           y: event.y - 10      
           })
           TweenMax.to(this.smallBall, .001, {
             x: event.x -0,
            y: event.y - 0
          }) 

          this.ballXYposition()
    },
      mouseMobile: function()  {

        let touch = event.touches[0];
        this.mouseX = touch.clientX;
        this.mouseY = touch.clientY;

         TweenMax.to(this.bigBall, 0.1,{
          x: touch.clientX + 0,
          y: touch.clientY + 0      
          })
          TweenMax.to(this.smallBall, .1, {
            x: touch.clientX ,
           y: touch.clientY 
         }) 

        this.ballXYposition()
      },
      ballXYposition: function(){
         

        this.ballposition = this.$refs.ballBig.getBoundingClientRect()  //positie bigball
        this.smalBallposition = this.$refs.ballSmall.getBoundingClientRect()

        
      
        const rect2 = this.$refs.webGLSpeelveld.getBoundingClientRect()  //positie webgl speelveld
        //console.log( this.ballposition)
        const isInHoriztonalBounds = this.smalBallposition.x < rect2.x + rect2.width &&  this.smalBallposition.x -  this.smalBallposition.width > rect2.x;
        const isInVerticalBounds = this.smalBallposition.y < rect2.y + rect2.height && this.smalBallposition.y - this.smalBallposition.height > rect2.y;
        const isOverlapping = isInHoriztonalBounds && isInVerticalBounds;
        
        if(isOverlapping== true){ // muis gaat uit
        this.show = false
        //console.log("muis uit")
              this.visibility = 'none'
        }else if(isOverlapping== false){ // muis gaat aan
           this.show = true
           this.visibility = 'block'
        }

      
      },
      enter: function() {
       // console.log("fade")
        setTimeout(function() {
          this.show = false;
        }, 500); // hide the message after 3 seconds
    },

    infobutton: function(){

      //hiermee wordt de animatie voor de overlay gestart
      var  abox = document.getElementsByClassName("overlay")[0];
       abox.classList.toggle("overlayhide");

       // hiermee wordt de animatie van de cursor gestart en gaat de knop naat links
         var  knop = document.getElementsByClassName("info-button")[0];
       knop.classList.toggle("info-button-hide");
    },
      startlivestream: function(){
          this.videoStream()
          window.v.play();
         // window.controls.classList.add('hidden');


      },
       /// begin live videostream
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

      const peerId = 'raum'+getRandomId();
      const peerType = 'screen';
      const connections = new Map();

      //console.log("peerId is: " +peerId)

      let ws;
      const getSocket = async (peerId, peerType) => {
        if (ws) return ws;

        return new Promise((resolve, reject) => {
          try {
            
            
            ws = new WebSocket('wss://circusfamilyprojects.nl:4084/raum');  // ws://localhost:4083 online server wss://circusfamilyprojects.nl:4084
          
          //console.log(">>nieuwe verbinding wordt opgezet<<")
           
           const onOpen = () => {
             
              ws.send(JSON.stringify({
                type: 'register',
                peerType,
                peerId,
              }));

              ws.removeEventListener('open', onOpen);
               //console.log("open");
              resolve(ws);
            };

            ws.addEventListener('open', onOpen);
          } catch (e) {
            reject(e);
          }
        });
      };

      try {
       // console.log('in screen');
        const socket = await getSocket(peerId, peerType);
        socket.addEventListener('message', async (e) => {
          try {
            const msg = JSON.parse(e.data);
              //console.log("camera and selected car are the same "+ msg.from)
                this.Camconnected = true;
            if (msg.type === 'offer') {
              const peerConnection = new RTCPeerConnection(config);
              connections.set(msg.from, peerConnection);

              peerConnection.ontrack = (e) => {
                console.log('on track', e);
                window.v.srcObject = e.streams[0];
                window.v.muted = true;
                window.v.play();
               // window.wait.classList.add('hidden');
                //window.controls.classList.remove('hidden');
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
      }, // einde live videostream
      
      
  


    }
}
</script>

<style lang="scss" scoped>

.background {
  width: 100vw;
  height: 100vh;
  background: #1e3a42;
  color: white;
  cursor: none;
  
  .cursor {
    pointer-events: none;
    
    &__ball {
      position: fixed;
      top: 0;
      left: 0;
     // mix-blend-mode: difference;
      z-index: 1000;
      
      
      circle {
        fill: #ffffff;
      }
    }      
  } 
  #info{
    position: relative;  
  }
  #title{
    color: white;
  }
  #speelveld{
     width: 100%;
  height: 100vh;
  background: #474141;
  color: white;

  }

  .row,.col-8,.col-4{
    margin: 0;
    padding:0;
  }

  #stream{
      position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  }

  .tekst{
    flex: 10% 0 90%;
  }
  #info-title{
    font-family: 'Prompt', sans-serif;
    font-weight: bold;
   font-style: italic;

  } 

  .info-tekst{
      font-family: 'Roboto', sans-serif;
    font-weight: bold;

  }

  .logos{
   
     margin-top: 45vh;
  }

 

  .overlay{
      display: flex;
      position: relative;;
     background: rgb(35,100,233);
     background: linear-gradient(0deg, rgba(35,100,233,0.7) 0%, rgba(202,26,47,0.7) 100%);
     width: 100%;
    height: 100vh;
    animation: myfirst 3s 1;
    animation-direction: alternate;
     clip-path: polygon(0 0, 100% 0%, 100% 100%, 0% 100%);
    z-index:3;
  }

  @keyframes myfirst { //hiermee gaat de overlay van links naar rechts en vervormt hij
      from {right: 100%;
       clip-path: polygon(0 0, 95% 0, 95% 40%, 100% 50%, 95% 60%, 95% 100%, 0 100%)}  
      to{right:0%;
         clip-path: polygon(0 0, 100% 0, 100% 40%, 100% 50%, 100% 60%, 100% 100%, 0 100%);
      } 
      
}

   .info-button{
     position:absolute;
     display: 1;
     margin-left: 0%;
     width: 100%;
	height: 100vh;
  animation: button 3s 1;
    animation-direction: alternate;
    clip-path: polygon(98% 47.5%, 96.5% 50%, 98% 52.5%, 97.5% 52.5%, 96% 50%, 97.5% 47.5%);
 background-color:  rgb(255, 255, 255);
  }

    @keyframes button { //hiermee gaat de overlay van links naar rechts en vervormt hij
      from {
       clip-path: polygon(96.5% 47.5%, 98% 50%, 96.5% 52.5%, 96% 52.5%, 97.5% 50%, 96% 47.5%)}  
      to{
       clip-path: polygon(98% 47.5%, 96.5% 50%, 98% 52.5%, 97.5% 52.5%, 96% 50%, 97.5% 47.5%);
      }    
   }

    .info-button-hide{
     position:absolute;
     display: 1;
     margin-left: 0%;
     width: 100%;
	height: 100vh;
  animation: buttonhide 3s 1;
    animation-direction: alternate;
    clip-path: polygon(96.5% 47.5%, 98% 50%, 96.5% 52.5%, 96% 52.5%, 97.5% 50%, 96% 47.5%);
 background-color:  rgb(255, 255, 255);
  }

     @keyframes buttonhide { //hiermee gaat de overlay van links naar rechts en vervormt hij
      from {
       clip-path: polygon(98% 47.5%, 96.5% 50%, 98% 52.5%, 97.5% 52.5%, 96% 50%, 97.5% 47.5%)}  
      to{
       clip-path: polygon(96.5% 47.5%, 98% 50%, 96.5% 52.5%, 96% 52.5%, 97.5% 50%, 96% 47.5%);
      }    
   }



  .overlayhide{
       position:absolute;
       background: rgb(35,100,233);
       background: linear-gradient(0deg, rgba(35,100,233,0.7) 0%, rgba(202,26,47,0.7) 100%);
       width: 105%;
       height: 100vh;
       animation: overlayhide 3s ;
       animation-fill-mode: forwards;
       animation-direction: alternate;
  }

@keyframes overlayhide { //hiermee gaat de overlay van rechts naar links en vervormt hij
      from {right: 5%;
       clip-path: polygon(0 0, 100% 0, 100% 40%, 100% 50%, 100% 60%, 100% 100%, 0 100%);
      } 
      to{right:95%;
      clip-path: polygon(0 0, 95% 0, 95% 40%, 100% 50%, 95% 60%, 95% 100%, 0 100%)} 
}
  

  video{
    position: absolute;
     margin-left: -420px;
     height: 100vh;
    background-color: #1e3a42;
    z-index:1;
}

/////////////////////////////////////////////////////////
 // code bellow is for mobile
/////////////////////////////////////////////////////////

@media screen and (max-width: 700px) {

 .row,.col-8{
    margin: 0;
    padding:0;
  }
  #speelveld{
     width: 100%;
    height: 59vh;
    background: #0d0d0d;
    color: white;
  }

  .tekst{
    flex: 0% 0 100vh;
  }

  .logos{
    margin-top: 35vh;
  }

  

   .overlay{

      position:absolute;
     background: rgb(35,100,233);
     background: linear-gradient(0deg, rgba(35,100,233,0.7) 0%, rgba(202,26,47,0.7) 100%);
     width: 100%;
    height: 100%;
    animation: myfirst 3s 1;
    animation-direction: alternate;
      clip-path: polygon(0 0, 100% 0%, 100% 100%, 0% 100%);
    z-index:3;
  }


@keyframes myfirst {
      from {bottom: 95%;
      clip-path: polygon(0% 0%,   100% 0%,   100% 95%,   65% 95%,   50% 100%,   35% 95%,   0 95%);} 
      to{bottom:0%;
       clip-path: polygon(0% 0%,   100% 0%,   100% 100%,   60% 100%,   50% 100%,   40% 100%,   0 100%);;
      } 
}

   .info-button{
    
    position:absolute;
     display: 1;
     margin-left: 0%;
     width: 100%;
	height: 100vh;
  animation: button 3s 1;
    animation-direction: alternate;
    //clip-path: polygon(98% 47.5%,    96.5% 50%,    98% 52.5%,   97.5% 52.5%,   96% 50%,   97.5% 47.5%);
    clip-path: polygon(53% 95.5%,    53% 96%,    50% 94.5%,   47% 96%,   47% 95.5%,   50% 94%);
 background-color:  rgb(255, 255, 255);
  }

    @keyframes button { //hiermee gaat de overlay van links naar rechts en vervormt hij
      from {
       clip-path: polygon(53% 96%,    53% 96.5%,    50% 98%,   47% 96.5%,   47% 96%,   50% 97.5%)}  
      to{
       clip-path: polygon(53% 95.5%,    53% 96%,    50% 94.5%,   47% 96%,   47% 95.5%,   50% 94%);
      }    
   }

     .info-button-hide{
     position:absolute;
     display: 1;
     margin-left: 0%;
     width: 100%;
	height: 100vh;
  animation: buttonhide 3s 1;
    animation-direction: alternate;
    clip-path: polygon(53% 96%,    53% 96.5%,    50% 98%,   47% 96.5%,   47% 96%,   50% 97.5%);
 background-color:  rgb(255, 255, 255);
  }

     @keyframes buttonhide { //hiermee gaat de overlay van onder naar boven
      from {
       clip-path: polygon(53% 97.5%,    53% 98%,    50% 96.5%,   47% 98%,   47% 97.5%,   50% 96%)}  
      to{
       clip-path: polygon(53% 96%,    53% 96.5%,    50% 98%,   47% 96.5%,   47% 96%,   50% 97.5%);
      }    
   }


  .overlayhide{
       position:absolute;
       background: linear-gradient(0deg, rgba(35,100,233,0.7) 0%, rgba(202,26,47,0.7) 100%);
       width: 100%;
       height: 100vh;
       animation: overlayhide 3s ;
       animation-fill-mode: forwards;
       animation-direction: alternate;
  }

@keyframes overlayhide {
      from {bottom: 0%;
      clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 60% 100%, 50% 100%, 40% 100%, 0 100%);} 
      to{bottom:95%;
      clip-path: polygon(0% 0%, 100% 0%, 100% 95%, 65% 95%, 50% 100%, 35% 95%, 0 95%);
      } 
}

 

  video {
      position: static;
        margin-left: 0px;
       width: 100%;
       height: 30vh;
       background-color: rgb(87, 87, 87);
  }
}

}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s
}

.fade-enter,
.fade-leave-to
/* .fade-leave-active in <2.1.8 */

{
  opacity: 0
}
       

</style>
