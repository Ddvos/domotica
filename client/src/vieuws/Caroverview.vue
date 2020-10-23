<template>
  <div class="parentBackground">
  <div class="background" >
    
    <h3>Overview all RC cars</h3>

      <br>
     <!-- row car1 and car2 -->
     <div class="row"> 
       <div class="col-sm-1"> 
       </div>
       <div class="col-sm-4">
            <h2>RC car 1</h2> 
          <div class="livefeed">
            <img :src="urlImagecar1">
          </div>
            <div class='connected' >
                <div v-if="!connected">Connection: offline</div> 
                 <div v-if="connected">Connection: online</div>        
            </div>
        </div>
        <div class="col-sm-1"> </div>
         <div class="col-sm-4">
            <h2>RC car 2</h2> 
          <div class="livefeed"> 
            <img :src="urlImagecar2">
          </div>
            <div class='connected' >
                <div v-if="!connected">Connection: offline</div> 
                 <div v-if="connected">Connection: online</div>        
            </div>
        </div>
        <div class="col-sm-1"></div>
    </div>

         <!-- row car3 and car4 -->
  <div class="brakeline"></div>
     <div class="row"> 
       <div class="col-sm-1"> 
       </div>
       <div class="col-sm-4">
            <h2>RC car 3</h2> 
          <div class="livefeed">
            <img :src="urlImagecar3">
          </div>
            <div class='connected' >
                <div v-if="!connected">Connection: offline</div> 
                 <div v-if="connected">Connection: online</div>        
            </div>
        </div>
        <div class="col-sm-1"> </div>
         <div class="col-sm-4">
            <h2>RC car 4</h2> 
          <div class="livefeed"> 
            <img :src="urlImagecar4">
          </div>
            <div class='connected' >
                <div v-if="!connected">Connection: offline</div> 
                 <div v-if="connected">Connection: online</div>        
            </div>
        </div>
        <div class="col-sm-1"></div>
    </div>


  
 <br>
    <!-- gamepad-->



 </div>
</div> 
</template>

<script src="../../node_modules/osc/dist/osc-browser.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

            
<script>
import osc from "osc";
import $ from 'jquery';
import VueDropdown from 'vue-dynamic-dropdown'


// websocket connection for receiving live video   
 
  let urlObject



export default {
  

  data() {
  return{ 
      timer: '',
      throttle: 0,
      left: 0,
      right: 0,
      brake: 0,
      datacollection: null,
      gamepads: [],
      id: undefined,    
      WS_URL: "",
      previousWS_url:"",
      ws: "",
      urlImage: "", // live video feed
      currentUrlimage:"",
      urlImagecar1:"",
      urlImagecar2:"",
      urlImagecar3:"",
      urlImagecar4:"",
      connectedClients:["car1","car2","car3","car4"],
      connected: false,
      previousWS: false,
      currentWs: true,
    
  }},
  components: {
      VueDropdown,
    
    },
   created: function(){

        // function for live video feed from car
         this.getImgUrl();
        
      
     },
   mounted: function(){  
  
   

     },
  computed: {


  },
  watch:{},
  
  methods:{
        getImgUrl: function(){
        var arrayLength = this.connectedClients.length; // neemt de lengte van de array

         for (var i = 0; i < arrayLength; i++) { // makes a websocket connectiong with every car
        // console.log(this.connectedClients[i]);

        
            this.WS_URL = 'wss://circusfamilyprojects.nl:6084/'+this.connectedClients[i]+'';
            this.ws = new WebSocket(this.WS_URL);
         
             this.ws.onopen = () => console.log("Connected to: "+ this.WS_URL);
             this.startStream();
           } //Do something
          },
          startStream: function(){
     
            this.ws.onmessage = message => {
            //console.log(message);
             this.currentUrlimage = message.currentTarget.url.substr(35, 4);
           // console.log(this.currentUrlimage);
              if(this.currentUrlimage == "car1"){
                  
                  const arrayBuffer = message.data;
                  if(urlObject){
                      URL.revokeObjectURL(urlObject);
                      
                  }
                  urlObject = URL.createObjectURL(new Blob([arrayBuffer]));
                  this.urlImagecar1=  urlObject;
                  this.connected = true; 
              }
               if(this.currentUrlimage == "car2"){
                  
                  const arrayBuffer = message.data;
                  if(urlObject){
                      URL.revokeObjectURL(urlObject);
                      
                  }
                  urlObject = URL.createObjectURL(new Blob([arrayBuffer]));
                  this.urlImagecar2=  urlObject;
                  this.connected = true;    
              }
               if(this.currentUrlimage == "car3"){
                  
                  const arrayBuffer = message.data;
                  if(urlObject){
                      URL.revokeObjectURL(urlObject);
                      
                  }
                  urlObject = URL.createObjectURL(new Blob([arrayBuffer]));
                  this.urlImagecar3=  urlObject;
                  this.connected = true;    
              }
               if(this.currentUrlimage == "car4"){
                  
                  const arrayBuffer = message.data;
                  if(urlObject){
                      URL.revokeObjectURL(urlObject);
                      
                  }
                  urlObject = URL.createObjectURL(new Blob([arrayBuffer]));
                  this.urlImagecar4=  urlObject;
                  this.connected = true;    
              }
              
            }

          this.connected = false;
      },
  },
  
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.parentBackground{
  
    width: 100%; 
    height:100%;
      position: absolute;
     background-color: #1c4863; 
    z-index: 1; 
}

.background{
   
     width: 100%; 
    height: auto;
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
  
    margin: auto;
    width: 100%;
    height: 100%;
    

    background-color: black;
}
.connected {
  text-align: left;
     margin-left: 15%;
  
}

img{
     width: 100%;
    height:100%;

}

.brakeline{
   width: 100%;
    height:100px;
}

.col-sm-4{

    
    width: 100%;
    height: 100%;
    margin-top: 30;
     background-color: #1c4863; 
}

@media only screen and (max-width: 600px) {
  
.col-sm-4{

    margin: auto;
    width: 100%;
    height: 100%;
    margin-top: 30;
     background-color: #1c4863; 
}
  img{
 
     width: 100%;
    height:auto;

}
}

</style>