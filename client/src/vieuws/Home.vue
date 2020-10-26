<template>
<div class="background">

   <div class="livefeed">
      <div class="battery">Batterij: 80%</div>
      <video mute='true' playsinline autoplay id='v'  ></video> <!--  //v-bind:style="{ 'border': '7px solid'+color1.hex+'' }" -->
   </div>
  
  
 

 
</div>
  
</template>
<script src="../../node_modules/osc/dist/osc-browser.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

            
<script>
import osc from "osc";
import $ from 'jquery';


 var port = new osc.WebSocketPort({
          url: "wss://circusfamilyprojects.nl:8084" // ws://localhost:8083 online server wss://circusfamilyprojects.nl:8084
        }); 

 port.open();


export default {
  

  data() {
  return{
    value: 60,
    addressen:[],
    message:'',
    address:'',
    message2:'',
    address2:'',
    videoTime: 30,
    x: 0,
    
    
    
     
    
  }},
   created: function(){
             this.OSCMessage();      
          //console.log(message);

     },
  computed: {
   

   
    total: function () {
        
      return this.value 
    }
  },
  methods:{
    updateCoordinates: function(event) {

      var rect = myVideo.getBoundingClientRect(); // postion of video element 
      console.log(rect.right, rect.left);
     
      this.x =(event.clientX-rect.left)*((5)/(rect.right-rect.left));
      this.x =  this.x.toFixed(2)
   console.log( this.x);
      //
       this.$refs.myVideo.currentTime =this.x; 
        //this.$refs.myVideo.play();

        //sending mouse postion value over OSC to the studio
         port.send({
          address: "/mousePosition ",
          args: [this.x]
         });
    
    },
     videoPlayBack: function () {
        //var vid = document.getElementById("myVideo");
     
           //this.$refs.myVideo.currentTime=10;
           // vid.play();
  
    },
    greet: function(){
      
      port.send({
        address: "/hello",
          args: ["De slider werkt!"]
         });
    },
      sendSlider: function(){

        port.send({
        address: "/hello",
          args: [this.value]
         });

     },
      OSCMessage: function(){ 
               
        port.on("message", (oscMessage) => {
          
             console.log(oscMessage);
             this.OSCMessages(oscMessage);
          
      });
     },
      OSCMessages: function(oscMessage){ 
  
         
        var n = this.addressen.includes(oscMessage.address) // looks if address exist in the array if not N false otherwise it is true
         
        //console.log(oscMessage);
        if(n == false) {   // if n is false address dont exist en will add new adress in the array                    
            this.addressen.push(oscMessage.address);            
        }

        // first address with data
      if(oscMessage.address == this.addressen[0] ){
          this.message= 'rgb('+oscMessage.args+')'
          this.address= oscMessage.address
          //console.log(this.message); 
        }

    // second address with data
      if(oscMessage.address == this.addressen[1] ){
          this.message2= oscMessage.args
          this.address2= oscMessage.address
          //console.log(this.message); 
        }
         
     }, 
   
  },
  
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.background{
   width: 100%;
  height: 100%;
}

.livefeed{
   width: 100%;
  height: 80vh;
}

  video{
   // position: absolute;
    margin-left: 0;
     width: 60vw;
     height: 50vh;
    background-color: #1e3a42;
    z-index:1;
}

</style>